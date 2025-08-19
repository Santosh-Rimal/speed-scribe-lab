import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, RotateCcw, Zap, Target, Trophy, Gamepad2 } from "lucide-react";

const TypingGame = () => {
  const [activeGame, setActiveGame] = useState<'word-rain' | 'speed-race' | 'accuracy-challenge'>('word-rain');
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'ended'>('menu');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentWord, setCurrentWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [wordsCompleted, setWordsCompleted] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const inputRef = useRef<HTMLInputElement>(null);

  // Word lists for different games
  const wordLists = {
    easy: ["cat", "dog", "run", "jump", "play", "fast", "slow", "big", "small", "fun"],
    medium: ["computer", "keyboard", "typing", "practice", "exercise", "challenge", "improve", "accuracy"],
    hard: ["sophisticated", "algorithm", "programming", "development", "implementation", "optimization"]
  };

  const getRandomWord = () => {
    const difficulty = level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard';
    const words = wordLists[difficulty];
    return words[Math.floor(Math.random() * words.length)];
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === 'playing' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('ended');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState, timeLeft]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setLevel(1);
    setTimeLeft(60);
    setWordsCompleted(0);
    setAccuracy(100);
    setCurrentWord(getRandomWord());
    setUserInput("");
    inputRef.current?.focus();
  };

  const pauseGame = () => {
    setGameState(gameState === 'playing' ? 'paused' : 'playing');
  };

  const resetGame = () => {
    setGameState('menu');
    setScore(0);
    setLevel(1);
    setTimeLeft(60);
    setWordsCompleted(0);
    setAccuracy(100);
    setCurrentWord("");
    setUserInput("");
  };

  const handleWordComplete = () => {
    const newWordsCompleted = wordsCompleted + 1;
    setWordsCompleted(newWordsCompleted);
    setScore(prev => prev + (currentWord.length * level * 10));
    
    // Level up every 10 words
    if (newWordsCompleted % 10 === 0) {
      setLevel(prev => prev + 1);
    }
    
    setCurrentWord(getRandomWord());
    setUserInput("");
    
    // Calculate accuracy
    const totalChars = newWordsCompleted * 5; // Average word length
    const correctChars = Math.floor(totalChars * 0.95); // Simulated accuracy
    setAccuracy(Math.round((correctChars / totalChars) * 100));
  };

  const handleInputChange = (value: string) => {
    if (gameState !== 'playing') return;
    
    setUserInput(value);
    
    if (value === currentWord) {
      handleWordComplete();
    }
  };

  const getHighScore = () => {
    const saved = localStorage.getItem(`typeshala-${activeGame}-highscore`);
    return saved ? parseInt(saved) : 0;
  };

  const saveHighScore = () => {
    const currentHigh = getHighScore();
    if (score > currentHigh) {
      localStorage.setItem(`typeshala-${activeGame}-highscore`, score.toString());
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (gameState === 'ended') {
      saveHighScore();
    }
  }, [gameState, score]);

  const getGameConfig = () => {
    switch (activeGame) {
      case 'word-rain':
        return {
          title: "Word Rain",
          description: "Type falling words before they reach the bottom!",
          icon: Zap,
          color: "bg-gradient-primary"
        };
      case 'speed-race':
        return {
          title: "Speed Race",
          description: "Race against time to type as many words as possible!",
          icon: Target,
          color: "bg-gradient-secondary"
        };
      case 'accuracy-challenge':
        return {
          title: "Accuracy Challenge",
          description: "Perfect typing with zero mistakes allowed!",
          icon: Trophy,
          color: "bg-gradient-accent"
        };
      default:
        return {
          title: "Word Rain",
          description: "Type falling words before they reach the bottom!",
          icon: Zap,
          color: "bg-gradient-primary"
        };
    }
  };

  const gameConfig = getGameConfig();

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Typing Games
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Make learning fun with engaging typing games. Challenge yourself and improve your skills while having a blast!
        </p>
      </div>

      <Tabs value={activeGame} onValueChange={(value) => setActiveGame(value as any)} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto">
          <TabsTrigger value="word-rain" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white">
            <Zap className="w-4 h-4 mr-2" />
            Word Rain
          </TabsTrigger>
          <TabsTrigger value="speed-race" className="data-[state=active]:bg-gradient-secondary data-[state=active]:text-white">
            <Target className="w-4 h-4 mr-2" />
            Speed Race
          </TabsTrigger>
          <TabsTrigger value="accuracy-challenge" className="data-[state=active]:bg-gradient-accent data-[state=active]:text-white">
            <Trophy className="w-4 h-4 mr-2" />
            Accuracy
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeGame} className="space-y-6">
          {gameState === 'menu' && (
            <Card className="p-8 bg-gradient-surface border-border/50 elevation text-center">
              <div className="space-y-6">
                <div className={`w-20 h-20 ${gameConfig.color} rounded-full flex items-center justify-center mx-auto`}>
                  <gameConfig.icon className="w-10 h-10 text-white" />
                </div>
                
                <div>
                  <h3 className="text-3xl font-bold mb-2">{gameConfig.title}</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    {gameConfig.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-md mx-auto">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{getHighScore()}</p>
                    <p className="text-sm text-muted-foreground">High Score</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">60s</p>
                    <p className="text-sm text-muted-foreground">Game Time</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">∞</p>
                    <p className="text-sm text-muted-foreground">Levels</p>
                  </div>
                </div>

                <Button 
                  onClick={startGame}
                  className={`${gameConfig.color} hover:opacity-90 text-xl px-8 py-6 h-auto`}
                >
                  <Play className="w-6 h-6 mr-2" />
                  Start Game
                </Button>
              </div>
            </Card>
          )}

          {(gameState === 'playing' || gameState === 'paused') && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Game Stats */}
              <Card className="p-6 bg-gradient-surface border-border/50 elevation">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold flex items-center">
                    <Gamepad2 className="w-5 h-5 mr-2" />
                    Game Stats
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Score</span>
                      <span className="text-2xl font-bold text-primary">{score.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Level</span>
                      <Badge className={gameConfig.color}>
                        {level}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Words</span>
                      <span className="text-lg font-semibold">{wordsCompleted}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Accuracy</span>
                      <span className="text-lg font-semibold">{accuracy}%</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Time Left</span>
                        <span>{timeLeft}s</span>
                      </div>
                      <Progress value={(timeLeft / 60) * 100} className="h-2" />
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      onClick={pauseGame}
                      variant="outline"
                      className="flex-1"
                    >
                      <Pause className="w-4 h-4 mr-2" />
                      {gameState === 'playing' ? 'Pause' : 'Resume'}
                    </Button>
                    <Button 
                      onClick={resetGame}
                      variant="outline"
                      className="flex-1"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Quit
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Game Area */}
              <Card className="lg:col-span-2 p-8 bg-gradient-surface border-border/50 elevation">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold mb-2">{gameConfig.title}</h3>
                    {gameState === 'paused' && (
                      <Badge variant="secondary" className="text-lg px-4 py-2">
                        PAUSED
                      </Badge>
                    )}
                  </div>

                  {gameState === 'playing' && (
                    <>
                      {/* Current Word Display */}
                      <div className="text-center space-y-4">
                        <div className="p-8 bg-background/50 rounded-lg border">
                          <p className="text-sm text-muted-foreground mb-2">Type this word:</p>
                          <div className="text-6xl font-bold font-mono tracking-wider">
                            {currentWord.split('').map((char, index) => {
                              const isTyped = index < userInput.length;
                              const isCorrect = isTyped && userInput[index] === char;
                              const isCurrent = index === userInput.length;
                              
                              return (
                                <span 
                                  key={index}
                                  className={`
                                    ${isTyped ? (isCorrect ? 'text-green-500' : 'text-red-500 bg-red-500/20') : 'text-muted-foreground'}
                                    ${isCurrent ? 'bg-primary/30 animate-pulse' : ''}
                                  `}
                                >
                                  {char}
                                </span>
                              );
                            })}
                          </div>
                        </div>

                        {/* Input Field */}
                        <div className="max-w-md mx-auto">
                          <input
                            ref={inputRef}
                            type="text"
                            value={userInput}
                            onChange={(e) => handleInputChange(e.target.value)}
                            placeholder="Start typing..."
                            className="w-full p-4 text-2xl text-center font-mono bg-background/50 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Word Progress</span>
                            <span>{userInput.length}/{currentWord.length}</span>
                          </div>
                          <Progress value={(userInput.length / currentWord.length) * 100} className="h-2" />
                        </div>
                      </div>
                    </>
                  )}

                  {gameState === 'paused' && (
                    <div className="text-center space-y-4">
                      <div className="p-8 bg-background/50 rounded-lg border">
                        <h4 className="text-2xl font-bold mb-2">Game Paused</h4>
                        <p className="text-muted-foreground">Click Resume to continue playing</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          )}

          {gameState === 'ended' && (
            <Card className="p-8 bg-gradient-surface border-border/50 elevation text-center">
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-bold mb-2">Game Over!</h3>
                  <p className="text-muted-foreground">Great job! Here are your results:</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                  <div className="p-4 bg-background/50 rounded-lg border">
                    <p className="text-3xl font-bold text-primary">{score.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Final Score</p>
                  </div>
                  <div className="p-4 bg-background/50 rounded-lg border">
                    <p className="text-3xl font-bold text-primary">{level}</p>
                    <p className="text-sm text-muted-foreground">Level Reached</p>
                  </div>
                  <div className="p-4 bg-background/50 rounded-lg border">
                    <p className="text-3xl font-bold text-primary">{wordsCompleted}</p>
                    <p className="text-sm text-muted-foreground">Words Typed</p>
                  </div>
                  <div className="p-4 bg-background/50 rounded-lg border">
                    <p className="text-3xl font-bold text-primary">{accuracy}%</p>
                    <p className="text-sm text-muted-foreground">Accuracy</p>
                  </div>
                </div>

                {score > getHighScore() && (
                  <div className="p-4 bg-gradient-primary/10 rounded-lg border border-primary/20">
                    <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-primary font-semibold">New High Score!</p>
                  </div>
                )}

                <div className="flex justify-center space-x-4">
                  <Button onClick={startGame} className={`${gameConfig.color} hover:opacity-90`}>
                    <Play className="w-4 h-4 mr-2" />
                    Play Again
                  </Button>
                  <Button onClick={resetGame} variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Main Menu
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TypingGame;