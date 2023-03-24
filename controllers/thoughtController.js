const {User, Thought} = require('../models');

module.exports = {
    getThoughts (req, res) {
        Thought.find()
            .then((thought) => res.json (thought))
            .catch ((err) => res.status(500).json(err));
},

getSingleThought(req, res) {
    Thought.findOne({_id:req.params.thoughtId})
    .then((thought) =>
    !thought
        ?res.status(400).json({message: 'No thought found with this ID'})
        : res.json(thought)
    .catch((err) => res.status(500).json(err));
},

createThought(req, res) {
    Thought.create (req.body)
    .then((thought) => {
        return User.findOneAndUpdate(
           {_id: req.body.userId}
           {$addToSet: {thought: thought._id}},
           { new: true }
        );
    })
    .then (userThought) =>
    !userThought
    ? res.status(400).json9{message: 'No user found with that ID'})
    : res.json(userThought)
    )
    .catch((err) => res.status(400).json(err));
   
},

updateThought(req, res) {
    Thought.findOneAndUpdate(
        {_id: req.params.thoughtId },
        {...req.body},
        {new:true}, 
    )
    .then((result) =>
        !result
            ? res.status(400).json({message: 'uh oh, something went wrong'})
            :res.json(result)
    )
    .catch((err) => res.status(500).json(err));

},
deleteThought (req, res) {
        Thought.findOneAndDelete({_id:req.params.thoughtId})
            .then((thought) => {
                return user.findOneAndUpdate(
                    {_id: thought.userId}
                    {$pull: {thoughts: thoughts._id}},
                );
                
                });
            .then(() => res.json({message: 'Thoughts associated with this user has been deleted'})
            .catch((err) => res.status(500).json(err));

},
createReaction (req, res) {
    Thought.findOneAndUpdate
    ({_id:req.params.thoughtId})
    {$push: {reactions: req.body} },
    {new: true}
    )
    .then((thought) => 
            !thought
                ?res.status(400),json({ message: 'No thought found with that ID'})
                :res.json(thought)
    )
            
        
     .catch((err) => res.status(500).json(err));

},
deleteReaction (req, res) {
    Thought.findOneAndDelete({_id:req.params.thoughtId})
        {_id: req.params.thoughtId }
        {$pull: {reactions: {reactionId: req.params.reactionId } }}
        {new : true} 

            );
            
          