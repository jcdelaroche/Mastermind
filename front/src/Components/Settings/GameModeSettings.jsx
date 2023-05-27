import { useContext } from "react";
import { SettingsContext } from "../../Context/SettingsContext";
import { GAMEMODE } from "../../Constant/Constant";

export default function GameModeSettings() {

    const { gameMode, setGameMode } = useContext(SettingsContext);

    const handleChange = ({ target: { value } }) => {
        const result = (GAMEMODE[value.toUpperCase()] === undefined) ? GAMEMODE.CLASSIC : GAMEMODE[value.toUpperCase()]
        setGameMode(result);
    }

    return (
        <form className="gamemode-settings">
            {Object.values(GAMEMODE).map((mode, index) => 
                <label htmlFor={`gamemode-${mode.name}`} key={index}>
                    <input type="radio" name="gamemode" value={mode.name} id={`gamemode-${mode.name}`} defaultChecked={(index === 0)} onChange={handleChange} />
                    <div className="card">
                        <h2>{mode.name}</h2>
                        <p>{mode.description}</p>
                    </div>
                </label>
            )}
        </form>
    )
    
}