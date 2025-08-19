import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Play, RotateCcw, Target, Zap, CheckCircle } from "lucide-react";

const RowPractice = () => {
  const [selectedRow, setSelectedRow] = useState<'home' | 'top' | 'bottom' | 'numbers' | 'all'>('home');
  const [currentText, setCurrentText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [wpm, setWpm] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());

  const rowData = {
    home: {
      title: "Home Row Foundation",
      description: "Master the foundation keys: A S D F - J K L ;",
      keys: "asdf jkl;",
      color: "bg-gradient-success",
      exercises: [
        "asdf jkl; fjdk slal",
        "ask fall; lads fads",
        "a;sldkfj alsdk fjal;",
        "flask salad falls asks",
        "sad lad ask fall flask"
      ]
    },
    top: {
      title: "Top Row Mastery",
      description: "Learn the upper row: Q W E R T Y U I O P",
      keys: "qwerty uiop",
      color: "bg-gradient-primary",
      exercises: [
        "qwerty uiop typewriter",
        "quiet report equity",
        "pretty tower poetry",
        "query power territory",
        "typewriter potpourri"
      ]
    },
    bottom: {
      title: "Bottom Row Control",
      description: "Master the lower keys: Z X C V B N M , . /",
      keys: "zxcvbnm,./",
      color: "bg-gradient-secondary", 
      exercises: [
        "zxcv bnm,./zvbn cxzm",
        "maze cave comb name",
        "bronze carbon example",
        "cavemen maximum zebra",
        "vacant zombie machine"
      ]
    },
    numbers: {
      title: "Number Row Precision",
      description: "Practice numbers and symbols: 1 2 3 4 5 6 7 8 9 0",
      keys: "1234567890",
      color: "bg-gradient-accent",
      exercises: [
        "123 456 789 0 numbers",
        "password123 email@site.com",
        "phone: (555) 123-4567",
        "order #12345 costs $67.89",
        "code: abc123 date: 01/23/45"
      ]
    },
    all: {
      title: "All Rows Combined",
      description: "Practice all keyboard rows together",
      keys: "All Keys",
      color: "bg-gradient-danger",
      exercises: [
        "The quick brown fox jumps over lazy dog",
        "Pack my box with five dozen liquor jugs",
        "How vexingly quick daft zebras jump",
        "Waltz nymph for quick jigs vex bud",
        "Sphinx of black quartz judge my vow"
      ]
    }
  };

  const getCurrentExercise = () => {
    const exercises = rowData[selectedRow].exercises;
    return exercises[Math.floor(Math.random() * exercises.length)];
  };

  useEffect(() => {
    if (isActive && startTime && userInput.length > 0) {
      const wordsTyped = userInput.trim().split(' ').length;
      const timeElapsed = (new Date().getTime() - startTime.getTime()) / 1000 / 60;
      if (timeElapsed > 0) {
        setWpm(Math.round(wordsTyped / timeElapsed));
      }
      
      const correctChars = userInput.split('').filter((char, index) => char === currentText[index]).length;
      setAccuracy(userInput.length > 0 ? Math.round((correctChars / userInput.length) * 100) : 100);
      setCurrentIndex(userInput.length);

      if (userInput === currentText) {
        completeExercise();
      }
    }
  }, [userInput, isActive, startTime, currentText]);

  const startPractice = () => {
    const newText = getCurrentExercise();
    setCurrentText(newText);
    setUserInput("");
    setIsActive(true);
    setStartTime(new Date());
    setCurrentIndex(0);
    setAccuracy(100);
    setWpm(0);
  };

  const resetPractice = () => {
    setIsActive(false);
    setUserInput("");
    setCurrentIndex(0);
    setAccuracy(100);
    setWpm(0);
    setStartTime(null);
  };

  const completeExercise = () => {
    setIsActive(false);
    setCompletedExercises(prev => new Set([...prev, currentText]));
  };

  const handleInputChange = (value: string) => {
    if (!isActive) return;
    setUserInput(value);
  };

  const getCharacterClass = (index: number) => {
    if (index < userInput.length) {
      return userInput[index] === currentText[index] ? "typing-correct" : "typing-incorrect";
    } else if (index === currentIndex) {
      return "typing-current";
    }
    return "typing-pending";
  };

  const getRowProgress = (row: keyof typeof rowData) => {
    const exercises = rowData[row].exercises;
    const completed = exercises.filter(ex => completedExercises.has(ex)).length;
    return (completed / exercises.length) * 100;
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Row-by-Row Practice
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Master each keyboard row systematically. Start with the home row and progress to more advanced combinations.
        </p>
      </div>

      {/* Row Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {Object.entries(rowData).map(([rowKey, data]) => {
          const progress = getRowProgress(rowKey as keyof typeof rowData);
          return (
            <Card 
              key={rowKey}
              className={`p-4 cursor-pointer transition-all duration-200 hover:scale-105 ${
                selectedRow === rowKey 
                  ? 'ring-2 ring-primary bg-gradient-surface' 
                  : 'bg-gradient-surface border-border/50'
              } elevation`}
              onClick={() => setSelectedRow(rowKey as keyof typeof rowData)}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 ${data.color} rounded-lg flex items-center justify-center`}>
                    <span className="text-white text-sm font-bold">
                      {rowKey === 'home' ? 'H' : rowKey === 'top' ? 'T' : rowKey === 'bottom' ? 'B' : rowKey === 'numbers' ? '#' : 'A'}
                    </span>
                  </div>
                  {progress === 100 && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{data.title}</h3>
                  <p className="text-xs text-muted-foreground">{data.keys}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-1" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Current Row Practice */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Row Info & Stats */}
        <Card className="p-6 bg-gradient-surface border-border/50 elevation">
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className={`w-10 h-10 ${rowData[selectedRow].color} rounded-lg flex items-center justify-center`}>
                  <span className="text-white font-bold">
                    {selectedRow === 'home' ? 'H' : selectedRow === 'top' ? 'T' : selectedRow === 'bottom' ? 'B' : selectedRow === 'numbers' ? '#' : 'A'}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{rowData[selectedRow].title}</h3>
                  <p className="text-sm text-muted-foreground">{rowData[selectedRow].description}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Focus Keys</h4>
                <div className="p-3 bg-background/50 rounded-lg border font-mono text-center text-lg tracking-wider">
                  {rowData[selectedRow].keys}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-2">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-2xl font-bold">{wpm}</p>
                  <p className="text-xs text-muted-foreground">WPM</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-2">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-2xl font-bold">{accuracy}%</p>
                  <p className="text-xs text-muted-foreground">Accuracy</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Row Progress</span>
                  <span>{Math.round(getRowProgress(selectedRow))}%</span>
                </div>
                <Progress value={getRowProgress(selectedRow)} className="h-2" />
              </div>

              <div className="flex space-x-2">
                <Button 
                  onClick={startPractice}
                  className="flex-1 bg-gradient-primary hover:opacity-90"
                  disabled={isActive}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start
                </Button>
                <Button 
                  onClick={resetPractice}
                  variant="outline"
                  className="flex-1"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Practice Area */}
        <Card className="lg:col-span-2 p-6 bg-gradient-surface border-border/50 elevation">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Practice Exercise</h3>
              <Badge className={`${rowData[selectedRow].color} text-white`}>
                {rowData[selectedRow].title}
              </Badge>
            </div>

            {currentText ? (
              <>
                {/* Text Display */}
                <div className="p-6 bg-background/50 rounded-lg border font-mono text-xl leading-relaxed min-h-[120px]">
                  {currentText.split('').map((char, index) => (
                    <span key={index} className={getCharacterClass(index)}>
                      {char}
                    </span>
                  ))}
                </div>

                {/* Input Area */}
                <div className="space-y-4">
                  <textarea
                    value={userInput}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder={isActive ? "Type the text above..." : "Click Start to begin"}
                    disabled={!isActive}
                    className="w-full p-4 bg-background/50 rounded-lg border font-mono text-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                  />

                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Progress: {currentIndex}/{currentText.length} characters</span>
                    <span>{Math.round((currentIndex / currentText.length) * 100)}% complete</span>
                  </div>

                  <Progress value={(currentIndex / currentText.length) * 100} className="h-2" />

                  {userInput === currentText && currentText.length > 0 && (
                    <div className="text-center p-4 bg-gradient-success/10 rounded-lg border border-green-500/20">
                      <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <p className="text-green-500 font-semibold">Exercise Complete!</p>
                      <p className="text-sm text-muted-foreground">
                        Speed: {wpm} WPM | Accuracy: {accuracy}%
                      </p>
                      <Button 
                        onClick={startPractice}
                        className="mt-3 bg-gradient-primary hover:opacity-90"
                      >
                        Next Exercise
                      </Button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Ready to practice {rowData[selectedRow].title.toLowerCase()}?</p>
                <Button 
                  onClick={startPractice}
                  className="bg-gradient-primary hover:opacity-90"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Practice
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Exercise List */}
      <Card className="p-6 bg-gradient-surface border-border/50 elevation">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Available Exercises</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {rowData[selectedRow].exercises.map((exercise, index) => (
              <div 
                key={index}
                className={`p-3 rounded-lg border font-mono text-sm ${
                  completedExercises.has(exercise) 
                    ? 'bg-green-500/10 border-green-500/20 text-green-500' 
                    : 'bg-background/50 border-border'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Exercise {index + 1}</span>
                  {completedExercises.has(exercise) && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </div>
                <p className="truncate">{exercise}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RowPractice;