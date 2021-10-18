module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        // useBuiltIns: "usage",
        // corejs: "3"
        // targets:{
        // }
      },
    ],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: [
    ["@babel/plugin-syntax-dynamic-import"],
    [
      "@babel/plugin-transform-runtime",
      {
        regenerator: true,
      },
    ],
    [
      "babel-plugin-transform-imports",
      {
        "@material-ui/core": {
          transform: "@material-ui/core/esm/${member}",
          preventFullImport: true,
        },
        "@material-ui/icons": {
          transform: "@material-ui/icons/esm/${member}",
          preventFullImport: true,
        },
        "@material-ui/styles": {
          transform: "@material-ui/styles/esm/${member}",
          preventFullImport: true,
        },
        "@material-ui/system": {
          transform: "@material-ui/system/esm/${member}",
          preventFullImport: true,
        },
      },
    ],
  ],
};
