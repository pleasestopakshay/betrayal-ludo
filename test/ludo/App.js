const { useState, useEffect } = React;

const COLORS = ['red', 'blue', 'green', 'yellow'];
const BOARD_SIZE = 15;
const HOME_POSITIONS = {
    red: { row: 1, col: 1 },
    blue: { row: 1, col: 9 },
    green: { row: 9, col: 9 },
    yellow: { row: 9, col: 1 }
};

const START_POSITIONS = {
    red: { row: 6, col: 1 },
    blue: { row: 1, col: 8 },
    green: { row: 8, col: 13 },
    yellow: { row: 13, col: 6 }
};

const SAFE_POSITIONS = [
    { row: 6, col: 1 }, { row: 1, col: 8 }, { row: 8, col: 13 }, { row: 13, col: 6 },
    { row: 6, col: 2 }, { row: 2, col: 8 }, { row: 8, col: 12 }, { row: 12, col: 6 }
];

const PATHS = {
    red: [
        { row: 6, col: 1 }, { row: 6, col: 2 }, { row: 6, col: 3 }, { row: 6, col: 4 }, { row: 6, col: 5 },
        { row: 5, col: 6 }, { row: 4, col: 6 }, { row: 3, col: 6 }, { row: 2, col: 6 }, { row: 1, col: 6 },
        { row: 0, col: 6 }, { row: 0, col: 7 }, { row: 0, col: 8 }, { row: 1, col: 8 }, { row: 2, col: 8 },
        { row: 3, col: 8 }, { row: 4, col: 8 }, { row: 5, col: 8 }, { row: 6, col: 9 }, { row: 6, col: 10 },
        { row: 6, col: 11 }, { row: 6, col: 12 }, { row: 6, col: 13 }, { row: 6, col: 14 }, { row: 7, col: 14 },
        { row: 8, col: 14 }, { row: 8, col: 13 }, { row: 8, col: 12 }, { row: 8, col: 11 }, { row: 8, col: 10 },
        { row: 8, col: 9 }, { row: 9, col: 8 }, { row: 10, col: 8 }, { row: 11, col: 8 }, { row: 12, col: 8 },
        { row: 13, col: 8 }, { row: 14, col: 8 }, { row: 14, col: 7 }, { row: 14, col: 6 }, { row: 13, col: 6 },
        { row: 12, col: 6 }, { row: 11, col: 6 }, { row: 10, col: 6 }, { row: 9, col: 6 }, { row: 8, col: 5 },
        { row: 8, col: 4 }, { row: 8, col: 3 }, { row: 8, col: 2 }, { row: 8, col: 1 }, { row: 8, col: 0 },
        { row: 7, col: 0 }, { row: 6, col: 0 },
        { row: 7, col: 1 }, { row: 7, col: 2 }, { row: 7, col: 3 }, { row: 7, col: 4 }, { row: 7, col: 5 }, { row: 7, col: 6 }
    ]
};

PATHS.blue = PATHS.red.slice(13).concat(PATHS.red.slice(0, 13)).concat([
    { row: 1, col: 7 }, { row: 2, col: 7 }, { row: 3, col: 7 }, { row: 4, col: 7 }, { row: 5, col: 7 }, { row: 6, col: 7 }
]);
PATHS.green = PATHS.red.slice(26).concat(PATHS.red.slice(0, 26)).concat([
    { row: 7, col: 13 }, { row: 7, col: 12 }, { row: 7, col: 11 }, { row: 7, col: 10 }, { row: 7, col: 9 }, { row: 7, col: 8 }
]);
PATHS.yellow = PATHS.red.slice(39).concat(PATHS.red.slice(0, 39)).concat([
    { row: 13, col: 7 }, { row: 12, col: 7 }, { row: 11, col: 7 }, { row: 10, col: 7 }, { row: 9, col: 7 }, { row: 8, col: 7 }
]);

