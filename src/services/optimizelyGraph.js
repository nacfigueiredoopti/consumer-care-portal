/**
 * Optimizely Graph Service
 *
 * This service provides methods to query content from Optimizely Graph using GraphQL.
 *
 * Documentation: https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/retrieve-content-using-optimizely-graph
 */

const GRAPH_ENDPOINT = import.meta.env.VITE_OPTIMIZELY_GRAPH_URL || 'https://cg.optimizely.com/content/v2'
const SINGLE_KEY = import.meta.env.VITE_OPTIMIZELY_SINGLE_KEY || ''

/**
 * Execute a GraphQL query against Optimizely Graph
 * @param {string} query - GraphQL query string
 * @param {object} variables - Query variables
 * @returns {Promise<object>} Query result
 */
export async function executeGraphQLQuery(query, variables = {}) {
  const url = `${GRAPH_ENDPOINT}?auth=${SINGLE_KEY}`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables
      })
    })

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.statusText}`)
    }

    const result = await response.json()

    if (result.errors) {
      console.error('GraphQL errors:', result.errors)
      throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`)
    }

    return result.data
  } catch (error) {
    console.error('Optimizely Graph query error:', error)
    throw error
  }
}

/**
 * Get consumer care content for a specific product and language
 * @param {string} productId - Product identifier
 * @param {string} language - Language code (e.g., 'en', 'fr', 'de')
 * @returns {Promise<object>} Content object with guides, repairs, faqs, parts
 */
export async function getConsumerCareContent(productId, language) {
  const query = `
    query GetConsumerCareContent($productId: String!, $language: String!) {
      ConsumerCareContent(
        where: {
          _and: [
            { ProductId: { eq: $productId } }
            { Language: { Name: { eq: $language } } }
          ]
        }
      ) {
        total
        items {
          ContentLink {
            Id
          }
          Name
          Language {
            Name
          }
          ProductId
          ProductName
          ProductBrand
          Guides {
            Title
            Description
            Type
            FileUrl
            Icon
          }
          Repairs {
            Title
            Description
            Difficulty
            EstimatedTime
          }
          FAQs {
            Question
            Answer
          }
          SpareParts {
            Name
            PartNumber
            Price
            Currency
            Availability
          }
        }
      }
    }
  `

  const variables = {
    productId,
    language
  }

  const data = await executeGraphQLQuery(query, variables)

  if (data.ConsumerCareContent && data.ConsumerCareContent.items.length > 0) {
    return data.ConsumerCareContent.items[0]
  }

  return null
}

/**
 * Get all products by category
 * @param {string} categoryId - Category identifier
 * @param {string} language - Language code
 * @returns {Promise<Array>} Array of products
 */
export async function getProductsByCategory(categoryId, language) {
  const query = `
    query GetProductsByCategory($categoryId: String!, $language: String!) {
      Product(
        where: {
          _and: [
            { CategoryId: { eq: $categoryId } }
            { Language: { Name: { eq: $language } } }
            { Status: { eq: "Published" } }
          ]
        }
        orderBy: { Name: ASC }
      ) {
        total
        items {
          ContentLink {
            Id
          }
          Name
          Brand
          CategoryId
          ProductImage {
            Url
          }
          Description
        }
      }
    }
  `

  const variables = {
    categoryId,
    language
  }

  const data = await executeGraphQLQuery(query, variables)
  return data.Product?.items || []
}

/**
 * Get product categories
 * @param {string} language - Language code
 * @returns {Promise<Array>} Array of categories
 */
export async function getProductCategories(language) {
  const query = `
    query GetProductCategories($language: String!) {
      ProductCategory(
        where: {
          Language: { Name: { eq: $language } }
        }
        orderBy: { SortOrder: ASC }
      ) {
        total
        items {
          ContentLink {
            Id
          }
          Name
          Icon
          Description
          ProductCount
        }
      }
    }
  `

  const variables = { language }

  const data = await executeGraphQLQuery(query, variables)
  return data.ProductCategory?.items || []
}

/**
 * Search content across all types
 * @param {string} searchTerm - Search term
 * @param {string} language - Language code
 * @returns {Promise<object>} Search results
 */
export async function searchContent(searchTerm, language) {
  const query = `
    query SearchContent($searchTerm: String!, $language: String!) {
      Content(
        where: {
          _and: [
            {
              _or: [
                { Name: { contains: $searchTerm } }
                { Description: { contains: $searchTerm } }
              ]
            }
            { Language: { Name: { eq: $language } } }
          ]
        }
        limit: 20
      ) {
        total
        items {
          ContentLink {
            Id
          }
          Name
          ContentType
          Language {
            Name
          }
        }
      }
    }
  `

  const variables = {
    searchTerm,
    language
  }

  const data = await executeGraphQLQuery(query, variables)
  return data.Content || { total: 0, items: [] }
}

/**
 * Get available languages for the site
 * @returns {Promise<Array>} Array of language objects
 */
export async function getAvailableLanguages() {
  const query = `
    query GetAvailableLanguages {
      _Languages {
        Name
        DisplayName
      }
    }
  `

  const data = await executeGraphQLQuery(query)
  return data._Languages || []
}

/**
 * Check if Optimizely Graph is configured
 * @returns {boolean}
 */
export function isOptimizelyGraphConfigured() {
  return Boolean(SINGLE_KEY && GRAPH_ENDPOINT)
}

export default {
  executeGraphQLQuery,
  getConsumerCareContent,
  getProductsByCategory,
  getProductCategories,
  searchContent,
  getAvailableLanguages,
  isOptimizelyGraphConfigured
}
