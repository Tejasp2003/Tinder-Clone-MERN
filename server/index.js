const PORT = 8000;
const express = require("express");
const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://Tejas2003:Tejas%402003@tinder.vozs70n.mongodb.net/?retryWrites=true&w=majority";
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");   
const app = express();
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.json("Hello World!");
});
app.post("/signup", async (req, res) => {
  const client = new MongoClient(uri);
  console.log(req.body)
  const { email, password } = req.body;

  const generatedUserId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await client.connect();
    const database = client.db("app-data");
    const users = await database.collection("users");
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
      
    }
    const sanitizedEmail = email.toLowerCase();
    const data = {
      user_id: generatedUserId,
      email: sanitizedEmail,
      hashed_password: hashedPassword,
    };
    const insertedUser = await users.insertOne(data);

    const token = jwt.sign(insertedUser, sanitizedEmail, {
      expiresIn: 60 * 24,
    });

    res
      .status(201)
      .json({ token, user_id: generatedUserId, email: sanitizedEmail });
      
      
  } catch (err) {
    console.log(err);
  }
});

app.get("/users", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("app-data");
    const users = await database.collection("users").find().toArray();
    res.json(users);
    
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
