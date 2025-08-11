import conf from "../conf/conf";
import { Client, Databases, ID, Query } from "appwrite";
export class ProfileDatabas {
  client = new Client();
  databases;
  constructor() {
    this.client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.projectId);
    this.databases = new Databases(this.client);
  }
  async creatPost({ imageId, authId }) {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.profileCollactionId,
        ID.unique(),

        {
          imageId,
          authId,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async updatePost(id, { imageId, authId }) {
    try {
      await this.databases.updateDocument(
        conf.databaseId,
        conf.profileCollactionId,
        id,
        {
          imageId,
          authId,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async getPost(id) {
    try {
      return await this.databases.getDocument(
        conf.databaseId,
        conf.profileCollactionId,
        id
      );
    } catch (error) {
      throw error;
    }
  }
  async listQuery(id) {
    try {
      const response = await this.databases.listDocuments(
        conf.databaseId,
        conf.profileCollactionId,
        [
    Query.equal('authId', id) // যদি authId text/string হয়
  ]
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}
const profileDatabas = new ProfileDatabas();

export default profileDatabas;
