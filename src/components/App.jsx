import Banner from "./Banner"
import SubmitRide from "./SubmitRide";
import {getAuth, onAuthStateChanged} from "firebase/auth"
import { useState } from "react";

export default function App(){
  const [signedIn, setSignedIn] = useState(false)

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if(user){
      setSignedIn(true)
    }
  })
  return(
    <>
    {signedIn ? 
    <SubmitRide /> :
    <Banner />}
    </>
  )
}