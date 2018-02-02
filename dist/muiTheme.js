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

var _ = require('./');

var _lightBaseTheme = require('material-ui/styles/baseThemes/lightBaseTheme');

var _lightBaseTheme2 = _interopRequireDefault(_lightBaseTheme);

var _darkBaseTheme = require('material-ui/styles/baseThemes/darkBaseTheme');

var _darkBaseTheme2 = _interopRequireDefault(_darkBaseTheme);

var _MuiTheme = require('./containers/MuiTheme');

var _MuiTheme2 = _interopRequireDefault(_MuiTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_lightBaseTheme2.default.themeName = 'Light Theme';
_darkBaseTheme2.default.themeName = 'Dark Theme';

function muiTheme(themes) {
    /** note: muiTheme arguments
     *
     *  the agrument 'themes' should be:
     *     - muiThemes (array): array with muiThemes;
     *     - muiTheme (object): single muiTheme;
     *  muiTheme is a two nesting level object with new or overriding props
     *
     */

    var channel = _addons2.default.getChannel();
    var themesInitList = [_lightBaseTheme2.default, _darkBaseTheme2.default];
    if (themes) {
        if (Array.isArray(themes)) {
            themesInitList = themes;
            themesInitList.forEach(function (val, ind) {
                if (typeof val === 'string') {
                    /* note: unsupported names goes as lightBaseTheme
                    if (val === lightBaseTheme.themeName) {
                        themesInitList[ind] = lightBaseTheme;
                    }
                    */
                    if (val === _darkBaseTheme2.default.themeName) {
                        themesInitList[ind] = _darkBaseTheme2.default;
                    } else {
                        themesInitList[ind] = _lightBaseTheme2.default;
                    }
                }
            });
        } else {
            themesInitList = [themes];
        }
    }

    var themesOverrideList = themesInitList.map(function (val) {
        return {
            themeName: val.themeName,
            palette: {}
        };
    });
    var themesAppliedList = makeClone(themesInitList);
    themesAppliedList[0] = themeApply(themesInitList[0], themesOverrideList[0]);
    var themesRenderedList = themeListRender(themesAppliedList);

    /** note: theme arrays description
     *
     *    themesInitList - initial list of base and user themes
     *    themesOverrideList - list of overwritings made by user
     *    themesAppliedList - overrided list (union InitList and OverrideList) - will be shown to user
     *    themesRenderedList - overrided list - will be used in ThemeProvider (resolved all links)
     *
     */

    var storedState = {
        themeInd: 0,
        isSideBarOpen: false,
        isFullTheme: false,
        collapseList: {
            palette: true
        },
        currentThemeOverride: {}
    };

    var panelState = function panelState(state) {
        var themeInd = state.themeInd,
            isSideBarOpen = state.isSideBarOpen,
            currentThemeOverride = state.currentThemeOverride;

        return {
            themeInd: themeInd,
            isSideBarOpen: isSideBarOpen,
            currentThemeOverride: currentThemeOverride,
            themesAppliedList: themesAppliedList,
            themesRenderedList: themesRenderedList
        };
    };

    var storeState = function storeState(state) {
        storedState = state;
    };

    var onThemeOverride = function onThemeOverride(themeInd) {
        return function (overTheme) {
            themesOverrideList[themeInd] = themeApply(themesOverrideList[themeInd], overTheme);
            themesAppliedList[themeInd] = themeApply(themesInitList[themeInd], themesOverrideList[themeInd]);
            return themesAppliedList;
        };
    };

    // fixme: EVENT_ID_INIT (local gecorators?)
    channel.emit(_.EVENT_ID_INIT, panelState(storedState));

    return function (story) {
        var storyItem = story();
        return _react2.default.createElement(_MuiTheme2.default, {
            story: storyItem,
            themesAppliedListInit: themesAppliedList,
            themesRenderedList: themesRenderedList,
            onThemeOverride: onThemeOverride,
            initState: storedState,
            onChangeState: storeState,
            themeListRender: themeListRender,
            channel: channel
        });
    };
}

function themeApply(prevTheme, overTheme) {
    var newTheme = makeClone(prevTheme);
    var keys = Object.keys(overTheme);
    keys.forEach(function (val) {
        if (_typeof(overTheme[val]) === 'object') {
            if (typeof newTheme[val] === 'undefined') {
                newTheme[val] = {};
            }

            var subKeys = Object.keys(overTheme[val]);
            // note: find out a number or a string
            subKeys.forEach(function (prop) {
                newTheme[val][prop] = tryParse(overTheme[val][prop]);
            });
        } else {
            newTheme[val] = overTheme[val];
        }
    });

    return newTheme;
}

function themeListRender(themesAppliedList) {
    var themesRenderedList = makeClone(themesAppliedList);
    return themesRenderedList;
}

function makeClone(obj) {
    // future: use immutable
    return JSON.parse(JSON.stringify(obj));
}

function tryParse(val) {
    return parseInt(val, 10) || val;
}