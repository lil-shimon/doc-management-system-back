import React from 'react'
import AppSideBar from './index'
import {action} from '@storybook/addon-actions'

export default {
    component: "AppSideBar",
    title: "AppSideBar"
}

export function defaultStory() {
    return(
        <AppSideBar 
        sideBarOpened={false}
        sideBarWidth={240}
        onSideBarClose={action('clicked')}
        ></AppSideBar>
        )
    }
