const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    timestamp: { type: Date, required: true },
    text: { type: String, required: true },
});

MessageSchema.virtual("url").get(function () {
    return `/messages/${this._id}`;
});

MessageSchema.virtual("timestamp_formatted").get(function () {
    return this.timestamp ? DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATETIME_SHORT) : '';
});

module.exports = mongoose.model("Message", MessageSchema);