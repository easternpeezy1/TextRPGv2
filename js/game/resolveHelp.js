
export function resolveHelp(player, encounter, UI, showMainMenu) {
    const roll = Math.random();
  
    if (roll < encounter.danger) {
      const damage = Math.floor(Math.random() * 6) + 3;
  
      player.health -= damage;
  
      UI.log(
        `<br>The situation turns hostile. You are injured while trying to help (-${damage} HP).`,
        "danger"
      );
  
      // FUTURE STATUS EFFECT HOOK
      // addStatus(player, "tired");
  
      if (player.health <= 0) {
        UI.log("💀 You collapse from your injuries.", "warning");
        player.rest();
      }
    } else {
      UI.log(
        `<br>The stranger accepts your help and disappears into the wastes.`,
        "success"
      );
    }
  
    UI.updateUI(player);
    setTimeout(showMainMenu, 1000);
  }