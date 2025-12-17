
export const roomContents = {
    ENEMY: { icon: "🧟", name: "Enemy", danger: true },
    BOSS: { icon: "👹", name: "Boss", danger: true },
    LOOT: { icon: "🎁", name: "Loot Cache", danger: false },
    BONFIRE: { icon: "🔥", name: "Bonfire", danger: false },
    STRANGER: { icon: "🚶", name: "Stranger", danger: false },
    HAZARD: { icon: "☢️", name: "Radiation", danger: true },
    EVENT: { icon: "⚡", name: "Event", danger: false },
    MERCHANT: { icon: "🛒", name: "Merchant", danger: false },
    EMPTY: { icon: "◇", name: "Empty", danger: false }
};  
export const rooms = [
    {
        id: 1,
        contents: [
        { type: 'ENEMY', data: null },
        { type: 'LOOT', data: null },
        { type: 'HAZARD', data: null },
        { type: 'EMPTY', data: null }
        ],
        completed: false
    },
    // ... more rooms
];