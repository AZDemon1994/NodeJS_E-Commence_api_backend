const mongoose = require('mongoose');
const { Schema } = mongoose;

const CatSchema = new Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    subCat: [{ type: Schema.Types.ObjectId, ref: "subCat" }],
    created: { type: Date, default: Date.now }
})

const category = mongoose.model("category", CatSchema);

module.exports = category;