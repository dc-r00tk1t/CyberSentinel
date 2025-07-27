chrome.storage.local.get('blacklist', data => {
  const blacklist = data.blacklist || [];
  const currentUrl = window.location.href;

  let isMalicious = false;

  for (const badUrl of blacklist) {
    try {
      const badDomain = new URL(badUrl).hostname;
      const currentDomain = new URL(currentUrl).hostname;
      if (currentDomain.includes(badDomain)) {
        isMalicious = true;
        break;
      }
    } catch (err) {
      console.warn('URL parse error:', err);
    }
  }

  if (isMalicious) {
    alert('Warning: The site you are visiting has been reported as a potential threat by URLhaus.');
  } else {
    alert('This page appears to be safe.');
  }
});
