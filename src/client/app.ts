import { getDownLoadBtnHTML } from "./component/downloadBtn";

class App {
  downloadBtn: HTMLButtonElement;
  folderLocationBtn: HTMLButtonElement;
  urlInput: HTMLInputElement;
  private isDownloading: boolean;

  constructor() {
    this.downloadBtn = document.querySelector("#download");
    this.folderLocationBtn = document.querySelector("#folderLocationBtn");
    this.urlInput = document.querySelector<HTMLInputElement>("#url");
    this.isDownloading = false;
  }

  resetUI() {
    this.urlInput.value = "";
    this.changeDownloadBtnUI();
  }

  async setFolderLocation() {
    const result = await window.api.selectFolderPopup();
    const { filePaths, canceled } = result;
    console.log(filePaths, canceled);
    if (canceled) return;
    this.folderLocationBtn.textContent = filePaths[0];
  }

  async downloadVideo() {
    const url = this.urlInput.value ?? "";
    const path = this.folderLocationBtn.textContent ?? "";
    console.log({ path, url });
    const result = await window.api.downloadVideo(url, path);
    return result;
    console.log(result);
  }

  changeDownloadBtnUI() {
    this.downloadBtn.innerHTML = getDownLoadBtnHTML(this.isDownloading);
  }

  async onClickDownloadBtn() {
    if (this.isDownloading) return;
    this.isDownloading = true;
    this.changeDownloadBtnUI();
    const result = await this.downloadVideo();
    this.isDownloading = false;
    this.resetUI();
  }

  init() {
    this.folderLocationBtn.addEventListener(
      "click",
      this.setFolderLocation.bind(this)
    );

    this.downloadBtn.addEventListener(
      "click",
      this.onClickDownloadBtn.bind(this)
    );
  }
}

export default App;
