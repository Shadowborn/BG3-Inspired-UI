# BG3 Combat HUD

A Baldur's Gate 3-inspired combat HUD module for Foundry Virtual Tabletop.

## Features

- **Bottom-Panel Interface**: BG3-style HUD positioned at the bottom of the screen
- **Character Portrait & Stats**: Circular portrait with HP bar, AC display, and condition tracking
- **Action Economy**: Visual indicators for Action, Bonus Action, and Reaction
- **Hotbar System**: 10 customizable slots with keyboard shortcuts (1-0)
- **Spell Slot Tracker**: Visual pip display for all spell levels
- **Movement Display**: Real-time movement tracking
- **End Turn Button**: Quick combat management
- **Dark Fantasy Aesthetic**: Golden accents, ornate borders, and immersive styling

## Installation

### Method 1: Manifest URL
1. In Foundry VTT, go to **Add-on Modules**
2. Click **Install Module**
3. Paste this manifest URL: `https://github.com/yourusername/bg3-combat-hud/releases/latest/download/module.json`
4. Click **Install**

### Method 2: Manual Installation
1. Download the latest release
2. Extract to `FoundryVTT/Data/modules/bg3-combat-hud`
3. Restart Foundry VTT
4. Enable the module in your world

## Usage

### Activation
- The HUD appears automatically when you select a token
- Toggle with **Shift + H** keyboard shortcut
- Configure settings in **Module Settings**

### Hotbar
- **Drag & Drop**: Drag items from character sheet to hotbar slots
- **Keyboard Shortcuts**: Press 1-0 to activate corresponding slots
- **Auto-populate**: NPCs auto-populate with weapons and abilities

### Action Economy
- Click action indicators to mark them as used
- Automatically resets at start of turn
- Visual feedback for available/used actions

### Spell Slots
- Displays all available spell levels
- Pips show remaining slots
- Auto-updates when spells are cast

## Configuration

### Settings
- **Enable Combat HUD**: Toggle the HUD on/off
- **HUD Opacity**: Adjust transparency (0-100%)

### Keybindings
All keybindings can be customized in **Configure Controls**:
- Toggle HUD: Shift + H
- Hotbar Slots 1-10: Number keys 1-0

## Compatibility

- **FoundryVTT Version**: 11+ (Verified on v13)
- **Game Systems**: Best with D&D 5e, adaptable to other systems
- **Known Conflicts**: None reported

## Development

### File Structure
```
bg3-combat-hud/
├── module.json
├── scripts/
│   ├── module.js
│   └── hud.js
├── templates/
│   └── hud.hbs
├── styles/
│   └── hud.css
└── lang/
    └── en.json
```

### API
The module exposes a global API:
```javascript
// Access the HUD instance
game.bg3hud

// Listen for HUD events
Hooks.on('bg3hud.ready', (hud) => {
  console.log('BG3 HUD is ready!');
});
```

## Credits

- **Inspiration**: Baldur's Gate 3 by Larian Studios
- **Module Developer**: Your Name
- **Framework**: Built on FoundryVTT Application API

## License

This module is licensed under the MIT License.

## Support

- Report issues: [GitHub Issues](https://github.com/yourusername/bg3-combat-hud/issues)
- Feature requests: [GitHub Discussions](https://github.com/yourusername/bg3-combat-hud/discussions)

## Changelog

### Version 1.0.0
- Initial release
- Core HUD functionality
- Hotbar system with drag & drop
- Action economy tracking
- Spell slot display
- Keyboard shortcuts
- BG3-inspired styling
