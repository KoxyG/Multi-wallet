import React, { useState } from 'react';
import './SignMessageModal.css';

interface SignMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSign: (message: string) => Promise<void>;
  defaultMessage?: string;
}

const SignMessageModal: React.FC<SignMessageModalProps> = ({
  isOpen,
  onClose,
  onSign,
  defaultMessage = "Sign this message to verify your wallet ownership"
}) => {
  const [message, setMessage] = useState<string>(defaultMessage);
  const [isSigning, setIsSigning] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSign = async () => {
    try {
      setIsSigning(true);
      await onSign(message);
      onClose();
    } catch (error) {
      console.error('Error signing message:', error);
    } finally {
      setIsSigning(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Sign Message</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <p>Please review and sign the following message:</p>
          <textarea
            className="message-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
          />
          <div className="modal-footer">
            <button 
              className="cancel-button" 
              onClick={onClose}
              disabled={isSigning}
            >
              Cancel
            </button>
            <button 
              className="sign-button" 
              onClick={handleSign}
              disabled={isSigning || !message.trim()}
            >
              {isSigning ? 'Signing...' : 'Sign Message'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignMessageModal; 