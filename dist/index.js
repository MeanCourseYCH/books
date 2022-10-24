"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var book_model_1 = __importDefault(require("./models/book.model"));
var body_parser_1 = __importDefault(require("body-parser"));
var app = (0, express_1["default"])();
// app.use(bodyParser.json)
app.use(body_parser_1["default"].json());
var uri = 'mongodb://root:AMSHXbKIoiG2@192.168.64.4:27017/biblio?authSource=admin';
mongoose_1["default"].connect(uri, function (err) {
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
// ?page=Xsize=Y
app.get('/booksParPage', function (req, res) {
    var _a, _b;
    var page = parseInt(((_a = req.query.page) === null || _a === void 0 ? void 0 : _a.toString()) || '1');
    var size = parseInt(((_b = req.query.size) === null || _b === void 0 ? void 0 : _b.toString()) || '5');
    book_model_1["default"].paginate({}, { page: page, limit: size }, function (err, books) {
        if (err)
            res.status(500).send(err);
        else
            res.send(books);
    });
});
app.get('/booksSearch', function (req, res) {
    var _a, _b;
    var search = req.query.search || '';
    var page = parseInt(((_a = req.query.page) === null || _a === void 0 ? void 0 : _a.toString()) || '1');
    var size = parseInt(((_b = req.query.size) === null || _b === void 0 ? void 0 : _b.toString()) || '5');
    book_model_1["default"].paginate({ title: { $regex: ".*(?i)" + search + ".*" } }, { page: page, limit: size }, function (err, books) {
        if (err)
            res.status(500).send(err);
        else
            res.send(books);
    });
});
app.post('/books', function (req, res) {
    var book = new book_model_1["default"](req.body);
    book.save(function (err) {
        if (err)
            return res.status(500).send(err);
        else
            return res.status(200).send(book);
    });
});
app["delete"]('/books/:id', function (req, res) {
    book_model_1["default"].findByIdAndDelete(req.params.id, function (err) {
        if (err)
            return res.status(500).send(err);
        else
            return res.send("book deleted");
    });
});
app.put('/books/:id', function (req, res) {
    book_model_1["default"].findByIdAndUpdate(req.params.id, req.body, function (err, book) {
        if (err)
            return res.status(500).send(err);
        else
            return res.status(200).send(book);
    });
});
app.get('/books/:id', function (req, res) {
    book_model_1["default"].findById(req.params.id, function (err, book) {
        if (err)
            return res.status(500).send(err);
        else
            return res.status(200).send(book);
    });
});
app.get('/', function (req, res) {
    res.send('Hello World!');
});
var port = 8085;
var connected = false;
app.listen(port, function () {
    console.log('Server is running on port ' + port);
});
