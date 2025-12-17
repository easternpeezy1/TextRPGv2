import { Player }            from './classes/Player.js';
import { Enemy, Boss }       from './classes/Enemy.js';

import { enemyPool, bossPool } from './classes/Enemy.js';
import { traderItems, goldShopItems } from './data/shops.js'; 

import { log, updateUI, showInput, showMenu } from './ui/ui.js';

import * as Combat           from './game/combat.js';
import * as Scavenge         from './game/scavenge.js';
import * as Shops            from './game/shops.js';

let player = null;
let currentEnemy = null;

function startGame() {
    showInput('Enter your survivor name:', name => {
        player = new Player(name);
        log(`<strong>Welcome, ${player.name}!</strong> Your struggle begins…`, 'success');
        updateUI(player);
        showMainMenu();
    });
}

function showMainMenu() {
    log('<br>--- Survivor Outpost ---', 'system');

    const menuItems = [
        { key: '1', label: 'Face a threat',        action: startCombat, disabled: player.stamina < 2 },
        { key: '2', label: 'Scavenge for loot',    action: () => Scavenge.showScavengeMenu(player, { log, updateUI, showInput, showMenu }, showMainMenu) },
        { key: '3', label: 'Pursue Boss',          action: pursueBoss },
        { key: '4', label: 'Trade with merchant',  action: () => Shops.showTraderMenu(player, { log, updateUI, showInput, showMenu }, showMainMenu) },
        { key: '5', label: 'Rest',                 action: rest },
        { key: 'C', label: 'View Status',          action: viewStatus },
        { key: 'S', label: 'Save Game',            action: saveGame },
        { key: 'L', label: 'Load Game',            action: loadGame },
        { key: 'G', label: 'Gold Shop',            action: () => Shops.showGoldShop(player, { log, updateUI, showInput, showMenu }, showMainMenu) },
        { key: 'B', label: 'Lottery',              action: () => Shops.showLottery(player, { log, updateUI, showInput, showMenu }, showMainMenu) }
    ];

    // secret admin menu (only for the dev name)
    if (player && player.name.toLowerCase() === 'jared') {
        menuItems.push({ key: '0', label: 'Admin Menu (Dev)', action: showAdminMenu });
    }

    showMenu(menuItems);
}

function startCombat() {
    Combat.startCombat(player, { log, updateUI, showInput, showMenu }, showMainMenu);
}

function rest() {
    player.rest();
    log('😴 You rest and recover your strength.', 'success');
    updateUI(player);
    showMainMenu();
}

function viewStatus() {
    log('<br>📊 <strong>CHARACTER STATUS</strong>', 'system');
    log(`Name: ${player.name} | Level: ${player.level}`, 'system');
    log(`HP: ${player.health}/${player.maxHealth}`, 'system');
    log(`Stamina: ${player.stamina}/${player.maxStamina}`, 'system');
    log(`Energy: ${player.energy}/${player.maxEnergy}`, 'system');
    log(`ATK: ${player.attack} | DEF: ${player.defense} | LUCK: ${player.luck}`, 'system');
    log(`Scrap: $${player.money} | Gold Coins: ${player.goldCoins} | Bottle Caps: ${player.bottleCaps}`, 'system');
    log(`EXP: ${player.exp}/${player.level * 20}`, 'system');
    const inv = player.inventory.map(i => typeof i === 'string' ? i : i.name).join(', ') || 'Empty';
    log(`Inventory: ${inv}`, 'system');
    showMainMenu();
}

function saveGame() {
    try {
        localStorage.setItem('apocalypseRPG_save', JSON.stringify(player));
        log('💾 Game saved successfully!', 'success');
    } catch (e) {
        log('❌ Save failed: ' + e.message, 'warning');
    }
    showMainMenu();
}

function loadGame() {
    try {
        const raw = localStorage.getItem('apocalypseRPG_save');
        if (!raw) {
            log('❌ No saved game found.', 'warning');
            showMainMenu();
            return;
        }
        const data = JSON.parse(raw);
        player = new Player(data.name);
        Object.assign(player, data);
        log('✅ Game loaded!', 'success');
        updateUI(player);
    } catch (e) {
        log('❌ Load error: ' + e.message, 'warning');
    }
    showMainMenu();
}

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
        { key: 'E', label: 'Max All Stats',    action: () => { player.health = player.maxHealth; player.stamina = player.maxStamina; player.energy = player.maxEnergy; UI.updateUI(player); } },
        { key: '0', label: 'Back to Main Menu',action: showMainMenu }
    ];
    showMenu(adminOpts);
}

function numericPrompt(label, applyFn) {
    showInput(`Set ${label} to:`, val => {
        const num = parseInt(val, 10);
        if (isNaN(num) || num < 0) {
            log('❌ Invalid number.', 'warning');
        } else {
            applyFn(num);
            log(`${label} set to ${num}.`, 'success');
            updateUI(player);
        }
        showAdminMenu();
    });
}

function pursueBoss() {
    if (player.level < 5) {
        log('⚠️ You need to be at least level 5 to pursue a boss!', 'warning');
        showMainMenu();
        return;
    }

    log('<br>🎯 Choose a boss to pursue:', 'system');
    bossPool.forEach((b, i) => log(`[${i + 1}] ${b.name} (Lv ${b.level}) – ${b.uniqueDrop.name}`, 'system'));

    showInput(`Pick a boss (1–${bossPool.length}, or 0 to cancel):`, choice => {
        const idx = parseInt(choice, 10) - 1;
        if (isNaN(idx) || idx < 0 || idx >= bossPool.length) {
            showMainMenu();
            return;
        }
        currentEnemy = bossPool[idx];
        log(`<br>💀 You face the fearsome ${currentEnemy.name}!`, 'combat');
        log(`Boss HP: ${currentEnemy.health}/${currentEnemy.maxHealth} | ATK: ${currentEnemy.attack} | DEF: ${currentEnemy.defense}`, 'combat');
        Combat.startCombat(player, { log, updateUI, showInput, showMenu }, showMainMenu, currentEnemy);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    console.log('=== renderer.js loaded (module) ===');
    startGame();
});