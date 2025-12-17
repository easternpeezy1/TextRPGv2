
export const statusEffectsList = {
    slow: { duration: 5, desc: "Slower movement and attacks" },
    dazed: { duration: 3, desc: "Confused and disoriented" },
    poisoned: { duration: 6, desc: "Taking damage over time" },
    radiationSickness: { duration: 10, desc: "Weakened by radiation" },
    unlucky: { duration: 8, desc: "Chance to fail actions" },
    tired: { duration: 4, desc: "Reduced effectiveness" },
    
    wellRested: { duration: 6, desc: "Increased damage and defense" },
    energized: { duration: 5, desc: "Faster actions and recovery" },
    anabolic: { duration: 4, desc: "Strength and HP boost" },
    enraged: { duration: 3, desc: "Increased attack power" }
  };
  
  export function addStatus(player, statusName) {
    if (!player.statusEffects) {
      player.statusEffects = [];
    }
  
    if (statusEffectsList[statusName]) {
      player.statusEffects.push({
        name: statusName,
        duration: statusEffectsList[statusName].duration
      });
      return true;
    }
    return false;
  }
  
  export function removeStatus(player, statusName) {
    if (player.statusEffects) {
      player.statusEffects = player.statusEffects.filter(s => s.name !== statusName);
    }
  }
  
  export function hasStatus(player, statusName) {
    if (!player.statusEffects) return false;
    return player.statusEffects.some(s => s.name === statusName);
  }
  
  export function getActiveStatuses(player) {
    return player.statusEffects || [];
  }
  
  export function tickStatusEffects(player) {
    if (!player.statusEffects) return;
    
    player.statusEffects.forEach(status => {
      status.duration--;
    });
  
    player.statusEffects = player.statusEffects.filter(s => s.duration > 0);
  }