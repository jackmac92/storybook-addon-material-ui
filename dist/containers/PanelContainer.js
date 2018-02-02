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

var _styles = require('material-ui/styles');

var _palette = require('material-ui/styles/palette');

var _palette2 = _interopRequireDefault(_palette);

var _jsBeautify = require('js-beautify');

var beauti = _interopRequireWildcard(_jsBeautify);

var _ = require('../');

var _ThemePanel = require('../components/ThemePanel');

var _ThemePanel2 = _interopRequireDefault(_ThemePanel);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'; // eslint-disable-line


var _global = global,
    document = _global.document,
    window = _global.window;

var logger = console;

var lightBaseTheme = (0, _styles.createMuiTheme)();
var darkBaseTheme = (0, _styles.createMuiTheme)({
    palette: (0, _palette2.default)({
        type: 'dark'
    })
});

var PROGRESS_STATUS = {
    'button-clone': 'soon', // todo: [] button_clone
    'button-download': 'done', // todo: [x] button_download
    'button-clean': 'soon', // todo: [] button_clean
    'textarea-edit': 'done', // todo: [x] textarea-edit
    'textarea-update': 'done' // todo: [x] textarea-update
};

var progressInfo = function progressInfo() {
    var keys = Object.keys(PROGRESS_STATUS);
    logger.group('PROGRESS_STATUS:');
    keys.forEach(function (val) {
        if (PROGRESS_STATUS[val] === 'done') {
            logger.info(val + ': ' + PROGRESS_STATUS[val]);
            return;
        }
        logger.warn(val + ': ' + PROGRESS_STATUS[val]);
    });
    logger.groupEnd('PROGRESS_STATUS:');
};

var propTypes = {
    channel: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired
};

