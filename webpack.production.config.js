
module.exports = {
    mode: "production",
    /**
     * The output property tells Webpack where to put our bundled code. 
     * The publicPath property specifies what directory the bundle should go in, and also tells webpack-dev-server where to serve files from.
     */
    output: {
        /**
         * The publicPath property is a special property that helps us with our dev-server. 
         * It specifies the public URL of the the directory — at least as far as webpack-dev-server will know or care. 
         * If this is set incorrectly, you’ll get 404’s as the server won’t be serving your files from the correct location!
         */
        publicPath: "/dist",
    },
}