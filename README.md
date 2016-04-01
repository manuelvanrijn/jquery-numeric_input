# jQuery Numeric Input

This plugins helps blocking input fields only to except numeric value's. Also it provides the function to transform the dot or comma input to a char you provide.

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/manuelvanrijn/jquery-numeric_input/master/dist/jquery.numeric_input.min.js
[max]: https://raw.github.com/manuelvanrijn/jquery-numeric_input/master/dist/jquery.numeric_input.js

In your web page:

```html
<script src="libs/jquery/jquery.js"></script>
<script src="dist/jquery.numeric_input.min.js"></script>
<script>
$(function() {
    $("input.numeric_input").numeric_input();
});
</script>
```

## Default options

Here's a list with the available default options

```javascript
{
    decimal: ',',                       // char to append when dot or comma is pressed
    numberOfDecimals: null,             // restrict the amount of numbers after the decimal char
    leadingZeroCheck: true,             // append a 0 when the first input is a comma or dot
    initialParse: true,                 // parse the value on start to match the decimal option
    parseOnBlur: true,                  // parse value when user lose focus on field
    clearInputOnBlurForZeroValue: true, // If value is 0, clear the input on focues
    allowNegative: false,               // allow value to be negative (prepends a minus char)
    allowEmpty: false,                  // If the input might also be empty ''
    callback: function(elem, value) {}  //
}
```

You can override the defaults globally. For instance, you can override the global default value for `decimal` by defining:

```javascript
$.fn.numeric_input.defaults.decimal = '.';
```

## Examples

### Change the decimal char

```javascript
// set's the decimal to a '.' instead of a ','
$("input.numeric_input").numeric_input({
  decimal: '.'
});
```

### Don't append a leading zero

```javascript
// set's the decimal to a '.' instead of a ','
$("input.numeric_input").numeric_input({
  leadingZeroCheck: false
});
```

### Don't parse the value on start

```javascript
$("input.numeric_input").numeric_input({
  initialParse: false
});
```

### Don't parse the value on blur

```javascript
$("input.numeric_input").numeric_input({
  parseOnBlur: false
});
```

### Allow negative values

```javascript
$("input.numeric_input").numeric_input({
  allowNegative: true
});
```

## Changelog

A detailed overview of can be found in the [CHANGELOG](https://github.com/manuelvanrijn/jquery-numeric_input/blob/master/CHANGELOG.md).

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

_Also, please don't edit files in the "dist" subdirectory as they are generated via grunt. You'll find source code in the "src" subdirectory!_

## License
Copyright (c) 2013 Manuel van Rijn
Licensed under the MIT, GPL licenses.
