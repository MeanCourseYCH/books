"use strict";
var bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true }
});
