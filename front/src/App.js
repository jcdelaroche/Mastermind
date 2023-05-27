import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Error from "./Pages/Error";
import { ColorsProvider } from "./Provider/ColorsProvider";
import Settings from "./Pages/Settings";
import Board from "./Pages/Board";
import Lobby from "./Pages/Lobby";
import { SocketProvider } from "./Provider/SocketProvider";
import Alert from "./Components/Alert";


  function App() {

  return (
    <BrowserRouter>
      <SocketProvider>
        <ColorsProvider>
          <Alert>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/game/settings" element={<Settings />} />
              <Route path="/game/lobby/:room_id" element={<Lobby />} />
              <Route path="/game/room/:room_id" element={<Board />} />
              <Route path="*" element={<Error code="404" />} />
            </Routes>
          </Alert>
        </ColorsProvider>
      </SocketProvider>
    </BrowserRouter>
  );
}

export default App;