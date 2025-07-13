import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import LoginScreen from '@/components/LoginScreen';
import Dashboard from '@/components/Dashboard';
import TestScreen from '@/components/TestScreen.jsx';
import ResultScreen from '@/components/ResultScreen.jsx';
import PerformanceSummary from '@/components/PerformanceSummary.jsx';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

const themes = {
  dark: 'theme-dark bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white',
  light: 'theme-light bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 text-gray-800',
};

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [userNationalId, setUserNationalId] = useState('');
  const [currentTest, setCurrentTest] = useState(null);
  const [testResults, setTestResults] = useState({});
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme') || 'dark';
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('app-theme', newTheme);
  };

  const handleLogin = (nationalId) => {
    setUserNationalId(nationalId);
    setCurrentScreen('dashboard');
  };

  const handleStartTest = (testType) => {
    setCurrentTest(testType);
    setCurrentScreen('test');
  };

  const handleTestComplete = (testType, score, totalQuestions, timeSpent) => {
    const result = {
      score,
      totalQuestions,
      percentage: Math.round((score / totalQuestions) * 100),
      passed: (score / totalQuestions) >= 0.5,
      timeSpent,
      completedAt: new Date().toISOString()
    };

    setTestResults(prev => ({
      ...prev,
      [testType]: result
    }));

    setCurrentScreen('result');
  };

  const handleBackToDashboard = () => {
    setCurrentTest(null);
    setCurrentScreen('dashboard');
  };

  const handleViewSummary = () => {
    setCurrentScreen('summary');
  };

  const handleLogout = () => {
    setUserNationalId('');
    setCurrentTest(null);
    setTestResults({});
    setCurrentScreen('login');
  };

  return (
    <>
      <Helmet>
        <title>محاكي تدريبات الترقي للمعلمين 2025</title>
        <meta name="description" content="برنامج محاكاة تفاعلي لمساعدة المعلمين على الاستعداد لاختبارات الترقي 2025" />
      </Helmet>
      
      <div className={`min-h-screen flex flex-col ${themes[theme]}`}>
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            {currentScreen === 'login' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
              >
                <LoginScreen onLogin={handleLogin} />
              </motion.div>
            )}

            {currentScreen === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
              >
                <Dashboard
                  userNationalId={userNationalId}
                  testResults={testResults}
                  onStartTest={handleStartTest}
                  onViewSummary={handleViewSummary}
                  onLogout={handleLogout}
                  toggleTheme={toggleTheme}
                  currentTheme={theme}
                />
              </motion.div>
            )}

            {currentScreen === 'test' && (
              <motion.div
                key="test"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <TestScreen
                  testType={currentTest}
                  onTestComplete={handleTestComplete}
                  onBack={handleBackToDashboard}
                />
              </motion.div>
            )}

            {currentScreen === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <ResultScreen
                  testType={currentTest}
                  result={testResults[currentTest]}
                  onBackToDashboard={handleBackToDashboard}
                  onViewSummary={handleViewSummary}
                />
              </motion.div>
            )}

            {currentScreen === 'summary' && (
              <motion.div
                key="summary"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <PerformanceSummary
                  testResults={testResults}
                  userNationalId={userNationalId}
                  onBackToDashboard={handleBackToDashboard}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        
        <Footer />
        <Toaster />
      </div>
    </>
  );
}

export default App;