const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
		},
		description: {
			type: String,
		},
		files: [Object],
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

postSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'user',
		select: 'firstName lastName photo',
	});
	next();
});

module.exports = mongoose.model('Post', postSchema);
