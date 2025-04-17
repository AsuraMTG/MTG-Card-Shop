import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Calendar.css';
import Navbar from '../Components/Navbar';

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/events");
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get day of week for first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Function to generate calendar days
  const generateCalendarDays = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Add empty spaces for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      // Filter events for this specific day
      const dayEvents = events.filter(event => {
        const eventDate = new Date(event.event_date);
        return eventDate.getDate() === day && 
               eventDate.getMonth() === month && 
               eventDate.getFullYear() === year;
      });
      
      days.push(
        <div key={`day-${day}`} className="calendar-day">
          <div className="day-number">{day}</div>
          <div className="day-events">
            {dayEvents.map(event => (
              <div key={event.event_id} className="event-item">
                {event.event_name}
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    return days;
  };

  // Navigate to previous month
  const prevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  // Navigate to today
  const goToToday = () => {
    setDate(new Date());
  };

  // Format month and year for display
  const formatMonthYear = () => {
    const months = [
      "Január", "Február", "Március", "Április", "Május", "Június",
      "Július", "Augusztus", "Szeptember", "Október", "November", "December"
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <div className="calendar-page">
      <Navbar />
      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={prevMonth} className="nav-button">&lt;</button>
          <div className="month-year">{formatMonthYear()}</div>
          <button onClick={nextMonth} className="nav-button">&gt;</button>
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
      </div>
    </div>
  );
};

export default Calendar;