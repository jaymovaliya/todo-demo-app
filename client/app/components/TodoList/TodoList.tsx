import React, { useState } from 'react';
import styles from './todolist.module.css';
import Delete from '@material-ui/icons/Delete';
import DeleteConfirmationModal from '../DeleteConfirmation/DeleteConfirmation';
import UpdateTodo from '../UpdateTodo/UpdateTodo';

interface Todo {
  _id: string;
  title: string;
  status: string;
  description: string;
}

interface TodoListProps {
  todos: Todo[];
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, values: any) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, deleteTodo, updateTodo }) => {
    const [confirmation, showConfirmation] = useState<boolean>(false);
    const [editModal, showEditModal] = useState<boolean>(false);
    const [deletingTodo, setDeletingTodo] = useState<string>('');
    const [selectedTodo, setSelectedTodo] = useState<string>('');

    const handleDeleteTodo = (e: React.SyntheticEvent, id: string) => {
        e.stopPropagation();
        setDeletingTodo(id);
        showConfirmation(true);
    }

    const cancelDelete = () => {
        setDeletingTodo('');
        showConfirmation(false);
    }

    const deleteConfirm = () => {
        deleteTodo(deletingTodo);
        showConfirmation(false);
    }

    const openTodo = (id: string) => {
        setSelectedTodo(id);
        showEditModal(true);
    }

    const cancelUpdateTodo = () => {
        setSelectedTodo('');
        showEditModal(false);
    }

    const updateConfirm = (values: any) => {
        updateTodo(selectedTodo, values);
        setSelectedTodo('');
        showEditModal(false);
    }

    return (
        <div className={styles.todoContainer}>
            {todos.map(todo => (
                <div key={todo._id} className={styles.todoCard} onClick={() => openTodo(todo._id)}>
                    <div className={styles.deleteContainer}>
                        <h3 className={styles.todoTitle}>{todo.title}</h3>
                        <div onClick={(e) => handleDeleteTodo(e, todo._id)}><Delete/></div>
                    </div>
                    <p className={styles.todoStatus}>Status: {todo.status}</p>
                    <p className={styles.todoDescription}>{todo.description}</p>
                </div>
            ))}
            {
                confirmation && <DeleteConfirmationModal onCancel={cancelDelete} onConfirm={deleteConfirm} />
            }
            {
                editModal && <UpdateTodo todoId={selectedTodo} onClose={cancelUpdateTodo} onSubmit={updateConfirm}/>
            }
        </div>
    );
};

export default TodoList;
