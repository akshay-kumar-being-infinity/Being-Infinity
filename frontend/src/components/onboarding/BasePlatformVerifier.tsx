import React from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

interface BasePlatformVerifierProps {
  platformName: string;
  iconColorClass: string; 
  value: string;
  onChange: (val: string) => void;
  onVerify: () => void;
  isVerified: boolean;
  isVerifying: boolean;
  loginUrl: string;
  placeholder?: string;
  labelSuffix?: string;
}

export const BasePlatformVerifier: React.FC<BasePlatformVerifierProps> = ({ 
  platformName, 
  iconColorClass,
  value, 
  onChange, 
  onVerify,
  isVerified,
  isVerifying,
  loginUrl,
  placeholder,
  labelSuffix = "Handle"
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center gap-2">
        <label className={`text-sm font-medium ${isVerified ? "text-green-500" : "text-text-muted"}`}>
          {platformName} {labelSuffix}
        </label>
        <a 
          href={loginUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-text-muted hover:text-primary-light transition-colors"
          title={`Login to ${platformName}`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>

      <div className="flex items-end gap-3">
        <div className="flex-1">
          <Input 
            label="" 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || `Enter ${platformName} username`}
            disabled={isVerified} 
            className={isVerified ? `border-green-500/50 text-green-500 ${iconColorClass}` : ""}
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
              onClick={onVerify}
              disabled={!value}
              className="h-[46px]" 
              type="button"
              isLoading={isVerifying}
            >
              Verify
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};