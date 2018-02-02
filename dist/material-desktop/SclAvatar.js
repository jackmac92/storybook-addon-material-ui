'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = SclAvatar;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Chip = require('material-ui/Chip');

var _Chip2 = _interopRequireDefault(_Chip);

var _Avatar = require('material-ui/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultProps = {
    scale: 0.8
};

var propTypes = {
    scale: _propTypes2.default.number,
    text: _propTypes2.default.string
};

function SclAvatar(props) {
    var style = {
        transform: 'scale(' + props.scale + ')',
        transformOrigin: 'left'
        //        left: -95 * (1 - props.scale) / 2,
        //        position: 'absolute',
    };
    var chipProps = Object.assign({}, props);
    delete chipProps.text;
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'div',
            { style: style },
            _react2.default.createElement(
                _Chip2.default,
                chipProps,
                _react2.default.createElement(
                    _Avatar2.default,
                    null,
                    props.text[0].toUpperCase()
                ),
                props.text
            )
        )
    );
}
SclAvatar.defaultProps = defaultProps;
SclAvatar.propTypes = propTypes;