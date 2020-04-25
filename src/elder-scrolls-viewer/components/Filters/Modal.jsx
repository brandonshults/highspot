import React, { useCallback } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';
import XIcon from '../../../icons/XIcon';

function Modal({
  isOpen, setIsOpen, children, ariaLabel,
}) {
  const handleClose = useCallback((e) => {
    e.stopPropagation();
    setIsOpen(false);
  }, [setIsOpen]);

  return !isOpen
    ? null
    : createPortal((
      <div className="Modal" role="dialog" aria-label={ariaLabel}>
        <button type="button" className="backdrop" onClick={handleClose} />
        <div className="content">
          {children}
          <button className="close-button" type="button" onClick={handleClose}>
            <XIcon />
          </button>
        </div>
      </div>
    ),
    document.body);
}


export default Modal;
