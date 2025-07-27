chrome.storage.local.get('blacklist', data => {
  const blacklist = data.blacklist || [];
  const currentUrl = window.location.href;

  const isMalicious = blacklist.some(badUrl => {
    try {
      const badDomain = new URL(badUrl).hostname;
      const currentDomain = new URL(currentUrl).hostname;
      return currentDomain.includes(badDomain);
    } catch {
      return false;
    }
  });

  if (isMalicious) {
    alert('Warning: The site you are visiting has been reported as a potential threat by URLhaus.');
  }
});
