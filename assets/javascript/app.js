$(document).ready(function() {

    var food = ["pizza", "cheeseburger", "cereal", "bacon", "cupcake", "fries", "pasta",
        "cheese", "sushi", "bread", "gelato", "sandwich"
    ];



    function addButtons() {
        for (var i = 0; i < food.length; i++) {

            var displayButtons = $('<button type ="button" class="button">' + food[i] + '</button>');
            displayButtons.attr('data-name', food[i]);
            console.log(displayButtons);
            $('#foodButtons').append(displayButtons);

        };
		
		$('#addFood').on('click', function() {
        var search = $('#food-input').val().trim();
        console.log(search);
        var searchButton = $('<button type ="button" class="button" data-name=' + search + '>' + search + '</button>');
        $('#foodButtons').append(searchButton);
        return false;
    });

        $(".button").on('click', function() {
            var foodGif = $(this).data('name');
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + foodGif + "&api_key=dc6zaTOxFJmzC&limit=10";

            $.ajax({
                    url: queryURL,
                    method: 'GET'
                })
                .done(function(response) {
                    var results = response.data;
                    $("#food").empty();
                    for (var i = 0; i < results.length; i++) {
                        if (results[i].rating == "r" || results[i].rating == "pg-13") {

                        } else {

                            var foodDiv = $('<div>');
                            var p = $('<p>').text("Rating: " + results[i].rating);
                            var foodImage = $('<img>');


                            foodImage.addClass('foodImage');
                            foodImage.attr('data-state', 'still');
                            foodImage.attr('src', results[i].images.fixed_width_still.url);
                            foodImage.attr('data-still', results[i].images.fixed_width_still.url);
                            foodImage.attr('data-animate', results[i].images.fixed_width.url);


                            foodDiv.append(p);
                            foodDiv.append(foodImage);

                            $('#food').prepend(foodDiv);
                        };
                    };

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

        });
    };

    addButtons();


});
