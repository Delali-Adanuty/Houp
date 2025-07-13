import { getAuth } from "firebase/auth"
import { useEffect, useState } from "react";
import { 
    collection,
    query,
    where,
    onSnapshot,
    setDoc,
    doc
 } from "firebase/firestore";
import { db } from "../firebase";

export default function UserRiding(){

    const auth = getAuth();
    const user = auth.currentUser;
    const [currentRide, setCurrentRide] = useState({})

    

    useEffect(() => {
        const ridesRef = collection(db, "rides")
        const q = query(ridesRef,   where("riderId", "==", user.uid));



        const unsubscribe =  onSnapshot(q, (snapshot) => {
            snapshot.forEach((doc) => {
                setCurrentRide(doc.data())
            })
            if(currentRide.status === "Completed"){
                setDoc(doc(db, "users", user.uid), {
                    isRiding:false
                }, {merge:true})
            }
        })    

        return () => unsubscribe();
    }, []);        
    
    return(
        <section className="rider-riding">
            <p>Ride Status: {currentRide.status}</p>
        </section>
    )
}