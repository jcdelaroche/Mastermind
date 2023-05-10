import { Link } from "react-router-dom";
import Title from "../Components/Text/Title";

function Home() {
    return (
      <section className="home">
        <div className="menu">
          <Title />
          <div className="actions">
            <Link to="/game/settings" test={{test: "test"}}><button>Jouer</button></Link>
          </div>
        </div>
      </section>
    );
  }
  
  export default Home;