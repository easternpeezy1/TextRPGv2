function pursueBoss() {
    if (player.level < 5) {
        log('⚠️ You need to be at least level 5 to pursue a boss!', 'warning');
        showMainMenu();
        return;
    }
    
    log('<br>🎯 Choose a boss to pursue:', 'system');
    bossPool.forEach((boss, i) => {
        log(`[${i+1}] ${boss.name} (Level ${boss.level}) - ${boss.uniqueDrop.name}`, 'system');
    });
    
    showInput('Choose boss (1-' + bossPool.length + ', or 0 to cancel):', function(choice) {
        const idx = parseInt(choice) - 1;
        if (idx < 0 || idx >= bossPool.length) {
            showMainMenu();
            return;
        }
        
        currentEnemy = bossPool[idx];
        log(`<br>💀 You face the fearsome ${currentEnemy.name}!`, 'combat');
        log(`Boss HP: ${currentEnemy.health} | ATK: ${currentEnemy.attack} | DEF: ${currentEnemy.defense}`, 'combat');
        combatRound();
    });
}

