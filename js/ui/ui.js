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
let isProcessingAction = false; // Prevent double-clicking

const TYPING_SPEED = 13; // milliseconds per character

function typeMessage(element, text, callback) {
    let index = 0;
    element.innerHTML = '';
    

    const tokens = [];
    let currentToken = '';
    let i = 0;
    
    while (i < text.length) {
        if (text[i] === '<') {

            if (currentToken) tokens.push(currentToken);
            currentToken = '';
            let tagEnd = text.indexOf('>', i);
            if (tagEnd !== -1) {
                tokens.push(text.substring(i, tagEnd + 1));
                i = tagEnd + 1;
            } else {
                i++;
            }
        } else {
            currentToken += text[i];
            i++;
        }
    }
    if (currentToken) tokens.push(currentToken);
    

    function typeNextToken() {
        if (index < tokens.length) {
            element.innerHTML += tokens[index];
            index++;
            outputWindow.scrollTop = outputWindow.scrollHeight;
            

            const token = tokens[index - 1];
            const delay = token.startsWith('<') ? 0 : TYPING_SPEED * token.length;
            setTimeout(typeNextToken, delay);
        } else {
            if (callback) callback();
        }
    }
    
    typeNextToken();
}

function log(message, type = 'system') {
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    outputWindow.appendChild(entry);
    
    // Use typing effect for all messages
    typeMessage(entry, message, () => {
        // After typing is done, scroll to bottom
        outputWindow.scrollTop = outputWindow.scrollHeight;
    });
    
    const entries = outputWindow.querySelectorAll('.log-entry');
    if (entries.length > 100) {
        entries[0].remove();
    }
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
    isProcessingAction = false;
    currentCallback = callback;
    inputPrompt.textContent = prompt;
    inputField.value = '';
    inputContainer.classList.add('active');
    menuContainer.style.display = 'none';
    currentMenuItems = [];
    inputField.focus();
}

function showMenu(menuItems) {
    isProcessingAction = false;
    menuOptions.innerHTML = '';
    inputContainer.classList.remove('active');
    menuContainer.style.display = 'block';
    currentMenuItems = menuItems;

    menuItems.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'menu-btn';
        if (item.disabled) btn.disabled = true;
        
        btn.innerHTML = `<span class="btn-key">${item.key}</span> ${item.label}`;
        btn.onclick = (e) => {
            if (!isProcessingAction) {
                isProcessingAction = true;
                item.action();
            }
            e.preventDefault();
        };
        
        menuOptions.appendChild(btn);
    });
}

document.addEventListener('keydown', (e) => {
    if (menuContainer.style.display === 'block' && inputContainer.classList.contains('active') === false) {
        if (isProcessingAction) return; // Prevent action spam
        
        const key = e.key.toUpperCase();
        
        const matchingItem = currentMenuItems.find(item => 
            item.key.toUpperCase() === key && !item.disabled
        );
        
        if (matchingItem) {
            e.preventDefault();
            isProcessingAction = true;
            matchingItem.action();
        }
    }
});


submitBtn.onclick = () => {
    const val = inputField.value.trim();
    if (val && currentCallback && !isProcessingAction) {
        isProcessingAction = true;
        currentCallback(val);
    }
};

inputField.onkeydown = (e) => {
    if (e.key === 'Enter' && !isProcessingAction) {
        submitBtn.click();
    }
};

export { log, updateUI, showInput, showMenu };