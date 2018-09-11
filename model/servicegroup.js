const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

const servicegroupSchema = new Schema({
    "_id": { type: Schema.types.ObjectId },
    "group_name": { type: String, index: { unique: true } },
    "service_list": { type: Schema.types.Mixed, default: [] },
    "updated_time": { type: Date, default: Date.now },
    "created_time": { type: Date, default: Date.now }
}, { minimize: false });

servicegroupSchema.pre('save', function (next) {
    this.created_time = Date.now();
    next();
});

//create model
const servicegroup = mongoose.model('servicegroup', servicegroupSchema);

module.exports = servicegroup;