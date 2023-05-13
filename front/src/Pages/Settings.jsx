import ColorSettings from '../Components/Settings/ColorSettings';
import PionSettings from '../Components/Settings/PionSettings';
import GuessesSettings from '../Components/Settings/GuessesSettings';
import Play from '../Components/Buttons/Play';
import Menu from "../Components/Buttons/Menu";
import Title from '../Components/Text/Title';
import SubTitle from '../Components/Text/SubTitle';
import { SettingsProvider } from '../Provider/SettingsProvider';
import GameModeSettings from '../Components/Settings/GameModeSettings';

export default function Settings() {
    return (
      <SettingsProvider>
        <Menu />
        <section className="settings">
          <div className="settings-container">

            <div className="settings-header">
              <Title />
              <SubTitle textAlign="center" fontSize="2rem" >Options</SubTitle>
            </div>
    
            <div className="settings-body">

              <div className="settings-block">
                <SubTitle fontSize="1.5rem" >Mode de jeux :</SubTitle>
                <GameModeSettings />
              </div>

              <hr />

              <div className="settings-block">
                <SubTitle fontSize="1.5rem" >Nombre de pions :</SubTitle>
                <PionSettings />
              </div>

              <hr />
              
              <div className="settings-block">
                <SubTitle fontSize="1.5rem" >Quelles couleurs :</SubTitle>
                <ColorSettings />
              </div>

              <hr />
      
              <div className="settings-block">
                <SubTitle fontSize="1.5rem" >Nombre d'essais :</SubTitle>
                <GuessesSettings />
              </div>
            </div>
    
            <div className="settings-footer">
              <Play />
            </div>
    
          </div>
        </section>
      </SettingsProvider>
    );
  }
