import { useState, useEffect } from 'react'

// Sample content - in production this would come from Optimizely CMS
const SAMPLE_CONTENT = {
  guides: [
    {
      id: '1',
      title: 'Getting Started Guide',
      description: 'Learn how to set up and use your product for the first time',
      type: 'pdf',
      url: '#',
      icon: '📄'
    },
    {
      id: '2',
      title: 'User Manual',
      description: 'Complete user manual with all features and specifications',
      type: 'pdf',
      url: '#',
      icon: '📖'
    },
    {
      id: '3',
      title: 'Quick Start Video',
      description: 'Watch a 5-minute video on how to get started',
      type: 'video',
      url: '#',
      icon: '🎥'
    },
  ],
  repairs: [
    {
      id: '1',
      title: 'Self-Repair Guide',
      description: 'Step-by-step instructions for common repairs you can do yourself',
      difficulty: 'Easy',
      time: '15-30 min'
    },
    {
      id: '2',
      title: 'Find a Repair Center',
      description: 'Locate an authorized repair center near you',
      difficulty: 'N/A',
      time: 'N/A'
    },
    {
      id: '3',
      title: 'Request Repair Service',
      description: 'Schedule a repair with our service team',
      difficulty: 'N/A',
      time: '2-5 days'
    },
  ],
  faqs: [
    {
      id: '1',
      question: 'How do I descale my product?',
      answer: 'Regular descaling is recommended every 3 months. Use our descaling solution and follow the instructions in your user manual.'
    },
    {
      id: '2',
      question: 'What is the warranty period?',
      answer: 'Your product comes with a 2-year manufacturer warranty. Extended warranty options are available at purchase.'
    },
    {
      id: '3',
      question: 'Where can I buy spare parts?',
      answer: 'Spare parts are available through our official website, authorized retailers, and service centers.'
    },
    {
      id: '4',
      question: 'How do I register my product?',
      answer: 'You can register your product online through our website or mobile app using the serial number found on the product.'
    },
  ],
  parts: [
    {
      id: '1',
      name: 'Water Filter',
      partNumber: 'WF-2000',
      price: '€12.99',
      availability: 'In stock'
    },
    {
      id: '2',
      name: 'Descaling Solution (500ml)',
      partNumber: 'DS-500',
      price: '€8.99',
      availability: 'In stock'
    },
    {
      id: '3',
      name: 'Replacement Carafe',
      partNumber: 'RC-1000',
      price: '€24.99',
      availability: 'Ships in 3-5 days'
    },
  ]
}

function ContentDisplay({ country, language, product, onBack, onChangeCountry }) {
  const [activeTab, setActiveTab] = useState('guides')
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading content from API
    setTimeout(() => setIsLoading(false), 500)
  }, [product])

  const tabs = [
    { id: 'guides', name: 'Guides & Manuals', icon: '📚' },
    { id: 'repairs', name: 'Repair & Service', icon: '🔧' },
    { id: 'faqs', name: 'FAQs', icon: '❓' },
    { id: 'parts', name: 'Spare Parts', icon: '🛒' },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center text-primary-600 hover:text-primary-700"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to products
          </button>
          <button
            onClick={onChangeCountry}
            className="text-sm text-gray-600 hover:text-gray-700"
          >
            {country.flag} {country.name} - {language.name}
          </button>
        </div>

        <div className="flex items-start gap-6">
          <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-4xl">{product.category?.icon || '📦'}</span>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="font-medium">{product.brand}</span>
              <span>•</span>
              <span>{product.category?.name || 'Product'}</span>
            </div>
            <p className="mt-3 text-gray-600">
              Find all the support content you need for your {product.name}: user manuals, repair guides, spare parts, and more.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap
                  ${activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <span className="text-xl">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              <p className="mt-4 text-gray-600">Loading content...</p>
            </div>
          ) : (
            <>
              {/* Guides & Manuals */}
              {activeTab === 'guides' && (
                <div className="space-y-4">
                  {SAMPLE_CONTENT.guides.map((guide) => (
                    <a
                      key={guide.id}
                      href={guide.url}
                      className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all group"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-2xl">
                        {guide.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-primary-600">
                          {guide.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{guide.description}</p>
                      </div>
                      <svg className="w-6 h-6 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  ))}
                </div>
              )}

              {/* Repair & Service */}
              {activeTab === 'repairs' && (
                <div className="space-y-4">
                  {SAMPLE_CONTENT.repairs.map((repair) => (
                    <div
                      key={repair.id}
                      className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all group cursor-pointer"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-primary-600">
                          {repair.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{repair.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span>Difficulty: {repair.difficulty}</span>
                          <span>Time: {repair.time}</span>
                        </div>
                      </div>
                      <svg className="w-6 h-6 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  ))}
                </div>
              )}

              {/* FAQs */}
              {activeTab === 'faqs' && (
                <div className="space-y-3">
                  {SAMPLE_CONTENT.faqs.map((faq) => (
                    <div
                      key={faq.id}
                      className="border-2 border-gray-200 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-gray-900">{faq.question}</span>
                        <svg
                          className={`w-5 h-5 text-gray-400 transition-transform ${
                            expandedFaq === faq.id ? 'transform rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {expandedFaq === faq.id && (
                        <div className="px-4 pb-4 text-gray-600 bg-gray-50">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Spare Parts */}
              {activeTab === 'parts' && (
                <div className="space-y-4">
                  {SAMPLE_CONTENT.parts.map((part) => (
                    <div
                      key={part.id}
                      className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all group"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{part.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">Part #: {part.partNumber}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-lg font-bold text-primary-600">{part.price}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            part.availability === 'In stock'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {part.availability}
                          </span>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Support Contact Card */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow-md p-8 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">Need More Help?</h2>
          <p className="text-primary-100 mb-6">
            Our consumer care team is here to assist you with any questions or issues
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Support
            </button>
            <button className="px-6 py-3 bg-primary-700 text-white rounded-lg font-semibold hover:bg-primary-800 transition-colors flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentDisplay
