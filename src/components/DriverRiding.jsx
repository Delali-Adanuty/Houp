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

    if(currentRide.status === "Cancelled"){
        setTimeout(() => {
            setDoc(doc(db, "users", user.uid), {
                isDriving:false
            }, {merge:true})            
        }, 3000)
    }

    useEffect(() => {
        const ridesRef = collection(db, "rides")
        const q = query(ridesRef,   where("driverId", "==", user.uid), where("status", "not-in", ["Cancelled", "Completed"]));

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

    function completeRide(){
        setDoc(doc(db, "rides", currentRide.id), {
            status:"Completed"
        }, {merge:true})    
        setDoc(doc(db, "users", user.uid), {
            isDriving:false
        }, {merge:true})
    }

    return(
        <section className="driver-riding">
                <div>
                <h1>{currentRide.status}...</h1>
                {currentRide.status === "Awaiting Pickup" ? 
                <button onClick={confirmPickup}>Confirm Pickup</button> :
                null
                }
                {currentRide.status === "Heading to Destination" ? 
                <button onClick={completeRide}>Drop off {currentRide.riderName.split(' ')[0]}</button> :
                null
                }
            </div>
        </section>
    )
}