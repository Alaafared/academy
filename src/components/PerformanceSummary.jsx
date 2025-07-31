import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Trophy, 
  Target, 
  Clock, 
  TrendingUp,
  Calendar,
  BookOpen,
  Award
} from 'lucide-react';

export default function PerformanceSummary({ testResults, userNationalId, onBackToDashboard }) {
  const getTestTitle = (type) => {
    if (type === 'pre-test') return 'الاختبار القبلي';
    if (type === 'post-test') return 'الاختبار البعدي';
    if (type.startsWith('day-')) {
      const dayNum = type.split('-')[1];
      return `اليوم ${dayNum}`;
    }
    return type;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const completedTests = Object.keys(testResults).length;
  const passedTests = Object.values(testResults).filter(r => r.passed).length;
  const averageScore = completedTests > 0 
    ? Math.round(Object.values(testResults).reduce((sum, r) => sum + r.percentage, 0) / completedTests)
    : 0;
  const totalTimeSpent = Object.values(testResults).reduce((sum, r) => sum + r.timeSpent, 0);

  // Separate tests by type
  const mainTests = Object.entries(testResults).filter(([type]) => 
    type === 'pre-test' || type === 'post-test'
  );
  const dailyTests = Object.entries(testResults).filter(([type]) => 
    type.startsWith('day-')
  ).sort((a, b) => {
    const dayA = parseInt(a[0].split('-')[1]);
    const dayB = parseInt(b[0].split('-')[1]);
    return dayA - dayB;
  });

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
                ملخص الأداء
              </h1>
              <p className="text-inherit/80">
                الرقم القومي: {userNationalId}
              </p>
            </div>
            <Button
              onClick={onBackToDashboard}
              variant="outline"
              className="border-white/30 text-inherit hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 ml-2" />
              العودة
            </Button>
          </div>
        </motion.div>

        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8"
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
                <p className="text-purple-200 text-sm">متوسط النتيجة</p>
                <p className="text-3xl font-bold text-inherit">{averageScore}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-200 text-sm">إجمالي الوقت</p>
                <p className="text-3xl font-bold text-inherit">{formatTime(totalTimeSpent)}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-400" />
            </div>
          </div>
        </motion.div>

        {completedTests === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 text-center border border-white/20"
          >
            <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-inherit mb-2">لم تكمل أي اختبار بعد</h2>
            <p className="text-gray-300">ابدأ بإجراء الاختبارات لرؤية ملخص أدائك هنا</p>
          </motion.div>
        ) : (
          <>
            {/* Main Tests */}
            {mainTests.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold text-inherit mb-6 flex items-center gap-2">
                  <Award className="w-6 h-6 text-cyan-400" />
                  الاختبارات الأساسية
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mainTests.map(([testType, result], index) => (
                    <motion.div
                      key={testType}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-inherit">{getTestTitle(testType)}</h3>
                        <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                          result.passed ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                        }`}>
                          {result.passed ? 'نجح' : 'لم ينجح'}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-300">النتيجة:</span>
                          <span className="text-inherit font-bold">{result.percentage}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">الإجابات الصحيحة:</span>
                          <span className="text-inherit">{result.score} / {result.totalQuestions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">الوقت المستغرق:</span>
                          <span className="text-inherit">{formatTime(result.timeSpent)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">تاريخ الإكمال:</span>
                          <span className="text-inherit text-sm">{formatDate(result.completedAt)}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            result.passed ? 'bg-green-400' : 'bg-red-400'
                          }`}
                          style={{ width: `${result.percentage}%` }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Daily Tests */}
            {dailyTests.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-inherit mb-6 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-purple-400" />
                  الاختبارات اليومية
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {dailyTests.map(([testType, result], index) => (
                    <motion.div
                      key={testType}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold text-inherit">{getTestTitle(testType)}</h3>
                        <div className={`w-3 h-3 rounded-full ${
                          result.passed ? 'bg-green-400' : 'bg-red-400'
                        }`} />
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-300">النتيجة:</span>
                          <span className="text-inherit font-bold">{result.percentage}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">الوقت:</span>
                          <span className="text-inherit">{formatTime(result.timeSpent)}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 bg-gray-700 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            result.passed ? 'bg-green-400' : 'bg-red-400'
                          }`}
                          style={{ width: `${result.percentage}%` }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}