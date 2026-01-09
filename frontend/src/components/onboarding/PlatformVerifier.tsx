import React, { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";

interface PlatformVerifierProps {
  platformName: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  loginUrl?: string; 
}

export const PlatformVerifier: React.FC<PlatformVerifierProps> = ({ 
  platformName, value, onChange, placeholder, loginUrl 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerifyClick = () => {
    if (!value) return; 
    setIsModalOpen(true);
  };

  const handleConfirmVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsModalOpen(false);
      setIsVerified(true);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {/* Custom Label with Link Icon */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-text-muted">
          {platformName} Username
        </label>
        {loginUrl && (
          <a 
            href={loginUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary-light hover:text-primary-light/80 transition-colors"
            title={`Login to ${platformName}`}
          >
            {/* External Link Icon */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        )}
      </div>

      <div className="flex items-end gap-3">
        <div className="flex-1">
          {/* We pass empty label="" because we rendered it manually above */}
          <Input 
            label="" 
            value={value}
            onChange={(e) => {
              setIsVerified(false); 
              onChange(e.target.value);
            }}
            placeholder={placeholder || `Enter your ${platformName} handle`}
            disabled={isVerified} 
            className={isVerified ? "border-green-500/50 text-green-500" : ""}
          />
        </div>

        <div className="mb-[1px]"> 
          {isVerified ? (
            <div className="h-[46px] px-4 flex items-center justify-center text-green-500 bg-green-500/10 border border-green-500/20 rounded-lg animate-in fade-in">
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
              <span className="font-medium text-sm">Verified</span>
            </div>
          ) : (
            <Button 
              onClick={handleVerifyClick}
              disabled={!value}
              className="h-[46px]" 
              type="button"
            >
              Verify
            </Button>
          )}
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={`Verify ${platformName}`}
      >
        <div className="flex flex-col gap-4">
          <p className="text-text-muted">
            This is the <strong>{platformName}</strong> verification popup.
          </p>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleConfirmVerification} isLoading={isVerifying}>Check Verification</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};