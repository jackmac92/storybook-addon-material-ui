'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Tabs = require('material-ui/Tabs');

var _Slider = require('material-ui/Slider');

var _Slider2 = _interopRequireDefault(_Slider);

var _reactMaterialColorPicker = require('react-material-color-picker');

var _reactMaterialColorPicker2 = _interopRequireDefault(_reactMaterialColorPicker);

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  val: _propTypes2.default.string.isRequired,
  ind: _propTypes2.default.number.isRequired,
  settingsObj: _propTypes2.default.object.isRequired,
  valueHandler: _propTypes2.default.func.isRequired,
  isCollapsed: _propTypes2.default.bool.isRequired,
  onCollapsed: _propTypes2.default.func.isRequired,
  onSelect: _propTypes2.default.func.isRequired,
  isOpen: _propTypes2.default.bool.isRequired,
  isHeader: _propTypes2.default.bool.isRequired
};

var defaultProps = {
  val: 'val',
  ind: 7,
  settingsObj: {},
  valueHandler: function valueHandler() {},
  isCollapsed: true,
  isOpen: true,
  isHeader: true
};

var contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};

var ThemePropItem = function (_React$Component) {
  _inherits(ThemePropItem, _React$Component);

  function ThemePropItem(props) {
    var _ref;

    _classCallCheck(this, ThemePropItem);

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = ThemePropItem.__proto__ || Object.getPrototypeOf(ThemePropItem)).call.apply(_ref, [this, props].concat(args)));

    _this.onToolTogle = _this.onToolTogle.bind(_this);
    _this.renderProp = _this.renderProp.bind(_this);
    return _this;
  }

  _createClass(ThemePropItem, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return true;
      // future: shouldComponentUpdate
      //        const val = this.props.val;
      //        const shouldCollapsed = (nextProps.isCollapsed !== this.props.isCollapsed);
      //        const shouldOpen = (nextProps.isOpen !== this.props.isOpen);
      //        const shouldsettingsObj = (nextProps.settingsObj[val] !== this.props.settingsObj[val]);
      //        const shouldUpdate = (shouldCollapsed || shouldOpen || shouldsettingsObj);
      //        if (shouldUpdate) {
      //            console.log(
      //      `shouldUpdate: ${val} ${shouldCollapsed} ${shouldOpen} ${shouldsettingsObj}`
      //      );
      //        }
      //        return shouldUpdate;
    }
  }, {
    key: 'onToolTogle',
    value: function onToolTogle() {
      this.props.onCollapsed(!this.props.isCollapsed);
    }
  }, {
    key: 'renderProp',
    value: function renderProp(isNotHeader) {
      var palette = this.context.muiTheme.palette;
      var _props = this.props,
          ind = _props.ind,
          val = _props.val,
          valueHandler = _props.valueHandler,
          isCollapsed = _props.isCollapsed,
          isOpen = _props.isOpen,
          onSelect = _props.onSelect;

      var settingsObj = this.props.settingsObj || { isNotHeader: isNotHeader };
      var onToolTogle = this.onToolTogle;
      var styleHR = { borderBottom: 'solid ' + palette.borderColor + ' 1px' };
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(PropItem, {
          ind: ind, val: val, settingsObj: settingsObj, valueHandler: valueHandler, isNotHeader: isNotHeader, onToolTogle: onToolTogle, isOpen: isOpen, onSelect: onSelect
        }),
        _react2.default.createElement(PropToolPicker, _extends({ isCollapsed: isCollapsed, onToolTogle: onToolTogle }, {
          settingsObj: isNotHeader ? settingsObj[val] : '',
          valueHandler: valueHandler(val)
        })),
        _react2.default.createElement(
          'div',
          { style: { height: isOpen ? 1 : 0, overflow: 'hidden' } },
          _react2.default.createElement('div', { style: styleHR })
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.renderProp(!this.props.isHeader)
      );
    }
  }]);

  return ThemePropItem;
}(_react2.default.Component);

exports.default = ThemePropItem;


ThemePropItem.propTypes = propTypes;
ThemePropItem.defaultProps = defaultProps;
ThemePropItem.contextTypes = contextTypes;

