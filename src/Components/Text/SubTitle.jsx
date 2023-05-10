function SubTitle({ fontSize = "2rem", color = "white", textAlign = "left", children }) {

    const style = {
        color,
        fontSize,
        textAlign,
        fontFamily: "'Alef', sans-serif",
        textShadow: "2px 2px 4px #000"
    }

    return <h1 style={style}>{children}</h1>;
}

export default SubTitle;