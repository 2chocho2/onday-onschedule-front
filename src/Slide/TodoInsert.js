// https://react-icons.github.io/react-icons/icons?name=md
import { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.css';
import axios from 'axios';

function TodoInsert () {
    const [todoName, setTodoName] = useState('');			
    const handlerChange = e => setTodoName(e.target.value);
    const handlerSubmit = e => {
        e.preventDefault();			
        setTodoName('');
        // todo 작성
        axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/ondayschedule/inserttodo`,{todoName})
        .then(response => {
            console.log(response);
            alert(`새로운 todo가 등록되었습니다.`);
            window.location.replace(`/`);
        })
        .catch(error => {
            console.log(error);
            alert(`todo 등록에 실패했습니다. (${error.message})`);
            return;
        })
    };

    return (
        <form className="TodoInsert" onSubmit={handlerSubmit}>
            <input type="text" placeholder="Add TODO" value={todoName} onChange={handlerChange} required/>
            <button className='todosubmit' type="submit"><MdAdd className='todosubmitBtn'/></button>
        </form>
    );
};

export default TodoInsert;
