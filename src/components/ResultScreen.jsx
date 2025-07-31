import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Trophy, BarChart3, ArrowLeft, Clock, Target, Award } from 'lucide-react';

export default function ResultScreen({ testType, result, onBackToDashboard, onViewSummary }) {
  const getTestTitle = (type) => {
    if (type === 'pre-test') return 'الاختبار القبلي';
    if (type === 'post-test') return 'الاختبار البعدي';
    if (type.startsWith('day-')) {
      const dayNum = type.split('-')[1];
      return `اختبار اليوم ${dayNum}`;
    }
    return 'اختبار';
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getGradeColor = (percentage) => {
    if (percentage >= 90) return 'from-green-400 to-emerald-500';
    if (percentage >= 80) return 'from-blue-400 to-cyan-500';
    if (percentage >= 70) return 'from-cyan-400 to-sky-500';
    if (percentage >= 50) return 'from-orange-400 to-red-500';
    return 'from-red-500 to-pink-500';
  };

  const getGradeText = (percentage) => {
    if (percentage >= 90) return 'ممتاز';
    if (percentage >= 80) return 'جيد جداً';
    if (percentage >= 70) return 'جيد';
    if (percentage >= 50) return 'مقبول';
    return 'ضعيف';
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-6"
          >
            {result.passed ? (
              <Trophy className="w-20 h-20 text-cyan-400 mx-auto" />
            ) : (
              <Target className="w-20 h-20 text-red-400 mx-auto" />
            )}
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-inherit mb-2"
          >
            {result.passed ? 'تهانينا! 🎉' : 'حاول مرة أخرى 💪'}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-blue-200"
          >
            نتيجة {getTestTitle(testType)}
          </motion.p>
        </motion.div>

        {/* Result Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 sm:p-8 mb-8 border border-white/20"
        >
          {/* Score Circle */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 150 }}
              className="relative inline-block"
            >
              <div className="w-40 h-40 mx-auto relative">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: result.percentage / 100 }}
                    transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
                    strokeDasharray="283"
                    strokeDashoffset="283"
                    style={{
                      strokeDasharray: 283,
                      strokeDashoffset: 283 - (283 * result.percentage) / 100,
                    }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-inherit">{result.percentage}%</div>
                    <div className="text-sm text-gray-300">{getGradeText(result.percentage)}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-6 text-center border border-white/20"
            >
              <Target className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-inherit mb-1">
                {result.score} / {result.totalQuestions}
              </div>
              <div className="text-blue-200 text-sm">الإجابات الصحيحة</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6 text-center border border-white/20"
            >
              <Clock className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-inherit mb-1">
                {formatTime(result.timeSpent)}
              </div>
              <div className="text-purple-200 text-sm">الوقت المستغرق</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className={`bg-gradient-to-r ${result.passed ? 'from-green-500/20 to-emerald-500/20' : 'from-red-500/20 to-pink-500/20'} rounded-xl p-6 text-center border border-white/20`}
            >
              <Award className={`w-8 h-8 ${result.passed ? 'text-green-400' : 'text-red-400'} mx-auto mb-3`} />
              <div className="text-2xl font-bold text-inherit mb-1">
                {result.passed ? 'نجح' : 'لم ينجح'}
              </div>
              <div className={`${result.passed ? 'text-green-200' : 'text-red-200'} text-sm`}>
                {/* الحد الأدنى: 50% */}
              </div>
            </motion.div>
          </div>

          {/* Feedback Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className={`p-6 rounded-xl border ${
              result.passed 
                ? 'bg-green-500/20 border-green-400/30' 
                : 'bg-red-500/20 border-red-400/30'
            }`}
          >
            <h3 className={`font-bold text-lg mb-2 ${
              result.passed ? 'text-green-200' : 'text-red-200'
            }`}>
              {result.passed ? 'أداء ممتاز!' : 'يمكنك تحسين أدائك'}
            </h3>
            <p className="text-inherit/90">
              {result.passed 
                ? 'لقد حققت نتيجة رائعة في هذا الاختبار. استمر في التميز!'
                : 'لا تقلق، يمكنك إعادة الاختبار مرة أخرى لتحسين نتيجتك. راجع المواد وحاول مرة أخرى.'
              }
            </p>
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={onBackToDashboard}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold px-8 py-3"
          >
            <ArrowLeft className="w-4 h-4 ml-2" />
            العودة للوحة التحكم
          </Button>
          
          <Button
            onClick={onViewSummary}
            variant="outline"
            className="border-white/30 text-inherit hover:bg-white/10 px-8 py-3"
          >
            <BarChart3 className="w-4 h-4 ml-2" />
            عرض ملخص الأداء
          </Button>
        </motion.div>
      </div>
    </div>
  );
}