var PanelContainer = function (_React$Component) {
    _inherits(PanelContainer, _React$Component);

    function PanelContainer(props) {
        var _ref;

        _classCallCheck(this, PanelContainer);

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = PanelContainer.__proto__ || Object.getPrototypeOf(PanelContainer)).call.apply(_ref, [this, props].concat(args)));

        _this.state = {
            isReady: false,
            isThemeInvalid: false,
            isThemeEditing: false,
            themeString: ''
        };
        _this.isChannelData = false;

        // future: get from state with own theme ind
        _this.muiTheme = lightBaseTheme;

        _this.onInitChannel = _this.onInitChannel.bind(_this);
        _this.onDataChannel = _this.onDataChannel.bind(_this);
        _this.onThemeSelect = _this.onThemeSelect.bind(_this);
        _this.onChangeTheme = _this.onChangeTheme.bind(_this);
        _this.onThemeEditing = _this.onThemeEditing.bind(_this);
        _this.onToggleSideBar = _this.onToggleSideBar.bind(_this);
        _this.onDnLoadTheme = _this.onDnLoadTheme.bind(_this);
        _this.onCloneTheme = _this.onCloneTheme.bind(_this);
        _this.onCleanTheme = _this.onCleanTheme.bind(_this);

        _this.dataChannelSend = _this.dataChannelSend.bind(_this);
        _this.queryFetch = _this.queryFetch.bind(_this);
        _this.querySet = _this.querySet.bind(_this);
        _this.getCurrentTheme = _this.getCurrentTheme.bind(_this);
        return _this;
    }

    _createClass(PanelContainer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.props.channel.on(_.EVENT_ID_INIT, this.onInitChannel);
            this.props.channel.on(_.EVENT_ID_DATA, this.onDataChannel);
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps, nextState) {
            //        if (!this.isChannelData) this.props.channel.emit(EVENT_ID_DATA, nextState);
            this.querySet(nextState);
            this.dataChannelSend(nextState);
            this.isChannelData = false;
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.props.channel.removeListener(_.EVENT_ID_INIT, this.onInitChannel);
            this.props.channel.removeListener(_.EVENT_ID_DATA, this.onDataChannel);
        }
    }, {
        key: 'onInitChannel',
        value: function onInitChannel(initData) {
            var themesNameList = this.genNameList(initData.themesAppliedList);
            var queryData = this.queryFetch();
            this.setState(_extends({}, initData, queryData, { themesNameList: themesNameList, isReady: true }));
        }
    }, {
        key: 'onDataChannel',
        value: function onDataChannel(stateData) {
            //        const stateData = JSON.parse(strData);
            var themesNameList = this.genNameList(stateData.themesAppliedList);
            this.isChannelData = true; // note: this state received by channel, don't need to send back
            this.setState(_extends({}, stateData, { themesNameList: themesNameList }));
        }
    }, {
        key: 'onThemeSelect',
        value: function onThemeSelect(ind) {
            this.setState({
                themeInd: ind
            });
        }
    }, {
        key: 'onChangeTheme',
        value: function onChangeTheme(event) {
            var str = event.target.value;
            try {
                var newTheme = JSON.parse(str);
                var themesAppliedList = this.state.themesAppliedList;
                themesAppliedList[this.state.themeInd] = newTheme;
                this.setState({
                    themesAppliedList: themesAppliedList,
                    isThemeInvalid: false,
                    themeString: str
                });
            } catch (e) {
                this.setState({
                    isThemeInvalid: true,
                    themeString: str
                });
            }
        }
    }, {
        key: 'onThemeEditing',
        value: function onThemeEditing(isFocus) {
            var _this2 = this;

            return function () {
                return _this2.setState({
                    isThemeEditing: isFocus,
                    themeString: _this2.getCurrentTheme(1)
                });
            };
        }
    }, {
        key: 'onToggleSideBar',
        value: function onToggleSideBar(f) {
            this.setState({
                isSideBarOpen: f
            });
        }
    }, {
        key: 'onDnLoadTheme',
        value: function onDnLoadTheme() {
            var uri = 'data:application/json;charset=utf-8;base64,\n' + window.btoa(this.getCurrentTheme(4));
            var fileName = this.state.themesAppliedList[this.state.themeInd].themeFile || 'theme.json';
            var downloadTheme = document.createElement('a');
            downloadTheme.href = uri;
            downloadTheme.download = fileName;

            document.body.appendChild(downloadTheme);
            downloadTheme.click();
            document.body.removeChild(downloadTheme);
        }
    }, {
        key: 'onCloneTheme',
        value: function onCloneTheme() {
            progressInfo(this);
            return null;

            //        const themesAppliedList = this.state.themesAppliedList;
            //        const newTheme = Object.assign({}, themesAppliedList[this.state.themeInd]); // fixme:  deeper
            //        newTheme.themeName = `${themesAppliedList[this.state.themeInd].themeName} clone`;
            //        newTheme.themeFile = `${themesAppliedList[this.state.themeInd].themeFile}.clone`;
            //        const newAppliedList = themesAppliedList.slice(0, this.state.themeInd + 1)
            //            .concat(newTheme, themesAppliedList.slice(this.state.themeInd + 1));
            //        const themesNameList = this.genNameList(newAppliedList);
            //        logger.log(themesNameList);
            //        this.setState({ themesAppliedList: newAppliedList, themesNameList });
        }
    }, {
        key: 'onCleanTheme',
        value: function onCleanTheme() {
            progressInfo(this);
            return null;

            //        const themesAppliedList = this.state.themesAppliedList;
            //        const newTheme = {};
            //        newTheme.themeName = themesAppliedList[this.state.themeInd].themeName;
            //        newTheme.themeFile = themesAppliedList[this.state.themeInd].themeFile;
            //        themesAppliedList[this.state.themeInd] = newTheme;
            //        const themesNameList = this.genNameList(themesAppliedList);
            //        this.setState({ themesAppliedList, themesNameList });
        }
    }, {
        key: 'dataChannelSend',
        value: function dataChannelSend(data) {
            if (this.isChannelData) return false;
            this.props.channel.emit(_.EVENT_ID_DATA, data);
            return true;
        }
    }, {
        key: 'queryFetch',
        value: function queryFetch() {
            var themeInd = this.props.api.getQueryParam('theme-ind');
            var isSideBarOpen = this.props.api.getQueryParam('theme-sidebar');
            var isFullTheme = this.props.api.getQueryParam('theme-full');
            var data = JSON.parse(JSON.stringify({ themeInd: themeInd, isSideBarOpen: isSideBarOpen, isFullTheme: isFullTheme }));
            var keys = Object.keys(data);
            keys.forEach(function (val) {
                data[val] = JSON.parse(data[val]);
            });
            return data;
        }
    }, {
        key: 'querySet',
        value: function querySet(state) {
            if (state.isReady) {
                var themeInd = state.themeInd,
                    isSideBarOpen = state.isSideBarOpen,
                    isFullTheme = state.isFullTheme;

                var queryParams = {
                    'theme-ind': themeInd,
                    'theme-sidebar': isSideBarOpen,
                    'theme-full': isFullTheme
                };
                this.props.api.setQueryParams(queryParams);
            }
        }
    }, {
        key: 'genNameList',
        value: function genNameList(themesAppliedList) {
            return themesAppliedList.map(function (val, ind) {
                return val.themeName || 'Theme ' + (ind + 1);
            });
        }
    }, {
        key: 'getCurrentTheme',
        value: function getCurrentTheme() {
            var indent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

            return beauti.js_beautify(JSON.stringify(this.state.themesAppliedList[this.state.themeInd]), {
                indent_size: indent,
                indent_char: ' ',
                eol: '\n',
                end_with_newline: true
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return this.state.isReady ? _react2.default.createElement(
                _styles.MuiThemeProvider,
                { muiTheme: this.muiTheme },
                _react2.default.createElement(_ThemePanel2.default, {
                    themesNameList: this.state.themesNameList,
                    defautThemeInd: this.state.themeInd,
                    isSideBarOpen: this.state.isSideBarOpen,
                    onThemeSelect: this.onThemeSelect,
                    onToggleSideBar: this.onToggleSideBar,
                    themeJSON: this.state.isThemeInvalid || this.state.isThemeEditing ? this.state.themeString : this.getCurrentTheme(1),
                    isThemeInvalid: this.state.isThemeInvalid,
                    onThemeEditing: this.onThemeEditing,
                    onChangeTheme: this.onChangeTheme,
                    onDnLoadTheme: this.onDnLoadTheme,
                    onCloneTheme: this.onCloneTheme,
                    onCleanTheme: this.onCleanTheme
                })
            ) : _react2.default.createElement(
                'div',
                {
                    style: {
                        padding: 16,
                        fontFamily: '"San Francisco", Roboto, "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif',
                        color: 'rgb(68, 68, 68)'
                    }
                },
                'waiting for muiTheme decorator...'
            );
        }
    }]);

    return PanelContainer;
}(_react2.default.Component);

exports.default = PanelContainer;


PanelContainer.propTypes = propTypes;