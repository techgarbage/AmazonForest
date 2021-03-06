const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	itemId: {
		type: Schema.Types.ObjectId,
		ref: 'items'
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	body: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Comment = mongoose.model('comments', CommentSchema);
