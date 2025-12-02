import { useState } from 'react'

// Sample countries and languages - can be extended
const COUNTRIES = [
  { id: 'fr', name: 'France', flag: '🇫🇷', languages: [
    { id: 'fr', name: 'Français' },
    { id: 'en', name: 'English' }
  ]},
  { id: 'de', name: 'Germany', flag: '🇩🇪', languages: [
    { id: 'de', name: 'Deutsch' },
    { id: 'en', name: 'English' }
  ]},
  { id: 'es', name: 'Spain', flag: '🇪🇸', languages: [
    { id: 'es', name: 'Español' },
    { id: 'ca', name: 'Català' },
    { id: 'en', name: 'English' }
  ]},
  { id: 'it', name: 'Italy', flag: '🇮🇹', languages: [
    { id: 'it', name: 'Italiano' },
    { id: 'en', name: 'English' }
  ]},
  { id: 'uk', name: 'United Kingdom', flag: '🇬🇧', languages: [
    { id: 'en', name: 'English' }
  ]},
  { id: 'nl', name: 'Netherlands', flag: '🇳🇱', languages: [
    { id: 'nl', name: 'Nederlands' },
    { id: 'en', name: 'English' }
  ]},
  { id: 'be', name: 'Belgium', flag: '🇧🇪', languages: [
    { id: 'fr', name: 'Français' },
    { id: 'nl', name: 'Nederlands' },
    { id: 'en', name: 'English' }
  ]},
  { id: 'pt', name: 'Portugal', flag: '🇵🇹', languages: [
    { id: 'pt', name: 'Português' },
    { id: 'en', name: 'English' }
  ]},
  { id: 'pl', name: 'Poland', flag: '🇵🇱', languages: [
    { id: 'pl', name: 'Polski' },
    { id: 'en', name: 'English' }
  ]},
  { id: 'cz', name: 'Czech Republic', flag: '🇨🇿', languages: [
    { id: 'cs', name: 'Čeština' },
    { id: 'en', name: 'English' }
  ]},
  { id: 'hu', name: 'Hungary', flag: '🇭🇺', languages: [
    { id: 'hu', name: 'Magyar' },
    { id: 'en', name: 'English' }
  ]},
  { id: 'ro', name: 'Romania', flag: '🇷🇴', languages: [
    { id: 'ro', name: 'Română' },
    { id: 'en', name: 'English' }
  ]},
]

function CountryLanguageSelector({ onSelect }) {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCountries = COUNTRIES.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCountryClick = (country) => {
    setSelectedCountry(country)
  }

  const handleLanguageClick = (language) => {
    if (selectedCountry) {
      onSelect(selectedCountry, language)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to Consumer Care Portal
          </h2>
          <p className="text-gray-600">
            Select your country and language to access after-sales support content
          </p>
        </div>

        {!selectedCountry ? (
          <>
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search for your country..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Country Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredCountries.map((country) => (
                <button
                  key={country.id}
                  onClick={() => handleCountryClick(country)}
                  className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 group"
                >
                  <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                    {country.flag}
                  </span>
                  <span className="text-sm font-medium text-gray-900 text-center">
                    {country.name}
                  </span>
                </button>
              ))}
            </div>

            {filteredCountries.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No countries found matching "{searchTerm}"</p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Language Selection */}
            <div className="mb-6">
              <button
                onClick={() => setSelectedCountry(null)}
                className="flex items-center text-primary-600 hover:text-primary-700 mb-4"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to countries
              </button>
            </div>

            <div className="text-center mb-6">
              <span className="text-5xl">{selectedCountry.flag}</span>
              <h3 className="text-xl font-bold text-gray-900 mt-2">{selectedCountry.name}</h3>
              <p className="text-gray-600 mt-1">Select your preferred language</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
              {selectedCountry.languages.map((language) => (
                <button
                  key={language.id}
                  onClick={() => handleLanguageClick(language)}
                  className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 group"
                >
                  <span className="text-base font-medium text-gray-900">
                    {language.name}
                  </span>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CountryLanguageSelector
