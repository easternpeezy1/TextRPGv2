        // Input handling
        function showInput(prompt, callback) {
            console.log('showInput called:', prompt);
            inputPrompt.textContent = prompt;
            inputContainer.classList.add('active');
            menuContainer.style.display = 'none';
            inputField.value = '';
            inputField.focus();
            
            currentCallback = callback;
            isInMenu = false;
        }

        function handleSubmit() {
            const value = inputField.value.trim();
            console.log('handleSubmit called, value:', value);
            
            if (value && currentCallback) {
                inputContainer.classList.remove('active');
                const cb = currentCallback;
                currentCallback = null;
                cb(value);
            }
        }

        // Event listeners
        submitBtn.onclick = function() {
            console.log('Submit button clicked');
            handleSubmit();
        };

        inputField.onkeydown = function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSubmit();
            }
        };

        // Save/Load System
        function saveGame() {
            try {
                const saveData = JSON.stringify(player);
                localStorage.setItem('apocalypseRPG_save', saveData);
                log('💾 Game saved successfully!', 'success');
            } catch (e) {
                log('❌ Failed to save game: ' + e.message, 'warning');
            }
            showMainMenu();
        }

        function loadGame() {
            try {
                const saveData = localStorage.getItem('apocalypseRPG_save');
                if (!saveData) {
                    log('❌ No saved game found!', 'warning');
                    showMainMenu();
                    return;
                }
                
                const loadedPlayer = JSON.parse(saveData);
                player = new Player(loadedPlayer.name);
                
                // Copy all properties
                Object.assign(player, loadedPlayer);
                
                updateUI();
                log('✅ Game loaded successfully!', 'success');
                log(`Welcome back, ${player.name}!`, 'success');
            } catch (e) {
                log('❌ Failed to load game: ' + e.message, 'warning');
            }
            showMainMenu();
        }

        function showMenu(options) {
            isInMenu = true;
            menuOptions.innerHTML = '';
            options.forEach((opt) => {
                const btn = document.createElement('button');
                btn.className = 'menu-btn';
                btn.innerHTML = `<span class="btn-key">${opt.key}</span>${opt.label}`;
                btn.onclick = opt.action;
                if (opt.disabled) btn.disabled = true;
                menuOptions.appendChild(btn);
            });
            menuContainer.style.display = 'block';
            
            // Add keyboard shortcuts for menu options
            document.onkeydown = function(e) {
                if (!isInMenu) return;
                const key = e.key.toLowerCase();
                for (let i = 0; i < options.length; i++) {
                    if (options[i].key.toLowerCase() === key && !options[i].disabled) {
                        options[i].action();
                        break;
                    }
                }
            };
        }

        function hideMenu() {
            isInMenu = false;
            document.onkeydown = null;
        }

        // Game functions
        function startGame() {
            console.log('startGame() called');
            showInput('Enter your survivor name:', function(name) {
                console.log('Name callback received:', name);
                player = new Player(name || 'Wanderer');
                log(`<strong>Welcome, ${player.name}!</strong> Your struggle for survival begins...`, 'success');
                updateUI();
                showMainMenu();
            });
        }

        function showMainMenu() {
            log('<br>--- Survivor Outpost ---', 'system');
            
            const menuItems = [
                { key: '1', label: 'Face a threat', action: startCombat, disabled: player.stamina < 2 },
                { key: '2', label: 'Scavenge for loot', action: showScavengeMenu },
                { key: '3', label: 'Pursue Boss', action: pursueBoss },
                { key: '4', label: 'Trade with merchant', action: showTraderMenu },
                { key: 'R', label: 'Rest', action: rest },
                { key: 'C', label: 'View Status', action: viewStatus },
                { key: 'S', label: 'Save Game', action: saveGame },
                { key: 'L', label: 'Load Game', action: loadGame },
                { key: 'G', label: 'Gold Shop', action: showGoldShop },
                { key: 'B', label: 'Lottery', action: showLottery }
            ];
            
            // Only add admin menu if player name is "Jared"
            if (player && player.name.toLowerCase() === 'jared') {
                menuItems.push({ key: '0', label: 'Admin Menu (Dev)', action: showAdminMenu });
            }
            
            showMenu(menuItems);
        }
        function showAdminMenu() {
            log('<br>🔧 <strong>Admin/Debug Menu</strong>', 'system');
            log('[1] Set Health', 'system');
            log('[2] Set Max Health', 'system');
            log('[3] Set Money', 'system');
            log('[4] Set Gold Coins', 'system');
            log('[5] Set Bottle Caps', 'system');
            log('[6] Set Level', 'system');
            log('[7] Set Stamina', 'system');
            log('[8] Set Max Stamina', 'system');
            log('[9] Set Energy', 'system');
            log('[A] Set Max Energy', 'system');
            log('[B] Set Attack', 'system');
            log('[C] Set Defense', 'system');
            log('[D] Set Luck', 'system');
            log('[E] Max All Stats', 'system');
            log('[0] Back to Main Menu', 'system');

            showInput('Choose option:', function(choice) {
                switch(choice.toLowerCase()) {
                    case '1':
                        showInput('Set health to:', function(val) {
                            player.health = Math.max(0, parseInt(val) || 0);
                            player.health = Math.min(player.health, player.maxHealth);
                            updateUI();
                            log('✅ Health updated!', 'success');
                            showAdminMenu();
                        });
                        break;
                    case '2':
                        showInput('Set max health to:', function(val) {
                            player.maxHealth = Math.max(1, parseInt(val) || 1);
                            updateUI();
                            log('✅ Max Health updated!', 'success');
                            showAdminMenu();
                        });
                        break;
                    case '3':
                        showInput('Set money to:', function(val) {
                            player.money = Math.max(0, parseInt(val) || 0);
                            updateUI();
                            log('✅ Money updated!', 'success');
                            showAdminMenu();
                        });
                        break;
                    case '4':
                        showInput('Set gold coins to:', function(val) {
                            player.goldCoins = Math.max(0, parseInt(val) || 0);
                            updateUI();
                            log('✅ Gold Coins updated!', 'success');
                            showAdminMenu();
                        });
                        break;
                    case '5':
                        showInput('Set bottle caps to:', function(val) {
                            player.bottleCaps = Math.max(0, parseInt(val) || 0);
                            updateUI();
                            log('✅ Bottle Caps updated!', 'success');
                            showAdminMenu();
                        });
                        break;
                    case '6':
                        showInput('Set level to:', function(val) {
                            player.level = Math.max(1, parseInt(val) || 1);
                            updateUI();
                            log('✅ Level updated!', 'success');
                            showAdminMenu();
                        });
                        break;
                    case '7':
                        showInput('Set stamina to:', function(val) {
                            player.stamina = Math.max(0, parseInt(val) || 0);
                            player.stamina = Math.min(player.stamina, player.maxStamina);
                            updateUI();
                            log('✅ Stamina updated!', 'success');
                            showAdminMenu();
                        });
                        break;
                    case '8':
                        showInput('Set max stamina to:', function(val) {
                            player.maxStamina = Math.max(1, parseInt(val) || 1);
                            updateUI();
                            log('✅ Max Stamina updated!', 'success');
                            showAdminMenu();
                        });
                        break;
                    case '9':
                        showInput('Set energy to:', function(val) {
                            player.energy = Math.max(0, parseInt(val) || 0);
                            player.energy = Math.min(player.energy, player.maxEnergy);
                            updateUI();
                            log('✅ Energy updated!', 'success');
                            showAdminMenu();
                        });
                        break;
                    case 'a':
                        showInput('Set max energy to:', function(val) {
                            player.maxEnergy = Math.max(1, parseInt(val) || 1);
                            updateUI();
                            log('✅ Max Energy updated!', 'success');
                            showAdminMenu();
                        });
                        break;
                    case 'b':
                        showInput('Set attack to:', function(val) {
                            player.attack = Math.max(0, parseInt(val) || 0);
                            updateUI();
                            log('✅ Attack updated!', 'success');
                            showAdminMenu();
                        });
                        break;
                    case 'c':
                        showInput('Set defense to:', function(val) {
                            player.defense = Math.max(0, parseInt(val) || 0);
                            updateUI();
                            log('✅ Defense updated!', 'success');
                            showAdminMenu();
                        });
                        break;
                    case 'd':
                        showInput('Set luck to:', function(val) {
                            player.luck = Math.max(0, parseInt(val) || 0);
                            updateUI();
                            log('✅ Luck updated!', 'success');
                            showAdminMenu();
                        });
                        break;
                    case 'e':
                        player.health = player.maxHealth;
                        player.stamina = player.maxStamina;
                        player.energy = player.maxEnergy;
                        updateUI();
                        log('✅ All stats maxed!', 'success');
                        showAdminMenu();
                        break;
                    case '0':
                        showMainMenu();
                        break;
                    default:
                        showAdminMenu();
                }
            });
        }

        function rest() {
            player.rest();
            log('💤 You rest and recover your strength.', 'success');
            updateUI();
            showMainMenu();
        }

        function viewStatus() {
            log('<br>📊 <strong>CHARACTER STATUS</strong>', 'system');
            log(`Name: ${player.name} | Level: ${player.level}`, 'system');
            log(`Health: ${player.health}/${player.maxHealth}`, 'system');
            log(`Stamina: ${player.stamina}/${player.maxStamina}`, 'system');
            log(`Energy: ${player.energy}/${player.maxEnergy}`, 'system');
            log(`Attack: ${player.attack} | Defense: ${player.defense} | Luck: ${player.luck}`, 'system');
            log(`Scrap: ${player.money} | Gold Coins: ${player.goldCoins} | Bottle Caps: ${player.bottleCaps}`, 'system');
            log(`EXP: ${player.exp}/${player.level * 20}`, 'system');
            if (player.inventory.length > 0) {
                log(`Inventory: ${player.inventory.map(function(i) { return typeof i === 'string' ? i : i.name; }).join(', ')}`, 'system');
            } else {
                log('Inventory: Empty', 'system');
            }
            showMainMenu();
        }

        console.log('About to call startGame()');
        startGame();
        console.log('startGame() has been called');
