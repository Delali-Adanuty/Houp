export default function Form(){

    function getData(formData){
        console.log(formData.get("test"))
    }

    return(
        <section className="form">
            <form action={getData}>
                <h1>Create an Account to start Houping!</h1>
                <label htmlFor="email">Enter your email:</label>
                <input 
                type="email" 
                name="email"
                placeholder="johndoe@example.com"
                id="email"
                />
                <label htmlFor="password">Enter your password: </label>
                <input 
                type="password" 
                name="password"
                placeholder="securepassword@1"
                id="password"
                />
                <label htmlFor="confirm-password">Confirm your password: </label>
                <input 
                type="password" 
                name="confirm-password"
                placeholder="securepassword@1"
                id="confirm-password"
                />
                <button>Create Account</button>
                <div>
                    <a href="#!" className="switch">
                        Already have an account? Log In
                    </a>
                </div>
            </form>
        </section>
    )
}