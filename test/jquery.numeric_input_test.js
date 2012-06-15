/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

  /*
    ======== A Handy Little QUnit Reference ========
    http://docs.jquery.com/QUnit

    Test methods:
      expect(numAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      raises(block, [expected], [message])
  */

  module('jQuery#numeric_input', {
    setup: function() {
      this.targets = $('#qunit-fixture').children();
      this.target = $('#qunit-fixture #numeric_1');
    }
  });

  test("defaults", function() {
    ok($.fn.numeric_input.defaults, "default options defined");

    strictEqual($.fn.numeric_input.defaults.decimal, ",", "default value for decimal check");
    strictEqual($.fn.numeric_input.defaults.leadingZeroCheck, true, "default value for leadingZeroCheck check");

    $.fn.numeric_input.defaults.decimal = "!!!";
    equal($.fn.numeric_input.defaults.decimal, "!!!", "can change the defaults globally");
    $.fn.numeric_input.defaults.decimal = ",";
  });

  test('is chainable', 1, function() {
    strictEqual(this.targets.numeric_input(), this.targets, 'should be chaninable');
  });

  test('set instance', function() {
    this.target.numeric_input();
    ok(this.target.data('numeric_input'), "should set the data property with the instance");
  });

  module('NumericInput', {
    setup: function() {
      this.target = $('#qunit-fixture #numeric_1').numeric_input();
      this.numeric_input = this.target.data('numeric_input');
    }
  });

  test('block all input except numeric', function() {
    equal(this.numeric_input.preventDefaultForKeyCode( 44 ), true, "block comma");
    equal(this.numeric_input.preventDefaultForKeyCode( 45 ), true, "block minus");
    equal(this.numeric_input.preventDefaultForKeyCode( 46 ), true, "block dot");
    equal(this.numeric_input.preventDefaultForKeyCode( 47 ), true, "block slash");

    equal(this.numeric_input.preventDefaultForKeyCode( 48 ), false, "don't block 0");
    equal(this.numeric_input.preventDefaultForKeyCode( 49 ), false, "don't block 1");
    equal(this.numeric_input.preventDefaultForKeyCode( 50 ), false, "don't block 2");
    equal(this.numeric_input.preventDefaultForKeyCode( 51 ), false, "don't block 3");
    equal(this.numeric_input.preventDefaultForKeyCode( 52 ), false, "don't block 4");
    equal(this.numeric_input.preventDefaultForKeyCode( 53 ), false, "don't block 5");
    equal(this.numeric_input.preventDefaultForKeyCode( 54 ), false, "don't block 6");
    equal(this.numeric_input.preventDefaultForKeyCode( 55 ), false, "don't block 7");
    equal(this.numeric_input.preventDefaultForKeyCode( 56 ), false, "don't block 8");
    equal(this.numeric_input.preventDefaultForKeyCode( 57 ), false, "don't block 9");
  });

  test('append leading zero', function() {
    equal(this.numeric_input.getNewValueForKeyCode(44, ''), '0,', "should prepand a leading zero by default for comma");
    equal(this.numeric_input.getNewValueForKeyCode(46, ''), '0,', "should prepand a leading zero by default for dot");

    var input2 = $('#qunit-fixture #numeric_2').numeric_input({
      leadingZeroCheck: false
    });

    equal(input2.data('numeric_input').getNewValueForKeyCode(44, ''), ',', "should NOT prepand a leading zero when specified for comma");
    equal(input2.data('numeric_input').getNewValueForKeyCode(46, ''), ',', "should NOT prepand a leading zero when specified for dot");
  });

  test('different decimal char', function() {
    equal(this.numeric_input.getNewValueForKeyCode(44, '987'), '987,', "should append a comma by default for a comma");
    equal(this.numeric_input.getNewValueForKeyCode(46, '987'), '987,', "should append a comma by default for a dot");

    var input2 = $('#qunit-fixture #numeric_2').numeric_input({
      decimal: '#'
    });

    equal(input2.data('numeric_input').getNewValueForKeyCode(44, '987'), '987#', "should append a # when specified for a comma");
    equal(input2.data('numeric_input').getNewValueForKeyCode(46, '987'), '987#', "should append a # when specified for a dot");
  });

  test('allow only one instance of decimal in the value', function() {
    equal(this.numeric_input.getNewValueForKeyCode(44, '12,34'), false, "should not append a second comma when comma is pressed");
    equal(this.numeric_input.getNewValueForKeyCode(46, '12,34'), false, "should not append a second comma when dot is pressed");

    var input2 = $('#qunit-fixture #numeric_2').numeric_input({
      decimal: '#'
    });

    equal(input2.data('numeric_input').getNewValueForKeyCode(44, '12#34'), false, "should not append a second # when comma is pressed");
    equal(input2.data('numeric_input').getNewValueForKeyCode(46, '12#34'), false, "should not append a second # when dot is pressed");
  });

  test('should parse the initial value to match the decimal option', function() {
    var input = $('#qunit-fixture #numeric_2').val('1.0').numeric_input();
    equal(input.val(), '1,0', "should parsed the value to match the ',' decimal");

    input = $('#qunit-fixture #numeric_3').val('1,0').numeric_input({
      decimal: '#'
    });
    equal(input.val(), '1#0', "should parsed the value to match the '#' decimal");

    input = $('#qunit-fixture #numeric_4').val('.25').numeric_input();
    equal(input.val(), '0,25', "should parsed the value and append the 0");
  });

  test('should not parse the initial value of option skipInitialParse is false', function() {
    var input = $('#qunit-fixture #numeric_5').val('1.0').numeric_input({
      initialParse: false
    });
    equal(input.val(), '1.0', "should not parse the value to 1,0");

    input = $('#qunit-fixture #numeric_6').val('.25').numeric_input({
      initialParse: false
    });
    equal(input.val(), '.25', "should not parse the value to  0.25");

  });

}(jQuery));