function PropItem(props, context) {
  var palette = context.muiTheme.palette;
  var settingsObj = props.settingsObj,
      val = props.val,
      ind = props.ind,
      valueHandler = props.valueHandler,
      isNotHeader = props.isNotHeader;

  var color = typeof settingsObj[val] === 'string' ? settingsObj[val] : '';
  var onSelect = function onSelect() {
    var select = {
      selectedProp: val,
      selectedVal: '\'' + settingsObj[val] + '\''
    };
    props.onSelect(select);
  };
  return _react2.default.createElement(
    'div',
    {
      className: _.CSS_CLASS + '-prop-item',
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        flexWrap: 'wrap',
        paddingRight: 4,
        paddingTop: isNotHeader ? 4 : 16,
        fontSize: 12,
        //            height: isOpen ? 24 : 0,
        transition: 'all 100ms ease 0ms',
        overflow: 'hidden',
        color: isNotHeader ? '' : palette.secondaryTextColor
      },
      onClick: onSelect
    },
    _react2.default.createElement(PropHeader, { val: val, ind: ind, isNotHeader: isNotHeader }),
    _react2.default.createElement(
      'div',
      {
        className: _.CSS_CLASS + '-prop-value',
        style: {
          width: 'auto',
          flexShrink: 1,
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'space-between'
        }
      },
      _react2.default.createElement(PropInput, {
        valueHandler: valueHandler(val) || null,
        settingsObj: settingsObj[val] || '',
        isNotHeader: isNotHeader
      }),
      _react2.default.createElement(PropTool, {
        color: color,
        onTool: props.onToolTogle,
        isNotHeader: isNotHeader
      })
    )
  );
}

PropItem.propTypes = {
  settingsObj: _propTypes2.default.shape().isRequired,
  val: _propTypes2.default.string.isRequired,
  ind: _propTypes2.default.number.isRequired,
  onToolTogle: _propTypes2.default.func.isRequired,
  onSelect: _propTypes2.default.func.isRequired,
  valueHandler: _propTypes2.default.func.isRequired,
  //    isOpen: PropTypes.bool.isRequired,
  isNotHeader: _propTypes2.default.bool.isRequired
};
PropItem.contextTypes = contextTypes;

function PropHeader(props, context) {
  var ind = props.ind,
      val = props.val,
      isNotHeader = props.isNotHeader;

  return _react2.default.createElement(
    'div',
    {
      className: _.CSS_CLASS + '-prop-header',
      title: val,
      style: {
        display: 'flex',
        justifyContent: 'flex-start',
        overflowX: 'hidden',
        flexShrink: 2,
        flexGrow: 10,
        width: 90
      }
    },
    _react2.default.createElement(
      'div',
      { style: { color: context.muiTheme.palette.secondaryTextColor } },
      isNotHeader ? ind + 1 : '#'
    ),
    _react2.default.createElement(
      'div',
      {
        style: {
          marginLeft: 16,
          marginRight: 16,
          minWidth: 100,
          textAlign: 'left',
          overflowX: 'hidden'
        }
      },
      _react2.default.createElement(
        'div',
        null,
        isNotHeader ? val : 'Prop Name'
      )
    )
  );
}
PropHeader.propTypes = {
  val: _propTypes2.default.string.isRequired,
  ind: _propTypes2.default.number.isRequired,
  isNotHeader: _propTypes2.default.bool.isRequired
};
PropHeader.contextTypes = contextTypes;

function PropInput(props, context) {
  var palette = context.muiTheme.palette;
  var valueHandler = props.valueHandler,
      settingsObj = props.settingsObj,
      isNotHeader = props.isNotHeader;

  var isInt = settingsObj === parseInt(settingsObj, 10);
  var strStyle = {
    width: isInt ? 40 : 'auto',
    textAlign: isInt ? 'right' : 'left'
  };
  return isNotHeader ? _react2.default.createElement('input', {
    type: 'text',
    onChange: valueHandler,
    value: settingsObj,
    title: settingsObj,
    style: _extends({
      border: 'none',
      fontStyle: 'italic',
      padding: 2,
      backgroundColor: palette.canvasColor,
      color: palette.primary2Color
    }, strStyle)
  }) : _react2.default.createElement(
    'div',
    {
      style: _extends({
        border: 'none',
        minWidth: 162,
        padding: 2
      }, strStyle)
    },
    'Prop Value'
  );
}
PropInput.propTypes = {
  settingsObj: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]).isRequired,
  valueHandler: _propTypes2.default.func.isRequired,
  isNotHeader: _propTypes2.default.bool.isRequired
};
PropInput.contextTypes = contextTypes;

function PropTool(props, context) {
  var palette = context.muiTheme.palette;
  var isNotHeader = props.isNotHeader;

  var blockStyle = {
    width: 16,
    height: 16,
    marginLeft: 4,
    border: 'solid 1px ' + palette.borderColor,
    backgroundColor: isNotHeader ? props.color : 'rgba(0, 0, 0, 0)',
    cursor: isNotHeader ? 'pointer' : ''
  };
  var toolProps = {
    style: blockStyle,
    title: isNotHeader ? props.color : 'view',
    onClick: isNotHeader ? props.onTool : null
  };
  return _react2.default.createElement('div', toolProps);
}
PropTool.propTypes = {
  isNotHeader: _propTypes2.default.bool.isRequired,
  color: _propTypes2.default.string.isRequired,
  onTool: _propTypes2.default.func.isRequired
};
PropTool.contextTypes = contextTypes;

