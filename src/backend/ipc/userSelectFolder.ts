import { dialog } from "electron";

export async function userSelectFolder() {
  return new Promise((success, reject) => {
    const result = dialog.showOpenDialog({
      properties: ["openDirectory"],
    });
    result.then((r) => {
      success(r);
    });
    result.catch((err) => {
      reject(err);
    });
  });
}
