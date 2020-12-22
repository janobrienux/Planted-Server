const { Router } = require("express");
const multer = require('multer');
const upload = multer({dest: 'uploads'})
const { Plants }  = require('../models');
const validateSession = require('../middleware/validateSession');
const router = Router()

// router.post('/create', validateSession, async (req, res) => {
//   let newPlant = {plantName,plantImg, temperature, waterFrequency, lastWatering, isThriving, userID} = req.body.plant;
// try{
//   const newPlant = {}

// }

// })

router.post('/create', validateSession, async (req, res) => {
  const { plantName, plantImg, temperature, waterFrequency, lastWatering, isThriving } = req.body;
  try {
  
  let newPlant =  await Plants.create({plantName, plantImg, temperature, waterFrequency, lastWatering, isThriving, userId: req.user.id })


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
          where: { userId: userId },
          include: ['user', 'plants']
      })
      res.status(200).json({
          userPlants: userPlants,
          message: 'Found all users plants!'
      })
  } catch (error) {
      res.status(500).json({ error: err })
  }
})

router.get('/allplants', async (req, res) => {
  try {
      let allPlants = await Plants.findAll({
          include: 'user'
      })
      res.status(200).json({
          allPlant: allPlant,
          message: 'All Plants Found'
      })
  } catch (error) {
      res.status(200).json({ error: err })
  }
})

router.get('/:plantName', validateSession, async (req, res) => {
  try {
      let plantName = req.params.plantName
      let plantByName = await Plant.findAll({
          where: { plantName: plantName },
          include: 'user'
      })
      res.status(200).json({
          plantByName: plantByName,
          message: `${plantName} was found`
      })
  } catch (error) {
      res.status(500).json({
          error: err,
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