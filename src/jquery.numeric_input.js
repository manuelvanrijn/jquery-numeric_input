;(function( $, window, document, undefined ) {

  var NumericInput = function( elem, options ) {
    this.elem = elem;
    this.$elem = $(elem);
    this.options = options;
  };

  NumericInput.prototype = {

    init: function() {
      // set instance variable
      var _instance = this;

      _instance.options = $.extend({}, $.fn.numeric_input.defaults, _instance.options);

      // bind the keypress event
      _instance.$elem.keypress(function( e ) {
        if( _instance.preventDefaultForKeyCode(e.which) === true) {
          e.preventDefault();
        }
        var newValue = _instance.getNewValueForKeyCode( e.which, _instance.$elem.val() );
        if( newValue !== false) {
          _instance.$elem.val( newValue );
        }
      });

      if( _instance.options.parseOnBlur === true ) {
        // bind the blur event to (re)parse value
        _instance.$elem.blur(function( e ) {
          var parsedValue = _instance.parseValue( _instance.$elem.val() );
          _instance.$elem.val( parsedValue );
        });
      }

      // initial parse values
      if( _instance.options.initialParse === true ) {
        var parsedValue = _instance.parseValue( _instance.$elem.val() );
        _instance.$elem.val( parsedValue );
      }

      return _instance;
    },

    preventDefaultForKeyCode: function( keyCode ) {
      // numeric
      if( keyCode >= 48 && keyCode <= 57) {
        return false;
      }
      // special key's
      switch ( keyCode ) {
        case 0 :     // browser specific special key
        case 8 :     // backspace
        case 9 :     // tab
        case 35 :    // end
        case 36 :    // home
        case 37 :    // left
        case 39 :    // right
        case 144 :   // num lock
          return false;
        default:
          return true;
      }
    },

    getNewValueForKeyCode: function( keyCode, currentValue ) {
      // if a comma or a dot is pressed...
      if( keyCode === 44 || keyCode === 46 || keyCode === 188 || keyCode === 190 ) {
        // and we do not have a options.decimal present...
        if( currentValue.indexOf( this.options.decimal ) === -1 ) {
          // append leading zero if currentValue is empty and leadingZeroCheck is active
          if( $.trim(currentValue) === '' && this.options.leadingZeroCheck ) {
            currentValue = '0';
          }
          // append the options.decimal instead of the dot or comma
          return currentValue + this.options.decimal;
        }
      }
      // prepend the minus
      if( keyCode === 45 && this.options.allowNegative ) {
        if( currentValue.charAt(0) !== '-' ) {
          return '-' + currentValue;
        }
      }
      return false;
    },

    parseValue: function( value ) {
      var minusWasStripped = false;
      var result = value.replace(/[A-Za-z$]/g, '');
      // strip minus and prepend later
      if( result.indexOf('-') !== -1 ) {
        result = result.replace( '-', '' );
        minusWasStripped = true;
      }
      if ( result.indexOf('.') !== -1 || result.indexOf(',') !== -1 ) {
        result = result.replace( '.', this.options.decimal );
        result = result.replace( ',', this.options.decimal );
      }
      if ( result.indexOf( this.options.decimal ) === 0 ) {
        result = '0' + result;
      }
      if ( minusWasStripped === true && this.options.allowNegative === true) {
        result = '-' + result;
      }
      return result;
    }
  };

  $.fn.numeric_input = function ( options ) {
    return this.each(function () {
      if ( !$.data(this, 'numeric_input') ) {
        $.data( this, 'numeric_input', new NumericInput(this, options).init() );
      }
    });
  };

  $.fn.numeric_input.defaults = {
    decimal: ',',
    leadingZeroCheck: true,
    initialParse: true,
    parseOnBlur: true,
    allowNegative: false
  };

}( jQuery, window, document ));
