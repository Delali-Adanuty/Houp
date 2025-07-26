import { getAuth } from "firebase/auth"
import { 
    setDoc,
    doc
 } from "firebase/firestore";
import { db } from "../firebase";

export default function Role(){

    const auth = getAuth();
    const user = auth.currentUser;


    function setRole(role){
        setDoc(doc(db, "users", user.uid), {
            currentRole:role
        }, {merge:true})        
    }

    return(
        <section className="role">
            <button className="rider" onClick={() => setRole("rider")}>I need to houp</button>
            <button className="driver" onClick={() => setRole("driver")}>I'm driving!</button>
        </section>
    )
}