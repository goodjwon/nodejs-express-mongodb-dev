const mongooe =  require('mongoose');
const Schema = mongooe.Schema;

const IdeaSchema = new Schema({
    title:{type:String, required:true},
    details:{type:String, required:true},
    date:{type:Date, default:Date.now}
});

mongooe.model('ideas', IdeaSchema);