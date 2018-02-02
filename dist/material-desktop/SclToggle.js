'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = SclToggle;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Switch = require('material-ui/Switch');

var _Switch2 = _interopRequireDefault(_Switch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultProps = {
    scale: 0.7
};

var propTypes = {
    scale: _propTypes2.default.number
};

function SclToggle(props) {
    var style = {
        transform: 'scale(' + props.scale + ')'
    };
    return _react2.default.createElement(
        'div',
        { style: style },
        _react2.default.createElement(_Switch2.default, props)
    );
}
SclToggle.defaultProps = defaultProps;
SclToggle.propTypes = propTypes;