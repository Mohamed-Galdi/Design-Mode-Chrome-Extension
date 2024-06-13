let isDesignModeOn = false;

chrome.action.onClicked.addListener((tab) => {
  if (tab.url.startsWith("chrome://")) {
    console.warn("Cannot toggle design mode on a chrome:// URL");
    return;
  }

  isDesignModeOn = !isDesignModeOn;

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: toggleDesignMode,
    args: [isDesignModeOn],
  });

  let iconPath = isDesignModeOn
    ? "icons/icon_color_48.png"
    : "icons/icon_bw_48.png";
  chrome.action.setIcon({ path: iconPath, tabId: tab.id });
});

function toggleDesignMode(isOn) {
  document.designMode = isOn ? "on" : "off";
}
