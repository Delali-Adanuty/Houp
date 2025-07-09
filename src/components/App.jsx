import Banner from "./Banner"
import SubmitRide from "./SubmitRide";
import AcceptRide from "./AcceptRide";
import Role from "./Role";
import {getAuth, onAuthStateChanged} from "firebase/auth"
import { useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import DriverRiding from "./DriverRiding";

export default function App(){
  const [signedIn, setSignedIn] = useState(false)
  const [role, setRole] = useState('');
  const [isDriving, setIsDriving]  = useState(false)

  const auth = getAuth();
  if (signedIn){
    const user = auth.currentUser
    const userRef = doc(db, "users", user.uid)
    fetchUserData(userRef);
    
  }

  async function fetchUserData(userRef){
    const userSnap = await getDoc(userRef)

    if(userSnap.exists()){
      const userData = userSnap.data()
      setIsDriving(userData.isDriving)
    }
  }

  
  onAuthStateChanged(auth, (user) => {
    if(user){
      setSignedIn(true)
    }
  })

  function handleRole(value){
    setRole(value)
  }
  return(
    <>
    {signedIn ? 
    role === "" ? 
  <Role  onClick = {handleRole}/>:
    null:
    <Banner />}


    {signedIn && role ?
    role === "rider" ?
    <SubmitRide /> : 
    !isDriving ?
    <AcceptRide /> : 
    null:
    null
    }

    {isDriving ? 
    <DriverRiding />:
    null}
    </>
  )
}