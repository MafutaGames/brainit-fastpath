import React, { useState } from 'react'
import { questions } from './questions'

interface Recommendation {
  title: string
  description: string
  url: string
  buttonText: string
}

function App() {
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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            BrainIT Automation — Fast Path
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Find your perfect automation solution in just a few questions
          </p>

          {!showRecommendation ? (
            <>
              {/* Industry Selection */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What type of business do you run?
                </label>
                <select
                  value={selectedIndustry}
                  onChange={(e) => handleIndustryChange(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Quick Assessment for {selectedIndustry}
                  </h2>
                  <div className="space-y-4">
                    {currentQuestions.map(question => (
                      <div key={question.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <div className="flex-1">
                            <p className="text-gray-900 font-medium">{question.text}</p>
                            {question.description && (
                              <p className="text-sm text-gray-600 mt-1">{question.description}</p>
                            )}
                          </div>
                          <div className="flex space-x-4">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name={question.id}
                                checked={answers[question.id] === true}
                                onChange={() => handleAnswerChange(question.id, true)}
                                className="mr-2 text-blue-600"
                              />
                              Yes
                            </label>
                            <label className="flex items-center">
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
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-blue-900 mb-3">
                  {recommendation.title}
                </h2>
                <p className="text-blue-800 mb-4">
                  {recommendation.description}
                </p>
                <div className="text-sm text-blue-700 mb-4">
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
                className="text-gray-600 hover:text-gray-800 font-medium"
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