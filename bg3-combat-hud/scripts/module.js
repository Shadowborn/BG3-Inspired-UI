import { BG3CombatHUD } from './hud.js';

Hooks.once('init', () => {
  console.log('BG3 Combat HUD | Initializing');
  
  game.settings.register('bg3-combat-hud', 'enableHUD', {
    name: 'Enable Combat HUD',
    hint: 'Enable or disable the BG3-style combat HUD',
    scope: 'client',
    config: true,
    type: Boolean,
    default: true
  });

  game.settings.register('bg3-combat-hud', 'hudOpacity', {
    name: 'HUD Opacity',
    hint: 'Adjust the transparency of the HUD (0-100)',
    scope: 'client',
    config: true,
    type: Number,
    range: { min: 0, max: 100, step: 5 },
    default: 95
  });

  game.keybindings.register('bg3-combat-hud', 'toggleHUD', {
    name: 'Toggle Combat HUD',
    hint: 'Show or hide the combat HUD',
    editable: [{ key: 'KeyH', modifiers: ['Shift'] }],
    onDown: () => {
      if (game.bg3hud) {
        if (game.bg3hud.rendered) {
          game.bg3hud.close();
        } else {
          game.bg3hud.render(true);
        }
      }
      return true;
    }
  });

  // Keys 1-9 activate slots 0-8
  for (let i = 1; i <= 9; i++) {
    game.keybindings.register('bg3-combat-hud', `slot${i}`, {
      name: `Hotbar Slot ${i}`,
      editable: [{ key: `Digit${i}` }],
      onDown: () => {
        if (game.bg3hud?.actor) {
          game.bg3hud.activateSlot(i - 1);
          return true;
        }
        return false;
      }
    });
  }
  
  // Key 0 activates slot 9
  game.keybindings.register('bg3-combat-hud', 'slot0', {
    name: 'Hotbar Slot 0',
    editable: [{ key: 'Digit0' }],
    onDown: () => {
      if (game.bg3hud?.actor) {
        game.bg3hud.activateSlot(9);
        return true;
      }
      return false;
    }
  });
  
  // Key - (Minus) activates slot 10
  game.keybindings.register('bg3-combat-hud', 'slotMinus', {
    name: 'Hotbar Slot -',
    editable: [{ key: 'Minus' }],
    onDown: () => {
      if (game.bg3hud?.actor) {
        game.bg3hud.activateSlot(10);
        return true;
      }
      return false;
    }
  });
  
  // Key = (Equal) activates slot 11
  game.keybindings.register('bg3-combat-hud', 'slotEqual', {
    name: 'Hotbar Slot =',
    editable: [{ key: 'Equal' }],
    onDown: () => {
      if (game.bg3hud?.actor) {
        game.bg3hud.activateSlot(11);
        return true;
      }
      return false;
    }
  });
});

Hooks.once('ready', () => {
  console.log('BG3 Combat HUD | Ready');
  game.bg3hud = new BG3CombatHUD();
});

Hooks.on('controlToken', (token, controlled) => {
  if (!game.bg3hud || !game.settings.get('bg3-combat-hud', 'enableHUD')) return;
  
  if (controlled) {
    game.bg3hud.loadHotbarSlots();
    game.bg3hud.render(true);
  } else if (canvas.tokens.controlled.length === 0) {
    game.bg3hud.close();
  }
});

Hooks.on('updateActor', (actor) => {
  if (game.bg3hud?.actor?.id === actor.id) {
    game.bg3hud.render(false);
  }
});
