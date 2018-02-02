'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
    scale: _propTypes2.default.number.isRequired,
    path: _propTypes2.default.string
};

var defaultProps = {
    scale: 0.8,
    path: 'material-ui/svg-icons/action/home'
};

var contextTypes = {
    muiTheme: _propTypes2.default.object.isRequired
};

var SvgIcon = function (_React$Component) {
    _inherits(SvgIcon, _React$Component);

    function SvgIcon(props, context) {
        _classCallCheck(this, SvgIcon);

        var _this = _possibleConstructorReturn(this, (SvgIcon.__proto__ || Object.getPrototypeOf(SvgIcon)).call(this, props, context));

        require.ensure([], function (require) {
            var Icon = require('material-ui/svg-icons/action/home');
            _this.ActionHome = Icon.default;
        });

        _this.scaleProp = {
            style: { transform: 'scale(' + props.scale + ')' }
        };
        return _this;
    }

    _createClass(SvgIcon, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    this.scaleProp,
                    _react2.default.createElement(this.ActionHome, {
                        color: this.context.muiTheme.palette.secondaryTextColor
                    })
                )
            );
        }
    }]);

    return SvgIcon;
}(_react2.default.Component);

exports.default = SvgIcon;


SvgIcon.propTypes = propTypes;
SvgIcon.defaultProps = defaultProps;
SvgIcon.contextTypes = contextTypes;