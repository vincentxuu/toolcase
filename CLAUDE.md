# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**toolcase** is a free online tools platform with 150+ tools for developers, designers, and general users. All tools run client-side (browser-only) to ensure user privacy. Built with Next.js 16 App Router, TypeScript, and Tailwind CSS 4, deployed on Cloudflare Pages.

## Core Development Commands

**Package Manager:** This project uses **pnpm**. Always use `pnpm` instead of `npm` or `yarn`.

```bash
# Development
pnpm dev                       # Start Next.js dev server on localhost:3000

# Building
pnpm build                     # Standard Next.js build
pnpm pages:build               # Build for Cloudflare Pages deployment
pnpm postbuild                 # Generate sitemap (runs after build)

# Quality
pnpm lint                      # Run ESLint
pnpm typecheck                 # Run TypeScript type check

# Development & Preview
pnpm preview                   # Build and run local preview with wrangler
pnpm pages:watch               # Build with watch mode for development

# Deployment
pnpm pages:deploy              # Deploy to Cloudflare Pages

# Package Management
pnpm install                   # Install dependencies
pnpm add <package>             # Add a new dependency
pnpm add -D <package>          # Add a dev dependency
```

## Architecture

### Routing Structure

The app uses Next.js App Router with **route groups** for i18n:

```
src/app/
├── (en)/              # English routes (default locale)
│   ├── layout.tsx     # English-specific layout
│   ├── page.tsx       # Homepage
│   └── [tool-slug]/   # Individual tool pages
│       └── page.tsx
├── zh-tw/             # Traditional Chinese routes
│   ├── layout.tsx     # Chinese-specific layout
│   ├── page.tsx       # Homepage
│   └── [tool-slug]/
│       └── page.tsx
└── layout.tsx         # Root layout (AdSense, global styles)
```

English is the default locale and uses a route group `(en)` to keep URLs clean (`/tool` not `/en/tool`).

### Tool Configuration System

All tools are centrally managed in `src/lib/tools-config.ts`:

```typescript
interface ToolConfig {
  slug: string          // URL slug: 'json-formatter'
  category: string      // Category: 'dev', 'finance', 'health', etc.
  nameKey: string       // i18n key for tool name
  descKey: string       // i18n key for description
  icon: string          // Lucide icon name
  isFeatured?: boolean  // Show in featured section
  isPopular?: boolean   // Show in popular section
  isNew?: boolean       // Show in new tools section
  tags?: string[]       // Search/filter tags
  priority?: number     // Display priority
}
```

This config drives:
- Homepage tool listings
- Category pages
- Search functionality
- Navigation menus
- SEO metadata

### i18n System

Translations are managed via dictionary files:

```
src/i18n/
├── config.ts          # Locale definitions and labels
├── get-dict.ts        # Dictionary accessor function
└── locales/
    ├── en.ts          # English translations
    └── zh-tw.ts       # Traditional Chinese translations
```

**Usage in server components:**
```typescript
import { getDictionary } from '@/i18n/get-dict'

const t = getDictionary('en')  // or 'zh-tw'
console.log(t.tool_json)  // "JSON Formatter"
```

**Usage in client components:**
Pass translations as props from parent server component or page.

### Component Organization

```
src/components/
├── tools/            # 150+ tool components (all use 'use client')
├── shared/           # Reusable UI: ToolCard, AdSlot, CopyButton, etc.
├── layout/           # Navbar, Footer
├── navigation/       # CategoryNav, etc.
├── sections/         # FeaturedToolsSection, PopularToolsSection, etc.
├── seo/              # WebsiteSchema, OrganizationSchema (JSON-LD)
└── ui/               # Generic UI components
```

All tool components **must use `'use client'`** directive because they:
- Manage interactive state
- Process data locally in browser
- Never send user data to server

### SEO Structure

Each tool page must define metadata:

```typescript
export const metadata: Metadata = {
  title: 'Tool Name - Description | toolcase',
  description: 'Detailed description for SEO...',
  keywords: ['keyword1', 'keyword2'],
  alternates: {
    canonical: 'https://toolcase.cc/tool-slug',
    languages: {
      en: 'https://toolcase.cc/tool-slug',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tool-slug',
    },
  },
}
```

Sitemap is auto-generated via `next-sitemap` after build.

## Adding a New Tool

Follow these steps in order:

### 1. Add tool configuration

Edit `src/lib/tools-config.ts`:

```typescript
export const tools: ToolConfig[] = [
  // ... existing tools
  {
    slug: 'my-new-tool',
    category: 'dev',  // or 'finance', 'health', 'text', etc.
    nameKey: 'tool_mynew',
    descKey: 'tool_mynew_desc',
    icon: 'wrench',  // Lucide icon name
  },
]
```

### 2. Add translations

Edit both `src/i18n/locales/en.ts` and `src/i18n/locales/zh-tw.ts`:

```typescript
// en.ts
tool_mynew: 'My New Tool',
tool_mynew_desc: 'Short description of what this tool does',

// zh-tw.ts
tool_mynew: '我的新工具',
tool_mynew_desc: '簡短說明此工具的功能',
```

