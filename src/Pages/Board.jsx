import { useContext, useEffect, useRef, useState } from "react";
import Menu from "../Components/Buttons/Menu";
import SubTitle from "../Components/Text/SubTitle";
import Title from "../Components/Text/Title";
import { SettingsContext } from "../Context/SettingsContext";
import { ColorCombination } from "../Class/ColorCombination";
import { Games } from "../Class/Games";
import { GameState } from "../Constant/Constant";
import { Link } from "react-router-dom";


function Board() {


    const { settings } = useContext(SettingsContext);
    const [refresh, setRefresh] = useState(0)
    const [Game, setGame] = useState(new Games(settings));
    const [colorSelected, setColorSelected] = useState(null);
    const [attempt, setAttempt] = useState(0);
    const [gameState, setGameState] = useState(GameState.PLAYING);


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
                setGameState(GameState.WON);
            } else {
                Game.addGuess(combinaison, result)

                if(Game.getGuessesRemaining() === 0)
                {
                    Game.loose();
                    setGameState(GameState.LOST);
                }
            }
            setAttempt((Game.getAttemptsLength() === 0) ? 1 : Game.getAttemptsLength());
            setPionsSelected(defaultPionsSelected());
            forceUpdate();
        }

    }

    const handleResetGame = () => {
        setGameState(GameState.PLAYING);
        Game.reset();
    }

    const handleErase = () => {
        setPionsSelected(defaultPionsSelected());
    }

    /* PION SELECTION */
    const unSelectPion = (index) => {
        setPionsSelected(pionsSelected.map((pionSelected) => {
            if(pionSelected.index === index) pionSelected.color = null;
            return pionSelected;
        }));
    }
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
        <>
            <Menu />
            <section className="game">

                {(gameState !== GameState.PLAYING) ? 
                <div className="win">
                    <div className="modal">
                        <div className="header">
                            <SubTitle color="black" textAlign="center" textShadow="">{(gameState === GameState.WON) ? "Vous avez gagné" : "Vous avez perdu" }</SubTitle>
                            <SubTitle fontSize="1.5rem" color="black" textAlign="center" textShadow="">Nombre de tentatives : <strong>{attempt}</strong></SubTitle>
                            <SubTitle fontSize="1.5rem" color="black" textAlign="center" textShadow="">Le code était : </SubTitle>
                            <div className="pions-played" style={{ margin: "20px 0", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                                {
                                    Game.getWinningCode().explode().map((code, index) =>
                                        <span key={index} className={`pion ${code}`} style={{ cursor: "default" }}></span>
                                    )
                                }
                            </div>

                        </div>
                        <div className="footer">
                            <button onClick={handleResetGame}>Rejouer</button>
                            <Link to="/"><button id="modalBack">Retour au menu</button></Link>
                        </div>
                    </div>
                </div> 
                : null}

                <Title fontSize="3rem" />
                
                <SubTitle>Couleurs disponible : </SubTitle>
                <div className="pions-container" style={{ margin: "20px 0", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                    {
                        settings.colorEnabled.map((color, index) => {
                            return <span data-color={color} onClick={onPionClick} onDragStart={onDragStart} onDragEnd={onDragStop} key={index} className={`pion ${color}`} draggable></span>
                        })
                    }
                </div>
                <SubTitle>Votre choix </SubTitle>
                    <div className="selections">
                        <div className="pions-played" style={{ margin: "20px 0", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                        {
                            pionsSelected.map((pionSelected, index) =>
                                <span key={index} onDragOver={handleDragOver} onDrop={handleDrop} data-index={pionSelected.index} className={`pion ${pionSelected.color != null ? pionSelected.color : ""}`} onClick={() => { unSelectPion(pionSelected.index) }}></span>
                            )
                        } 
                        </div>

                        <div className="actions">
                            <button onClick={handleGuess}>Vérifier</button>
                            <button onClick={handleErase}>Effacer</button>
                        </div>
                    </div>

                <SubTitle>Essais : </SubTitle>
                <div className="pions-played" style={{ margin: "20px 0", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                    <ul style={{ listStyle:"none", display: "flex", flexDirection: "column", gap: "25px" }}>
                        {
                            (Game.getGuesses()).map((guess, index) =>
                            <li key={index} className="pions-selection-guessed">
                                {guess.colors.getCode().map((code, i) =>
                                    <div key={i} className="pions-guessed">
                                        <span className={`pion ${code.color != null ? code.color : ""}`} style={{ cursor: "default" }}></span>
                                        <span className={`guess-result ${(guess.details) ? (guess.details.details[i] !== "incorrect") ? guess.details.details[i] : "" : "" }`}></span>
                                    </div>
                                )}
                            </li>
                            )
                        } 
                    </ul>
                </div>
            </section>
        </>
    );

}

export default Board;