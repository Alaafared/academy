import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, CheckCircle, XCircle, ChevronsRight } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { getTestQuestions } from '@/data/questions';

export default function TestScreen({ testType, onTestComplete, onBack }) {
  const [questions] = useState(getTestQuestions(testType));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5400); // 60 minutes
  const [startTime] = useState(Date.now());
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTestComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTestComplete]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(prev => prev + 1);
      toast({
        title: "إجابة صحيحة! 🎉",
        // description: "أحسنت!",
      });
    } else {
      toast({
        title: "إجابة خاطئة ❌",
        // description: "حاول مرة أخرى في المرات القادمة",
        variant: "destructive"
      });
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      handleTestComplete();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setIsCorrect(false);
    }
  };

  const handleTestComplete = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    onTestComplete(testType, score, questions.length, timeSpent);
  };

  const getTestTitle = (type) => {
    if (type === 'pre-test') return 'الاختبار القبلي';
    if (type === 'post-test') return 'الاختبار البعدي';
    if (type.startsWith('day-')) {
      const dayNum = type.split('-')[1];
      return `اختبار اليوم ${dayNum}`;
    }
    return 'اختبار';
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 mb-8 border border-white/20"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-right">
              <h1 className="text-xl sm:text-2xl font-bold text-inherit mb-2">
                {getTestTitle(testType)}
              </h1>
              <p className="text-inherit/80">
                السؤال {currentQuestionIndex + 1} من {questions.length}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-black/20 rounded-lg px-4 py-2">
                <Clock className="w-5 h-5 text-cyan-400" />
                <span className="text-inherit font-bold">{formatTime(timeLeft)}</span>
              </div>
              <Button
                onClick={onBack}
                variant="outline"
                className="border-white/30 text-inherit hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 ml-2" />
                <span className="hidden sm:inline">العودة</span>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-white/10 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-green-400 to-blue-500"
            />
          </div>
          <p className="text-center text-inherit/70 text-sm mt-2">
            التقدم: {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
          </p>
        </motion.div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/20"
          >
            <h2 className="text-xl font-bold text-inherit mb-8 leading-relaxed">
              {currentQuestion.question}
            </h2>

            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => {
                let buttonClass = "w-full p-4 text-right rounded-xl border-2 transition-all duration-300 ";
                
                if (showFeedback) {
                  if (index === currentQuestion.correctAnswer) {
                    buttonClass += "bg-green-500/20 border-green-400 text-green-100";
                  } else if (index === selectedAnswer && !isCorrect) {
                    buttonClass += "bg-red-500/20 border-red-400 text-red-100";
                  } else {
                    buttonClass += "bg-white/5 border-white/20 text-inherit/60";
                  }
                } else {
                  buttonClass += "bg-white/10 border-white/30 text-inherit hover:bg-white/20 hover:border-white/50 hover:scale-105";
                }

                return (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showFeedback}
                    className={buttonClass}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg">{option}</span>
                      <div className="flex items-center gap-2">
                        <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          {String.fromCharCode(65 + index)}
                        </span>
                        {showFeedback && index === currentQuestion.correctAnswer && (
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        )}
                        {showFeedback && index === selectedAnswer && !isCorrect && (
                          <XCircle className="w-6 h-6 text-red-400" />
                        )}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8 text-center"
              >
                <Button
                  onClick={handleNextQuestion}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold px-8 py-3"
                >
                  {isLastQuestion ? 'إنهاء الاختبار' : 'السؤال التالي'}
                  <ChevronsRight className="w-5 h-5 mr-2" />
                </Button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Score Display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 inline-block border border-white/20">
            <p className="text-inherit/70 text-sm">النتيجة الحالية</p>
            <p className="text-2xl font-bold text-inherit">
              {score} / {currentQuestionIndex + (showFeedback ? 1 : 0)}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
