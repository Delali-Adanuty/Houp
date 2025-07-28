import { getAuth } from "firebase/auth"
import { useEffect, useState } from "react";
import { 
    collection,
    query,
    where,
    onSnapshot,
    setDoc,
    doc,
    orderBy,
    limit
 } from "firebase/firestore";
import { db } from "../firebase";

export default function UserRiding(){

    const auth = getAuth();
    const user = auth.currentUser;
    const [currentRide, setCurrentRide] = useState({})

    function cancelRide(){
        setDoc(doc(db, "rides", currentRide.id), {
            status:"Cancelled"
        }, {merge:true})  
        setDoc(doc(db, "users", user.uid), {
            isRiding:false,
            currentRole:""
        }, {merge:true})          
    }

    useEffect(() => {
        const ridesRef = collection(db, "rides")
        const q = query(ridesRef, 
            where("riderId", "==", user.uid),
            orderBy("requestedAt", "desc"),
            limit(1)
    );

        const unsubscribe =  onSnapshot(q, (snapshot) => {
            if(!snapshot.empty){
                const rideData = {id:snapshot.docs[0].id, ...snapshot.docs[0].data()}; 
                setCurrentRide(rideData)
            }
            
        })    

        return () => unsubscribe();
    }, [user.uid]);   
    
    useEffect(() => {
        if(currentRide.status === "Cancelled"){
            setDoc(doc(db, "users", user.uid), {
                isRiding:false,
                currentRole:""
            }, {merge:true})
        }

        if(currentRide.status === "Dropped off" || currentRide.status === "Completed"){
            setTimeout(() => {
                setDoc(doc(db, "users", user.uid), {
                    isRiding:false,
                    currentRole:""
                }, {merge:true})
            }, 2000)
        }
    }, [currentRide, user.uid])
    
    return(
        <section className="rider-riding">
            <div>
                <h1>{currentRide.status}...</h1>
                {currentRide.status === "Awaiting Pickup" ? 
                <p>{currentRide.driverName.split(' ')[0]} will pick you up in {3} minutes</p>:
                null
                }
                {currentRide.status === "Waiting for Passenger" ?
                <p>
                    {currentRide.driverName.split(' ')[0]} is waiting for you in a {currentRide.driverCar.carData.color} {currentRide.driverCar.carData.model} with plate {currentRide.driverCar.carData.plate}
                </p>:
                null
                }
                {currentRide.status === "Heading to Destination" ? 
                <p>Arrive at 12:32pm</p> :
                null
                }
                {currentRide.status != "Dropped off" ? 
                <button onClick={cancelRide}>Cancel Ride</button>:
                null
            }
                
            </div>
        </section>
    )
}