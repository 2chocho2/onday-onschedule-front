import Title from '../Title/Title';
import EventInsert from './EventInsert';
import './SlideTemplate.css';
import TodoInsert from './TodoInsert';
import TodoList from './TodoList';
import EventList from './EventList';

function SlideTemplate() {

    return (
        <>
            <div className='top'>
                <Title />
            </div>
            <div className="Slide">
                <div className='Event'>
                    <EventInsert />
                    <div className="EventList">
                        <EventList />
                    </div>
                </div>
                <div className='Todo'>
                    <div className="todo-title"><p>TODO</p></div>
                    <div className='todoInsert'>
                        <TodoInsert />
                    </div>
                    <div className='todoList'>
                        <TodoList />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SlideTemplate;