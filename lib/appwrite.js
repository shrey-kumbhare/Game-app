import {
  Account,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.game",
  projectId: "668b7dc2000a18f054df",
  storageId: "668b8256002722c19bcc",
  databaseId: "668b7f3800172ab383da",
  userCollectionId: "668b7f69003304fb40c2",
  gameCollectionId: "668b80a800398c9e51a3",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const storage = new Storage(client);
const databases = new Databases(client);

// Register user
export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;


    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

// Sign In
export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Account
export async function getAccount() {
try {
  const currentAccount = await account.get();
  
  return currentAccount;
} catch (error) {
  throw new Error(error);
}
}


// Get Current User
export async function getCurrentUser() {
try {
  const currentAccount = await getAccount();
  if (!currentAccount) throw Error;

  const currentUser = await databases.listDocuments(
    config.databaseId,
    config.userCollectionId,
    [Query.equal("accountId", currentAccount.$id)]
  );

  if (!currentUser) throw Error;

  return currentUser.documents[0];
} catch (error) {
  console.log(error);
  return null;
}
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

