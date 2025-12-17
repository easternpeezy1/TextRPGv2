// UI Elements
const outputWindow = document.getElementById('output-window');
const inputContainer = document.getElementById('input-container');
const inputField = document.getElementById('input-field');
const inputPrompt = document.getElementById('input-prompt');
const menuContainer = document.getElementById('menu-container');
const menuOptions = document.getElementById('menu-options');
const submitBtn = document.getElementById('submit-btn');

let currentCallback = null;
let currentMenuItems = [];

function log(message, type = 'system') {
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.innerHTML = message;
    outputWindow.appendChild(entry);
    
    const entries = outputWindow.querySelectorAll('.log-entry');
    if (entries.length > 100) {
        entries[0].remove();
    }
    outputWindow.scrollTop = outputWindow.scrollHeight;
}

function updateUI(player) {
    if (!player) return;

    document.getElementById('player-name').textContent = player.name;
    document.getElementById('player-level').textContent = player.level;
    document.getElementById('player-exp').textContent = `${player.exp}/${player.level * 20}`;
    document.getElementById('player-health').textContent = `${player.health}/${player.maxHealth}`;
    document.getElementById('player-stamina').textContent = `${player.stamina}/${player.maxStamina}`;
    document.getElementById('player-energy').textContent = `${player.energy}/${player.maxEnergy}`;
    document.getElementById('player-attack').textContent = player.attack;
    document.getElementById('player-defense').textContent = player.defense;
    document.getElementById('player-luck').textContent = player.luck;
    document.getElementById('player-money').textContent = `$${player.money}`;
    document.getElementById('player-gold').textContent = player.goldCoins;
    document.getElementById('player-caps').textContent = player.bottleCaps;

    const healthPct = Math.floor(player.health / player.maxHealth * 100);
    const staminaPct = Math.floor(player.stamina / player.maxStamina * 100);
    const energyPct = Math.floor(player.energy / player.maxEnergy * 100);

    document.getElementById('health-bar').style.width = healthPct + '%';
    document.getElementById('health-bar').textContent = healthPct + '%';
    document.getElementById('stamina-bar').style.width = staminaPct + '%';
    document.getElementById('stamina-bar').textContent = staminaPct + '%';
    document.getElementById('energy-bar').style.width = energyPct + '%';
    document.getElementById('energy-bar').textContent = energyPct + '%';

    const invDisplay = document.getElementById('inventory-display');
    if (player.inventory.length === 0) {
        invDisplay.innerHTML = '<div style="color: #666; text-align: center; grid-column: 1/-1;">Empty</div>';
    } else {
        invDisplay.innerHTML = player.inventory.map(item => {
            const itemName = typeof item === 'string' ? item : item.name;
            return `<div class="inventory-item">${itemName}</div>`;
        }).join('');
    }
}

function showInput(prompt, callback) {
    currentCallback = callback;
    inputPrompt.textContent = prompt;
    inputField.value = '';
    inputContainer.classList.add('active');
    menuContainer.style.display = 'none';
    currentMenuItems = [];
    inputField.focus();
}

function showMenu(menuItems) {
    menuOptions.innerHTML = '';
    inputContainer.classList.remove('active');
    menuContainer.style.display = 'block';
    currentMenuItems = menuItems;

    menuItems.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'menu-btn';
        if (item.disabled) btn.disabled = true;
        
        btn.innerHTML = `<span class="btn-key">${item.key}</span> ${item.label}`;
        btn.onclick = item.action;
        
        menuOptions.appendChild(btn);
    });
}

// Keyboard event listener for menu hotkeys
document.addEventListener('keydown', (e) => {
    // Only trigger hotkeys when menu is visible and input is not focused
    if (menuContainer.style.display === 'block' && inputContainer.classList.contains('active') === false) {
        const key = e.key.toUpperCase();
        
        // Find matching menu item
        const matchingItem = currentMenuItems.find(item => 
            item.key.toUpperCase() === key && !item.disabled
        );
        
        if (matchingItem) {
            e.preventDefault();
            matchingItem.action();
        }
    }
});

// Event listeners for input
submitBtn.onclick = () => {
    const val = inputField.value.trim();
    if (val && currentCallback) {
        currentCallback(val);
    }
};

inputField.onkeydown = (e) => {
    if (e.key === 'Enter') submitBtn.click();
};

export { log, updateUI, showInput, showMenu };