import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
    return ReactDOM.createPortal(
        <div onClick={props.hideModal} className={`modal ${props.class}`}>
            <div onClick={(e)=>e.stopPropagation()} className="modal__container">
                {props.children}
            </div>
        </div>,
        document.querySelector("#modal")
    )
};

export default Modal;