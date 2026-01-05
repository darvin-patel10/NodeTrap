import { useState } from "react";
import "./App.css";
import Player from "./components/GameBoard/Player/player.jsx";
import GameBoard from "./components/GameBoard/GameBoard";

function App() {
  const [players, setPlayers] = useState(null);
  return (
    <>
      {!players ? (
        <Player onStart={setPlayers} />
      ) : (
        <GameBoard players={players} onReset={() => setPlayers(null)} />
      )}
    </>
  );
};

export default App;