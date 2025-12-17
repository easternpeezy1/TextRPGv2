import { Enemy } from '../classes/Enemy.js';
export function startCombat(player, UI, showMainMenu, presetEnemy = null) {
    if (player.stamina < 2) {
        UI.log('⚠️ Not enough stamina. Rest up!', 'warning');
        return;
    }
    player.stamina -= 2;
    UI.updateUI(player);

    let currentEnemy = presetEnemy;
    if (!currentEnemy) {
        const enemyFuncs = [
            () => new Enemy('Zombie', 'Shambler', 1, 18, 10),
            () => new Enemy('Human', 'Scav Raider', 2, 28, 14),
            () => new Enemy('Zombie', 'Feral Ghoul', 2, 30, 18),
            () => new Enemy('Human', 'Bandit Gunner', 3, 55, 28),
            () => new Enemy('Zombie', 'Rotting Brute', 4, 70, 40),
            () => new Enemy('Human', 'Warlord', 5, 110, 65),
            () => new Enemy('Zombie', 'Mutated Horror', 6, 180, 85)
        ];
        const enemyGen = enemyFuncs[Math.floor(Math.random() * enemyFuncs.length)];
        currentEnemy = enemyGen();
    }

    const enemyIcon = currentEnemy.type === 'Zombie' ? '🧟' : '🔫';
    UI.log(`<br>⚔️ You encountered a ${currentEnemy.type} threat: <strong>${currentEnemy.name}</strong> (Level ${currentEnemy.level})`, 'combat');
    UI.log(`${enemyIcon} HP: ${currentEnemy.health}/${currentEnemy.maxHealth} | ATK: ${currentEnemy.attack} | DEF: ${currentEnemy.defense}`, 'combat');

    function combatRound() {
        if (!currentEnemy || !currentEnemy.isAlive() || !player.isAlive()) {
            endCombat();
            return;
        }

        UI.log(`<br>Your HP: ${player.health}/${player.maxHealth} | Enemy HP: ${currentEnemy.health}/${currentEnemy.maxHealth}`, 'system');

        UI.showMenu([
            { key: 'A', label: 'Attack', action: () => combatAction('attack') },
            { key: 'H', label: 'Heal (+15 HP)', action: () => combatAction('heal'), disabled: player.energy <= 0 },
            { key: 'R', label: 'Run', action: () => combatAction('run') }
        ]);
    }

    function combatAction(action) {
        if (action === 'attack') {
            const dmg = Math.max(0, player.attack - currentEnemy.defense + Math.floor(Math.random() * 4));
            currentEnemy.health -= dmg;
            UI.log(`⚔️ You strike the ${currentEnemy.type} for <strong>${dmg}</strong> damage!`, 'combat');
        } else if (action === 'heal') {
            const healAmount = Math.min(15, player.maxHealth - player.health);
            player.health += healAmount;
            player.energy -= 1;
            UI.log(`🏥 You use a first-aid item and recover ${healAmount} HP. (Energy: ${player.energy})`, 'success');
        } else if (action === 'run') {
            if (Math.random() < 0.6) {
                UI.log('🏃 You slip away undetected!', 'success');
                UI.updateUI(player);
                showMainMenu();
                return;
            } else {
                UI.log('❌ The threat blocks your path!', 'warning');
            }
        }

        UI.updateUI(player);

        if (currentEnemy.isAlive()) {
            const dmg = Math.max(0, currentEnemy.attack - player.defense + Math.floor(Math.random() * 3));
            player.health -= dmg;
            const enemyIcon = currentEnemy.type === 'Zombie' ? '🧟' : '🔫';
            UI.log(`${enemyIcon} The ${currentEnemy.name} strikes for <strong>${dmg}</strong> damage!`, 'combat');
            UI.updateUI(player);
        }

        setTimeout(combatRound, 500);
    }

    function endCombat() {
        if (!player.isAlive()) {
            UI.log('💀 You were mortally wounded! You wake up at a survivor outpost and lose half your scrap.', 'warning');
            player.money = Math.floor(player.money / 2);
            player.rest();
        } else if (currentEnemy && !currentEnemy.isAlive()) {
            UI.log(`✅ You defeated the ${currentEnemy.name}!`, 'success');
            player.money += currentEnemy.money;
            UI.log(`💰 +${currentEnemy.money} scrap`, 'success');
            player.gainExp(currentEnemy.exp);
        }
        UI.updateUI(player);
        setTimeout(showMainMenu, 1000);
    }

    combatRound();
}