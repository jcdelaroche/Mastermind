import { useContext, useEffect, useRef, useState } from "react";
import Menu from "../Components/Buttons/Menu";
import SubTitle from "../Components/Text/SubTitle";
import Title from "../Components/Text/Title";
import { SettingsContext } from "../Context/SettingsContext";
import { ColorCombination } from "../Class/ColorCombination";
import { Games } from "../Class/Games";


function Board() {


    const { settings } = useContext(SettingsContext);
    const [refresh, setRefresh] = useState(0)
    const [Game, setGame] = useState(new Games(settings));

    /* INITIALISATION DU CODE GAGNANT */
    useEffect(() => {
        Game.setWinningCode(Game.forceCode(["red", "blue", "green", "yellow"]));
    }, []);

    /* PIONS SELECTIONNES PAR DEFAULT  */
    const defaultPionsSelected = () => {
        return [...Array(settings.codeLength)].map((x, index) => {
            return {"index": index, "color": null}
        })
    }

    /* Pions Selectionnés par le joueur */
    const [pionsSelected, setPionsSelected] = useState(defaultPionsSelected());

    /* UPDATE THE RENDER OF VARIABLES */
    const forceUpdate = () => setRefresh(refresh + 1);

    /* WHEN PLAYER WANT TO GUESS */
    const handleGuess = () => {

        const combinaison = new ColorCombination(JSON.parse(JSON.stringify(pionsSelected)));

        if(combinaison.complete()){
            const result = Game.getWinningCode().try(combinaison);
            
            if(result.result){
                Game.win()
            } else {
                Game.addGuess(combinaison, result)
                setPionsSelected(defaultPionsSelected());
            }

            forceUpdate();

        } else {
            console.log("Il me manque des couleurs");
        }

    }


    /* PION SELECTION */
    const unSelectPion = (index) => {
        setPionsSelected(pionsSelected.map((pionSelected) => {
            if(pionSelected.index === index) pionSelected.color = null;
            return pionSelected;
        }));
    }
    const [colorSelected, setColorSelected] = useState(null);
    const onDragStart = ({target: { dataset: { color } }}) => setColorSelected(color);
    const onDragStop = () => setColorSelected();
    const onPionClick = ({target: { dataset: { color } }}) => {
        let finish = false;
        setPionsSelected(pionsSelected.map((pionSelected) => {
            if(pionSelected.color === null && !finish) {
                pionSelected.color = color;
                finish = true;
            };
            return pionSelected;
        }));
    };
    
    const handleDrop = ({target: {dataset: {index}}}) => {
        setPionsSelected(pionsSelected.map((pionSelected) => {
            if(pionSelected.index === parseInt(index)) pionSelected.color = colorSelected;
            return pionSelected;
        }));
    }
    const handleDragOver = (event) => event.preventDefault();
    /* END - PION SELECTION */

    return (
        <div>
            <Menu />
            <section className="game">
                <Title fontSize="3rem" />
                
                <SubTitle>Couleurs disponible : {Game.name}</SubTitle>
                <div className="pions-container" style={{ margin: "20px 0", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                    {
                        settings.colorEnabled.map((color, index) => {
                            return <span data-color={color} onClick={onPionClick} onDragStart={onDragStart} onDragEnd={onDragStop} key={index} className={`pion ${color}`} draggable></span>
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
                <button onClick={handleGuess}>Deviner</button>
                <SubTitle>Essais : </SubTitle>
                <div className="pions-played" style={{ margin: "20px 0", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                    <ul style={{ listStyle:"none", display: "flex", flexDirection: "column", gap: "25px" }}>
                        {
                            (Game.getGuesses()).map((guess, index) =>
                            <li key={index} className="pions-selection-guessed">
                                {guess.colors.getCode().map((code, i) =>
                                    <div key={i} className="pions-guessed">
                                        <span className={`pion ${code.color != null ? code.color : ""}`} style={{ cursor: "default" }}></span>
                                        <span className={`guess-result ${(guess.details) ? (guess.details.details[i] != "incorrect") ? guess.details.details[i] : "" : "" }`}></span>
                                    </div>
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

export default Board;