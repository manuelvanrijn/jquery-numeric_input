$(function() {

  $('#demo1 input').numeric_input();

  $('#demo2 input').numeric_input({
    decimal: '.'
  });

  $('#demo3 input').numeric_input({
    leadingZeroCheck: false
  });

  $('#demo4 input').numeric_input({
    initialParse: false
  });

  $('#demo5 input').numeric_input({
    parseOnBlur: false
  });
});
