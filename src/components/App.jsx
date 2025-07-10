import Banner from "./Banner"
import SubmitRide from "./SubmitRide";
import AcceptRide from "./AcceptRide";
import Role from "./Role";
import {getAuth, onAuthStateChanged} from "firebase/auth"
import { useState, useEffect } from "react";
import { 
  getDoc,
  doc, 
  collection,
  query,
  where,
  onSnapshot
} from "firebase/firestore";
import { db } from "../firebase";
import DriverRiding from "./DriverRiding";
import UserRiding from "./UserRiding";

export default function App(){
  const [signedIn, setSignedIn] = useState(false)
  const [role, setRole] = useState('');
  const [isDriving, setIsDriving]  = useState(false)
  const [isRiding, setIsRiding] = useState(false)

  const auth = getAuth(); 

    useEffect(() => {
        const user = auth.currentUser
        const usersRef = collection(db, "users")
        if(user){
        const q = query(usersRef,   where("email", "==", user.email));

        const unsubscribe =  onSnapshot(q, (snapshot) => {
            snapshot.forEach((doc) => {
              setIsRiding(doc.data().isRiding)
            })
        })    

        return () => unsubscribe();
        }

    }, [signedIn, auth.currentUser]);  

  
  if (signedIn){
    const user = auth.currentUser
    const userRef = doc(db, "users", user.uid)
    fetchUserData(userRef);
  }

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

  console.log(isRiding)
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

    {isRiding ? 
    <UserRiding />:
    null}
    </>
  )
}