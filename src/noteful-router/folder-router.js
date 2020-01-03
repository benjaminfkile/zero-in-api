const express = require('express')
const notefulService = require('./noteful-service')
const folderRouter = express.Router()
const jsonParser = express.json()

folderRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    notefulService.getAllFolders(knexInstance)
      .then(folders => {
        res.json(folders)
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { id, name } = req.body
    const newFolder = { id, name }

    for (const [key, value] of Object.entries(newFolder))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })

    notefulService.insertFolder(
      req.app.get('db'),
      newFolder
    )
      .then(folder => {
        res.json(folder)
      })
      .catch(next)
  })
/********************************************************************************/

folderRouter
  .route('/:id')
  .all((req, res, next) => {
    notefulService.getFolderById(
      req.app.get('db'),
      req.params.id
    )
      .then(folder => {
        if (!folder) {
          return res.status(404).json({
            error: { message: `folder doesn't exist` }
          })
        }
        res.folder = folder
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(res.folder)
  })
  .delete((req, res, next) => {
    notefulService.deleteFolder(
      req.app.get('db'),
      req.params.id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = folderRouter