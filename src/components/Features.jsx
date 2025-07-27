export default function Features(props){
    return(
        <section className="features">
            <div className="card">
                <ul className="left">
                    <h2>Student rides. Student drivers. Zero cost.</h2>
                    <p>
                        Houp is a student platform bringing you safe, reliable and affordable (FREE!) transportation. 
                        Sign up to enjoy hassle-free rides whenever you need them
                    </p>
                    <button onClick={props.onClick}>Register Now!</button>
                </ul>

            </div>
            <div className="card">
                <ul className="right">
                    <img src="../src/assets/images/360_F_102038045_1ropJBtqleEFaOu7V37WWpOe7ccUZM7R.jpg" alt="" />
                </ul>
                <ul className="left">
                    <h2>Offer a ride, shrink your footprint</h2>
                    <p>
                        Whether you're headed across town or just to class, you can pick up a student on the way. 
                        <br />
                        Very flexible, very impactful.
                    </p>
                    <button onClick={props.onClick}>Sign up and drive!</button>
                </ul>                
            </div>            
        </section>
    )
}