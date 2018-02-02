'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _DropDownMenu = require('material-ui/DropDownMenu');

var _DropDownMenu2 = _interopRequireDefault(_DropDownMenu);

var _createNewFolder = require('material-ui/svg-icons/file/create-new-folder');

var _createNewFolder2 = _interopRequireDefault(_createNewFolder);

var _fileDownload = require('material-ui/svg-icons/file/file-download');

var _fileDownload2 = _interopRequireDefault(_fileDownload);

var _deleteForever = require('material-ui/svg-icons/action/delete-forever');

var _deleteForever2 = _interopRequireDefault(_deleteForever);

var _SvgButton = require('../material-desktop/SvgButton');

var _SvgButton2 = _interopRequireDefault(_SvgButton);

var _SclToggle = require('../material-desktop/SclToggle');

var _SclToggle2 = _interopRequireDefault(_SclToggle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  themesNameList: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
  defautThemeInd: _propTypes2.default.number.isRequired,
  onThemeSelect: _propTypes2.default.func.isRequired,
  onToggleSideBar: _propTypes2.default.func.isRequired,
  isSideBarOpen: _propTypes2.default.bool.isRequired,
  isThemeInvalid: _propTypes2.default.bool.isRequired,
  themeJSON: _propTypes2.default.string.isRequired,
  onChangeTheme: _propTypes2.default.func.isRequired,
  onThemeEditing: _propTypes2.default.func.isRequired,
  onCloneTheme: _propTypes2.default.func.isRequired,
  onDnLoadTheme: _propTypes2.default.func.isRequired,
  onCleanTheme: _propTypes2.default.func.isRequired
};

var defaultProps = {
  themesNameList: ['BaseLight', 'BaseDark'],
  defautThemeInd: 0,
  onThemeSelect: function onThemeSelect() {},
  onToggleSideBar: function onToggleSideBar() {},
  isSideBarOpen: false,
  onCloneTheme: function onCloneTheme() {},
  onDnLoadTheme: function onDnLoadTheme() {},
  onCleanTheme: function onCleanTheme() {}
};

var contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};

var ThemePanel = function (_React$Component) {
  _inherits(ThemePanel, _React$Component);

  function ThemePanel(props) {
    _classCallCheck(this, ThemePanel);

    var _this = _possibleConstructorReturn(this, (ThemePanel.__proto__ || Object.getPrototypeOf(ThemePanel)).call(this, props));

    _this.menuItems = props.themesNameList.map(function (val, ind) {
      return _react2.default.createElement(_MenuItem2.default, { value: ind, key: val, primaryText: val });
    });
    _this.state = {
      value: props.defautThemeInd,
      isThemeEditing: false,
      isThemeValid: true
    };

    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(ThemePanel, [{
    key: 'handleChange',
    value: function handleChange(event, index, value) {
      this.setState({ value: value }, this.props.onThemeSelect(value));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var styleArea = {
        width: '100%',
        height: '100%',
        outlineColor: this.props.isThemeInvalid ? '#cc5858' : '#26acd8'
      };
      return _react2.default.createElement(
        'div',
        {
          style: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            backgroundColor: this.context.muiTheme.palette.canvasColor
          }
        },
        _react2.default.createElement(
          'div',
          {
            style: {
              minWidth: 160,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }
          },
          _react2.default.createElement(
            _DropDownMenu2.default,
            {
              value: this.state.value,
              onChange: this.handleChange,
              iconStyle: { fill: this.context.muiTheme.palette.textColor },
              style: { width: '100%' }
            },
            this.menuItems
          ),
          _react2.default.createElement(
            'div',
            {
              style: {
                //                    width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                margin: '0 16px'
              }
            },
            _react2.default.createElement(_SvgButton2.default, {
              icon: _react2.default.createElement(_fileDownload2.default, null),
              tooltip: 'Download Theme',
              tooltipPosition: 'top-right',
              width: 48,
              onClick: this.props.onDnLoadTheme
            }),
            _react2.default.createElement(_SvgButton2.default, {
              icon: _react2.default.createElement(_createNewFolder2.default, null),
              tooltip: 'this option is in development...',
              tooltipPosition: 'top-right',
              width: 48,
              onClick: this.props.onCloneTheme
            }),
            _react2.default.createElement(_SvgButton2.default, {
              icon: _react2.default.createElement(_deleteForever2.default, null),
              tooltip: 'this option is in development...',
              tooltipPosition: 'top-right',
              width: 48,
              onClick: this.props.onCleanTheme
            })
          )
        ),
        _react2.default.createElement(
          'div',
          { style: { width: 200, minWidth: 150, flexGrow: 1, padding: 16 } },
          _react2.default.createElement('textarea', {
            style: styleArea,
            value: this.props.themeJSON,
            onChange: this.props.onChangeTheme,
            onFocus: this.props.onThemeEditing(true),
            onBlur: this.props.onThemeEditing(false)
          })
        ),
        _react2.default.createElement(
          'div',
          { style: { width: 200, paddingTop: 16 } },
          _react2.default.createElement(_SclToggle2.default, {
            label: 'Show Theme Editor',
            labelPosition: 'left',
            toggled: this.props.isSideBarOpen,
            onToggle: function onToggle() {
              return _this2.props.onToggleSideBar(!_this2.props.isSideBarOpen);
            }
          })
        )
      );
    }
  }]);

  return ThemePanel;
}(_react2.default.Component);

exports.default = ThemePanel;


ThemePanel.propTypes = propTypes;
ThemePanel.defaultProps = defaultProps;
ThemePanel.contextTypes = contextTypes;