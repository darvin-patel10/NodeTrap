import "./scoreBoard.css";

function ScoreBoard({ currentPlayer, faults, timeLeft }) {
    return (
        
        <div className="dashboard">
            <h2>NodeTrap</h2>
            <div className="status">
                <span className={currentPlayer === "P1" ? "active" : ""}>
                    P1 Faults: {faults.P1}
                </span>
                
                <span className={currentPlayer === "P2" ? "active" : ""}>
                    P2 Faults: {faults.P2}
                </span>
            </div>
            <div className="timer">⏳ {timeLeft}s</div>
        </div>
      
    );
}

export default ScoreBoard;