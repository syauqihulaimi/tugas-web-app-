import mongoose from "mongoose";

const { Schema } = mongoose;

const catatan = new Schema({
  judul: {
    type: String,
    required: true,
  },
  konten: {
    type: String,
    required: true,
  },
  tanggal: {
    type: Date,
    required: true,
  },
});

export const Catatan = mongoose.model("Catatan", catatan);
