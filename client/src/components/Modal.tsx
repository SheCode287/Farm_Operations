
import { ModalProps } from "../types";

const Modal = ({ name, children, closeModal , className}:ModalProps) => {
  return (
    <div className="modal_overlay">
      <div className={`modal_container ${className}`} >
        <div className="modal_header">
          <h2>{name}</h2>
          <p onClick={closeModal}>X</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
