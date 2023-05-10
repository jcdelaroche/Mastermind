function Error({ code }) {
    return (
      <section className="error">
        <h1>Erreur {code}</h1>
        <div className="test"></div>
      </section>
    );
  }
  
  export default Error;