### 3. Create tool component

Create `src/components/tools/MyNewTool.tsx`:

```typescript
'use client'

interface MyNewToolProps {
  labels?: {
    // Define any labels needed for i18n
    inputLabel: string
    buttonText: string
    // etc.
  }
}

export default function MyNewTool({ labels }: MyNewToolProps) {
  // Component implementation
  return (
    <div>
      {/* Tool UI */}
    </div>
  )
}
```

### 4. Create English page

Create `src/app/(en)/my-new-tool/page.tsx`:

```typescript
import { Metadata } from 'next'
import MyNewTool from '@/components/tools/MyNewTool'
import { getDictionary } from '@/i18n/get-dict'

export const metadata: Metadata = {
  title: 'My New Tool - Description | toolcase',
  description: 'Detailed SEO-friendly description...',
  keywords: ['keyword1', 'keyword2'],
  alternates: {
    canonical: 'https://toolcase.cc/my-new-tool',
    languages: {
      en: 'https://toolcase.cc/my-new-tool',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/my-new-tool',
    },
  },
}

export default function MyNewToolPage() {
  const t = getDictionary('en')

  return (
    <div className="tool-container">
      <h1 className="text-3xl font-bold mb-4">{t.tool_mynew}</h1>
      <p className="text-[var(--color-text-secondary)] mb-8">
        {t.tool_mynew_desc}
      </p>

      <MyNewTool
        labels={{
          inputLabel: 'Input',
          buttonText: 'Process',
        }}
      />
    </div>
  )
}
```

### 5. Create Chinese page

Create `src/app/zh-tw/my-new-tool/page.tsx` (similar to English but use `'zh-tw'` locale):

```typescript
export default function MyNewToolPage() {
  const t = getDictionary('zh-tw')
  // ... rest similar to English version
}
```

### 6. Rebuild and test

```bash
pnpm dev  # Test locally
pnpm pages:build  # Build for deployment
```

## Deployment

The project is configured for Cloudflare Pages deployment via `@cloudflare/next-on-pages`.

**Configuration:** `wrangler.toml`
- Production: `toolcase.cc`, `www.toolcase.cc`
- Preview: Automatic preview deployments on branches

**Environment Variables:**
Copy `.env.example` to `.env.local` and configure:
- `NEXT_PUBLIC_ADSENSE_CLIENT_ID` - Google AdSense publisher ID
- `NEXT_PUBLIC_AD_SLOT_*` - AdSense ad slot IDs

**Note:** Cloudflare Pages automatically builds and deploys on git push when connected via Cloudflare dashboard.

## CI/CD

The project uses GitHub Actions for automated deployment and quality checks.

### Workflows

#### 1. **Deploy to Cloudflare Pages** (`.github/workflows/deploy.yml`)

**Triggers:**
- Push to `main` branch → Production deployment
- Push to `develop` branch → Preview deployment
- Manual trigger via workflow_dispatch → Choose environment

**Jobs:**
- **quality-check**: Runs ESLint and TypeScript type checking
- **deploy**: Builds and deploys to Cloudflare Pages
  - Builds Next.js application with `@cloudflare/next-on-pages`
  - Deploys to Cloudflare Pages
  - Purges cache on production deployment

**Path Filtering:**
Only triggers on changes to:
- `src/**`
- `public/**`
- `package.json`, `pnpm-lock.yaml`
- `next.config.mjs`, `wrangler.toml`

**Required Secrets:**
- `CLOUDFLARE_API_TOKEN` - Cloudflare API token with Pages deployment permission
- `CLOUDFLARE_ACCOUNT_ID` - Cloudflare account ID
- `CLOUDFLARE_ZONE_ID` - Zone ID for cache purging

#### 2. **PR Preview Comment** (`.github/workflows/pr-preview.yml`)

Automatically adds a comment to PRs with deployment information and preview instructions.

#### 3. **Dependency & Security Check** (`.github/workflows/dependency-check.yml`)

**Triggers:**
- Schedule: Every Monday at 9:00 AM UTC
- Manual trigger

**Checks:**
- Outdated dependencies (`pnpm outdated`)
- Security vulnerabilities (`pnpm audit`)

### Manual Deployment

To manually deploy from local machine:

```bash
# Build for Cloudflare Pages
pnpm pages:build

# Deploy to Cloudflare Pages
pnpm pages:deploy

# Local preview
pnpm preview
```

**Note:** It's recommended to use the Cloudflare Pages dashboard or GitHub Actions for deployments. Manual deployment is mainly for testing.

### Deployment Flow

```
┌─────────────────┐
│   Git Push      │
└────────┬────────┘
         │
         ├─ main branch ──────> Production (toolcase.cc)
         ├─ develop branch ───> Preview
         └─ PR ──────────────> Quality checks only
                                (no deployment)
```

## Key Constraints

