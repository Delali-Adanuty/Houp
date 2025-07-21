import { getAuth } from "firebase/auth"
import { db } from "../firebase"
import { useEffect, useState } from "react";
import {
     collection,
     where,
     query,
     onSnapshot, 
     setDoc,
     doc,
     orderBy,
     limit
    } from "firebase/firestore";


export default function DriverRiding(){
    const auth = getAuth();
    const user = auth.currentUser
    const [currentRide, setCurrentRide] = useState({})

    useEffect(() => {
        const ridesRef = collection(db, "rides")
        const q = query(ridesRef,   
            where("driverId", "==", user.uid),
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
        if(currentRide.status === "Completed"){
            setDoc(doc(db, "users", user.uid), {
                isDriving:false,
                currentRole:""
            }, {merge:true})
        }    

        if(currentRide.status === "Cancelled"){
            alert(`${currentRide.riderName.split(' ')[0]} cancelled the ride`)
            setTimeout(() => {
                setDoc(doc(db, "users", user.uid), {
                    isDriving:false,
                    currentRole:""
                }, {merge:true})            
            }, 2000)
        }    
    }, [currentRide, user.uid])
    

    
    function confirmPickup(){
        setDoc(doc(db, "rides", currentRide.id), {
            status:"Heading to Destination"
        }, {merge:true})        
    }

    function completeRide(){
        setDoc(doc(db, "rides", currentRide.id), {
            status:"Dropped off"
        }, {merge:true})    


        setTimeout(() => {
            setDoc(doc(db, "rides", currentRide.id), {
                status:"Completed"
            }, {merge:true})   
            setDoc(doc(db, "users", user.uid), {
                isDriving:false,
                currentRole:""
            }, {merge:true})              
        }, 2000)
    }

    return(
        <section className="driver-riding">
                <div>
                <h1>{currentRide.status}...</h1>
                {currentRide.status === "Awaiting Pickup" ? 
                <>
                <p>Pick up {currentRide.riderName.split(' ')[0]} in {3} minutes</p>
                <button onClick={confirmPickup}>Confirm Pickup</button>
                </>
                 :
                null
                }
                {currentRide.status === "Heading to Destination" ? 
                <>
                <p>Drop off at 12:32pm</p>
                <button onClick={completeRide}>Drop off {currentRide.riderName.split(' ')[0]}</button>
                </>
                 :
                null
                }
            </div>
        </section>
    )
}