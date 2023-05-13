import { useState } from "react";

export default function Morpion() {
    const styleGrid = {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(3, 1fr)",
        width: "300px",
        height: "300px",
        border: "1px solid black"
    }
    const styleCell = {
        width: "100px",
        height: "100px",
        border: "1px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "50px"
    }

    const [game, setGame] = useState([
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ]);


    const [win, setWin] = useState("");


    function handlePlay(e) {
        if (win !== "") {
            setWin(() => { return "" });
            setGame(() => {
                return [
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    ""
                ]
            });

        } else if (game[e] === "") {
            setGame((currentGame) => {
                let newGame = currentGame.map((cell, index) => {
                    if (index === e) {
                        if (cell === "X" || cell === "O") {
                            return cell;
                        }
                        return "X";
                    }
                    return cell;
                })
                isFinished(newGame);
                if (win === "") {
                    botPlay(newGame);
                }
                return newGame;
            });                
        }
        
    }

    function botPlay(newGame) {
        let emptySlots = newGame.reduce((acc, cell, index) => {
            if (cell === "") {
                acc.push(index);
            }
            return acc;
        }, []);
        console.log("emptyslots",emptySlots);
        let randomIndex = Math.floor(Math.random() * emptySlots.length);
        console.log("randomIndex",randomIndex);
        let randomCell = emptySlots[randomIndex];
        console.log("randomCell",randomCell);
        setGame((currentGame) => {
            let botGame = currentGame.map((cell, index) => {
                if (index === randomCell) {
                    if (cell === "X" || cell === "O") {
                        return cell;
                    }
                    return "O";
                }
                return cell;
            });
            console.log("botGame",botGame);
            isFinished(botGame);
            return botGame;
        });
    }

    function isFinished(currentGame) {
        console.log("isFinished");
        console.log(currentGame);
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        const checkWin = (currentGame, player) => {
            for (let i = 0; i < winConditions.length; i++) {
                const [a, b, c] = winConditions[i];
                if (currentGame[a] === player && currentGame[b] === player && currentGame[c] === player) {
                    return true;
                }
            }
            return false;
        }

        const checkDraw = (game) => {
            return game.every((cell) => cell !== "");
        }

        const handleGameEnd = (game) => {
            if (checkWin(game, "X")) {
                setWin("Vous avez gagné !");
            } else if (checkWin(game, "O")) {
                setWin("Vous avez perdu (ptdr t'es nul le bot met au pif)");
            } else if (checkDraw(game)) {
                setWin("C'est une égalité (ptdr t'es nul le bot met au pif)");
            }
        }

        handleGameEnd(currentGame);
    }

    return (
        <>
            <div style={styleGrid} className="morpion-grid">
                {game.map((cell, index) =>
                    <div style={styleCell} className="morpion-cell" key={index} onClick={() => handlePlay(index)}>
                        {cell}
                    </div>
                )}
            </div>
            <span>{win}</span>
        </>

    )
}