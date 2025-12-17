import { roomContents } from './roomData.js';

export function generateRooms(count = 10) {
    const rooms = [];

    for (let i = 0; i < count; i++) {
    const roomSlots = generateRoomSlots(4); // 4 choices per room
    rooms.push({
        id: i + 1,
        slots: roomSlots,
        discovered: false,
        visited: false
    });
}  
return rooms;
}

function generateRoomSlots(slotCount) {
    const slots = [];
    const contentTypes = Object.keys(roomContents);

    for (let i = 0; i < slotCount; i++) {
    const randomType = contentTypes[Math.floor(Math.random() * contentTypes.length)];
    slots.push({
        type: randomType,
        explored: false,
        revealed: false
    });
}  
return slots;
}

export function revealRoom(rooms, roomIndex) {
rooms[roomIndex].discovered = true;
    return rooms;
}