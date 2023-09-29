const express = require('express');
const router = express.Router();
const { Posts } = require('../models');
const { validateToken } = require ('../middleware/AuthMiddleware');

router.get('/', async (req, res) => {
  const listOfPosts = await Posts.findAll();
  res.json(listOfPosts);
});

router.post('/', async (req, res) => {
  const post = req.body;
  await Posts.create(post);
  res.json(post);
});

router.get('/byId/:id', async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);

  res.json(post);
});

router.put('/byId/:id', async (req, res) => {
  const id = req.params.id;
  const updatePost = req.body;
  await Posts.update(updatePost, {
    where: { id: id }
  });
  res.json(updatePost);
});

router.delete('/byId/:id', async (req, res) => {
  const postId = req.params.id;
  await Posts.destroy({
    where: {
      id: postId,
    }
  }
  );
  res.json('Post deleted');
});

module.exports = router;