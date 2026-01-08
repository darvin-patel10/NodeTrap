import { useState } from "react";
import "./App.css";
import Player from "./components/GameBoard/Player/player.jsx";
import GameBoard from "./components/GameBoard/GameBoard";
import RuleBox from "./components/GameBoard/RuleBox/RuleBox.jsx";

function App() {
  const [players, setPlayers] = useState(null);
  const [showRules, setShowRules] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <>
  {/* 1️⃣ Player name input */}
  {!players && (
    <Player onStart={(data) => {
      setPlayers(data);
      setShowRules(true);   // 👈 go to rules
    }} />
  )}

  {/* 2️⃣ Rules Box */}
  {players && showRules && !gameStarted && (
    <RuleBox
      onStartGame={() => {
        setShowRules(false);
        setGameStarted(true); // 👈 start game
      }}
    />
  )}

  {/* 3️⃣ Actual Game */}
  {players && gameStarted && (
    <GameBoard
      players={players}
      onReset={() => {
        setPlayers(null);
        setShowRules(false);
        setGameStarted(false);
      }}
    />
  )}
</>

  );
};

export default App;