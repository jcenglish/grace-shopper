const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  isFulfill: {
    type: Sequelize.STRING,
    validate: {
      isIn: {
        args: [['Shipped', 'Pending']],
        msg: 'Must be Pending or Shipped'
      }
    }
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  shippingAddress: {
    type: Sequelize.STRING
  },
  billingAddress: {
    type: Sequelize.STRING
  }
})

const OrderProduct = db.define('order_product', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  price: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

Order.prototype.addOrderItem = async item => {
  console.log('THIS FROM ORDER INSTANCE', this)
  try {
    await this.addProducts(item)
  } catch (err) {
    console.log(err)
  }
}

module.exports = {Order, OrderProduct}
