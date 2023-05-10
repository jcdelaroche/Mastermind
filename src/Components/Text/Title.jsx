function Title({ fontSize = "4rem", color = "white", textAlign = "center" }) {

    const style = {
        color,
        fontSize,
        textAlign,
        fontFamily: "'Bruno Ace SC', cursive",
        textShadow: "2px 2px 4px #000"
    }

    return <h1 style={style}>Mastermind</h1>;
}

export default Title;