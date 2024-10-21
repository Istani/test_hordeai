const { AIHorde } = require("@zeldafan0225/ai_horde");
var debug = require("@istani/debug")(require('./package.json').name);

const ai_horde = new AIHorde({
  cache_interval: 1000 * 10,
  cache: {generations_check: 1000 * 30,},
  client_agent: "@Istani:v0.0.1:DEV_Test"
});

// Todo: Irgendwas mit Datenbank damit die Generation nicht verschwindet und gleichzeitig den Callback ersetzen?

// Funktion zum starten der image generation
async function ImageGeneration(prompt, callback) {
  const generation = await ai_horde.postAsyncImageGenerate({
    prompt: prompt,
    sampler: 'lcm',
    steps: 20,
    scale: 7,
    width: 512,
    height: 512,
    negative_prompt: 'lowres, bad anatomy, bad hands, text, error, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry',
    //model: 'Hentai Diffusion',
    restore_faces: false,
    enable_hr: false,
    sanitize: true,
    clip_skip: 1
  });
  debug.log("Image Generation: " + generation.id + " Prompt:\n" + prompt + "\n");
  await CheckImageGeneration(generation.id, callback);
}
// Funktion zum starten der text generation
async function TextGeneration(prompt, callback) {
  const generation = await ai_horde.postAsyncTextGenerate({
    prompt: prompt,
    params: {
      nsfw: false,
      gui_settings: false,
      sampler_order: [
        6, 0, 1, 2,
        3, 4, 5
      ],
      max_context_length: 8192,
      max_length: 350,
      rep_pen: 1.1,
      rep_pen_range: 600,
      rep_pen_slope: 0,
      temperature: 1,
      tfs: 1,
      top_a: 0,
      top_k: 0,
      top_p: 0.95,
      min_p: 0,
      typical: 1,
      use_world_info: false,
      singleline: false,
      stop_sequence: [ '\n', '\SYTH:', '\StoryTelling:' ],
      streaming: false,
      can_abort: false,
      mirostat: 0,
      mirostat_tau: 5,
      mirostat_eta: 0.1,
      use_default_badwordsids: false,
      grammar: '',
      n: 1,
      frmtadsnsp: false,
      frmtrmblln: false,
      frmtrmspch: false,
      frmttriminc: false
    },
    trusted_workers: false,
    models: [ 'koboldcpp/L3-8B-Stheno-v3.2' ]
  });
  debug.log("Text Generation: " + generation.id + " Prompt:\n" + prompt + "\n");
  await CheckTextGeneration(generation.id, callback);
}

exports.ImageGeneration = ImageGeneration;
exports.TextGeneration = TextGeneration;

// Pruef Funktionen und sowas?
async function CheckImageGeneration(generation_id, callback) {
  var check = await ai_horde.getImageGenerationCheck(generation_id);

  if (check.done == false) {
    if (check.wait_time<10) {
      setTimeout(() => {CheckImageGeneration(generation_id, callback);}, 5000);
      return;
    }
    setTimeout(() => {CheckImageGeneration(generation_id, callback);}, 1000*(check.wait_time/3));
    return;
  }

  var check = await ai_horde.getImageGenerationStatus(generation_id);
  callback(check.generations[0].img);
}
async function CheckTextGeneration(generation_id, callback) {
  var check = await ai_horde.getTextGenerationStatus(generation_id);

  if (check.done == false) {
    if (check.wait_time==0) {
      setTimeout(() => {CheckTextGeneration(generation_id, callback);}, 1000);
      return;
    }
    setTimeout(() => {CheckTextGeneration(generation_id, callback);}, 1000*(check.wait_time/3));
    return;
  }

  var check = await ai_horde.getTextGenerationStatus(generation_id);
  callback(check.generations[0].text);
}