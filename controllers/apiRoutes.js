// const User = require('../models/User');

// module.exports = {
//   getUsers(req, res) {
//     User.find()
//       .then((users) => res.json(users))
//       .catch((err) => res.status(500).json(err));
//   },
//   getSingleUser(req, res) {
//     User.findOne({ _id: req.params.userId })
//       .select('-__v')
//       .populate('posts')
//       .then((user) =>
//         !user
//           ? res.status(404).json({ message: 'No user with that ID' })
//           : res.json(user)
//       )
//       .catch((err) => res.status(500).json(err));
//   },
//   // create a new user
//   createUser(req, res) {
//     User.create(req.body)
//       .then((dbUserData) => res.json(dbUserData))
//       .catch((err) => res.status(500).json(err));
//   },
// };

const app = require ('express').Router();
const User = require('../models/User');
const Thought = require ('..models/Thought');
const Reaction = require ('../models/Reaction');

// get all users
// localhost:3001/api/users

app.get('/users', async (req, res) => {
    try {
        const allUsers =await User.find();
        res.status(200).json(allUsers);

    } catch (err) {
        res.status(500).json(err);
    }

});

// get a user by id
// localhost:3001/api/users/id

app.get('users/:_id', async (req, res) => {
    try {
        const oneUser = await User.findOne({_id:req.params._id});
        req.status(200).json(oneUser);
    } catch (err) {
    res.status(500).json(err)
 }});

 // create a user 

 app.post ('/users', async (req, res) => {
    try {
        const newUser =  await User.create({_id:req.params._id});
        req.status(200).json(newUser);
    } catch (err) {
    res.status(500).json(err)
 }});
  
 //  update user by id
//  localhost:3001/api/users
 app.put('users/:_id', async (req, res) => {
    try {
        const updatedUser = await User.findOneAndupdate({_id:req.params._id}, {username : 
        req.body.username, email: req.body.email })
        req.status(200).json(updatedUser);
    } catch (err)
 {
    res.status(500).json(err)
 }});

//  add a friend of a specific user
// localhost:3001/api/users/:id/friends/:friendId
 app.put('users/:_id/friends/:friendId', async (req, res) => {
    try {
        const newFriend = await User.findOneAndupdate({_id:req.params._id}, 
            {friends : req.params.friendId });
        req.status(200).json(newFriend);
    } catch (err) {
    res.status(500).json(err)
 }
});

// delete a friend of specific user
// localhost:3001/api/users/:_id/friends/:friendId

app.delete('/users/:_id/friends/:friendId'), async (req, res) => {
    try {
        const deletedFriend = await User.findOneAndupdate({_id:req.params._id}, {$pull:
            {friends : req.params.friendId} }, {new: true });
        req.status(200).json(deletedFriend);
    } catch (err) {
    res.status(500).json(err)
 }
});
    }
}


//  delete user by id
// localhost:3001/api/users/:_id

 app.delete('/users/:_id', async (req, res) => {
    try {
        const deletedUser = await User.findOneAndupdate({_id:req.params._id});
        req.status(200).json(deletedUser);
    } catch (err) {
    res.status(500).json(err)
 }});

//  delete a friend of a specific user
// localhost:3001/api/users/:_id/friends/:frinendId
 app.delete('/users/:_id/friends/:friendId', async (req, res) => {
    try {
        const deleteFriend = await User.findOneAndupdate({_id:req.params._id}, {$pull: {friends: req.params.friendId}},
            {new: true});
        req.status(200).json(deletedFriend);
    } catch (err) {
    res.status(500).json(err)
 }});


 app.get ('/thoughts', (req, res) => {
    Thought.find({}, (err, result) => {
        if (results) {
            req.status(200).json(result);
        }
        else {
            req.status(500).json({ error: 'something is wrong'});
        }
    });
 });


 app.get('thoughts/:_id', async (req, res) => {
    try {
        const oneThought = await Thought.findOne({_id:req.params._id});
        req.status(200).json(oneThought);
    } catch (err) {
    res.status(500).json(err)
 }});

 app.post ('/thoughts', async (req, res) => {
    try {
        const newThought =  await Thought.create({_id:req.params._id});
        const updatedUser = await User.findOneAndupdate({_id:req.params._id});
        $push: { thoughts: newThought}
        req.status(200).json(updateUser);
    } catch (err) {
    res.status(500).json(err)
 }});

//  update thought by id
// localhost:3001/api/thoughts/:id

 app.put('thoughts/:_id', async (req, res) => {
    try {
        const updatedThought = await Thought.findOne({_id:req.params._id});
        thoughtText: req.body.thoughtText
        req.status(200).json(oneThought);
    } catch (err) {
    res.status(500).json(err)
 }});


//  delete thought by id
// localhost:3001/api/thoughts/:id

 app.delete('/thoughts/:_id', async (req, res) => {
    try {
        const deletedThought = await Thought.findOneAndupdate({_id:req.params.friendIdid});
        req.status(200).json(deletedThought);
    } catch (err) {
    res.status(500).json(err)
 }});

//  post a reaction to a thought
// localhost:3001/api/thoughts/:thoughtId/react

app.post ('/thoughts/:id/reactions', async (req, res) => {
    try {
        const newReaction =  await Thought.findOneAndupdate({_id:req.params._id});
        reactions: {reactionBody: req.body.reactions}
        req.status(200).json(updateUser);
    } catch (err) {
    res.status(500).json(err)
 }});

//  delete a reaction to a thought
// localhost:3001/api/thoughts/:thoughtId/react
app.delete('/thoughts/:_id/:_id', async (req, res) => {
    try {
        const deleteReaction = await Thought.findOneAndupdate({_id:req.params.friendIdid});
        $pull: {reactions : {_id: req.params._id} };
        req.status(200).json(deletedUser);
    } catch (err) {
    res.status(500).json(err);
    }
 });

 module.exports = app;

  




   

