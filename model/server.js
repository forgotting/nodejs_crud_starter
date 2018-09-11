const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

const serverSchema = new Schema({
    "_id": { type: Schema.types.ObjectId },
    "server_name": { type: String, index: { unique: true } },
    "region": { type: String, required: true },
    "instance_type": { type: String, required: true },
    "service_id": { type: Schema.types.ObjectId, required: true },
    "description": { type: String, default: '' },
    "data": { type: Schema.types.Mixed }, // ????
    "created_time": { type: Date, default: Date.now }
}, { minimize: false });

serverSchema.pre('save', function (next) {
    this.created_time = Date.now();
    next();
});

//create model
const server = mongoose.model('server', serverSchema);

module.exports = server;