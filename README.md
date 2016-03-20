# Bench
> Script to visualize the execution time between each function.

## Getting started

```js
var test = new Bench();

test.add(:SOME_FUNCTION_TO_TEST_1:);
test.add(:SOME_FUNCTION_TO_TEST_2:);
test.add(:SOME_FUNCTION_TO_TEST_3:);

// begin benchmark
test.process();
```

# Options

On running process(), you can pass some options
```js
test.process({

  // the number of times each test will be executed. Default: 10
  iteration : 10
});
```

# Examples

See it "test.js" files.

We create 4 tests, we make a <lol> tag, and we append it in the DOM. After we empty it.

```js
var test = new Bench();

test.add(function() {

  var i = 0;
  while (i <= 100) {
    $('#log').append('<div class="lol"></div>');

      i++;
  }

  $('#log').html('');
});

test.add(function() {

    var i = 0;

    while (i <= 100) {
        var div = document.createElement('div');
        div.classList.add('lol');

        document.getElementById('log').appendChild(div);

        i++;
    }

    document.getElementById('log').innerHTML = "";
});

test.add(function() {

    var i = 0;
    while (i <= 100) {
        $('<div></div>').addClass('lol').appendTo('#log');
        i++;
    }

    $('#log').html('');
});

test.add(function() {

    var i = 0;
    while (i <= 100) {
        var div = $('<div class="lol"></div>');
        $('#log').append(div);

        i++;
    }

    $('#log').html('');
});


test.process({
    iteration: 250
});
```

At the end of process(), if you look in your JS console, this will be displayed :

![alt tag](https://cloud.githubusercontent.com/assets/332863/13904775/c05cee54-eeab-11e5-9680-d71c690fd1cb.png)

And a graph

![alt tag](https://cloud.githubusercontent.com/assets/332863/13904768/ab510a54-eeab-11e5-9811-d244f50f5f4e.png)
