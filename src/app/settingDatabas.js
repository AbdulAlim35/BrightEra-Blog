import conf from "../conf/conf";
import { Client, Databases, ID, Query } from "appwrite";
export class SettingDatabas {
  client = new Client();
  databases;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.databases = new Databases(this.client);
  }
  async creatSetting({ logo, text, }) {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.settingCollactionId,
        ID.unique(),

        {
          logo,
          text,
          
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async updateSetting(id, { logo, text, }) {
    try {
      await this.databases.updateDocument(
        conf.databaseId,
        conf.settingCollactionId,
        id,
        {
          logo,
          text,
          
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async dealeteSetting(data) {
    try {
      return await this.databases.deleteDocument(
        conf.databaseId,
        conf.settingCollactionId,
        data
      );
    } catch (error) {
      throw error;
    }
  }
  async listSetting() {
    try {
      const res = await this.databases.listDocuments(
        conf.databaseId,
        conf.settingCollactionId
      );
      return res;
    } catch (error) {
      throw error;
    }
  }
  async getSetting(slug) {
    try {
      return await this.databases.getDocument(
        conf.databaseId,
        conf.settingCollactionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }
  async settingQuery() {
    try {
      const response = await this.databases.listDocuments(
        conf.databaseId,
        conf.settingCollactionId,
        [Query.limit(1),Query.orderDesc("$createdAt")]
      );
      return response.documents[0]; // একটার জন্য
    } catch (error) {
      console.log("Error fetching post", error);
    }
  }
}
const settingDatabas = new SettingDatabas();
export default settingDatabas;
