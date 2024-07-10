//runs our http server
const express = require("express");
//calls the server from any other origin
const cors = require("cors");
//makes http requests
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

//this authenticates a fake user we will do this in the next section
app.post("/authenticate", async (req, res) => {
  const { username } = req.body;

  //this gets a user from the chatengine, if doesnt exist it will create a new user
  try {
    const r = await axios.put(
        "https://api.chatengine.io/users/",
        { username: username, secret: username, first_name: username },
        { headers: {"private-key": "c5fe506c-ac50-480a-81fc-8fcd51504ce4" }}
    );
    return res.status(r.status).json(r.data)
  } catch (e) {
    return res.status(e.response.status).json(e.response.data)
  }
});

app.listen(3001);