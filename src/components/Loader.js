import React from 'react'


const Loader = () => {
    return (
        <div className="text-center">
            <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}
 
export default Loader;