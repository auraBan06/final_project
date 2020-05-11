var mongoose = require('mongoose');









var LogoSchema = new mongoose.Schema({
  id: String,
  width: { type: Number, min: 2, max: 2000 },
  height: { type: Number, min: 2, max: 2000 },
  text: [String],
  color: String,
  backgroundColor: String,
  borderColor: String,
  borderRadius: { type: Number, min: 2, max: 144 },
  borderWidth: { type: Number, min: 2, max: 144 },
  margin: { type: Number, min: 2, max: 144 },
  padding: { type: Number, min: 2, max: 144 },
  fontSize: { type: Number, min: 2, max: 144 },
  images: [String],
  lastUpdate: { type: Date, default: Date.now },
});




module.exports = mongoose.model('Logo', LogoSchema);
