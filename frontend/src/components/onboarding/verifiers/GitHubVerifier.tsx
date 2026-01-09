import React, { useState } from "react";
import { BasePlatformVerifier } from "../BasePlatformVerifier";
import { Modal } from "../../ui/Modal";
import { Button } from "../../ui/Button";
import { config } from '../../../config';

interface GitHubVerifierProps {
  value: string;
  onChange: (val: string) => void;
}

export const GitHubVerifier: React.FC<GitHubVerifierProps> = ({ value, onChange }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const executeVerifyLogic = async () => {
    setIsVerifying(true);
    // TODO: Call github specific backend Crawler
    setTimeout(() => {
      setIsVerifying(false);
      setShowModal(false);
      setIsVerified(true);
    }, 1500);
  };

  return (
    <>
      <BasePlatformVerifier
        platformName="GitHub"
        iconColorClass="text-gray-400"
        loginUrl={`${config.platforms.githubUrl}/login`}
        value={value}
        onChange={(val) => { setIsVerified(false); onChange(val); }}
        onVerify={() => setShowModal(true)}
        isVerified={isVerified}
        isVerifying={isVerifying}
        placeholder="Enter GitHub username"
        labelSuffix="Profile"
      />
      
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Verify GitHub Profile">
        <div className="space-y-4">
          <p className="text-text-muted">
             github verification details will appear here, <strong>{value}</strong>
          </p>
          <div className="flex justify-end gap-3">
             <Button variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
             <Button onClick={executeVerifyLogic} isLoading={isVerifying}>Verify</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};