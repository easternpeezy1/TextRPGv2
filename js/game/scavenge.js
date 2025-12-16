function showScavengeMenu() {
    const scavenges = [
        { desc: 'Raid an abandoned shop', diff: 1, exp: 6, pay: 15 },
        { desc: 'Loot a derailed train', diff: 2, exp: 14, pay: 33 },
        { desc: 'Sneak into a zed nest', diff: 3, exp: 22, pay: 65 }
    ];

    log('<br>📦 Scavenge Opportunities:', 'system');
    scavenges.forEach((s, i) => {
        log(`[${i+1}] ${s.desc} (Difficulty: ${s.diff}, Reward: ${s.pay})`, 'system');
    });

    showInput('Pick a scavenging mission (1-3, or 0 to cancel):', function(choice) {
        const idx = parseInt(choice) - 1;
        if (idx < 0 || idx >= scavenges.length) {
            showMainMenu();
            return;
        }

        const scavenge = scavenges[idx];
        if (player.energy < scavenge.diff) {
            log('⚠️ Not enough energy!', 'warning');
            showMainMenu();
            return;
        }

        player.energy -= scavenge.diff;
        let odds = 0.5 + 0.05 * (player.level - scavenge.diff);
        odds = Math.max(0.2, Math.min(odds, 0.95));

        if (Math.random() < odds) {
            player.money += scavenge.pay;
            player.gainExp(scavenge.exp);
            log(`✅ Success! You brought back ${scavenge.pay} scrap and ${scavenge.exp} EXP.`, 'success');
        } else {
            const wound = Math.floor(Math.random() * 16) + 5;
            player.health -= wound;
            log(`❌ Expedition failed! You got hurt and lost ${wound} HP.`, 'warning');
            if (!player.isAlive()) {
                log('💀 You collapsed from your wounds. You wake up at a survivor outpost and lose half your scrap.', 'warning');
                player.money = Math.floor(player.money / 2);
                player.rest();
            }
        }
        updateUI();
        showMainMenu();
    });
}
