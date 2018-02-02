'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
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

var accent = {
    50: '#ffede7',
    100: '#ffd1c2',
    200: '#ffb399',
    300: '#ff9470',
    400: '#ff7d52',
    500: '#ff6633',
    600: '#ff5e2e',
    700: '#ff5327',
    800: '#ff4920',
    900: '#ff3814',
    A100: '#ffffff',
    A200: '#fffbfb',
    A400: '#ffcec8',
    A700: '#ffb8ae',
    contrastDefaultColor: 'light'
    // contrastDarkColors: [
    //   '50',
    //   '100',
    //   '200',
    //   '300',
    //   '400',
    //   '500',
    //   '600',
    //   '700',
    //   'A100',
    //   'A200',
    //   'A400',
    //   'A700'
    // ],
    // contrastLightColors: ['800', '900']
};
var primary = {
    50: '#e0edf3',
    100: '#b3d1e0',
    200: '#80b3cc',
    300: '#4d94b8',
    400: '#267da8',
    500: '#006699',
    600: '#005e91',
    700: '#005386',
    800: '#00497c',
    900: '#00386b',
    A100: '#9ac6ff',
    A200: '#67aaff',
    A400: '#348dff',
    A700: '#1a7fff',
    contrastDefaultColor: 'light'
    // contrastDarkColors: ['50', '100', '200', '300', 'A100', 'A200'],
    // contrastLightColors: [
    //   '400',
    //   '500',
    //   '600',
    //   '700',
    //   '800',
    //   '900',
    //   'A400',
    //   'A700'
    // ]
};

var currentTheme = (0, _styles.createMuiTheme)({
    palette: {
        primary: primary,
        accent: accent
    }
});

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