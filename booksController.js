const createError = require("http-errors");

let booklist = [];
let idno = 0;

exports.index = function (req, res) {
  console.log("arrived");
  res.send(booklist);
};

exports.create = function (req, res) {
  if (!req.body.title) {
    return next(createError(400, "title is required"));
  }
  if (!req.body.author) {
    return next(createError(400, "author is required"));
  }
  booklist.push({
    id: idno,
    title: req.body.title,
    author: req.body.author,
    read: false,
  });
  res.send({ result: true });
  idno++;
};

exports.show = function (req, res, next) {
  const bookitem = booklist.find((book) => book.id == req.params.id);
  if (!bookitem) {
    return next(createError(404, "no book with that id"));
  }
  res.send(bookitem);
};

exports.delete = function (req, res, next) {
  const bookitem = booklist.find((book) => book.id == req.params.id);
  if (!bookitem) {
    return next(createError(404, "no book with that id"));
  }
  booklist = booklist.filter((book) => book.id != req.params.id);
  res.send({ result: true });
};

exports.update = function (req, res, next) {
  const bookitem = booklist.find((book) => book.id == req.params.id);
  if (!req.body.title) {
    return next(createError(400, "title is required"));
  }
  if (!req.body.author) {
    return next(createError(400, "author is required"));
  }
  if (!req.body.read) {
    return next(createError(400, "read true or false is required"));
  }
  if (!bookitem) {
    return next(createError(404, "no book with that id"));
  }
  booklist = booklist.map((book) => {
    if (book.id == req.params.id) {
      book.title = req.body.title;
      book.author = req.body.author;
      book.read = req.body.read;
    }
    return book;
  });
  res.send({ result: true });
};
