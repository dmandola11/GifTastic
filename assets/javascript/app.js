$(document).ready(function() {
    //array of strings used to create buttons and their data
    var food = ["pizza", "cheeseburger", "cereal", "bacon", "cupcake", "fries", "pasta",
        "cheese", "sushi", "bread", "gelato", "sandwich"
    ];

	
    function addButtons() {
        $('#foodButtons').empty();
        //loop that runs through the array 
        for (var i = 0; i < food.length; i++) {

            //creates buttons for each index of array
            var displayButtons = $('<button type ="button" class="button">' + food[i] + '</button>');

            //sets data-name to the index of aray
            displayButtons.attr('data-name', food[i]);
            console.log(displayButtons);

            //places the buttons in the foodButtons div
            $('#foodButtons').append(displayButtons);

        };

        
        
        //function to get JSON object from Giphy API 
        $(".button").on('click', function() {
            var foodGif = $(this).data('name');

            //searching by data-name of the button and limiting it to 10 GIFs
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + foodGif + "&api_key=dc6zaTOxFJmzC&limit=10";

            $.ajax({
                    url: queryURL,
                    method: 'GET'
                })
                .done(function(response) {
                    var results = response.data;
                    //empties the div so the GIFs don't keep appending in the div
                    $("#food").empty();

                    //excluding explicit content
                    for (var i = 0; i < results.length; i++) {
                        if (results[i].rating == "r" || results[i].rating == "pg-13") {

                        } else {
                            //setting up divs to put imgs and ratings in them
                            var foodDiv = $('<div>');
                            var p = $('<p>').text("Rating: " + results[i].rating);
                            var foodImage = $('<img>');


                            foodImage.addClass('foodImage');
                            // these attributes will pull the correct still/animated image from the 
                            // API that I want and set the data-state
                            foodImage.attr('data-state', 'still');
                            foodImage.attr('src', results[i].images.fixed_width_still.url);
                            foodImage.attr('data-still', results[i].images.fixed_width_still.url);
                            foodImage.attr('data-animate', results[i].images.fixed_width.url);

                            // adding the <p> and <img> into the div
                            foodDiv.append(p);
                            foodDiv.append(foodImage);

                            // displays the divs in the food div in the HTML
                            $('#food').prepend(foodDiv);
                        };
                    };

                    // this function allows the still images to change to animated images
                    // once the image is clicked and vice versa
                    $('.foodImage').on('click', function() {
                        var state = $(this).attr('data-state');
                        if (state == 'still') {
                            $(this).attr('src', $(this).data('animate'));
                            $(this).attr('data-state', 'animate');
                        } else {
                            $(this).attr('src', $(this).data('still'));
                            $(this).attr('data-state', 'still');
                        }
                    });

                });
//trying to add buttons from user input
        $('#addFood').on('click', function() {
            var search = $('#food-input').val().trim();
            console.log(search);
            food.push(search);
            // I wanted to add to the array using food.push(search) but couldn't get it to work. I created buttons instead 
            //from the input button
            //var searchButton = $('<button type ="button" class="button" data-name=' + search + '>' + search + '</button>');
            //$('#foodButtons').append(searchButton);
            
            addButtons();
            return false;   
        });
        });
    };

    addButtons();


});
