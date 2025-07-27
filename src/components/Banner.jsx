import Form from "./Form"
import { forwardRef } from "react"
const Banner = forwardRef((props, ref) => {
    return(
            <section ref={ref} className="banner">
                <ul className="left">
                    <h1>Houp.</h1>
                    <p>Need a ride...  just houp!</p>
                </ul>
                <ul className="right">
                    <Form />
                </ul>
            </section>
    )
})

export default Banner;