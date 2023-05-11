import React, { useState } from 'react';
import { SocketContext } from '../Context/SocketContext';
import io from "socket.io-client";
import { URL } from '../Constant/Constant';

export const SocketProvider = ({ children }) => {

  const [socket, setSocket] = useState(io(URL.SOCKET));

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};