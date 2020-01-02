// const express = require('express')
// const notefulService = require('./noteful-service')
// const noteRouter = express.Router()

// noteRouter
//   .route('/')
//   .get((req, res, next) => {
//     const knexInstance = req.app.get('db')
//     notefulService.getAllNotes(knexInstance)
//       .then(data => {
//         res.json(data)
//       })
//       .catch(next)
//   })


// module.exports = noteRouter

const express = require('express')
const notefulService = require('./noteful-service')
const noteRouter = express.Router()
const jsonParser = express.json()

noteRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    notefulService.getAllNotes(knexInstance)
      .then(notes => {
        res.json(notes)
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { id, name, modified, folderId, content } = req.body
    const newNote = { id, name, modified, folderId, content }

    for (const [key, value] of Object.entries(newNote))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })

    notefulService.insertNote(
      req.app.get('db'),
      newNote
    )
      .then(note => {
        res.json(note)
      })
      .catch(next)
  })
  /********************************************************************************/

  noteRouter
  .route('/:id')
  .all((req, res, next) => {
    notefulService.getNoteById(
      req.app.get('db'),
      req.params.id
    )
      .then(note => {
        if (!note) {
          return res.status(404).json({
            error: { message: `note doesn't exist` }
          })
        }
        res.note = note
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(res.note)
  })
  .delete((req, res, next) => {
    notefulService.deleteNote(
      req.app.get('db'),
      req.params.id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = noteRouter