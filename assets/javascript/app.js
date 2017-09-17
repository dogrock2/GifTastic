$().ready(function () {

    var apiKey = "UdjRxsowYYW203C6Dwb3BmHSL2JUSXc4";
    var limit = 10;

    var startButtons = [
        "cats", "dogs", "snl", "game-of-thrones", "cars",
        "bikes", "hbo", "reactions", "stickers", "drinks",
        "boxing", "baseball", "parks", "volcano", "spiders"
    ];

    function displayButtons() {
        $("#butDiv").empty();
        $.each(startButtons, function (index, value) {
            $("#butDiv").append("<button type='button' class='gifBt'>" + value.toUpperCase() + "</button>");
        });
    } //ends displayButtons

    $("#button").on("click", function () {
        var input = $("#txtBox").val();
        $("#txtBox").val('');
        //$("#butDiv").append("<button type='button' class='gifBt'>" + input.toUpperCase() + "</button>");
        startButtons.push(input);
        displayButtons();
    });

    $("#butDiv").on("click", ".gifBt", function () {
        var input = $(this).text();
        $("#gifDiv").empty();
        runAjax(input);
    });

    $("#gifDiv").on("click", "img", function () {
        var originalSrc = $(this).attr('src');
        var len = originalSrc.length;
        var stillUrl;
        var gifUrl;

        var stillSrc = function () {
            var splitted = originalSrc.substring(0, len - 4);
            stillUrl = splitted + "_s.gif";
        };

        var gifSrc = function () {
            var splitted = originalSrc.substring(0, len - 6);
            gifUrl = splitted + ".gif";
        };


        var chkUrl = originalSrc.substring(len - 6, len - 4);
        if (chkUrl === "_s") {
            gifSrc();
            $(this).attr('src', gifUrl);
        } else {
            stillSrc();
            $(this).attr('src', stillUrl);
        }

    });

    function runAjax(searchVal) {
        var count = 0;
        var gif;
        var still;
        var rating;

        queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchVal + "&limit=" + limit + "&apikey=" + apiKey + "";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            count = Object.keys(response.data).length;
            for (var i = 0; i < count; i++) {
                gif = response.data[i].images.original.url;
                rating = response.data[i].rating;
                still = response.data[i].images.original_still.url;
                $("#gifDiv").append('<div class="imgDivs"><img src="' + still + '" class="gifPics"><br><span>Rated: ' + rating.toUpperCase() + '</span></div>');

            } //ends for
            //console.log(resultsArray);
        });

    } //ends ajax

    displayButtons();

}); //ends ready