import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { SettingsContext } from "../../Context/SettingsContext";
import SubTitle from "../Text/SubTitle";

function Play() {

    const { settings } = useContext(SettingsContext);


    return(
        <Link to={settings.playerCount === 1 ? '/game' : '/game/room/123456789'}><button><SubTitle fontSize="1.5rem" >Jouer</SubTitle></button></Link>
    )

}

export default Play;