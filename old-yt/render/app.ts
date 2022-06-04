const btn = document.querySelector("#folderLocationBtn");
const downloadBtn = document.querySelector("#download");
const pathInput = document.querySelector<HTMLDivElement>("#folder-location");
const urlInput = document.querySelector<HTMLInputElement>("#url");

if (btn) {
  btn.addEventListener("click", async () => {
    const result = await window.api.selectFolderPopup();
    const { filePaths, canceled } = result;
    if (canceled) return;
    if (!pathInput) return;
    pathInput.textContent = filePaths[0];
    console.log(result);
  });
}

if (downloadBtn) {
  downloadBtn.addEventListener("click", async () => {
    const url = urlInput?.value ?? "";
    const path = pathInput?.textContent ?? "";
    console.log({ path, url });
    const result = await window.api.downloadVideo(url, path);
    console.log(result);
  });
}
