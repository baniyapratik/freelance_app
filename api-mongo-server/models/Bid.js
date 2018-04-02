const mongoose = require('mongoose');
const { Schema } = mongoose;

const bidSchema = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  bid_value: Number,
  bidDate: { type: Date, default: Date.now }
});
mongoose.model('Bid', bidSchema);
