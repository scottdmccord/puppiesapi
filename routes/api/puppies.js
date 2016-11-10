const express = require('express');
const router = express.Router();
const { getAllPuppies, adoptPuppy, abandonPuppy, likePuppy } = require('../../models/puppy');

// handle all the routes

// get all puppies
router.get('/', getAllPuppies, (req, res) => {
  res.json(res.puppies || []);
});

// Implement POST to adopt a puppy
router.post('/', adoptPuppy);

// // Implement PUT to like a puppy
router.put('/:id', likePuppy, (req, res) => {
  // res.json(res.puppies || []);
  res.send(204).end();
});

// Implement DELETE to abandon a puppy :(
router.delete('/:id', abandonPuppy, (req, res) => {
  res.send(204).end();
});

module.exports = router;
