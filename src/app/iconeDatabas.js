import conf from "../conf/conf";
import { Client, Databases, ID, Query } from "appwrite";

export class IconeDatabas{
client = new Client();
  databases;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.databases = new Databases(this.client);
  }
   async creatIcone({
    sociallink
  }) {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.iconeCollactionId,
        ID.unique(),

        {
          sociallink
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async updateIcone(
    id,
    {sociallink }
  ) {
    try {
      await this.databases.updateDocument(
        conf.databaseId,
        conf.iconeCollactionId,
        id,
        {
          sociallink
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async dealeteIcone(data) {
    try {
      return await this.databases.deleteDocument(
        conf.databaseId,
        conf.iconeCollactionId,
        data
      );
    } catch (error) {
      throw error;
    }
  }
  async listIcone() {
    try {
      const res = await this.databases.listDocuments(
        conf.databaseId,
        conf.iconeCollactionId,
      );
      return res;
    } catch (error) {
      throw error;
    }
  }
   async getIcone(slug) {
    try {
      return await this.databases.getDocument(
        conf.databaseId,
        conf.iconeCollactionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }
  async iconeQuery() {
    try {
      const response = await this.databases.listDocuments(
        conf.databaseId,
        conf.iconeCollactionId,
        [Query.limit(1),Query.orderDesc("$createdAt")]
      );
      return response.documents[0]; // একটার জন্য
    } catch (error) {
      console.log("Error fetching post", error);
    }
  }
}

const iconeDatabas = new IconeDatabas ();
export default iconeDatabas;