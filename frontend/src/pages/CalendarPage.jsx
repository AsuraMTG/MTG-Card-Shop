import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import EventPage from './EventPage';
import './Calendar.css';

function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [highlightToday, setHighlightToday] = useState(false);


  // Fetch events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/events');
        setEvents(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again later.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);



  // Functions to navigate between months
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setHighlightToday(true);
  
    setTimeout(() => {
      setHighlightToday(false);
    }, 3000);
  };



  // Open event modal
  const handleEventClick = (eventId) => {
    setSelectedEventId(eventId);
    setShowModal(true);
  };

  // Close event modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Get events for a specific day
  const getEventsForDay = (day) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = new Date(year, month, day);
    
    return events.filter(event => {
      const eventDate = new Date(event.event_date);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Highlight today button briefly
  useEffect(() => {
  const todayButton = document.querySelector('.today-button');
  if (!todayButton) return;

  todayButton.classList.add('highlighted');
  const timeout = setTimeout(() => {
    todayButton.classList.remove('highlighted');
  }, 3000);

  return () => clearTimeout(timeout);
  }, [currentDate]);


  // Format month and year for display
  const formatMonthYear = (date) => {
    return date.toLocaleDateString('hu-HU', { year: 'numeric', month: 'long' });
  };
    /*const formatMonthYear = () => {
  const months = [
    "Január", "Február", "Március", "Április", "Május", "Június",
    "Július", "Augusztus", "Szeptember", "Október", "November", "December"
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };*/
    
  
  // Get days in month, and first day of month
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (date) => {
    const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return (day + 6) % 7;
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = [];

    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="calendar-day empty"></div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === new Date().getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear();
  
      const dayEvents = getEventsForDay(day);
  
      days.push(
        <div
          key={`day-${day}`}
          className={`calendar-day${isToday && highlightToday ? ' highlight-today' : ''}`}
        >
          <div className="day-number">{day}</div>
          <div className="day-events">
            {dayEvents.map(event => (
              <div
                key={event.event_id}
                className="event-item"
                onClick={() => handleEventClick(event.event_id)}
              >
                {event.event_name}
              </div>
            ))}
          </div>
        </div>
      );
    }
  
    return days;
  };
  return (
    <>
      <Container className="calendar-container">
        <div className="calendar-header">
          <button onClick={prevMonth} className="calendar-nav-button">&lt;</button>
          <div className="month-year">{formatMonthYear(currentDate)}</div>
          <button onClick={nextMonth} className="calendar-nav-button">&gt;</button>
        </div>
        
        <button onClick={goToToday} className="today-button">Mai nap</button>
        
        <div className="calendar-weekdays">
          <div className="weekday">H</div>
          <div className="weekday">K</div>
          <div className="weekday">SZ</div>
          <div className="weekday">CS</div>
          <div className="weekday">P</div>
          <div className="weekday">SZ</div>
          <div className="weekday">V</div>
        </div>
        
        {loading ? (
          <div className="loading-state">Loading events...</div>
        ) : error ? (
          <div className="error-state">{error}</div>
        ) : (
          <div className="calendar-days">
            {generateCalendarDays()}
          </div>
        )}
      </Container>
      {/* Event Modal */}
      <EventPage 
        show={showModal} 
        onHide={handleCloseModal} 
        eventId={selectedEventId} 
      />
    </>
  );
};

export default CalendarPage;
