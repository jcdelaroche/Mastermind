import { Link } from "react-router-dom";
import Title from "../Components/Text/Title";

/*

  import io from "socket.io-client";
  const socket = io.connect("http://localhost:3001");

*/


function Home() {

    return (
      <section className="home">
        <div className="menu">
          <Title />
          <div className="actions">
            <Link to="/game/settings"><button>Créer une partie</button></Link>
          </div>
        </div>
      </section>
    );
  }
  
  export default Home;