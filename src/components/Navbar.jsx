import { getAuth, signOut } from "firebase/auth"

export default function Navbar(){

    const auth = getAuth();
    
    function LogOut(){
        signOut(auth)
        .then(() => {
            console.log("logged out successfully")
            location.reload();
        }).catch((error) => {
            console.log(error)
        })
    }

    return(
        <nav>
            <ul className="right">
                <button onClick={LogOut}>Sign out</button>
            </ul>
        </nav>
    )
}