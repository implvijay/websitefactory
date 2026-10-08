# Website Factory

A comprehensive visual website builder with drag-and-drop functionality, 48 themes (12 base + 36 variants), AI content generation, SEO optimization, and multi-format export capabilities.

## ✨ Features

### 🎨 Theme System
- **48 Professional Themes**: 12 base themes with 3 variants each (Dark, Vibrant, Soft)
- **Industry-Specific**: Themes for Healthcare, Technology, SaaS, Consulting, Education, and more
- **Live Preview**: See theme changes in real-time
- **Customization**: Modify colors, typography, spacing, and more

### 📄 Page Builder
- **Visual Drag-and-Drop**: Intuitive section management
- **15+ Section Types**: Hero, Features, Services, Testimonials, Pricing, FAQ, Team, and more
- **Animation Support**: 6 animation types with customizable duration and delay
- **Responsive Design**: Mobile-first approach with full responsiveness
- **Row/Column Layout**: Flexible grid system for complex layouts

### 🧭 Menu Management
- **Drag-and-Drop Builder**: Visual menu item management
- **Multiple Locations**: Header, Footer, Sidebar menus
- **Clone Feature**: Duplicate menus to avoid rework
- **Page Linking**: Auto-link to project pages

### 🤖 AI Content Generation
- **15 Content Types**: Generate hero text, services, testimonials, FAQs, and more
- **Context-Aware**: Content tailored to your industry and business
- **Multiple Variations**: Generate 1-5 variations to choose from
- **One-Click Apply**: Instantly apply generated content to sections

### 🔍 SEO Engine
- **Automated Audit**: 50+ SEO checks across 8 categories
- **Scoring System**: 0-100 score with letter grades (A-F)
- **Sitemap Generation**: Automatic XML sitemap creation
- **Schema Markup**: Organization, LocalBusiness, WebPage, FAQ, BreadcrumbList
- **Priority Recommendations**: Actionable suggestions with impact/effort estimates

### 📝 Form Builder
- **11 Field Types**: Text, email, phone, textarea, number, select, checkbox, radio, date, file, hidden
- **Validation System**: Required fields, type-specific validation, pattern matching
- **Drag-and-Drop**: Reorder form fields visually
- **Live Preview**: See form as you build it

### 📊 Analytics Integration
- **Google Analytics 4**: Measurement ID configuration
- **Google Tag Manager**: Container ID setup
- **Meta Pixel**: Facebook/Instagram tracking
- **Custom Scripts**: Head and body script injection
- **Code Preview**: View generated tracking code

### 🖼️ Media Library
- **Image Upload**: Drag-and-drop or file picker
- **Automatic Optimization**: Resize, compress, generate thumbnails
- **External URLs**: Support for hosted images
- **Search & Filter**: Find media by filename, alt text, or title
- **Metadata Management**: Edit alt text and titles

### 🕒 Version Control
- **Automatic Snapshots**: Save project state every 5 minutes
- **Manual Versions**: Create named versions with comments
- **Full Rollback**: Restore entire project to previous state
- **Selective Rollback**: Restore specific pages only
- **Version Comparison**: See what changed between versions

### 📦 Export Options
- **Static HTML**: Pure HTML/CSS/JS files, ready to deploy
- **Laravel 12.x**: Complete PHP project with Blade templates
- **React + Node**: Full-stack JavaScript application
- **ZIP Download**: Complete project packaged for deployment

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd website-factory

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the application.

### Login Credentials
- **Email**: admin@websitefactory.com
- **Password**: password

## 📖 Usage Guide

### Creating Your First Project

1. **Login** to the application
2. Click **"New Project"** on the dashboard
3. Enter project name and select industry
4. Choose a theme from 48 available options
5. Click **"Create Project"**

### Building Pages

1. **Navigate** to the Pages tab
2. **Add sections** by clicking "+ Add Section"
3. **Choose component** type (Hero, Features, Services, etc.)
4. **Select variant** for the component
5. **Edit content** in the properties panel
6. **Drag to reorder** sections as needed
7. **Configure animations** for each section
8. **Save** your changes

### Managing Menus

1. **Go to Menus** tab
2. **Create menu** with name and location
3. **Add items** by selecting pages or entering URLs
4. **Drag to reorder** menu items
5. **Clone menus** to duplicate structure
6. **Preview** changes in real-time

### Customizing Themes

1. **Open Theme** tab
2. **Browse** 48 themes (12 base + 36 variants)
3. **Filter** by industry or style
4. **Preview** themes with your content
5. **Customize** colors, typography, spacing
6. **Save** changes to project

### Generating AI Content

1. **Select a section** in the page designer
2. **Click** "Generate with AI" button
3. **Choose content type** (headline, description, etc.)
4. **Provide context** (business name, industry, tone)
5. **Generate variations** (1-5 options)
6. **Select preferred** variation
7. **Apply** to section

### Exporting Your Website

1. **Navigate** to Export tab
2. **Choose format**:
   - Static HTML (simple deployment)
   - Laravel 12.x (PHP backend)
   - React + Node (full-stack JS)
