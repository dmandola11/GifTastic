$(document).ready(function() {

            var food = ["pizza", "cheeseburger", "cereal", "bacon", "cupcake", "fries", "pasta",
             "curry", "sushi", "bread", "gelato", "sandwich"];

            function addButtons(){
            for (var i = 0; i < food.length; i++) {

                var displayButtons = $('<button type ="button">' + food[i] + '</button>');
                console.log(displayButtons);
                $('#foodButtons').append(displayButtons);

                }
                }
                addButtons();
            });
