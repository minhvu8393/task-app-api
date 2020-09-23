import React from 'react';

const Logout = function(props) {
    return (
        <div className='logout'>
            <h3 className="logout__user">{props.user}</h3>
            <button className="logout__button" onClick={() => {
                props.handleLogout();
            }}>Logout</button>
        </div>
    )
}

export default Logout;