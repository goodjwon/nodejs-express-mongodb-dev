const mongooe =  require('mongoose');
const Schema = mongooe.Schema;

const UserSchema = new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    date:{type:Date, default:Date.now}
});

mongooe.model('users', UserSchema);