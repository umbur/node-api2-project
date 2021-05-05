// implement your posts router here
const express = require("express");
const posts = require("./posts-model");

const router = express.Router();

router.get("/api/posts", (req, res) => {
  posts
    .find(posts)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving data",
      });
    });
});

router.get("/api/posts/:id", (req, res) => {
  posts
    .findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found!" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the post",
      });
    });
});

router.post("/api/posts", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      message: "Please provide values for title and contents!",
    });
  }
  posts
    .insert(req.body)
    .then((post) => {
      res.status(201).json({ message: `The post ${post} has been added!` });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        meesage: "Error adding the post to DB!",
      });
    });
});

router.put("/api/posts/:id", (req, res) => {
  const changes = req.body;
  const id = req.params.id;

  posts
    .update(id, changes)
    .then((post) => {
      if (!changes.title || !changes.contents) {
        res.status(400).json({
          message: "Please provide title and content!",
        });
      } else {
        res
          .status(200)
          .json({ message: `The post id#${req.params.id} has been updated!` });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error updating post!",
      });
    });
});

router.delete("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  posts
    .remove(id)
    .then((post) => {
      res.status(200).json({
        message: `The post with the id of ${req.params.id} has been removed!`,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "The post can not be removed!",
      });
    });
});

router.get("/api/posts/:id/comments", (req, res) => {
  const id = req.params.id;

  posts
    .findPostComments(id)
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "The comments information could not be retrieved",
      });
    });
});

module.exports = router;
