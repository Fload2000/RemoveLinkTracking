const browser = window.browser || window.chrome;

browser.webRequest.onBeforeRequest.addListener(
    removeTracking,
    {urls: ['<all_urls>'], types: ['main_frame', 'sub_frame']},
    ['blocking']
);

// Generate map from keywords and true
const paramMap = new Map();
for(let keyword of Keywords) {
    paramMap.set(keyword, true)
}

// Set the default empty list on installation.
browser.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        browser.storage.local.set({
            exceptions: [],
            parameters: JSON.stringify(Array.from(paramMap.entries())),
            active: Keywords,
            ownParam: false,
            logging: true,
            logs: [],
            showPageAction: false
        });
    } else {
        // TODO -> comment in
        browser.storage.local.set({
            //logs: []
        });
    }
});

let exceptions = [];

// Get the stored list of exceptions
browser.storage.local.get(data => {
    if (data.exceptions) {
        exceptions = data.exceptions;
    }
});

// Listen for changes in the exceptions list
browser.storage.onChanged.addListener(changeData => {
    if (changeData.exceptions != null) {
        exceptions = changeData.exceptions.newValue;
    }
});

function removeTracking({url}) {

    if (exceptions.some((entry) => {return new URL(url).hostname.endsWith(entry)})) {
        return
    } else if (!REMOVER.mayContain(url)) {
        return
    }

    const redirectUrl = REMOVER.remove(url);

    if (redirectUrl === url) {
        return
    }

    return {
        redirectUrl
    }
}