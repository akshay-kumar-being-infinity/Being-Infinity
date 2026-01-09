import React, { useState } from "react";
import { BasePlatformVerifier } from "../BasePlatformVerifier";
import { Modal } from "../../ui/Modal";
import { Button } from "../../ui/Button";
import { config } from '../../../config';

interface LeetCodeVerifierProps {
  value: string;
  onChange: (val: string) => void;
}

export const LeetCodeVerifier: React.FC<LeetCodeVerifierProps> = ({ value, onChange }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleVerify = () => {
    // 1. Open the modal to explain how we will verify
    setShowModal(true);
  };

  const executeCrawlLogic = async () => {
    setIsVerifying(true);
    // TODO: Call leetcode specific backend Crawler
    setTimeout(() => {
      setIsVerifying(false);
      setShowModal(false);
      setIsVerified(true);
    }, 2000);
  };

  return (
    <>
      <BasePlatformVerifier
        platformName="LeetCode"
        iconColorClass="text-yellow-500"
        loginUrl={`${config.platforms.leetcodeUrl}/accounts/login/`}
        value={value}
        onChange={(val) => { setIsVerified(false); onChange(val); }}
        onVerify={handleVerify}
        isVerified={isVerified}
        isVerifying={isVerifying}
      />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Verify LeetCode Profile">
        <div className="space-y-4">
          <p className="text-text-muted">
            verification instructions will display here, <strong>{value}</strong>
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={executeCrawlLogic} isLoading={isVerifying}>
              Verify
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};