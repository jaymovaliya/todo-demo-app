// components/Header.tsx

import React from 'react';
import styles from './todoheader.module.css';
import ExitToApp from '@material-ui/icons/ExitToApp';

interface HeaderProps {
    activeFilter: string;
    onClickCreateTodo: () => void;
    onClickLogout: () => void;
    filterTodos: (status: string) => void;
}

const Header: React.FC<HeaderProps> = ({
    activeFilter,
    filterTodos,
    onClickCreateTodo,
    onClickLogout
}) => {
    return (
        <div>
            <div className={styles.header}>
                <h1>Todo List</h1>
                <div className={styles.actionHeader}>
                    <button className={styles.createTodoButton} onClick={onClickCreateTodo}>Create New Todo</button>
                    <div className={styles.logoutBtn} onClick={onClickLogout}>
                        <ExitToApp/>
                    </div>
                </div>
            </div>
            <div className={styles.filters}>
            <button className={`${styles.filterButton} ${activeFilter === 'all' ? styles.active : ''}`} onClick={() => filterTodos('all')}>All</button>
                <button className={`${styles.filterButton} ${activeFilter === 'Not Started' ? styles.active : ''}`} onClick={() => filterTodos('Not Started')}>Todo</button>
                <button className={`${styles.filterButton} ${activeFilter === 'In Progress' ? styles.active : ''}`} onClick={() => filterTodos('In Progress')}>In Progress</button>
                <button className={`${styles.filterButton} ${activeFilter === 'Completed' ? styles.active : ''}`} onClick={() => filterTodos('Completed')}>Done</button>
            </div>
        </div>
    );
};

export default Header;
