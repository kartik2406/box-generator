import { useEffect, useState } from "react";
import "./App.css";

const getColor = () => {
  const colors = [
    "Tomato",
    "Orange",
    "DodgerBlue",
    "MediumSeaGreen",
    "SlateBlue",
    "Violet",
    "Chocolate",
    "SeaGreen",
    "SpringGreen",
    "MidnightBlue",
    "LightSeaGreen",
    "LavenderBlush",
    "Indigo",
    "FireBrick",
    "DeepSkyBlue",
    "DarkTurquoise",
    "DarkBlue",
    "Aqua",
    "CornflowerBlue",
    "Coral",
    "CadetBlue",
    "Brown",
  ];
  return colors[Math.round(Math.random() * (colors.length - 1))];
};
function App() {
  const [boxes, setBoxes] = useState([]);
  const [control, setControl] = useState(true);
  console.log("Component re-rendered");
  const addBox = () => {
    setBoxes((prev) => {
      const last = prev[prev.length - 1];
      return [
        ...prev,
        {
          id: last ? last.id + 1 : 0,
          color: getColor(),
          pos: { top: 0, left: 0 },
        },
      ];
    });
  };
  const onSelect = (selectedBox) => {
    setBoxes((prev) => {
      prev = prev.map((box) => {
        delete box.isSelected;
        return box;
      });
      let curentBox = prev.find((box) => box.id === selectedBox.id);
      curentBox.isSelected = true;
      return prev;
    });
  };
  function moveSelectedBox(event) {
    console.log("Listener running");
    let keyCode = event.code;
    console.log("KEycode", keyCode);
    const KEY_CODES = {
      UP: ["KeyW", "ArrowUp"],
      DOWN: ["KeyS", "ArrowDown"],
      LEFT: ["KeyA", "ArrowLeft"],
      RIGHT: ["KeyD", "ArrowRight"],
    };
    setBoxes((prev) => {
      const selectedBox = prev.find((box) => box.isSelected);

      if (selectedBox) {
        if (keyCode === "Delete") {
          return prev.filter((box) => box.id != selectedBox.id);
        } else if (KEY_CODES.UP.includes(keyCode)) {
          selectedBox.pos.top = selectedBox.pos.top - 1;
        } else if (KEY_CODES.DOWN.includes(keyCode)) {
          selectedBox.pos.top = selectedBox.pos.top + 1;
        } else if (KEY_CODES.LEFT.includes(keyCode)) {
          selectedBox.pos.left = selectedBox.pos.left - 1;
        } else if (KEY_CODES.RIGHT.includes(keyCode)) {
          selectedBox.pos.left = selectedBox.pos.left + 1;
        }
      }
      return [...prev];
    });
  }

  useEffect(() => {
    // console.log("useEffect called");
    window.addEventListener("keydown", moveSelectedBox, true);
    // toggleMovement();
  }, []);
  const toggleMovement = () => {
    setControl((prev) => {
      if (prev) window.removeEventListener("keydown", moveSelectedBox, true);
      else window.addEventListener("keydown", moveSelectedBox, true);
      return !prev;
    });
  };
  return (
    <div className="container">
      <section className="instructions">
        <section className="movement">
          <h1 className="section-title">
            Click on a box to select it, you can use the following keys to move
            your boxes
          </h1>
          <button className="btn" onClick={toggleMovement}>
            {control ? "Disable" : "Enable"}
          </button>
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
          <button className="btn" onClick={addBox}>
            Add box
          </button>
        </section>
      </section>
      <section className="box-container">
        {boxes.map((box, index) => (
          <div
            key={index}
            className={`box ${box.isSelected ? "box--selected" : ""}`}
            style={{
              zIndex: box.id,
              background: box.color,
              top: box.pos.top,
              left: box.pos.left,
            }}
            onClick={() => onSelect(box)}
          >
            {/* {JSON.stringify(box)} */}
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
