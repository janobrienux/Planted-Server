const { Router } = require("express");
const  Plants   = require('../models/plants');
const validateSession = require('../middleware/validateSession');
const router = Router()

//IMAGE UPLOADING
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');

var s3 = new AWS.S3({
    accessKeyId :  process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    bucket: process.env.bucket
});

let imgUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'plantedbucket',
        //acl: 'public-read',
        metadata: function (req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        // key: function (req, file, cb) {
        //     cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
        // }
        key: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname)
        }
    })
})



router.post('/create',validateSession,  imgUpload.single('image'), async (req, res) => {
  const { plantName, plantImg, temperature, waterFrequency, lastWatering, isThriving } = req.body;
  try {
  
  let newPlant =  await Plants.create({plantName, plantImg: req.file.location, temperature, waterFrequency, lastWatering, isThriving, userId: req.user.id })


      res.status(200).json({
          plants: newPlant,
          message: 'New Plant Added!'
      })
  } catch (error) {
      console.log(error);
      res.status(500).json({
          message: 'Plant failed'
      })
  }
})

router.get('/userplants', validateSession, async (req, res) => {
  try {
      let userId = req.user.id
      let userPlants = await Plants.findAll({
          where: { userId: userId }
      })
      res.status(200).json({
          userPlants: userPlants,
          message: 'Found all users plants!'
      })
  } catch (error) {
      res.status(500).json({ error: error })
  }
})


router.get('/:plantName', validateSession, async (req, res) => {
  try {
      let plantName = req.params.plantName
      let plantByName = await Plant.findAll({
          where: { plantName: plantName },
          include: ['user', 'plants']
      })
      res.status(200).json({
          plantByName: plantByName,
          message: `${plantName} was found`
      })
  } catch (error) {
      res.status(500).json({
          error: error,
          message: 'Plant not found!'
      })
  }
})

router.put('/:id', validateSession, async (req, res) => {
  try {
      const query = req.params.id;
      await Plants.update(req.body, { where: { id: query } })
          .then((plantUpdated) => {
              Plant.findOne({ where: { id: query } }).then((locatedUpdatedPlant) => {
                  res.status(200).json({
                      editedPlant: locatedUpdatedPlant,
                      message: 'Plant Updated!',
                      plantChanged: plantUpdated
                  })
              })
          })
  } catch (error) {
      res.status(500).json({
          error: error
      })
  }
})

router.delete('/:id', validateSession, async (req, res) => {
  try {
      await Plants.destroy({
          where: { id: req.params.id }
      })
      res.status(200).json({
          message: 'Plant Deleted!'
      })
  } catch (error) {
      res.status.prototype(500).json({
          error: error
      })
  }
})

module.exports = router;