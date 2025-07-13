import React, { useState, useEffect } from 'react';

const COLORS = ['red', 'blue', 'green', 'yellow'];

const BOARD_PATHS = {
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
    ],
    blue: [
        { row: 1, col: 8 }, { row: 2, col: 8 }, { row: 3, col: 8 }, { row: 4, col: 8 }, { row: 5, col: 8 },
        { row: 6, col: 9 }, { row: 6, col: 10 }, { row: 6, col: 11 }, { row: 6, col: 12 }, { row: 6, col: 13 },
        { row: 6, col: 14 }, { row: 7, col: 14 }, { row: 8, col: 14 }, { row: 8, col: 13 }, { row: 8, col: 12 },
        { row: 8, col: 11 }, { row: 8, col: 10 }, { row: 8, col: 9 }, { row: 9, col: 8 }, { row: 10, col: 8 },
        { row: 11, col: 8 }, { row: 12, col: 8 }, { row: 13, col: 8 }, { row: 14, col: 8 }, { row: 14, col: 7 },
        { row: 14, col: 6 }, { row: 13, col: 6 }, { row: 12, col: 6 }, { row: 11, col: 6 }, { row: 10, col: 6 },
        { row: 9, col: 6 }, { row: 8, col: 5 }, { row: 8, col: 4 }, { row: 8, col: 3 }, { row: 8, col: 2 },
        { row: 8, col: 1 }, { row: 8, col: 0 }, { row: 7, col: 0 }, { row: 6, col: 0 }, { row: 6, col: 1 },
        { row: 6, col: 2 }, { row: 6, col: 3 }, { row: 6, col: 4 }, { row: 6, col: 5 }, { row: 5, col: 6 },
        { row: 4, col: 6 }, { row: 3, col: 6 }, { row: 2, col: 6 }, { row: 1, col: 6 }, { row: 0, col: 6 },
        { row: 0, col: 7 }, { row: 0, col: 8 },
        { row: 1, col: 7 }, { row: 2, col: 7 }, { row: 3, col: 7 }, { row: 4, col: 7 }, { row: 5, col: 7 }, { row: 6, col: 7 }
    ],
    green: [
        { row: 8, col: 13 }, { row: 8, col: 12 }, { row: 8, col: 11 }, { row: 8, col: 10 }, { row: 8, col: 9 },
        { row: 9, col: 8 }, { row: 10, col: 8 }, { row: 11, col: 8 }, { row: 12, col: 8 }, { row: 13, col: 8 },
        { row: 14, col: 8 }, { row: 14, col: 7 }, { row: 14, col: 6 }, { row: 13, col: 6 }, { row: 12, col: 6 },
        { row: 11, col: 6 }, { row: 10, col: 6 }, { row: 9, col: 6 }, { row: 8, col: 5 }, { row: 8, col: 4 },
        { row: 8, col: 3 }, { row: 8, col: 2 }, { row: 8, col: 1 }, { row: 8, col: 0 }, { row: 7, col: 0 },
        { row: 6, col: 0 }, { row: 6, col: 1 }, { row: 6, col: 2 }, { row: 6, col: 3 }, { row: 6, col: 4 },
        { row: 6, col: 5 }, { row: 5, col: 6 }, { row: 4, col: 6 }, { row: 3, col: 6 }, { row: 2, col: 6 },
        { row: 1, col: 6 }, { row: 0, col: 6 }, { row: 0, col: 7 }, { row: 0, col: 8 }, { row: 1, col: 8 },
        { row: 2, col: 8 }, { row: 3, col: 8 }, { row: 4, col: 8 }, { row: 5, col: 8 }, { row: 6, col: 9 },
        { row: 6, col: 10 }, { row: 6, col: 11 }, { row: 6, col: 12 }, { row: 6, col: 13 }, { row: 6, col: 14 },
        { row: 7, col: 14 }, { row: 8, col: 14 },
        { row: 7, col: 13 }, { row: 7, col: 12 }, { row: 7, col: 11 }, { row: 7, col: 10 }, { row: 7, col: 9 }, { row: 7, col: 8 }
    ],
    yellow: [
        { row: 13, col: 6 }, { row: 12, col: 6 }, { row: 11, col: 6 }, { row: 10, col: 6 }, { row: 9, col: 6 },
        { row: 8, col: 5 }, { row: 8, col: 4 }, { row: 8, col: 3 }, { row: 8, col: 2 }, { row: 8, col: 1 },
        { row: 8, col: 0 }, { row: 7, col: 0 }, { row: 6, col: 0 }, { row: 6, col: 1 }, { row: 6, col: 2 },
        { row: 6, col: 3 }, { row: 6, col: 4 }, { row: 6, col: 5 }, { row: 5, col: 6 }, { row: 4, col: 6 },
        { row: 3, col: 6 }, { row: 2, col: 6 }, { row: 1, col: 6 }, { row: 0, col: 6 }, { row: 0, col: 7 },
        { row: 0, col: 8 }, { row: 1, col: 8 }, { row: 2, col: 8 }, { row: 3, col: 8 }, { row: 4, col: 8 },
        { row: 5, col: 8 }, { row: 6, col: 9 }, { row: 6, col: 10 }, { row: 6, col: 11 }, { row: 6, col: 12 },
        { row: 6, col: 13 }, { row: 6, col: 14 }, { row: 7, col: 14 }, { row: 8, col: 14 }, { row: 8, col: 13 },
        { row: 8, col: 12 }, { row: 8, col: 11 }, { row: 8, col: 10 }, { row: 8, col: 9 }, { row: 9, col: 8 },
        { row: 10, col: 8 }, { row: 11, col: 8 }, { row: 12, col: 8 }, { row: 13, col: 8 }, { row: 14, col: 8 },
        { row: 14, col: 7 }, { row: 14, col: 6 },
        { row: 13, col: 7 }, { row: 12, col: 7 }, { row: 11, col: 7 }, { row: 10, col: 7 }, { row: 9, col: 7 }, { row: 8, col: 7 }
    ]
};

