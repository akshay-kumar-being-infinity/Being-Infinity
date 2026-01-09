import React, { useState } from "react";
import { BasePlatformVerifier } from "../BasePlatformVerifier";
import { Modal } from "../../ui/Modal";
import { Button } from "../../ui/Button";
import { config } from '../../../config';

interface CodeChefVerifierProps {
  value: string;
  onChange: (val: string) => void;
}

export const CodeChefVerifier: React.FC<CodeChefVerifierProps> = ({ value, onChange }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const executeCrawlLogic = async () => {
    setIsVerifying(true);
    // TODO: Call CodeChef specific backend Crawler
    setTimeout(() => {
      setIsVerifying(false);
      setShowModal(false);
      setIsVerified(true);
    }, 1500);
  };

  return (
    <>
      <BasePlatformVerifier
        platformName="CodeChef"
        iconColorClass="text-orange-900" 
        loginUrl={`${config.platforms.codechefUrl}/login`}
        value={value}
        onChange={(val) => { setIsVerified(false); onChange(val); }}
        onVerify={() => setShowModal(true)}
        isVerified={isVerified}
        isVerifying={isVerifying}
      />
      
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Verify CodeChef">
        <div className="space-y-4">
          <p className="text-text-muted">
            verification instructions will display here, <strong>{value}</strong>.
          </p>
          <div className="flex justify-end gap-3">
             <Button variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
             <Button onClick={executeCrawlLogic} isLoading={isVerifying}>Verify</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};