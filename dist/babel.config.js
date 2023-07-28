"use strict";
module.exports = {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript'
    ],
    plugins: ["@babel/plugin-syntax-decorators"]
};
// module.exports = {
//     presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
//     plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]]
// }
