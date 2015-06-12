var Bench = {};

Bench = function() {

    this.config = {
        runtime : 1
    };

    this.self = this;
    this.funcs = [];
    this.reports = [];

    this.add = function(func) {
        this.funcs.push(func);
    };

    this.process = function(config) {

        var config = extend({}, this.config, config);

        var i = 0;

        while(i < config.runtime) {

            for (var x = 0; x < this.funcs.length; x++) {

                var t0 = performance.now();

                this.funcs[x]();

                var t1 = performance.now();

                if (this.reports[x] == null)
                    this.reports[x] = [];
                if (this.reports[x][i] == null)
                    this.reports[x][i] = [];

                this.reports[x][i] = t1 - t0;
            }

            i++;
        }

        console.log(this.reports);
    };
};

var test = new Bench();

test.add(function() {
        sleep(10);
});

test.add(function() {
        sleep(20);
});

test.process({
        runtime: 100
    });