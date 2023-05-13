import { useLocation, useNavigate, useParams } from "react-router-dom";
import SubTitle from "../Components/Text/SubTitle";
import { INTERNAL_URL, URL } from "../Constant/Constant";
import Menu from "../Components/Buttons/Menu";
import Title from "../Components/Text/Title";
import Morpion from "../Components/Minigames/Morpion";

import { useEffect, useState } from "react";

import io from "socket.io-client";

export default function Lobby() {

    const [socket, setSocket] = useState(io(URL.SOCKET));
    const [room, setRoom] = useState({host: null, player: null});
    const [host, setHost] = useState(false);

    const navigate = useNavigate(); 
    const location = useLocation();

    const { room_id } = useParams();

    useEffect(() => {

        const button = document.querySelector(".back").getElementsByTagName("button")[0]
        button.removeEventListener("click", () => {});
        button.addEventListener("click", () => socket.emit("leaveRoom", room_id));

        socket.emit('checkRoom', room_id)
        socket.off("checkRoomResponse");
        socket.on("checkRoomResponse", (response) => (response.status === 404) ? navigate(INTERNAL_URL.ROOT) : null);

        if(location.state === null){
            socket.off("joinRoomResponse");
            socket.emit("joinRoom", room_id);
    
            socket.on("joinRoomResponse", (response) => {
                switch(response.status){
                    case "notFound":
                        navigate(INTERNAL_URL.HOME);
                        break;
                    case "full":
                        navigate(INTERNAL_URL.HOME);
                        break;
                    case "success":
                        setRoom(response.room);
                        break;
                }
            })
        } else {
            setHost(true);
            setRoom(location.state.response.room);
            socket.emit("updatePlayer", location.state.response.room.host.id);
        }

        socket.off("roomUpdated");
        socket.on("roomUpdated", (newRoom) => {
            setRoom(newRoom);
        })

        socket.off("roomDeleted");
        socket.on("roomDeleted", () => {
            navigate(INTERNAL_URL.ROOT);
        })

        socket.off("leaveRoomResponse");
        socket.on("leaveRoomResponse", (response) => {
            if(response.status === "notFound"){
                navigate(INTERNAL_URL.ROOT);
            }
            navigate(INTERNAL_URL.ROOT);
        })

        socket.off("gameStarting");
        socket.on("gameStarting", (response) => {
            if(response.status === "success"){
                navigate(`${INTERNAL_URL.GAME}${response.room.id}`, {state: {response, host}});
            }
        })

    }, [])
    

    const handlePlay = () => {
        socket.emit("startGame", room.id);
    }
    
    const copyClipboard = () => {
        const url = document.querySelector(".room span");
        const range = document.createRange();
        range.selectNode(url);
        window.getSelection().addRange(range);

        navigator.clipboard.writeText(`${URL.LOBBY}${room_id}`);
    }

    const handleChangeAvatar = (direction) => {
        socket.emit("updateAvatar", {room_id: room.id, direction, host});
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
                        <div className="avatarMenu">
                            {host ? <button className="imgButtons previous" onClick={() => {handleChangeAvatar("previous")}}>&lsaquo;</button> : undefined}
                            <img src={(room.host) ? room.host.avatar : URL.DEFAULT_AVATAR}  alt="" />
                            {host ? <button className="imgButtons next" onClick={() => {handleChangeAvatar("next")}}>&rsaquo;</button> : undefined}
                        </div>

                        <span>{(room.host) ? room.host.username : "Vous"}</span>
                    </div>
                    <div className="player">
                        <div className="avatarMenu">
                            {!host ? <button className="imgButtons previous" onClick={() => {handleChangeAvatar("previous")}}>&lsaquo;</button> : undefined}
                            <img src={(room.player) ? room.player.avatar : URL.DEFAULT_AVATAR} alt="" />
                            {!host ? <button className="imgButtons next" onClick={() => {handleChangeAvatar("next")}}>&rsaquo;</button> : undefined}
                        </div>
                        
                        <span>{(room.player) ? room.player.username : "Ordinateur"}</span>
                    </div>
                </div>
                {host ?
                <div className="room">
                    <span onClick={copyClipboard}>{`${URL.LOBBY}${room_id}`}</span>
                    <button onClick={copyClipboard}>Copier</button>
                </div>
                : <span>En attente de l'hôte...</span>}

                {host ? <button className="play" onClick={handlePlay}>Jouer</button> : undefined}


                <Morpion />

            </section>

        </>
    )
}