import { useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';

function WeightModal() {
  const [weight, setWeight] = useState('');
  const [showModal, setShowModal] = useState(true);

  const handleSaveChanges = () => {
    // Save the weight and show the WeightedModal
    setShowModal(false);
  };

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}>
      {showModal ? (
        <Modal.Dialog>
          <Modal.Header closeButton>
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
        <Modal.Header closeButton>
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
