'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.muiTheme = muiTheme;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

var _styles = require('material-ui/styles');

var _palette = require('material-ui/styles/palette');

var _palette2 = _interopRequireDefault(_palette);

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lightBaseTheme = (0, _styles.createMuiTheme)();
var darkBaseTheme = (0, _styles.createMuiTheme)({
    palette: (0, _palette2.default)({
        type: 'dark'
    })
});

lightBaseTheme.themeName = 'Light Theme';
darkBaseTheme.themeName = 'Dark Theme';

var previewStyle = function previewStyle(color) {
    return {
        backgroundColor: color,
        width: '100%',
        height: '100%',
        minHeight: 600
    };
};

function muiTheme() {
    var theme = arguments.length <= 0 ? undefined : arguments[0];
    var currentTheme = lightBaseTheme;
    if (theme === 'dark') {
        currentTheme = darkBaseTheme;
    }
    if ((typeof theme === 'undefined' ? 'undefined' : _typeof(theme)) === 'object') {
        currentTheme = theme;
    }

    var backgroundColor = currentTheme.palette.type === 'dark' ? 'rgb(50,50,50)' : 'white';
    return function (storyFn, context) {
        return _react2.default.createElement(
            'div',
            { style: previewStyle(backgroundColor) },
            _react2.default.createElement(
                _styles.MuiThemeProvider,
                { theme: currentTheme },
                storyFn(context)
            )
        );
    };
}