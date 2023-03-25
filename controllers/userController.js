const {User, Thought} = require('../models');

module.exports = {
getUsers (req, res) {
        User.find()
            .then((users) => res.status(200).json(users))
            .catch ((err) => res.status(500).json(err));
},

getSingleUser(req, res) {
    User.findOne({_id:req.params.userId})
    .then((user) =>
    !user
        ?res.status(400).json({message: 'No user found with this ID'})
        : res.json(user)
    .catch((err) => res.status(500).json(err)))
},

createUser(req, res) {
    User.create (req.body)
    .then((userData) => res.status(200).json(userData))
    .catch((err) => res.status(500).json(err))
},

updateUser(req, res) {
    User.findOneAndUpdate(
        {_id: req.params.userId },
        {...req.body},
        {new:true}, 
    )
    .then((result) =>
        !result
            ? res.status(400).json({message: 'uh oh, something went wrong'})
            :res.status(200).json(result)
    )
    .catch((err) => res.status(500).json(err));

},
deleteUser (req, res) {
        User.findOneAndDelete({_id:req.params.userId})
            .then((user) =>
            !user
                ?res.status(400).json({message: 'No user found with this ID'})
                : Thought.deleteMany({_id: {$in: user.thoughts}})
            )
            .then(() => res.json({message: 'User and Thoughts associated with this user have been deleted'})
            .catch((err) => res.status(500).json(err)))

}
// addFriend(req, res) {
//     User.findOneAndUpdate(
//         {_id:req.params.userId },
//         {$addToSet: {friends:req.params}}
//         {new: true}
//     )
// }
}