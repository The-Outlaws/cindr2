const router = require('express').Router()
const {User} = require('../db/models')
const cloudinary = require('cloudinary')
require('../cloudinary')
const upload = require('../multer')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/uploads', upload.single('image'), async (req, res, next) => {
  try {
    const result = await cloudinary.v2.uploader.upload(req.file.path)
    const user = await User.findByPk(req.user.id)
    user.update({photo: result.secure_url})
  } catch (err) {
    next(err)
  }
})
