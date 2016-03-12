var Bench = (function() {

    this.config = {
        iteration : 10
    };

    this.funcs = [];

    this.executions = [];

    this.avg = [];

    this.min_test = null;
    this.min_value = null;

    this.max_test = null;
    this.max_value = null;

    this.add = function(func) {

        this.funcs.push(func);
    };

    this.process = function(config) {

        this.config = $.extend(this.config, config);

        var i = 0;

        while(i < this.config.iteration) {

            for (var x = 0; x < this.funcs.length; x++) {

                var t0 = performance.now();

                this.funcs[x]();

                var t1 = performance.now();

                if (this.executions[x] == null)
                    this.executions[x] = [];
                if (this.executions[x][i] == null)
                    this.executions[x][i] = [];

                this.executions[x][i] = t1 - t0;
            }

            i++;
        }

        console.log(this.executions);

        this.drawChart();

        this.report();

    };

    this.drawChart = function() {

        var data = [];
        for (var x = 0; x < this.executions.length; x++)
            data.push({'data' : this.executions[x]});

        $('#chart').highcharts({
            'chart' : {
                'type' : 'area'
            },
            series : data
        });

    };

    this.report = function() {

        var str = [];
        for (var x = 0; x < this.executions.length; x++)
        {
            var sum = 0;

            // save best and worst test.
            for (var i = 0; i < this.executions[x].length; i++)
            {
                var ms = this.executions[x][i];

                // init min & max value
                if (this.min_value == null)
                {
                    this.min_value = ms;
                    this.min_test = x;
                }
                if (this.max_value == null)
                {
                    this.max_value = ms;
                    this.max_test = x;
                }

                // search min & max value
                if (ms < this.min_value)
                {
                    this.min_value = ms
                    this.min_test = x;
                }
                if (ms > this.max_value)
                {
                    this.max_value = ms
                    this.max_test = x;
                }

                if (this.avg[x] == null)
                    this.avg[x] = 0;

                this.avg[x] += ms;
            }
        }

        delete i;
        for (var i = 0; i < this.executions.length; i++)
        {
            var opt = null;
            if (i == this.min_test)
                opt = "color:#fff;background-color:rgb(40, 163, 40);";
            if (i == this.max_test)
                opt = "color:#fff;background-color:tomato;";

            console.log(
                "%cLe Test %d a mis en moyenne %f ms sur un panel de %f essais, pour un total de %f ms d'executions.",
                opt, i, (this.avg[i] / this.config.iteration), this.config.iteration, this.avg[i]
            );
        };
    };
});