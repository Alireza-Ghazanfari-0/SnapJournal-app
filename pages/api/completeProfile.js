import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { connectMongo } from "@/lib/db";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res
      .status(401)
      .json({ message: "forbidden, no user entered-unauthorized" });
    return;
  }
  const email = session.user.email;
  // ------

  const client = await connectMongo();
  const collection = client.db().collection("users");
  // res.status(404).json({ message: "connection to DB failed" });
  // console.error(error.message);

  const user = await collection.findOne({ email: email });
  if (!user) {
    client.close();
    return res.status(404).json({ message: "user not found" });
  }
  // ----
  // console.log("????", user);
  if (req.method === "GET") {
    client.close();
    return res
      .status(200)
      .json({ message: "date successfuly loaded", data: user });
    // return user;
    // return {
    //   email: user.email,
    //   name: user.firstname,
    //   lastname: user.lastname,
    //   phoneNumber: user.phoneNumber,
    //   gender: user.gender,
    //   age: user.age,
    //   nationality: user.nationality,
    // };
  }

  if (req.method === "POST") {
    const { name, lastname, phoneNumber, gender, age, nationality } = req.body;
    try {
      await collection.updateOne(
        { email: email },
        {
          $set: {
            firstname: name,
            lastname: lastname,
            phoneNumber: phoneNumber,
            gender: gender,
            age: age,
            nationality: nationality,
          },
        },
      );
      client.close();
      res.status(201).json({ message: "user information updated" });
    } catch (error) {
      client.close();
      res.status(500).json({ message: "problem with server - updating info " });
      // console.error(error);
    }
  }
  client.close();
  return res.status(405).json({ message: "method not allowed" });
}
