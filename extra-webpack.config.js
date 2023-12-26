const path = require('path');

const config = {
    mode: 'production', // "production" | "development" | "none"
    resolve: {
        extensions: ['*', '.mjs', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.mjs$/,
                use: 'raw-loader',
                include: /node_modules/,
                type: 'javascript/auto'
            }
        ]
    }
}

module.exports = config;