module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "next"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "react",
        "next"
    ],
    "settings": {
        "react": {
          "version": "detect"
        }
      },
    "rules": {
        "@typescript-eslint/ban-ts-comment": ["error", {
            "ts-ignore": "allow-with-description",
            "minimumDescriptionLength": 3
          }],
        "no-empty": "off", 
        "@typescript-eslint/no-unused-vars": "off",
        "react/react-in-jsx-scope": "off"
        
    }
}
