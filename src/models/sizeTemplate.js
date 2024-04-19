import mongoose from "mongoose";

const SizeTemplateSchema = new mongoose.Schema({
  category: { type: String, required: true },
  sizeList: { type: [String], required: true },
});
let SizeTemplate =
  mongoose.models.SizeTemplate ||
  mongoose.model("SizeTemplate", SizeTemplateSchema);
export default SizeTemplate;
