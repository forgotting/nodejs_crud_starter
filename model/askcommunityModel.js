const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

const askcommunitySchema = new Schema({
    "_id": { type: Schema.types.ObjectId },
    "user": { type: Schema.types.ObjectId, ref: 'user', required: true },
    "created_time": { type: Date, default: Date.now }
}, { minimize: false });

askcommunitySchema.pre('save', function (next) {
    this.created_time = Date.now();
    next();
});

//create model
const askcommunity = mongoose.model('askcommunity', askcommunitySchema);

module.exports = askcommunity;