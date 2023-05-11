function SubTitle({ fontSize = "2rem", color = "white", textAlign = "left", textShadow = "2px 2px 4px #000", children }) {

    const style = {
        color,
        fontSize,
        textAlign,
        fontFamily: "'Alef', sans-serif",
        textShadow,
    }

    return <h1 style={style}>{children}</h1>;
}

export default SubTitle;