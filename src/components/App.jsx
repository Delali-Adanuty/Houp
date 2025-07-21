import Banner from "./Banner"
import SubmitRide from "./SubmitRide";
import AcceptRide from "./AcceptRide";
import Role from "./Role";
import {getAuth, onAuthStateChanged} from "firebase/auth"
import { useState, useEffect } from "react";
import { 
  onSnapshot,
  collection,
  query,
  where
} from "firebase/firestore";
import { db } from "../firebase";
import DriverRiding from "./DriverRiding";
import UserRiding from "./UserRiding";
import Footer from "./Footer";

export default function App(){
  const [signedIn, setSignedIn] = useState(false)
  const [role, setRole] = useState('');
  const [isDriving, setIsDriving]  = useState(false)
  const [isRiding, setIsRiding] = useState(false)

  const auth = getAuth(); 

    useEffect(() => {
        
        if(auth.currentUser){
          const usersRef = collection(db, "users")
          const q = query(usersRef,   where("email", "==", auth.currentUser.email));

          const unsubscribe =  onSnapshot(q, (snapshot) => {
              snapshot.forEach((doc) => {
                  setIsDriving(doc.data().isDriving)
                  setIsRiding(doc.data().isRiding)
                  setRole(doc.data().currentRole)
              })
          })    

          return () => unsubscribe();
        }

    }, [signedIn]);    

  
  onAuthStateChanged(auth, (user) => {
    if(user){
      setSignedIn(true)
    }
  })



  return(
    <>
    {signedIn ? 
    role === "" &&!isRiding &&!isDriving? 
  <Role/>:
    null:
    <Banner />}


    {signedIn && role &&!isDriving && !isRiding?
    role === "rider"?
    <SubmitRide /> : 
    !isDriving ?
    <AcceptRide /> : 
    null:
    null
    }

    {isDriving ? 
    <DriverRiding />:
    null}

    {isRiding ? 
    <UserRiding />:
    null}

    {role === "" ?
    <Footer /> : 
    null
    }
    </>
  )
}