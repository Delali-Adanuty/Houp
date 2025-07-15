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

export default function AcceptRide(){
    const auth = getAuth()
    const user = auth.currentUser;
    const [activeRides, setActiveRides] = useState([])

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
            status:"Awaiting Pickup"
        }, {merge:true})
        setDoc(doc(db, "users", user.uid), {
            isDriving:true
        }, {merge:true})
    }

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

    return(
        <>
        <h1 className="rides-heading">Active Rides</h1>
        <section className="rides">
            {requestedRides}
            </section>        
        </>
    )
}