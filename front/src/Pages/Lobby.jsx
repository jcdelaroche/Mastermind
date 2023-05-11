import { Link, useNavigate, useParams } from "react-router-dom";
import SubTitle from "../Components/Text/SubTitle";
import { INTERNAL_URL, URL } from "../Constant/Constant";
import Menu from "../Components/Buttons/Menu";
import Title from "../Components/Text/Title";

import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../Context/SocketContext";

import io from "socket.io-client";

export default function Lobby() {

    const [socket, setSocket] = useState(io(URL.SOCKET));
    let navigate = useNavigate(); 
    const { room_id } = useParams();

    // const { socket } = useContext(SocketContext);

    const [host, setHost] = useState("Vous");
    const [player, setPlayer] = useState("Ordinateur");

    useEffect(() => {
        
        socket.emit("joinRoom", room_id);

        socket.on("joinRoomResponse", (response) => {
            switch(response.status){
                case "notFound":
                    navigate(INTERNAL_URL.ROOT)
                    break;
            }
            console.log(response.room);
        })


    }, [])

    const copyClipboard = () => {
        //Select the text
        const url = document.querySelector(".room span");
        const range = document.createRange();
        range.selectNode(url);
        window.getSelection().addRange(range);

        navigator.clipboard.writeText(`${URL.LOBBY}${room_id}`);
    }


    return (
        <>
            <Menu />
            <section className="lobby">
                <div className="header">
                    <Title />
                    <SubTitle textAlign="center" fontSize="2rem" >Salle d'attente</SubTitle>
                </div>
                <div className="players">
                    <div className="player">
                        <img src="" alt="" />
                        <span>{host}</span>
                        
                    </div>
                    <div className="player">
                        <img src="" alt="" />
                        <span>{player}</span>
                    </div>
                </div>
                <div className="room">
                    <span onClick={copyClipboard}>{`${URL.LOBBY}${room_id}`}</span>
                    <button onClick={copyClipboard}>Copier</button>
                </div>

                <Link to={`${URL.GAME}${room_id}`}><button className="play">Jouer</button></Link>

            </section>

        </>
    )
}