async function fetchUrlhausList() {
  console.log("Fetching URLhaus blacklist...");
  try {
    const response = await fetch('https://urlhaus.abuse.ch/downloads/text/');
    const text = await response.text();

    const urls = text.split('\n').filter(line => line && !line.startsWith('#'));
    
    chrome.storage.local.set({ blacklist: urls }, () => {
      console.log(`Blacklist updated: ${urls.length} entries.`);
    });
  } catch (error) {
    console.error("URLhaus list error:", error);
  }
}

chrome.runtime.onInstalled.addListener(() => {
  fetchUrlhausList();
});

chrome.alarms.create('updateUrlhaus', { periodInMinutes: 1440 }); 
chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === 'updateUrlhaus') {
    fetchUrlhausList();
  }
});
