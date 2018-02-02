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

var _getMuiTheme = require('material-ui/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _reactSplitPane = require('react-split-pane');

var _reactSplitPane2 = _interopRequireDefault(_reactSplitPane);

var _ = require('../');

var _ThemeSideBar = require('../components/ThemeSideBar');

var _ThemeSideBar2 = _interopRequireDefault(_ThemeSideBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // future: add CSS_CLASS
// future: [x] remove ThemeToolbar


// const stringify = require('json-stringify-safe');

var propTypes = {
    themesAppliedListInit: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
    story: _propTypes2.default.object.isRequired,
    onChangeState: _propTypes2.default.func.isRequired,
    onThemeOverride: _propTypes2.default.func.isRequired,
    themeListRender: _propTypes2.default.func.isRequired,
    initState: _propTypes2.default.object.isRequired,
    channel: _propTypes2.default.object.isRequired
};

var MuiTheme = function (_React$Component) {
    _inherits(MuiTheme, _React$Component);

    function MuiTheme(props, context) {
        _classCallCheck(this, MuiTheme);

        var _this = _possibleConstructorReturn(this, (MuiTheme.__proto__ || Object.getPrototypeOf(MuiTheme)).call(this, props, context));

        _this.state = props.initState;
        _this.state.themesAppliedList = props.themesAppliedListInit;
        _this.state.muiTheme = (0, _getMuiTheme2.default)(props.themesAppliedListInit[props.initState.themeInd]);
        _this.state.isMount = false;
        _this.isChannelData = false;
        _this.UpdateList = {};

        _this.changeTheme = _this.changeTheme.bind(_this);
        _this.onChannel = _this.onChannel.bind(_this);
        _this.openSideBar = _this.openSideBar.bind(_this);
        _this.onThemeOverride = _this.onThemeOverride.bind(_this);
        _this.subState = _this.subState.bind(_this);
        _this.wouldComponentUpdate = _this.wouldComponentUpdate.bind(_this);
        _this.needComponentUpdate = _this.needComponentUpdate.bind(_this);

        _this.dataChannelSend = _this.dataChannelSend.bind(_this);
        return _this;
    }

    _createClass(MuiTheme, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.props.channel.on(_.EVENT_ID_DATA, this.onChannel);
            if (!this.state.isMount) {
                setTimeout(function () {
                    _this2.needComponentUpdate('ThemeSideBar');
                    _this2.setState({ isMount: true });
                }, 1);
            }
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            return true; // fixme: shouldComponentUpdate
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps, nextState) {
            this.props.onChangeState(nextState);
            this.dataChannelSend(nextState);
            this.isChannelData = false;
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.props.channel.removeListener(_.EVENT_ID_DATA, this.onChannel);
        }
    }, {
        key: 'onChannel',
        value: function onChannel(state) {
            var _this3 = this;

            this.needComponentUpdate('ThemeSideBar');
            this.isChannelData = true;
            // fixme: onThemeOverride - to store theme
            this.setState(_extends({}, state, { isMount: false }), function () {
                return setTimeout(function () {
                    var override = _this3.onThemeOverride();
                    override(_this3.state.themesAppliedList[_this3.state.themeInd]);
                    _this3.isChannelData = true;
                    _this3.setState({ isMount: true });
                }, 10);
            });
        }
    }, {
        key: 'onThemeOverride',
        value: function onThemeOverride() {
            var _this4 = this;

            var propsThemeOverFunc = this.props.onThemeOverride(this.state.themeInd);
            return function (overTheme) {
                var themesAppliedList = propsThemeOverFunc(overTheme);
                _this4.needComponentUpdate('ThemeSideBar');
                _this4.setState({ themesAppliedList: themesAppliedList });
            };
        }
    }, {
        key: 'dataChannelSend',
        value: function dataChannelSend(data) {
            if (this.isChannelData || !this.state.isMount) return false;
            //        const dataStr = stringify(data);
            this.props.channel.emit(_.EVENT_ID_DATA, data);
            return true;
        }
    }, {
        key: 'changeTheme',
        value: function changeTheme(ind) {
            this.needComponentUpdate('ThemeSideBar');
            this.setState({
                muiTheme: (0, _getMuiTheme2.default)(this.state.themesAppliedList[ind]),
                themeInd: ind
            });
        }
    }, {
        key: 'openSideBar',
        value: function openSideBar(f) {
            this.needComponentUpdate('ThemeSideBar');
            this.setState({
                isSideBarOpen: f
            });
        }
    }, {
        key: 'subState',
        value: function subState(componentName, prop) {
            var _this5 = this;

            return function (val) {
                if (val == undefined) {
                    return _this5.state[prop];
                }
                var subState = {};
                subState[prop] = val;
                _this5.setState(subState);
                _this5.needComponentUpdate(componentName);
                return val;
            };
        }
    }, {
        key: 'wouldComponentUpdate',
        value: function wouldComponentUpdate(componentName) {
            if (this.UpdateList[componentName] == undefined) {
                this.UpdateList[componentName] = false;
            }
            var upd = this.UpdateList[componentName];
            this.UpdateList[componentName] = false;
            return upd;
        }
    }, {
        key: 'needComponentUpdate',
        value: function needComponentUpdate(componentName) {
            this.UpdateList[componentName] = true;
        }
    }, {
        key: 'render',
        value: function render() {
            var ThemesNameList = this.state.themesAppliedList.map(function (val, ind) {
                return val.themeName || 'Theme ' + (ind + 1);
            });
            var muiTheme = (0, _getMuiTheme2.default)(this.props.themeListRender(this.state.themesAppliedList[this.state.themeInd]));
            return _react2.default.createElement(
                _MuiThemeProvider2.default,
                { muiTheme: muiTheme },
                _react2.default.createElement(
                    'div',
                    {
                        style: {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: muiTheme.palette.canvasColor
                        }

                    },
                    _react2.default.createElement(
                        _reactSplitPane2.default,
                        {
                            split: 'vertical',
                            minSize: this.state.isSideBarOpen ? 200 : 0,
                            defaultSize: this.state.isSideBarOpen ? 400 : 0,
                            primary: 'second',
                            pane1Style: { overflowX: 'auto', overflowY: 'auto' },
                            pane2Style: { width: this.state.isSideBarOpen ? 'auto' : 0 },
                            resizerStyle: {
                                cursor: 'col-resize',
                                width: 10,
                                marginRight: -6,
                                zIndex: 1
                            }
                        },
                        _react2.default.createElement(
                            'div',
                            null,
                            this.props.story
                        ),
                        _react2.default.createElement(_ThemeSideBar2.default, {
                            shouldComponentUpdate: true,
                            shouldShowData: this.state.isMount,
                            open: this.state.isSideBarOpen,
                            theme: this.state.themesAppliedList[this.state.themeInd],
                            muiTheme: muiTheme,
                            themeName: ThemesNameList[this.state.themeInd],
                            fullTheme: this.subState('ThemeSideBar', 'isFullTheme'),
                            collapseList: this.subState('ThemeSideBar', 'collapseList'),
                            themesOverrideList: this.subState('ThemeSideBar', 'currentThemeOverride'),
                            onThemeOverride: this.onThemeOverride()
                        })
                    )
                )
            );
        }
    }]);

    return MuiTheme;
}(_react2.default.Component);

exports.default = MuiTheme;


MuiTheme.propTypes = propTypes;