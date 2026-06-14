// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectMongo } from "@/lib/db";
import { hashPassword } from "@/lib/hash";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !email.includes("@")) {
    res.status(422).json({ message: "invalid email" });
    return;
  }
  if (!password || password.trim().length < 6) {
    res
      .status(422)
      .json({ message: "invalid password. must be at least 6 characters" });
    return;
  }

  try {
    const client = await connectMongo();
    const db = client.db();
    const existingUser = await db.collection("users").findOne({ email: email });
    if (existingUser) {
      res.status(422).json({ message: "This user exists!" });
      return;
    }
    const hashedPassword = await hashPassword(password);
    await db
      .collection("users")
      .insertOne({ email: email, password: hashedPassword });
    client.close();
    res.status(201).json({ message: `welcome ${email}` });
  } catch (error) {
    res.status(500).json({ message: "have problem with database" });
  }
}
