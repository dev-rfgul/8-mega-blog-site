import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";
export class AuthService {
  client = new Client();
  account;
  constructor() {
    console.log(conf.appWriteUrl)
    console.log(conf.appWriteProjectId)
    this.client
      .setEndpoint("https://cloud.appwrite.io/v1")
      // .setEndpoint(conf.appWriteUrl)
      .setProject("66890db00032c9d4a96d");
      // .setProject(conf.appWriteProjectId);
    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    // the account creation function can fail thats why we put it in try and catch block
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //call another function mostly the login function will be here
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log(error);
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {

      console.error("appwrite service :: getCurrentUser :: error " + error);
    }
    return null;
  }
  
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("appwrite service error :: logout ::" + error);
    }
  }
}
const authService = new AuthService(); //object of AuthService class
export default authService;
