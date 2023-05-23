const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
} = require("../controllers/orderController");
const { deleteUser } = require("../controllers/userController");
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);

//for user
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
//for admin user
//router.route("/order/:id").get(isAuthenticatedUser, authorizeRoles("admin"),getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);
module.exports = router;
