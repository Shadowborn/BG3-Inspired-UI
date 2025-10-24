# Design Guidelines: Baldur's Gate 3-Inspired Combat HUD

## Design Approach

**Reference-Based Approach**: Draw inspiration from Baldur's Gate 3's dark fantasy RPG interface aesthetic, characterized by:
- Deep, rich backgrounds with subtle textures
- Golden/bronze ornamental accents and borders
- High contrast for readability during active gameplay
- Medieval fantasy UI elements with modern polish
- Translucent overlays that don't obstruct the game canvas

**Key Design Principles**:
- Information hierarchy optimized for split-second combat decisions
- Visual affordances that clearly communicate interactivity
- Non-intrusive overlay that enhances rather than obscures gameplay
- Fantasy aesthetic that feels premium and immersive

## Color Palette

**Primary Colors**:
- Background: Deep charcoal with subtle brown undertones (#1a1612, #241f1c)
- Accent: Warm gold (#d4af37, #c9a961) for borders, highlights, and active states
- Surface: Translucent dark brown/black (rgba(26, 22, 18, 0.95))

**Functional Colors**:
- HP/Health: Deep crimson (#8b1a1a) to vibrant red (#dc2626)
- Action Available: Warm gold (#d4af37)
- Action Used: Desaturated gray (#4a4a4a)
- Spell Slots: Arcane purple (#7c3aed) with blue highlights (#3b82f6)
- Warning/Alert: Amber (#f59e0b)

**Text Colors**:
- Primary text: Warm off-white (#f5f1e8)
- Secondary text: Muted gold (#c9a961)
- Disabled text: Gray (#6b7280)

## Typography

**Font Selection**:
Use a single serif or display font with medieval fantasy character via Google Fonts:
- Primary: Cinzel or Spectral (elegant, readable serif with RPG feel)

**Type Scale**:
- Character Name: text-lg font-semibold (18px)
- Section Labels: text-xs font-medium uppercase tracking-wide (12px)
- Numbers/Stats: text-2xl font-bold (24px) for HP, text-base (16px) for smaller stats
- Button Text: text-sm font-semibold (14px)
- Tooltips: text-xs (12px)

**Type Treatment**:
- Add subtle text-shadow for legibility over complex backgrounds
- Use letter-spacing for uppercase labels (tracking-wider)
- Golden color for emphasis on important stats

## Layout System

**Spacing Primitives**: Use Tailwind units of 1, 2, 3, 4, 6, 8 for consistent rhythm
- Micro spacing (within components): p-2, gap-1, m-1
- Component padding: p-4, p-6
- Section gaps: gap-4, gap-6
- Outer margins: m-8

**HUD Positioning**:
- Fixed bottom-center (bottom-0 left-1/2 -translate-x-1/2)
- Width: max-w-5xl (approx 1024px) scaling down responsively
- Margin from bottom: mb-8
- Z-index: z-100 (above game canvas, below system menus)

**Grid Structure**:
Primary container: Horizontal flex layout (flex-row gap-6) containing:
1. Left panel: Character portrait + HP (flex-shrink-0 w-48)
2. Center panel: Hotbar + action economy (flex-1)
3. Right panel: Spell slots + turn button (flex-shrink-0 w-40)

## Component Library

### Core Container
- Background: Translucent dark overlay with subtle noise texture
- Border: 2px solid ornate gold gradient
- Border-radius: rounded-lg (8px)
- Box-shadow: Large dramatic shadow (shadow-2xl + custom glow)
- Padding: p-6

### Character Portrait
- Circular frame (rounded-full) with double border
- Outer border: 4px golden ornate frame
- Inner border: 2px dark separator
- Size: w-32 h-32
- Portrait position: object-cover
- Status indicators: Absolute positioned dots on border (conditions/buffs)

### HP Bar
- Track: Full width with rounded ends (rounded-full)
- Height: h-3
- Background: Very dark (bg-gray-900)
- Fill: Gradient from crimson to red, smooth transition
- Border: 1px darker outline
- Text overlay: Centered, bold, with text shadow

### Action Economy Indicators
- Layout: Horizontal flex (gap-2)
- Each indicator: Rounded square (w-12 h-12)
- States:
  - Available: Golden glow, bright border, filled icon
  - Used: Desaturated, darker, semi-transparent icon
  - Unavailable: Grayed out completely
- Icon style: Sharp, high-contrast symbols
- Subtle inner shadow for depth

### Hotbar Slots
- Layout: Grid (grid-cols-10 gap-2)
- Each slot: Square (aspect-square) with rounded corners (rounded-md)
- Background: Dark with subtle gradient
- Border: 2px, changes color on hover/active
- Keybind number: Absolute top-left, small golden badge
- Icon: Centered, 70% of slot size
- Empty state: Dashed border, dim background

### Spell Slot Display
- Vertical stack by spell level (flex-col gap-1)
- Each level: Horizontal pips (flex-row gap-1)
- Pip: Small circle (w-2.5 h-2.5 rounded-full)
- Available: Glowing purple
- Used: Dark gray outline only
- Label: Spell level number in small golden text

### End Turn Button
- Large prominent button (w-full py-4)
- Background: Rich golden gradient with metallic feel
- Text: Bold uppercase with tracking
- Hover state: Brightened, slight scale transform
- Border: Ornate frame effect with inner glow
- Disabled state: Desaturated, cursor-not-allowed

### Ornamental Details
- Corner flourishes: SVG decorative elements at container corners
- Dividers: Thin golden lines with subtle geometric patterns between sections
- Backdrop blur: backdrop-blur-md for translucent areas
- Particle effects: Subtle golden sparkles on action use (CSS animation)

## Animations

**Principles**: Use sparingly for feedback, avoid distraction during gameplay

**Approved Animations**:
- Fade in/out on HUD show/hide (duration-300)
- HP bar smooth width transition (transition-all duration-500)
- Pulse effect on active turn indicator (animate-pulse custom)
- Subtle glow on hover states (transition-shadow duration-200)
- Action use: Brief golden flash (duration-150)

**Forbidden**:
- Continuous looping animations
- Auto-playing background effects
- Movement animations on core UI elements

## Visual Polish

**Textures**:
- Subtle parchment/leather texture overlay on backgrounds (opacity-10)
- Noise grain for depth (opacity-5)
- Brushed metal effect on golden borders

**Shadows & Depth**:
- Multiple shadow layers: sharp inner shadow + diffuse outer glow
- Button depth: Inset shadow on press
- Floating effect: Elevated shadow under entire HUD

**Iconography**:
- Use Font Awesome or Heroicons via CDN
- Style: Duotone or solid, high contrast
- Size: Consistent within context (text-xl for actions, text-2xl for main buttons)
- Color: Match golden accent system

## Accessibility

**Contrast**: Ensure 4.5:1 minimum ratio for all text
**Interactive states**: Clear visual distinction between hover, active, disabled
**Focus indicators**: Visible golden outline (ring-2 ring-gold-400) for keyboard navigation
**Font sizing**: Minimum 12px for all text, 16px for primary actions