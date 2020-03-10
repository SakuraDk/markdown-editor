import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const DocumentSchema = new mongoose.Schema({
  // path
  path: { type: String, required: true, unique: true },
  parent: { type: String, required: true },
  children: [String],

  // data
  text: String,
  tags: [String],

  // date
  updated: String,
})

const Document = mongoose.model('Document', DocumentSchema)

export default Document;