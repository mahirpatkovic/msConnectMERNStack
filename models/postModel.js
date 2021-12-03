const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
		},
		description: {
			type: String,
		},
		files: [String],
		likes: {
			type: Array,
			default: [],
		},
		visible: {
			type: String,
			enum: ['onlyMe', 'friends', 'public'],
			default: 'onlyMe',
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
