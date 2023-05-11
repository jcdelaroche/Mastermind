import { useContext, useState } from 'react';
import { SettingsContext } from '../../Context/SettingsContext';
import { ColorsContext } from '../../Context/ColorsContext';

function ColorSettings() {

  const { colorsAvailable } = useContext(ColorsContext);
  const { colorEnabled, setColorEnabled } = useContext(SettingsContext);

  const toggleColor = ({ target: { value } }) => {
    if(colorEnabled.includes(value)) return setColorEnabled(colorEnabled.filter(color => color !== value))
    else return setColorEnabled([...colorEnabled, value])
  }

  return (
    <form action="">
        <div className="color-settings">

          {
            colorsAvailable.map((color, index) => {

              return (
                <div className="color-settings" key={index} >
                  <label htmlFor={`pion-${color}`}>
                    <input type="checkbox" id={`pion-${color}`} value={color} checked={colorEnabled.includes(color)} onChange={toggleColor} />
                    <span className={`pion ${color}`}></span>
                  </label>
                </div>
              )

            })
          }

        </div>
    </form>
  );
}
  
export default ColorSettings;