# AGENTS.md - AI Agent Instructions

This file provides context for AI agents working on this project.

## Project Overview

**Take Care Of My Cats** is a Progressive Web App (PWA) that displays a daily feeding schedule for three cats: Leona, Lenny, and Willie. The app is designed to be installed on mobile devices and work offline.

- **Production URL**: https://takecareofmycats.com
- **Hosting**: Kinsta Static Sites
- **Framework**: Vanilla JavaScript with Gulp build system

## Tech Stack

- **HTML/CSS/JavaScript**: No framework, vanilla JS
- **Build Tool**: Gulp 4
- **CSS Processing**: PostCSS with cssnano for minification
- **JS Processing**: Terser for minification
- **Image Processing**: Sharp for optimization
- **PWA**: Service worker with cache-first strategy

## Project Structure

```
├── assets/                 # Source files
│   ├── css/styles.css      # Source styles
│   ├── js/main.js          # Source JavaScript
│   ├── images/             # Cat photos and food images
│   └── icons/              # Source icons and favicon
├── dist/                   # Built production files (auto-generated)
├── scripts/
│   └── generate-icons.js   # PWA icon generation from SVG
├── index.html              # Source HTML
├── sw.js                   # Service worker (copied to dist)
├── manifest.json           # PWA manifest (copied to dist)
└── gulpfile.js             # Build configuration
```

## Build Process

### Development
```bash
npm start          # Starts dev server with live reload at localhost:3000
```

### Production Build
```bash
npm run build      # Outputs minified assets to dist/
```

The build process:
1. Cleans the `dist/` directory
2. Minifies CSS to `dist/css/styles.min.css`
3. Minifies JS to `dist/js/main.min.js`
4. Optimizes images to `dist/images/`
5. Generates PWA icons to `dist/icons/`
6. Minifies HTML to `dist/index.html`
7. Copies `sw.js` and `manifest.json` to `dist/`

### Cache Busting
CSS, JS, and manifest files include version query strings (e.g., `?v=1.2.0`). The version is read from `package.json`. Update the version in:
- `package.json` (source of truth for version)
- `sw.js` (CACHE_NAME must match)

## Deployment

### Kinsta Static Sites (Production)

Deployment is automatic via GitHub integration:

1. Push changes to `main` branch on GitHub
2. Kinsta detects the push and triggers a build
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Node version: 18

**No manual deployment required** - just push to `main`.

### Verifying Deployment
- Visit https://takecareofmycats.com
- Check browser DevTools > Application > Manifest for PWA status
- Check DevTools > Application > Service Workers for SW status

## PWA Requirements

For the PWA install prompt to appear, the following must be true:

1. **HTTPS**: Site must be served over HTTPS (Kinsta handles this)
2. **Manifest**: `manifest.json` must include:
   - `name` or `short_name`
   - `start_url`
   - `display` (standalone, fullscreen, or minimal-ui)
   - `id` (required for Chrome install prompt)
   - Icons: at least 192x192 and 512x512 PNG icons
3. **Service Worker**: Must be registered and have a fetch handler
4. **Engagement**: User must interact with the site (Chrome heuristic)

### Testing PWA Install
- Chrome DevTools > Application > Manifest shows installability status
- Look for "Install" button in browser address bar
- On mobile: browser menu > "Add to Home Screen" or "Install App"

## Service Worker

The service worker (`sw.js`) uses a cache-first strategy:
- Precaches essential assets on install
- Serves cached content when available
- Falls back to network for uncached requests
- Returns cached `index.html` for offline HTML requests

**Cache Versioning**: Update `CACHE_NAME` in `sw.js` when changing cached assets. Format: `takecareofmycats-v{version}`

## Versioning

This project follows [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

Update version in these files:
1. `package.json` - `version` field (source of truth, used by gulpfile)
2. `sw.js` - `CACHE_NAME` constant (e.g., `takecareofmycats-v1.2.0`)
3. `CHANGELOG.md` - Add entry for the release

## Git Workflow

- **Main branch**: `main`
- **Remote**: `github`
- Push to `main` triggers production deployment

### Commit Message Format
```
Brief description of change

Optional longer explanation if needed.
```

Do not include:
- Emojis
- Co-author attributions for AI
- References to AI tools

## Testing

### Manual Testing Checklist
- [ ] Site loads at localhost:3000 (dev) or production URL
- [ ] All three cats display with photos
- [ ] Checkboxes persist state in localStorage
- [ ] Checkboxes reset at midnight
- [ ] "Clear All Checkboxes" button works
- [ ] PWA installs on mobile
- [ ] Site works offline after first load

### Browser DevTools Checks
- Application > Manifest: No errors, installable
- Application > Service Workers: Registered, activated
- Console: No errors
- Network: Assets load correctly

## Common Tasks

### Adding a New Cat
1. Add cat photo to `assets/images/`
2. Add feeding card HTML in `index.html`
3. Update `sw.js` to cache the new image
4. Run `npm run build`

### Updating Food Information
1. Edit the relevant feeding card in `index.html`
2. Run `npm run build`

### Updating PWA Icons
1. Edit `assets/icons/cat-icon.svg`
2. Run `node scripts/generate-icons.js`
3. Run `npm run build`

## Troubleshooting

### PWA Not Installing
1. Check manifest has `id` field
2. Verify icons exist and are correct sizes
3. Check service worker is registered (DevTools > Application)
4. Clear site data and try again

### Service Worker Not Updating
1. Update `CACHE_NAME` version in `sw.js`
2. Rebuild: `npm run build`
3. Hard refresh or clear cache in browser

### Styles/Scripts Not Updating
1. Bump version in `package.json` and `gulpfile.js`
2. Rebuild: `npm run build`
3. Cache busting query string will force reload
