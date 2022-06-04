import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { userSelectFolder } from "./dialogWindow";
import youtubeDownload from "./youtubeDownload";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile(path.join(__dirname, "/render/index.html"));
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// IPC handler를 정의
ipcMain.handle("select-folder-popup", async (handler, arg) => {
  const popupResult = await userSelectFolder();
  return popupResult;
});

ipcMain.handle("download-youtube", async (handler, arg) => {
  const { url, path } = arg;
  const popupResult = await youtubeDownload(url, path);
  return popupResult;
});
