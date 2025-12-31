# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.2] - 2025-12-31

### Fixed
- Checkbox reset when PWA returns from background (visibilitychange listener)
- Race condition where stale checkmarks persisted if user interacted before interval fired

## [1.4.1] - 2025-12-30

### Fixed
- Checkbox reset timing now uses local timezone instead of UTC

## [1.4.0] - 2025-12-30

### Added
- Custom PWA install banner with "Install App" button
- iOS fallback with manual install instructions
- Session-based dismiss functionality for install banner
- Full viewport width banner styling for large screens

### Fixed
- Split 512x512 icon into separate "any" and "maskable" entries for better compatibility

## [1.3.0] - 2025-12-30

### Added
- AGENTS.md documentation for AI agent context
- Manifest `id` field for reliable PWA install prompts
- Cache busting for manifest.json

### Fixed
- PWA install prompt not appearing on mobile devices

## [1.2.0] - 2025-12-30

### Added
- Willie the cat to the feeding schedule
- "Clear All Checkboxes" reset button (visible only when boxes are checked)

## [1.1.0] - 2025-12-30

### Added
- Daily-reset checkboxes for tracking feeding task completion
- localStorage persistence for checkbox states with automatic midnight reset
- Custom 44x44px touch-friendly checkbox styling
- Visual feedback for completed items (green checkmark, strikethrough, reduced opacity)

## [1.0.0] - 2025-12-30

### Added
- Initial PWA implementation with offline functionality
- Service worker with cache-first strategy
- Web app manifest for installability
- Cat head icon with whiskers (white on black)
- Daily feeding schedule for Leona and Lenny
- Responsive mobile-first design
- Social media meta tags for sharing
