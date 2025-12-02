# Consumer Care Portal - Model B

Central multilingual consumer care platform for Groupe Seb markets without dedicated websites.

## Overview

This is the **Model B** implementation for **Use Case 2: Consumer Care**. It provides a central web platform where consumers can:

1. ✅ Select their country and language
2. ✅ Choose their product (appliances from Krups, Tefal, Moulinex, Rowenta, etc.)
3. ✅ Access comprehensive after-sales support content:
   - User guides and manuals
   - Repair and service information
   - FAQs
   - Spare parts catalog

## 🎯 Current Status

- ✅ **Frontend**: Fully functional with sample data
- ✅ **UI/UX**: Complete responsive design
- ✅ **Optimizely Graph Integration**: Service layer implemented
- ⏳ **CMS Content**: Requires Optimizely CMS content types setup

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **CMS**: Optimizely CMS SaaS + Optimizely Graph (GraphQL)
- **Translation** (planned): DeepL or Google Translate API

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Optimizely CMS SaaS instance
- Optimizely Graph Single Key (for CMS integration)

### Installation

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your Optimizely credentials
# VITE_OPTIMIZELY_GRAPH_URL=https://cg.optimizely.com/content/v2
# VITE_OPTIMIZELY_SINGLE_KEY=your_single_key_here

# Start development server
npm run dev
```

### Development Server

The app is now running at: **http://localhost:5175/**

## Project Structure

```
src/
├── components/
│   ├── CountryLanguageSelector.jsx  # Country & language selection
│   ├── ProductSelector.jsx           # Product catalog & selection
│   └── ContentDisplay.jsx            # Content display with tabs
├── services/
│   └── optimizelyGraph.js            # Optimizely Graph API service
├── App.jsx                           # Main app component
├── App.css                          # App-specific styles
├── index.css                        # Global styles with Tailwind
└── main.jsx                         # Entry point
```

## 🔗 Optimizely Graph Integration

### Authentication

The application uses **Single Key Authentication** for querying Optimizely Graph:

```javascript
import { getConsumerCareContent } from './services/optimizelyGraph'

// Fetch content for a product in a specific language
const content = await getConsumerCareContent('krups-sensation', 'fr')
```

### GraphQL Endpoint

```
https://cg.optimizely.com/content/v2?auth={singlekey}
```

### Available Queries

The service provides these methods:

- `getConsumerCareContent(productId, language)` - Get all content for a product
- `getProductsByCategory(categoryId, language)` - Get products by category
- `getProductCategories(language)` - Get all categories
- `searchContent(searchTerm, language)` - Search across all content
- `getAvailableLanguages()` - Get configured languages

## 📋 Required Optimizely CMS Content Types

To use this application with live data, create these content types in Optimizely CMS:

### 1. ConsumerCareContent

Main content type that aggregates all consumer care data for a product.

**Properties:**
- `ProductId` (String) - Product identifier
- `ProductName` (String) - Product display name
- `ProductBrand` (String) - Brand (Krups, Tefal, etc.)
- `Language` (ContentReference) - Language reference
- `Guides` (ContentArea) - Product guides and manuals
- `Repairs` (ContentArea) - Repair guides
- `FAQs` (ContentArea) - Frequently asked questions
- `SpareParts` (ContentArea) - Available spare parts

### 2. ProductGuide

Individual guide or manual.

**Properties:**
- `Title` (String)
- `Description` (XhtmlString)
- `Type` (String) - PDF, Video, Link
- `FileUrl` (Url)
- `Icon` (String) - Emoji or icon identifier

### 3. RepairGuide

Repair information and guides.

**Properties:**
- `Title` (String)
- `Description` (XhtmlString)
- `Difficulty` (String) - Easy, Medium, Hard
- `EstimatedTime` (String) - Time estimate

### 4. FAQ

Frequently asked question.

**Properties:**
- `Question` (String)
- `Answer` (XhtmlString)

### 5. SparePart

Spare part listing.

**Properties:**
- `Name` (String)
- `PartNumber` (String)
- `Price` (Decimal)
- `Currency` (String)
- `Availability` (String) - In stock, Ships in X days, etc.

### 6. ProductCategory

Product category grouping.

**Properties:**
- `Name` (String)
- `Icon` (String)
- `Description` (String)
- `ProductCount` (Integer)
- `SortOrder` (Integer)

### 7. Product

Individual product.

**Properties:**
- `Name` (String)
- `Brand` (String)
- `CategoryId` (String)
- `ProductImage` (ContentReference)
- `Description` (XhtmlString)
- `Status` (String) - Published, Draft

## 🌍 Model A: Master Content Distribution

### How It Works

1. **Central Team Creates Master Content**
   - Create content in one language (e.g., French)
   - Mark as "Master Content"

2. **Automatic Translation & Publication**
   - Opal agent triggers translation via DeepL/Google Translate
   - Creates language variants in Optimizely CMS
   - Publishes to all configured markets

3. **Market Review & Refinement**
   - Market teams receive notifications
   - Can review and refine translations
   - Cannot delete or restructure content

4. **Smart Content Updates**
   - When master content is updated, only updated blocks sync
   - Market customizations (translations) are preserved
   - No overwriting of market-level edits

### Required Opal Agents (Next Phase)

1. **Content Publisher Agent**
   ```
   Triggers: Manual or on master content publish
   Actions:
   - Detect new/updated master content
   - Trigger translation for all languages
   - Create content variants in CMS
   - Publish to all markets
   - Notify market teams
   ```

2. **Translation Agent**
   ```
   Triggers: Content Publisher Agent
   Actions:
   - Call DeepL API for translations
   - Create language variants
   - Maintain translation memory
   ```

3. **Market Notification Agent**
   ```
   Triggers: Content published
   Actions:
   - Send emails to market teams
   - Create review tasks
   - Track review status
   ```

4. **Content Sync Agent**
   ```
   Triggers: Master content updated
   Actions:
   - Identify changed blocks
   - Sync only updated content
   - Preserve market customizations
   - Smart merge logic
   ```

## Environment Variables

Create a `.env` file in the root directory:

```env
# Optimizely Graph Configuration
VITE_OPTIMIZELY_GRAPH_URL=https://cg.optimizely.com/content/v2
VITE_OPTIMIZELY_SINGLE_KEY=your_single_key_here

