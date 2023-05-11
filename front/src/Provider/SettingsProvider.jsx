import React, { useState, useEffect } from 'react';

import { SettingsContext } from '../Context/SettingsContext';

export const SettingsProvider = ({ children }) => {

  const [codeLength, setCodeLength] = useState(4); // Nombre de pions à deviner
  const [colorEnabled, setColorEnabled] = useState(["red", "blue", "green", "yellow", "orange", "violet"]); // Couleurs activés sur la partie
  const [maxGuesses, setMaxGuesses] = useState(10); // Nombre d'essais maximum
  const [settings, setSettings] = useState({
    codeLength: 4,
    colorEnabled: ["red", "blue", "green", "yellow", "orange", "violet"],
    maxGuesses: 10
  });

  useEffect(() => {
    setSettings({
      codeLength: codeLength,
      colorEnabled: colorEnabled,
      maxGuesses: maxGuesses
    });
  }, [codeLength, colorEnabled, maxGuesses]);

  return (
    <SettingsContext.Provider value={{ codeLength, setCodeLength, colorEnabled, setColorEnabled, maxGuesses, setMaxGuesses, settings }}>
      {children}
    </SettingsContext.Provider>
  );
};