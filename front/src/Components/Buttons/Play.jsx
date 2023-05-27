import { useContext, useState } from "react";
import { SettingsContext } from "../../Context/SettingsContext";
import { URL, INTERNAL_URL, GAMEMODE } from "../../Constant/Constant";
import { useNavigate } from "react-router-dom";


import io from "socket.io-client";
import Alert from "../../Class/Alert";
import Socket from "../../Class/Socket";

export default function Play() {

    let navigate = useNavigate(); 

    const { settings } = useContext(SettingsContext);
    const [socket, setSocket] = useState(io(URL.SOCKET));

    const handlePlay = async () => {

        if(settings.colorEnabled.length < 2) return Alert.warning("Vous devez choisir au moins 2 couleurs");
        if(settings.maxGuesses < 1 || settings.maxGuesses > 20) return Alert.warning("Ce nombre d'essais n'est pas valide");
        if(![4, 5, 6].includes(settings.codeLength)) return Alert.warning("Ce nombre de pions n'est pas valide")
        
        const response = await Socket.send(socket, 'createRoom', settings)
        navigate(`${INTERNAL_URL.LOBBY}${response.room.id}`, {state: { response }})

    }

    return(
        <button onClick={handlePlay}>Créer la partie</button>
    )

}