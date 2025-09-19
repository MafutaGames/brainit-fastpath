import React, { useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { questions } from './questions'

interface Recommendation {
  title: string
  description: string
  url: string
  buttonText: string
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [selectedIndustry, setSelectedIndustry] = useState<string>('')
  const [answers, setAnswers] = useState<Record<string, boolean>>({})
  const [showRecommendation, setShowRecommendation] = useState(false)

  const industries = ['Boutique', 'Coffee Shop', 'Legal', 'Dental', 'Art Gallery']

  const handleIndustryChange = (industry: string) => {
    setSelectedIndustry(industry)
    setAnswers({})
    setShowRecommendation(false)
  }

  const handleAnswerChange = (questionId: string, answer: boolean) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const calculateScore = () => {
    if (!selectedIndustry) return 0
    
    const industryQuestions = questions[selectedIndustry] || []
    let score = 0
    
    industryQuestions.forEach(question => {
      if (answers[question.id]) {
        score += question.weight || 1
      }
    })
    
    return score
  }

  const getRecommendation = (score: number): Recommendation => {
    if (score <= 3) {
      return {
        title: "Start with a Free Prototype",
        description: "Let's explore your automation potential with a no-cost prototype to demonstrate value.",
        url: "https://brainitconsulting.com",
        buttonText: "Get Free Prototype"
      }
    } else if (score <= 6) {
      return {
        title: "Book a $50 Pro Work Session",
        description: "You're ready for a focused session to map out your automation strategy and quick wins.",
        url: "https://brainitconsulting.com/book-pro-work-session",
        buttonText: "Book Pro Session"
      }
    } else {
      return {
        title: "Basic AI Setup ($250)",
        description: "You have clear automation needs. Let's implement a comprehensive AI solution for your business.",
        url: "https://brainitconsulting.com/pricing",
        buttonText: "Get AI Setup"
      }
    }
  }

  const handleSubmit = () => {
    setShowRecommendation(true)
  }

  const handleReset = () => {
    setSelectedIndustry('')
    setAnswers({})
    setShowRecommendation(false)
  }

  const currentQuestions = selectedIndustry ? questions[selectedIndustry] || [] : []
  const score = calculateScore()
  const recommendation = getRecommendation(score)

  return (
    <div className={`min-h-screen py-8 px-4 transition-colors ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-10">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-3 rounded-full transition-colors ${
            isDarkMode 
              ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
              : 'bg-white text-gray-600 hover:bg-gray-100'
          } shadow-lg`}
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className={`rounded-lg shadow-lg p-8 transition-colors ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h1 className={`text-3xl font-bold mb-2 text-center transition-colors ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            BrainIT Automation — Fast Path
          </h1>
          <p className={`text-center mb-8 transition-colors ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Find your perfect automation solution in just a few questions
          </p>

          {!showRecommendation ? (
            <>
              {/* Industry Selection */}
              <div className="mb-8">
                <label className={`block text-sm font-medium mb-3 transition-colors ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  What type of business do you run?
                </label>
                <select
                  value={selectedIndustry}
                  onChange={(e) => handleIndustryChange(e.target.value)}
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">Select your industry...</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>

              {/* Questions */}
              {selectedIndustry && currentQuestions.length > 0 && (
                <div className="mb-8">
                  <h2 className={`text-xl font-semibold mb-4 transition-colors ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Quick Assessment for {selectedIndustry}
                  </h2>
                  <div className="space-y-4">
                    {currentQuestions.map(question => (
                      <div key={question.id} className={`p-4 border rounded-lg transition-colors ${
                        isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-white'
                      }`}>
                        <div className="flex items-start space-x-3">
                          <div className="flex-1">
                            <p className={`font-medium transition-colors ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>{question.text}</p>
                            {question.description && (
                              <p className={`text-sm mt-1 transition-colors ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                              }`}>{question.description}</p>
                            )}
                          </div>
                          <div className="flex space-x-4">
                            <label className={`flex items-center transition-colors ${
                              isDarkMode ? 'text-gray-200' : 'text-gray-700'
                            }`}>
                              <input
                                type="radio"
                                name={question.id}
                                checked={answers[question.id] === true}
                                onChange={() => handleAnswerChange(question.id, true)}
                                className="mr-2 text-blue-600"
                              />
                              Yes
                            </label>
                            <label className={`flex items-center transition-colors ${
                              isDarkMode ? 'text-gray-200' : 'text-gray-700'
                            }`}>
                              <input
                                type="radio"
                                name={question.id}
                                checked={answers[question.id] === false}
                                onChange={() => handleAnswerChange(question.id, false)}
                                className="mr-2 text-blue-600"
                              />
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {Object.keys(answers).length === currentQuestions.length && (
                    <div className="mt-6 text-center">
                      <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Get My Recommendation
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            /* Recommendation */
            <div className="text-center">
              <div className={`border rounded-lg p-6 mb-6 transition-colors ${
                isDarkMode 
                  ? 'bg-blue-900/20 border-blue-700' 
                  : 'bg-blue-50 border-blue-200'
              }`}>
                <h2 className={`text-2xl font-bold mb-3 transition-colors ${
                  isDarkMode ? 'text-blue-300' : 'text-blue-900'
                }`}>
                  {recommendation.title}
                </h2>
                <p className={`mb-4 transition-colors ${
                  isDarkMode ? 'text-blue-200' : 'text-blue-800'
                }`}>
                  {recommendation.description}
                </p>
                <div className={`text-sm mb-4 transition-colors ${
                  isDarkMode ? 'text-blue-300' : 'text-blue-700'
                }`}>
                  Your automation readiness score: <span className="font-bold">{score}</span>
                </div>
                <a
                  href={recommendation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  {recommendation.buttonText}
                </a>
              </div>
              
              <button
                onClick={handleReset}
                className={`font-medium transition-colors ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                ← Start Over
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App