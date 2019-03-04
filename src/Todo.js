import React from "react";

const Todo = ( props ) => {
   
    return (
        <div>
            <input className="Checkbox" onChange={() => props.click()} type="checkbox" checked={ props.data.check } />
            <span 
                className={props.data.check ? 'Marker' : ''}
            >
                {props.data.content}
            </span>
        </div>
    )
}

export default Todo