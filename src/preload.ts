import { ipcRenderer, contextBridge } from "electron";
export type ContextBridgeApi = {
  // Declare a `readFile` function that will return a promise. This promise
  // will contain the data of the file read from the main process.
  selectFolderPopup: () => Promise<{
    filePaths: string[];
    canceled: boolean;
  }>;
  downloadVideo: (url: string, path: string) => Promise<any>;
};

//  IPC 정의를 함 API라는 것으로
contextBridge.exposeInMainWorld("api", {
  selectFolderPopup: () => ipcRenderer.invoke("select-folder-popup", true),
  downloadVideo: (url: string, path: string) =>
    ipcRenderer.invoke("download-youtube", { url, path }),
});

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector: string, text: string | undefined) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text ?? "none";
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});
