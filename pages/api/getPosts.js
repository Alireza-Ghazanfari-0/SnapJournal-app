import { connectMongo } from "@/lib/db";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "incorrect method" });
  }
  const { type } = req.query;
  // console.log("???@?", type);

  const client = await connectMongo();
  const collection = client.db().collection("posts");
  try {
    let result;
    if (type === "selectedPosts") {
      result = await collection.find({ mainSelected: true }).toArray();
    } else if (type === "allPosts") {
      result = await collection.find({}).toArray();
    } else {
      result = await collection.findOne({ _id: new ObjectId(type) });
    }

    // findOne
    // .toArray()
    // console.log("$$$???", result);
    client.close();
    if (!result && type !== "allPosts" && type !== "selectedPosts") {
      res.status(404).json({ message: "Post not Found" });
    }
    res
      .status(200)
      .json({ message: "successfully data has been recieved", data: result });
  } catch (error) {
    client.close();
    res.status(500).json({ message: "error in database" });
  }
}
