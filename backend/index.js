const express = require("express");
const cors = require("cors");
const axios = require('axios');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

let users = {}; // In-memory user storage, replace with your database in a real app

// User registration
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (users[username]) {
    return res.status(409).send({ error: 'User already exists' });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    users[username] = { password: hashedPassword };
    try {
      const r = await axios.put(
        "https://api.chatengine.io/users/",
        { username: username, secret: password, first_name: username },
        { headers: {"private-key": "c5fe506c-ac50-480a-81fc-8fcd51504ce4" }}
      );
      return res.status(201).json(r.data);
    } catch (e) {
      return res.status(e.response.status).json(e.response.data);
    }
  }
});

// User authentication
app.post("/authenticate", async (req, res) => {
  const { username, password } = req.body;

  if (users[username]) {
    bcrypt.compare(password, users[username].password, async (err, result) => {
      if (result) {
        try {
          const r = await axios.put(
            "https://api.chatengine.io/users/",
            { username: username, secret: password, first_name: username },
            { headers: {"private-key": "c5fe506c-ac50-480a-81fc-8fcd51504ce4" }}
          );
          return res.status(r.status).json(r.data);
        } catch (e) {
          return res.status(e.response.status).json(e.response.data);
        }
      } else {
        return res.status(401).send({ error: 'Invalid password' });
      }
    });
  } else {
    return res.status(404).send({ error: 'User not found' });
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
