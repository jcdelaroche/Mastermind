import { useContext } from "react";
import { SettingsContext } from "../../Context/SettingsContext";

function TrySettings({ min = 1, max = 20 }) {

    const { maxGuesses, setMaxGuesses } = useContext(SettingsContext);

    const handleEdit = ({ target: { value } }) => setMaxGuesses(parseInt(value));

    return (
        <form className="try-settings">
            <input type="range" name="" id="" step="1" min={min} max={max} value={maxGuesses} onChange={handleEdit} />
            <p>{maxGuesses}</p>
        </form>
    )

}

export default TrySettings;