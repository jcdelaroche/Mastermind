import { useContext } from "react";
import { SettingsContext } from "../../Context/SettingsContext";

function PionSettings() {

    const { pionCount, setPionCount } = useContext(SettingsContext);

    const handlePion = ({ target: { value } }) => setPionCount(parseInt(value));

    return (
        <form className="pions-settings">
            {
                [4, 5, 6].map((element, index) => {
                    return (
                        <div className="pion-settings" key={index}>
                            <label htmlFor={`pion-settings-${element}`} className="rad-label">
                                <input type="radio" className="rad-input" checked={pionCount === element} onChange={handlePion} id={`pion-settings-${element}`} value={element}/>
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

export default PionSettings;