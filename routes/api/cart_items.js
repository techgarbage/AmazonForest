const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const CartItem = require('../../models/Cart_Item');

// show all items belongs to user (find by userId)



router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	CartItem.find({ userId: req.user.id })
		.populate("item")
		.then(cartItems => res.json(cartItems))
		.catch(err =>
			res.status(404).json({ noCartItemFound: 'No Items found from this user' }
			)
		);
});

// creating a Cart_Item instance
// item_index, item_show (button: "put in the cart")

router.post('/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const newCartItem = new CartItem({
			userId: req.user.id,
			itemId: req.item.id
		});

		newCartItem
			.save()
			.then(cartItem => res.json(cartItem));
	});

// deleting an CartItem instance

router.delete("/:cart_item_id", (req, res) => {
	// authentification
	passport.authenticate('jwt', { session: false }),
		CartItem.findByIdAndRemove(req.params.cart_item_id, err => {
			if (err) res.send(err);
			else res.json({
				message: "the item has been deleted from cart"
			});
		});
});


module.exports = router;