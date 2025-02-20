import React, { useState, useEffect } from 'react';

const Calendar = () => {
    const data = [
        {
            "date": "2020-01-01",
            "events": [
                { "name": "Meeting with Ivan", "time": "2020-01-01 09:28:13 +0530", "duration_minutes": 15, "accepted": false },
                { "name": "Team Standup", "time": "2020-01-01 10:00:00 +0530", "duration_minutes": 45, "accepted": false }
            ]
        },
        {
            "date": "2020-01-02",
            "events": [
                { "name": "Meeting with David", "time": "2020-01-02 09:56:36 +0530", "duration_minutes": 45, "accepted": false },
                { "name": "Team Standup", "time": "2020-01-02 10:00:00 +0530", "duration_minutes": 120, "accepted": false }
            ]
        },
        {
            "date": "2020-01-03",
            "events": [
                { "name": "Project Review", "time": "2020-01-03 11:00:00 +0530", "duration_minutes": 60, "accepted": true },
                { "name": "Lunch with Client", "time": "2020-01-03 13:00:00 +0530", "duration_minutes": 90, "accepted": false }
            ]
        },
        {
            "date": "2020-01-04",
            "events": [
                { "name": "Sprint Planning", "time": "2020-01-04 10:30:00 +0530", "duration_minutes": 120, "accepted": true },
                { "name": "Code Review", "time": "2020-01-04 15:00:00 +0530", "duration_minutes": 60, "accepted": false }
            ]
        }
    ];

    const [events, setEvents] = useState(data);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const openModal = (event) => {
        setSelectedEvent(event);
    };

    const closeModal = () => {
        setSelectedEvent(null);
    };

    const generateCalendar = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = 7;
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        const days = [];
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="day"></div>);
        }
        
        for (let i = 1; i <= daysInMonth; i++) {
            const dayEvents = events
                .filter(event => new Date(event.date).getDate() === i)
                .flatMap(eventDay => eventDay.events.map(event => ({ ...event, date: eventDay.date })))
                .sort((a, b) => new Date(a.time) - new Date(b.time));

            days.push(
                <div key={i} className="day">
                    <strong>{i}</strong>
                    {dayEvents.length > 0 && (
                        <div 
                            className={dayEvents[0].time === 'all_day' ? "event all-day-event" : "event"}
                            onClick={() => openModal(dayEvents[0])}
                        >
                            {dayEvents[0].time === 'all_day' ? dayEvents[0].name : `${dayEvents[0].name} (${dayEvents[0].time.split(' ')[1]})`}
                        </div>
                    )}
                </div>
            );
        }
        return days;
    };

    return (
        <div>
            <div className='main_container'>Calendar</div>
            <div className="calendar">{generateCalendar()}</div>
            {selectedEvent && (
                <div className="modal">
                    <span className="close-button" onClick={closeModal}>&times;</span>
                    <h3>{selectedEvent.name}</h3>
                    <p>Time: {selectedEvent.time === 'all_day' ? 'All Day' : selectedEvent.time}</p>
                    <p>Duration: {selectedEvent.duration_minutes === 'all_day' ? 'All Day' : `${selectedEvent.duration_minutes} min`}</p>
                    <p>Status: {selectedEvent.accepted ? 'Accepted' : 'Not Accepted'}</p>
                </div>
            )}
        </div>
    );
};

export default Calendar;
