const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const CartItem = require("../models/CartItem");

// @route   GET api/cart
// @desc    Get all user's cart items
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const cartItem = await CartItem.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(cartItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/cart
// @desc   Create a cart item
// @desc   Private
router.post("/", auth, async (req, res) => {
  const { id, title, price, description, category, image, quantity } = req.body;

  try {
    const newCartItem = new CartItem({
      id,
      title,
      price,
      description,
      category,
      image,
      quantity,
      user: req.user.id,
    });

    const findUser = await CartItem.find({
      user: req.user.id,
      id: req.body.id,
    });

    if (findUser[0] === undefined) {
      const cartItem = await newCartItem.save();
      res.json(cartItem);
    } else {
      console.log("found that item");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  PUT api/cart/:id
// @desc   Update a cart item
// @desc   Private
router.put("/:id", auth, async (req, res) => {
  const { quantity } = req.body;

  const cartItemProps = {};

  if (quantity) cartItemProps.quantity = quantity;

  try {
    let cartItem = await CartItem.findById(req.params.id);

    if (!cartItem) return res.status(404).json({ msg: "Cart item not found" });

    if (cartItem.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    cartItem = await CartItem.findByIdAndUpdate(
      req.params.id,
      { $set: cartItemProps },
      { new: true }
    );

    res.json(cartItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route  DELETE api/cart/:id
// @desc   Delete a cart item
// @desc   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let cartItem = await CartItem.findById(req.params.id);

    if (!cartItem) return res.status(404).json({ msg: "Cart item not found" });

    if (cartItem.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await CartItem.findByIdAndRemove(req.params.id);
    res.json({ msg: "Cart item removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
