const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, minLength: 3, maxLength: 100 },
    password: { type: String, required: true },
    first_name: { type: String, required: true, maxLength: 100 },
    last_name: { type: String, required: true, maxLength: 100 },
    member_status: { type: String, default: "Unverified" },
    admin: { type: Boolean, default: false },
});

UserSchema.virtual("fullname").get(() => {
    let fullname = "";
    if (this.first_name && this.last_name) {
        fullname = `${this.first_name} ${this.last_name}`;
    }
  
    return fullname;
});

module.exports = mongoose.model("User", UserSchema);