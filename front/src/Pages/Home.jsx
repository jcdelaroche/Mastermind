import { Link } from "react-router-dom";
import Title from "../Components/Text/Title";

function Home() {

    return (
      <section className="home">
        <div className="menu">
          <Title />
          <Link to="/game/settings"><button>Créer une partie</button></Link>
        </div>
      </section>
    );
  }
  
  export default Home;