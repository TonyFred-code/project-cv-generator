import { useEffect, useRef } from 'react';

function Modal({ isOpen, onClose, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog className='under-dev-dialog' ref={dialogRef}>
      <div className='dialog-content container d-flex__col gap_2r justify-content__center align-items__center'>
        {children}
        <div className='btn-group d-flex__row'>
          <button type='button' className='btn close-dialog' onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default Modal;
