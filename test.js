$(document).ready(function() {

    var test = new Bench();

    test.add(function() {

        var i = 0;
        while(i <= 100)
        {
            $('#log').append('<div class="lol"></div>');

            i++;
        }

        $('#log').html('');
    });

    test.add(function() {

        var i = 0;

        while(i <= 100)
        {
            var div = document.createElement('div');
            div.classList.add('lol');

            document.getElementById('log').appendChild(div);

            i++;
        }

        document.getElementById('log').innerHTML = "";
    });

    test.add(function() {

        var i = 0;
        while(i <= 100)
        {
            $('<div></div>').addClass('lol').appendTo('#log');
            i++;
        }

        $('#log').html('');
    });

    test.add(function() {

        var i = 0;
        while(i <= 100)
        {
            var div = $('<div class="lol"></div>');
            $('#log').append(div);

            i++;
        }

        $('#log').html('');
    });


    test.process({
        iteration: 250
    });

});