# Optional: For translation automation (Model A)
VITE_DEEPL_API_KEY=your_deepl_api_key
VITE_GOOGLE_TRANSLATE_KEY=your_google_key

# Optional: Opal Tools URL (for Model A agents)
VITE_OPAL_TOOLS_URL=https://your-netlify-site.netlify.app
```

## Deployment

### Option 1: Netlify

```bash
# Build the application
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=dist

# Set environment variables in Netlify dashboard
```

### Option 2: Vercel

```bash
# Build the application
npm run build

# Deploy to Vercel
vercel --prod

# Set environment variables in Vercel dashboard
```

### Option 3: Optimizely DXP

Host within Optimizely infrastructure for integrated experience with the CMS.

## Testing the Application

### With Sample Data (Current)

1. Start dev server: `npm run dev`
2. Navigate through:
   - Select country → Select language
   - Choose product category → Select product
   - Browse guides, repairs, FAQs, spare parts

### With Optimizely CMS (After Setup)

1. Create content types in Optimizely CMS
2. Add sample products and content
3. Configure environment variables
4. Application will fetch live data from Graph

## Use Cases

### ✅ Model B: Central Portal (Implemented)

Consumers from markets without websites can:
- Access all after-sales content in their language
- Find repair guides and manuals
- Order spare parts
- Get support contact information

### 🔄 Model A: Master Content Distribution (Planned)

Central Consumer Care team can:
- Create content once in master language
- Automatically publish to all markets with translations
- Update content blocks without overwriting market customizations
- Track translation review status across markets

## Features

### Current Features

- ✅ Country & Language Selection (12 countries, multiple languages each)
- ✅ Product Categories & Products (Groupe Seb brands)
- ✅ Content Display:
  - 📚 Guides & Manuals
  - 🔧 Repair & Service
  - ❓ FAQs
  - 🛒 Spare Parts
- ✅ Responsive Design
- ✅ Optimizely Graph Integration (service layer)

### Planned Features

- 🔄 Live CMS content integration
- 🔄 Automatic translation workflow
- 🔄 Market notification system
- 🔄 Content versioning & sync
- 🔄 Smart merge for content updates
- 🔄 Translation review dashboard

## GraphQL Query Examples

### Get Consumer Care Content

```graphql
query GetConsumerCareContent($productId: String!, $language: String!) {
  ConsumerCareContent(
    where: {
      _and: [
        { ProductId: { eq: $productId } }
        { Language: { Name: { eq: $language } } }
      ]
    }
  ) {
    items {
      Name
      ProductName
      ProductBrand
      Guides {
        Title
        Description
        FileUrl
      }
      Repairs {
        Title
        Difficulty
      }
      FAQs {
        Question
        Answer
      }
    }
  }
}
```

### Get Products by Category

```graphql
query GetProductsByCategory($categoryId: String!, $language: String!) {
  Product(
    where: {
      _and: [
        { CategoryId: { eq: $categoryId } }
        { Language: { Name: { eq: $language } } }
        { Status: { eq: "Published" } }
      ]
    }
  ) {
    items {
      Name
      Brand
      Description
    }
  }
}
```

## API Documentation

See [Optimizely Graph Documentation](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/retrieve-content-using-optimizely-graph) for full GraphQL API reference.

## Support

For questions about this implementation:
- Technical: Contact the Optimizely implementation team
- Content: Contact the Central Consumer Care team

## License

© 2025 Groupe Seb. All rights reserved.

---

**Project Status**: ✅ Demo Ready | 🔄 CMS Setup Required | 📋 Model A Pending
