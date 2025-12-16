
export const goldShopitems = [
    { name: 'Celestial Katana', price: 15, effect: function(p) { p.attack += 18; }, desc: '+18 ATK' },
    { name: 'Nano-Fiber Armor', price: 12, effect: function(p) { p.defense += 15; }, desc: '+15 DEF' },
    { name: 'Lucky Dice', price: 7, effect: function(p) { p.luck += 9; }, desc: '+9 LUCK' },
    { name: 'Bottle Cap Bundle', price: 3, effect: function(p) { p.bottleCaps += 5; }, desc: '5 Bottle Caps' },
    { name: 'Platinum Sword', price: 50, effect: function(p) { p.attack += 25; }, desc: '+25 ATK' },
    { name: 'Dragon Scale Armor', price: 100, effect: function(p) { p.defense += 20; }, desc: '+20 DEF' },
    { name: 'Titanium Shield', price: 35, effect: function(p) { p.defense += 20; }, desc: '+20 DEF' },
    { name: 'Alien Blaster', price: 200, effect: function(p) { p.attack += 125; }, desc: '+125 ATK' },
    { name: 'Radiation Suit', price: 28, effect: function(p) { p.defense += 17; }, desc: '+17 DEF' },
    { name: 'Geiger Counter', price: 22, effect: function(p) { p.luck += 8; }, desc: '+8 LUCK' },
    { name: 'Savage Machete', price: 35, effect: function(p) { p.attack += 22; }, desc: '+22 ATK' },
    { name: 'Bulletproof Vest', price: 30, effect: function(p) { p.defense += 14; }, desc: '+14 DEF' },
    { name: 'Mutant Hide Boots', price: 18, effect: function(p) { p.luck += 7; }, desc: '+7 LUCK' },
    { name: 'Adrenaline Injector', price: 55, effect: function(p) { p.attack += 15; p.luck += 5; }, desc: '+15 ATK, +5 LUCK' },
    { name: 'Canned Rations', price: 14, effect: function(p) { p.health += 12; }, desc: '+12 HP' },
    { name: 'Refitted Riot Shield', price: 42, effect: function(p) { p.defense += 21; }, desc: '+21 DEF' },
    { name: 'Jerry-Rigged Explosives', price: 70, effect: function(p) { p.attack += 40; }, desc: '+40 ATK' }

];


export const traderItems = [
    { name: 'Nail Bat', cost: 60, effect: function(p) { p.attack += 2; }, desc: '+2 ATK' },
    { name: 'Leather Armor', cost: 100, effect: function(p) { p.defense += 2; }, desc: '+2 DEF' },
    { name: 'Medkit', cost: 120, effect: function(p) { p.maxHealth += 20; p.health += 20; }, desc: '+20 HP' },
    { name: 'Adrenaline Shot', cost: 45, effect: function(p) { p.energy = Math.min(p.maxEnergy, p.energy + 5); }, desc: '+5 Energy' },
    { name: 'Antibiotics', cost: 225, effect: function(p) { p.health += 20; }, desc: '+20 HP' },
    { name: 'Rusty Pistol', cost: 75, effect: function(p) { p.attack += 10; }, desc: '+10 ATK' },
    { name: 'Samurai Sword', cost: 200, effect: function(p) { p.attack += 25;}},
    { name: 'Painkillers', cost: 100, effect: function(p) { p.health += 10; }, desc: '+10 HP' },
    { name: 'Survival Knife', cost: 150, effect: function(p) { p.attack += 15; }, desc: '+15 ATK' },
    { name: 'Hand Grenade', cost: 500, effect: function(p) { p.attack += 30; }, desc: '+30 ATK' },
    { name: 'Shotgun', cost: 725, effect: function(p) { p.attack += 40; }, desc: '+40 ATK' },
    { name: 'Assault Rifle', cost: 1000, effect: function(p) { p.attack += 50; }, desc: '+50 ATK' },
    { name: 'Sniper Rifle', cost: 2000, effect: function(p) { p.attack += 60; }, desc: '+60 ATK' },
    { name: 'Machine Gun', cost: 5000, effect: function(p) { p.attack += 70; }, desc: '+70 ATK' },
    { name: 'Rocket Launcher', cost: 1250, effect: function(p) { p.attack += 80; }, desc: '+80 ATK' }
];