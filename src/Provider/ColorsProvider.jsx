import React, { useState } from 'react';

import { ColorsContext } from '../Context/ColorsContext';

export const ColorsProvider = ({ children }) => {

  const [colorsAvailable, setColorsAvailable] = useState(["red", "blue", "green", "yellow", "orange", "violet", "pink", "black", "white", "grey", "brown", "cyan"]);

  return (
    <ColorsContext.Provider value={{ colorsAvailable, setColorsAvailable }}>
      {children}
    </ColorsContext.Provider>
  );
};