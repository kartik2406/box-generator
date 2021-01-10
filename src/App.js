import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { BoxContainer } from "./components/boxContainer";
import { MovementKeys } from "./components/movementKeys";
import { Switch } from "./components/switch";
import { getColor, getNewPosition, boxSize, getInitialPosition } from "./utils";
import { ARROW_KEYS, WASD_KEYS } from "./utils/keys";

let containerSize = {};

function App() {
  const [boxes, setBoxes] = useState([]);
  const [control, setControl] = useState(false);
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
          pos: getInitialPosition(containerSize),
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
    let keyCode = event.code;
    console.log("Key pressed", keyCode);
    setBoxes((prev) => {
      const selectedBox = prev.find((box) => box.isSelected);

      if (selectedBox) {
        if (keyCode === "Delete") {
          let boxes = prev.filter((box) => box.id !== selectedBox.id);
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
      }
      return [...prev];
    });
  }, []);

  useEffect(() => {
    let boxContainer = document.querySelector(".box-container");
    containerSize.height = boxContainer.clientHeight - boxSize;
    containerSize.width = boxContainer.clientWidth - boxSize;
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
          <section className="key-info">
            <MovementKeys {...WASD_KEYS} />
            <h4> OR </h4>
            <MovementKeys {...ARROW_KEYS} />
          </section>
          <h1 className="text-center">
            The <i>Delete</i> key deletes the selected box
          </h1>
        </section>
        <section className="box-controls">
          <h1 className="section-title"> You can also add more boxes</h1>
          <button className="btn" onClick={addBox}>
            Add box
          </button>
          <Switch isChecked={control} onChange={toggleMovement} />
        </section>
      </section>
      <BoxContainer boxes={boxes} onSelect={onSelect} />
    </div>
  );
}

export default App;
