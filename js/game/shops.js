
import { goldShopItems, traderItems, lotteryItems } from '../data/shops.js';

export function showTraderMenu(player, UI, showMainMenu) {
    UI.log('<br>🛒 Trader\'s Inventory:', 'system');
    traderItems.forEach((item, i) => {
        UI.log(`[${i+1}] ${item.name} - ${item.cost} scrap (${item.desc})`, 'system');
    });

    UI.showInput('Choose item to buy (1-' + traderItems.length + ', or 0 to cancel):', function(choice) {
        const idx = parseInt(choice) - 1;
        if (idx < 0 || idx >= traderItems.length) {
            showMainMenu();
            return;
        }

        const item = traderItems[idx];
        if (player.money < item.cost) {
            UI.log("Not enough scrap.", 'warning');
            showMainMenu();
            return;
        }

        player.money -= item.cost;
        item.effect(player);
        player.inventory.push(item.name);
        UI.log(`You bought ${item.name}!`, 'success');
        UI.updateUI(player);
        showMainMenu();
    });
}

export function showGoldShop(player, UI, showMainMenu) {
    UI.log(`<br>💎 Gold Coin Shop (You have ${player.goldCoins} GC)`, 'system');
    goldShopItems.forEach((item, i) => {
        UI.log(`[${i+1}] ${item.name} - ${item.price} GC (${item.desc})`, 'system');
    });

    UI.showInput('Buy which item? (1-' + goldShopItems.length + ', or 0 to cancel):', function(choice) {
        const idx = parseInt(choice) - 1;
        if (idx < 0 || idx >= goldShopItems.length) {
            showMainMenu();
            return;
        }

        const item = goldShopItems[idx];
        if (player.goldCoins < item.price) {
            UI.log('Not enough Gold Coins.', 'warning');
            showMainMenu();
            return;
        }

        player.goldCoins -= item.price;
        player.inventory.push(item);
        if (item.effect) item.effect(player);
        UI.log(`You acquired "${item.name}"!`, 'success');
        UI.updateUI(player);
        showMainMenu();
    });
}

export function showLottery(player, UI, showMainMenu) {
    UI.log(`<br>🎰 Lottery (You have ${player.bottleCaps} Bottle Caps)`, 'system');
    UI.log('[1] Buy Bottle Caps (5 Gold Coins each)', 'system');
    UI.log('[2] Play Lottery (1 Bottle Cap per spin)', 'system');

    UI.showInput('Choose option (1-2, or 0 to cancel):', function(choice) {
        if (choice === '1') {
            UI.showInput('How many Bottle Caps to buy?', function(amt) {
                const amount = parseInt(amt);
                if (isNaN(amount) || amount <= 0) {
                    UI.log('Invalid number.', 'warning');
                    showMainMenu();
                    return;
                }
                if (player.goldCoins < amount * 5) {
                    UI.log('Not enough Gold Coins.', 'warning');
                    showMainMenu();
                    return;
                }
                player.goldCoins -= amount * 5;
                player.bottleCaps += amount;
                UI.log(`Bought ${amount} Bottle Caps.`, 'success');
                UI.updateUI(player);
                showMainMenu();
            });
        } else if (choice === '2') {
            if (player.bottleCaps <= 0) {
                UI.log('No Bottle Caps!', 'warning');
                showMainMenu();
                return;
            }
            player.bottleCaps -= 1;
            const prize = lotteryItems[Math.floor(Math.random() * lotteryItems.length)];
            if (prize.effect) prize.effect(player);
            UI.log(`🎰 You won: ${prize.name}!`, 'success');
            UI.updateUI(player);
            showMainMenu();
        } else {
            showMainMenu();
        }
    });
}