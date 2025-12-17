export class Player {
    constructor(name) {
        this.name = name;
        this.level = 1;
        this.exp = 0;
        this.money = 100;
        this.stamina = 100;
        this.maxStamina = 100;
        this.health = 100;
        this.maxHealth = 100;
        this.attack = 50;
        this.defense = 30;
        this.speed = 5;
        this.maxSpeed = 15;
        this.luck = 0;
        this.maxLuck = 15;
        this.energy = 100;
        this.maxEnergy = 10;
        this.inventory = [];
        this.goldCoins = 0;
        this.bottleCaps = 0;
        this.gold = 0;
    }

    isAlive() {
        return this.health > 0;
    }

    rest() {
        this.stamina = this.maxStamina;
        this.energy = this.maxEnergy;
        this.health = this.maxHealth;
    }

    gainExp(amount) {
        this.exp += amount;
        let leveledUp = false;
        while (this.exp >= this.level * 20) {
            this.exp -= this.level * 20;
            this.level++;
            this.maxHealth += 10;
            this.maxStamina += 2;
            this.maxEnergy += 1;
            this.attack += 1;
            this.defense += 1;
            leveledUp = true;
        }
        return leveledUp ? `🎉 You reached Level ${this.level}!` : null;
    }
}
