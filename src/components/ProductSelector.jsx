import { useState } from 'react'

// Sample product categories and products - can be extended
const PRODUCT_CATEGORIES = [
  {
    id: 'coffee',
    name: 'Coffee Makers',
    icon: '☕',
    products: [
      { id: 'krups-sensation', name: 'Krups Sensation', brand: 'Krups' },
      { id: 'krups-essential', name: 'Krups Essential', brand: 'Krups' },
      { id: 'tefal-express', name: 'Tefal Express', brand: 'Tefal' },
    ]
  },
  {
    id: 'kitchen',
    name: 'Kitchen Appliances',
    icon: '🍳',
    products: [
      { id: 'tefal-actifry', name: 'Tefal ActiFry', brand: 'Tefal' },
      { id: 'moulinex-companion', name: 'Moulinex i-Companion', brand: 'Moulinex' },
      { id: 'krups-prep-cook', name: 'Krups Prep&Cook', brand: 'Krups' },
    ]
  },
  {
    id: 'home',
    name: 'Home & Cleaning',
    icon: '🏠',
    products: [
      { id: 'rowenta-silence', name: 'Rowenta Silence Force', brand: 'Rowenta' },
      { id: 'tefal-iron', name: 'Tefal Ultimate Pure', brand: 'Tefal' },
      { id: 'rowenta-steam', name: 'Rowenta Steam Power', brand: 'Rowenta' },
    ]
  },
  {
    id: 'food-prep',
    name: 'Food Preparation',
    icon: '🔪',
    products: [
      { id: 'tefal-blender', name: 'Tefal Blendforce', brand: 'Tefal' },
      { id: 'moulinex-fresh', name: 'Moulinex Fresh Express', brand: 'Moulinex' },
      { id: 'krups-handmixer', name: 'Krups Hand Mixer', brand: 'Krups' },
    ]
  },
  {
    id: 'accessories',
    name: 'Accessories & Parts',
    icon: '🔧',
    products: [
      { id: 'filters', name: 'Water Filters', brand: 'Universal' },
      { id: 'descalers', name: 'Descaling Solutions', brand: 'Universal' },
      { id: 'spares', name: 'Spare Parts', brand: 'Universal' },
    ]
  },
]

function ProductSelector({ country, language, onSelect, onBack }) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCategories = PRODUCT_CATEGORIES.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.products.some(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const handleProductClick = (product) => {
    onSelect({
      ...product,
      category: selectedCategory
    })
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-primary-600 hover:text-primary-700"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Change country/language
          </button>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium">{country.name}</span>
            <span>•</span>
            <span>{language.name}</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {selectedCategory ? selectedCategory.name : 'Select Your Product'}
          </h2>
          <p className="text-gray-600">
            {selectedCategory
              ? 'Choose a specific product to view support content'
              : 'Choose a product category to get started'
            }
          </p>
        </div>

        {!selectedCategory ? (
          <>
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-md mx-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search products or categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category)}
                  className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 group"
                >
                  <span className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                    {category.icon}
                  </span>
                  <span className="text-base font-semibold text-gray-900 text-center mb-2">
                    {category.name}
                  </span>
                  <span className="text-sm text-gray-500 text-center">
                    {category.products.length} products
                  </span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Product List */}
            <div className="mb-6">
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center text-primary-600 hover:text-primary-700"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to categories
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedCategory.products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 group text-left"
                >
                  <div>
                    <div className="text-base font-semibold text-gray-900">
                      {product.name}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {product.brand}
                    </div>
                  </div>
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Quick Links */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">Guides & Manuals</div>
              <div className="text-xs text-gray-500">User documentation</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">Repair Services</div>
              <div className="text-xs text-gray-500">Get help fixing</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">Spare Parts</div>
              <div className="text-xs text-gray-500">Order replacement parts</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductSelector
