let keywords = [];
let logs = [];
let showPageAction = false;
let logging = true;

// Get the stored list of active keywords
browser.storage.local.get(data => {
    if (data.active) {
        keywords = data.active;
    }
    if (data.logs) {
        logs = data.logs;
    }
    if (data.showPageAction) {
        showPageAction = data.showPageAction;
    }
    if (data.logging) {
        logging = data.logging;
    }
});

// Listen for changes in the active list and logs
browser.storage.onChanged.addListener(changeData => {
    if (changeData.active != null) {
        keywords = changeData.active.newValue;
    }
    if (changeData.logs != null) {
        logs = changeData.logs.newValue;
    }
    if (changeData.showPageAction != null) {
        showPageAction = changeData.showPageAction.newValue;
    }
    if(changeData.logging != null) {
        logging = changeData.logging.newValue;
    }
});

function log(urlOriginal, urlModified, params) {
    const entry = {};
    entry["date"] = getDatetime();
    entry["urlOriginal"] = urlOriginal;
    entry["urlModified"] = urlModified;
    entry["parameter"] = params;

    logs.push(entry);
    browser.storage.local.set({
        logs: logs
    });
}

function displayPageAction() {
    browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
        let tab = tabs[0].id; // Safe to assume there will only be one result
        browser.pageAction.show(tab);
    }, console.error);

}

class REMOVER {

    static mayContain(url) {
            for (let keyword of keywords) {
                if (url.includes(keyword))
                    return true
            }
        return false;
    }

    static remove(url) {
        const parsedURL = new URL(url);
        let params = [];

        for (let param of [...parsedURL.searchParams.keys()]) {
            for (let keyword of keywords) {
                if (param.startsWith(keyword)) {
                    parsedURL.searchParams.delete(param);
                    params.push(param);
                }
            }
        }

        const parsedFragment = new URLSearchParams(parsedURL.hash.substring(1));
        for (let param of [...parsedFragment.keys()]) {
            for (let keyword of keywords) {
                if (param.startsWith(keyword)) {
                    parsedFragment.delete(param);
                    params.push(param);
                }
            }
        }
        parsedURL.hash = parsedFragment.toString();

        const urlString = parsedURL.toString();

        if (logging && params.length > 0) {
            log(url, urlString, params);
        }

        // Add pageAction icon
        if (showPageAction) {
            displayPageAction();
        }

        return urlString;
    }
}
