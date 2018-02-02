'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _SclToggle = require('../material-desktop/SclToggle');

var _SclToggle2 = _interopRequireDefault(_SclToggle);

var _SvgButton = require('../material-desktop/SvgButton');

var _SvgButton2 = _interopRequireDefault(_SvgButton);

var _ContentCopy = require('material-ui-icons/ContentCopy');

var _ContentCopy2 = _interopRequireDefault(_ContentCopy);

var _SwitchCamera = require('material-ui-icons/SwitchCamera');

var _SwitchCamera2 = _interopRequireDefault(_SwitchCamera);

var _ = require('../');

var _ThemePropBlock = require('./ThemePropBlock');

var _ThemePropBlock2 = _interopRequireDefault(_ThemePropBlock);

var _Utils = require('../Utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BAR_WIDTH = 400;

var propTypes = {
    open: _propTypes2.default.bool.isRequired,
    themeName: _propTypes2.default.string.isRequired,
    theme: _propTypes2.default.object.isRequired,
    muiTheme: _propTypes2.default.object.isRequired,
    fullTheme: _propTypes2.default.func.isRequired,
    collapseList: _propTypes2.default.func.isRequired,
    shouldComponentUpdate: _propTypes2.default.bool.isRequired,
    shouldShowData: _propTypes2.default.bool.isRequired
};

var ThemeSideBar = function (_React$Component) {
    _inherits(ThemeSideBar, _React$Component);

    function ThemeSideBar(props) {
        _classCallCheck(this, ThemeSideBar);

        var _this = _possibleConstructorReturn(this, (ThemeSideBar.__proto__ || Object.getPrototypeOf(ThemeSideBar)).call(this, props));

        _this.state = {
            selectedTable: '',
            selectedProp: '',
            selectedVal: '',
            isSelectedStyleObj: true
        };

        _this.clipString = _this.clipString.bind(_this);
        _this.onSelect = _this.onSelect.bind(_this);
        _this.onSwitchStyleObj = _this.onSwitchStyleObj.bind(_this);
        _this.onCopy = _this.onCopy.bind(_this);
        return _this;
    }

    _createClass(ThemeSideBar, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            // fixme shouldComponentUpdate - remove
            return nextProps.shouldComponentUpdate;
        }
    }, {
        key: 'onSelect',
        value: function onSelect(sel) {
            this.setState(sel);
        }
    }, {
        key: 'onSwitchStyleObj',
        value: function onSwitchStyleObj() {
            var isObj = this.state.isSelectedStyleObj;
            this.setState({ isSelectedStyleObj: !isObj });
        }
    }, {
        key: 'onCopy',
        value: function onCopy() {
            var text = this.clipString();
            (0, _Utils.copyToClipboardThis)(text);
        }
    }, {
        key: 'clipString',
        value: function clipString() {
            var table = this.state.selectedTable;
            var prop = this.state.selectedProp;
            var val = this.state.selectedVal;
            var isObj = this.state.isSelectedStyleObj;

            var strTbl = table;
            var strVal = isObj ? prop + ': ' + val + ',' : table + '.' + prop + ' = ' + val + ';';
            return prop ? strVal : strTbl;
        }
    }, {
        key: 'renderContent',
        value: function renderContent() {
            var _this2 = this;

            var palette = this.context.muiTheme.palette;

            var styleHR = { borderBottom: 'solid ' + palette.borderColor + ' 1px' };
            var blockStyle = {
                width: 21,
                height: 21,
                marginLeft: 4,
                border: 'solid 1px ' + palette.borderColor,
                backgroundColor: 'rgba(0, 0, 0, 0)',
                cursor: 'pointer'
            };
            return _react2.default.createElement(
                'div',
                {
                    className: _.CSS_CLASS + '-theme_sidebar-content',
                    style: {
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'stretch'

                    }
                },
                _react2.default.createElement(
                    'div',
                    { style: { paddingLeft: 3, paddingBottom: 6 } },
                    _react2.default.createElement(
                        _Paper2.default,
                        { style: { paddingLeft: 16, paddingRight: 8, paddingTop: 8 } },
                        _react2.default.createElement(
                            'h3',
                            {
                                style: {
                                    margin: 0,
                                    marginBottom: 4,
                                    color: palette.secondaryTextColor,
                                    fontSize: 16
                                }
                            },
                            this.props.themeName + ' properties'
                        ),
                        _react2.default.createElement('div', { style: styleHR }),
                        _react2.default.createElement(
                            'div',
                            {
                                style: {
                                    marginTop: 8,
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: 14,
                                    color: palette.secondaryTextColor
                                }
                            },
                            _react2.default.createElement(
                                'div',
                                {
                                    style: {
                                        color: !this.props.fullTheme() ? palette.textColor : ''
                                    }
                                },
                                'Theme Settings'
                            ),
                            _react2.default.createElement(_SclToggle2.default, {
                                label: '',
                                labelPosition: 'right',
                                labelStyle: this.toggleHeadStyle,
                                toggled: this.props.fullTheme(),
                                onToggle: function onToggle() {
                                    return _this2.props.fullTheme(!_this2.props.fullTheme());
                                }
                            }),
                            _react2.default.createElement(
                                'div',
                                {
                                    style: {
                                        color: this.props.fullTheme() ? palette.textColor : ''
                                    }
                                },
                                'Full Settings'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            {
                                style: {
                                    paddingBottom: 8,
                                    paddingRight: 8
                                }
                            },
                            _react2.default.createElement(
                                'div',
                                {
                                    style: {
                                        marginTop: 8,
                                        //                      paddingBottom: 8,
                                        //                        padding: 2,
                                        width: '100%',
                                        height: 24,
                                        display: 'flex',
                                        alignItems: 'center',
                                        border: '1px grey solid',
                                        borderColor: palette.borderColor,
                                        backgroundColor: 'rgba(128, 128, 128, 0.1)'
                                    }
                                },
                                _react2.default.createElement('input', {
                                    type: 'text',
                                    onChange: null,
                                    value: this.clipString(),
                                    title: 'click to copy to clipboard',
                                    disabled: true,
                                    style: {
                                        width: '100%',
                                        padding: 2,
                                        margin: 0,
                                        border: 'none',
                                        backgroundColor: 'rgba(0, 0, 0, 0)',
                                        color: palette.secondaryTextColor,
                                        cursor: 'text'
                                    }
                                }),
                                _react2.default.createElement(_SvgButton2.default, {
                                    icon: _react2.default.createElement(_ContentCopy2.default, null),
                                    tooltip: 'Copy to clipboard',
                                    width: 48,
                                    onClick: this.onCopy
                                }),
                                _react2.default.createElement('div', { style: { width: 4 } }),
                                _react2.default.createElement(_SvgButton2.default, {
                                    icon: _react2.default.createElement(_SwitchCamera2.default, null),
                                    tooltip: 'switch style',
                                    width: 48,
                                    onClick: this.onSwitchStyleObj
                                })
                            )
                        )
                    )
                ),
                this.props.shouldShowData ? themesList(this.props.fullTheme() ? this.props.muiTheme : this.props.theme, this.props, this.onSelect) : null
            );
        }
    }, {
        key: 'render',
        value: function render() {
            //        const barWidth = this.props.open ? BAR_WIDTH : 0; // fixme BAR_WIDTH

            return _react2.default.createElement(
                'div',
                {
                    className: _.CSS_CLASS + '-theme_sidebar',
                    style: { width: '100%', height: '100%' }
                },
                this.props.open ? this.renderContent() : null
            );
        }
    }]);

    return ThemeSideBar;
}(_react2.default.Component);

