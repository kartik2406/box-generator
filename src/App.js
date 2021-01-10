import { useCallback, useEffect, useState } from "react";
import "./App.css";

const boxSize = 100;
let containerSize = {};

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

const getNewPosition = (keyCode, pos, fenceSize, speed = 5) => {
  console.log("fenceSize", fenceSize);
  const KEY_CODES = {
    UP: ["KeyW", "ArrowUp"],
    DOWN: ["KeyS", "ArrowDown"],
    LEFT: ["KeyA", "ArrowLeft"],
    RIGHT: ["KeyD", "ArrowRight"],
  };

  // TODO: Check new value before update, if higher than bounds than increment with diff
  if (KEY_CODES.UP.includes(keyCode)) {
    if (pos.top > 0) pos.top = pos.top - speed;
  } else if (KEY_CODES.DOWN.includes(keyCode)) {
    if (pos.top < fenceSize.height) pos.top = pos.top + speed;
  } else if (KEY_CODES.LEFT.includes(keyCode)) {
    if (pos.left > 0) pos.left = pos.left - speed;
  } else if (KEY_CODES.RIGHT.includes(keyCode)) {
    if (pos.left < fenceSize.width) pos.left = pos.left + speed;
  }
  return pos;
};

function App() {
  const [boxes, setBoxes] = useState([]);
  const [control, setControl] = useState(false);
  console.log("Component re-rendered");
  const addBox = () => {
    setBoxes((prev) => {
      if (!prev.length) {
        setControl(true);
        window.addEventListener("keydown", moveSelectedBox, true);
      }
      const last = prev[prev.length - 1];
      return [
        ...prev.map((prev) => {
          delete prev.isSelected;
          return prev;
        }),
        {
          id: last ? last.id + 1 : 0,
          color: getColor(),
          pos: { top: 0, left: 0 },
          isSelected: true,
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
  const moveSelectedBox = useCallback((event) => {
    console.log("Listener running");
    let keyCode = event.code;
    console.log("KEycode", keyCode);

    setBoxes((prev) => {
      const selectedBox = prev.find((box) => box.isSelected);

      if (selectedBox) {
        if (keyCode === "Delete") {
          let boxes = prev.filter((box) => box.id != selectedBox.id);
          console.log("Delete boxes", boxes.length);
          if (!boxes.length) {
            setControl(false);
            window.removeEventListener("keydown", moveSelectedBox, true);
          }
          return boxes;
        }
        selectedBox.pos = getNewPosition(
          keyCode,
          selectedBox.pos,
          containerSize
        );
        console.log(selectedBox.pos);
      }
      return [...prev];
    });
  }, []);

  useEffect(() => {
    // console.log("useEffect called");
    let boxContainer = document.querySelector(".box-container");
    containerSize.height = boxContainer.clientHeight - boxSize;
    containerSize.width = boxContainer.clientWidth - boxSize;
    console.log(containerSize);

    // toggleMovement();
  }, []);
  const toggleMovement = () => {
    console.log("Inside toggle");
    setControl((prev) => {
      console.log("prev", prev);
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

          <section className="key-info">
            <div className="movement-keys">
              <span className="up">W</span>
              <span className="left">A</span>
              <span className="down">S</span>
              <span className="right">D</span>
            </div>
            <h4> OR </h4>
            <div className="movement-keys">
              <span className="up">&uarr;</span>
              <span className="left">&larr;</span>
              <span className="down">&darr;</span>
              <span className="right">&rarr;</span>
            </div>
          </section>
        </section>
        <section className="box-controls">
          <h1 className="section-title"> You can also add more boxes</h1>
          <button className="btn" onClick={addBox}>
            Add box
          </button>
          {/* <button className="btn" onClick={toggleMovement}>
            {control ? "Disable" : "Enable"}
          </button> */}
          <div className="switch">
            <label htmlFor="boxMovement">Box controls</label>
            <input
              type="checkbox"
              name="boxMovement"
              checked={control}
              onChange={toggleMovement}
            />
          </div>
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
