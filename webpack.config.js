const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    
    return {
        entry: {
            'shadow-widgets': './src/shadow-widgets.js',
            'coverage-eligibility-test': './src/services/coverage-eligibility-test.js'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js',
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: [
                                ['@babel/plugin-proposal-decorators', { legacy: true }],
                                ['@babel/plugin-proposal-class-properties', { loose: true }]
                            ]
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'images/[hash][ext][query]'
                    }
                },
            ],
        },
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            historyApiFallback: true,
            compress: true,
            port: 9002,
            hot: true,
            open: true,
            devMiddleware: {
                publicPath: '/'
            },
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
            }
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './index.html',
                filename: 'index.html',
                inject: 'body'
            }),
            new Dotenv({
                systemvars: true
            })
        ],
        resolve: {
            extensions: ['.js'],
            alias: {
                '@': path.resolve(__dirname, 'src/'),
                '@components': path.resolve(__dirname, 'src/components/'),
                '@styles': path.resolve(__dirname, 'src/styles/'),
                '@config': path.resolve(__dirname, 'src/config/')
            }
        },
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? 'source-map' : 'eval-source-map'
    };
}; 