exports.default = ThemeSideBar;


ThemeSideBar.propTypes = propTypes;

ThemeSideBar.contextTypes = {
    muiTheme: _propTypes2.default.object.isRequired
};

function forTable(tableTame, objListFunc) {
    return function (val) {
        var objList = objListFunc();
        var obj = objList[tableTame];
        if (val == undefined) {
            return obj;
        }
        objList[tableTame] = val;
        objListFunc(objList);
        return val;
    };
}

function themesList(themeObj, _props, onSelect) {
    var onThemeTableOverride = function onThemeTableOverride(tableName) {
        return function (propName, value) {
            var overTheme = {};
            if (tableName === 'miscellaneous') {
                overTheme[propName] = value;
                _props.onThemeOverride(overTheme);
                return;
            }
            overTheme[tableName] = {};
            overTheme[tableName][propName] = value;
            _props.onThemeOverride(overTheme);
        };
    };

    var themePropTable = function themePropTable(tableName, table) {
        return _react2.default.createElement(_ThemePropBlock2.default, {
            key: tableName,
            settingsObj: table,
            settingsName: tableName,
            open: forTable(tableName, _props.collapseList),
            override: forTable(tableName, _props.themesOverrideList),
            onThemeTableOverride: onThemeTableOverride(tableName),
            onSelect: onSelect
        });
    };

    var keyList = Object.keys(themeObj);

    var strList = {};
    keyList.forEach(function (val) {
        if (typeof themeObj[val] === 'string') {
            strList[val] = themeObj[val];
        }
    });

    var strListNode = themePropTable('miscellaneous', strList);
    var paletteList = themeObj.palette ? themePropTable('palette', themeObj.palette) : _react2.default.createElement(
        'div',
        null,
        ' ',
        'No palette here',
        ' '
    );

    var tablesListObj = keyList.map(function (val) {
        if (_typeof(themeObj[val]) === 'object' && val !== 'palette') {
            return themePropTable(val, themeObj[val]);
        }
        return null;
    });

    var scrollStyle = {
        height: '100%',
        overflowY: 'scroll'
    };
    return _react2.default.createElement(
        'div',
        {
            className: _.CSS_CLASS + '-theme_sidebar-tables',
            style: {

                height: 100,
                flexGrow: 1,
                flexShrink: 1
            }
        },
        _react2.default.createElement(
            'div',
            {
                className: _.CSS_CLASS + '-theme_sidebar-tables-scroll',
                style: scrollStyle
            },
            _react2.default.createElement(
                'div',
                {
                    style: {
                        paddingLeft: 3,
                        paddingRight: 12

                    }
                },
                _react2.default.createElement(
                    'div',
                    { style: { backgroundColor: 'rgba(128, 128, 128, 0.04)' } },
                    paletteList,
                    tablesListObj,
                    strListNode,
                    _react2.default.createElement('div', { style: { height: 16 } })
                )
            )
        )
    );
}