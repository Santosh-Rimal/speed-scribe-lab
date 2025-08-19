import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Target, Zap, Clock, Calendar, Trophy, Award, Star } from "lucide-react";

const Statistics = () => {
  const [timeRange, setTimeRange] = useState("7d");
  
  // Mock data - in a real app, this would come from a backend/localStorage
  const mockStats = {
    overview: {
      totalTests: 147,
      totalTime: 52, // hours
      avgWPM: 58,
      avgAccuracy: 92,
      bestWPM: 78,
      bestAccuracy: 98,
      wordsTyped: 12840,
      improvement: 23 // percentage improvement this month
    },
    dailyStats: [
      { date: '2024-01-15', wpm: 45, accuracy: 89, testsCompleted: 3, timeSpent: 25 },
      { date: '2024-01-16', wpm: 48, accuracy: 91, testsCompleted: 5, timeSpent: 35 },
      { date: '2024-01-17', wpm: 52, accuracy: 88, testsCompleted: 4, timeSpent: 30 },
      { date: '2024-01-18', wpm: 55, accuracy: 93, testsCompleted: 6, timeSpent: 40 },
      { date: '2024-01-19', wpm: 58, accuracy: 95, testsCompleted: 4, timeSpent: 28 },
      { date: '2024-01-20', wpm: 61, accuracy: 92, testsCompleted: 7, timeSpent: 45 },
      { date: '2024-01-21', wpm: 65, accuracy: 94, testsCompleted: 5, timeSpent: 38 }
    ],
    weeklyProgress: [
      { week: 'Week 1', avgWPM: 42, avgAccuracy: 87, testsCompleted: 18 },
      { week: 'Week 2', avgWPM: 48, avgAccuracy: 89, testsCompleted: 22 },
      { week: 'Week 3', avgWPM: 54, avgAccuracy: 92, testsCompleted: 28 },
      { week: 'Week 4', avgWPM: 58, avgAccuracy: 94, testsCompleted: 31 }
    ],
    achievements: [
      { id: 1, title: "Speed Demon", description: "Reached 60+ WPM", icon: Zap, earned: true, date: "2024-01-18" },
      { id: 2, title: "Accuracy Master", description: "95%+ accuracy for 5 consecutive tests", icon: Target, earned: true, date: "2024-01-19" },
      { id: 3, title: "Consistency King", description: "Practice 7 days in a row", icon: Calendar, earned: true, date: "2024-01-21" },
      { id: 4, title: "Century Club", description: "Complete 100 typing tests", icon: Trophy, earned: true, date: "2024-01-20" },
      { id: 5, title: "Lightning Fingers", description: "Reach 80+ WPM", icon: Star, earned: false, date: null },
      { id: 6, title: "Perfect Score", description: "Achieve 100% accuracy", icon: Award, earned: false, date: null }
    ],
    difficultKeys: [
      { key: 'q', errors: 23, accuracy: 78 },
      { key: 'z', errors: 19, accuracy: 82 },
      { key: 'x', errors: 17, accuracy: 85 },
      { key: 'p', errors: 15, accuracy: 87 },
      { key: ';', errors: 12, accuracy: 89 }
    ]
  };

  const getTimeRangeData = () => {
    switch (timeRange) {
      case '7d':
        return mockStats.dailyStats;
      case '30d':
        return mockStats.weeklyProgress;
      default:
        return mockStats.dailyStats;
    }
  };

  const getProgressLevel = (wpm: number) => {
    if (wpm < 20) return { level: "Beginner", color: "bg-gradient-success", progress: (wpm / 20) * 100 };
    if (wpm < 40) return { level: "Intermediate", color: "bg-gradient-accent", progress: ((wpm - 20) / 20) * 100 };
    if (wpm < 60) return { level: "Advanced", color: "bg-gradient-secondary", progress: ((wpm - 40) / 20) * 100 };
    return { level: "Expert", color: "bg-gradient-danger", progress: Math.min(((wpm - 60) / 20) * 100, 100) };
  };

  const currentLevel = getProgressLevel(mockStats.overview.avgWPM);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Your Progress & Statistics
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Track your typing journey with detailed analytics, achievements, and personalized insights.
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-gradient-surface border-border/50 elevation">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average WPM</p>
                  <p className="text-2xl font-bold">{mockStats.overview.avgWPM}</p>
                  <p className="text-xs text-green-500">↑ {mockStats.overview.improvement}% this month</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-surface border-border/50 elevation">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average Accuracy</p>
                  <p className="text-2xl font-bold">{mockStats.overview.avgAccuracy}%</p>
                  <p className="text-xs text-muted-foreground">Best: {mockStats.overview.bestAccuracy}%</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-surface border-border/50 elevation">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-background" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time Practiced</p>
                  <p className="text-2xl font-bold">{mockStats.overview.totalTime}h</p>
                  <p className="text-xs text-muted-foreground">{mockStats.overview.totalTests} tests</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-surface border-border/50 elevation">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-success rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Best Speed</p>
                  <p className="text-2xl font-bold">{mockStats.overview.bestWPM}</p>
                  <p className="text-xs text-muted-foreground">WPM Record</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Current Level */}
          <Card className="p-6 bg-gradient-surface border-border/50 elevation">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Current Level</h3>
                <Badge className={`${currentLevel.color} text-white`}>
                  {currentLevel.level}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to next level</span>
                  <span>{Math.round(currentLevel.progress)}%</span>
                </div>
                <Progress value={currentLevel.progress} className="h-3" />
              </div>
              
              <p className="text-sm text-muted-foreground">
                {currentLevel.level === "Expert" 
                  ? "You've reached the highest level! Keep pushing your limits!"
                  : `Keep practicing to reach ${currentLevel.level === "Beginner" ? "Intermediate" : currentLevel.level === "Intermediate" ? "Advanced" : "Expert"} level!`
                }
              </p>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6 bg-gradient-surface border-border/50 elevation">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Recent Activity</h3>
              <div className="space-y-3">
                {mockStats.dailyStats.slice(-3).reverse().map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-background/50 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{new Date(stat.date).toLocaleDateString()}</p>
                        <p className="text-sm text-muted-foreground">{stat.testsCompleted} tests completed</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{stat.wpm} WPM</p>
                      <p className="text-sm text-muted-foreground">{stat.accuracy}% accuracy</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold">Performance Trends</h3>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* WPM Chart */}
            <Card className="p-6 bg-gradient-surface border-border/50 elevation">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Words Per Minute</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={getTimeRangeData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey={timeRange === '7d' ? 'date' : 'week'} 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey={timeRange === '7d' ? 'wpm' : 'avgWPM'} 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>

            {/* Accuracy Chart */}
            <Card className="p-6 bg-gradient-surface border-border/50 elevation">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Accuracy Percentage</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={getTimeRangeData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey={timeRange === '7d' ? 'date' : 'week'} 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))" 
                        fontSize={12}
                        domain={[80, 100]}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey={timeRange === '7d' ? 'accuracy' : 'avgAccuracy'} 
                        stroke="hsl(var(--accent))" 
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </div>

          {/* Tests Completed Chart */}
          <Card className="p-6 bg-gradient-surface border-border/50 elevation">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Tests Completed</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getTimeRangeData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey={timeRange === '7d' ? 'date' : 'week'} 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar 
                      dataKey="testsCompleted" 
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockStats.achievements.map((achievement) => (
              <Card 
                key={achievement.id} 
                className={`p-6 border-border/50 elevation transition-all duration-200 ${
                  achievement.earned 
                    ? 'bg-gradient-surface glow-primary' 
                    : 'bg-gradient-surface opacity-60'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      achievement.earned ? 'bg-gradient-primary' : 'bg-muted'
                    }`}>
                      <achievement.icon className={`w-6 h-6 ${
                        achievement.earned ? 'text-white' : 'text-muted-foreground'
                      }`} />
                    </div>
                    {achievement.earned && (
                      <Badge className="bg-gradient-success text-white">
                        Earned
                      </Badge>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-1">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    {achievement.earned && achievement.date && (
                      <p className="text-xs text-primary mt-2">
                        Earned on {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6 bg-gradient-surface border-border/50 elevation">
            <div className="text-center space-y-4">
              <Trophy className="w-16 h-16 text-primary mx-auto" />
              <div>
                <h3 className="text-2xl font-semibold mb-2">Achievement Progress</h3>
                <p className="text-muted-foreground">
                  You've earned {mockStats.achievements.filter(a => a.earned).length} out of {mockStats.achievements.length} achievements!
                </p>
              </div>
              <Progress 
                value={(mockStats.achievements.filter(a => a.earned).length / mockStats.achievements.length) * 100} 
                className="h-3 max-w-md mx-auto" 
              />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Problem Keys */}
            <Card className="p-6 bg-gradient-surface border-border/50 elevation">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Keys to Practice</h3>
                <p className="text-sm text-muted-foreground">
                  Focus on these keys to improve your overall accuracy
                </p>
                
                <div className="space-y-3">
                  {mockStats.difficultKeys.map((keyData, index) => (
                    <div key={keyData.key} className="flex items-center justify-between p-3 bg-background/50 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-danger rounded-lg flex items-center justify-center">
                          <span className="font-bold text-white font-mono">{keyData.key.toUpperCase()}</span>
                        </div>
                        <div>
                          <p className="font-medium">Key '{keyData.key}'</p>
                          <p className="text-sm text-muted-foreground">{keyData.errors} errors</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{keyData.accuracy}%</p>
                        <p className="text-sm text-muted-foreground">accuracy</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Recommendations */}
            <Card className="p-6 bg-gradient-surface border-border/50 elevation">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Personalized Tips</h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-primary/10 rounded-lg border border-primary/20">
                    <div className="flex items-start space-x-3">
                      <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium text-primary">Speed Focus</h4>
                        <p className="text-sm text-muted-foreground">
                          Your accuracy is excellent! Try increasing your typing speed by 5-10 WPM while maintaining 90%+ accuracy.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-accent/10 rounded-lg border border-accent/20">
                    <div className="flex items-start space-x-3">
                      <Target className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <h4 className="font-medium text-accent">Key Practice</h4>
                        <p className="text-sm text-muted-foreground">
                          Focus on practicing the 'Q' and 'Z' keys. Consider doing specific exercises for these problem areas.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-success/10 rounded-lg border border-green-500/20">
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-500">Consistency</h4>
                        <p className="text-sm text-muted-foreground">
                          Great job maintaining daily practice! Try to practice for at least 15 minutes per session for optimal improvement.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Weekly Summary */}
          <Card className="p-6 bg-gradient-surface border-border/50 elevation">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">This Week's Summary</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-background/50 rounded-lg border">
                  <p className="text-2xl font-bold text-primary">+12</p>
                  <p className="text-sm text-muted-foreground">WPM Improvement</p>
                </div>
                <div className="text-center p-4 bg-background/50 rounded-lg border">
                  <p className="text-2xl font-bold text-primary">31</p>
                  <p className="text-sm text-muted-foreground">Tests Completed</p>
                </div>
                <div className="text-center p-4 bg-background/50 rounded-lg border">
                  <p className="text-2xl font-bold text-primary">3.2h</p>
                  <p className="text-sm text-muted-foreground">Time Practiced</p>
                </div>
                <div className="text-center p-4 bg-background/50 rounded-lg border">
                  <p className="text-2xl font-bold text-primary">7/7</p>
                  <p className="text-sm text-muted-foreground">Days Active</p>
                </div>
              </div>

              <div className="p-4 bg-gradient-primary/10 rounded-lg border border-primary/20 text-center">
                <Star className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-semibold text-primary">Excellent Progress!</p>
                <p className="text-sm text-muted-foreground">
                  You've shown remarkable improvement this week. Keep up the fantastic work!
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Statistics;