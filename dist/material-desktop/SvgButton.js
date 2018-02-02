'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
    iconScale: _propTypes2.default.number.isRequired,
    icon: _propTypes2.default.element.isRequired,
    tooltip: _propTypes2.default.string,
    tooltipPosition: _propTypes2.default.string,
    width: _propTypes2.default.number,
    onClick: _propTypes2.default.func
};

var defaultProps = {
    iconScale: 0.8,
    tooltipPosition: 'top-center',
    width: 32
};

var contextTypes = {
    muiTheme: _propTypes2.default.object.isRequired
};

var SvgButton = function (_React$Component) {
    _inherits(SvgButton, _React$Component);

    function SvgButton(props, context) {
        _classCallCheck(this, SvgButton);

        var _this = _possibleConstructorReturn(this, (SvgButton.__proto__ || Object.getPrototypeOf(SvgButton)).call(this, props, context));

        _this.scaleProp = {
            style: {
                transform: 'scale(' + props.iconScale + ')',
                width: 24,
                margin: '0 auto'
            }
        };
        _this.butnProp = {
            style: {
                marginLeft: (24 - props.width) / 2,
                width: props.width,
                display: 'flex',
                justifyContent: 'center',
                overflow: 'hidden'
            },
            title: props.tooltip,
            onClick: props.onClick
        };
        return _this;
    }

    _createClass(SvgButton, [{
        key: 'render',
        value: function render() {
            var icon = _react2.default.cloneElement(this.props.icon, {
                color: this.context.muiTheme.palette.secondaryTextColor
            });
            return _react2.default.createElement(
                'div',
                {
                    style: {
                        width: 24
                    }
                },
                _react2.default.createElement(
                    'div',
                    this.butnProp,
                    _react2.default.createElement(
                        'div',
                        { style: { width: 48 } },
                        _react2.default.createElement(
                            _IconButton2.default,
                            {
                                tooltip: null,
                                style: { padding: 0 }
                            },
                            _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(
                                    'div',
                                    this.scaleProp,
                                    icon
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return SvgButton;
}(_react2.default.Component);

exports.default = SvgButton;


SvgButton.propTypes = propTypes;
SvgButton.defaultProps = defaultProps;
SvgButton.contextTypes = contextTypes;