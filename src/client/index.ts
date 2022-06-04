/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import "./style/index.css";
import "./style/input.css";

const downloadBtn = document.querySelector("#download");
const folderLocationBtn = document.querySelector("#folderLocationBtn");
const pathInput = document.querySelector<HTMLDivElement>("#folder-location");
const urlInput = document.querySelector<HTMLInputElement>("#url");

folderLocationBtn.addEventListener("click", async () => {
  const result = await window.api.selectFolderPopup();
  const { filePaths, canceled } = result;
  if (canceled) return;
  if (!pathInput) return;
  pathInput.textContent = filePaths[0];
  console.log(result);
});

downloadBtn.addEventListener("click", async () => {
  const url = urlInput?.value ?? "";
  const path = pathInput?.textContent ?? "";
  console.log({ path, url });
  const result = await window.api.downloadVideo(url, path);
  console.log(result);
});

downloadBtn.addEventListener("click", () => {
  // 끝나면 origin으로 바꾸기  
  const originInnerHTML =downloadBtn.innerHTML

  downloadBtn.innerHTML = ` <svg
          class="motion-reduce:hidden animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Downloading...`;
});
