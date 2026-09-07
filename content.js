const DEFAULTS = {
  mode: "dim",
  opacity: 0.2,
  keywords: [
    // labs & products
    "openai", "anthropic", "chatgpt", "claude", "gemini", "bard", "copilot", "codex",
    "deepseek", "grok", "xai", "mistral", "qwen", "kimi", "perplexity", "midjourney",
    "sora", "dall-e", "whisper", "runway", "elevenlabs", "cursor", "windsurf", "devin",
    "hugging face", "huggingface", "ollama", "vllm", "langchain", "llamaindex",
    "stability ai", "cohere", "scale ai", "character.ai", "replit agent",
    // model names & families
    "model", "models", "fable", "opus", "sonnet", "haiku", "gpt", "gpt-4", "gpt-5",
    "llama", "gemma", "phi", "mixtral", "falcon", "bert", "stable diffusion",
    "foundation model", "language model", "frontier model", "reasoning model",
    // core terms
    "ai", "a.i.", "agi", "asi", "llm", "llms", "slm", "genai", "gen ai", "generative",
    "machine learning", "deep learning", "neural network", "neural net", "transformer",
    "attention is all you need", "diffusion model", "multimodal", "embedding",
    "embeddings", "vector database", "rag", "retrieval-augmented", "fine-tune",
    "fine-tuning", "pretraining", "inference", "quantization", "distillation",
    "rlhf", "alignment", "hallucination", "hallucinations", "context window",
    "prompt engineering", "system prompt", "chain of thought", "mcp",
    "agentic", "ai agent", "autonomous agent", "chatbot", "copilots", "vibe coding",
    "text-to-image", "text-to-video", "text-to-speech", "synthetic data",
    "superintelligence", "ai safety", "ai slop", "benchmark saturation"
  ].join(", ")
};

function buildRe(keywords) {
  const words = keywords
    .split(/[,\n]/).map(s => s.trim()).filter(Boolean)
    .map(s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+"));
  // custom boundaries instead of \b: works for "a.i." and stops "ai" matching "said"
  return new RegExp("(^|[^a-z0-9])(" + words.join("|") + ")([^a-z0-9]|$)", "i");
}

function apply(cfg) {
  const re = buildRe(cfg.keywords);
  for (const row of document.querySelectorAll("tr.athing")) {
    const title = row.querySelector(".titleline");
    if (!title) continue; // comment rows
    const hit = re.test(title.textContent);
    const sub = row.nextElementSibling;
    const spacer = sub && sub.nextElementSibling;
    const rows = [row, sub, spacer && spacer.classList.contains("spacer") ? spacer : null];
    for (const el of rows) {
      if (!el) continue;
      el.style.display = hit && cfg.mode === "hide" ? "none" : "";
      el.style.opacity = hit && cfg.mode === "dim" ? cfg.opacity : "";
    }
  }
}

if (typeof chrome !== "undefined" && chrome.storage) {
  const run = () => chrome.storage.sync.get(DEFAULTS, apply);
  run();
  chrome.storage.onChanged.addListener(run);
}
