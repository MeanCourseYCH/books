"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var book_model_1 = __importDefault(require("./models/book.model"));
var app = (0, express_1["default"])();
var uri = 'mongodb://root:AMSHXbKIoiG2@192.168.64.4:27017/biblio?authSource=admin';
var connection = mongoose_1["default"].connect(uri, function (err) {
    if (err) {
        console.log(err.message);
    }
    else {
        console.log("Successfully Connected!");
    }
});
app.get('/books', function (req, res) {
    book_model_1["default"].find(function (err, books) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).json(books);
        }
    });
});
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(3000, function () {
    console.log('Server is running on port 3000');
});
