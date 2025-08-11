import conf from "../conf/conf";
import { Client, Databases, ID, Query } from "appwrite";

export class GetInTouchDatabas {
  client = new Client();
  databases;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.databases = new Databases(this.client);
  }
  async creatPost({ icone, heading, title, subtitle }) {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.getintouchCollactionId,
        ID.unique(),

        {
          icone,
          heading,
          title,
          subtitle,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async updatePost(id, { icone, heading, title, subtitle }) {
    try {
      await this.databases.updateDocument(
        conf.databaseId,
        conf.getintouchCollactionId,
        id,
        {
          icone,
          heading,
          title,
          subtitle,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async dealetePost(data) {
    try {
      return await this.databases.deleteDocument(
        conf.databaseId,
        conf.getintouchCollactionId,
        data
      );
    } catch (error) {
      throw error;
    }
  }
  async listPost() {
    try {
      const res = await this.databases.listDocuments(
        conf.databaseId,
        conf.getintouchCollactionId
      );
      return res;
    } catch (error) {
      throw error;
    }
  }
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.databaseId,
        conf.getintouchCollactionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }
}
const getInTouchDatabas = new GetInTouchDatabas();
export default getInTouchDatabas;