function LudoGame() {
    const [gameState, setGameState] = useState('setup');
    const [numPlayers, setNumPlayers] = useState(2);
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [diceValue, setDiceValue] = useState(1);
    const [isRolling, setIsRolling] = useState(false);
    const [gameBoard, setGameBoard] = useState([]);
    const [players, setPlayers] = useState([]);
    const [winner, setWinner] = useState(null);
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [canRollAgain, setCanRollAgain] = useState(false);

    useEffect(() => {
        if (gameState === 'playing') {
            initializeGame();
        }
    }, [gameState, numPlayers]);

    const initializeGame = () => {
        const newPlayers = [];
        for (let i = 0; i < numPlayers; i++) {
            newPlayers.push({
                id: i,
                color: COLORS[i],
                pieces: [
                    { id: 0, position: -1, isHome: true },
                    { id: 1, position: -1, isHome: true },
                    { id: 2, position: -1, isHome: true },
                    { id: 3, position: -1, isHome: true }
                ]
            });
        }
        setPlayers(newPlayers);
        setCurrentPlayer(0);
        setCanRollAgain(false);
    };

    const rollDice = () => {
        if (isRolling) return;
        
        setIsRolling(true);
        let rollCount = 0;
        const rollInterval = setInterval(() => {
            setDiceValue(Math.floor(Math.random() * 6) + 1);
            rollCount++;
            
            if (rollCount >= 15) {
                clearInterval(rollInterval);
                const finalValue = Math.floor(Math.random() * 6) + 1;
                setDiceValue(finalValue);
                setIsRolling(false);
                
                const currentPlayerData = players[currentPlayer];
                const canMove = checkCanMove(currentPlayerData, finalValue);
                
                if (finalValue === 6) {
                    setCanRollAgain(true);
                } else if (!canMove) {
                    setTimeout(() => {
                        nextPlayer();
                    }, 1000);
                }
            }
        }, 100);
    };

    const checkCanMove = (player, diceVal) => {
        for (let piece of player.pieces) {
            if (piece.isHome && diceVal === 6) return true;
            if (!piece.isHome && piece.position < 57) return true;
        }
        return false;
    };

    const movePiece = (playerId, pieceId) => {
        if (playerId !== currentPlayer) return;
        
        const newPlayers = [...players];
        const player = newPlayers[playerId];
        const piece = player.pieces[pieceId];
        
        if (piece.isHome && diceValue === 6) {
            piece.isHome = false;
            piece.position = 0;
        } else if (!piece.isHome) {
            const newPosition = piece.position + diceValue;
            if (newPosition <= 57) {
                piece.position = newPosition;
                
                if (newPosition === 57) {
                }
                
                checkCapture(newPlayers, playerId, pieceId);
            }
        }
        
        setPlayers(newPlayers);
        setSelectedPiece(null);
        
        if (checkWinCondition(player)) {
            setWinner(player.color);
            setGameState('finished');
            return;
        }
        
        if (diceValue !== 6 && !canRollAgain) {
            setTimeout(() => {
                nextPlayer();
            }, 500);
        } else {
            setCanRollAgain(false);
        }
    };

    const checkCapture = (playersArray, currentPlayerId, pieceId) => {
        const currentPiece = playersArray[currentPlayerId].pieces[pieceId];
        const currentPos = currentPiece.position;
        
        const isSafe = SAFE_POSITIONS.some(pos => {
            const pathPos = PATHS[COLORS[currentPlayerId]][currentPos];
            return pathPos && pos.row === pathPos.row && pos.col === pathPos.col;
        });
        
        if (isSafe) return;
        
        for (let i = 0; i < playersArray.length; i++) {
            if (i === currentPlayerId) continue;
            
            for (let j = 0; j < playersArray[i].pieces.length; j++) {
                const otherPiece = playersArray[i].pieces[j];
                if (!otherPiece.isHome && otherPiece.position === currentPos) {
                    otherPiece.isHome = true;
                    otherPiece.position = -1;
                    setCanRollAgain(true);
                }
            }
        }
    };

    const checkWinCondition = (player) => {
        return player.pieces.every(piece => piece.position === 57);
    };

    const nextPlayer = () => {
        setCurrentPlayer((prev) => (prev + 1) % numPlayers);
        setCanRollAgain(false);
    };

    const resetGame = () => {
        setGameState('setup');
        setWinner(null);
        setCurrentPlayer(0);
        setDiceValue(1);
        setSelectedPiece(null);
        setCanRollAgain(false);
    };

    const renderSetupScreen = () => (
        <div className="setup-screen">
            <div className="setup-container">
                <h1>🎲 Ludo Game</h1>
                <p>Choose how many players want to play!</p>
                
                <div className="player-selection">
                    {[2, 3, 4].map(num => (
                        <button 
                            key={num}
                            className={`player-btn ${numPlayers === num ? 'selected' : ''}`}
                            onClick={() => setNumPlayers(num)}
                        >
                            {num} Players
                        </button>
                    ))}
                </div>
                
                <div className="color-preview">
                    <h3>Players:</h3>
                    <div className="color-list">
                        {COLORS.slice(0, numPlayers).map((color, idx) => (
                            <div key={color} className={`color-item ${color}`}>
                                <div className="color-circle"></div>
                                <span>Player {idx + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>
                
                <button 
                    className="start-btn"
                    onClick={() => setGameState('playing')}
                >
                    Start Game!
                </button>
            </div>
        </div>
    );

    const renderGameScreen = () => (
        <div className="game-screen">
            <div className="game-header">
                <div className="current-player">
                    <div className={`player-indicator ${COLORS[currentPlayer]}`}>
                        <div className="player-circle"></div>
                        <span>Player {currentPlayer + 1}'s Turn</span>
                    </div>
                </div>
                
                <div className="dice-container">
                    <div 
                        className={`dice ${isRolling ? 'rolling' : ''}`}
                        onClick={rollDice}
                    >
                        {diceValue}
                    </div>
                    <p>{isRolling ? 'Rolling...' : 'Click to roll!'}</p>
                </div>
                
                <button className="reset-btn" onClick={resetGame}>
                    New Game
                </button>
            </div>
            
            <div className="game-board">
                {renderBoard()}
            </div>
            
            <div className="players-info">
                {players.map((player, idx) => (
                    <div key={idx} className={`player-info ${player.color} ${currentPlayer === idx ? 'active' : ''}`}>
                        <h4>Player {idx + 1}</h4>
                        <div className="pieces-container">
                            {player.pieces.map((piece, pieceIdx) => (
                                <div 
                                    key={pieceIdx}
                                    className={`piece-info ${piece.isHome ? 'home' : 'playing'} ${selectedPiece?.playerId === idx && selectedPiece?.pieceId === pieceIdx ? 'selected' : ''}`}
                                    onClick={() => {
                                        if (currentPlayer === idx) {
                                            setSelectedPiece({ playerId: idx, pieceId: pieceIdx });
                                            movePiece(idx, pieceIdx);
                                        }
                                    }}
                                >
                                    <div className="mini-piece"></div>
                                    <span>{piece.isHome ? 'Home' : `Pos ${piece.position}`}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderBoard = () => {
        const boardCells = [];
        
        for (let row = 0; row < 15; row++) {
            for (let col = 0; col < 15; col++) {
                const isHomeArea = (row >= 1 && row <= 5 && col >= 1 && col <= 5) ||
                                  (row >= 1 && row <= 5 && col >= 9 && col <= 13) ||
                                  (row >= 9 && row <= 13 && col >= 1 && col <= 5) ||
                                  (row >= 9 && row <= 13 && col >= 9 && col <= 13);
                
                const isPath = (row === 6 && col !== 6 && col !== 8) ||
                              (row === 8 && col !== 6 && col !== 8) ||
                              (col === 6 && row !== 6 && row !== 8) ||
                              (col === 8 && row !== 6 && row !== 8);
                
                const isCenter = (row >= 6 && row <= 8 && col >= 6 && col <= 8);
                
                let cellClass = 'board-cell';
                if (isHomeArea) {
                    if (row <= 5 && col <= 5) cellClass += ' home-red';
                    else if (row <= 5 && col >= 9) cellClass += ' home-blue';
                    else if (row >= 9 && col >= 9) cellClass += ' home-green';
                    else cellClass += ' home-yellow';
                } else if (isPath) {
                    cellClass += ' path';
                } else if (isCenter) {
                    cellClass += ' center';
                }
                
                const piecesOnCell = [];
                players.forEach((player, pIdx) => {
                    player.pieces.forEach((piece, pieceIdx) => {
                        if (!piece.isHome && piece.position < PATHS[player.color]?.length) {
                            const pathPos = PATHS[player.color][piece.position];
                            if (pathPos && pathPos.row === row && pathPos.col === col) {
                                piecesOnCell.push({ player: pIdx, piece: pieceIdx, color: player.color });
                            }
                        }
                    });
                });
                
                boardCells.push(
                    <div 
                        key={`${row}-${col}`} 
                        className={cellClass}
                        style={{ 
                            gridRow: row + 1, 
                            gridColumn: col + 1 
                        }}
                    >
                        {piecesOnCell.map((p, idx) => (
                            <div 
                                key={idx}
                                className={`board-piece ${p.color}`}
                                style={{ 
                                    transform: `translate(${idx * 3}px, ${idx * 3}px)`,
                                    zIndex: idx + 1
                                }}
                            />
                        ))}
                    </div>
                );
            }
        }
        
        return <div className="board-grid">{boardCells}</div>;
    };

    const renderWinScreen = () => (
        <div className="win-screen">
            <div className="win-container">
                <h1>🎉 Congratulations!</h1>
                <div className={`winner-announcement ${winner}`}>
                    <div className="winner-circle"></div>
                    <p>Player {COLORS.indexOf(winner) + 1} ({winner.toUpperCase()}) Wins!</p>
                </div>
                <button className="play-again-btn" onClick={resetGame}>
                    Play Again
                </button>
            </div>
        </div>
    );

    return (
        <div className="ludo-game">
            {gameState === 'setup' && renderSetupScreen()}
            {gameState === 'playing' && renderGameScreen()}
            {gameState === 'finished' && renderWinScreen()}
        </div>
    );
}

ReactDOM.render(<LudoGame />, document.getElementById('root'));
