import { useState } from 'react'
import CountryLanguageSelector from './components/CountryLanguageSelector'
import ProductSelector from './components/ProductSelector'
import ContentDisplay from './components/ContentDisplay'
import './App.css'

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedLanguage, setSelectedLanguage] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const handleCountryLanguageSelect = (country, language) => {
    setSelectedCountry(country)
    setSelectedLanguage(language)
    setSelectedProduct(null) // Reset product when country/language changes
  }

  const handleProductSelect = (product) => {
    setSelectedProduct(product)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Consumer Care Portal</h1>
              <p className="mt-1 text-sm text-gray-500">Groupe Seb - Global After-Sales Support</p>
            </div>
            {selectedCountry && selectedLanguage && (
              <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-lg">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
                <span className="text-sm font-medium text-primary-900">
                  {selectedCountry.name} - {selectedLanguage.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step 1: Country & Language Selection */}
        {!selectedCountry || !selectedLanguage ? (
          <div className="mb-8">
            <CountryLanguageSelector onSelect={handleCountryLanguageSelect} />
          </div>
        ) : (
          <>
            {/* Step 2: Product Selection */}
            {!selectedProduct ? (
              <div className="mb-8">
                <ProductSelector
                  country={selectedCountry}
                  language={selectedLanguage}
                  onSelect={handleProductSelect}
                  onBack={() => {
                    setSelectedCountry(null)
                    setSelectedLanguage(null)
                  }}
                />
              </div>
            ) : (
              /* Step 3: Content Display */
              <ContentDisplay
                country={selectedCountry}
                language={selectedLanguage}
                product={selectedProduct}
                onBack={() => setSelectedProduct(null)}
                onChangeCountry={() => {
                  setSelectedCountry(null)
                  setSelectedLanguage(null)
                  setSelectedProduct(null)
                }}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Groupe Seb. All rights reserved. | Consumer Care Central Platform
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
