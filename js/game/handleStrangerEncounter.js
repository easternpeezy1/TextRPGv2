
import { strangerEncounters } from './strangers.js';
import { resolveHelp } from './resolveHelp.js';

export function handleStrangerEncounter(player, UI, showMainMenu) {
  const encounter = strangerEncounters[Math.floor(Math.random() * strangerEncounters.length)];

  UI.log(`<br>${encounter.text}`, "event");
  UI.log("Do you approach the stranger?", "choice");

  UI.showMenu([
    {
      key: '1',
      label: "Approach / Help",
      action: () => resolveHelp(player, encounter, UI, showMainMenu)
    },
    {
      key: '2',
      label: "Run Away",
      action: () => {
        UI.log("You decide not to risk it and move on.", "system");
        UI.updateUI(player);
        showMainMenu();
      }
    }
  ]);
}