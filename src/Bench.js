/* eslint-env jquery */

/**
 *
 * @class
 */
export class Bench {

    constructor() {

        this.config = {
            iteration : 10
        };

        this.functions = [];

        this.executions = [];

        this.avg = [];

        this.min_test  = null;
        this.min_value = null;

        this.max_test  = null;
        this.max_value = null;
    }

    /**
     * @description Add function to bench into the pool
     *
     * @param {Function} fct
     *
     */
    add(fct) {

        this.functions.push(fct);
    }

    /**
     * @description Run all pool functions
     *
     * @param {Object} config
     *
     */
    process(config) {

        this.config = $.extend(this.config, config);

        let i = 0;

        while (i < this.config.iteration)
        {
            for (let x = 0; x < this.functions.length; x++)
            {

                let t0 = performance.now();

                this.functions[x]();

                let t1 = performance.now();

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
    }

    /**
     * @description Draw Googlechart to summarize report
     *
     */
    drawChart() {

        let data = [];
        for (let x = 0; x < this.executions.length; x++)
            data.push({'data' : this.executions[x]});

        $('#chart').highcharts({
            'chart' : {
                'type' : 'area'
            },
            series : data
        });
    }

    /**
     * @description Summarize pool execution
     *
     */
    report() {

        for (let x = 0; x < this.executions.length; x++)
        {
            // save best and worst test.
            for (let i = 0; i < this.executions[x].length; i++)
            {
                let ms = this.executions[x][i];

                // init min & max value
                if (this.min_value === null)
                {
                    this.min_value = ms;
                    this.min_test = x;
                }

                if (this.max_value === null)
                {
                    this.max_value = ms;
                    this.max_test = x;
                }

                // search min & max value
                if (ms < this.min_value)
                {
                    this.min_value = ms;
                    this.min_test = x;
                }

                if (ms > this.max_value)
                {
                    this.max_value = ms;
                    this.max_test = x;
                }

                if (this.avg[x] === null)
                    this.avg[x] = 0;

                this.avg[x] += ms;
            }
        }

        for (let i = 0; i < this.executions.length; i++)
        {
            let opt = null;

            if (i == this.min_test)
                opt = "color:#fff;background-color:rgb(40, 163, 40);";
            if (i == this.max_test)
                opt = "color:#fff;background-color:tomato;";

            console.log(
                "%cLe Test %d a mis en moyenne %f ms sur un panel de %f essais, pour un total de %f ms d'executions.",
                opt, i, (this.avg[i] / this.config.iteration), this.config.iteration, this.avg[i]
            );
        }
    }
}