var cheerio = require("cheerio");
//requiring cheerio
var axios = require("axios");
//requiring axios
var express = require("express");
//requiring express
var handlebars = require("express-handlebars");
//requiring handlebarsssss
var path = require("path");
//requiring path

var PORT = 8080 || process.env.PORT;

// var MONGODB_URI =
//   process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// mongoose.connect(MONGODB_URI);

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.engine("handlebars", handlebars({ defaultLayout: "main" }));

app.get("/", function (req, res) {
  res.render("index.handlebars", { someProp: 3 });
});

var server = app.listen(PORT, function () {
  console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});
