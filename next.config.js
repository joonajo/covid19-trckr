const withPlugins = require('next-compose-plugins')
const offline = require('next-offline')
const withCSS = require('@zeit/next-css')

module.exports = withPlugins([
    offline,
    withCSS,
])