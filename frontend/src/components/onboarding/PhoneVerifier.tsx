import React, { useState } from "react";
import { SearchableSelect } from "../ui/SearchableSelect";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import COUNTRY_CODES from "../../data/countryCodes.json";

interface PhoneVerifierProps {
  countryCode: string;
  phoneNumber: string;
  onCodeChange: (val: string) => void;
  onNumberChange: (val: string) => void;
  error?: string;
}

export const PhoneVerifier: React.FC<PhoneVerifierProps> = ({ 
  countryCode, 
  phoneNumber, 
  onCodeChange, 
  onNumberChange, 
  error 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otp, setOtp] = useState(""); // Mock OTP state

  const handleVerifyClick = () => {
    if (!phoneNumber || phoneNumber.length < 5) return; 
    setIsModalOpen(true);
  };

  const handleConfirmVerification = () => {
    setIsVerifying(true);
    // Simulate API Verify call
    setTimeout(() => {
      setIsVerifying(false);
      setIsModalOpen(false);
      setIsVerified(true);
    }, 1500);
  };

  const handleNumberChangeLocal = (val: string) => {
      setIsVerified(false); // Reset verification if number changes
      onNumberChange(val);
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-medium text-text-muted">Phone Number</label>
      
      <div className="flex items-start gap-3">
        {/* 1. Country Code - Reusing SearchableSelect*/}
        <div className="w-[140px] shrink-0">
          <SearchableSelect
            label=""
            options={COUNTRY_CODES}
            value={countryCode}
            onChange={onCodeChange}
            placeholder="+91"
          />
        </div>

        {/* 2. Phone Input */}
        <div className="flex-1 relative">
           <input
              type="tel"
              placeholder="9876543210"
              value={phoneNumber}
              onChange={(e) => handleNumberChangeLocal(e.target.value.replace(/\D/g, ''))}
              disabled={isVerified}
              className={`
                w-full h-[44px] px-4 rounded-lg border bg-bg-surface text-text-primary placeholder:text-text-muted/50
                focus:outline-none focus:ring-2 focus:ring-primary-light/50 focus:border-primary-light
                transition-all duration-200
                ${error ? "border-red-500 focus:ring-red-500/30" : "border-border"}
                ${isVerified ? "border-green-500/50 text-green-500 bg-green-500/5" : ""}
              `}
           />
        </div>

        {/* 3. Verify Button / Tick */}
        <div className="shrink-0">
          {isVerified ? (
            <div className="h-[44px] px-4 flex items-center justify-center text-green-500 bg-green-500/10 border border-green-500/20 rounded-lg animate-in fade-in">
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
              <span className="font-medium text-sm">Verified</span>
            </div>
          ) : (
             <Button 
              onClick={handleVerifyClick}
              disabled={!phoneNumber || phoneNumber.length < 5}
              className="h-[44px]" 
              type="button"
            >
              Verify
            </Button>
          )}
        </div>
      </div>
      
      {/* Error Message */}
      {error && <span className="text-xs text-red-500">{error}</span>}

      {/* Verification Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Verify Phone Number"
      >
        <div className="flex flex-col gap-4">
          <p className="text-text-muted text-sm">
            We have sent a One Time Password (OTP) to <br />
            <strong className="text-text-primary text-base">{countryCode} {phoneNumber}</strong>
          </p>
          
          <div className="space-y-2">
              <label className="text-xs font-medium text-text-muted">Enter OTP</label>
              <input 
                type="text" 
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg-surface text-text-primary text-center tracking-[0.5em] font-mono text-lg focus:border-primary-light focus:ring-2 focus:ring-primary-light/20 outline-none"
                placeholder="0000"
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <p className="text-xs text-text-muted/70">
                (This is a demo. You can click 'Verify' without a real code.)
              </p>
          </div>

          <div className="flex justify-end gap-3 mt-2">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleConfirmVerification} isLoading={isVerifying}>Verify OTP</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};