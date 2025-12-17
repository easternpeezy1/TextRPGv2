# ⚠️ Apocalypse RPG - Survive the Wasteland

A text-based survival RPG built with Electron where you fight zombies, bandits, and bosses in a post-apocalyptic world.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Electron](https://img.shields.io/badge/electron-39.2.7-green)
![License](https://img.shields.io/badge/license-MIT-orange)

## 🎮 Game Features

- **Turn-Based Combat** - Face zombies, bandits, and powerful bosses
- **Character Progression** - Level up and improve your stats
- **Scavenging System** - Risk expeditions for rewards
- **Economy System** - Multiple currencies (Scrap, Gold Coins, Bottle Caps)
- **Shopping** - Buy weapons, armor, and items from merchants
- **Lottery System** - Test your luck for rare prizes
- **Save/Load System** - Continue your survival journey
- **Boss Battles** - Take on legendary enemies for unique loot

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/easternpeezy1/TextRPGv2.git

# Navigate to the project directory
cd TextRPGv2

# Install dependencies
npm install

# Start the game
npm start
```

## 🎯 How to Play

### Main Menu Options

- **[1] Face a Threat** - Combat random enemies (costs 2 stamina)
- **[2] Scavenge for Loot** - Risk expeditions for scrap and EXP
- **[3] Pursue Boss** - Challenge powerful bosses (Level 5+ required)
- **[4] Trade with Merchant** - Buy weapons and items with scrap
- **[R] Rest** - Restore health, stamina, and energy
- **[C] View Status** - Check your character stats
- **[S] Save Game** - Save your progress
- **[L] Load Game** - Load saved game
- **[G] Gold Shop** - Buy premium items with Gold Coins
- **[B] Lottery** - Spend Bottle Caps for prizes

### Combat System

During combat, you can:
- **[A] Attack** - Deal damage to enemies
- **[H] Heal** - Restore 15 HP (costs 1 energy)
- **[R] Run** - Attempt to flee (60% success rate)

### Stats Explained

- **Health** - Your life points
- **Stamina** - Required for combat encounters
- **Energy** - Used for healing and special actions
- **Attack** - Damage dealt to enemies
- **Defense** - Reduces damage taken
- **Luck** - Affects critical hits and loot drops
- **EXP** - Gain experience to level up (20 per level)

## 🛠️ Building the Game

### Build for Windows

```bash
npm run build-win
```

### Build for macOS

```bash
npm run build-mac
```

### Build for Linux

```bash
npm run build-linux
```

Executables will be created in the `dist` folder.

## 📁 Project Structure

```
TextRPGv2/
├── index.html           # Main HTML interface
├── main.js             # Electron main process
├── renderer.js         # Game initialization and main menu
├── package.json        # Project configuration
├── css/
│   └── styles.css      # Game styling
└── js/
    ├── classes/
    │   ├── Player.js   # Player class and methods
    │   └── Enemy.js    # Enemy and Boss classes
    ├── data/
    │   └── shops.js    # Shop inventories
    ├── game/
    │   ├── combat.js   # Combat system
    │   ├── scavenge.js # Scavenging mechanics
    │   └── shops.js    # Shop interactions
    └── ui/
        └── ui.js       # UI helper functions
```

## 🐛 Known Issues

- Save data is stored in localStorage (cleared when cache is cleared)
- Boss battles may be challenging for low-level characters
- Lottery odds are random and may vary

## 🔮 Future Plans

- [ ] More enemy types and bosses
- [ ] Quest system
- [ ] Crafting mechanics
- [ ] Multiplayer support
- [ ] Cloud save system
- [ ] Achievement system
- [ ] More locations to explore

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**easternpeezy1**

- GitHub: [@easternpeezy1](https://github.com/easternpeezy1)

## 🙏 Acknowledgments

- Built with [Electron](https://www.electronjs.org/)
- Inspired by classic text-based RPGs
- Special thanks to all contributors

## 📧 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check existing issues for solutions

---

**Survive the wasteland. Build your legend. Become the ultimate survivor.** ⚔️🧟‍♂️

*Made with ❤️ by easternpeezy1*
