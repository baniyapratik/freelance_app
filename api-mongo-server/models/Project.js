const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
  Title: String,
  Description: String,
  Skills: String,
  Budget_low: Number,
  Budget_high: Number,
  File: String,
  dateDone: Date,
  status: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  ownerid: { type: Schema.Types.ObjectId, ref: 'User' },
  hiredUser: { type: Schema.Types.ObjectId, ref: 'Hired' },
  paid: { type: Boolean, default: false }
});
mongoose.model('Project', projectSchema);
