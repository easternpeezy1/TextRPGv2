export class Enemy {
    constructor(type, name, level, money, exp) {
        this.type = type;
        this.name = name;
        this.level = level;
        this.attack = 3 + level * 2 + (type === 'Zombie' ? 1 : 0);
        this.defense = 2 + level + (type === 'Human' ? 1 : 0);
        this.maxHealth = 30 + level * 18 + (type === 'Zombie' ? 10 : 0);
        this.health = this.maxHealth;
        this.money = money;
        this.exp = exp;
    }

    isAlive() {
        return this.health > 0;
    }
}


export class Boss extends Enemy {
    constructor(name, level, money, exp, uniqueDrop) {
        super('Boss', name, level, money, exp);
        this.health = this.maxHealth * 3; // Bosses have 3x health
        this.maxHealth = this.health;
        this.attack = this.attack * 1.5;
        this.uniqueDrop = uniqueDrop;
    }
}

export const enemyPool = [
    () => new Enemy('Zombie', 'Shambler', 1, 18, 10),
    () => new Enemy('Human', 'Scav Raider', 2, 28, 14),
    () => new Enemy('Zombie', 'Feral Ghoul', 2, 30, 18),
    () => new Enemy('Human', 'Bandit Gunner', 3, 55, 28),
    () => new Enemy('Zombie', 'Rotting Brute', 4, 70, 40),
    () => new Enemy('Human', 'Warlord', 5, 110, 65),
    () => new Enemy('Zombie', 'Mutated Horror', 6, 180, 85)
];

export const bossPool = [
    new Boss('Zombie King', 10, 500, 200, { name: 'Crown of the Undead', effect: function(p) { p.defense += 10; p.luck += 5; } }),
    new Boss('Bandit Lord', 12, 600, 250, { name: 'Warlord\'s Blade', effect: function(p) { p.attack += 15; } }),
    new Boss('Mutant Abomination', 15, 800, 350, { name: 'Toxic Armor', effect: function(p) { p.defense += 20; p.maxHealth += 50; } })
];
