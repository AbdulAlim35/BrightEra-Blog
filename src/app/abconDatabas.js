import conf from "../conf/conf";
import { Client, Databases, ID, Query } from "appwrite";
export class AbconDatabas {
  client = new Client();
  databases;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.databases = new Databases(this.client);
  }
  async creatPost({ title, content, featuredimage, linkedin,  github })
  
  {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.abconCollactionId,
        ID.unique(),

        {
          title,
          content,
          featuredimage,
          linkedin, 
          github
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async updatePost(id, { title, content, featuredimage, linkedin, github }) {
    try {
     return await this.databases.updateDocument(
        conf.databaseId,
        conf.abconCollactionId,
        id,
        {
          title,
          content,
          featuredimage,
          linkedin,
           github
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
        conf.abconCollactionId,
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
        conf.abconCollactionId
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
        conf.abconCollactionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }
  async listQuery() {
  try {
    const response = await this.databases.listDocuments(
      conf.databaseId,
      conf.abconCollactionId,
       [Query.limit(1)]
    );
    return response.documents[0]; // একটার জন্য
  } catch (error) {
    console.log("Error fetching post", error);
  }
}

}
const abconDatabas = new AbconDatabas();
export default abconDatabas;
