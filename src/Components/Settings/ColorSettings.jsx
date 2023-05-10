import { useContext, useState } from 'react';
import { SettingsContext } from '../../Context/SettingsContext';
import { ColorsContext } from '../../Context/ColorsContext';

function ColorSettings() {

  const { colorsAvailable } = useContext(ColorsContext);
  const { colorSelected, setSelectedColor } = useContext(SettingsContext);

  const toggleColor = ({ target: { value } }) => {
    if(colorSelected.includes(value)) return setSelectedColor(colorSelected.filter(color => color !== value))
    else return setSelectedColor([...colorSelected, value])
  }

  return (
    <form action="">
        <div className="color-settings">

          {
            colorsAvailable.map((color, index) => {

              return (
                <div className="color-settings" key={index} >
                  <label htmlFor={`pion-${color}`}>
                    <input type="checkbox" id={`pion-${color}`} value={color} checked={colorSelected.includes(color)} onChange={toggleColor} />
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