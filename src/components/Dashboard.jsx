import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Calendar, 
  Trophy, 
  BarChart3, 
  LogOut, 
  Clock,
  CheckCircle,
  XCircle,
  Sun,
  Moon
} from 'lucide-react';

export default function Dashboard({ 
  userNationalId, 
  testResults, 
  onStartTest, 
  onViewSummary, 
  onLogout,
  toggleTheme,
  currentTheme
}) {
  const testTypes = [
    { id: 'pre-test', name: 'الاختبار القبلي', icon: BookOpen, color: 'from-blue-500 to-cyan-500' },
    { id: 'post-test', name: 'الاختبار البعدي', icon: Trophy, color: 'from-green-500 to-emerald-500' }
  ];

  const dailyTests = Array.from({ length: 3 }, (_, i) => ({
    id: `day-${i + 1}`,
    name: `اليوم ${i + 1}`,
    icon: Calendar,
    color: 'from-purple-500 to-pink-500'
  }));

  const getTestStatus = (testId) => {
    const result = testResults[testId];
    if (!result) return 'not-started';
    return result.passed ? 'passed' : 'failed';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'passed': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'failed': return <XCircle className="w-5 h-5 text-red-400" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'passed': return 'نجح';
      case 'failed': return 'لم ينجح';
      default: return 'لم يبدأ';
    }
  };

  const completedTests = Object.keys(testResults).length;
  const passedTests = Object.values(testResults).filter(r => r.passed).length;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 mb-8 border border-white/20"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-right">
              <h1 className="text-2xl sm:text-3xl font-bold text-inherit mb-2">
                لوحة التحكم
              </h1>
              <p className="text-inherit/80">
                اسم المعلم: {userNationalId}
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                onClick={toggleTheme}
                variant="outline"
                size="icon"
                className="border-white/30 text-inherit hover:bg-white/10"
              >
                {currentTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <Button
                onClick={onViewSummary}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
              >
                <BarChart3 className="w-4 h-4 ml-2" />
                <span className="hidden sm:inline">ملخص الأداء</span>
              </Button>
              <Button
                onClick={onLogout}
                variant="outline"
                className="border-white/30 text-inherit hover:bg-white/10"
              >
                <LogOut className="w-4 h-4 ml-2" />
                 <span className="hidden sm:inline">خروج</span>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm">الاختبارات المكتملة</p>
                <p className="text-3xl font-bold text-inherit">{completedTests}</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200 text-sm">الاختبارات الناجحة</p>
                <p className="text-3xl font-bold text-inherit">{passedTests}</p>
              </div>
              <Trophy className="w-8 h-8 text-green-400" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">معدل النجاح</p>
                <p className="text-3xl font-bold text-inherit">
                  {completedTests > 0 ? Math.round((passedTests / completedTests) * 100) : 0}%
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </motion.div>

        {/* Main Tests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-inherit mb-6">الاختبارات الأساسية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testTypes.map((test, index) => {
              const status = getTestStatus(test.id);
              const result = testResults[test.id];
              
              return (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${test.color}`}>
                        <test.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-inherit">{test.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          {getStatusIcon(status)}
                          <span className="text-sm text-gray-300">{getStatusText(status)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {result && (
                    <div className="mb-4 p-3 bg-black/20 rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">النتيجة:</span>
                        <span className="text-white font-bold">{result.percentage}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">الوقت المستغرق:</span>
                        <span className="text-white">{Math.floor(result.timeSpent / 60)}:{(result.timeSpent % 60).toString().padStart(2, '0')}</span>
                      </div>
                    </div>
                  )}
                  
                  <Button
                    onClick={() => onStartTest(test.id)}
                    className={`w-full bg-gradient-to-r ${test.color} hover:opacity-90 text-white font-bold`}
                  >
                    {status === 'not-started' ? 'بدء الاختبار' : 'إعادة الاختبار'}
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Daily Tests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-inherit mb-6">الاختبارات اليومية</h2>
          <div className="grid grid-cols-2 2xl:grid-cols-3 md:grid-cols-3 gap-3 text-2xl font-bold">
            {dailyTests.map((test, index) => {
              const status = getTestStatus(test.id);
              const result = testResults[test.id];
              
              return (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="text-center mb-3">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${test.color} mx-auto w-fit mb-2`}>
                      <test.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-inherit">{test.name}</h3>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      {getStatusIcon(status)}
                      <span className="text-xs text-gray-300">{getStatusText(status)}</span>
                    </div>
                  </div>
                  
                  {result && (
                    <div className="mb-3 p-2 bg-black/20 rounded text-center">
                      <div className="text-xs text-gray-300">النتيجة</div>
                      <div className="text-sm font-bold text-white">{result.percentage}%</div>
                    </div>
                  )}
                  
                  <Button
                    onClick={() => onStartTest(test.id)}
                    size="sm"
                    className={`w-full bg-gradient-to-r ${test.color} hover:opacity-90 text-white text-xs`}
                  >
                    {status === 'not-started' ? 'بدء' : 'إعادة'}
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}