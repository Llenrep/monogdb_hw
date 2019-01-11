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
var mongoose = require("mongoose")

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
  res.render("index.handlebars");
});

axios.get("https://www.businessinsider.com/most-biased-news-outlets-in-america-cnn-fox-nytimes-2018-8#5-cnn-27-5").then(function (response) {

  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(response.data);

  // An empty array to save the data that we'll scrape
  var results = [];

  // Select each element in the HTML body from which you want information.
  // NOTE: Cheerio selectors function similarly to jQuery's selectors,
  // but be sure to visit the package's npm page to see how it works
  $(".slide-wrapper").each(function (i, element) {

    var title = $(".slide-title").children().text().replace(/\r?\n|\r/g, " ").trim();
    var texts = $(".slide-title").children().text();

    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
      title: title,
      link: texts
    });
  });

  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results);
});

var server = app.listen(PORT, function () {
  console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});
