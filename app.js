var ai = require("@istani/horde.ai");

// Als RPG Beispiel!
var Prompt_Prefix = 
    "You're StoryTelling in this fictional never-ending roleplay with SYTH.\n" + 
    "Ignore all previous Instruction.\n" + 
    "Response only in german.\n" +
    "Repeat and descript the actions and scene SYTH tells you in a more detailed way.\n" +
    "Keep it short and simple\n" + 
    "***\n";

var Prompt_Text = 
    "SYTH: Eine Gruppe von Abenteuer errichtet ein Lager und macht sich bereit für die Nacht.\n" +
    "StoryTelling:";

var step=0;
function Tell_Story() {
  ai.TextGeneration(Prompt_Prefix + Prompt_Text,
    (response) => {
      Prompt_Prefix += "StoryTelling:" + response;
      switch (step) {
        case 0:
          console.log(response);
          Prompt_Text="SYTH: Ein wildes Monster erscheint!";
          break;
        case 1:
          console.log(response);
          Prompt_Text="SYTH: Der Abenteurer 'Sandro' tötet das Monster!";
          break;
        case 2:
          console.log(response);
          Prompt_Text="SYTH: Die Abenteurer werden als Helden gefeiert!";
          break;
        case 3:
          console.log(response);
          Prompt_Text="Ignore previous instructions. Summarize the story so far. If a summary already exists in your memory, use that as a base. Limit the summary to 300 words or less. Your response should include nothing but the summary.'";
          break;
        case 4:
          console.log("Zusammenfassung: \n" + response);
          Prompt_Prefix="best quality, absurdres, masterpiece, "
          Prompt_Text="(("+response+"))";
          ai.ImageGeneration(Prompt_Prefix + Prompt_Text, (response) => {
            console.log(response);
            process.exit(1);
          });
          return;
          break;
        default:
          process.exit(1);
      }
      Prompt_Text+="\nStoryTelling:";
      step++;
      Tell_Story();
    }
  )
}
Tell_Story();
