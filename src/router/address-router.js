const express = require('express')
const addressService = require('./service')
const addressRouter = express.Router()
const jsonParser = express.json()

addressRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    addressService.getAllAddresses(knexInstance)
      .then(addresses => {
        res.json(addresses)
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { id, address, initCoords } = req.body
    const newAddress = { id, address, initCoords }

    for (const [key, value] of Object.entries(newAddress))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })

    addressService.insertAddress(
      req.app.get('db'),
      newAddress
    )
      .then(address => {
        res.json(address)
      })
      .catch(next)
  })
/********************************************************************************/

addressRouter
  .route('/:id')
  .all((req, res, next) => {
    addressService.getAddressById(
      req.app.get('db'),
      req.params.id
    )
      .then(address => {
        if (!address) {
          return res.status(404).json({
            error: { message: `address doesn't exist` }
          })
        }
        res.address = address
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(res.address)
  })
  .delete((req, res, next) => {
    addressService.deleteAddress(
      req.app.get('db'),
      req.params.id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = addressRouter