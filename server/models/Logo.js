var mongoose = require('mongoose');









var LogoSchema = new mongoose.Schema({
  id: String,
  width: { type: Number, min: 2, max: 2000 },
  height: { type: Number, min: 2, max: 2000 },
  text: [
    {
      posX: Number,
      posY: Number,
      textString: String,
      textFontSize: { type: Number, min: 2, max: 144 },
      textColor: String


    }

  ],

  backgroundColor: String,
  borderColor: String,
  borderRadius: { type: Number, min: 0, max: 144 },
  borderWidth: { type: Number, min: 0, max: 144 },
  margin: { type: Number, min: 0, max: 144 },
  padding: { type: Number, min: 0, max: 144 },

  images: [

    {

    imageString: String,
    imageX: Number,
    imageY: Number,
    width: Number,
    height: Number,


    }


  ],
  lastUpdate: { type: Date, default: Date.now },
});




module.exports = mongoose.model('Logo', LogoSchema);
