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
            var b = $('<button>');
            b.addClass('gifBt');
            b.text(value.toUpperCase());
            $("#butDiv").append(b);
        });
    } //ends displayButtons

    $("#button").on("click", function () {
        var input = $("#txtBox").val();
        $("#txtBox").val('');
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

        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchVal + "&limit=" + limit + "&apikey=" + apiKey + "";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            count = Object.keys(response.data).length;
            for (var i = 0; i < count; i++) {
                gif = response.data[i].images.original.url;
                rating = response.data[i].rating;
                still = response.data[i].images.original_still.url;

                var divForImg = $("<div>");
                var imgGif = $("<img>");
                var imgSpan = $("<span>");

                imgGif.addClass("gifPics");
                imgGif.attr('src', still);

                imgSpan.text("Rating: " + rating.toUpperCase());

                divForImg.addClass("imgDivs");
                divForImg.append(imgGif);
                divForImg.append("<br>");
                divForImg.append(imgSpan);
                $("#gifDiv").append(divForImg);

            } //ends for
            //console.log(resultsArray);
        });

    } //ends ajax

    displayButtons();

}); //ends ready