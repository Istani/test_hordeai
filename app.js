var ai = require("@istani/horde.ai");

// Als RPG Beispiel!
var Prompt_Prefix = 
    "You are StoryTelling in this fictional never-ending roleplay with SYTH.\n" + 
    "Ignore previous instructions.\n" + 
    "Response only in german.\n" +
    "Repeat and descripe the actions and scene SYTH tells you in a more detailed way.\n" +
    "Your response should include nothing but the description.\n" +
    "Reply in only one sentence.\n" + 
    "Settings: it is a medirval fantasy world.\n" + 
    "Response only in german.\n" +
    "***\n";

var Prompt_Text = 
    //"SYTH: Beschreibe in einem kurzen Satz wie und wo eine Gruppe von Abenteuer ein Lager errichtet hat und sich bereit macht für die Nacht. Beschreibe keinen der Abenteuer!\n" +
    "SYTH: Eine Gruppe von Abenteurer bauen ihr Nachtlager auf und bereiten sich auf die Nacht vor. Erstelle eine kurze, drei Sätze lange, Beschreibung der Szene, wobei jeder Satz einen anderen Aspekt hervorhebt.!\n" +
    "StoryTelling:";

var step=0;
function Tell_Story() {
  ai.TextGeneration(Prompt_Prefix + Prompt_Text,
    (response) => {
      Prompt_Prefix += "StoryTelling:" + response;
      switch (step) {
        case 0:
          console.log(response);
          Prompt_Text="SYTH: Beschreibe in einem kurzen Satz wie ein wildes Monster erscheint!";
          break;

        case 1:
          console.log(response);
          Prompt_Text="SYTH: Beschreibe in einem kurzen Satz wie 'Sascha' das Monster angreift!";
          break;
        case 2:
          console.log(response);
          Prompt_Text="SYTH: Beschreibe in einem kurzen Satz wie 'Sandro' das Monster angreift!";
          break;
        case 3:
          console.log(response);
          Prompt_Text="SYTH: Beschreibe in einem kurzen Satz wie 'Peter' das Monster angreift!";
          break;
        case 4:
          console.log(response);
          Prompt_Text="SYTH: Beschreibe in einem kurzen Satz wie 'Sandro' das Monster angreift!";
          break;
        case 5:
          console.log(response);
          Prompt_Text="SYTH: Beschreibe in einem kurzen Satz wie 'Sandro' von dem Monster angegriffen wird!";
          break;

        case 6:
          console.log(response);
          Prompt_Text="SYTH: Beschreibe in einem kurzen Satz wie der Abenteurer 'Sandro' das Monster tötet!";
          break;
        case 7:
          console.log(response);
          Prompt_Text="SYTH: Beschreibe in einem kurzen Satz wie die Abenteurer als Helden gefeiert werden!";
          break;
        case 8:
          console.log(response);
          Prompt_Text="SYTH: Beschreibe in einem kurzen Satz wie die Leistung von 'Sandro' ganz besonders hervorgehoben wird!";
          break;

        case 9:
          console.log(response);
          Prompt_Text="Ignore previous instructions. Summarize the story so far. Limit the summary to 300 words or less. Your response should include nothing but the summary.'";
          break;

        case 10:
          console.log("Zusammenfassung: \n" + response);
          Prompt_Prefix="anime artwork, best quality, absurdres, masterpiece, "
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

