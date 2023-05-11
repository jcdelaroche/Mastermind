import { useContext, useState } from "react";
import { SettingsContext } from "../../Context/SettingsContext";
import { URL, INTERNAL_URL } from "../../Constant/Constant";
import SubTitle from "../Text/SubTitle";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../Context/SocketContext";

import io from "socket.io-client";

function Play() {

    let navigate = useNavigate(); 
    // const { socket } = useContext(SocketContext);
    const { settings } = useContext(SettingsContext);

    const [socket, setSocket] = useState(io(URL.SOCKET));

    const handlePlay = () => {
        socket.emit("createRoom", settings);
        socket.on("roomCreated", (room) => {
            navigate(`${INTERNAL_URL.LOBBY}${room}`)
        })
    }

    return(
        <button onClick={handlePlay}><SubTitle fontSize="1.5rem">Créer la partie</SubTitle></button>
    )

}

export default Play;