import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hand, ArrowDown, ArrowUp, ArrowLeft, ArrowRight, Play } from "lucide-react";

const FingerGuide = () => {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [currentLesson, setCurrentLesson] = useState(0);

  const fingerMap = {
    // Left hand
    'q': { finger: 'L4', color: 'finger-1' },
    'w': { finger: 'L3', color: 'finger-2' },
    'e': { finger: 'L2', color: 'finger-3' },
    'r': { finger: 'L1', color: 'finger-4' },
    't': { finger: 'L1', color: 'finger-4' },
    'a': { finger: 'L4', color: 'finger-1' },
    's': { finger: 'L3', color: 'finger-2' },
    'd': { finger: 'L2', color: 'finger-3' },
    'f': { finger: 'L1', color: 'finger-4' },
    'g': { finger: 'L1', color: 'finger-4' },
    'z': { finger: 'L4', color: 'finger-1' },
    'x': { finger: 'L3', color: 'finger-2' },
    'c': { finger: 'L2', color: 'finger-3' },
    'v': { finger: 'L1', color: 'finger-4' },
    'b': { finger: 'L1', color: 'finger-4' },
    // Right hand
    'y': { finger: 'R1', color: 'finger-5' },
    'u': { finger: 'R1', color: 'finger-5' },
    'i': { finger: 'R2', color: 'finger-6' },
    'o': { finger: 'R3', color: 'finger-7' },
    'p': { finger: 'R4', color: 'finger-8' },
    'h': { finger: 'R1', color: 'finger-5' },
    'j': { finger: 'R1', color: 'finger-5' },
    'k': { finger: 'R2', color: 'finger-6' },
    'l': { finger: 'R3', color: 'finger-7' },
    ';': { finger: 'R4', color: 'finger-8' },
    'n': { finger: 'R1', color: 'finger-5' },
    'm': { finger: 'R1', color: 'finger-5' },
    ',': { finger: 'R2', color: 'finger-6' },
    '.': { finger: 'R3', color: 'finger-7' },
    '/': { finger: 'R4', color: 'finger-8' }
  };

  const lessons = [
    {
      title: "Home Row Foundation",
      description: "Master the home row keys - the foundation of touch typing",
      keys: "asdf jkl;",
      practice: "asdf jkl; fjdk slal fjdk slal asdf jkl;",
      tips: [
        "Place your fingers on ASDF and JKL;",
        "Keep your wrists straight and floating",
        "Return to home position after each keystroke",
        "Use only the designated finger for each key"
      ]
    },
    {
      title: "Upper Row Mastery",
      description: "Learn the top row keys with proper finger placement",
      keys: "qwer tyui op",
      practice: "qwer tyui op wert yuio qwerty uiop",
      tips: [
        "Reach up with the same fingers used for home row",
        "Don't move your whole hand, just extend fingers",
        "Maintain contact with home row when possible",
        "Practice smooth transitions between rows"
      ]
    },
    {
      title: "Lower Row Control",
      description: "Master the bottom row keys for complete coverage",
      keys: "zxcv bnm,./",
      practice: "zxcv bnm,./ cvbn zxcv bnm,./",
      tips: [
        "Reach down while keeping other fingers on home row",
        "Use proper finger angles for comfort",
        "Don't press too hard on the keys",
        "Keep your thumbs relaxed for space bar"
      ]
    },
    {
      title: "Numbers and Symbols",
      description: "Add numbers and common symbols to your repertoire",
      keys: "1234567890 !@#$%^&*()",
      practice: "123 456 789 0!@ #$% ^&* ()",
      tips: [
        "Use the same fingers as the letters below",
        "Practice shift key combinations",
        "Keep your pinky strong for shift keys",
        "Don't look at the keyboard"
      ]
    }
  ];

  const keyboardLayout = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']
  ];

  const getKeyClass = (key: string) => {
    const baseClass = "keyboard-key w-12 h-12 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200";
    if (activeKey === key) {
      return `${baseClass} active scale-110`;
    }
    if (fingerMap[key as keyof typeof fingerMap]) {
      const finger = fingerMap[key as keyof typeof fingerMap];
      return `${baseClass} ${finger.color} border-2`;
    }
    return baseClass;
  };

  const handleKeyHover = (key: string) => {
    setActiveKey(key);
  };

  const currentLessonData = lessons[currentLesson];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Learn Touch Typing
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Master proper finger placement and typing technique with our comprehensive guide and interactive keyboard.
        </p>
      </div>

      <Tabs defaultValue="lessons" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
          <TabsTrigger value="keyboard">Keyboard</TabsTrigger>
          <TabsTrigger value="posture">Posture</TabsTrigger>
        </TabsList>

        <TabsContent value="lessons" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lesson Navigation */}
            <Card className="p-6 bg-gradient-surface border-border/50 elevation">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center">
                  <Hand className="w-5 h-5 mr-2" />
                  Lessons
                </h3>
                <div className="space-y-2">
                  {lessons.map((lesson, index) => (
                    <Button
                      key={index}
                      variant={currentLesson === index ? "default" : "ghost"}
                      className={`w-full justify-start ${currentLesson === index ? 'bg-gradient-primary text-white' : ''}`}
                      onClick={() => setCurrentLesson(index)}
                    >
                      <span className="mr-3">{index + 1}.</span>
                      {lesson.title}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Current Lesson */}
            <Card className="lg:col-span-2 p-6 bg-gradient-surface border-border/50 elevation">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold">{currentLessonData.title}</h3>
                    <p className="text-muted-foreground">{currentLessonData.description}</p>
                  </div>
                  <Badge className="bg-gradient-primary text-white">
                    Lesson {currentLesson + 1}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium mb-2">Focus Keys</h4>
                    <div className="p-4 bg-background/50 rounded-lg border font-mono text-2xl text-center tracking-wider">
                      {currentLessonData.keys}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium mb-2">Practice Text</h4>
                    <div className="p-4 bg-background/50 rounded-lg border font-mono text-lg leading-relaxed">
                      {currentLessonData.practice}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium mb-2">Key Tips</h4>
                    <ul className="space-y-2">
                      {currentLessonData.tips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-sm text-muted-foreground">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full bg-gradient-primary hover:opacity-90">
                    <Play className="w-4 h-4 mr-2" />
                    Practice This Lesson
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="keyboard" className="space-y-6">
          <Card className="p-8 bg-gradient-surface border-border/50 elevation">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-semibold">Interactive Keyboard Guide</h3>
                <p className="text-muted-foreground">
                  Hover over keys to see which finger should be used. Colors indicate finger assignments.
                </p>
              </div>

              {/* Virtual Keyboard */}
              <div className="flex flex-col items-center space-y-2 select-none">
                {keyboardLayout.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex space-x-2">
                    {row.map((key) => (
                      <button
                        key={key}
                        className={getKeyClass(key)}
                        onMouseEnter={() => handleKeyHover(key)}
                        onMouseLeave={() => setActiveKey(null)}
                      >
                        {key}
                      </button>
                    ))}
                  </div>
                ))}
                
                {/* Space bar */}
                <div className="flex space-x-2 mt-4">
                  <div className="keyboard-key w-64 h-12 flex items-center justify-center rounded-lg text-sm font-medium">
                    Space
                  </div>
                </div>
              </div>

              {/* Finger Assignment Legend */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 finger-1 rounded border-2"></div>
                  <span className="text-sm">Left Pinky</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 finger-2 rounded border-2"></div>
                  <span className="text-sm">Left Ring</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 finger-3 rounded border-2"></div>
                  <span className="text-sm">Left Middle</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 finger-4 rounded border-2"></div>
                  <span className="text-sm">Left Index</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 finger-5 rounded border-2"></div>
                  <span className="text-sm">Right Index</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 finger-6 rounded border-2"></div>
                  <span className="text-sm">Right Middle</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 finger-7 rounded border-2"></div>
                  <span className="text-sm">Right Ring</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 finger-8 rounded border-2"></div>
                  <span className="text-sm">Right Pinky</span>
                </div>
              </div>

              {activeKey && fingerMap[activeKey as keyof typeof fingerMap] && (
                <div className="text-center p-4 bg-primary/10 rounded-lg border">
                  <p className="text-lg">
                    Key "<span className="font-bold text-primary">{activeKey.toUpperCase()}</span>" 
                    is typed with your <span className="font-bold text-primary">
                      {fingerMap[activeKey as keyof typeof fingerMap].finger.includes('L') ? 'Left' : 'Right'}
                      {' '}
                      {fingerMap[activeKey as keyof typeof fingerMap].finger.includes('1') ? 'Index' :
                       fingerMap[activeKey as keyof typeof fingerMap].finger.includes('2') ? 'Middle' :
                       fingerMap[activeKey as keyof typeof fingerMap].finger.includes('3') ? 'Ring' : 'Pinky'}
                    </span> finger
                  </p>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="posture" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-gradient-surface border-border/50 elevation">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Proper Sitting Posture</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <ArrowUp className="w-5 h-5 mt-0.5 mr-3 text-primary flex-shrink-0" />
                    <div>
                      <strong>Straight Back:</strong> Keep your back straight and shoulders relaxed
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ArrowDown className="w-5 h-5 mt-0.5 mr-3 text-primary flex-shrink-0" />
                    <div>
                      <strong>Feet Flat:</strong> Plant both feet firmly on the ground
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ArrowLeft className="w-5 h-5 mt-0.5 mr-3 text-primary flex-shrink-0" />
                    <div>
                      <strong>Elbows 90°:</strong> Keep elbows at roughly 90-degree angles
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-5 h-5 mt-0.5 mr-3 text-primary flex-shrink-0" />
                    <div>
                      <strong>Screen Distance:</strong> Monitor should be 20-24 inches away
                    </div>
                  </li>
                </ul>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-surface border-border/50 elevation">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Hand Position</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Hand className="w-5 h-5 mt-0.5 mr-3 text-primary flex-shrink-0" />
                    <div>
                      <strong>Floating Wrists:</strong> Don't rest wrists on the desk while typing
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Hand className="w-5 h-5 mt-0.5 mr-3 text-primary flex-shrink-0" />
                    <div>
                      <strong>Curved Fingers:</strong> Keep fingers naturally curved like holding a small ball
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Hand className="w-5 h-5 mt-0.5 mr-3 text-primary flex-shrink-0" />
                    <div>
                      <strong>Light Touch:</strong> Use gentle pressure on keys, don't pound
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Hand className="w-5 h-5 mt-0.5 mr-3 text-primary flex-shrink-0" />
                    <div>
                      <strong>Home Position:</strong> Always return to home row after each keystroke
                    </div>
                  </li>
                </ul>
              </div>
            </Card>

            <Card className="lg:col-span-2 p-6 bg-gradient-primary/10 border-primary/20">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold text-primary">Remember: Practice Makes Perfect!</h3>
                <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                  Start slowly and focus on accuracy over speed. Speed will naturally improve as you 
                  develop muscle memory. Take regular breaks to prevent fatigue and maintain good posture 
                  throughout your practice sessions.
                </p>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FingerGuide;