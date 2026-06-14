import { MongoClient } from "mongodb";
export async function connectMongo() {
  const client = await MongoClient.connect(process.env.APP_DB);
  return client;
}
