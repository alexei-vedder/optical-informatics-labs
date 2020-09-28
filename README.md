# Template of an Angular application with the configured "function-plot" library

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0.

<hr>

IMPORTANT: for proper working of 
"function-plot" there was added in "head" 
of [index.html](src/index.html) the following script:

```js
if (global === undefined) {
    var global = window;
}
```

Without this script there is "Uncaught ReferenceError: global is not defined"

<hr>
