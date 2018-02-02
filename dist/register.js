'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

var _ = require('./');

var _reactTapEventPlugin = require('react-tap-event-plugin');

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import PanelContainer from './containers/PanelContainer';
function inject() {
    try {
        (0, _reactTapEventPlugin2.default)();
    } catch (err) {
        console.warn(err);
    }
}
inject();

// addons.register(ADDON_ID, (api) => {
//     const channel = addons.getChannel();
//     addons.addPanel(PANEL_ID, {
//         title: 'Material-UI',
//         render: () => <PanelContainer channel={channel} api={api} />,
//     });
// });