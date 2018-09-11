const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

const apidocSchema = new Schema({
    "_id": { type: Schema.types.ObjectId },
    "api_doc_path": { type: String, required: true },  // or url to this API document
    "created_time": { type: Date, default: Date.now }
}, { minimize: false });

apidocSchema.pre('save', function (next) {
    this.created_time = Date.now();
    next();
});

//create model
const apidoc = mongoose.model('apidoc', apidocSchema);

module.exports = apidoc;