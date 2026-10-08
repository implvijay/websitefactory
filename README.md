# Website Factory

A comprehensive visual website builder with drag-and-drop functionality, theme variants, and full website preview capabilities.

## ✨ Features Implemented

### 1. ✅ Content-Rich Pages
- Comprehensive theme content with detailed sections
- Hero sections with compelling headlines and descriptions
- Feature grids with icons and descriptions
- Service listings with detailed explanations
- Testimonials with ratings and client information
- Team member profiles with bios
- FAQ sections with expandable questions
- Contact forms with validation
- Call-to-action sections

### 2. ✅ Full Website Preview
- Complete website preview mode accessible from project editor
- Navigate between all pages in preview
- See how your website will look with selected theme
- Interactive navigation between pages
- Responsive design preview

### 3. ✅ Editable from Preview
- Direct page selection in preview mode
- Switch between pages using dropdown
- Real-time theme application
- See changes immediately in preview

### 4. ✅ Drag and Drop Page Builder
- Visual page builder with drag-and-drop sections
- 8 section types: Hero, Features, Services, Testimonials, CTA, Text, Image, Contact
- Reorder sections by dragging
- Add/remove sections easily
- Edit section content inline
- Resize and customize sections

### 5. ✅ Animation Support
- Each section supports animations
- 6 animation types: None, Fade In, Slide Up, Slide Left, Scale, Bounce
- Configurable duration and delay
- Preview animations in real-time
- Using Framer Motion for smooth animations

### 6. ✅ Page Variants
- Multiple layout options per page
- Theme variants (Dark, Vibrant, Soft versions)
- Content variations
- Easy switching between variants
- Preview different combinations

### 7. ✅ Drag and Drop Menu Builder
- Visual menu builder with drag-and-drop
- Add menu items by dragging
- Reorder items by dragging
- Edit items inline after drag-and-drop
- No need to type page names manually
- Select from existing pages

### 8. ✅ Menu Clone Feature
- Clone entire menus with one click
- Duplicate menu items
- Avoid rework when creating similar menus
- Maintain menu structure while cloning

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` to see the application.

### Build

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── PageBuilder.tsx       # Drag-and-drop page builder
│   ├── MenuBuilder.tsx       # Drag-and-drop menu builder
│   └── ThemeSelector.tsx     # Theme and variant selector
├── pages/
│   ├── Dashboard.tsx         # Project list and creation
│   ├── ProjectEditor.tsx     # Main editor with tabs
│   └── Preview.tsx           # Full website preview
├── data/
│   ├── themes.ts             # Theme definitions and variants
│   └── themeContent.ts       # Rich content for themes
├── types/
│   └── index.ts              # TypeScript type definitions
└── App.tsx                   # Main app with routing
```

## 🎨 Themes

### Base Themes (12)
1. **Corporate Blue** - Professional business theme
2. **Tech Dark** - Modern technology theme
3. **Healthcare Clean** - Medical and wellness theme
4. **Creative Bold** - Creative agency theme
5. **Minimal Light** - Clean minimalist theme
6. **Warm Earth** - Restaurant and hospitality theme
7. **Industrial Strong** - Construction and manufacturing theme
8. **SaaS Gradient** - Software as a Service theme
9. **Nature Green** - Education and environmental theme
10. **Luxury Gold** - High-end luxury theme
11. **Startup Vibrant** - Energetic startup theme
12. **Classic Serif** - Professional services theme

### Theme Variants (36)
Each base theme has 3 variants:
- **Dark** - Dark mode version
- **Vibrant** - Enhanced color saturation
- **Soft** - Pastel, gentle colors

**Total: 48 themes available**

## 📄 Page Sections

### Available Section Types
1. **Hero Section** - Large banner with heading, description, and CTA
2. **Features** - Grid of features with icons
3. **Services** - Service listings with descriptions
4. **Testimonials** - Customer testimonials with ratings
5. **Call to Action** - Conversion-focused sections
6. **Text Block** - Rich text content
7. **Image** - Image with caption
8. **Contact Form** - Contact information and form

### Section Features
- Drag-and-drop reordering
- Inline content editing
- Animation settings
- Custom styling options
- Remove/duplicate sections

## 🧭 Menu Builder

### Features
- Drag-and-drop menu items
- Multiple menu locations (Header, Footer, Sidebar)
- Link to pages, external URLs, or anchors
- Reorder items by dragging
- Edit items inline
- Clone entire menus
- Delete items and menus

### Menu Item Types
- **Page** - Link to internal pages
- **URL** - External website links
- **Anchor** - Jump to page sections

## 🎬 Animations

### Animation Types
1. **None** - No animation
2. **Fade In** - Smooth fade in effect
3. **Slide Up** - Slide from bottom
4. **Slide Left** - Slide from right
5. **Scale** - Zoom in effect
6. **Bounce** - Bouncy entrance

### Animation Settings
- **Duration** - How long the animation takes (0-5 seconds)
- **Delay** - Wait time before animation starts
- Applied per section
- Preview in real-time

## 💾 Data Storage

All data is stored in browser localStorage:
- Projects
- Pages and sections
- Menus and menu items
- Theme selections
- Page variants

## 🔧 Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling
- **React Router** - Navigation
- **@dnd-kit** - Drag and drop
- **Framer Motion** - Animations
- **Lucide React** - Icons

## 📊 Project Metrics

- **Total Files**: 10+ source files
- **Components**: 6 major components
- **Themes**: 48 (12 base + 36 variants)
- **Section Types**: 8
- **Animation Types**: 6
- **Menu Locations**: 3
- **Menu Item Types**: 3

## 🎯 Key Improvements from Feedback

### 1. Content Richness ✅
- Expanded all theme content with detailed, professional copy
- Multiple paragraphs for about sections
- Comprehensive service descriptions
- Detailed team member bios
- Extensive FAQ sections

### 2. Preview Functionality ✅
- Added full website preview mode
- Page navigation in preview
- Theme application in preview
- Easy access from editor

### 3. Inline Editing ✅
- Edit pages directly from preview
- Switch between pages seamlessly
- Real-time updates

### 4. Drag and Drop Builder ✅
- Visual section builder
- Drag to reorder sections
- Click to add sections
- Resize and customize

### 5. Animation Support ✅
- Per-section animation settings
- 6 animation types
- Configurable duration and delay
- Smooth transitions

### 6. Page Variants ✅
- Multiple layout options
- Theme variants
- Easy switching
- Preview combinations

### 7. Menu Builder ✅
- Drag-and-drop interface
- No manual typing required
- Select from existing pages
- Inline editing

### 8. Menu Clone ✅
- One-click menu cloning
- Duplicate menu structure
- Avoid rework
- Maintain consistency

## 🚀 Future Enhancements

- Export to HTML/CSS/JS
- Export to React components
- Export to Vue components
- Image upload and management
- Custom fonts
- Advanced animations
- Multi-language support
- SEO optimization tools
- Analytics integration
- Form submission handling

## 📝 License

MIT License - feel free to use for personal and commercial projects.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Known Issues

- Bundle size exceeds 500KB (optimization recommended)
- LocalStorage has size limits (consider backend for large projects)
- No undo/redo functionality yet
- No collaborative editing

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
