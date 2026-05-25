function hideRightSidebar() {
    const sidebar = document.querySelector('[data-testid="sidebarColumn"]');

    if (sidebar) {
        sidebar.style.display = "none";
    }

    // Timeline breiter machen
    const primary = document.querySelector('main[role="main"]');

    if (primary) {
        primary.style.maxWidth = "1000px";
        primary.style.margin = "0 auto";
    }
}

function switchToFollowing() {
    const tabs = [...document.querySelectorAll('[role="tab"]')];

    const followingTab = tabs.find(tab =>
        tab.innerText.trim().toLowerCase() === "following"
    );

    const forYouSelected = tabs.find(tab =>
        tab.innerText.trim().toLowerCase() === "for you" &&
        tab.getAttribute("aria-selected") === "true"
    );

    if (followingTab && forYouSelected) {
        followingTab.click();
    }
}

function run() {
    hideRightSidebar();
    switchToFollowing();
}

setInterval(run, 1500);

const observer = new MutationObserver(run);

observer.observe(document.body, {
    childList: true,
    subtree: true
});

run();
