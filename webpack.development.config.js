const path = require("path");
module.exports = {
    mode: "development",
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
        publicPath: "/",
    },
    /**
     * We set up webpack-dev-server in the devServer property. 
     * This doesn’t require much for our needs — just the location we’re serving static files from (such as our index.html) and the port we want to run the server on. 
     * Note that devServer also has a publicPath property. This publicPath tells the server where our bundled code actually is.
     */
    devServer: {
        contentBase: path.join(__dirname, "dist/"),
        port: 3000,
        publicPath: "http://localhost:3000/",
        hotOnly: true,
        historyApiFallback: true,
      },
}