import { useState } from "react";
import {
    serverTimestamp, 
    addDoc, 
    collection,
    setDoc,
    doc
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import FeatherIcon from 'feather-icons-react'

export default function SubmitRide(){
    const auth = getAuth();
    const user = auth.currentUser;
    const [errorMessage, setErrorMessage] = useState('')

    async function getData(formData){
        const pickupLocation = formData.get("pickup");
        const dropoffLocation = formData.get("dropoff");
        if (!pickupLocation){
            setErrorMessage("Please enter a valid pickup location")
        }
        if(!dropoffLocation){
            setErrorMessage("Please enter a valid dropoff location")
        }

        if(pickupLocation && dropoffLocation){
            await addDoc(collection(db, "rides"),{
                riderName: user.displayName,
                pickupLocation: pickupLocation,
                dropoffLocation: dropoffLocation,
                status: "Looking for a driver",
                requestedAt:serverTimestamp(),
                riderId: user.uid,
                riderEmail:user.email
            });   
            setDoc(doc(db, "users", user.uid), {
                isRiding:true
            }, {merge:true})
        }
    }

    function closeSubmitRide(){
        setDoc(doc(db, "users", user.uid), {
            currentRole:""
        }, {merge:true})               
    }

    return(
        <>
        <ul className="close">
            <button className="close-button" onClick={closeSubmitRide}>
                <FeatherIcon icon="x" size="30"/>
            </button>
        </ul>
        <section className="submit-ride">
            <form action={getData}>
                {errorMessage && 
                    <div className="error-block">
                        {errorMessage}
                    </div>
                }
                <h1>Where do you wanna Houp to?</h1>
                <label htmlFor="pickup">Enter your pickup location:</label>
                <section>
                    <input type="text" name="pickup" id="pickup" placeholder="Target"/>
                    <button type="button">Use current location</button>
                </section>
                <label htmlFor="dropoff">Enter your destination:</label>
                <input type="text" name="dropoff" id="dropoff" />
                <button>Submit</button>
            </form>
        </section>        
        </>
    )
}