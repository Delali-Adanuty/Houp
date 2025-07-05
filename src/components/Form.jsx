import {app, db} from "../firebase";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import { useState } from "react";
import {doc, serverTimestamp, setDoc } from "firebase/firestore";

export default function Form(){
    
    const auth = getAuth(app);
    const [errorMessage, setErrorMessage] = useState('');
    const [role, setRole] = useState("")


    async function getData(formData){
        const emailInput = formData.get("email");
        const passwordInput = formData.get("password");
        const confirmPasswordInput = formData.get("confirm-password");

        if(passwordInput == confirmPasswordInput){
            try{
                const userCredential = await createUserWithEmailAndPassword(auth, emailInput, passwordInput)
                const user = userCredential.user
                
                await setDoc(doc(db, "users", user.uid), {
                    email:user.email,
                    role:role,
                    createdAt: serverTimestamp()
                })
            }catch(error){
                setErrorMessage(error.message)
            }
        }else{
            setErrorMessage("Please the passwords are not the same")
        }
    }

    function handleRole(role){
        setRole(role)
    }

    return(
        <section className="form">
            <form action={getData}>
                {errorMessage && 
                    <div className="error-block">
                        {errorMessage}
                    </div>
                }
                <h1>Create an Account to start Houping!</h1>
                <label htmlFor="email">Enter your email:</label>
                <input 
                type="email" 
                name="email"
                placeholder="johndoe@example.com"
                id="email"
                />
                <label htmlFor="password">Enter your password: </label>
                <input 
                type="password" 
                name="password"
                placeholder="securepassword@1"
                id="password"
                />
                <label htmlFor="confirm-password">Confirm your password: </label>
                <input 
                type="password" 
                name="confirm-password"
                placeholder="securepassword@1"
                id="confirm-password"
                />
                <section className="set-role">
                    <button type="button"
                    className={`${role=== "rider" ? "active" : ""}  ` }
                    onClick={() => handleRole("rider")}>
                        I'm a Rider
                        </button>
                    <button type="button"
                    className={`${role === "driver" ? "active" : ""} `}
                    onClick={() => handleRole("driver")}>
                        I'm a Driver
                        </button>
                </section>
                <button disabled={role === "" ? true : false}>Create Account</button>
                <div>
                    <a href="#!" className="switch">
                        Already have an account? Log In
                    </a>
                </div>
            </form>
        </section>
    )
}