const SAFE_POSITIONS = [0, 8];

function LudoGame() {
    const [gameState, setGameState] = useState('setup');
    const [numPlayers, setNumPlayers] = useState(2);
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [diceValue, setDiceValue] = useState(null);
    const [isRolling, setIsRolling] = useState(false);
    const [players, setPlayers] = useState([]);
    const [winner, setWinner] = useState(null);
    const [hasRolled, setHasRolled] = useState(false);
    const [movablePieces, setMovablePieces] = useState([]);
    const [gamePhase, setGamePhase] = useState('roll');
    const [playerNames, setPlayerNames] = useState(['Player 1', 'Player 2', 'Player 3', 'Player 4']);
    const [activePlayers, setActivePlayers] = useState([]);
    const [tradeOffers, setTradeOffers] = useState([]);
    const [showTrade, setShowTrade] = useState(false);
    const [selectedPlayerForTrade, setSelectedPlayerForTrade] = useState(null);
    const [tradeAmount, setTradeAmount] = useState(10);

    useEffect(() => {
        if (gameState === 'playing') {
            initializeGame();
        }
    }, [gameState, numPlayers]);

    const initializeGame = () => {
        const newPlayers = [];
        const activePlayersList = [];
        
        for (let i = 0; i < numPlayers; i++) {
            newPlayers.push({
                id: i,
                color: COLORS[i],
                name: playerNames[i],
                isActive: true,
                coins: 100,
                wantsToExit: false,
                pieces: [
                    { id: 0, position: -1, isHome: true, isFinished: false },
                    { id: 1, position: -1, isHome: true, isFinished: false },
                    { id: 2, position: -1, isHome: true, isFinished: false },
                    { id: 3, position: -1, isHome: true, isFinished: false }
                ]
            });
            activePlayersList.push(i);
        }
        
        setPlayers(newPlayers);
        setActivePlayers(activePlayersList);
        setCurrentPlayer(0);
        setGamePhase('roll');
        setDiceValue(null);
        setHasRolled(false);
        setMovablePieces([]);
        setTradeOffers([]);
    };

    const rollDice = () => {
        if (isRolling || gamePhase !== 'roll' || hasRolled) return;
        
        setIsRolling(true);
        setHasRolled(true);
        
        let rollCount = 0;
        const rollInterval = setInterval(() => {
            setDiceValue(Math.floor(Math.random() * 6) + 1);
            rollCount++;
            
            if (rollCount >= 15) {
                clearInterval(rollInterval);
                const finalValue = Math.floor(Math.random() * 6) + 1;
                setDiceValue(finalValue);
                setIsRolling(false);
                
                setTimeout(() => {
                    handleDiceRoll(finalValue);
                }, 500);
            }
        }, 100);
    };

    const handleDiceRoll = (value) => {
        const currentPlayerData = players[currentPlayer];
        const possibleMoves = getPossibleMoves(currentPlayerData, value);
        
        if (possibleMoves.length === 0) {
            setTimeout(() => {
                nextPlayer();
            }, 1000);
        } else if (possibleMoves.length === 1) {
            setTimeout(() => {
                movePiece(currentPlayer, possibleMoves[0].pieceId);
            }, 500);
        } else {
            setMovablePieces(possibleMoves);
            setGamePhase('move');
        }
    };

    const getPossibleMoves = (player, diceVal) => {
        const moves = [];
        
        player.pieces.forEach((piece, index) => {
            if (piece.isFinished) return;
            
            if (piece.isHome && diceVal === 6) {
                moves.push({ pieceId: index, canMove: true });
            } else if (!piece.isHome && !piece.isFinished) {
                const newPos = piece.position + diceVal;
                if (newPos < 56) {
                    moves.push({ pieceId: index, canMove: true });
                } else if (newPos === 56) {
                    moves.push({ pieceId: index, canMove: true });
                }
            }
        });
        
        return moves;
    };

    const movePiece = (playerId, pieceId) => {
        if (playerId !== currentPlayer || gamePhase !== 'move' || isRolling) return;
        
        const newPlayers = [...players];
        const player = newPlayers[playerId];
        const piece = player.pieces[pieceId];
        
        let extraTurn = false;
        
        if (piece.isHome && diceValue === 6) {
            piece.isHome = false;
            piece.position = 0;
            extraTurn = true;
        } else if (!piece.isHome && !piece.isFinished) {
            const newPosition = piece.position + diceValue;
            
            if (newPosition < 56) {                piece.position = newPosition;

                const captured = checkCapture(newPlayers, playerId, newPosition);
                if (captured) {
                    extraTurn = true;
                    player.coins += 10;
                }
            } else if (newPosition === 56) {
                piece.position = 56;
                piece.isFinished = true;
                player.coins += 20;
            }
        }
        
        setPlayers(newPlayers);
        setMovablePieces([]);
        setGamePhase('roll');
        
        if (checkWinCondition(player)) {
            player.coins += 50;
            setWinner(player);
            setGameState('finished');
            return;
        }
        
        if (diceValue === 6 || extraTurn) {
            setDiceValue(null);
            setHasRolled(false);
        } else {
            setTimeout(() => {
                nextPlayer();
            }, 500);
        }
    };

    const checkCapture = (playersArray, currentPlayerId, position) => {
        const currentPlayerColor = playersArray[currentPlayerId].color;
        const currentPath = BOARD_PATHS[currentPlayerColor];
        const currentPos = currentPath[position];
        
        if (SAFE_POSITIONS.includes(position)) {
            return false;
        }
        
        let captured = false;
        
        playersArray.forEach((player, pIndex) => {
            if (pIndex === currentPlayerId || !player.isActive) return;
            
            const playerPath = BOARD_PATHS[player.color];
            
            player.pieces.forEach((piece, pieceIndex) => {
                if (!piece.isHome && !piece.isFinished && piece.position < 52) {
                    const piecePos = playerPath[piece.position];
                    if (piecePos && piecePos.row === currentPos.row && piecePos.col === currentPos.col) {
                        const piecesAtPosition = getPiecesAtPosition(playersArray, piecePos);
                        
                        const sameColorPieces = piecesAtPosition.filter(p => p.playerId === pIndex);
                        if (sameColorPieces.length < 2) {
                            piece.isHome = true;
                            piece.position = -1;
                            captured = true;
                        }
                    }
                }
            });
        });
        
        return captured;
    };

    const getPiecesAtPosition = (playersArray, position) => {
        const pieces = [];
        
        playersArray.forEach((player, pIndex) => {
            if (!player.isActive) return;
            
            const playerPath = BOARD_PATHS[player.color];
            
            player.pieces.forEach((piece, pieceIndex) => {
                if (!piece.isHome && !piece.isFinished && piece.position < 52) {
                    const piecePos = playerPath[piece.position];
                    if (piecePos && piecePos.row === position.row && piecePos.col === position.col) {
                        pieces.push({
                            playerId: pIndex,
                            pieceId: pieceIndex,
                            color: player.color
                        });
                    }
                }
            });
        });
        
        return pieces;
    };

    const checkWinCondition = (player) => {
        return player.pieces.every(piece => piece.isFinished);
    };

    const nextPlayer = () => {
        let nextPlayerIndex = (currentPlayer + 1) % activePlayers.length;
        
        while (players[activePlayers[nextPlayerIndex]].wantsToExit && activePlayers.length > 1) {
            exitPlayer(activePlayers[nextPlayerIndex]);
            nextPlayerIndex = (currentPlayer + 1) % activePlayers.length;
        }
        
        setCurrentPlayer(activePlayers[nextPlayerIndex]);
        setDiceValue(null);
        setHasRolled(false);
        setGamePhase('roll');
    };

    const exitPlayer = (playerId) => {
        const newPlayers = [...players];
        newPlayers[playerId].isActive = false;
        
        const newActivePlayers = activePlayers.filter(id => id !== playerId);
        
        setPlayers(newPlayers);
        setActivePlayers(newActivePlayers);
        
        if (newActivePlayers.length === 1) {
            const lastPlayer = newPlayers[newActivePlayers[0]];
            setWinner(lastPlayer);
            setGameState('finished');
        }
    };

    const toggleExitRequest = (playerId) => {
        const newPlayers = [...players];
        newPlayers[playerId].wantsToExit = !newPlayers[playerId].wantsToExit;
        setPlayers(newPlayers);
    };

    const resetGame = () => {
        setGameState('setup');
        setWinner(null);
        setCurrentPlayer(0);
        setDiceValue(null);
        setHasRolled(false);
        setMovablePieces([]);
        setGamePhase('roll');
        setActivePlayers([]);
        setTradeOffers([]);
    };

    const updatePlayerName = (index, name) => {
        const newNames = [...playerNames];
        newNames[index] = name || `Player ${index + 1}`;
        setPlayerNames(newNames);
    };

    const createTradeOffer = (fromPlayer, toPlayer, amount, message) => {
        const newOffer = {
            id: Date.now(),
            from: fromPlayer,
            to: toPlayer,
            amount: amount,
            message: message,
            timestamp: new Date()
        };
        
        setTradeOffers(prev => [...prev, newOffer]);
        setShowTrade(false);
        setSelectedPlayerForTrade(null);
        setTradeAmount(10);
    };

    const acceptTradeOffer = (offerId) => {
        const offer = tradeOffers.find(o => o.id === offerId);
        if (!offer) return;
        
        const newPlayers = [...players];
        const fromPlayer = newPlayers[offer.from];
        const toPlayer = newPlayers[offer.to];
        
        if (fromPlayer.coins >= offer.amount) {
            fromPlayer.coins -= offer.amount;
            toPlayer.coins += offer.amount;
            setPlayers(newPlayers);
        }
        
        setTradeOffers(prev => prev.filter(o => o.id !== offerId));
    };

    const rejectTradeOffer = (offerId) => {
        setTradeOffers(prev => prev.filter(o => o.id !== offerId));
    };

    const renderSetupScreen = () => (
        <div className="setup-screen">
            <div className="setup-container">
                <h1>🎲 Ludo: Betrayal Edition</h1>
                <p>A game of tactics, coins, and betrayal among friends!</p>
                
                <div className="player-selection">
                    <h3>Number of Players</h3>
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
                
                <div className="player-names">
                    <h3>Player Names</h3>
                    {COLORS.slice(0, numPlayers).map((color, idx) => (
                        <div key={color} className={`name-input-container ${color}`}>
                            <div className="color-circle"></div>
                            <input
                                type="text"
                                placeholder={`Player ${idx + 1}`}
                                value={playerNames[idx]}
                                onChange={(e) => updatePlayerName(idx, e.target.value)}
                                className="name-input"
                            />
                        </div>
                    ))}
                </div>
                
                <div className="game-rules">
                    <h3>🎯 Game Rules</h3>
                    <ul>
                        <li>💰 Everyone starts with 100 coins</li>
                        <li>🎯 Capture opponents to earn 10 coins</li>
                        <li>🏠 Finish pieces to earn 20 coins each</li>
                        <li>🏆 Win the game to earn 50 bonus coins</li>
                        <li>🤝 Trade coins for protection agreements</li>
                        <li>🚪 Exit anytime - player with most coins wins!</li>
                    </ul>
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
            <div className="game-layout">
                {/* Left Panel - Players */}
                <div className="left-panel">
                    <h3>Players</h3>
                    {players.map((player, idx) => (
                        <div key={idx} className={`player-card ${player.color} ${currentPlayer === idx ? 'active' : ''} ${!player.isActive ? 'inactive' : ''}`}>
                            <div className="player-header">
                                <div className="player-info">
                                    <div className="player-circle"></div>
                                    <div className="player-details">
                                        <span className="player-name">{player.name}</span>
                                        <span className="player-coins">💰 {player.coins}</span>
                                    </div>
                                </div>
                                <div className="player-actions">
                                    <button 
                                        className={`exit-btn ${player.wantsToExit ? 'active' : ''}`}
                                        onClick={() => toggleExitRequest(idx)}
                                        disabled={!player.isActive}
                                    >
                                        {player.wantsToExit ? '❌' : '🚪'}
                                    </button>
                                </div>
                            </div>
                            <div className="pieces-finished">
                                Finished: {player.pieces.filter(p => p.isFinished).length}/4
                            </div>
                        </div>
                    ))}
                    
                    <div className="current-turn">
                        <h4>Current Turn:</h4>
                        <div className={`turn-indicator ${players[currentPlayer]?.color}`}>
                            <div className="player-circle"></div>
                            <span>{players[currentPlayer]?.name}</span>
                        </div>
                        <p className="turn-status">
                            {isRolling ? 'Rolling...' : 
                             gamePhase === 'roll' ? 'Click dice to roll!' : 
                             'Choose piece to move'}
                        </p>
                    </div>
                </div>

                {/* Center Panel - Game Board */}
                <div className="center-panel">
                    <div className="game-board">
                        {renderBoard()}
                    </div>
                </div>

                {/* Right Panel - Trade Center */}
                <div className="right-panel">
                    <h3>Trade Center</h3>
                    
                    <button 
                        className="new-trade-btn"
                        onClick={() => setShowTrade(true)}
                        disabled={players[currentPlayer]?.coins < 10}
                    >
                        + New Trade Offer
                    </button>

                    {showTrade && (
                        <div className="trade-form">
                            <h4>Create Trade Offer</h4>
                            <select 
                                value={selectedPlayerForTrade || ''}
                                onChange={(e) => setSelectedPlayerForTrade(parseInt(e.target.value))}
                            >
                                <option value="">Select Player</option>
                                {players.map((player, idx) => (
                                    idx !== currentPlayer && player.isActive && (
                                        <option key={idx} value={idx}>{player.name}</option>
                                    )
                                ))}
                            </select>
                            
                            <input
                                type="number"
                                min="10"
                                max={players[currentPlayer]?.coins || 0}
                                step="10"
                                value={tradeAmount}
                                onChange={(e) => setTradeAmount(parseInt(e.target.value))}
                                placeholder="Amount"
                            />
                            
                            <div className="trade-buttons">
                                <button 
                                    onClick={() => createTradeOffer(
                                        currentPlayer, 
                                        selectedPlayerForTrade, 
                                        tradeAmount,
                                        "Don't cut my pieces!"
                                    )}
                                    disabled={!selectedPlayerForTrade || tradeAmount < 10}
                                >
                                    Offer Protection
                                </button>
                                <button onClick={() => setShowTrade(false)}>Cancel</button>
                            </div>
                        </div>
                    )}

                    <div className="trade-offers">
                        <h4>Active Offers</h4>
                        {tradeOffers.map(offer => (
                            <div key={offer.id} className="trade-offer">
                                <div className="offer-details">
                                    <span className="offer-from">{players[offer.from]?.name}</span>
                                    <span className="offer-arrow">→</span>
                                    <span className="offer-to">{players[offer.to]?.name}</span>
                                    <span className="offer-amount">💰 {offer.amount}</span>
                                </div>
                                <div className="offer-message">{offer.message}</div>
                                {offer.to === currentPlayer && (
                                    <div className="offer-actions">
                                        <button 
                                            className="accept-btn"
                                            onClick={() => acceptTradeOffer(offer.id)}
                                        >
                                            Accept
                                        </button>
                                        <button 
                                            className="reject-btn"
                                            onClick={() => rejectTradeOffer(offer.id)}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="game-controls">
                        <button className="reset-btn" onClick={resetGame}>
                            New Game
                        </button>
                    </div>
                </div>
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
                    if (isSafePosition(row, col)) {
                        cellClass += ' safe';
                    }
                } else if (isCenter) {
                    cellClass += ' center';
                }
                
                const piecesOnCell = getPiecesAtCellPosition(row, col);
                
                boardCells.push(
                    <div 
                        key={`${row}-${col}`} 
                        className={cellClass}
                        style={{ 
                            gridRow: row + 1, 
                            gridColumn: col + 1 
                        }}
                    >
                        {isCenter && row === 7 && col === 7 && (
                            <div className="center-dice">
                                <div 
                                    className={`dice ${isRolling ? 'rolling' : ''} ${gamePhase !== 'roll' || hasRolled ? 'disabled' : ''}`}
                                    onClick={rollDice}
                                >
                                    {diceValue || '🎲'}
                                </div>
                            </div>
                        )}
                        {piecesOnCell.map((piece, idx) => {
                            const isMovable = movablePieces.some(m => m.pieceId === piece.pieceId) && 
                                            piece.playerId === currentPlayer;
                            return (
                                <div 
                                    key={`${piece.playerId}-${piece.pieceId}`}
                                    className={`board-piece ${piece.color} ${isMovable ? 'clickable' : ''}`}
                                    style={{ 
                                        transform: `translate(${idx * 4}px, ${idx * 4}px)`,
                                        zIndex: idx + 10
                                    }}
                                    onClick={() => {
                                        if (isMovable) {
                                            movePiece(currentPlayer, piece.pieceId);
                                        }
                                    }}
                                />
                            );
                        })}
                        {renderHomePieces(row, col)}
                    </div>
                );
            }
        }
        
        return <div className="board-grid">{boardCells}</div>;
    };

    const isSafePosition = (row, col) => {
        const safePositions = [
            { row: 6, col: 1 }, { row: 1, col: 8 }, { row: 8, col: 13 }, { row: 13, col: 6 },
            { row: 6, col: 2 }, { row: 2, col: 8 }, { row: 8, col: 12 }, { row: 12, col: 6 } 
        ];
        
        return safePositions.some(pos => pos.row === row && pos.col === col);
    };

    const getPiecesAtCellPosition = (row, col) => {
        const pieces = [];
        
        players.forEach((player, pIndex) => {
            if (!player.isActive) return;
            
            const playerPath = BOARD_PATHS[player.color];
            
            player.pieces.forEach((piece, pieceIndex) => {
                if (!piece.isHome && !piece.isFinished && piece.position < 52) {
                    const piecePos = playerPath[piece.position];
                    if (piecePos && piecePos.row === row && piecePos.col === col) {
                        pieces.push({
                            playerId: pIndex,
                            pieceId: pieceIndex,
                            color: player.color
                        });
                    }
                }
            });
        });
        
        return pieces;
    };

    const renderHomePieces = (row, col) => {
        const homePieces = [];
        
        players.forEach((player, pIndex) => {
            if (!player.isActive) return;
            
            const homePositions = getHomePositions(player.color);
            
            homePositions.forEach((pos, posIndex) => {
                if (pos.row === row && pos.col === col) {
                    const piecesAtHome = player.pieces.filter(p => p.isHome);
                    const pieceIndex = piecesAtHome.findIndex((p, i) => i === posIndex);
                    
                    if (pieceIndex !== -1) {
                        const piece = piecesAtHome[pieceIndex];
                        const actualPieceIndex = player.pieces.indexOf(piece);
                        const isMovable = movablePieces.some(m => m.pieceId === actualPieceIndex) && 
                                        pIndex === currentPlayer;
                        
                        homePieces.push(
                            <div 
                                key={`home-${pIndex}-${actualPieceIndex}`}
                                className={`board-piece ${player.color} ${isMovable ? 'clickable' : ''}`}
                                onClick={() => {
                                    if (isMovable) {
                                        movePiece(currentPlayer, actualPieceIndex);
                                    }
                                }}
                            />
                        );
                    }
                }
            });
        });
        
        return homePieces;
    };

    const getHomePositions = (color) => {
        const positions = {
            red: [
                { row: 2, col: 2 }, { row: 2, col: 4 }, { row: 4, col: 2 }, { row: 4, col: 4 }
            ],
            blue: [
                { row: 2, col: 10 }, { row: 2, col: 12 }, { row: 4, col: 10 }, { row: 4, col: 12 }
            ],
            green: [
                { row: 10, col: 10 }, { row: 10, col: 12 }, { row: 12, col: 10 }, { row: 12, col: 12 }
            ],
            yellow: [
                { row: 10, col: 2 }, { row: 10, col: 4 }, { row: 12, col: 2 }, { row: 12, col: 4 }
            ]
        };
        
        return positions[color] || [];
    };

    const renderWinScreen = () => (
        <div className="win-screen">
            <div className="win-container">
                <h1>🎉 Game Over!</h1>
                <div className={`winner-announcement ${winner?.color}`}>
                    <div className="winner-circle"></div>
                    <div className="winner-details">
                        <p>{winner?.name} Wins!</p>
                        <p className="winner-coins">💰 {winner?.coins} Coins</p>
                    </div>
                </div>
                
                <div className="final-scores">
                    <h3>Final Scores</h3>
                    {players
                        .sort((a, b) => b.coins - a.coins)
                        .map((player, idx) => (
                            <div key={player.id} className={`score-row ${player.color}`}>
                                <span className="rank">#{idx + 1}</span>
                                <div className="player-circle"></div>
                                <span className="name">{player.name}</span>
                                <span className="coins">💰 {player.coins}</span>
                            </div>
                        ))
                    }
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

export default LudoGame;
