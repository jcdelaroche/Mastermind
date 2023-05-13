import React, { useState, useEffect } from 'react';

import { SettingsContext } from '../Context/SettingsContext';
import { GAMEMODE } from '../Constant/Constant';

export const SettingsProvider = ({ children }) => {

  const [codeLength, setCodeLength] = useState(4); // Nombre de pions à deviner
  const [colorEnabled, setColorEnabled] = useState(["red", "blue", "green", "yellow", "orange", "violet"]); // Couleurs activés sur la partie
  const [maxGuesses, setMaxGuesses] = useState(10); // Nombre d'essais maximum
  const [gameMode, setGameMode] = useState(GAMEMODE.CLASSIC); // Mode de jeux
  const [settings, setSettings] = useState({
    gameMode: GAMEMODE.CLASSIC,
    codeLength: 4,
    colorEnabled: ["red", "blue", "green", "yellow", "orange", "violet"],
    maxGuesses: 10,
  });

  useEffect(() => {
    setSettings({
      gameMode: gameMode,
      codeLength: codeLength,
      colorEnabled: colorEnabled,
      maxGuesses: maxGuesses
    });
  }, [gameMode, codeLength, colorEnabled, maxGuesses]);

  return (
    <SettingsContext.Provider value={{ gameMode, setGameMode, codeLength, setCodeLength, colorEnabled, setColorEnabled, maxGuesses, setMaxGuesses, settings }}>
      {children}
    </SettingsContext.Provider>
  );
};