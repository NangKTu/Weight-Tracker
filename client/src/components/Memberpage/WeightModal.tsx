import { useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { useCheckinContext } from './CheckinContext';

function WeightModal() {
  const [weight, setWeight] = useState('');
  const [showModal, setShowModal] = useState(true);
  const { triggerRefresh } = useCheckinContext();

  const handleSaveChanges = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error('Token not found in sessionStorage.');
        return;
      }
      const response = await fetch('/api/user-weight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ weight }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      triggerRefresh();
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}>
      {showModal ? (
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Please Enter Your Weight</Modal.Title>
          </Modal.Header>

          <InputGroup>
            <Form.Control
              aria-label="Weight amount"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <InputGroup.Text>lbs</InputGroup.Text>
          </InputGroup>

          <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      ) : null}

      {showModal === false && <WeightedModal weight={weight} />}
    </div>
  );
}

function WeightedModal({ weight }) {
  const currentDate = new Date().toLocaleDateString();

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Your weight is</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{weight} lbs</p>
        </Modal.Body>

        <Modal.Footer>
          <p>as of {currentDate}</p>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default WeightModal;
