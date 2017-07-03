
const { remote } = require('electron');
const updater = remote.require('electron-simple-updater');

setText('version', updater.version);
setText('build', updater.buildId);
attachUiHandlers();
attachUpdaterHandlers();

 
function attachUiHandlers() {
  const btnUpdate = document.getElementById('btn-update');
  const btnInstall = document.getElementById('btn-install');

  btnUpdate.addEventListener('click', () => {
    updater.checkForUpdates();
    document.body.classList.add('update-downloading');
  });

  btnInstall.addEventListener('click', () => {
    updater.downloadUpdate();
  });
}
function attachUpdaterHandlers() {
  updater.on('update-available', onUpdateAvailable);
  updater.on('update-downloading', onUpdateDownloading);
  updater.on('update-downloaded', onUpdateDownloaded);
  updater.setOptions('logger', {
    info(text) { log('info', text); },
    warn(text) { log('warn', text); }
  });

  function onUpdateAvailable(meta) {
    setText('new-version', meta.version);
    // setText('description', meta.readme);
    document.body.className = 'update-available';
  }

  function onUpdateDownloading() {
    window.alert('Downloading the application !')
  }

  function onUpdateDownloaded() {
    if (window.confirm('The app has been updated. Do you like to restart it now?')) {
      updater.quitAndInstall();
    }
  }

  function log(level, text) {
    const logMessages = document.getElementById('log-messages');
    const p = document.createElement('p');
    p.appendChild(document.createTextNode(`[${level}] ${text}`));
    logMessages.appendChild(p);
  }
}

function setText(id, text) {
  document.getElementById(id).appendChild(
    document.createTextNode(text)
  );
}


