import { Link } from "react-router-dom";
import Title from "../Components/Text/Title";

function Home() {

  const server = () => {
    console.log("Test")
  }

    return (
      <section className="home">
        <div className="menu">
          <Title />
          <div className="actions">
            <Link to="/game/settings"><button>Créer une partie</button></Link>
            <button onClick={server}>SERVEUR VERT</button>
          </div>
        </div>
      </section>
    );
  }
  
  export default Home;