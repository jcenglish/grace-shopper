const router = require('express').Router()
const {Product, Review, Category} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll()
    res.json(allProducts)
  } catch (err) {
    next(err)
  }
})

// this is important! will list the categoryList on the sidebar
router.get('/category/categoryList', async (req, res, next) => {
  try {
    const categories = await Category.all()
    res.json(categories)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id, {
      include: [{all: true, nested: true}] //[{model: Review}, {model: Category}]
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.get('/category/:categoryId', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {categoryId: req.params.categoryId},
      include: [{model: Category}]
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// ------------------------- admin ONLY -----------------------
const adminsOnly = (req, res, next) => {
  if (!req.user.isAdmin) {
    const err = new Error('not allowed')
    err.status = 401
    return next(err)
  }
  next()
}

router.post('/', adminsOnly, async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', adminsOnly, async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    const data = await product.update(req.body)
    if (!product) return res.sendStatus(404)
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', adminsOnly, async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.id
      }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
