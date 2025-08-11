import conf from "../conf/conf";
import { Client, Databases, ID, Query } from "appwrite";
export class HeroDatabas {
  client = new Client();
  databases;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.databases = new Databases(this.client);
  }
  async creathero({ title, contant, image, link, link2 }) {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.heroCollactionId,
        ID.unique(),

        {
          title,
          contant,
          image,
          link,
          link2,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async updatehero(id, { title, contant, image, link, link2 }) {
    try {
      await this.databases.updateDocument(
        conf.databaseId,
        conf.heroCollactionId,
        id,
        {
          title,
          contant,
          image,
          link,
          link2,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async dealetehero(data) {
    try {
      return await this.databases.deleteDocument(
        conf.databaseId,
        conf.heroCollactionId,
        data
      );
    } catch (error) {
      throw error;
    }
  }
  async listhero() {
    try {
      const res = await this.databases.listDocuments(
        conf.databaseId,
        conf.heroCollactionId
      );
      return res;
    } catch (error) {
      throw error;
    }
  }
  async gethero(slug) {
    try {
      return await this.databases.getDocument(
        conf.databaseId,
        conf.heroCollactionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }
  async heroQuery() {
    try {
      const response = await this.databases.listDocuments(
        conf.databaseId,
        conf.heroCollactionId,
        [Query.limit(1),Query.orderDesc("$createdAt")]
      );
      return response.documents[0]; // একটার জন্য
    } catch (error) {
      console.log("Error fetching post", error);
    }
  }
}
const heroDatabas = new HeroDatabas();
export default heroDatabas;
