import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const TagSchema = new mongoose.Schema({
  name: { type: String, unique: true }
})

const Tag = mongoose.model('Tag', TagSchema)

export default Tag;