module.exports = {
    entry : './src/main.js',
    output: {
        path: __dirname + '/public/js',
        filename: 'bundle.js',
        library: 'Bench'
    },

    resolve: {
        extensions: [".js"]
    },

    module: {
        loaders: [
            {
                test : /\.js?/,
                exclude: /node_modules/,
                loader : 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};