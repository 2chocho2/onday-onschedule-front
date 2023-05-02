import { useState } from 'react';
import './SlideTemplate.css';
import EventInsertModal from './EventInsertModal';
import moment from 'moment';
import { AiOutlinePlus } from 'react-icons/ai';

function EventInsert() {
  const [showModal, setShowModal] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventColor, setEventColor] = useState('#03a9f4');
  const [startDate, setStartDate] = useState(moment.tz(new Date(), 'Asia/Seoul').format("YYYY-MM-DDTHH:mm"));
  const [endDate, setEndDate] = useState(moment.tz(new Date(), 'Asia/Seoul').format("YYYY-MM-DDTHH:mm"));
  const [allDay, setAllDay] = useState(false);

  const handleModalToggle = () => {
    setShowModal(prev => !prev);
    setEventColor('#03a9f4');
  };

  const handleAddEvent = () => {
    setShowModal(true);
  };


  return (
    <>
        <form className="Event-title" onClick={handleAddEvent}>
         <p>일정 추가</p>  
         <div className='plus'><AiOutlinePlus /></div>
         </form>
         {showModal && (
          <EventInsertModal
            showModal={showModal} setShowModal={setShowModal}
            eventName={eventName} setEventName={setEventName}
            eventColor={eventColor} setEventColor={setEventColor}
            startDate={startDate} setStartDate={setStartDate}
            endDate={endDate} setEndDate={setEndDate}
            allDay={allDay} setAllDay={setAllDay}
            handleModalToggle={handleModalToggle}
          />
        )}    
      </>
  )
}

export default EventInsert;