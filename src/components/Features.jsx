import pic from '../assets/images/360_F_102038045_1ropJBtqleEFaOu7V37WWpOe7ccUZM7R.jpg'

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
                    <img src={pic} alt="driver cartoon" />
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
            <div className="card">
                <ul className="left">
                    <h2>What is Houp?</h2>
                    <p className='text'>
                        A ride sharing service that helps students get around campus and town safely, easily and for free. Whether you need a ride or want to offer one, 
                        Houp connects you with other students going the same way. No fees, no strangers, just your campus community helping each other out!
                    </p>
                </ul>
                <ul className="right">
                    <h2>How does it work?</h2>
                    <ol>
                        <li>Create an accout with your student email address</li>
                        <li>Choose your role(passenger or driver)</li>
                        <li>Match up and Houp to your destination!</li>
                    </ol>
                </ul>
            </div>        
        </section>
    )
}