import { useLocation, useNavigate, useParams } from "react-router-dom";
import SubTitle from "../Components/Text/SubTitle";
import { INTERNAL_URL, URL } from "../Constant/Constant";
import Menu from "../Components/Buttons/Menu";
import Title from "../Components/Text/Title";
import Morpion from "../Components/Minigames/Morpion";
import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";

import io from "socket.io-client";
import Socket from "../Class/Socket";

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

        (async() => {
            const checkRoom = await Socket.send(socket, 'checkRoom', room_id)
            if(checkRoom === 404) setTimeout(() => navigate(INTERNAL_URL.ROOT), 1);

            if(location.state === null){
                const joinRoom = await Socket.send(socket, 'joinRoom', room_id)

                switch(joinRoom.status){
                    case "notFound":
                        return setTimeout(() => navigate(INTERNAL_URL.ROOT), 1);
                        break;
                    case "full":
                        return setTimeout(() => navigate(INTERNAL_URL.ROOT), 1);
                        break;
                    case "success":
                        setRoom(joinRoom.room);
                        break;
                }
            } else {
                const room = await Socket.send(socket, 'updatePlayer', location.state.response.room.host.id)
                setHost(true);
                setRoom(room);
            }
        })()

        socket.off("roomUpdated");
        socket.on("roomUpdated", (newRoom) => {
            if(newRoom.player === null) setHost(true);
            setRoom(newRoom);
        })

        socket.off("roomDeleted");
        socket.on("roomDeleted", () => {
            return setTimeout(() => navigate(INTERNAL_URL.ROOT), 1);
        })

        socket.off("leaveRoomResponse");
        socket.on("leaveRoomResponse", (response) => {
            return setTimeout(() => navigate(INTERNAL_URL.ROOT), 1);
        })

        socket.off("gameStarting");
        socket.on("gameStarting", (response) => {

            if(response.status === "success"){
                navigate(`${INTERNAL_URL.GAME}${response.room.id}`, {state: {response, host}});
            }
        })

    }, [])
    

    const handlePlay = () => Socket.send(socket, "startGame", room.id)
    
    const copyClipboard = () => {
        const url = document.querySelector(".room span");
        const range = document.createRange();
        range.selectNode(url);
        window.getSelection().addRange(range);

        navigator.clipboard.writeText(`${URL.LOBBY}${room_id}`);
    }

    const handleChangeAvatar = (direction) => {
        Socket.send(socket, "updateAvatar", {room_id: room.id, direction, host});
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

                        <div style={{ display: "flex", alignItems: "center", alignItems: "center", gap: "5px" }}>
                            <input className="input-lobby-name" id="host-username" type="text" disabled value={(room.host) ? room.host.username : "Vous"} />
                        </div>
                    </div>
                    <div className="player">
                        <div className="avatarMenu">
                            {!host ? <button className="imgButtons previous" onClick={() => {handleChangeAvatar("previous")}}>&lsaquo;</button> : undefined}
                            <img src={(room.player) ? room.player.avatar : URL.DEFAULT_AVATAR} alt="" />
                            {!host ? <button className="imgButtons next" onClick={() => {handleChangeAvatar("next")}}>&rsaquo;</button> : undefined}
                        </div>
                        
                        <div style={{ display: "flex", alignItems: "center", alignItems: "center", gap: "5px" }}>
                            <input className="input-lobby-name" id="player-username" type="text" disabled value={(room.player) ? room.player.username : "Ordinateur"} />
                        </div>
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