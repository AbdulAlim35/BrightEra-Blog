import conf from "../conf/conf";
import { Client, Storage,ID } from "appwrite";

export class StorageService {
  client = new Client();
  storage;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.storage = new Storage(this.client);
  }
  async uplodFile(file) {
    try {
      return await this.storage.createFile(conf.bucketId, ID.unique(), file);
    } catch (error) {
      throw error;
      return false;
    }
  }

async deleteFile(fileId) {
  try {
    await this.storage.deleteFile(conf.bucketId, fileId); // ✅ ঠিক ID পাঠাও
    return true; // সফল হলে true
  } catch (error) {
    console.error("Delete Error:", error); // Debug message
    return false; // ব্যর্থ হলে false
  }
}

   getFilePreview(fileId) {
    return this.storage.getFileDownload(conf.bucketId, fileId);
  }
}

const storageService = new StorageService();
export default storageService;
