const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    "_id": { type: Schema.types.ObjectId },
    "service_name": { type: String, index: { unique: true } },
    "region": { type: String, required: true },
    "instance_type": { type: String, required: true },
    "data": { type: Schema.types.Mixed },
    "docker_img_id": { type: Schema.types.ObjectId, ref: 'docker', required: true },
    "api_doc_id": { type: Schema.types.ObjectId, ref: 'apidoc' },
    "description": { type: String, default: '' },
    "updated_time": { type: Date, default: Date.now },
    "created_time": { type: Date, default: Date.now }
}, { minimize: false });

serviceSchema.pre('save', function (next) {
    this.created_time = Date.now();
    next();
});

//create model
const service = mongoose.model('service', serviceSchema);

module.exports = service;