const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = {
  devtool: 'source-map',
  output: {
    publicPath: "http://localhost:9094/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 9094,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "pokemon",
      filename: "remoteEntry.js",
      remotes: {
        left_nav_pokemon : "left_nav_pokemon@http://localhost:9093/remoteEntry.js",
        // form : "form@http://localhost:9095/remoteEntry.js",
        // ability : "ability@http://localhost:9096/remoteEntry.js",
        // move : "move@http://localhost:9097/remoteEntry.js"
      },
      exposes: {
        // will probably need to be removed
        "./Pokemon" : "/src/Pokemon.tsx",
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
