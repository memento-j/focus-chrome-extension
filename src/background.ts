chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    //only run when page fully loads
    if (changeInfo.status !== "complete" || !tab.url) {
        return;
    }

    try {
        // Get stored URLs from chrome storage
        const result = await chrome.storage.sync.get(["urls"]);
        //type assertion confirming that the result.urls will be a string
        const storedUrls = (result.urls as string[]) || [];    

        console.log("curr url", tab.url);
        console.log("stored urls", storedUrls);

        for (const url of storedUrls) {
            if (tab.url.includes(url)) {
                await chrome.tabs.update(tabId, {
                    url: "https://www.google.com"
                });
            }
        }

    } catch (error) {
        console.error("Error in background:", error);
    }
});