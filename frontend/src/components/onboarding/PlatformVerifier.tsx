import React, { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { CheckCircle2 } from "lucide-react"; // Or use text "✔"

interface PlatformVerifierProps {
  platformName: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export const PlatformVerifier: React.FC<PlatformVerifierProps> = ({ 
  platformName, 
  value, 
  onChange, 
  placeholder 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerifyClick = () => {
    if (!value) return; // Don't open if empty
    setIsModalOpen(true);
  };

  const handleConfirmVerification = () => {
    // This simulates the actual verification process
    setIsVerifying(true);
    
    // Simulate API delay (later we replace this with real backend logic)
    setTimeout(() => {
      setIsVerifying(false);
      setIsModalOpen(false);
      setIsVerified(true);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <Input 
            label={`${platformName} Username`}
            value={value}
            onChange={(e) => {
              setIsVerified(false); // Reset verification if user changes name
              onChange(e.target.value);
            }}
            placeholder={placeholder || `Enter your ${platformName} handle`}
            disabled={isVerified} // Optional: lock input after verification
            className={isVerified ? "border-green-500/50 text-green-500" : ""}
          />
        </div>

        {/* The Action Button or Tick Mark */}
        <div className="mb-[1px]"> {/* Alignment adjustment */}
          {isVerified ? (
            <div className="h-[46px] px-4 flex items-center justify-center text-green-500 bg-green-500/10 border border-green-500/20 rounded-lg animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 mr-2" />
              <span className="font-medium text-sm">Verified</span>
            </div>
          ) : (
            <Button 
              onClick={handleVerifyClick}
              disabled={!value}
              className="h-[46px]" // Matches standard input height
              type="button"
            >
              Verify
            </Button>
          )}
        </div>
      </div>

      {/* The Popup Logic */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={`Verify ${platformName}`}
      >
        <div className="flex flex-col gap-4">
          <p className="text-text-muted">
            This is the <strong>{platformName}</strong> verification popup.
            <br />
            <span className="text-xs opacity-70">
              (Later, this will ask you to add a specific code to your {platformName} bio to prove ownership.)
            </span>
          </p>
          
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmVerification} 
              isLoading={isVerifying}
            >
              Check Verification
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};