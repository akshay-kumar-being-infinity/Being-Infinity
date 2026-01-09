import React, { useState } from "react";
import { BasePlatformVerifier } from "../BasePlatformVerifier";
import { Modal } from "../../ui/Modal";
import { Button } from "../../ui/Button";

interface LinkedInVerifierProps {
  value: string;
  onChange: (val: string) => void;
}

export const LinkedInVerifier: React.FC<LinkedInVerifierProps> = ({ value, onChange }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const executeVerifyLogic = async () => {
    setIsVerifying(true);
    // TODO: Call linkedIn specific backend Crawler
    setTimeout(() => {
      setIsVerifying(false);
      setShowModal(false);
      setIsVerified(true);
    }, 1500);
  };

  return (
    <>
      <BasePlatformVerifier
        platformName="LinkedIn"
        iconColorClass="text-blue-600"
        loginUrl="https://www.linkedin.com/login"
        value={value}
        onChange={(val) => { setIsVerified(false); onChange(val); }}
        onVerify={() => setShowModal(true)}
        isVerified={isVerified}
        isVerifying={isVerifying}
        placeholder="Enter LinkedIn username"
        labelSuffix="Profile"
      />
      
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Verify LinkedIn Profile">
        <div className="space-y-4">
          <p className="text-text-muted">
             LinkedIn verification details will appear here, <strong>{value}</strong>.
          </p>
          <div className="flex justify-end gap-3 pt-2">
             <Button variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
             <Button onClick={executeVerifyLogic} isLoading={isVerifying}>Verify</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};