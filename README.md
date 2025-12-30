# Take Care Of My Cats - Daily Feeding Schedule

A Progressive Web App (PWA) providing a daily feeding schedule and care instructions for two cats: **Leona** and **Lenny**. The page ensures clear and accessible instructions are available for anyone responsible for taking care of the cats.

## Features

- **Daily Feeding Schedule**: Detailed meal schedule with food types and quantities
- **Task Tracking**: Checkboxes to mark completed feeding tasks (resets daily at midnight)
- **Progressive Web App**: Install on mobile devices, works offline
- **Cat Profiles**: Individual cards for each cat with photo, name, and feeding details
- **Accessible Design**: ARIA roles, screen reader support, and keyboard navigation
- **Mobile-First**: Responsive design with touch-friendly 44x44px tap targets

## Development

### Prerequisites

- Node.js 18+ and npm

### Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

### Scripts

- `npm start` - Starts development server with live reloading
- `npm run build` - Builds production-ready assets to `dist/`

### Gulp Tasks

- `gulp` - Default task: builds assets and starts dev server
- `gulp build` - Builds all assets for production
- `gulp clean` - Cleans the dist directory
- `gulp styles` - Processes CSS files
- `gulp scripts` - Processes JavaScript files
- `gulp images` - Optimizes images
- `gulp pwaIcons` - Generates PWA icons from SVG

## Deployment

### Kinsta Static Sites

1. Connect your GitHub repository in the Kinsta dashboard
2. Configure build settings:
   - **Build command**: `npm run build`
   - **Node version**: 18
   - **Publish directory**: `dist`
3. Deploy

The site includes a service worker for offline functionality. Cache versioning is managed in `sw.js`.

## Project Structure

```
├── assets/
│   ├── css/styles.css      # Source styles
│   ├── js/main.js          # Source JavaScript
│   ├── images/             # Cat photos and food images
│   └── icons/              # PWA icons and favicon
├── dist/                   # Built production files
├── scripts/
│   └── generate-icons.js   # PWA icon generation
├── index.html              # Main HTML file
├── sw.js                   # Service worker
├── manifest.json           # PWA manifest
└── gulpfile.js             # Build configuration
```

## Version

See [CHANGELOG.md](CHANGELOG.md) for version history.
