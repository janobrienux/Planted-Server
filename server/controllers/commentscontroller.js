const { Router } = require("express");
const validateSession = require('../middleware/validateSession');
const  Comments  = require('../models/comments');
const router = Router();

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
})


module.exports = router;