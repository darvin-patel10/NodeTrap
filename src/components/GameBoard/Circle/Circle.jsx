import "./Circle.css";

function Circle({ top, left, occupiedBy, onClick, isSelected, isValidMove }) {
  return (
    <div
      className={`circle ${occupiedBy} 
        ${isSelected ? "selected" : ""} 
        ${isValidMove ? "valid-move" : ""}
      `}
      style={{ top, left }}
      onClick={onClick}
    >
      {occupiedBy && <div className={`kukari ${occupiedBy}`} />}
    </div>
  );
}


export default Circle;
