import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GraduationCap, BookOpen, Trophy } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export default function LoginScreen({ onLogin }) {
  const [nationalId, setNationalId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nationalId.trim()) {
      onLogin(nationalId.trim());
      toast({
        title: "مرحباً بك!",
        description: "تم تسجيل الدخول بنجاح",
      });
    } else {
      toast({
        title: "خطأ",
        description: "يرجى إدخال  الاسم",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="text-center mb-8"
          >
            <div className="flex justify-center items-center gap-2 mb-4">
              <GraduationCap className="w-12 h-12 text-cyan-400" />
              <BookOpen className="w-10 h-10 text-blue-400" />
              <Trophy className="w-12 h-12 text-green-400" />
            </div>
            <h1 className="text-3xl font-bold text-inherit mb-2">
              محاكي تدريبات الترقي
            </h1>
            <p className="text-blue-200 text-lg">للمعلمين 2025</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="block text-inherit text-sm font-medium mb-2">
الاسم              </label>
              <Input
                type="text"
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value)}
                placeholder="أدخل  الاسم"
                className="w-full bg-white/20 border-white/30 text-white placeholder-white/60 focus:border-cyan-400 focus:ring-cyan-400"
                dir="rtl"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              دخول
            </Button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 text-center"
          >
            <p className="text-inherit/70 text-sm">
              استعد لاختبارات الترقي بثقة وتميز
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}