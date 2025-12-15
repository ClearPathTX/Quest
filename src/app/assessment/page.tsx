'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answers, setAnswers] = useState({
    seekingHelpFor: '',
    primaryIssue: '',
    duration: '',
    frequency: '',
    withdrawal: '',
    previousTreatment: '',
    environment: '',
    mentalHealth: [] as string[],
    insuranceType: '',
    insuranceProvider: '',
    insuranceCardImage: null as string | null,
    insuranceReceivedHow: '',
    recoveryReadiness: 5,
    dateOfBirth: '',
    urgency: '',
    fullName: '',
    phone: '',
    email: '',
    consentToContact: false,
  });

  type StepType = {
    type: string;
    headline?: string;
    subheadline?: string;
    question?: string;
    options?: string[];
    key?: string;
    placeholder?: string;
    accept?: string;
  };

  const steps: StepType[] = [
    {
      type: 'intro',
      headline: 'Free Confidential Assessment',
      subheadline: 'A few quick questions so we can understand your situation and guide you toward the right level of care.',
    },
    {
      type: 'single-choice',
      question: 'Who are you seeking help for?',
      options: ['Myself', 'A family member', 'A friend', 'Someone else'],
      key: 'seekingHelpFor',
    },
    {
      type: 'single-choice',
      question: 'What kind of support are you looking for?',
      options: ['Depression', 'Anxiety', 'PTSD/Trauma', 'Bipolar disorder', 'Schizophrenia', 'Dual diagnosis', 'Crisis support', 'Not sure yet'],
      key: 'primaryIssue',
    },
    {
      type: 'single-choice',
      question: 'When did you first start noticing this becoming a concern?',
      options: ['In the past thirty days', 'One to three months ago', 'Three to twelve months ago', 'Over a year ago'],
      key: 'duration',
    },
    {
      type: 'single-choice',
      question: 'How would you describe the current situation?',
      options: ['Symptoms are constant', 'Symptoms occur daily', 'Symptoms occur weekly', 'Occasional episodes', 'Currently stable'],
      key: 'frequency',
    },
    {
      type: 'single-choice',
      question: 'Are there any safety concerns?',
      options: ['Yes', 'No', 'Not sure'],
      key: 'withdrawal',
    },
    {
      type: 'single-choice',
      question: 'Has treatment been attempted before?',
      options: ['Yes', 'No', 'Not sure'],
      key: 'previousTreatment',
    },
    {
      type: 'single-choice',
      question: 'Is the current home or living situation safe and stable?',
      options: ['Yes', 'No', 'Not sure'],
      key: 'environment',
    },
    {
      type: 'multi-choice',
      question: 'Are there any additional concerns we should know about?',
      options: ['Anxiety', 'Depression', 'PTSD', 'Bipolar symptoms', 'Trauma related symptoms', 'Substance use', 'I am not sure', 'None'],
      key: 'mentalHealth',
    },
    {
      type: 'single-choice',
      question: 'What type of insurance do you have?',
      options: ['PPO', 'HMO', 'Medicaid', 'Medicare', 'No insurance', 'Not sure'],
      key: 'insuranceType',
    },
    {
      type: 'text-input',
      question: 'Who is your insurance provider?',
      key: 'insuranceProvider',
      placeholder: 'Enter your insurance provider',
    },
    {
      type: 'file-upload',
      question: 'Optional: Upload a photo of your insurance card',
      key: 'insuranceCardImage',
      accept: 'image/*',
    },
    {
      type: 'text-input',
      question: 'How do you receive your insurance?',
      key: 'insuranceReceivedHow',
      placeholder: 'e.g., Through employer, Individual plan, Government program',
    },
    {
      type: 'rating',
      question: 'How ready do you feel to start treatment?',
      key: 'recoveryReadiness',
    },
    {
      type: 'text-input',
      question: 'What is your date of birth?',
      key: 'dateOfBirth',
      placeholder: 'MM/DD/YYYY',
    },
    {
      type: 'single-choice',
      question: 'When are you hoping to get help?',
      options: ['Immediately', 'Within twenty four to forty eight hours', 'Within a week', 'Just gathering information'],
      key: 'urgency',
    },
    {
      type: 'contact-info',
      question: 'Where should we send your confidential assessment results?',
    },
    {
      type: 'final',
      headline: 'Thank you.',
      subheadline: 'Your confidential assessment has been submitted. Our team will reach out to you shortly.',
    },
  ];

  const handleAnswer = (key: string, value: string | boolean | number) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleMultiChoice = (key: string, value: string) => {
    setAnswers((prev) => {
      const currentArray = (prev[key as keyof typeof prev] as string[]) || [];
      const isSelected = currentArray.includes(value);
      return {
        ...prev,
        [key]: isSelected ? currentArray.filter((v) => v !== value) : [...currentArray, value],
      };
    });
  };

  const handleFileUpload = (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAnswers((prev) => ({
          ...prev,
          [key]: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit-assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
      });

      const result = await response.json();
      if (result.success) {
        handleNext();
      } else {
        alert('Error submitting assessment. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
      alert('Error submitting assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const step = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-light via-white to-primary/10 py-16 md:py-24 flex flex-col">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col">
        {/* Back to Home */}
        <Link href="/" className="text-primary hover:text-primary-dark font-semibold mb-8 inline-flex items-center gap-2">
          ← Back to Home
        </Link>

        {/* Progress Bar */}
        {currentStep > 0 && currentStep < steps.length - 1 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-3">
              <span className="text-base font-semibold text-gray-800">
                Step {currentStep} of {steps.length - 2}
              </span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-3">
              <div
                className="bg-primary h-3 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / (steps.length - 2)) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-16"
          >
            {step.type === 'intro' && (
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{step.headline}</h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">{step.subheadline}</p>
                <button
                  onClick={handleNext}
                  className="px-10 py-4 bg-primary text-white text-lg font-semibold rounded-xl hover:bg-primary-dark transition transform hover:scale-105"
                >
                  Start Assessment
                </button>
              </div>
            )}

            {step.type === 'single-choice' && step.options && step.key && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">{step.question}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                  {step.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(step.key as string, option)}
                      className={`p-4 rounded-xl border-2 font-semibold text-lg transition ${
                        (answers[step.key as keyof typeof answers] as string) === option
                          ? 'border-primary bg-accent-light text-primary'
                          : 'border-gray-300 bg-white text-gray-900 hover:border-primary'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleNext}
                  disabled={!(answers[step.key as keyof typeof answers] as string)}
                  className="w-full px-8 py-4 bg-primary text-white text-lg font-semibold rounded-xl hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                >
                  Continue <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {step.type === 'multi-choice' && step.options && step.key && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">{step.question}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                  {step.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleMultiChoice(step.key as string, option)}
                      className={`p-4 rounded-xl border-2 font-semibold text-lg transition ${
                        (answers[step.key as keyof typeof answers] as string[]).includes(option)
                          ? 'border-primary bg-accent-light text-primary'
                          : 'border-gray-300 bg-white text-gray-900 hover:border-primary'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleNext}
                  className="w-full px-8 py-4 bg-primary text-white text-lg font-semibold rounded-xl hover:bg-primary-dark transition flex items-center justify-center gap-2"
                >
                  Continue <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {step.type === 'text-input' && step.question && step.key && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">{step.question}</h2>
                <input
                  type="text"
                  placeholder={step.placeholder || ''}
                  value={(answers[step.key as keyof typeof answers] as string) || ''}
                  onChange={(e) => handleAnswer(step.key as string, e.target.value)}
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl mb-10 text-lg text-gray-900 focus:border-primary focus:outline-none placeholder:text-gray-500"
                />
                <button
                  onClick={handleNext}
                  disabled={!(answers[step.key as keyof typeof answers] as string)}
                  className="w-full px-8 py-4 bg-primary text-white text-lg font-semibold rounded-xl hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                >
                  Continue <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {step.type === 'file-upload' && step.question && step.key && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">{step.question}</h2>
                <div className="mb-10">
                  <label className="flex flex-col items-center justify-center w-full px-6 py-10 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-primary hover:bg-accent-light transition">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-12 h-12 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <p className="mb-2 text-lg font-semibold text-gray-900">Upload Insurance Card</p>
                      <p className="text-sm text-gray-600">Click to upload or take a photo</p>
                      {answers[step.key as keyof typeof answers] && (
                        <p className="mt-3 text-sm font-semibold text-primary">✓ Image uploaded</p>
                      )}
                    </div>
                    <input
                      type="file"
                      accept={step.accept || 'image/*'}
                      onChange={(e) => handleFileUpload(step.key as string, e)}
                      className="hidden"
                    />
                  </label>
                </div>
                <button
                  onClick={handleNext}
                  className="w-full px-8 py-4 bg-primary text-white text-lg font-semibold rounded-xl hover:bg-primary-dark transition flex items-center justify-center gap-2"
                >
                  Continue <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {step.type === 'rating' && step.question && step.key && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">{step.question}</h2>
                <div className="mb-10">
                  <div className="flex justify-between items-center gap-2 md:gap-3">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                      <button
                        key={value}
                        onClick={() => handleAnswer(step.key as string, value)}
                        className={`w-full py-3 rounded-xl font-semibold text-sm md:text-lg transition ${
                          (answers[step.key as keyof typeof answers] as number) === value
                            ? 'bg-primary text-white'
                            : 'border-2 border-gray-300 bg-white text-gray-900 hover:border-primary'
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-4">
                    <span>Not Ready</span>
                    <span>Completely Ready</span>
                  </div>
                </div>
                <button
                  onClick={handleNext}
                  className="w-full px-8 py-4 bg-primary text-white text-lg font-semibold rounded-xl hover:bg-primary-dark transition flex items-center justify-center gap-2"
                >
                  Continue <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {step.type === 'contact-info' && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">{step.question}</h2>
                <div className="space-y-4 mb-10">
                  <input
                    type="text"
                    placeholder="Full name"
                    value={answers.fullName}
                    onChange={(e) => handleAnswer('fullName', e.target.value)}
                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-primary focus:outline-none text-lg text-gray-900 placeholder:text-gray-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={answers.phone}
                    onChange={(e) => handleAnswer('phone', e.target.value)}
                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-primary focus:outline-none text-lg text-gray-900 placeholder:text-gray-500"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={answers.email}
                    onChange={(e) => handleAnswer('email', e.target.value)}
                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-primary focus:outline-none text-lg text-gray-900 placeholder:text-gray-500"
                  />
                  <label className="flex items-center gap-3 cursor-pointer p-2">
                    <input
                      type="checkbox"
                      checked={answers.consentToContact}
                      onChange={(e) => handleAnswer('consentToContact', e.target.checked)}
                      className="w-6 h-6 border-2 border-gray-300 rounded cursor-pointer accent-primary"
                    />
                    <span className="text-gray-700 text-lg">I consent to receive texts and calls</span>
                  </label>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={!answers.fullName || !answers.phone || !answers.email || isSubmitting}
                  className="w-full px-8 py-4 bg-primary text-white text-lg font-semibold rounded-xl hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Assessment'} <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {step.type === 'final' && (
              <div className="text-center">
                <div className="w-20 h-20 bg-accent-light rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{step.headline}</h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">{step.subheadline}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="tel:+18448884794"
                    className="px-10 py-4 bg-primary text-white text-lg font-semibold rounded-xl hover:bg-primary-dark transition transform hover:scale-105"
                  >
                    Call Now: (844) 888-4794
                  </a>
                  <Link
                    href="/"
                    className="px-10 py-4 border-2 border-primary text-primary text-lg font-semibold rounded-xl hover:bg-accent-light transition"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
