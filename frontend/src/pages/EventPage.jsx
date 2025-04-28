import React, { useState, useEffect } from 'react';
import { Modal, Button, ProgressBar, ListGroup, Alert } from 'react-bootstrap';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import './EventPage.css';

function EventPage({ show, onHide, eventId }) {
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [registrationId, setRegistrationId] = useState(null);

  // Fetch event details and registrations
  const fetchEventData = async () => {
    try {
      const [eventRes, regRes] = await Promise.all([
        axios.get(`http://localhost:3000/events/${eventId}`),
        axios.get(`http://localhost:3000/eventregistrations`)
      ]);
      setEvent(eventRes.data);

      const eventRegistrations = regRes.data.filter(
        reg => reg.event_id === parseInt(eventId)
      );
      setRegistrations(eventRegistrations);

      if (user) {
        const userReg = eventRegistrations.find(
          reg => reg.customer_id === user.customer_id
        );
        setIsUserRegistered(!!userReg);
        setRegistrationId(userReg?.registration_id ?? null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (show && eventId) {
      fetchEventData();
    }
  }, [show, eventId]);

  // Handle registration
  const handleRegister = async () => {
    try {
      await axios.post(`http://localhost:3000/eventregistrations`, {
        eventId: event.event_id,
        userId: user.customer_id
      });

      setRegistrationSuccess(true);
      await fetchEventData(); // refresh everything
    } catch (err) {
      console.error(err);
    }
  };

  // Handle cancellation
  const handleCancelRegistration = async () => {
    if (!registrationId) return;

    try {
      await axios.delete(`http://localhost:3000/eventregistrations/${registrationId}`);

      // Clear local state
      setIsUserRegistered(false);
      setRegistrationId(null);

      await fetchEventData(); // update count, list, and checks if the user is still registered
    } catch (err) {
      console.error("Error canceling registration:", err);
    }
  };

  // Calculate registration percentage
  const registrationPercentage = event?.max_participants
    ? Math.min(100, Math.round((event.current_participants / event.max_participants) * 100))
    : 0;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('hu-HU', options);
  };

  if (!event) {
    return (
      <Modal show={show} onHide={onHide} centered className="event-modal">
        <Modal.Body className="text-center">
          <p>Betöltés...</p>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal show={show} onHide={onHide} centered className="event-modal">
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center event-title">
          {event ? event.event_name : "Betöltés..."}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!event ? (
          <div className="text-center py-4">Betöltés...</div>
        ) : (
          <>
            {registrationSuccess && (
              <Alert variant="success">
                Sikeres jelentkezés az eseményre!
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
          </>
        )}
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