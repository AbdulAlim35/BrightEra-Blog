import conf from "../conf/conf";
import { Client, Databases, ID, Query } from "appwrite";
export class ContactDatabas {
  client = new Client();
  databases;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.databases = new Databases(this.client);
  }
  async creatMessage({ name, email, catagory, message }) {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.contactCollactionId,
        ID.unique(),
        {
          name,
          email,
          catagory,
          message,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async updateMessage(id, { name, email, catagory, message }) {
    try {
     return await this.databases.updateDocument(
        conf.databaseId,
        conf.contactCollactionId,
        id,
        {
          name,
          email,
          catagory,
          message,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async dealeteMessage(data) {
    try {
      return await this.databases.deleteDocument(
        conf.databaseId,
        conf.contactCollactionId,
        data
      );
    } catch (error) {
      throw error;
    }
  }
  async listMessage() {
    try {
      const res = await this.databases.listDocuments(
        conf.databaseId,
        conf.contactCollactionId
      );
      return res;
    } catch (error) {
      throw error;
    }
  }
  async getMessage(slug) {
    try {
      return await this.databases.getDocument(
        conf.databaseId,
        conf.contactCollactionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }
}

const contactDatabas = new ContactDatabas();
export default contactDatabas;
