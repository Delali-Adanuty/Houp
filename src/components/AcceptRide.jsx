import {
    collection, 
    onSnapshot,
    query,
    where,
    getDocs,
    setDoc,
    doc
} from "firebase/firestore";
import { db } from "../firebase";
import { useState, useEffect } from "react";

export default function AcceptRide(){
    const [activeRides, setActiveRides] = useState([])

    useEffect(() => {
        const ridesRef = collection(db, "rides")
        const q = query(ridesRef,   where("status", "==", "requested"));

        const unsubscribe =  onSnapshot(q, (snapshot) => {
            const newRides = []
            snapshot.forEach((doc) => {
                if(doc.data().status === "requested"){
                    newRides.push({id: doc.id, ...doc.data()})
                }
            })
            setActiveRides(newRides)
        })    

        return () => unsubscribe();
    }, []);

    console.log(activeRides)

    async function AcceptRide(rideId){
        console.log(rideId)
        const q = query(
            collection(db, "rides"),
            where("rideId", "==", rideId)
        )

        const snapshot = await getDocs(q);

        snapshot.forEach((rideDoc) => {
            setDoc(doc(db, "rides", rideDoc.id), {
                status:"inProgress"
            }, {merge:true})
        })
    }

    const requestedRides = activeRides.map((item) => {
        return (
            <div className="ride" key={item.id}>
                <p>Ride from {item.pickupLocation} to {item.dropoffLocation} by {item.riderName}</p>
                <button onClick={() => AcceptRide(item.rideId)}>Accept Ride</button>
            </div>
        )
    })

    return(
        <section className="rides">
            {requestedRides}
        </section>
    )
}