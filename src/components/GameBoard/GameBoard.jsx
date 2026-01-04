import { useState } from "react";
import { useEffect } from "react";
import "./GameBoard.css";
import Circle from "./Circle/Circle";
import ScoreBoard from "./scoreBoard/scoreBoard";
import Paths from "./Path/path";

function GameBoard() {
  const [circles, setCircles] = useState([
    {
      id: "C1",
      top: 3,
      left: 46,
      occupiedBy: "P1",
      connections: ["C3", "C4"]
    },
    {
      id: "C2",
      top: 46,
      left: 3,
      occupiedBy: "P1",
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
      occupiedBy: "P2",
      connections: ["C1", "C3", "C5"]
    },
    {
      id: "C5",
      top: 87,
      left: 46,
      occupiedBy: "P2",
      connections: ["C2", "C3", "C4"]
    }
  ]);

  const [selectedCircleId, setSelectedCircleId] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState("P1");

  function handleCircleClick(circle) {
    // SELECT kukari
    // STEP 1: SELECT (allow switching between own pieces)
    if (circle.occupiedBy === currentPlayer) {
      setSelectedCircleId(circle.id);
      return;
    }


    // STEP 2: MOVE kukari
    if (selectedCircleId && circle.occupiedBy === null) {
      const fromCircle = circles.find(c => c.id === selectedCircleId);

      // RULE: Must be directly connected
      if (!fromCircle.connections.includes(circle.id)) {
        // alert("Invalid move! Follow the path.");
        return;
      }

      setCircles(prev =>
        prev.map(c => {
          if (c.id === selectedCircleId) {
            return { ...c, occupiedBy: null };
          }
          if (c.id === circle.id) {
            return { ...c, occupiedBy: currentPlayer };
          }
          return c;
        })
      );

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
    setFaults(prev => {
      const updated = { ...prev };
      updated[currentPlayer] += 1;

      // 🔴 SECOND FAULT = LOSS
      if (updated[currentPlayer] === 2) {
        const winner = currentPlayer === "P1" ? "P2" : "P1";
        // alert(`${winner} wins! 🎉 (${currentPlayer} got 2 faults)`);
        resetGame()
        return updated;
      }

      // 🟡 FIRST FAULT = TURN LOST
      // alert(`${currentPlayer} fault! Turn lost.`);
      return updated;
    });

    // Switch turn AFTER fault
    resetTurn(currentPlayer === "P1" ? "P2" : "P1");
    
  }

  // Reset Turn
  function resetTurn(nextPlayer) {
    if (!hasValidMove(nextPlayer)) {
      // alert(`${currentPlayer} wins! 🎉 (Opponent has no valid move)`);
      resetGame()
      return;
    }
    setSelectedCircleId(null);
    setCurrentPlayer(nextPlayer);
    setTimeLeft(5);
  }

  // Check for valid moves for each Next-player

  function hasValidMove(player) {
    return circles.some(circle => {
      if (circle.occupiedBy === player) {
        return circle.connections.some(connId => {
          const target = circles.find(c => c.id === connId);
          
          return target.occupiedBy === null;
        });
      }
      return false;
    });
  }

  // Reset Game
  function resetGame() {
    setCircles(circles);
    setSelectedCircleId(null);
    setCurrentPlayer("P1");
    setFaults({ P1: 0, P2: 0 });
    setTimeLeft(5);
  }

  return (
    <div className="game-container">

      <ScoreBoard 
        currentPlayer={currentPlayer} 
        faults={faults} 
        timeLeft={timeLeft} 
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
    </div>
  );
}

export default GameBoard;
