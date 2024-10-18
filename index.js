const { AIHorde } = require("@zeldafan0225/ai_horde");

/*
Create new instance of the ai_horde class to communicate with the rest API
You can configure which cache should contain the data for what time
You can also configure at what interval the cache is checking if there are any data that should be deleted

The class also takes a default token. This is helpful if you want to use this package only using your own token.
The token is not a required argument in any method.

A default API route is also in the contrictor for changing where the requests are directed to (e.g. when using a subdomain like https://test.aihorde.net)
*/
const ai_horde = new AIHorde({
  cache_interval: 1000 * 10,
  cache: {
    generations_check: 1000 * 30,
  },
  client_agent: "@Istani:v0.0.1:DEV_Test"
});

// # Schau mal https://www.aiscribbles.com/generate/ ?
// Aber eigentlich geht es ja ursprünglich um Text

var gen_id="";
async function test() {
  if (gen_id=="") {
    // start the generation of an image with the given payload
    const generation = await ai_horde.postAsyncImageGenerate({
      prompt: "Anime, looking at a girl on the other side of the room, laying on her bed, red shoulder long hair, blue colored eyes",
      params: {
        nsfw: false
      }
    });
    console.log(JSON.stringify(generation));

    gen_id=generation.id;
    setTimeout(test, 5000);
    return;
  }
  

  // check the status of your generation using the generations id
  var check = await ai_horde.getImageGenerationCheck(gen_id);
  console.log(JSON.stringify(check));

  if (check.done == false) {
    if (check.wait_time==0) {
      setTimeout(test, 5000);
      return;
    }
    setTimeout(test, 1000*(check.wait_time/10));
    return;
  }

  var check = await ai_horde.getImageGenerationStatus(gen_id);
  console.log(JSON.stringify(check));
  console.log("url: " + check.generations[0].img);
  gen_id="";

  console.log("DONE!");

}
test();

async function test2() {
  if (gen_id=="") {
    // start the generation of an image with the given payload
    const generation = await ai_horde.postAsyncTextGenerate({
      prompt: "Tell me a Joke",
      params: {
        nsfw: true,
      }
    });
    //console.log(generation);

    gen_id=generation.id;
    console.log(gen_id);
  }
  

  // check the status of your generation using the generations id
  var check = await ai_horde.getTextGenerationStatus(gen_id);
  console.log("wait: " + check.wait_time);

  if (check.done == false) {
    setTimeout(test2, 1000*(check.wait_time/10));
    return;
  }

  var check = await ai_horde.getTextGenerationStatus(gen_id);
  console.log(check);
  gen_id="";

  console.log("DONE!");

}
//test2();