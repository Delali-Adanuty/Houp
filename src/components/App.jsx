import Banner from "./Banner"
import SubmitRide from "./SubmitRide";
import AcceptRide from "./AcceptRide";
import Role from "./Role";
import {getAuth, onAuthStateChanged} from "firebase/auth"
import { useState } from "react";

export default function App(){
  const [signedIn, setSignedIn] = useState(false)
  const [role, setRole] = useState('')

  const auth = getAuth();
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
    <AcceptRide /> : 
    null
    }
    </>
  )
}