3. **Configure options** (minification, sitemap, etc.)
4. **Click Export**
5. **Download ZIP** file
6. **Deploy** to your hosting provider

## 🗂️ Project Structure

```
website-factory/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── PageCanvas.tsx   # Drag-and-drop page builder
│   │   ├── MenuEditor.tsx   # Menu management
│   │   ├── ThemePicker.tsx  # Theme selection
│   │   ├── PreviewModal.tsx # Website preview
│   │   └── ExportModal.tsx  # Export interface
│   ├── pages/               # Page components
│   │   ├── Login.tsx        # Authentication
│   │   ├── Dashboard.tsx    # Project list
│   │   ├── ProjectEditor.tsx # Main workspace
│   │   └── Preview.tsx      # Full preview
│   ├── core/
│   │   ├── types/           # TypeScript definitions
│   │   ├── services/        # Business logic
│   │   │   ├── ThemeEngine.ts
│   │   │   ├── PageService.ts
│   │   │   ├── MenuService.ts
│   │   │   ├── AIContentService.ts
│   │   │   ├── SEOService.ts
│   │   │   ├── FormService.ts
│   │   │   ├── AnalyticsService.ts
│   │   │   ├── MediaService.ts
│   │   │   ├── VersionService.ts
│   │   │   └── ExportService.ts
│   │   └── repositories/    # Data access layer
│   ├── data/                # Static data
│   │   ├── themes.ts        # Theme definitions
│   │   ├── components.ts    # Component library
│   │   ├── industries.ts    # Industry data
│   │   └── content.ts       # Theme content
│   ├── storage/             # Persistence layer
│   │   └── browser/         # localStorage implementation
│   └── features/            # Feature modules
│       ├── dashboard/
│       ├── projects/
│       ├── themes/
│       ├── pages/
│       ├── menus/
│       ├── forms/
│       ├── seo/
│       ├── analytics/
│       ├── media/
│       ├── versions/
│       └── export/
├── docs/                    # Documentation
├── public/                  # Static assets
└── package.json
```

## 🔧 Git Setup

### Initial Setup

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Website Factory v1.0"

# Add remote repository
git remote add origin <your-repo-url>

# Push to remote
git push -u origin main
```

### Branching Strategy

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push feature branch
git push -u origin feature/new-feature

# Create pull request on GitHub

# After merge, update main
git checkout main
git pull origin main
```

### Commit Message Convention

```
feat: New feature
fix: Bug fix
docs: Documentation changes
style: Formatting, missing semi colons, etc
refactor: Code refactoring
test: Adding missing tests
chore: Maintenance tasks
```

### .gitignore

```gitignore
# Dependencies
node_modules/
package-lock.json
yarn.lock

# Build output
dist/
build/

# Environment
.env
.env.local
.env.production

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Testing
coverage/
.nyc_output/

# Misc
.cache/
.temp/
```

### Git Hooks (Optional)

Install Husky for git hooks:

```bash
npm install -D husky
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "npm run typecheck"

# Add commit message hook
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```

## 📊 Technical Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **State Management**: React Hooks + Context
- **Routing**: React Router v6
- **Drag & Drop**: @dnd-kit
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Export**: JSZip + FileSaver
- **Storage**: localStorage (Phase 1)

## 🎯 Roadmap

### Phase 1 (Current) ✅
- [x] Core application structure
- [x] Authentication & RBAC
- [x] Project management
- [x] Theme engine with 48 themes
- [x] Component library (30+ components)
- [x] Page builder with drag-and-drop
- [x] Menu builder
- [x] AI content generation
- [x] SEO engine
- [x] Form builder
- [x] Analytics integration
- [x] Media library
- [x] Version control
- [x] Export (HTML, Laravel, React/Node)
- [x] Testing & security

### Phase 2 (Planned)
- [ ] Node/Express backend
- [ ] Database integration (PostgreSQL)
- [ ] File system storage
- [ ] Real AI integration (OpenAI, Gemini)
- [ ] User management UI
- [ ] Team collaboration
- [ ] Advanced analytics dashboard
- [ ] Custom domain support
- [ ] Deployment automation
- [ ] Performance optimization

### Phase 3 (Future)
- [ ] E-commerce integration
- [ ] Blog/CMS system
- [ ] Multi-language support
- [ ] Advanced animations
- [ ] Custom component builder
- [ ] Marketplace for themes
- [ ] White-label solution
- [ ] API for third-party integrations

## 🐛 Troubleshooting

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite

# Rebuild
npm run build
```

### TypeScript Errors

```bash
# Check types
npm run typecheck

# Fix common issues
npm run lint -- --fix
```

### Runtime Errors

- Check browser console for errors
- Verify localStorage is enabled
- Clear browser cache
- Check network requests

## 📝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite for the fast build tool
- Tailwind CSS for the utility-first framework
- @dnd-kit for the drag-and-drop library
- Framer Motion for smooth animations
- Lucide for beautiful icons

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check the documentation in `/docs`
- Review the architecture guide

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

**Version**: 1.0.0  
**Last Updated**: 2026-03-23
