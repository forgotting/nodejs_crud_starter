const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

const accesskeySchema = new Schema({
    "_id": { type: Schema.types.ObjectId },
    "access_key": { type: String, required: true },
    "security_key": { type: String, required: true },
    "edit_by": { type: Schema.types.ObjectId, ref: 'user' },
    "updated_time": { type: Date, default: Date.now },
    "created_time": { type: Date, default: Date.now }
}, { minimize: false });

accesskeySchema.pre('save', function (next) {
    this.created_time = Date.now();
    next();
});

//create model
const accesskey = mongoose.model('accesskey', accesskeySchema);

module.exports = accesskey;