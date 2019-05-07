// Generate the buttons for the page first thing on page render.
$(function() {
  renderButtons(searchArray, "searchButton", "#buttonsArea");
  console.log("The version 3 js file for GifTastic is connected.");
});

//Global Variable
var searchArray = [
  "Kylo Ren",
  "Boba Fett",
  "Han Solo",
  "Chewbacca",
  "Darth Maul",
  "C-3PO"
];

//Create function that loops through topic array and creates the buttons.
function renderButtons(searchArray, classToAdd, areaToAddTo) {
  $(areaToAddTo).empty();
  for (var i = 0; i < searchArray.length; i++) {
    var a = $("<button>");
    a.addClass(classToAdd);
    a.attr("data-type", searchArray[i]);
    a.text(searchArray[i]);
    $(areaToAddTo).append(a);
  }
}

// Function that on click of the character buttons queries the giphy API
$(document).on("click", ".searchButton", function() {
  var type = $(this).data("type");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    type +
    "&api_key=jsPVi2AvyrCD5ppjq4PaSKIVi8nxrv1J&limit=10";
  $.ajax({ url: queryURL, method: "GET" }).done(function(response) {
    for (var j = 0; j < response.data.length; j++) {
      var searchDiv = $('<div class="search-item">');
      var rating = response.data[j].rating;
      var p = $("<p>").text("Rating: " + rating);
      var animated = response.data[j].images.fixed_height.url;
      var still = response.data[j].images.fixed_height_still.url;
      var image = $("<img>");
      image.attr("src", still);
      image.attr("data-still", still);
      image.attr("data-animated", animated);
      image.attr("data-state", "still");
      image.addClass("searchImage");
      searchDiv.append(p);
      searchDiv.append(image);
      $("#searches").prepend(searchDiv);
    }
  });
});

//Function for animating on click
$(document).on("click", ".searchImage", function() {
  var state = $(this).attr("data-state");
  if (state == "still") {
    $(this).attr("src", $(this).data("animated"));
    $(this).attr("data-state", "animated");
  } else {
    $(this).attr("src", $(this).data("still"));
    $(this).attr("data-state", "still");
  }
});

// Function from video added line by line but did not work
$("#addTheme").on("click", function() {
  var newSearch = $("input")
    .eq(0)
    .val();
  searchArray.push(newSearch);
  renderButtons(searchArray, "searchButton", "#buttonsArea");
  return false;
});
