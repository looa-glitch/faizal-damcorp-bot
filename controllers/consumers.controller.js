const config = require('../constant').config
const helper = require('../helper/helper')
const moment = require('moment')
const uniqid = require('uniqid')
const _ = require('lodash')
/* Model */
const users = require('../model/users')
class consumersController {

    static async createUser(name,phone,perusahaan,email,lokasi,photo,ticket){
        return new Promise((resolve, reject) => {
            users.create({
                name: name,
                phone: phone.toString(),
                perusahaan: perusahaan,
                email: email,
                lokasi: lokasi,
                photo: photo,
                ticket: ticket,
                createdAt: moment().format(),
                updatedAt: moment().format()
            }).then(result => resolve(result))
            .catch(err => reject(err))
        })
    }
    static async getUserByPhone(phone){
        return new Promise((resolve, reject) => {
            users.findOne({
                phone: phone
            }).lean()
            .then(result => resolve(result))
            .catch(err => reject(err))
        })
    }

}

module.exports = consumersController