import { useState } from "react";
import {doc, serverTimestamp, setDoc} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

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
            await setDoc(doc(db, "rides", user.uid),{
                riderName: user.displayName,
                pickupLocation: pickupLocation,
                dropoffLocation: dropoffLocation,
                status: "requested",
                requestedAt:serverTimestamp()
            });
        }
    }
    return(
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
    )
}