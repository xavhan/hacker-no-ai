// node test.js
const fs = require("fs");
const { DEFAULTS, buildRe } = new Function(
  fs.readFileSync(__dirname + "/content.js", "utf8") + "; return { DEFAULTS, buildRe };"
)();
const re = buildRe(DEFAULTS.keywords);
const ok = ["Show HN: an AI that ships", "GPT-5 is out", "Anthropic raises", "A.I. winter", "Machine learning at scale", "Our new chatbot"];
const no = ["He said nothing", "Chain of custody", "Raid on the mainframe", "Sailing across the Pacific", "Plain text is enough", "Rust 1.90 released"];
ok.forEach(t => console.assert(re.test(t), "should match: " + t));
no.forEach(t => console.assert(!re.test(t), "should NOT match: " + t));
console.log("ok");
