import {app, db} from "../firebase";
import {getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from "firebase/auth"
import { useState } from "react";
import {doc, serverTimestamp, setDoc } from "firebase/firestore";

export default function Form(){
    
    const auth = getAuth(app);
    const [errorMessage, setErrorMessage] = useState('');
    const [action, setAction] = useState("signup")


    async function getData(formData){
        const emailInput = formData.get("email");
        const passwordInput = formData.get("password");
        const nameInput = formData.get("name")
        if (action === "signup"){
            const confirmPasswordInput = formData.get("confirm-password");

            if(passwordInput == confirmPasswordInput){
                try{
                    const userCredential = await createUserWithEmailAndPassword(auth, emailInput, passwordInput)
                    const user = userCredential.user

                     updateProfile(auth.currentUser, {
                        displayName:nameInput
                    });
                    
                    await setDoc(doc(db, "users", user.uid), {
                        email:user.email,
                        name:nameInput,
                        createdAt: serverTimestamp(),
                        isDriving:false
                    })
                }catch(error){
                    setErrorMessage(error.message)
                }
            }else{
                setErrorMessage("Please the passwords are not the same")
            }
        }else{
            try{
                await signInWithEmailAndPassword(auth, emailInput, passwordInput)
            }catch(error){
                setErrorMessage(error.message)
            }
        }

    }

    function switchAction(){
        setAction(prev => {
            if (prev === "signup"){
                return "signin"
            }else{
                return "signup"
            }
        })
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
                {action === "signup" && 
                <>
                    <label htmlFor="name">Enter your name:</label>
                    <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    required
                    placeholder="John Doe" />                
                </>
}
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
                {action === "signup" &&
                <>
                    <label htmlFor="confirm-password">Confirm your password: </label>
                    <input 
                    type="password" 
                    name="confirm-password"
                    placeholder="securepassword@1"
                    id="confirm-password"
                    />               
                </>
                }

                <button>{action==="signin" ? "Sign In" : "Create Account"}</button>
                <div>
                    <a href="#!" className="switch" onClick={switchAction}>
                        {action === "signup" ? "Already have an account? Log In" : "Create Account"}
                    </a>
                </div>
            </form>
        </section>
    )
}