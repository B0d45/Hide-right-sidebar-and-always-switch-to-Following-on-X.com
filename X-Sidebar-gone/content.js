let enabled = true;

function applySidebarState() {
  if (enabled) {
    document.body.classList.add("xcf-hidden-sidebar");
  } else {
    document.body.classList.remove("xcf-hidden-sidebar");
  }
}

function forceFollowing() {
  const tabs = document.querySelectorAll('[role="tab"]');

  const following = [...tabs].find((t) =>
    t.innerText?.toLowerCase().includes("following"),
  );

  const forYou = [...tabs].find((t) =>
    t.innerText?.toLowerCase().includes("for you"),
  );

  if (following && forYou && forYou.getAttribute("aria-selected") === "true") {
    following.click();
  }
}

function observe() {
  const observer = new MutationObserver(() => {
    if (enabled) forceFollowing();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg?.type === "TOGGLE") {
    enabled = msg.value;

    chrome.storage.sync.set({ enabled });

    applySidebarState();

    if (enabled) forceFollowing();

    sendResponse({ ok: true });
  }
});

function init() {
  chrome.storage.sync.get(["enabled"], (res) => {
    enabled = res.enabled !== false;

    applySidebarState();
    observe();
    forceFollowing();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "F8") {
    enabled = !enabled;

    chrome.storage.sync.set({ enabled });

    applySidebarState();

    if (enabled) forceFollowing();
  }
});

init();
