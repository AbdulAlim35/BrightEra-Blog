import conf from "../conf/conf";
import { Client, Databases, ID, Query } from "appwrite";
export class CommentDatabas  {
   client = new Client();
  databases;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.databases = new Databases(this.client);
  }
    async commentPost({ postId, comment }) {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.commentCollactionId,
        ID.unique(),

        {
          postId,
        comment
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async commentQuery (postId) {
  try {
    const latest = await this.databases.listDocuments(
      conf.databaseId,
      conf.commentCollactionId,
       [
        Query.equal("postId", postId), //blog post
        Query.orderDesc("$createdAt")
      ]
    );
    return latest;
  } catch (error) {
    throw error;
  }
}
}

const commentDatabas = new CommentDatabas();
 export default commentDatabas;