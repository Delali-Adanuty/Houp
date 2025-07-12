import { getAuth } from "firebase/auth"
import { db } from "../firebase"
import { useEffect, useState } from "react";
import {
     collection,
     where,
     query,
     onSnapshot, 
     setDoc,
     doc
    } from "firebase/firestore";

export default function DriverRiding(){
    const auth = getAuth();
    const user = auth.currentUser
    const [currentRide, setCurrentRide] = useState({})

    useEffect(() => {
        const ridesRef = collection(db, "rides")
        const q = query(ridesRef,   where("driverId", "==", user.uid));

        const unsubscribe =  onSnapshot(q, (snapshot) => {
            snapshot.forEach((doc) => {
                setCurrentRide({id:doc.id, ...doc.data()});
            })
        })    

        return () => unsubscribe();
    }, []); 
    
    function confirmPickup(){
        setDoc(doc(db, "rides", currentRide.id), {
            status:"Heading to Destination"
        }, {merge:true})        
    }

    return(
        <section className="driver-riding">
            <h1>Ride Status: {currentRide.status}</h1>
            <button onClick={confirmPickup}>Confirm Pickup</button>
        </section>
    )
}