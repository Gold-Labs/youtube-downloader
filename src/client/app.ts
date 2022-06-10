import { getDownLoadBtnHTML } from "./component/downloadBtn";

class App {
  private downloadBtn: HTMLButtonElement;
  private notification: HTMLSpanElement;
  private folderLocationBtn: HTMLButtonElement;
  private urlInput: HTMLInputElement;
  private isDownloading: boolean;

  constructor() {
    this.downloadBtn = document.querySelector("#download");
    this.folderLocationBtn = document.querySelector("#folderLocationBtn");
    this.urlInput = document.querySelector<HTMLInputElement>("#url");
    this.isDownloading = false;
    this.notification = document.querySelector(".notification");
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
  }

  changeDownloadBtnUI() {
    this.downloadBtn.innerHTML = getDownLoadBtnHTML(this.isDownloading);
  }

  notify(result: string) {
    this.notification.innerHTML = `   <div class=" flex mt-4 p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
    <svg class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
    <div>
      <span class="font-medium">Download completed!</span> 
    </div>
  </div>`;
    // this.notification.textContent = "Download Completed!";
  }

  async onClickDownloadBtn() {
    if (this.isDownloading) return;
    this.isDownloading = true;
    this.changeDownloadBtnUI();
    const result = await this.downloadVideo();
    this.notify(result);
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
