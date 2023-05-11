import React, { useState, useEffect } from 'react';

import { SettingsContext } from '../Context/SettingsContext';

export const SettingsProvider = ({ children }) => {

  const [codeLength, setCodeLength] = useState(4); // Nombre de pions à deviner
  const [colorEnabled, setColorEnabled] = useState(["red", "blue", "green", "yellow", "orange", "violet"]); // Couleurs activés sur la partie
  const [maxGuesses, setMaxGuesses] = useState(10); // Nombre d'essais maximum
  const [playerCount, setPlayerCount] = useState(1); // Nombre de joueurs à la partie
  const [settings, setSettings] = useState({
    codeLength: 4,
    colorEnabled: ["red", "blue", "green", "yellow", "orange", "violet"],
    maxGuesses: 10,
    playerCount: 1
  });

  useEffect(() => {
    setSettings({
      codeLength: codeLength,
      colorEnabled: colorEnabled,
      maxGuesses: maxGuesses,
      playerCount: playerCount
    });
  }, [codeLength, colorEnabled, maxGuesses, playerCount]);

  return (
    <SettingsContext.Provider value={{ codeLength, setCodeLength, colorEnabled, setColorEnabled, maxGuesses, setMaxGuesses, playerCount, setPlayerCount, settings }}>
      {children}
    </SettingsContext.Provider>
  );
};