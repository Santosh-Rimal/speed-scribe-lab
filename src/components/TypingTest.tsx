import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, RotateCcw, Target, Zap, Clock, TrendingUp } from "lucide-react";

const TypingTest = () => {
  const [text, setText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectedTime, setSelectedTime] = useState(60);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const sampleTexts = {
    easy: "The quick brown fox jumps over the lazy dog. This is a simple sentence for typing practice. Easy words help beginners learn.",
    medium: "Technology advances rapidly in modern society. Programming languages evolve continuously, requiring developers to adapt their skills accordingly.",
    hard: "Sophisticated algorithms optimize computational efficiency through strategic implementation of data structures, enhancing overall system performance significantly.",
    advanced: "Quantum computing paradigms revolutionize cryptographic methodologies, necessitating unprecedented security protocols for safeguarding sensitive information."
  };

  const [difficulty, setDifficulty] = useState<keyof typeof sampleTexts>("easy");

  useEffect(() => {
    setText(sampleTexts[difficulty]);
    resetTest();
  }, [difficulty]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (isActive && startTime) {
      const wordsTyped = userInput.trim().split(' ').length;
      const timeElapsed = (new Date().getTime() - startTime.getTime()) / 1000 / 60;
      if (timeElapsed > 0) {
        setWpm(Math.round(wordsTyped / timeElapsed));
      }
      
      const correctChars = userInput.split('').filter((char, index) => char === text[index]).length;
      setAccuracy(userInput.length > 0 ? Math.round((correctChars / userInput.length) * 100) : 100);
      setCurrentIndex(userInput.length);
    }
  }, [userInput, isActive, startTime, text]);

  const startTest = () => {
    setIsActive(true);
    setStartTime(new Date());
    inputRef.current?.focus();
  };

  const resetTest = () => {
    setIsActive(false);
    setUserInput("");
    setTimeLeft(selectedTime);
    setWpm(0);
    setAccuracy(100);
    setCurrentIndex(0);
    setStartTime(null);
  };

  const getCharacterClass = (index: number) => {
    if (index < userInput.length) {
      return userInput[index] === text[index] ? "typing-correct" : "typing-incorrect";
    } else if (index === currentIndex) {
      return "typing-current";
    }
    return "typing-pending";
  };

  const handleInputChange = (value: string) => {
    if (!isActive) return;
    setUserInput(value);
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "easy": return "bg-gradient-success";
      case "medium": return "bg-gradient-accent";
      case "hard": return "bg-gradient-secondary";
      case "advanced": return "bg-gradient-danger";
      default: return "bg-gradient-primary";
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Typing Speed Test
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Test your typing speed and accuracy with real-time feedback. Choose your difficulty level and time duration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <Card className="p-6 bg-gradient-surface border-border/50 elevation">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Test Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Difficulty Level</label>
                <Select value={difficulty} onValueChange={(value: keyof typeof sampleTexts) => setDifficulty(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gradient-success rounded-full"></div>
                        <span>Easy</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gradient-accent rounded-full"></div>
                        <span>Medium</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="hard">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gradient-secondary rounded-full"></div>
                        <span>Hard</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="advanced">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gradient-danger rounded-full"></div>
                        <span>Advanced</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Time Duration</label>
                <Select value={selectedTime.toString()} onValueChange={(value) => {
                  setSelectedTime(Number(value));
                  setTimeLeft(Number(value));
                }}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 seconds</SelectItem>
                    <SelectItem value="60">1 minute</SelectItem>
                    <SelectItem value="120">2 minutes</SelectItem>
                    <SelectItem value="300">5 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button 
                onClick={startTest} 
                disabled={isActive}
                className="flex-1 bg-gradient-primary hover:opacity-90"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Test
              </Button>
              <Button 
                onClick={resetTest}
                variant="outline"
                className="flex-1"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <Card className="lg:col-span-2 p-6 bg-gradient-surface border-border/50 elevation">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Live Statistics</h3>
              <Badge className={getDifficultyColor(difficulty)} variant="secondary">
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{wpm}</p>
                  <p className="text-sm text-muted-foreground">WPM</p>
                </div>
              </div>

              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{accuracy}%</p>
                  <p className="text-sm text-muted-foreground">Accuracy</p>
                </div>
              </div>

              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto">
                  <Clock className="w-8 h-8 text-background" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{timeLeft}</p>
                  <p className="text-sm text-muted-foreground">Seconds</p>
                </div>
              </div>

              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center mx-auto">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{Math.round((currentIndex / text.length) * 100)}%</p>
                  <p className="text-sm text-muted-foreground">Progress</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{currentIndex}/{text.length} characters</span>
              </div>
              <Progress value={(currentIndex / text.length) * 100} className="h-2" />
            </div>
          </div>
        </Card>
      </div>

      {/* Typing Area */}
      <Card className="p-8 bg-gradient-surface border-border/50 elevation">
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-center">Type the text below</h3>
          
          {/* Text Display */}
          <div className="p-6 bg-background/50 rounded-lg border font-mono text-lg leading-relaxed min-h-[200px]">
            {text.split('').map((char, index) => (
              <span key={index} className={getCharacterClass(index)}>
                {char}
              </span>
            ))}
          </div>

          {/* Input Area */}
          <div className="space-y-4">
            <textarea
              ref={inputRef}
              value={userInput}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={isActive ? "Start typing..." : "Click Start Test to begin"}
              disabled={!isActive}
              className="w-full p-4 bg-background/50 rounded-lg border font-mono text-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              rows={4}
            />
            
            {!isActive && timeLeft === selectedTime && (
              <p className="text-center text-muted-foreground">
                Click "Start Test" and begin typing to start the timer
              </p>
            )}
            
            {timeLeft === 0 && (
              <div className="text-center space-y-4">
                <div className="p-6 bg-gradient-primary/10 rounded-lg border">
                  <h4 className="text-2xl font-bold text-primary mb-2">Test Completed!</h4>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-3xl font-bold">{wpm}</p>
                      <p className="text-sm text-muted-foreground">Words per minute</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold">{accuracy}%</p>
                      <p className="text-sm text-muted-foreground">Accuracy</p>
                    </div>
                  </div>
                </div>
                <Button onClick={resetTest} className="bg-gradient-primary hover:opacity-90">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TypingTest;