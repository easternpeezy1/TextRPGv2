// ---------------------------------------------------------------
// renderer.js – runs inside the BrowserWindow (renderer process)
// ---------------------------------------------------------------

/* --------------------------------------------------------------
    IMPORT ALL GAME MODULES
   -------------------------------------------------------------- */
//-- core classes -------------------------------------------------
import { Player }            from './classes/Player.js';
import { Enemy, Boss }       from './classes/Enemy.js';

//-- static data (enemy pools, shop inventories, etc.) ---------
import { enemyPool, bossPool } from './classes/Enemy.js';
import { traderItems, goldShopItems } from './data/shops.js'; // add lotteryItems later for lotto

//-- UI helpers --------------------------------------------------
import * as UI               from './ui/ui.js';      // log, updateUI, showInput, showMenu, …
import * as Menus            from './ui/menu.js';   // optional extra menu helpers

//-- game‑logic modules ------------------------------------------
import * as Combat           from './game/combat.js';
import * as Scavenge         from './game/scavenge.js';
import * as Shops            from './game/shops.js';


let player = null;          // the Player instance
let currentEnemy = null;    // the Enemy/Boss we are fighting


function startGame() {
    UI.showInput('Enter your survivor name:', name => {
        player = new Player(name);
        UI.log(`<strong>Welcome, ${player.name}!</strong> Your struggle begins…`, 'success');
        UI.updateUI(player);
        showMainMenu();
    });
}

/* ----------------------------------------------------------------
   Main Outpost menu (calls into the other modules)
   ---------------------------------------------------------------- */
function showMainMenu() {
    UI.log('<br>--- Survivor Outpost ---', 'system');

    const menuItems = [
        { key: '1', label: 'Face a threat',        action: startCombat, disabled: player.stamina < 2 },
        { key: '2', label: 'Scavenge for loot',    action: Scavenge.showScavengeMenu },
        { key: '3', label: 'Pursue Boss',          action: pursueBoss },
        { key: '4', label: 'Trade with merchant',   action: Shops.showTraderMenu },
        { key: 'R', label: 'Rest',                 action: rest },
        { key: 'C', label: 'View Status',          action: viewStatus },
        { key: 'S', label: 'Save Game',            action: saveGame },
        { key: 'L', label: 'Load Game',            action: loadGame },
        { key: 'G', label: 'Gold Shop',            action: Shops.showGoldShop },
        { key: 'B', label: 'Lottery',              action: Shops.showLottery }
    ];

    // secret admin menu (only for the dev name)
    if (player && player.name.toLowerCase() === 'jared') {
        menuItems.push({ key: '0', label: 'Admin Menu (Dev)', action: showAdminMenu });
    }

    UI.showMenu(menuItems);
}

/* ----------------------------------------------------------------
   Combat – thin wrapper that forwards to the combat module
   ---------------------------------------------------------------- */
function startCombat() {
    Combat.startCombat(player, UI, showMainMenu); // you can also pass enemyPool if you like
}

/* ----------------------------------------------------------------
   Rest, view status, save / load, admin – tiny UI wrappers
   ---------------------------------------------------------------- */
function rest() {
    player.rest();
    UI.log('💤 You rest and recover your strength.', 'success');
    UI.updateUI(player);
    showMainMenu();
}

function viewStatus() {
    UI.log('<br>📊 <strong>CHARACTER STATUS</strong>', 'system');
    UI.log(`Name: ${player.name} | Level: ${player.level}`, 'system');
    UI.log(`HP: ${player.health}/${player.maxHealth}`, 'system');
    UI.log(`Stamina: ${player.stamina}/${player.maxStamina}`, 'system');
    UI.log(`Energy: ${player.energy}/${player.maxEnergy}`, 'system');
    UI.log(`ATK: ${player.attack} | DEF: ${player.defense} | LUCK: ${player.luck}`, 'system');
    UI.log(`Scrap: $${player.money} | Gold Coins: ${player.goldCoins} | Bottle Caps: ${player.bottleCaps}`, 'system');
    UI.log(`EXP: ${player.exp}/${player.level * 20}`, 'system');
    const inv = player.inventory.map(i => typeof i === 'string' ? i : i.name).join(', ') || 'Empty';
    UI.log(`Inventory: ${inv}`, 'system');
    showMainMenu();
}

/* --------------------------------------------------------------
   Save / Load (still using localStorage – you’ll swap later)
   -------------------------------------------------------------- */