- **All tools must be client-side only** - Use `'use client'` directive
- **No server-side data processing** - Privacy-first architecture
- **TypeScript strict mode** - All new code should be typed
- **Responsive design** - All tools must work on mobile, tablet, desktop
- **Dark mode support** - Use CSS variables for colors to ensure proper theming
- **Tailwind CSS 4** - Use utility classes; no custom CSS unless necessary
- **i18n completeness** - Every tool needs English + Traditional Chinese
- **SEO metadata** - Every page needs proper metadata and alternates
- **Path alias** - Use `@/` for imports: `import { foo } from '@/lib/utils'`
- **Package manager** - Use `pnpm` for all dependency management

## Styling and Tailwind CSS

### Tailwind CSS 4 Configuration

This project uses **Tailwind CSS 4** with the new CSS-first approach:

- **No config file needed:** Tailwind 4 uses `@import "tailwindcss"` directly in CSS
- **Configuration:** `postcss.config.mjs` with `@tailwindcss/postcss` plugin
- **Global styles:** `src/styles/globals.css`

### CSS Custom Properties

Use CSS variables for theming (defined in `globals.css`):

```css
/* Light mode (default) */
--color-bg: #ffffff
--color-bg-secondary: #f8fafc
--color-text: #0f172a
--color-text-secondary: #64748b
--color-border: #e2e8f0
--color-primary: #2563eb
--color-primary-hover: #1d4ed8
--color-accent: #f59e0b
--color-success: #10b981
--color-error: #ef4444
--color-card: #ffffff

/* Dark mode - automatically applied via prefers-color-scheme or .dark class */
```

### Using Theme Colors in Components

**Preferred approach:** Use CSS variables for dynamic theming

```tsx
<div className="bg-[var(--color-bg)] text-[var(--color-text)]">
  <p className="text-[var(--color-text-secondary)]">Secondary text</p>
  <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]">
    Click me
  </button>
</div>
```

**Standard Tailwind utilities are also available:**

```tsx
<div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
  <h2 className="text-2xl font-bold">Title</h2>
</div>
```

### Responsive Design

Always use mobile-first responsive classes:

```tsx
<div className="w-full md:w-1/2 lg:w-1/3">
  <div className="p-4 md:p-6 lg:p-8">
    <h2 className="text-xl md:text-2xl lg:text-3xl">Responsive heading</h2>
  </div>
</div>
```

Breakpoints:
- `sm:` 640px
- `md:` 768px
- `lg:` 1024px
- `xl:` 1280px
- `2xl:` 1536px

### Common Class Patterns

**Cards:**
```tsx
<div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6">
  {/* Card content */}
</div>
```

**Buttons:**
```tsx
<button className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-hover)] transition-colors">
  Button text
</button>
```

**Inputs:**
```tsx
<input
  className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
/>
```

**Error states:**
```tsx
<p className="text-[var(--color-error)] text-sm mt-2">Error message</p>
```

**Success states:**
```tsx
<p className="text-[var(--color-success)] text-sm mt-2">Success message</p>
```

### Style Guidelines

1. **Prefer utility classes over custom CSS** - Use Tailwind utilities whenever possible
2. **Use CSS variables for colors** - Ensures proper dark mode support
3. **Mobile-first design** - Always test on mobile sizes first
4. **Consistent spacing** - Use Tailwind's spacing scale (4, 6, 8, etc.)
5. **Accessible colors** - Ensure sufficient contrast ratios
6. **Transitions for interactivity** - Add `transition-colors` or `transition-all` to interactive elements

### Dark Mode Support

The project supports three dark mode strategies:

1. **System preference** (default): `@media (prefers-color-scheme: dark)`
2. **Manual toggle**: `html.dark` class (managed by ThemeToggle component)
3. **Light mode override**: `html.light` class (overrides system preference)

When creating new components, ensure they work in both light and dark modes by:
- Using CSS variable colors
- Testing with system dark mode
- Testing with manual toggle

## Common Patterns

### Client-side file processing

```typescript
'use client'

const handleFileUpload = (file: File) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    const content = e.target?.result as string
    // Process content locally
  }
  reader.readAsText(file)
}
```

### Form state management

```typescript
const [input, setInput] = useState('')
const [output, setOutput] = useState('')
const [error, setError] = useState('')

const handleProcess = useCallback(() => {
  try {
    // Process input
    setOutput(result)
    setError('')
  } catch (e) {
    setError((e as Error).message)
  }
}, [input])
```

### Copy to clipboard

```typescript
import CopyButton from '@/components/shared/CopyButton'

<CopyButton text={outputValue} />
```

## Testing

Currently no automated tests. Manual testing workflow:
1. Build locally: `pnpm pages:build`
2. Test in dev: `pnpm dev`
3. Test local preview: `pnpm preview`
4. Verify both languages work
5. Check mobile responsiveness
6. Verify SEO metadata (view source)

## Notes

- The codebase prioritizes **user privacy** over features - never add server-side processing for user data
- Tool components should handle their own error states gracefully
- Follow existing naming conventions: tool slugs use kebab-case, component names use PascalCase
- Icons come from Lucide React - search available icons at lucide.dev
- Categories: `dev`, `finance`, `health`, `image`, `text`, `units`, `everyday`
- Always use `pnpm` for package management - never `npm` or `yarn`
- Use CSS variables (`var(--color-*)`) for colors to ensure dark mode compatibility
- Test all UI changes in both light and dark modes before committing
