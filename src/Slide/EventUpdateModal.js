import axios from "axios";
import { useState } from "react";
import { Modal } from 'react-bootstrap';
import './SlideTemplate.css';
import moment from "moment-timezone";
import { useEffect } from "react";
import ColorPicker from "./ColorPicker";
import { MdCalendarToday } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";

function EventUpdateModal(props) {

    const [details, setDetails] = useState([]);
    const [eventName, setEventName] = useState('');
    const [eventColor, setEventColor] = useState('');
    const [startDate, setStartDate] = useState(moment.tz(new Date(), 'Asia/Seoul').format("YYYY-MM-DDTHH:mm"));
    const [endDate, setEndDate] = useState(moment.tz(new Date(), 'Asia/Seoul').format("YYYY-MM-DDTHH:mm"));
    const [allDay, setAllDay] = useState(false);
    const [eventId, setEventId] = useState(0);

    useEffect(() => {
        //클릭한 이벤트 정보의 eventId를 props값으로 받아와 데이터 불러오기
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/ondayschedule/eventdetail/${props.eventId}`)
            .then(response => {
                setEventName(response.data[0].eventName);
                setEventColor(response.data[0].eventColor);
                setStartDate(moment.tz(response.data[0].startDate, 'Asia/Seoul').format("YYYY-MM-DDTHH:mm"));
                setEndDate(moment.tz(response.data[0].endDate, 'Asia/Seoul').format("YYYY-MM-DDTHH:mm"));
                setAllDay(response.data[0].allDay);
            })
            .catch(error => console.log(error));
    }, []);

    const handleUpdateEvent = () => {
        //날짜 포맷
        const isoStartDate = moment.tz(startDate, 'Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
        const isoEndDate = moment.tz(endDate, 'Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
        
        //필요한 필드값을 상태변수로 받아와 서버에 전달
        axios.put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/ondayschedule/eventupdate/${props.eventId}`, {
            eventName: eventName,
            startDate: isoStartDate,
            endDate: isoEndDate,
            eventColor: props.eventColor,
            allDay: allDay
        })
            .then(response => {
                // 응답 데이터를 처리하여 state를 업데이트합니다.
                setDetails([response.data]);
                alert("일정이 변경되었습니다.");
                window.location.replace("/");
            })
            .catch(error => {
                console.log(error)
                alert("수정에 실패했습니다.");
            });
    }

    const handleDeleteEvent = (eventId) => {
        // 클릭한 이벤트 정보의 eventId를 props값으로 받아와 데이터 변경
        axios.put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/ondayschedule/eventdelete/${props.eventId}`)
            .then(()=> {
                alert('일정이 삭제되었습니다.');
                window.location.replace("/");
                setDetails(details.filter(event => event.eventId !== eventId));
            })
            .catch(error => {
                alert(`삭제에 실패했습니다. (${error.message})`);
                return;
            });
    };


    return (
        <Modal show={props.showModalUpdate} onHide={props.handleModalEventToggle} backdrop="static">
            <AiOutlineClose className='close' variant="secondary" onClick={props.handleModalEventToggle} />
 
            <form className='modalContent' >
                <div className="eventNameBox">
                    <div className="colorPicker">
                        <ColorPicker eventColor={props.eventColor} setEventColor={props.setEventColor} />
                    </div>
                    <input type="text" className="eventName" id="eventName" value={eventName} onChange={(e) => setEventName(e.target.value)}></input>
                </div>

                <div className='DatetimeBox'>
                    <div className='dateImg'><p><MdCalendarToday /></p></div>
                    <div className="Datetime">
                        <label id="dateSelect" htmlFor="eventStartDate">
                            <input type="datetime-local" id="eventStartDate" value={moment(startDate).format("YYYY-MM-DDTHH:mm")} onChange={(e) => setStartDate(moment.tz(new Date(e.target.value), 'Asia/Seoul'))} />
                        </label>
                        <div className='cn'>~</div>
                        <label htmlFor="eventEndDate">
                            {allDay ? (
                                <><input type="datetime-local" id="eventEndDate" value={moment(startDate).format("YYYY-MM-DDT23:59")} readOnly /><br /></>)
                                : <><input type="datetime-local" id="eventEndDate" value={moment(endDate).format("YYYY-MM-DDTHH:mm")} onChange={(e) => setEndDate(e.target.value)} /><br /></>
                            }
                        </label>
                    </div>
                </div>

                <div className="allDay">
                    <div className='allDayImg'><IoMdTime /></div>
                    <div className='allDayName'>
                        <label className="form-check-label" htmlFor="allDay">하루종일</label>
                        <input type="checkbox" className="form-check-input" id="allDay" checked={allDay} onChange={(e) => setAllDay(e.target.checked)} />
                    </div>
                </div>

                <div className="udbutton">
                    <button id='okbutton' onClick={handleUpdateEvent}>수정</button>
                    <button id='debutton' onClick={() => handleDeleteEvent(eventId)}>삭제</button>
                </div>
            </form>
        </Modal >

    )
}

export default EventUpdateModal;