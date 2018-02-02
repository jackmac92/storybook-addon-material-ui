import React from 'react';
import addons from '@storybook/addons';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { EVENT_ID_INIT } from './';
import currentTheme from './theme';

const previewStyle = color => ({
    backgroundColor: color,
    width: '100%',
    height: '100%',
    minHeight: 600,
});

export function muiTheme(...themes) {
    const theme = themes[0];

    const backgroundColor =
        currentTheme.palette.type === 'dark' ? 'rgb(50,50,50)' : 'white';
    return (storyFn, context) => (
        <div style={previewStyle(backgroundColor)}>
            <MuiThemeProvider theme={currentTheme}>
                {storyFn(context)}
            </MuiThemeProvider>
        </div>
    );
}
