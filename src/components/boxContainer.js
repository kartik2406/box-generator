import { Box } from "./box";

export function BoxContainer({ boxes, onSelect }) {
  return (
    <section className="box-container">
      {boxes.map((box, index) => (
        <Box key={box.id} box={box} onSelect={onSelect} />
      ))}
    </section>
  );
}
