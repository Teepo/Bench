/* eslint-env jquery */

"use strict";

import { Bench } from './Bench.js';

document.addEventListener('DOMContentLoaded', () => {

    var test = new Bench();

    test.add(() => {

        let i = 0;
        while (i <= 100)
        {
            $('#log').append('<div class="lol"></div>');

            i++;
        }

        $('#log').html('');
    });

    test.add(() => {

        let i = 0;

        while (i <= 100)
        {
            let div = document.createElement('div');
            div.classList.add('lol');

            document.getElementById('log').appendChild(div);

            i++;
        }

        document.getElementById('log').innerHTML = "";
    });

    test.add(() => {

        let i = 0;
        while (i <= 100)
        {
            $('<div></div>').addClass('lol').appendTo('#log');
            i++;
        }

        $('#log').html('');
    });

    test.add(() => {

        let i = 0;
        while (i <= 100)
        {
            let div = $('<div class="lol"></div>');
            $('#log').append(div);

            i++;
        }

        $('#log').html('');
    });

    test.process({
        iteration: 250
    });

});