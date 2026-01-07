import { useState, useEffect, useRef } from "react";
import "./GameBoard.css";
import Circle from "./Circle/Circle";
import ScoreBoard from "./scoreBoard/scoreBoard";
import Paths from "./Path/path";
import WinBox from "./WinBox/WinBox";

function GameBoard({ players, onReset }) {

  const gameOverRef = useRef(false); // 🔒 HARD GAME LOCK

  const [circles, setCircles] = useState([
    {
      id: "C1",
      top: 3,
      left: 46,
      occupiedBy: null,
      connections: ["C3", "C4"]
    },
    {
      id: "C2",
      top: 46,
      left: 3,
      occupiedBy: null,
      connections: ["C3", "C5"]
    },
    {
      id: "C3",
      top: 46,
      left: 46,
      occupiedBy: null,
      connections: ["C1", "C2", "C4", "C5"]
    },
    {
      id: "C4",
      top: 46,
      left: 87,
      occupiedBy: null,
      connections: ["C1", "C3", "C5"]
    },
    {
      id: "C5",
      top: 87,
      left: 46,
      occupiedBy: null,
      connections: ["C2", "C3", "C4"]
    }
  ]);

  // Winner State
  const [winner, setWinner] = useState(null);

  const [placedCount, setPlacedCount] = useState({
    P1: 0,
    P2: 0
  });
  const isPlacementPhase = placedCount.P1 < 2 || placedCount.P2 < 2;


  const [selectedCircleId, setSelectedCircleId] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState("P1");


  function handleCircleClick(circle) {

    // 🛑 ABSOLUTE STOP
    if (gameOverRef.current) return;
    
    const isPlacementPhase =placedCount.P1 < 2 || placedCount.P2 < 2;

    // 🟢 PLACEMENT PHASE
    if (isPlacementPhase) {
      // Only place on empty circle
      if (circle.occupiedBy !== null) return;

      // Player already placed 2 pieces
      if (placedCount[currentPlayer] >= 2) return;

      // Place piece
      const updatedCircles = circles.map(c =>
        c.id === circle.id? { ...c, occupiedBy: currentPlayer }: c
      );

      setCircles(updatedCircles);

      setPlacedCount(prev => ({
        ...prev,
        [currentPlayer]: prev[currentPlayer] + 1
      }));

      // After placement
      const nextPlayer = currentPlayer === "P1" ? "P2" : "P1";

      // ✅ CHECK IF PLACEMENT JUST FINISHED
      const placementFinished =
      placedCount.P1 + (currentPlayer === "P1" ? 1 : 0) === 2 &&
      placedCount.P2 + (currentPlayer === "P2" ? 1 : 0) === 2;

      if (placementFinished) { 
        // 🔥 FIRST MOVE VALIDITY CHECK (ONLY ONCE)
        const hasValid = hasValidMove("P1", updatedCircles);

        if (!hasValid) {
          gameOverRef.current = true;
          setWinner({
            name: players["P2"],
            reason: `${players["P1"]} has no valid move`
          });
          return;
        }

        // Placement done → P1 starts movement
        resetTurn("P1");
        return;
      }

        // // Switch turn
        resetTurn(nextPlayer);
        return;
    }


    // STEP 1: SELECT (allow switching between own pieces)
    if (circle.occupiedBy === currentPlayer) {
      setSelectedCircleId(circle.id);
      return;
    }

    // STEP 2: MOVE kukari
    if (selectedCircleId && circle.occupiedBy === null) {
      const fromCircle = circles.find(c => c.id === selectedCircleId);

      if (!fromCircle.connections.includes(circle.id)) {
        return;
      }

      const updatedCircles = circles.map(c => {
        if (c.id === selectedCircleId) {
          return { ...c, occupiedBy: null };
        }
        if (c.id === circle.id) {
          return { ...c, occupiedBy: currentPlayer };
        }
        return c;
      });

      // ✅ update state
      setCircles(updatedCircles);

      // STEP 3: CHECK WIN CONDITION
      const nextPlayer = currentPlayer === "P1" ? "P2" : "P1";

      const hasValid = hasValidMove(nextPlayer, updatedCircles);

      if (!hasValid) {
        gameOverRef.current = true;
        setWinner({
          name: players[currentPlayer],
          reason: `${players[nextPlayer]} has no valid move`
        });
        return;
      } 

      // Reset selection and switch turn
      resetTurn(currentPlayer === "P1" ? "P2" : "P1");
    }
  }

  // Timmer
  const [timeLeft, setTimeLeft] = useState(5);

  
  useEffect(() => {

    if (timeLeft === 0) {
      handleFault();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(t => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, currentPlayer]);

  // Store Faults
  const [faults, setFaults] = useState({
    P1: 0,
    P2: 0
  });

  // Handle Faults
  function handleFault() {

    // 🛑 If game already over, do nothing
    if (gameOverRef.current) return;

    setFaults(prev => {
      const updated = { ...prev };
      updated[currentPlayer] += 1;

      // 🔴 SECOND FAULT = LOSS
      if (updated[currentPlayer] === 2) {
        const winnerPlayer = currentPlayer === "P1" ? "P2" : "P1";

        setWinner({
          name: players[winnerPlayer],
          reason: `${players[currentPlayer]} got 2 faults`
        });
        gameOverRef.current = true;

      }

      return updated;
    });

    // 🟢 ONLY switch turn if game NOT over
    if (!gameOverRef.current) {
      resetTurn(currentPlayer === "P1" ? "P2" : "P1");
    }
  }

  // Reset Turn
  function resetTurn(nextPlayer) {

    // 🛑 ABSOLUTE STOP
    if (gameOverRef.current) return;

    setSelectedCircleId(null);
    setCurrentPlayer(nextPlayer);
    setTimeLeft(5);
  }

  // Check for valid moves for each Next-player

  function hasValidMove(player, board = circles) {
    
    return board.some(circle => {
      if (circle.occupiedBy === player) {
        return circle.connections.some(connId => {
          const target = board.find(c => c.id === connId);
          return target.occupiedBy === null;
        });
      }
      return false;
    });
  }

  function playagain() {
    gameOverRef.current = false; // 🔓 UNLOCK GAME
    setCircles(circles);
    setSelectedCircleId(null);
    setCurrentPlayer("P1");
    setFaults({ P1: 0, P2: 0 });
    setTimeLeft(5);
    setWinner(null);  
  }

  // Reset Game
  function resetGame() {
    gameOverRef.current = false; // 🔓 UNLOCK GAME
    setCircles(circles);
    setSelectedCircleId(null);
    setCurrentPlayer("P1");
    setFaults({ P1: 0, P2: 0 });
    setTimeLeft(5);
    setWinner(null);
    
    onReset(); // 👈 send control back to Player.jsx  
  }

  return (
    <div className="game-container">

      <ScoreBoard 
        currentPlayer={currentPlayer} 
        players={players}
        faults={faults} 
        timeLeft={timeLeft}
        placedCount={placedCount} 
        />
        
      <div className="game-board">

        {/* SVG Paths */}
        <Paths circles={circles} />

        {/* Render Circles */}
        {circles.map(circle => {
          // Determine if the current circle is a valid move
          const fromCircle = circles.find(c => c.id === selectedCircleId);  // select the circle by user
          const isValidMove = fromCircle?.connections.includes(circle.id) && circle.occupiedBy === null;  //show to the user next velid move

          return (
            <Circle
              key={circle.id}
              top={`${circle.top}%`}
              left={`${circle.left}%`}
              occupiedBy={circle.occupiedBy}
              onClick={() => handleCircleClick(circle)}
              isSelected={circle.id === selectedCircleId}
              isValidMove={isValidMove}
            />
          );
        })}
      </div>
      {/* ✅ WIN BOX RENDER HERE */}
        {winner && (
          <WinBox
            winnerName={winner.name}
            reason={winner.reason}
            onPlayagain={playagain}
            onRestart={resetGame}
          />
        )}
    </div>
  );
}

export default GameBoard;
