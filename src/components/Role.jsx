export default function Role(props){
    return(
        <section className="role">
            <button className="rider" onClick={() => props.onClick("rider")}>I need to houp</button>
            <button className="driver" onClick={() => props.onClick("driver")}>I'm driving!</button>
        </section>
    )
}