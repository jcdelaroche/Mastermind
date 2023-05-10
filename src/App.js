import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, BrowserRouter, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Error from "./Pages/Error";
import { ColorsProvider } from "./Provider/ColorsProvider";
import Settings from "./Pages/Settings";
import Board from "./Pages/Board";
import { SettingsProvider } from "./Provider/SettingsProvider";

  function App() {

  return (
    <BrowserRouter>
      <ColorsProvider>
        <SettingsProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game/settings" element={<Settings />} />
            <Route path="/game" element={<Board />} />
            <Route path="*" element={<Error code="404" />} />
          </Routes>
        </SettingsProvider>
      </ColorsProvider>
    </BrowserRouter>
  );
}

export default App;