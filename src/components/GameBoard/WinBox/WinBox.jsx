import "./WinBox.css";

function WinBox({ winnerName, reason, onPlayagain, onRestart }) {
  return (
    <div className="win-overlay">
      <div className="win-box">
        <h2>🏆 Winner</h2>

        <h1 className="winner-name">{winnerName}</h1>

        <p className="win-reason">{reason}</p>
        
        <button onClick={onPlayagain}>Play Again</button>
        <button onClick={onRestart}>Restart Game</button>
      </div>
    </div>
  );
}

export default WinBox;
