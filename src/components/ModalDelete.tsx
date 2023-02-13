import React from "react";
import { Modal, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';

type DeleteModalProps = {
    show: boolean;
    onDeleteClick: () => void;
    toggle: () => void;
    title: string;
    message: string;
}

function DeleteModal({
    show,
    onDeleteClick,
    toggle,
    title,
    message,
}: DeleteModalProps) {
    return (
        <Modal isOpen={show} toggle={toggle} centered>
            <ModalBody>
                <div className="modal-content__info">
                    <span className="content-info__icon">
                        <FontAwesomeIcon icon={faExclamation} />
                    </span>
                    <h3 className="content-info__title">{title}</h3>
                    <p className="content-info__description">{message}</p>
                </div>
                <div className="modal-content__footer">
                    <button type="button" className="btn modal-btn-cancel" onClick={toggle}>Cancelar</button>
                    <button type="button" className="btn modal-btn-confirm" onClick={onDeleteClick}>Excluir</button>
                </div>
            </ModalBody>
        </Modal>
    );
}

export default DeleteModal;