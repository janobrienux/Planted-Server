const { Router } = require("express");
const validateSession = require('../middleware/validateSession');
const { Comments } = require('../models');
const router = Router();

// router.post('./create', validateSession, async (req, res) => {
//   const {userName, date, entry} = req.body
//   try {
//     let newComment = await Comments.create({userName, date, entry, userId: req.user.id, plantsId})
//   }
// })
