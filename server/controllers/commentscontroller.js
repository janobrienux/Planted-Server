const { Router } = require("express");
const validateSession = require('../middleware/validateSession');
const  Comments  = require('../models/comments');
const router = Router();



// CREATE COMMENTS
router.post('/create', validateSession, async (req, res) => {
  
  try {
    const { userName, date, entry, plantId } = req.body
    let newComment = await Comments.create({userName, date, entry, userId: req.user.id, plantId})

    res.status(200).json({
      comments: newComment,
      message: 'New Comment Added!'
  })
  } catch (error) {
    console.log(error);
    res.status(500).json({
        message: 'Comment failed'
    })
}
});


//GET COMMENTS BY USER 
router.get("/mine", validateSession, (req, res) => {
  let userid = req.user.id
  Comment.findAll ({
      where: { userId: userId}
  })
      .then(comments => res.status(200).json(comments))
      .catch(err => res.status(500).json({ error: error }))
});


//COMMENTS UPDATE 
router.put('/update/:entryId', validateSession, function (req, res) {
  const updateCommentEntry = {
      userName: req.body.comment.userName,
      date: req.body.comment.date,
      entry: req.body.comment.entry,
  };

  const query = { where: { id: req.params.entryId, owner: req.user.id, }};

  Comment.update(updateCommentEntry, query)
      .then(() => res.status(200).json({message: 'Comment has been updated!'}))
      .catch((error) => res.status(500).json({ error: error.message || serverErrorMsg  }));
});

// DELETE COMMENTS

router.delete('/delete/:id', validateSession, function (req, res) {
  const query = { where: {id: req.params.id, owner: req.user.id }};

  Comment.destroy(query)
      .then(() => res.status(200).json({ message: 'Comment has been deleted!'}))
      .catch((err) => res.status(500).json ({ error: err }));
});



module.exports = router;