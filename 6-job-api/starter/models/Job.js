const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Please provide company name'],
    maxlength: 50,
  },
  position: {
    type: String,
    required: [true, 'Please provide position'],
    maxlength: 100,
  },
  status: {
    type:String,
    enum: ['interview', 'declined', 'pending'],
    default: 'pending',
  },
  // It's hard to understand.
  // In my understand, createdBy will take document id from user id and keep in itself.
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',  // model referance => stick the user with job.
    required: [true, 'Please provide user'],
  }
}, {timestamps:true}); // The timestamp give a created and update date.

module.exports = mongoose.model('Job', JobSchema)
