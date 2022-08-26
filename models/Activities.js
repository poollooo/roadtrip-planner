const { Schema, model } = require("mongoose");

const activitiesSchema = new Schema({
  categories: {
    type: Schema.Types.String,
    enum: ["ATTRACTION"],
  },
  location_id: {
    type: Schema.Types.String,
    required: true,
  },
  startDate: {
    type: Schema.Types.Date,
  },
  endDate: {
    type: Schema.Types.Date,
  },
  note: {
    type: Schema.Types.String,
  },
  tripId: {
    type: Schema.Types.ObjectId,
    ref: 'Trip', 
    required: true
  }
});




