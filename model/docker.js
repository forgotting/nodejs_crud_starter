const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

const dockerSchema = new Schema({
    "_id": { type: Schema.types.ObjectId },
    "docker_repo_url": { type: String, required: true },
    "created_time": { type: Date, default: Date.now }
}, { minimize: false });

dockerSchema.pre('save', function (next) {
    this.created_time = Date.now();
    next();
});

//create model
const docker = mongoose.model('docker', dockerSchema);

module.exports = docker;