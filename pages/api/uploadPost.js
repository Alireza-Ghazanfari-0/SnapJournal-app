import { connectMongo } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "incorrect method" });
  }
  const {
    title,
    shortDescription,
    longDescription,
    imageUrl,
    author_user_email,
    createdAt,
  } = req.body;
  // console.log(
  //   title,
  //   shortDescription,
  //   longDescription,
  //   imageUrl,
  //   author_user_email,
  //   createdAt,
  // );

  const client = await connectMongo();
  const postsCollection = client.db().collection("posts");
  const usersCollection = client.db().collection("users");

  try {
    const user = await usersCollection.findOne({ email: author_user_email });
    if (!user) {
      client.close();
      return res
        .status(404)
        .json({ message: "User not found! Please register first." });
    }

    await postsCollection.insertOne({
      title,
      shortDescription,
      longDescription,
      imageUrl,
      author_user_email,
      createdAt,
      authorId: user._id,
    });
    // console.log("??");

    client.close();
    res.status(201).json({ message: "your post uploaded successfully" });
  } catch (error) {
    client.close();
    res.status(500).json({ message: "error in uploading post - server error" });
  }
}
