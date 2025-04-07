const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const URL = "http://20.244.56.144/evaluation-service";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ0MDM4Njk1LCJpYXQiOjE3NDQwMzgzOTUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImE5MzZjYzAxLTA3MTYtNGM4Zi1hNTc1LTUzN2RiMWJhNzZjNiIsInN1YiI6ImRzZWtob25fbWUyNEB0aGFwYXIuZWR1In0sImVtYWlsIjoiZHNla2hvbl9tZTI0QHRoYXBhci5lZHUiLCJuYW1lIjoiZGhhcmFtcHJlZXQgc2luZ2ggc2VraG9uIiwicm9sbE5vIjoiODAyNDMyMDAyOCIsImFjY2Vzc0NvZGUiOiJYcnllSEQiLCJjbGllbnRJRCI6ImE5MzZjYzAxLTA3MTYtNGM4Zi1hNTc1LTUzN2RiMWJhNzZjNiIsImNsaWVudFNlY3JldCI6IlNFQ2tRYXFDWVpmR3ZHV3EifQ.rFHboTHzkfJX758x-43jztiZdq2LNRhVHNTgGR6rywU";

app.get("/top-users", async (req, res) => {
    try {
      const response = await axios.get(`${URL}/users`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
  
      const topUsersObj = response.data.users;
  

      const usersArray = Object.entries(topUsersObj).map(([id, name]) => ({
        id: parseInt(id),
        name,
        postCount: Math.floor(Math.random() * 100), 
      }));
  

      const topUsers = usersArray.sort((a, b) => b.postCount - a.postCount).slice(0, 5);
  
      res.json(topUsers);
    } catch (error) {
      console.error("Error while fetching users:", error.message);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  app.get("/users", async (req, res) => {
    try {
      const allUsers = await axios.get(`${URL}/users`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
  
      const allUsersObj = allUsers.data.users;
  
      const allUsersArray = Object.entries(allUsersObj).map(([id, name]) => ({
        id: parseInt(id),
        name,
        postCount: Math.floor(Math.random() * 100),
      }));
  
      res.json(allUsersArray);
    } catch (error) {
      console.error("Error fetching all users:", error.message);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  app.get("/users/:id/posts", async (req, res) => {
    const userId = req.params.id;
  
    try {
      const response = await axios.get(`${URL}/users/${userId}/posts`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
  
      const posts = response.data.posts;
  
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts for user:", error.message);
      res.status(500).json({ error: "Failed to fetch posts for user" });
    }
  });
  
  
app.listen(PORT, () => {
  console.log(`Running server on http://localhost:${PORT}`);
});
