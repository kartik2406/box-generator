export function Switch({ isChecked, onChange }) {
  return (
    <div className="switch">
      <label htmlFor="boxMovement">Box controls</label>
      <input
        type="checkbox"
        name="boxMovement"
        checked={isChecked}
        onChange={onChange}
      />
    </div>
  );
}
