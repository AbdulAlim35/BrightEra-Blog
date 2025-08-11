import conf from "../conf/conf";
import { Client, Databases, ID, Query } from "appwrite";

export class DatabasesService {
  client = new Client();
  databases;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.databases = new Databases(this.client);
  }
  async creatPost({
    title,
    slug,
    content,
    featuredimage,
    status,
    category,
    authorId,
  }) {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.collactionId,
        ID.unique(),

        {
          title,
          slug,
          content,
          featuredimage,
          status,
          category,
          authorId,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async updatePost(
    id,
    { title, slug, content, featuredimage, status, category, authorId }
  ) {
    try {
      await this.databases.updateDocument(
        conf.databaseId,
        conf.collactionId,
        id,
        {
          title,
          slug,
          content,
          featuredimage,
          status,
          category,
          authorId,
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
        conf.collactionId,
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
        conf.collactionId,
      );
      return res;
    } catch (error) {
      throw error;
    }
  }
  async blog() {
    try {
      const res = await this.databases.listDocuments(
        conf.databaseId,
        conf.collactionId,
        [],
        1,
        0
      );
      return res.total;
    } catch (error) {
      throw error;
    }
  }
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.databaseId,
        conf.collactionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }
    async oneQuery () {
  try {
    const latest = await this.databases.listDocuments(
      conf.databaseId,
      conf.collactionId,
      [Query.equal("status", "highlight"),Query.limit(1),Query.orderDesc("$createdAt")],
    );
    return latest;
  } catch (error) {
    throw error;
  }
}
  async listQuery(
    queries = [
      Query.search("title", search),
      Query.equal("category", selected),
      Query.orderDesc("$createdAt"),
      Query.limit(3),
       Query.orderDesc("$createdAt"),
      Query.limit(24),
      Query.equal("status", "published")
    ]
  ) {
    try {
      const response = await this.databases.listDocuments(
        conf.databaseId,
        conf.collactionId,
        queries
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  async bloggersQuery (){
    try {
const response = await this.databases.listDocuments(
  conf.databaseId,
  conf.collactionId,
  [Query.equal("status", "published")],
  1 // limit to 1 document only for performance
);

return response.total;

    } catch (error) {
      throw error;
    }
  }
  async articles () {
  try {
    const latest = await this.databases.listDocuments(
      conf.databaseId,
      conf.collactionId,
      [Query.equal("status", "published"),Query.limit(4),Query.orderDesc("$createdAt")],
    );
    return latest;
  } catch (error) {
    throw error;
  }
}
async allarticles () {
  try {
    const latest = await this.databases.listDocuments(
      conf.databaseId,
      conf.collactionId,
      [Query.equal("status", "published")]
    );
    return latest;
  } catch (error) {
    throw error;
  }
}
async allCategory (category) {
  try {
    const latest = await this.databases.listDocuments(
      conf.databaseId,
      conf.collactionId,
      [Query.equal("status", "published"), Query.equal("category", Array.isArray(category) ? category : [category])]
    );
    
    return latest;
  } catch (error) {
    throw error;
  }
}
async searchQuery (search) {
  try {
    const latest = await this.databases.listDocuments(
      conf.databaseId,
      conf.collactionId,
     [
    Query.or([
      Query.search("title", search),
      Query.search("content", search)
    ]),
    Query.equal("status", "published")
  ]
    );
    return latest;
  } catch (error) {
    throw error;
  }
}
}


const databasesService = new DatabasesService();
export default databasesService;
