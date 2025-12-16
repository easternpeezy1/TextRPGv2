import { UI } from '..ui/ui.js'
import { goldShopItems, traderItems, lotteryItems } from '../data/shops.js';
function showTraderMenu() {


    log('<br>🏪 Trader\'s Inventory:', 'system');
    items.forEach((item, i) => {
        log(`[${i+1}] ${item.name} - ${item.cost} (${item.desc})`, 'system');
    });

    showInput('Choose item to buy (1-' + items.length + ', or 0 to cancel):', function(choice) {
        const idx = parseInt(choice) - 1;
        if (idx < 0 || idx >= items.length) {
            showMainMenu();
            return;
        }

        const item = items[idx];
        if (player.money < item.cost) {
            log("Not enough scrap.", 'warning');
            showMainMenu();
            return;
        }

        player.money -= item.cost;
        item.effect(player);
        player.inventory.push(item.name);
        log(`You bought ${item.name}!`, 'success');
        updateUI();
        showMainMenu();
    });
}

function showGoldShop() {


    log(`<br>💎 Gold Coin Shop (You have ${player.goldCoins} GC)`, 'system');
    items.forEach((item, i) => {
        log(`[${i+1}] ${item.name} - ${item.price} GC (${item.desc})`, 'system');
    });

    showInput('Buy which item? (1-' + items.length + ', or 0 to cancel):', function(choice) {
        const idx = parseInt(choice) - 1;
        if (idx < 0 || idx >= items.length) {
            showMainMenu();
            return;
        }

        const item = items[idx];
        if (player.goldCoins < item.price) {
            log('Not enough Gold Coins.', 'warning');
            showMainMenu();
            return;
        }

        player.goldCoins -= item.price;
        player.inventory.push(item);
        if (item.effect) item.effect(player);
        log(`You acquired "${item.name}"!`, 'success');
        updateUI();
        showMainMenu();
    });
}

function showLottery() {
    log(`<br>🎰 Lottery (You have ${player.bottleCaps} Bottle Caps)`, 'system');
    log('[1] Buy Bottle Caps (5 Gold Coins each)', 'system');
    log('[2] Play Lottery (1 Bottle Cap per spin)', 'system');

    showInput('Choose option (1-2, or 0 to cancel):', function(choice) {
        if (choice === '1') {
            showInput('How many Bottle Caps to buy?', function(amt) {
                const amount = parseInt(amt);
                if (isNaN(amount) || amount <= 0) {
                    log('Invalid number.', 'warning');
                    showMainMenu();
                    return;
                }
                if (player.goldCoins < amount * 5) {
                    log('Not enough Gold Coins.', 'warning');
                    showMainMenu();
                    return;
                }
                player.goldCoins -= amount * 5;
                player.bottleCaps += amount;
                log(`Bought ${amount} Bottle Caps.`, 'success');
                updateUI();
                showMainMenu();
            });
        } else if (choice === '2') {
            if (player.bottleCaps <= 0) {
                log('No Bottle Caps!', 'warning');
                showMainMenu();
                return;
            }
            player.bottleCaps -= 1;
            const prizes = ['50 gold', '1 Gold Coin', 'Small Prize'];
            const prize = prizes[Math.floor(Math.random() * prizes.length)];
            if (prize === '50 gold') player.gold += 50;
            if (prize === '1 Gold Coin') player.goldCoins += 1;
            if (prize === 'Small Prize') player.money += 25;
            log(`🎰 You won: ${prize}!`, 'success');
            updateUI();
            showMainMenu();
        } else {
            showMainMenu();
        }
    });
}

