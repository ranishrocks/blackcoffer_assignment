// Import mongoose
import mongoose from "mongoose";

// Define the schema
const DataSchema = new mongoose.Schema(
  {
    end_year: { type: Number, required: false },
    intensity: { type: Number, required: true },
    sector: { type: String, required: false },
    topic: { type: String, required: true },
    insight: { type: String, required: true },
    url: { type: String, required: true },
    region: { type: String, required: false },
    start_year: { type: Number, required: false },
    impact: { type: String, required: false },
    added: { type: String, required: true },
    published: { type: String, required: true },
    country: { type: String, required: false },
    relevance: { type: Number, required: true },
    pestle: { type: String, required: true },
    source: { type: String, required: true },
    title: { type: String, required: true },
    likelihood: { type: Number, required: true },
  },
  { timestamps: true }
);

// Explicitly set the collection to 'jsondata'
const DataModel = mongoose.model("DataModel", DataSchema, "jsondata");

// Export the model
export default DataModel;
