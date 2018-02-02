import React from 'react';
import PropTypes from 'prop-types';

// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';

import SplitPane from 'react-split-pane';

import { EVENT_ID_DATA, CSS_CLASS } from '../'; // future: add CSS_CLASS
// future: [x] remove ThemeToolbar
import ThemeSideBar from '../components/ThemeSideBar';
// const stringify = require('json-stringify-safe');

const propTypes = {
    themesAppliedListInit: PropTypes.arrayOf(PropTypes.object).isRequired,
    story: PropTypes.object.isRequired,
    onChangeState: PropTypes.func.isRequired,
    onThemeOverride: PropTypes.func.isRequired,
    themeListRender: PropTypes.func.isRequired,
    initState: PropTypes.object.isRequired,
    channel: PropTypes.object.isRequired,
};

export default class MuiTheme extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = props.initState;
        this.state.themesAppliedList = props.themesAppliedListInit;
        this.state.muiTheme = createMuiTheme(props.themesAppliedListInit[props.initState.themeInd]);
        this.state.isMount = false;
        this.isChannelData = false;
        this.UpdateList = {};

        this.changeTheme = this.changeTheme.bind(this);
        this.onChannel = this.onChannel.bind(this);
        this.openSideBar = this.openSideBar.bind(this);
        this.onThemeOverride = this.onThemeOverride.bind(this);
        this.subState = this.subState.bind(this);
        this.wouldComponentUpdate = this.wouldComponentUpdate.bind(this);
        this.needComponentUpdate = this.needComponentUpdate.bind(this);

        this.dataChannelSend = this.dataChannelSend.bind(this);
    }


    componentDidMount() {
        this.props.channel.on(EVENT_ID_DATA, this.onChannel);
        if (!this.state.isMount) {
            setTimeout(() => {
                this.needComponentUpdate('ThemeSideBar');
                this.setState({ isMount: true });
            }, 1);
        }
    }

    shouldComponentUpdate() {
        return true; // fixme: shouldComponentUpdate
    }

    componentWillUpdate(nextProps, nextState) {
        this.props.onChangeState(nextState);
        this.dataChannelSend(nextState);
        this.isChannelData = false;
    }

    componentWillUnmount() {
        this.props.channel.removeListener(EVENT_ID_DATA, this.onChannel);
    }

    onChannel(state) {
        this.needComponentUpdate('ThemeSideBar');
        this.isChannelData = true;
        // fixme: onThemeOverride - to store theme
        this.setState({ ...state, isMount: false }, () => setTimeout(() => {
            const override = this.onThemeOverride();
            override(this.state.themesAppliedList[this.state.themeInd]);
            this.isChannelData = true;
            this.setState({ isMount: true });
        }, 10));
    }

    onThemeOverride() {
        const propsThemeOverFunc = this.props.onThemeOverride(this.state.themeInd);
        return (overTheme) => {
            const themesAppliedList = propsThemeOverFunc(overTheme);
            this.needComponentUpdate('ThemeSideBar');
            this.setState({ themesAppliedList });
        };
    }


    dataChannelSend(data) {
        if (this.isChannelData || !this.state.isMount) return false;
//        const dataStr = stringify(data);
        this.props.channel.emit(EVENT_ID_DATA, data);
        return true;
    }

    changeTheme(ind) {
        this.needComponentUpdate('ThemeSideBar');
        this.setState({
            muiTheme: createMuiTheme(this.state.themesAppliedList[ind]),
            themeInd: ind,
        });
    }

    openSideBar(f) {
        this.needComponentUpdate('ThemeSideBar');
        this.setState({
            isSideBarOpen: f,
        });
    }

    subState(componentName, prop) {
        return (val) => {
            if (val == undefined) {
                return this.state[prop];
            }
            const subState = {};
            subState[prop] = val;
            this.setState(subState);
            this.needComponentUpdate(componentName);
            return val;
        };
    }

    wouldComponentUpdate(componentName) {
        if (this.UpdateList[componentName] == undefined) {
            this.UpdateList[componentName] = false;
        }
        const upd = this.UpdateList[componentName];
        this.UpdateList[componentName] = false;
        return upd;
    }

    needComponentUpdate(componentName) {
        this.UpdateList[componentName] = true;
    }

    render() {
        const ThemesNameList = this.state.themesAppliedList
            .map((val, ind) => (val.themeName || `Theme ${ind + 1}`));
        const muiTheme = createMuiTheme(
            this.props.themeListRender(this.state.themesAppliedList[this.state.themeInd]),
        );
        // return (<MuiThemeProvider theme={muiTheme}>

        const theme = createMuiTheme({
            palette: createPalette({
                primary: purple, // Purple and green play nicely together.
                accent: {
                ...green,
                A400: '#00e677',
                },
                error: red,
            }),
        });
        return (<MuiThemeProvider theme={theme}>
          <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: muiTheme.palette.canvasColor,
            }}

          >
            <SplitPane
              split="vertical"
              minSize={this.state.isSideBarOpen ? 200 : 0}
              defaultSize={this.state.isSideBarOpen ? 400 : 0}
              primary="second"
              pane1Style={{ overflowX: 'auto', overflowY: 'auto' }}
              pane2Style={{ width: this.state.isSideBarOpen ? 'auto' : 0 }}
              resizerStyle={{
                  cursor: 'col-resize',
                  width: 10,
                  marginRight: -6,
                  zIndex: 1,
              }}
            >
              {/**/}
              <div>
                {this.props.story}
              </div>
              <ThemeSideBar
                shouldComponentUpdate
                shouldShowData={this.state.isMount}
                open={this.state.isSideBarOpen}
                theme={this.state.themesAppliedList[this.state.themeInd]}
                muiTheme={muiTheme}
                themeName={ThemesNameList[this.state.themeInd]}
                fullTheme={this.subState('ThemeSideBar', 'isFullTheme')}
                collapseList={this.subState('ThemeSideBar', 'collapseList')}
                themesOverrideList={this.subState('ThemeSideBar', 'currentThemeOverride')}
                onThemeOverride={this.onThemeOverride()}
              />
            </SplitPane>
          </div>
        </MuiThemeProvider>);
    }
}

MuiTheme.propTypes = propTypes;
