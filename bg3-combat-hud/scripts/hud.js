export class BG3CombatHUD extends Application {
  constructor(options = {}) {
    super(options);
    this.hotbarSlots = Array(12).fill(null);
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: 'bg3-combat-hud',
      template: 'modules/bg3-combat-hud/templates/hud.hbs',
      popOut: false,
      minimizable: false,
      resizable: false,
      classes: ['bg3-combat-hud']
    });
  }

  get token() {
    return canvas.tokens?.controlled?.[0] || null;
  }

  get actor() {
    return this.token?.actor || null;
  }

  getData() {
    if (!this.actor) {
      return { visible: false, hasToken: false };
    }

    const actor = this.actor;
    const system = actor.system;
    
    const hp = system.attributes?.hp || { value: 0, max: 0 };
    const ac = system.attributes?.ac?.value || 0;
    
    const spellSlots = [];
    if (system.spells) {
      for (let i = 1; i <= 9; i++) {
        const slotData = system.spells[`spell${i}`];
        if (slotData && slotData.max > 0) {
          spellSlots.push({
            level: i,
            current: slotData.value,
            max: slotData.max,
            pips: Array(slotData.max).fill(null).map((_, idx) => ({
              used: idx >= slotData.value
            }))
          });
        }
      }
    }

    const movement = system.attributes?.movement?.walk || 30;

    return {
      visible: true,
      hasToken: true,
      actor: {
        name: actor.name,
        img: actor.img,
        hp: {
          current: hp.value,
          max: hp.max,
          percentage: hp.max > 0 ? Math.round((hp.value / hp.max) * 100) : 0
        },
        ac: ac,
        conditions: this.getConditions()
      },
      hotbarSlots: this.hotbarSlots.map((item, index) => {
        const numberDisplay = index < 9 ? index + 1 : 
                             index === 9 ? 0 : 
                             index === 10 ? '-' : '=';
        
        return {
          index: index,
          number: numberDisplay,
          item: item ? {
            name: item.name,
            img: item.img,
            id: item.id
          } : null,
          empty: !item
        };
      }),
      spellSlots: spellSlots,
      movement: {
        total: movement,
        remaining: movement
      },
      opacity: game.settings.get('bg3-combat-hud', 'hudOpacity') / 100
    };
  }

  getConditions() {
    if (!this.actor) return [];
    
    const effects = this.actor.effects || [];
    return Array.from(effects)
      .filter(e => !e.disabled && e.icon)
      .slice(0, 6)
      .map(e => ({
        icon: e.icon,
        name: e.name || e.label
      }));
  }

  loadHotbarSlots() {
    if (!this.actor) {
      this.hotbarSlots = Array(12).fill(null);
      return;
    }
    
    const items = this.actor.items;
    const weapons = items.filter(i => i.type === 'weapon').slice(0, 2);
    const cantrips = items.filter(i => i.type === 'spell' && i.system.level === 0).slice(0, 10);
    
    this.hotbarSlots = Array(12).fill(null);
    
    weapons.forEach((weapon, idx) => {
      if (idx < 2) this.hotbarSlots[idx] = weapon;
    });
    
    cantrips.forEach((spell, idx) => {
      if (idx < 10) this.hotbarSlots[idx + 2] = spell;
    });
  }

  activateListeners(html) {
    super.activateListeners(html);
    
    html.find('.hotbar-slot').click(this._onSlotClick.bind(this));
    html.find('.hotbar-slot').on('drop', this._onSlotDrop.bind(this));
    html.find('.hotbar-slot').on('dragover', (e) => e.preventDefault());
    html.find('.rest-button').click(this._onRestClick.bind(this));
  }

  _onRestClick(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const button = $(event.currentTarget);
    
    // Remove existing menu if present
    $('.rest-menu').remove();
    
    // Create rest menu
    const menu = $(`
      <div class="rest-menu">
        <div class="rest-menu-option" data-rest-type="short" data-testid="button-short-rest">
          Short Rest
        </div>
        <div class="rest-menu-option" data-rest-type="long" data-testid="button-long-rest">
          Long Rest
        </div>
      </div>
    `);
    
    button.append(menu);
    
    // Handle menu clicks
    menu.find('.rest-menu-option').click((e) => {
      e.preventDefault();
      e.stopPropagation();
      const restType = $(e.currentTarget).data('rest-type');
      this._performRest(restType);
      menu.remove();
    });
    
    // Close menu when clicking outside
    setTimeout(() => {
      $(document).one('click', () => menu.remove());
    }, 10);
  }

  async _performRest(restType) {
    if (!this.actor) return;
    
    try {
      if (restType === 'short') {
        await this.actor.shortRest();
        ui.notifications.info(`${this.actor.name} took a short rest`);
      } else {
        await this.actor.longRest();
        ui.notifications.info(`${this.actor.name} took a long rest`);
      }
      this.render(false);
    } catch (error) {
      console.error('BG3 Combat HUD | Error during rest:', error);
      ui.notifications.error('Failed to rest');
    }
  }

  async _onSlotClick(event) {
    event.preventDefault();
    const slotIndex = parseInt(event.currentTarget.dataset.slot);
    await this.activateSlot(slotIndex);
  }

  async activateSlot(slotIndex) {
    const item = this.hotbarSlots[slotIndex];
    if (!item || !this.actor) return;
    
    console.log(`BG3 Combat HUD | Using ${item.name} from slot ${slotIndex}`);
    
    try {
      await item.use();
    } catch (error) {
      console.error('BG3 Combat HUD | Error using item:', error);
      ui.notifications.error(`Failed to use ${item.name}`);
    }
  }

  async _onSlotDrop(event) {
    event.preventDefault();
    
    if (!this.actor?.isOwner) {
      ui.notifications.warn("You don't have permission to modify this hotbar");
      return;
    }
    
    try {
      const data = JSON.parse(event.originalEvent.dataTransfer.getData('text/plain'));
      
      if (data.type === 'Item') {
        const item = await fromUuid(data.uuid);
        const slotIndex = parseInt(event.currentTarget.dataset.slot);
        
        this.hotbarSlots[slotIndex] = item;
        this.render(false);
      }
    } catch (error) {
      console.error('BG3 Combat HUD | Error handling drop:', error);
    }
  }
}
