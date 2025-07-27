async function fetchUrlhausList() {
  try {
    const response = await fetch('https://urlhaus.abuse.ch/downloads/text/');
    const text = await response.text();

    
    const urls = text.split('\n').filter(line => line && !line.startsWith('#'));

    // chrome.storage.local 
    chrome.storage.local.set({ blacklist: urls });
  } catch (error) {
    console.error("URLhaus list error:", error);
  }
}


chrome.runtime.onInstalled.addListener(() => {
  fetchUrlhausList();
});


chrome.alarms.create('updateUrlhaus', { periodInMinutes: 1440 }); // 24 hours
chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === 'updateUrlhaus') {
    fetchUrlhausList();
  }
});
