module.exports = {
    root:true,
    parser:"@typescript-eslint/parser",
    //some type-cheking options --SLOW
    // parserOptions:{
    //     tsconfigRootDir: __dirname,
    //     project:['./tsconfig.json']
    // },
    plugins:[
        "@typescript-eslint",
        "react",
        "react-hooks",
        "jsx-a11y",
        // "import"
    ],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        //some type-checking options -- SLOW
        // 'plugin:@typescript-eslint/recommended-requiring-type-checking',

        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
        // "plugin:import/recommended",
        // "plugin:import/typescript",
        "prettier"
    ],
    env: {
        browser: true,
        es6: true,
        node: true
    },
    rules:{
        "no-undef": "error",
        
    },
    settings:{  
        react:{ 
            version:"detect"
        }
    },
    ignorePatterns: ["webpack.config.js",".eslintrc.js","dist","node_modules","*.js"],
    globals: {
        JSX: true,
    },
}
