import fs from "fs";
import { resolve } from "path";

import upload from "../../../../config/upload";
import { IStorageProvider } from "../IStorageProvider";

class LocalStorageProvider implements IStorageProvider {
  async save(filename: string, folder: string): Promise<string> {
    await fs.promises.rename(
      resolve(upload.staticFolder, filename),
      resolve(`${upload.staticFolder}/${folder}`, filename)
    );

    return filename;
  }
  async delete(filename: string, folder: string): Promise<void> {
    const fileName = resolve(`${upload.staticFolder}/${folder}`, filename);

    try {
      await fs.promises.stat(fileName);
    } catch {
      return;
    }

    await fs.promises.unlink(fileName);
  }
}

export { LocalStorageProvider };