function PropToolPicker(props, context) {
  var settingsObj = props.settingsObj,
      valueHandler = props.valueHandler,
      onToolTogle = props.onToolTogle;

  var initColor = '' + settingsObj;
  var style = {
    height: props.isCollapsed ? 0 : 200,
    transition: 'height 300ms ease 0ms',
    overflow: 'hidden'
  };
  var onSubmit = function onSubmit(event) {
    valueHandler(event);
    onToolTogle();
  };
  // fixme: check onReset
  return _react2.default.createElement(
    'div',
    { style: style },
    _react2.default.createElement(
      'div',
      { style: { border: 'solid 1px grey' } },
      _react2.default.createElement(_reactMaterialColorPicker2.default, {
        initColor: initColor,
        onSubmit: onSubmit,
        onSelect: valueHandler,
        onHover: valueHandler,
        onReset: onSubmit
      })
    )
  );
}
PropToolPicker.propTypes = {
  settingsObj: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  isCollapsed: _propTypes2.default.bool.isRequired,
  valueHandler: _propTypes2.default.func.isRequired,
  onToolTogle: _propTypes2.default.func.isRequired
};
PropToolPicker.defaultProps = {
  settingsObj: ''
};
PropToolPicker.contextTypes = contextTypes;

// future: we will use when all components be ready
function PropToolPickerFull(props, context) {
  var settingsObj = props.settingsObj,
      valueHandler = props.valueHandler,
      onToolTogle = props.onToolTogle;

  var initColor = '' + settingsObj;
  var style = {
    height: props.isCollapsed ? 0 : 200,
    transition: 'height 300ms ease 0ms',
    overflow: 'hidden'
  };
  var tabStyle = { height: 16, marginTop: -12, fontSize: 12 };
  var onSubmit = function onSubmit(event) {
    valueHandler(event);
    onToolTogle();
  };
  return _react2.default.createElement(
    'div',
    { style: style },
    _react2.default.createElement(
      _Tabs.Tabs,
      {
        tabItemContainerStyle: { height: 24 }
      },
      _react2.default.createElement(
        _Tabs.Tab,
        {
          label: 'Color',
          style: tabStyle
        },
        _react2.default.createElement(
          'div',
          { style: { border: 'solid 1px grey' } },
          _react2.default.createElement(_reactMaterialColorPicker2.default, {
            initColor: initColor,
            onSubmit: onSubmit,
            onSelect: valueHandler,
            onReset: onSubmit
          })
        )
      ),
      _react2.default.createElement(
        _Tabs.Tab,
        { label: 'Number', style: tabStyle },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h2',
            null,
            'Tab Two'
          ),
          _react2.default.createElement(
            'p',
            null,
            'This is another example tab.'
          ),
          _react2.default.createElement(_Slider2.default, { name: 'slider0', defaultValue: 0.5 })
        )
      ),
      _react2.default.createElement(
        _Tabs.Tab,
        {
          label: 'String',
          'data-route': '/home',
          onActive: null,
          style: tabStyle
        },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h2',
            null,
            'Tab Three'
          ),
          _react2.default.createElement(
            'p',
            null,
            'This is a third example tab.'
          )
        )
      ),
      _react2.default.createElement(
        _Tabs.Tab,
        { label: 'Palette', style: tabStyle },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h2',
            null,
            'Tab Two'
          ),
          _react2.default.createElement(
            'p',
            null,
            'This is another example tab.'
          ),
          _react2.default.createElement(_Slider2.default, { name: 'slider0', defaultValue: 0.5 })
        )
      ),
      _react2.default.createElement(
        _Tabs.Tab,
        { label: 'Icon', style: tabStyle },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h2',
            null,
            'Tab Two'
          ),
          _react2.default.createElement(
            'p',
            null,
            'This is another example tab.'
          ),
          _react2.default.createElement(_Slider2.default, { name: 'slider0', defaultValue: 0.5 })
        )
      )
    )
  );
}
PropToolPickerFull.propTypes = {
  settingsObj: _propTypes2.default.shape().isRequired,
  isCollapsed: _propTypes2.default.bool.isRequired,
  valueHandler: _propTypes2.default.func.isRequired,
  onToolTogle: _propTypes2.default.func.isRequired
};
PropToolPickerFull.contextTypes = contextTypes;