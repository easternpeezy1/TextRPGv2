// js/game/rooms/roomHandler.js

import { roomContents } from './roomData.js';

export class RoomNavigator {
    constructor(player, UI, showMainMenu) {
        this.player = player;
        this.UI = UI;
        this.showMainMenu = showMainMenu;
        this.currentRoom = 0;
        this.rooms = [];
    }

displayRoom(room) {
    this.UI.log(`<br>--- ROOM ${room.id} ---`, 'system');
    this.UI.log('Four paths lay before you...', 'system');
    
    const choices = room.slots.map((slot, idx) => ({
        key: String(idx + 1),
        label: slot.revealed 
        ? `${roomContents[slot.type].icon} ${roomContents[slot.type].name}`
        : '❓ Unknown',
        action: () => this.selectSlot(room, idx)
    }));

    choices.push({
        key: 'B',
        label: 'Back to Outpost',
        action: () => this.showMainMenu()
    });

    this.UI.showMenu(choices);
}

selectSlot(room, slotIndex) {
    const slot = room.slots[slotIndex];
    slot.revealed = true;
    
    const content = roomContents[slot.type];
    this.UI.log(`<br>You discover: ${content.icon} ${content.name}`, 'event');
    
    this.handleContent(slot.type, room);
}

handleContent(type, room) {
    switch(type) {
        case 'ENEMY':
        this.UI.log('An enemy blocks your path!', 'danger');

        break;
        case 'BOSS':
        this.UI.log('A powerful boss emerges!', 'danger');

        break;
        case 'LOOT':
        this.UI.log('Valuable supplies found!', 'success');

        break;
        case 'BONFIRE':
        this.UI.log('A warm bonfire. You rest...', 'success');
        this.player.rest();
        break;
        case 'STRANGER':
        this.UI.log('Someone approaches...', 'event');

        break;
        case 'HAZARD':
        this.UI.log('Dangerous radiation detected!', 'danger');

        break;
        case 'EVENT':
        this.UI.log('Something unexpected happens...', 'event');

        break;
        case 'MERCHANT':
        this.UI.log('A merchant appears!', 'system');

        break;
        case 'EMPTY':
        this.UI.log('Nothing here. You move on.', 'system');
        break;
    }
    

    setTimeout(() => this.moveToNextRoom(room), 2000);
}

moveToNextRoom(currentRoom) {
    if (currentRoom.id < this.rooms.length) {
        this.displayRoom(this.rooms[currentRoom.id]);
    } else {
        this.UI.log('<br>You have cleared the wasteland... for now.', 'system');
        this.showMainMenu();
    }
    }
}