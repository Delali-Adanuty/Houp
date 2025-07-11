import Banner from "./Banner"
import SubmitRide from "./SubmitRide";
import AcceptRide from "./AcceptRide";
import Role from "./Role";
import {getAuth, onAuthStateChanged} from "firebase/auth"
import { useState, useEffect } from "react";
import { 
  // getDoc,
  // doc,
  onSnapshot,
  collection,
  query,
  where
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


  
  // if (signedIn){
  //   const user = auth.currentUser
  //   // const userRef = doc(db, "users", user.uid)
  //   // fetchUserData(user);
  // }

    useEffect(() => {
        
        if(auth.currentUser){
          const usersRef = collection(db, "users")
          const q = query(usersRef,   where("email", "==", auth.currentUser.email));

          const unsubscribe =  onSnapshot(q, (snapshot) => {
              snapshot.forEach((doc) => {
                  setIsDriving(doc.data().isDriving)
                  setIsRiding(doc.data().isRiding)
              })
          })    

          return () => unsubscribe();
        }

    }, [signedIn]);    


  // async function fetchUserData(userRef){
  //   const userSnap = await getDoc(userRef)

  //   if(userSnap.exists()){
  //     const userData = userSnap.data()
  //     setIsDriving(userData.isDriving)
  //     setIsRiding(userData.isRiding)
  //   }
  // }

  
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
    role === "" &&!isRiding &&!isDriving? 
  <Role  onClick = {handleRole}/>:
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
    </>
  )
}