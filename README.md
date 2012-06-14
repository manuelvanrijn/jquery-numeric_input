# jQuery Numeric Input

This plugins helps blocking input fields only to except numeric value's. Also it provides the function to transform the dot or comma input to a char you provide.

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/manuelvanrijn/jquery-numeric_input/master/dist/jquery.numeric_input.min.js
[max]: https://raw.github.com/manuelvanrijn/jquery-numeric_input/master/dist/jquery.numeric_input.js

In your web page:

```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>
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
    decimal: ',',           // char to append when dot or comma is pressed
    leadingZeroCheck: true  // append a 0 when the first input is a comma or dot
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

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

_Also, please don't edit files in the "dist" subdirectory as they are generated via grunt. You'll find source code in the "src" subdirectory!_

## License
Copyright (c) 2012 Manuel van Rijn
Licensed under the MIT, GPL licenses.
