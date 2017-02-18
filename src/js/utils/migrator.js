export default function () {
  window.localStorage.setItem('current-version', window.chrome.runtime.getManifest().version)
}
