import { Enemy } from '../classes/Enemy.js';

export function showScavengeMenu(player, UI, showMainMenu) {
    const scavenges = [
        { desc: 'Raid an abandoned shop', diff: 1, exp: 6, pay: 15 },
        { desc: 'Loot a derailed train', diff: 2, exp: 14, pay: 33 },
        { desc: 'Sneak into a zed nest', diff: 3, exp: 22, pay: 65 }
    ];

    UI.log('<br>📦 Scavenge Opportunities:', 'system');
    scavenges.forEach((s, i) => {
        UI.log(`[${i+1}] ${s.desc} (Difficulty: ${s.diff}, Reward: ${s.pay})`, 'system');
    });

    UI.showInput('Pick a scavenging mission (1-3, or 0 to cancel):', function(choice) {
        const idx = parseInt(choice) - 1;
        if (idx < 0 || idx >= scavenges.length) {
            showMainMenu();
            return;
        }

        const scavenge = scavenges[idx];
        if (player.energy < scavenge.diff) {
            UI.log('⚠️ Not enough energy!', 'warning');
            showMainMenu();
            return;
        }

        player.energy -= scavenge.diff;
        let odds = 0.5 + 0.05 * (player.level - scavenge.diff);
        odds = Math.max(0.2, Math.min(odds, 0.95));

        if (Math.random() < odds) {
            player.money += scavenge.pay;
            const levelMsg = player.gainExp(scavenge.exp);
            if (levelMsg) UI.log(levelMsg, 'success');
            UI.log(`✅ Success! You brought back ${scavenge.pay} scrap and ${scavenge.exp} EXP.`, 'success');
        } else {
            const wound = Math.floor(Math.random() * 16) + 5;
            player.health -= wound;
            UI.log(`❌ Expedition failed! You got hurt and lost ${wound} HP.`, 'warning');
            if (!player.isAlive()) {
                UI.log('💀 You collapsed from your wounds. You wake up at a survivor outpost and lose half your scrap.', 'warning');
                player.money = Math.floor(player.money / 2);
                player.rest();
            }
        }
        UI.updateUI(player);
        showMainMenu();
    });
}