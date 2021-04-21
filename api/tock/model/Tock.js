const mongoose = require("mongoose");

const tockSchema = mongoose.Schema({
  title: {
    type: String,
    required: [false]
  },
  createdLink: {
    type: String,
    required: [false]
  },
  veg: {
    type: Boolean,
    required: [false]
  },
  image: {
    type: String,
    required: [false]
  },
  description: {
    type: String,
    required: [false]
  },
  delivery: {
    type: Boolean,
    required: [false]
  },
  _id: {
    type: Number,
    required: [true]
  }
});


tockSchema.statics.findByTockId = async (id) => {
    let _id = id;
    const tock = await Tock.findOne({ _id });

    if(!tock) {
        throw new Error({ error: "Invalid tock id" });
      }
      // console.log(tock)
      return tock
}

const Tock = mongoose.model("Tock", tockSchema);
module.exports = Tock;