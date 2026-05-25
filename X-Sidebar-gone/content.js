function waitForTabs(callback) {
  const observer = new MutationObserver(() => {
    const tabs = document.querySelectorAll('[role="tab"]');
    if (tabs.length > 0) {
      callback(tabs);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

function forceFollowing(tabs) {
  const followingTab = [...tabs].find((tab) =>
    tab.innerText?.toLowerCase().includes("following"),
  );

  const forYouTab = [...tabs].find((tab) =>
    tab.innerText?.toLowerCase().includes("for you"),
  );

  if (followingTab && forYouTab) {
    const isForYouActive = forYouTab.getAttribute("aria-selected") === "true";

    if (isForYouActive) {
      followingTab.click();
    }
  }
}

function init() {
  waitForTabs((tabs) => {
    forceFollowing(tabs);

    const observer = new MutationObserver(() => {
      forceFollowing(tabs);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

init();
