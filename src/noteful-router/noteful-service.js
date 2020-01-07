const notefulService = {
  getAllFolders(knex) {
    return knex.select('*').from('folders')
  },
  getAllNotes(knex) {
    return knex.select('*').from('notes')
  },
  insertFolder(knex, newFolder) {
    return knex
      .insert(newFolder)
      .into('folders')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  insertNote(knex, newFolder) {
    return knex
      .insert(newFolder)
      .into('notes')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getFolderById(knex, id) {
    return knex.from('folders').select('*').where('id', id).first()
  },
  getNoteById(knex, id) {
    return knex.from('notes').select('*').where('id', id).first()
  },
  deleteFolder(knex, id) {
    this.deleteFolderNotes(knex, id)
    return knex('folders')
      .where({ id })
      .delete()
  },
  deleteNote(knex, id) {
    return knex('notes')
      .where({ id })
      .delete()
  },
  deleteFolderNotes(knex, folderId){
    knex.select('folderId').from('notes')
    .where({folderId})
    .delete()
    .then(data => console.log(data))
  }
}

module.exports = notefulService