import { useContext } from "react";
import { SettingsContext } from "../../Context/SettingsContext";

function TrySettings({ min = 1, max = 20 }) {

    const { tryCount, setTryCount } = useContext(SettingsContext);

    const handleEdit = ({ target: { value } }) => setTryCount(parseInt(value));

    return (
        <form className="try-settings">
            <input type="range" name="" id="" step="1" min={min} max={max} value={tryCount} onChange={handleEdit} />
            <p>{tryCount}</p>
        </form>
    )

}

export default TrySettings;