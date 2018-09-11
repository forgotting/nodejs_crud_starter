const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

const user_accountInfoSchema = new Schema({

    
    "user_name": { type: String, required: true },
    "password": { type: String, required: true },
    "email": { type: String, required: true },
    "groups":  { type: [Schema.Types.Mixed], default: [] },  // array of servicegroup._id (foriegn, ref)
    "role": { type: String, lowercase: true, trim: true, enum: ['superuser', 'admin', 'user', 'community'], required: true },
    "approved": { type: Boolean, required: true, default: false },
    "uploadable":  { type: Boolean, required: true, default: false },
    "updated_time": { type: Date, default: Date.now },
    "created_time": { type: Date, default: Date.now }

}, { minimize: false });

user_accountInfoSchema.pre('save', function (next) {
    this.updated_time = Date.now();
    //this.display_name = this.get('display_name') || this.get('username');
    next();
});

//create model
const user_modelInfo = mongoose.model('user_accounts', user_accountInfoSchema);

module.exports = user_modelInfo;