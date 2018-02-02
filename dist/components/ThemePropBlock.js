'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _SclToggle = require('../material-desktop/SclToggle');

var _SclToggle2 = _interopRequireDefault(_SclToggle);

var _SclAvatar = require('../material-desktop/SclAvatar');

var _SclAvatar2 = _interopRequireDefault(_SclAvatar);

var _ = require('../');

var _ThemePropItem = require('./ThemePropItem');

var _ThemePropItem2 = _interopRequireDefault(_ThemePropItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
    settingsObj: _propTypes2.default.object.isRequired,
    settingsName: _propTypes2.default.string.isRequired,
    open: _propTypes2.default.func.isRequired,
    onThemeTableOverride: _propTypes2.default.func.isRequired,
    onSelect: _propTypes2.default.func.isRequired
};

var contextTypes = {
    muiTheme: _propTypes2.default.object.isRequired
};

var ThemePropBlock = function (_React$Component) {
    _inherits(ThemePropBlock, _React$Component);

    function ThemePropBlock(props) {
        var _ref;

        _classCallCheck(this, ThemePropBlock);

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = ThemePropBlock.__proto__ || Object.getPrototypeOf(ThemePropBlock)).call.apply(_ref, [this, props].concat(args)));

        _this.state = {
            toolCollapsedList: {}
        };
        _this.needComponentUpdate = false;
        _this.valueHandler = _this.valueHandler.bind(_this);
        _this.onToolCollapse = _this.onToolCollapse.bind(_this);
        _this.onSelect = _this.onSelect.bind(_this);
        _this.renderProp = _this.renderProp.bind(_this);
        _this.renderColl = _this.renderColl.bind(_this);
        return _this;
    }

    _createClass(ThemePropBlock, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            var f = this.needComponentUpdate;
            this.needComponentUpdate = false;
            return f;
        }
    }, {
        key: 'onToolCollapse',
        value: function onToolCollapse(val) {
            var _this2 = this;

            return function (isCol) {
                var toolCollapsedList = _this2.state.toolCollapsedList;

                toolCollapsedList[val] = isCol;
                _this2.needComponentUpdate = true;
                _this2.setState({ toolCollapsedList: toolCollapsedList });
            };
        }
    }, {
        key: 'onSelect',
        value: function onSelect(sel) {
            var select = {
                selectedTable: this.props.settingsName,
                selectedProp: '',
                selectedVal: ''
            };
            var fullSelect = Object.assign(select, sel);
            this.props.onSelect(fullSelect);
        }
    }, {
        key: 'valueHandler',
        value: function valueHandler(propName) {
            var _this3 = this;

            return function (event) {
                _this3.needComponentUpdate = true;
                _this3.props.onThemeTableOverride(propName, event.target.value);
            };
        }
    }, {
        key: 'renderProp',
        value: function renderProp(val, ind, isOpen, isHeader) {
            return _react2.default.createElement(
                'div',
                { key: val },
                isOpen ? _react2.default.createElement(_ThemePropItem2.default, {
                    val: val,
                    ind: ind,
                    settingsObj: this.props.settingsObj,
                    valueHandler: this.valueHandler,
                    isCollapsed: this.state.toolCollapsedList[val],
                    onCollapsed: this.onToolCollapse(val),
                    isOpen: isOpen || false,
                    isHeader: isHeader || false,
                    onSelect: this.onSelect
                }) : null
            );
        }
    }, {
        key: 'renderColl',
        value: function renderColl() {
            var _this4 = this;

            var settingsObj = this.props.settingsObj;
            var keyList = Object.keys(settingsObj);
            var rowList = keyList.map(function (val, ind) {
                return _this4.renderProp(val, ind, _this4.props.open());
            });
            return _react2.default.createElement(
                'div',
                null,
                this.renderProp(this.props.settingsName + '-header', 0, this.props.open(), true),
                rowList
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            var _props = this.props,
                settingsName = _props.settingsName,
                open = _props.open;

            var onSelect = this.onSelect;
            var openThis = function openThis(f) {
                if (typeof f === 'undefined') return open();
                _this5.needComponentUpdate = true;
                open(f);
                return null;
            };
            return _react2.default.createElement(
                _Paper2.default,
                {
                    style: {
                        paddingLeft: 16,
                        paddingRight: 4,
                        paddingTop: 8,
                        paddingBottom: 8,
                        marginTop: 8
                    }
                },
                _react2.default.createElement(BlockHeader, { settingsName: settingsName, openThis: openThis, onSelect: onSelect }),
                _react2.default.createElement('div', { style: {/* height: 16*/} }),
                this.renderColl()
            );
        }
    }]);

    return ThemePropBlock;
}(_react2.default.Component);

exports.default = ThemePropBlock;


ThemePropBlock.propTypes = propTypes;
ThemePropBlock.contextTypes = contextTypes;

function BlockHeader(props, context) {
    var toggleHeadStyle = {
        color: context.muiTheme.palette.primary1Color,
        fontSize: context.muiTheme.flatButton.fontSize
    };
    var toggleOpen = function toggleOpen() {
        props.openThis(!props.openThis());
    };
    return _react2.default.createElement(
        'div',
        {
            style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }
        },
        _react2.default.createElement(_SclAvatar2.default, {
            onClick: props.onSelect,
            text: props.settingsName
        }),
        _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_SclToggle2.default, {
                label: '',
                labelPosition: 'right',
                labelStyle: toggleHeadStyle,
                toggled: props.openThis() || false,
                onToggle: toggleOpen
            })
        )
    );
}

BlockHeader.contextTypes = contextTypes;
BlockHeader.propTypes = {
    openThis: _propTypes2.default.func.isRequired,
    onSelect: _propTypes2.default.func.isRequired,
    settingsName: _propTypes2.default.string.isRequired
};