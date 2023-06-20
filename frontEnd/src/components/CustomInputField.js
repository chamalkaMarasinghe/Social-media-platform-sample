import React from 'react'
import './CustomInputField.css'

function CustomInputField(props) {
    return (
        <React.Fragment>
            <input id='customInputField' type={props.type} name={props.name} placeholder={props.placeholder} onChange={props.onchangeMethod}></input>
        </React.Fragment>
    )
}

export default CustomInputField