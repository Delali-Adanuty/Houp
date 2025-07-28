import {
    collection, 
    onSnapshot,
    query,
    where,
    setDoc,
    doc
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import { useState, useEffect } from "react";
import FeatherIcon from "feather-icons-react";

export default function AcceptRide(){
    const auth = getAuth()
    const user = auth.currentUser;
    const [activeRides, setActiveRides] = useState([])
    const [carData, setCarData] = useState(null)

    useEffect(() => {
        const ridesRef = collection(db, "rides")
        const q = query(ridesRef,   where("status", "==", "Looking for a driver"));        

        const unsubscribe =  onSnapshot(q, (snapshot) => {
            const newRides = []
            snapshot.forEach((doc) => {
                newRides.push({id: doc.id, ...doc.data()})
            })
            setActiveRides(newRides)
        })    


        return () => unsubscribe();
    }, []);

    async function AcceptRide(rideId){
        setDoc(doc(db, "rides", rideId), {
            driverId:user.uid,
            status:"Awaiting Pickup",
            driverName:user.displayName,
            driverCar:{carData}
        }, {merge:true})
        setDoc(doc(db, "users", user.uid), {
            isDriving:true
        }, {merge:true})
    }


    useEffect(() => {
        const docRef = doc(db, "users", user.uid);

        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if(docSnap.data().car){
                setCarData(docSnap.data().car)
            }
        })

        return () => unsubscribe();
    }, [])

    const requestedRides = activeRides.map((item) => {
        return (
            <div className="ride" key={item.id}>
                <p className="pickup-location">{item.pickupLocation}</p>
                <p className="pickup-distance">1.7 miles away</p>
                <p className="to">To:</p>
                <p className="dropoff-location">{item.dropoffLocation}</p>
                <p className="dropoff-distance">8.3 miles away</p>
                <button onClick={() => AcceptRide(item.id)}>Accept Ride</button>
            </div>
        )
    })

    function closeAcceptRide(){
        setDoc(doc(db, "users", user.uid), {
            currentRole:"",
        }, {merge:true})               
    }


    function getData(formData){
        const modelInput = formData.get("model")
        const colorInput = formData.get("color")
        const plateInput = formData.get("plate")
        setDoc(doc(db, "users", user.uid), {
            car:{
                color:colorInput,
                model:modelInput,
                plate:plateInput
            }
        }, {merge:true})
    }

    return(
        <>
        {carData ?
        <section>
            <ul className="close">
                <button className="close-button" onClick={closeAcceptRide}>
                    <FeatherIcon icon="x" size="30"/>
                </button>
            </ul>
            <h1 className="rides-heading">Active Rides</h1>
            <section className="rides">
                {requestedRides}
            </section>                   
        </section>:
        <section className="form add-car">
            <form action={getData}>
                <h1>Please enter your car details</h1>
                <label htmlFor="model">Enter your car model:</label>
                <input 
                type="text" 
                name="model"
                id="model"
                required
                placeholder="Ford Explorer"
                />
                <label htmlFor="color">Enter your car's color: </label>
                <input 
                type="text"
                required
                name="color"
                id="color"
                placeholder="Blue"
                />
                <label htmlFor="plate">Enter your car number plate:</label>
                <input
                type="text"
                required
                name="plate"
                id="plate"
                placeholder="XY234"
                />
                <button>Submit</button>
            </form>
        </section>
        }
        </>
    )
}