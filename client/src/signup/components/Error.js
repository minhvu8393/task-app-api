import React from 'react';

const Error = function(props) {
    return (
        <div>
            {props.error && 
                <div className="error">
                    <p className="error__text">{props.error}</p>
                </div>
            }
        </div>
    )
}

export default Error;