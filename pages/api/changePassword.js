import { connectMongo } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/hash";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  //   const session = await getSession({ req });
  if (!session) {
    res
      .status(401)
      .json({ message: "forbidden, no user entered-unauthorized" });
    return;
  }
  //   console.log("???????????????", session);
  const userEmail = session.user.email;
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;

  if (!newPassword || newPassword.trim().length < 6) {
    return res
      .status(422)
      .json({ message: "password must be at least 6 character" });
  }

  const client = await connectMongo();
  const db = client.db();
  const user = await db.collection("users").findOne({ email: userEmail });
  if (!user) {
    client.close();
    return res.status(404).json({ message: "user not found" });
  }
  const isValidOldPassword = await verifyPassword(
    currentPassword,
    user.password,
  );
  if (!isValidOldPassword) {
    client.close();
    return res
      .status(403)
      .json({ message: "you entered wrong current password" });
  }
  const hashedPass = await hashPassword(newPassword);
  const result = await db
    .collection("users")
    .updateOne({ email: userEmail }, { $set: { password: hashedPass } });

  client.close();
  res.status(200).json({ message: "Password Changes Successfully" });
  return;
}
