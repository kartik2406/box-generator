export function Box({ box, index, onSelect }) {
  return (
    <div
      className={`box ${box.isSelected ? "box--selected" : ""}`}
      style={{
        zIndex: box.id,
        background: box.color,
        top: box.pos.top,
        left: box.pos.left,
      }}
      onClick={() => onSelect(box)}
    ></div>
  );
}
