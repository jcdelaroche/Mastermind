import React, { useState, useEffect } from 'react';

import { SettingsContext } from '../Context/SettingsContext';

export const SettingsProvider = ({ children }) => {

  const [pionCount, setPionCount] = useState(4);
  const [colorSelected, setSelectedColor] = useState(["red", "blue", "green", "yellow", "orange", "violet"]);
  const [tryCount, setTryCount] = useState(10);
  const [playerCount, setPlayerCount] = useState(1);
  const [settings, setSettings] = useState({
    pionCount: 4,
    colorSelected: ["red", "blue", "green", "yellow", "orange", "violet"],
    tryCount: 10,
    playerCount: 1
  });

  useEffect(() => {
    setSettings({
      pionCount: pionCount,
      colorSelected: colorSelected,
      playerCount: playerCount,
      tryCount: tryCount
    });
  }, [pionCount, colorSelected, tryCount, playerCount]);

  return (
    <SettingsContext.Provider value={{ pionCount, setPionCount, colorSelected, setSelectedColor, tryCount, setTryCount, playerCount, setPlayerCount, settings }}>
      {children}
    </SettingsContext.Provider>
  );
};