const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  // deleteReaction,
} = require('../../controllers/thoughtController');

// /api/thought
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought)
// .delete(deleteReaction);

router.route('/:thoughtId/reaction').post(createReaction);

// router.route('/:thoughtId/reaction/:reactionId').put(deleteReaction);

module.exports = router;
