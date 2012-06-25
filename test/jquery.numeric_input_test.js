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
      $('#qunit-fixture').append('<input type="text" id="numeric" />');
      this.target = $('#qunit-fixture #numeric');
    },
    teardown: function() {
      $('#qunit-fixture').empty();
      this.target = undefined;
    }
  });

  test('default options', function() {
    ok($.fn.numeric_input.defaults, 'default options defined');

    strictEqual($.fn.numeric_input.defaults.decimal, ',', 'default value for decimal check');
    strictEqual($.fn.numeric_input.defaults.leadingZeroCheck, true, 'default value for leadingZeroCheck check');
    strictEqual($.fn.numeric_input.defaults.initialParse, true, 'default value for initialParse check');
    strictEqual($.fn.numeric_input.defaults.parseOnBlur, true, 'default value for parseOnBlur check');

  });

  test('can change default options globally', function() {
    $.fn.numeric_input.defaults.decimal = '!!!';
    equal($.fn.numeric_input.defaults.decimal, '!!!', 'can change the defaults globally');
    $.fn.numeric_input.defaults.decimal = ',';
  });

  test('is chainable', 1, function() {
    $('#qunit-fixture').append('<input type="text" id="numeric_2" />');
    var targets = $('#qunit-fixture').children();
    strictEqual(targets.numeric_input(), targets, 'should be chaninable');
  });

  test('set instance', function() {
    this.target.numeric_input();
    ok(this.target.data('numeric_input'), 'should set the data property with the instance');
  });

  module('NumericInput', {
    setup: function() {
      $('#qunit-fixture')
        .append('<input type="text" id="numeric" />')
        .append('<input type="text" id="numeric_2" />');
      this.target = $('#qunit-fixture #numeric');
      this.numeric_input = $('#qunit-fixture #numeric_2').numeric_input().data('numeric_input');
    },
    teardown: function() {
      $('#qunit-fixture').empty();
    }
  });

  test('block all input except numeric', function() {
    equal(this.numeric_input.preventDefaultForKeyCode( 44 ), true, 'block comma');
    equal(this.numeric_input.preventDefaultForKeyCode( 188 ), true, 'block comma');
    equal(this.numeric_input.preventDefaultForKeyCode( 45 ), true, 'block minus');
    equal(this.numeric_input.preventDefaultForKeyCode( 46 ), true, 'block dot');
    equal(this.numeric_input.preventDefaultForKeyCode( 190 ), true, 'block dot');
    equal(this.numeric_input.preventDefaultForKeyCode( 47 ), true, 'block slash');

    equal(this.numeric_input.preventDefaultForKeyCode( 48 ), false, 'do not block 0');
    equal(this.numeric_input.preventDefaultForKeyCode( 49 ), false, 'do not block 1');
    equal(this.numeric_input.preventDefaultForKeyCode( 50 ), false, 'do not block 2');
    equal(this.numeric_input.preventDefaultForKeyCode( 51 ), false, 'do not block 3');
    equal(this.numeric_input.preventDefaultForKeyCode( 52 ), false, 'do not block 4');
    equal(this.numeric_input.preventDefaultForKeyCode( 53 ), false, 'do not block 5');
    equal(this.numeric_input.preventDefaultForKeyCode( 54 ), false, 'do not block 6');
    equal(this.numeric_input.preventDefaultForKeyCode( 55 ), false, 'do not block 7');
    equal(this.numeric_input.preventDefaultForKeyCode( 56 ), false, 'do not block 8');
    equal(this.numeric_input.preventDefaultForKeyCode( 57 ), false, 'do not block 9');
  });

  test ('do not block special keys', function() {
    equal(this.numeric_input.preventDefaultForKeyCode( 0 ), false, 'do not block browser specific key');
    equal(this.numeric_input.preventDefaultForKeyCode( 8 ), false, 'do not block backspace');
    equal(this.numeric_input.preventDefaultForKeyCode( 9 ), false, 'do not block tab');
    equal(this.numeric_input.preventDefaultForKeyCode( 35 ), false, 'do not block end');
    equal(this.numeric_input.preventDefaultForKeyCode( 36 ), false, 'do not block home');
    equal(this.numeric_input.preventDefaultForKeyCode( 37 ), false, 'do not block left arrow');
    equal(this.numeric_input.preventDefaultForKeyCode( 39 ), false, 'do not block rigth arrow');
    equal(this.numeric_input.preventDefaultForKeyCode( 144 ), false, 'do not block num lock');
  });

  test('append leading zero', function() {
    equal(this.numeric_input.getNewValueForKeyCode(44, ''), '0,', 'should prepand a leading zero by default for comma');
    equal(this.numeric_input.getNewValueForKeyCode(46, ''), '0,', 'should prepand a leading zero by default for dot');

    this.target.numeric_input({
      leadingZeroCheck: false
    });

    equal(this.target.data('numeric_input').getNewValueForKeyCode(44, ''), ',', 'should NOT prepand a leading zero when specified for comma');
    equal(this.target.data('numeric_input').getNewValueForKeyCode(46, ''), ',', 'should NOT prepand a leading zero when specified for dot');
  });

  test('different decimal char', function() {
    equal(this.numeric_input.getNewValueForKeyCode(44, '987'), '987,', 'should append a comma by default for a comma');
    equal(this.numeric_input.getNewValueForKeyCode(46, '987'), '987,', 'should append a comma by default for a dot');

    this.target.numeric_input({
      decimal: '#'
    });

    equal(this.target.data('numeric_input').getNewValueForKeyCode(44, '987'), '987#', 'should append a # when specified for a comma');
    equal(this.target.data('numeric_input').getNewValueForKeyCode(46, '987'), '987#', 'should append a # when specified for a dot');
  });

  test('allow only one instance of decimal in the value', function() {
    equal(this.numeric_input.getNewValueForKeyCode(44, '12,34'), false, 'should not append a second comma when comma is pressed');
    equal(this.numeric_input.getNewValueForKeyCode(46, '12,34'), false, 'should not append a second comma when dot is pressed');

    this.target.numeric_input({
      decimal: '#'
    });

    equal(this.target.data('numeric_input').getNewValueForKeyCode(44, '12#34'), false, 'should not append a second # when comma is pressed');
    equal(this.target.data('numeric_input').getNewValueForKeyCode(46, '12#34'), false, 'should not append a second # when dot is pressed');
  });

  test('should parse the value on blur by default', function() {
    this.target.val('1.0').numeric_input({
      initialParse: false
    });
    this.target.trigger('blur');
    equal(this.target.val(), '1,0', 'should have parsed the value on blur');
  });

  test('should not parse the value on blur parseOnBlur is false', function() {
    this.target.val('1.0').numeric_input({
      initialParse: false,
      parseOnBlur: false
    });
    this.target.trigger('blur');
    equal(this.target.val(), '1.0', 'should not have parsed the value on blur');
  });

  module('Initial value', {
    setup: function() {
      $('#qunit-fixture').append('<input type="text" id="numeric" />');
      this.target = $('#qunit-fixture #numeric');
    },
    teardown: function() {
      $('#qunit-fixture').empty();
      this.target = undefined;
    }
  });

  test('should parse the initial value with default options', function() {
    this.target.val('1.0').numeric_input();
    equal(this.target.val(), '1,0', 'should parsed the value to match the ',' decimal');
  });

  test('should parse the initial value with other decimal option', function() {
    this.target.val('1,0').numeric_input({
      decimal: '#'
    });
    equal(this.target.val(), '1#0', 'should parsed the value to match the # decimal');
  });

  test('should parse the initial value if it starts with a .', function() {
    this.target.val('.25').numeric_input();
    equal(this.target.val(), '0,25', 'should parsed the value and append the 0');
  });

  module('Skip initial parse', {
    setup: function() {
      $('#qunit-fixture').append('<input type="text" id="numeric" />');
      this.target = $('#qunit-fixture #numeric');
    },
    teardown: function() {
      $('#qunit-fixture').empty();
      this.target = undefined;
    }
  });

  test('should not parse the initial value of option initialParse is false for 1.0', function() {
    this.target.val('1.0').numeric_input({
      initialParse: false
    });
    equal(this.target.val(), '1.0', 'should not parse the value to 1,0');
  });

  test('should not parse the initial value of option initialParse is false for .25', function() {
    this.target.val('.25').numeric_input({
      initialParse: false
    });
    equal(this.target.val(), '.25', 'should not parse the value to  0.25');
  });

}(jQuery));
