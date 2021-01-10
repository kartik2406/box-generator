export const boxSize = 100;

export const getInitialPosition = (fenceSize) => {
  return {
    top: fenceSize.height * 0.5 - boxSize * 0.25,
    left: fenceSize.width * 0.5 - boxSize * 0.25,
  };
};

export const getColor = () => {
  const colors = [
    "Tomato",
    "Orange",
    "SlateBlue",
    "Violet",
    "Chocolate",
    "SeaGreen",
    "MidnightBlue",
    "LavenderBlush",
    "Indigo",
    "FireBrick",
    "DarkBlue",
    "Coral",
    "CadetBlue",
    "Brown",
  ];
  return colors[Math.round(Math.random() * (colors.length - 1))];
};

export const getNewPosition = (keyCode, pos, fenceSize, speed = 1) => {
  const KEY_CODES = {
    UP: ["KeyW", "ArrowUp"],
    DOWN: ["KeyS", "ArrowDown"],
    LEFT: ["KeyA", "ArrowLeft"],
    RIGHT: ["KeyD", "ArrowRight"],
  };

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
