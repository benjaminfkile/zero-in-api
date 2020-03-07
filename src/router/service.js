const service = {
  getAllAddresses(knex) {
    return knex.select('*').from('addresses')
  },
  getAllBuildings(knex) {
    return knex.select('*').from('building')
  },
  insertAddress(knex, newAddress) {
    return knex
      .insert(newAddress)
      .into('addresses')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  insertBuilding(knex, newBuilding) {
    return knex
      .insert(newBuilding)
      .into('building')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getAddressById(knex, id) {
    return knex.from('addresses').select('*').where('id', id).first()
  },
  getBuildingById(knex, id) {
    return knex.from('building').select('*').where('id', id).first()
  },
  deleteAddress(knex, id) {
    this.deleteAddressAndBulding(knex, id)
    return knex('addresses')
      .where({ id })
      .delete()
  },
  deleteBuilding(knex, id) {
    return knex('building')
      .where({ id })
      .delete()
  },
  deleteAddressAndBulding(knex, addressId){
    knex.select('addressId').from('building')
    .where({addressId: addressId})
    .delete()
    .then(data => console.log(data))
  }
}

module.exports = service