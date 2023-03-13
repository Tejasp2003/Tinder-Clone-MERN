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
  console.log(req.body);
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

    res.status(201).json({ token, user_id: generatedUserId });
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;
  try {
    await client.connect();
    const database = client.db("app-data");
    const users = await database.collection("users");
    
    const user = await users.findOne({ email });
    const correctPassword = await bcrypt.compare(
      password,
      user.hashed_password
    );
    if (user && correctPassword) {
      const token = jwt.sign(user, email, {
        expiresIn: 60 * 24,
      });
      res.status(201).json({ token, user_id: user.user_id });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});



app.get("/user", async (req, res) => {
  const client = new MongoClient(uri);
  const user_id = req.query.user_id;
  try {
    await client.connect();
    const database = client.db("app-data");
    const users = await database.collection("users");

    const query = { user_id: user_id };
    const user = await users.findOne(query);

    res.send(user);

  }
  catch (err) {
    console.log(err);
  }
  finally {
    await client.close();
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

app.put("/user", async (req, res) => {
  const client = new MongoClient(uri);
  const formData = req.body.formData;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = await database.collection("users");

    const query = { user_id: formData.user_id };
    const updateDocument = {
      $set: {
        first_name: formData.first_name,
        dob_day: formData.dob_day,
        dob_month: formData.dob_month,
        dob_year: formData.dob_year,
        show_gender: formData.show_gender,
        gender_identity: formData.gender_identity,
        gender_interest: formData.gender_interest,
        url: formData.url,
        about: formData.about,
        matches: formData.matches,
      },
    };
    const insertedUser = await users.updateOne(query, updateDocument);
    res.send(insertedUser);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
