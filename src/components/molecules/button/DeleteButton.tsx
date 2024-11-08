import React from 'react';
import { FaTrash } from 'react-icons/fa';

interface DeleteButtonProps {
    onClick: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
    return (
        <a className="delete-btn" onClick={onClick}>
            <FaTrash />
        </a>
    );
};

export default DeleteButton;
