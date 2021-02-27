import React from 'react'
import Component from './index'
const base = require('paths.macro')

export default {
  title: base.slice(0, -1),
  includeStories: /.*Story$/
}

export const defaultStory = () => <Component />