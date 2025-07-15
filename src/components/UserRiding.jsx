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

    function cancelRide(){
        console.log('ei')
        setDoc(doc(db, "rides", currentRide.id), {
            status:"Cancelled"
        }, {merge:true})    
    }

    useEffect(() => {
        const ridesRef = collection(db, "rides")
        const q = query(ridesRef,   where("riderId", "==", user.uid), where("status", "not-in", ["Cancelled", "Completed"]));


        const unsubscribe =  onSnapshot(q, (snapshot) => {
            snapshot.forEach((doc) => {
                setCurrentRide({id:doc.id, ...doc.data()})
            })
            if(currentRide.status === "Completed" || currentRide.status === "Cancelled"){
                setDoc(doc(db, "users", user.uid), {
                    isRiding:false
                }, {merge:true})
            }
        })    

        return () => unsubscribe();
    }, [user.uid]);        
    
    return(
        <section className="rider-riding">
            <div>
                <h1>{currentRide.status}...</h1>
                <button onClick={cancelRide}>Cancel Ride</button>
            </div>
        </section>
    )
}