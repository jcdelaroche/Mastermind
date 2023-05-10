import { useContext, useEffect, useState } from "react";
import Menu from "../Components/Buttons/Menu";
import SubTitle from "../Components/Text/SubTitle";
import Title from "../Components/Text/Title";
import { SettingsContext } from "../Context/SettingsContext";

function Game() {

    const { settings } = useContext(SettingsContext);

    const [pionsPlayed, setPionPlayed] = useState([...Array(settings.pionCount)].map((x, index) =>
        {
            return {"index": index, "color": settings.colorSelected[Math.floor(Math.random() * settings.colorSelected.length)]}
        }
    ));
    const [pionsSelected, setPionsSelected] = useState([...Array(settings.pionCount)].map((x, index) =>
        {
            return {"index": index, "color": null}
        }
    ));
    
    
    const [tries, setTries] = useState([...Array(settings.tryCount)].map((x, index) =>
        {
            return [...Array(settings.pionCount)].map((x, index) =>
            {
                return {"index": index, "color": null}
            })
        }
    ));

    const handleGuess = () => {
    
        // compare pionsPlayed and pionsSelected
        let pionsPlayedCopy = [...pionsPlayed];
        let pionsSelectedCopy = [...pionsSelected];

    }
    

    const unSelectPion = (index) => {
        setPionsSelected(pionsSelected.map((pionSelected) => {
            if(pionSelected.index === index) pionSelected.color = null;
            return pionSelected;
        }));
    }

    const [colorSelected, setColorSelected] = useState(null);
    const onDragStart = ({target: { dataset: { color } }}) => setColorSelected(color);
    const onDragStop = () => setColorSelected();
    const handleDrop = ({target: {dataset: {index}}}) => {
        setPionsSelected(pionsSelected.map((pionSelected) => {
            if(pionSelected.index === parseInt(index)) pionSelected.color = colorSelected;
            return pionSelected;
        }));
    }

    const handleDragOver = (event) => event.preventDefault();
    
    return (
        <div>
            <Menu />
            <section className="game">
                <Title fontSize="3rem" />
                <SubTitle>Couleurs disponible : </SubTitle>
                <div className="pions-container" style={{ margin: "20px 0", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                    {
                        settings.colorSelected.map((color, index) => {
                            return <span data-color={color} onDragStart={onDragStart} onDragEnd={onDragStop} key={index} className={`pion ${color}`} draggable></span>
                        })
                    }
                </div>
                <SubTitle>Votre choix </SubTitle>
                <div className="pions-played" style={{ margin: "20px 0", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                    {
                        pionsSelected.map((pionSelected, index) =>
                            <span key={index} onDragOver={handleDragOver} onDrop={handleDrop} data-index={pionSelected.index} className={`pion ${pionSelected.color != null ? pionSelected.color : ""}`} onClick={() => { unSelectPion(pionSelected.index) }}></span>
                        )
                    } 
                </div>

                <SubTitle>Essais : </SubTitle>
                <div className="pions-played" style={{ margin: "20px 0", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                    <ul style={{ listStyle:"none", display: "flex", flexDirection: "column", gap: "10px" }}>
                        {
                            tries.map((tryy, index) =>
                                <li key={index}>
                                    
                                    {tryy.map((pion, index) =>
                                        <span key={index} className={`pion ${pion.color != null ? pion.color : ""}`} style={{ cursor: "default" }}></span>
                                    )}

                                </li>
                            )
                        } 
                    </ul>
                </div>
            </section>
        </div>
    );

}

export default Game;