import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { SettingsContext } from "../../Context/SettingsContext";

function Play() {

    const { settings } = useContext(SettingsContext);

    return(
        <Link to={settings.playerCount === 1 ? '/game' : '/game/room/123456789'}><button>Jouer</button></Link>
    )

}

export default Play;