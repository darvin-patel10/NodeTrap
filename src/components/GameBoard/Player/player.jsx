import { useState } from "react";
import "./player.css";

function Player({ onStart }) {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  function handleStart() {
    if (!player1 || !player2) {
      alert("Please enter both player names");
      return;
    }

    onStart({
      P1: player1,
      P2: player2
    });
  }

  return (
    <div className="player-screen">
      <h2>Enter Player Names</h2>

      <input
        type="text"
        placeholder="Player 1 Name"
        value={player1}
        onChange={(e) => setPlayer1(e.target.value)}
      />

      <input
        type="text"
        placeholder="Player 2 Name"
        value={player2}
        onChange={(e) => setPlayer2(e.target.value)}
      />

      <button onClick={handleStart}>Start Game</button>
    </div>
  );
}

export default Player;