function saveGame() {
    try {
        localStorage.setItem('apocalypseRPG_save', JSON.stringify(player));
        UI.log('💾 Game saved successfully!', 'success');
    } catch (e) {
        UI.log('❌ Save failed: ' + e.message, 'warning');
    }
    showMainMenu();
}
function loadGame() {
    try {
        const raw = localStorage.getItem('apocalypseRPG_save');
        if (!raw) {
            UI.log('❌ No saved game found.', 'warning');
            showMainMenu();
            return;
        }
        const data = JSON.parse(raw);
        player = new Player(data.name);
        Object.assign(player, data);
        UI.log('✅ Game loaded!', 'success');
        UI.updateUI(player);
    } catch (e) {
        UI.log('❌ Load error: ' + e.message, 'warning');
    }
    showMainMenu();
}

/* --------------------------------------------------------------
   Admin / Debug (only appears for the dev name)
   -------------------------------------------------------------- */
function showAdminMenu() {
    const adminOpts = [
        { key: '1', label: 'Set Health',        action: () => numericPrompt('Health', v => player.health = Math.min(v, player.maxHealth)) },
        { key: '2', label: 'Set Max Health',    action: () => numericPrompt('Max Health', v => player.maxHealth = v) },
        { key: '3', label: 'Set Money',        action: () => numericPrompt('Money', v => player.money = v) },
        { key: '4', label: 'Set Gold Coins',    action: () => numericPrompt('Gold Coins', v => player.goldCoins = v) },
        { key: '5', label: 'Set Bottle Caps',  action: () => numericPrompt('Bottle Caps', v => player.bottleCaps = v) },
        { key: '6', label: 'Set Level',        action: () => numericPrompt('Level', v => player.level = v) },
        { key: '7', label: 'Set Stamina',      action: () => numericPrompt('Stamina', v => player.stamina = Math.min(v, player.maxStamina)) },
        { key: '8', label: 'Set Max Stamina',  action: () => numericPrompt('Max Stamina', v => player.maxStamina = v) },
        { key: '9', label: 'Set Energy',       action: () => numericPrompt('Energy', v => player.energy = Math.min(v, player.maxEnergy)) },
        { key: 'A', label: 'Set Max Energy',   action: () => numericPrompt('Max Energy', v => player.maxEnergy = v) },
        { key: 'B', label: 'Set Attack',       action: () => numericPrompt('Attack', v => player.attack = v) },
        { key: 'C', label: 'Set Defense',      action: () => numericPrompt('Defense', v => player.defense = v) },
        { key: 'D', label: 'Set Luck',         action: () => numericPrompt('Luck', v => player.luck = v) },
        { key: 'E', label: 'Max All Stats',    action: () => { player.health = player.maxHealth; player.stamina = player.maxStamina; player.energy = player.maxEnergy; } },
        { key: '0', label: 'Back to Main Menu',action: showMainMenu }
    ];
    UI.showMenu(adminOpts);
}
function numericPrompt(label, applyFn) {
    UI.showInput(`Set ${label} to:`, val => {
        const num = parseInt(val, 10);
        if (isNaN(num) || num < 0) {
            UI.log('❌ Invalid number.', 'warning');
        } else {
            applyFn(num);
            UI.log(`${label} set to ${num}.`, 'success');
            UI.updateUI(player);
        }
        showAdminMenu();
    });
}

/* --------------------------------------------------------------
   Boss pursuit – uses the bossPool exported from enemies.js
   -------------------------------------------------------------- */
function pursueBoss() {
    if (player.level < 5) {
        UI.log('⚠️ You need to be at least level 5 to pursue a boss!', 'warning');
        showMainMenu();
        return;
    }

    UI.log('<br>🎯 Choose a boss to pursue:', 'system');
    bossPool.forEach((b, i) => UI.log(`[${i + 1}] ${b.name} (Lv ${b.level}) – ${b.uniqueDrop.name}`, 'system'));

    UI.showInput(`Pick a boss (1‑${bossPool.length}, or 0 to cancel):`, choice => {
        const idx = parseInt(choice, 10) - 1;
        if (isNaN(idx) || idx < 0 || idx >= bossPool.length) {
            showMainMenu();
            return;
        }
        currentEnemy = bossPool[idx];
        UI.log(`<br>💀 You face the fearsome ${currentEnemy.name}!`, 'combat');
        UI.log(`Boss HP: ${currentEnemy.health}/${currentEnemy.maxHealth} | ATK: ${currentEnemy.attack} | DEF: ${currentEnemy.defense}`, 'combat');
        Combat.startCombat(player, UI, showMainMenu, currentEnemy); // pass the pre‑created boss
    });
}

/* --------------------------------------------------------------
   Bootstrap – start the game once the page is ready
   -------------------------------------------------------------- */
window.addEventListener('DOMContentLoaded', () => {
    console.log('=== renderer.js loaded (module) ===');
    startGame();
});