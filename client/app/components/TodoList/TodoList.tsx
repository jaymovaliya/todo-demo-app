import React, { useState } from 'react';
import styles from './todolist.module.css';
import Delete from '@material-ui/icons/Delete';
import DeleteConfirmationModal from '../DeleteConfirmation/DeleteConfirmation';

interface Todo {
  _id: string;
  title: string;
  status: string;
  description: string;
}

interface TodoListProps {
  todos: Todo[];
  deleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, deleteTodo }) => {
    const [confirmation, showConfirmation] = useState<boolean>(false);
    const [deletingTodo, setDeletingTodo] = useState<string>('');

    const handleDeleteTodo = (id: string) => {
        setDeletingTodo(id);
        showConfirmation(true);
    }

    const deleteConfirm = () => {
        deleteTodo(deletingTodo);
        showConfirmation(false);
    }

    return (
        <div className={styles.todoContainer}>
            {todos.map(todo => (
                <div key={todo._id} className={styles.todoCard}>
                    <div className={styles.deleteContainer}>
                        <h3 className={styles.todoTitle}>{todo.title}</h3>
                        <div onClick={() => handleDeleteTodo(todo._id)}><Delete/></div>
                    </div>
                    <p className={styles.todoStatus}>Status: {todo.status}</p>
                    <p className={styles.todoDescription}>{todo.description}</p>
                </div>
            ))}
            {
                confirmation && <DeleteConfirmationModal onCancel={() => showConfirmation(false)} onConfirm={deleteConfirm} />
            }
        </div>
    );
};

export default TodoList;
