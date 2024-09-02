chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: getAndCopyInfo
  }).then(() => {
    console.log("Script executed successfully");
  }).catch((error) => {
    console.error("Error executing script:", error);
  });
});








function getAndCopyInfo() {
  console.log("getAndCopyInfo function called");
  
  function getInfoFromWebsite() {
    let r = document.querySelectorAll('div > .labelImportantDiary, div > .nameBold')
    let new_vals = [];
    for (let i = 0; i < r.length; i++) {
      let el = r[i].textContent
      el = el.trim()
      console.log('##################')
      console.log('before: '+ el)
      //trim
      if (el.startsWith('CC')) {
        el = el.split(',')[0]
      } 
      // filter trash
      if (el.startsWith('NN') || (el.startsWith('CITA')) || el === 'Paciente no asignado' || el === '') {
        console.log('skipped')
        continue
      }

      console.log('after: '+ el)
      new_vals.push(el)
    }
    console.log('new values' + new_vals)
    let result = [];
    for (let i = 0; i < new_vals.length; i += 2) {
      result.push(`${new_vals[i]} ${new_vals[i + 1]}`);
    }
    const fs1 = result.join('\n');
    return fs1

  }


  // Assume this function exists and returns the desired information
  let info;
  try {
    info = getInfoFromWebsite();
    console.log("Info retrieved:", info);
  } catch (error) {
    console.error("Error in getInfoFromWebsite:", error);
    return;
  }

  // Check if info is defined
  if (info === undefined) {
    console.error("Info is undefined");
    return;
  }

  // Copy to clipboard
  navigator.clipboard.writeText(info).then(() => {
    console.log('Information copied to clipboard');
    // You could show a notification here if you want to inform the user
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
}

