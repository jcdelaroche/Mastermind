import { useContext } from "react";
import { SettingsContext } from "../../Context/SettingsContext";

export default function PlayersSettings() {

    const { playerCount, setPlayerCount } = useContext(SettingsContext);

    const handlePlayer = ({ target: { value } }) => setPlayerCount(parseInt(value));

    return(
        <form className="players-settings">
            {
                [1, 2].map((element, index) => {
                    return (
                        <div className="player-settings" key={index}>
                            <label htmlFor={`player-settings-${element}`} className="rad-label">
                                <input type="radio" className="rad-input" checked={playerCount === element} onChange={handlePlayer} id={`player-settings-${element}`} value={element}/>
                                <div className="rad-design"></div>
                                <div className="rad-text">{element}</div>
                            </label>
                        </div>
                    )
                })
            }
        </form>
    )

}