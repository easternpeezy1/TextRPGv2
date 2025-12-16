function startCombat() {
    if (player.stamina < 2) {
        log('⚠️ Not enough stamina. Rest up!', 'warning');
        return;
    }
    player.stamina -= 2;
    updateUI();

    const enemyGen = enemyPool[Math.floor(Math.random() * enemyPool.length)];
    currentEnemy = enemyGen();

    const enemyIcon = currentEnemy.type === 'Zombie' ? '🧟' : '🔫';
    log(`<br>⚔️ You encountered a ${currentEnemy.type} threat: <strong>${currentEnemy.name}</strong> (Level ${currentEnemy.level})`, 'combat');
    log(`${enemyIcon} HP: ${currentEnemy.health}/${currentEnemy.maxHealth} | ATK: ${currentEnemy.attack} | DEF: ${currentEnemy.defense}`, 'combat');

    combatRound();
}

function combatRound() {
    if (!currentEnemy || !currentEnemy.isAlive() || !player.isAlive()) {
        endCombat();
        return;
    }

    log(`<br>Your HP: ${player.health}/${player.maxHealth} | Enemy HP: ${currentEnemy.health}/${currentEnemy.maxHealth}`, 'system');

    showMenu([
        { key: 'A', label: 'Attack', action: function() { combatAction('attack'); } },
        { key: 'H', label: 'Heal (+15 HP)', action: function() { combatAction('heal'); }, disabled: player.energy <= 0 },
        { key: 'R', label: 'Run', action: function() { combatAction('run'); } }
    ]);
}

function combatAction(action) {
    if (action === 'attack') {
        const dmg = Math.max(0, player.attack - currentEnemy.defense + Math.floor(Math.random() * 4));
        currentEnemy.health -= dmg;
        log(`⚔️ You strike the ${currentEnemy.type} for <strong>${dmg}</strong> damage!`, 'combat');
    } else if (action === 'heal') {
        const healAmount = Math.min(15, player.maxHealth - player.health);
        player.health += healAmount;
        player.energy -= 1;
        log(`💊 You use a first-aid item and recover ${healAmount} HP. (Energy: ${player.energy})`, 'success');
    } else if (action === 'run') {
        if (Math.random() < 0.6) {
            log('🏃 You slip away undetected!', 'success');
            updateUI();
            showMainMenu();
            return;
        } else {
            log('❌ The threat blocks your path!', 'warning');
        }
    }

    updateUI();

    if (currentEnemy.isAlive()) {
        const dmg = Math.max(0, currentEnemy.attack - player.defense + Math.floor(Math.random() * 3));
        player.health -= dmg;
        const enemyIcon = currentEnemy.type === 'Zombie' ? '🧟' : '🔫';
        log(`${enemyIcon} The ${currentEnemy.name} strikes for <strong>${dmg}</strong> damage!`, 'combat');
        updateUI();
    }

    setTimeout(combatRound, 500);
}

function endCombat() {
    if (!player.isAlive()) {
        log('💀 You were mortally wounded! You wake up at a survivor outpost and lose half your scrap.', 'warning');
        player.money = Math.floor(player.money / 2);
        player.rest();
    } else if (currentEnemy && !currentEnemy.isAlive()) {
        log(`✅ You defeated the ${currentEnemy.name}!`, 'success');
        player.money += currentEnemy.money;
        log(`💰 +${currentEnemy.money} scrap`, 'success');
        player.gainExp(currentEnemy.exp);
        
        if (currentEnemy.uniqueDrop && Math.random() < 0.05) {
            currentEnemy.uniqueDrop.effect(player);
            player.inventory.push(currentEnemy.uniqueDrop);
            log(`🌟 You got a special item: ${currentEnemy.uniqueDrop.name}!`, 'success');
        }
    }
    updateUI();
    currentEnemy = null;
    setTimeout(showMainMenu, 1000);
}
