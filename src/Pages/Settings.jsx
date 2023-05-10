import { SettingsProvider } from "../Provider/SettingsProvider";

import ColorSettings from '../Components/Settings/ColorSettings';
import PionSettings from '../Components/Settings/PionSettings';
import TrySettings from '../Components/Settings/TrySettings';
import PlayersSettings from '../Components/Settings/PlayersSettings';
import Play from '../Components/Buttons/Play';
import Menu from "../Components/Buttons/Menu";
import Title from '../Components/Text/Title';
import SubTitle from '../Components/Text/SubTitle';

function Solo() {
    return (
      <section className="settings">
        <Menu />
        <div className="settings-container">
          <Title />
          <SubTitle textAlign="center" fontSize="2rem" >Options</SubTitle>
  
          <section style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <SubTitle fontSize="1.5rem" >Nombres de joueurs :</SubTitle>
            <PlayersSettings />
          </section>
  
          <section style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <SubTitle fontSize="1.5rem" >Nombre de pions :</SubTitle>
            <PionSettings />
          </section>
          
          <section>
            <SubTitle fontSize="1.5rem" >Quelles couleurs :</SubTitle>
            <ColorSettings />
          </section>
  
          <section style={{ display: "flex", alignItems: "center", gap: "10px" }} >
            <SubTitle fontSize="1.5rem" >Nombre d'essais :</SubTitle>
            <TrySettings />
          </section>
  
          <section>
            <SubTitle fontSize="1.5rem" >Jouer</SubTitle>
            <Play />
          </section>
  
        </div>
      </section>
    );
  }
  
  export default Solo;