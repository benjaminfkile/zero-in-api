const express = require('express')
const buildingService = require('./service')
const buildingRouter = express.Router()
const jsonParser = express.json()

buildingRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    buildingService.getAllBuildings(knexInstance)
      .then(buildings => {
        res.json(buildings)
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { id, number, addressId, coords } = req.body
    const newBuilding = { id, number, addressId, coords }

    for (const [key, value] of Object.entries(newBuilding))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })

    buildingService.insertBuilding(
      req.app.get('db'),
      newBuilding
    )
      .then(building => {
        res.json(building)
      })
      .catch(next)
  })
  /********************************************************************************/

  buildingRouter
  .route('/:addressId')
  .all((req, res, next) => {
    buildingService.getBuildingById(
      req.app.get('db'),
      req.params.id
    )
      .then(building => {
        if (!building) {
          return res.status(404).json({
            error: { message: `building doesn't exist` }
          })
        }
        res.building = building
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(res.building)
  })
  .delete((req, res, next) => {
    buildingService.deleteBuilding(
      req.app.get('db'),
      req.params.id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = buildingRouter