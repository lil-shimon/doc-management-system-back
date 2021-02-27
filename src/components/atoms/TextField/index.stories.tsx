import React from 'react'
import TextFieldBasic from './index'

export default {
    component: 'text-field',
    title: 'text-field'
}

export function defaultStory () {
    return (
        <TextFieldBasic
            id={"input"}
            label={'テキストフィールド'}
            defaultValue={'なし'}
        ></TextFieldBasic>
    )
}