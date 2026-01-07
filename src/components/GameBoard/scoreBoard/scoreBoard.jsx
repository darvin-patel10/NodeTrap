import "./scoreBoard.css";

function ScoreBoard({ currentPlayer, players, faults, timeLeft,placedCount }) {

    const TOTAL_PIECES = 2;

  function renderPieces(playerKey) {
    const remaining = TOTAL_PIECES - placedCount[playerKey];

    return Array.from({ length: remaining }).map((_, index) => (
      <span
        key={index}
        className={`piece-indicator ${playerKey}`}
      />
    ));
  }
    return (
        
        <div className="dashboard">
            <h2>NodeTrap</h2>
            <div className="status">
                <div className="player-row">
                    <span className={currentPlayer === "P1" ? "active" : ""}>
                        {players.P1}'s Faults: {faults.P1}
                    </span>
                    <div className="pieces">
                        {renderPieces("P1")}
                    </div>
                </div>
                
                <div className="player-row">
                    <span className={currentPlayer === "P2" ? "active" : ""}>
                        {players.P2}'s Faults: {faults.P2}
                    </span>
                    <div className="pieces">
                        {renderPieces("P2")}
                    </div>
                </div>
                    
            </div>
            <div className="timer">⏳ {timeLeft}s</div>
        </div>
      
    );
}

export default ScoreBoard;