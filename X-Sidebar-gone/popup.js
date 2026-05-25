const btn = document.getElementById("toggle");

function updateUI(state) {
  btn.textContent = state ? "Disable sidebar" : "Enable sidebar";
}

chrome.storage.sync.get(["enabled"], (res) => {
  const state = res.enabled !== false;
  updateUI(state);
});

btn.addEventListener("click", () => {
  chrome.storage.sync.get(["enabled"], (res) => {
    const newState = !(res.enabled !== false);

    chrome.storage.sync.set({ enabled: newState });

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0]?.id) return;

      chrome.tabs.sendMessage(
        tabs[0].id,
        { type: "TOGGLE", value: newState },
        () => {},
      );
    });

    updateUI(newState);
  });
});
