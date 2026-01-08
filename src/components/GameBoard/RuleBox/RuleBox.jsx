import "./RuleBox.css";

function RuleBox({ onStartGame }) {
  return (
    <div className="rule-overlay">
        <div className="rule-header">
            <img src="/logo.png" alt="NodeTrap Logo" className="rule-logo" />
            <h1 className="rule-title">NodeTrap</h1>
            <p className="rule-subtitle">Welcome</p>
        </div>
        <div className="rule-box">
            <h2>Game Rules</h2>

                <ul>
                <li>Each player has <strong>two Nodes (pieces)</strong>.</li>
                <li>Every turn has a <strong>5-second time limit</strong>.</li>
                <li>If a player fails to move in time, it counts as a <strong>fault</strong>.</li>
                <li>Players must first <strong>place both nodes</strong> on the board.</li>
                <li>After placement, move <strong>only one node per turn</strong>.</li>
                <li>A node can move only to an <strong>adjacent empty position</strong>.</li>
                <li>The move must follow an <strong>existing path</strong> between nodes.</li>
                </ul>

            <h2>Game Over</h2>

                <ul>
                <li>
                    If a player has <strong>no valid move</strong>, the player was
                    <strong> trapped</strong> and loses the Game.
                </li>
                <li>
                    If a player receives <strong>2 faults</strong>, the player loses the Game.
                </li>
                </ul>

            <button onClick={onStartGame}>
                Start Game
            </button>
        </div>
    </div>
  );
}

export default RuleBox;
