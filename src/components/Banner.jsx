import Form from "./Form"

export default function Banner(){
    return(
            <section className="banner">
                <ul className="left">
                    <h1>Houp.</h1>
                    <p>Need a ride...  just houp!</p>
                </ul>
                <ul className="right">
                    <Form />
                </ul>
            </section>
    )
}