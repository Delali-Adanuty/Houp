import {app, db} from "../firebase";
import {getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    sendSignInLinkToEmail,
    signOut,
    sendPasswordResetEmail
} from "firebase/auth"
import { useState } from "react";
import {doc, serverTimestamp, setDoc } from "firebase/firestore";

export default function Form(){
    
    const auth = getAuth(app);
    const [errorMessage, setErrorMessage] = useState('');
    const [action, setAction] = useState("signup")

    const provider = new GoogleAuthProvider();

    function verifyEmail(email){
        const actionCodeSettings = {
            url: "http://localhost:8888/",
            handleCodeInApp:true,
        }
        sendSignInLinkToEmail(auth, email, actionCodeSettings)
        .then(() => {
            window.localStorage.setItem("emailForSignIn", email);
        }).catch((error) => {
            setErrorMessage(error.message)
        })        
    }

    async function createUser(user, userName){
                    await setDoc(doc(db, "users", user.uid), {
                        email:user.email,
                        name:userName,
                        createdAt: serverTimestamp(),
                        isDriving:false,
                        isRiding:false,
                        currentRole:""
                    })        
    }


    async function getData(formData){
        const emailInput = formData.get("email");
        const passwordInput = formData.get("password");
        const nameInput = formData.get("name")
        
        if(action === "reset"){
            sendPasswordResetEmail(auth, emailInput)
            .then(() => {
                location.reload()
            })
            .catch((error) => {
                setErrorMessage(error.message)
            })
        }
        else if (action === "signup"){
            const confirmPasswordInput = formData.get("confirm-password");

            if(emailInput.endsWith(".edu")){
                if(passwordInput == confirmPasswordInput){
                    try{
                        const userCredential = await createUserWithEmailAndPassword(auth, emailInput, passwordInput)
                        const user = userCredential.user

                        updateProfile(auth.currentUser, {
                            displayName:nameInput
                        });

                        createUser(user, nameInput)
                        verifyEmail(user.email);
                    }catch(error){
                        setErrorMessage(error.message)
                    }
                }else{
                    setErrorMessage("Please the passwords are not the same")
                }                
            }else{
                setErrorMessage("Please sign up with your student email")
            }

        }else{
            try{
                await signInWithEmailAndPassword(auth, emailInput, passwordInput)
            }catch(error){
                setErrorMessage(error.message)
            }
        }

    }

    function switchAction(data){
        if(data){
            setAction(data)
        }else{
            setAction(prev => {
                if (prev === "signup"){
                    return "signin"
                }else{
                    return "signup"
                }
            })
        }
    }

async  function googleSignup(e){
        e.preventDefault();
        signInWithPopup(auth, provider)
        .then((result) => {
            const isNewUser = result._tokenResponse?.isNewUser;
            const email = (result.user.email)
            if(email.endsWith(".edu")){
                if(isNewUser){
                    verifyEmail(email)
                }
                const user = result.user;
                createUser(result.user, user.displayName)
            }else{
                signOut(auth)
                .then(() => {
                    location.reload()
                    alert("Please use a student email")
                })
            }
        }).catch((error) => {
            setErrorMessage(error.message);
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
                {action === "signup" ?
                <h1>Create an Account to start Houping!</h1> : 
                action === "signin" ? 
                <h1>Log into your account !</h1> :
                <h1>Reset your password</h1>
            }
                
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
                {action != "reset" &&
                <>
                    <label htmlFor="password">Enter your password: </label>
                    <input 
                    type="password" 
                    name="password"
                    placeholder="securepassword@1"
                    id="password"
                    />
                </>
                }
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

                <button>{action==="signin" ? "Sign In" : action === "signup" ? "Create Account" : "Reset password"}</button>
                <div>         
                    {action != "reset" &&
                    <>
                        <a href="#!" className="switch" onClick={() => switchAction('reset')}>
                            {action === "signup" ?null : "Reset Password"}
                        </a>                                              
                    </>
                    }
                        <a href="#!" className="switch" onClick={() => switchAction('')}>
                            {action === "signup" ? "Already have an account? Log In" : "Create Account"}
                        </a>                       
                </div>
                <hr />
                <button onClick={googleSignup} className="auth">Sign in with Google</button>
            </form>
        </section>
    )
}