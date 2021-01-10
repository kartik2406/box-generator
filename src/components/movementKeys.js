export function MovementKeys({ UP, DOWN, LEFT, RIGHT }) {
  return (
    <div className="movement-keys">
      <span className="up">{UP}</span>
      <span className="left">{LEFT}</span>
      <span className="down">{DOWN}</span>
      <span className="right">{RIGHT}</span>
    </div>
  );
}
