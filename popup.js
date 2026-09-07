const $ = id => document.getElementById(id);

chrome.storage.sync.get(DEFAULTS, cfg => {
  document.querySelector(`input[value="${cfg.mode}"]`).checked = true;
  $("opacity").value = cfg.opacity;
  $("keywords").value = cfg.keywords;
  $("pct").textContent = Math.round((1 - cfg.opacity) * 100) + "% faded";
});

const save = () => {
  const opacity = Number($("opacity").value);
  $("pct").textContent = Math.round((1 - opacity) * 100) + "% faded";
  chrome.storage.sync.set({
    mode: document.querySelector("input[name=mode]:checked").value,
    opacity,
    keywords: $("keywords").value
  });
};

document.addEventListener("input", save);
document.addEventListener("change", save);
$("reset").onclick = () => { $("keywords").value = DEFAULTS.keywords; save(); };
