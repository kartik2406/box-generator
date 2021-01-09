import "./App.css";

function App() {
  return (
    <div className="container">
      <section className="instructions">
        <section className="movement">
          <h1 className="section-title">
            You can use the following keys to move your boxes
          </h1>
          <section className="key-info">
            <div className="movement-keys">
              <span className="up">W</span>
              <span className="left">A</span>
              <span className="down">S</span>
              <span className="right">D</span>
            </div>
            <h4> OR </h4>
            <div className="movement-keys">
              <span className="up">W</span>
              <span className="left">A</span>
              <span className="down">S</span>
              <span className="right">D</span>
            </div>
          </section>
        </section>
        <section className="add-box-section">
          <h1 className="section-title"> You can also add more boxes</h1>
          <button className="btn">Add box</button>
        </section>
      </section>
      <section className="box-container"></section>
    </div>
  );
}

export default App;
