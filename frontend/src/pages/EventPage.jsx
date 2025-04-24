import React, { useState, useEffect } from 'react';
import { Modal, Button, ProgressBar, ListGroup, Alert } from 'react-bootstrap';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import './EventPage.css';

function EventPage({ show, onHide, eventId }) {
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [registrationId, setRegistrationId] = useState(null);

  // Fetch event details and registrations
  useEffect(() => {
    if (!eventId || !show) return;

    const fetchEventData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch event details
        const eventResponse = await axios.get(`http://localhost:3000/events/${eventId}`);
        setEvent(eventResponse.data);
        
        // Fetch registrations for this event
        const registrationsResponse = await axios.get(`http://localhost:3000/eventregistrations/`);
        const eventRegistrations = registrationsResponse.data.filter(reg => reg.event_id === parseInt(eventId));
        setRegistrations(eventRegistrations);
        
        // Check if current user is registered
        if (user) {
          const userRegistration = eventRegistrations.find(reg => reg.customer_id === user.customer_id);
          setIsUserRegistered(!!userRegistration);
          if (userRegistration) {
            setRegistrationId(userRegistration.registration_id);
          }
        }
      } catch (err) {
        console.error("Error fetching event data:", err);
        setError("Nem sikerült betölteni az esemény adatait.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [eventId, show, user]);

  // Handle registration
  const handleRegister = async () => {
    if (!user || !event) return;
    
    try {
      const response = await axios.post('http://localhost:3000/eventregistrations/', {
        event_id: event.event_id,
        customer_id: user.customer_id
      });
      
      // Update UI with new registration
      const newRegistration = {
        registration_id: response.data.registration_id,
        event_id: event.event_id,
        customer_id: user.customer_id,
        customer_name: user.name,
        registration_date: new Date().toISOString()
      };
      
      setRegistrations(event => [...event, newRegistration]);
      setIsUserRegistered(true);
      setRegistrationId(newRegistration.registration_id);
      setRegistrationSuccess(true);
      setRegistrationError(null);
      
      // Update event count
      setEvent({
        ...event,
        current_participants: (event.current_participants) + 1
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setRegistrationSuccess(false);
      }, 3000);
      
    } catch (err) {
      console.error("Registration error:", err);
      setRegistrationError("Hiba történt a jelentkezés során. Kérjük, próbálja újra később.");
    }
  };

  // Handle cancellation
  const handleCancelRegistration = async () => {
    if (!registrationId) return;
    
    try {
      await axios.delete(`http://localhost:3000/eventregistrations/${registrationId}`);
      
      // Update UI
      setRegistrations(event => event.filter(reg => reg.registration_id !== registrationId));
      setIsUserRegistered(false);
      setRegistrationId(null);
      
      // Update event count
      setEvent( event => ({
        ...event,
        current_participants: (event.current_participants || 0) - 1
      }));
      
    } catch (err) {
      console.error("Error canceling registration:", err);
      if (typeof setRegistrationError === "function") {
        setRegistrationError("Hiba történt a jelentkezés visszavonása során.");
      }

    }
  };

  if (loading) {
    return (
      <Modal show={show} onHide={onHide} centered className="event-modal">
        <Modal.Header closeButton>
          <Modal.Title>Esemény betöltése...</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center p-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Betöltés...</span>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  if (error || !event) {
    return (
      <Modal show={show} onHide={onHide} centered className="event-modal">
        <Modal.Header closeButton>
          <Modal.Title>Hiba</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="danger">
            {error || "Az esemény nem található."}
          </Alert>
        </Modal.Body>
      </Modal>
    );
  }

  // Calculate registration percentage
  const registrationPercentage = event.max_participants 
    ? Math.min(100, Math.round((event.current_participants / event.max_participants) * 100))
    : 0;

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('hu-HU', options);
  };

  return (
    <Modal show={show} onHide={onHide} centered className="event-modal">
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center event-title">{event.event_name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {registrationSuccess && (
          <Alert variant="success">
            Sikeres jelentkezés az eseményre!
          </Alert>
        )}
        {registrationError && (
          <Alert variant="danger">
            {registrationError}
          </Alert>
        )}
        
        <div className="event-details">
          <p className="event-date"><strong>Időpont:</strong> {formatDate(event.event_date)}</p>
          <p className="event-description">{event.event_description}</p>
          
          <div className="registration-status">
            <div className="d-flex justify-content-between mb-1">
              <span>Jelentkezettek száma:</span>
              <span>{event.current_participants} / {event.max_participants}</span>
            </div>
            <ProgressBar 
              now={registrationPercentage} 
              variant={registrationPercentage > 75 ? 'danger' : registrationPercentage > 50 ? 'warning' : 'success'} 
              className="mb-3"
            />
          </div>
          
          {user ? (
            isUserRegistered ? (
              <Button 
                variant="danger" 
                className="w-100 mb-4" 
                onClick={handleCancelRegistration}
              >
                Jelentkezés visszavonása
              </Button>
            ) : (
              <Button 
                variant="primary" 
                className="w-100 mb-4" 
                onClick={handleRegister}
                disabled={event.current_participants >= event.max_participants}
              >
                {event.current_participants >= event.max_participants 
                  ? 'Betelt létszám' 
                  : 'Jelentkezés'}
              </Button>
            )
          ) : (
            <Alert variant="info" className="mb-4">
              Jelentkezéshez kérjük, jelentkezzen be!
            </Alert>
          )}
          
          <div className="participants-section">
            <h5>Jelentkezés:</h5>
            {registrations.length > 0 ? (
              <ListGroup className="registration-list">
                {registrations.map((registration, index) => (
                  <ListGroup.Item key={registration.registration_id ?? `${registration.customer_id}-${registration.event_id}-${index}`}
                   className="registration-item">
                    <div className="registration-number">#{index + 1}</div>
                    <div className="registration-name">{registration.customer_name}</div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <p className="text-muted text-center">Még nincs jelentkező az eseményre.</p>
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Bezárás
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EventPage;
