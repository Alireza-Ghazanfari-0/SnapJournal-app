import { connectMongo } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "incorrect method" });
  }
  const { name, email, textMessage } = req.body;
  //   console.log("?????");

  //   console.log(name, email, textMessage);

  try {
    const client = await connectMongo();
    const collection = client.db().collection("contacts");
    await collection.insertOne({
      name: name,
      email: email,
      textMessage: textMessage,
      createdAt: new Date(),
    });
    client.close();
    res
      .status(201)
      .json({ message: "Your comment sent to admin successfully" });
  } catch (error) {
    client.close();
    res
      .status(502)
      .json({ message: "Error in sending comment or connecting to DB" });
  }
}
