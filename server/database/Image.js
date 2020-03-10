import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const ImageSchema = new mongoose.Schema({
  filename: String,
})

const Image = mongoose.model('Image', ImageSchema)

export default Image;