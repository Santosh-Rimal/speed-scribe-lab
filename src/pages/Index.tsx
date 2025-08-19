import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Keyboard, Zap, Target, Trophy, BookOpen, Gamepad2, BarChart3, Clock } from "lucide-react";
import TypingTest from "@/components/TypingTest";
import FingerGuide from "@/components/FingerGuide";
import TypingGame from "@/components/TypingGame";
import RowPractice from "@/components/RowPractice";
import Statistics from "@/components/Statistics";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  const stats = {
    bestWPM: 65,
    accuracy: 94,
    totalTests: 127,
    timeSpent: 48
  };

  const features = [
    {
      icon: Zap,
      title: "Speed Test",
      description: "Test your typing speed with real-time WPM tracking",
      badge: "Most Popular",
      gradient: "bg-gradient-primary"
    },
    {
      icon: Target,
      title: "Accuracy Training",
      description: "Improve precision with targeted exercises",
      badge: "Essential",
      gradient: "bg-gradient-secondary"
    },
    {
      icon: BookOpen,
      title: "Learning Guide",
      description: "Master proper finger positioning and technique",
      badge: "Beginner Friendly",
      gradient: "bg-gradient-accent"
    },
    {
      icon: Gamepad2,
      title: "Typing Games",
      description: "Fun games to make learning engaging",
      badge: "Fun",
      gradient: "bg-gradient-success"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-background-tertiary">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/50 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center glow-primary">
                <Keyboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  TypeShala
                </h1>
                <p className="text-sm text-muted-foreground">Master the art of typing</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-accent" />
                  <span>{stats.bestWPM} WPM</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-accent" />
                  <span>{stats.accuracy}% Accuracy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-accent" />
                  <span>{stats.timeSpent}h Practiced</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid grid-cols-6 w-full max-w-3xl mx-auto bg-card border elevation">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="typing-test" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white">
              <Zap className="w-4 h-4 mr-2" />
              Speed Test
            </TabsTrigger>
            <TabsTrigger value="finger-guide" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white">
              <BookOpen className="w-4 h-4 mr-2" />
              Learn
            </TabsTrigger>
            <TabsTrigger value="row-practice" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white">
              <Keyboard className="w-4 h-4 mr-2" />
              Rows
            </TabsTrigger>
            <TabsTrigger value="games" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white">
              <Gamepad2 className="w-4 h-4 mr-2" />
              Games
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white">
              <Trophy className="w-4 h-4 mr-2" />
              Stats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-6 py-12">
              <div className="space-y-4">
                <h2 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-slide-up">
                  Master Your Typing Skills
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up">
                  From beginner to expert, TypeShala provides comprehensive typing training with 
                  real-time feedback, engaging games, and detailed analytics.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 justify-center animate-slide-up">
                <Button 
                  onClick={() => setActiveTab("typing-test")}
                  className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-6 h-auto glow-primary animate-bounce-in"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Start Speed Test
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab("finger-guide")}
                  className="text-lg px-8 py-6 h-auto border-primary/20 hover:bg-primary/10"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Learn Basics
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6 bg-gradient-surface border-border/50 elevation">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Best Speed</p>
                    <p className="text-2xl font-bold text-foreground">{stats.bestWPM} WPM</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-surface border-border/50 elevation">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Accuracy</p>
                    <p className="text-2xl font-bold text-foreground">{stats.accuracy}%</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-surface border-border/50 elevation">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-background" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tests Completed</p>
                    <p className="text-2xl font-bold text-foreground">{stats.totalTests}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-surface border-border/50 elevation">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-success rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time Practiced</p>
                    <p className="text-2xl font-bold text-foreground">{stats.timeSpent}h</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Features Grid */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-center">Choose Your Training Mode</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <Card key={index} className="group p-6 bg-gradient-surface border-border/50 elevation hover:scale-105 transition-smooth cursor-pointer">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 ${feature.gradient} rounded-lg flex items-center justify-center`}>
                          <feature.icon className="w-6 h-6 text-white" />
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {feature.badge}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                        <p className="text-muted-foreground text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Progress Section */}
            <Card className="p-8 bg-gradient-surface border-border/50 elevation">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-center">Your Progress Journey</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Beginner (0-20 WPM)</span>
                    <span className="text-sm font-medium">Complete ✓</span>
                  </div>
                  <Progress value={100} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Intermediate (20-40 WPM)</span>
                    <span className="text-sm font-medium">Complete ✓</span>
                  </div>
                  <Progress value={100} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Advanced (40-60 WPM)</span>
                    <span className="text-sm font-medium">85% Complete</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Expert (60+ WPM)</span>
                    <span className="text-sm font-medium">In Progress</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="typing-test">
            <TypingTest />
          </TabsContent>

          <TabsContent value="finger-guide">
            <FingerGuide />
          </TabsContent>

          <TabsContent value="row-practice">
            <RowPractice />
          </TabsContent>

          <TabsContent value="games">
            <TypingGame />
          </TabsContent>

          <TabsContent value="stats">
            <Statistics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;