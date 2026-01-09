import React, { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  error = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (disabled) return;
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => {
        dropdownRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-bg-dark/60 backdrop-blur-[2px] z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div 
        className={`flex flex-col gap-1.5 w-full relative transition-all duration-300 ${isOpen ? "z-50 scale-[1.01]" : "z-auto"}`} 
        ref={dropdownRef}
      >
        {/* Only show label if it is not empty (PhoneVerifier passes empty label) */}
        {label && (
          <label className={`text-sm font-medium transition-colors ${isOpen ? "text-primary-light" : "text-text-muted"}`}>
            {label}
          </label>
        )}
        
        <button
          type="button"
          onClick={handleToggle}
          disabled={disabled}
          className={`
            w-full px-4 h-[46px] text-left rounded-lg border flex items-center justify-between
            transition-all duration-200 cursor-pointer
            ${disabled ? "opacity-50 cursor-not-allowed bg-bg-surface" : ""}
            ${isOpen 
              ? "bg-bg-elevated border-primary-light ring-2 ring-primary-light/20 shadow-lg" 
              : error 
                ? "bg-bg-surface border-red-500 ring-1 ring-red-500/50"
                : "bg-bg-surface border-border hover:border-primary-light/50"
            }
          `}
        >
          {/* FIX: Added 'truncate' class to prevent text wrapping */}
          <span className={`block truncate mr-2 ${selectedLabel ? "text-text-primary font-medium" : "text-text-muted/70"}`}>
            {selectedLabel || placeholder}
          </span>
          
          <svg 
            className={`shrink-0 text-text-muted transition-transform duration-300 ${isOpen ? "rotate-180 text-primary-light" : ""}`} 
            width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </button>

        {isOpen && (
          <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-bg-elevated border border-border rounded-xl shadow-2xl shadow-black/50 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-3 border-b border-border bg-bg-elevated/95 backdrop-blur">
              <div className="relative">
                <svg 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-light" 
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                </svg>
                <input
                  type="text"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-bg-dark/50 border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary-light focus:bg-bg-dark transition-all placeholder:text-text-muted/50"
                  placeholder="Type to filter..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
              </div>
            </div>

            <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                      setSearchTerm("");
                    }}
                    className={`
                      px-4 py-3 text-sm cursor-pointer transition-all duration-150 border-l-2
                      ${value === option.value 
                        ? "bg-primary-dark/10 text-primary-light border-primary-light font-medium" 
                        : "text-text-primary border-transparent hover:bg-bg-surface hover:border-text-muted/30 hover:pl-5"
                      }
                    `}
                  >
                    {option.label}
                  </div>
                ))
              ) : (
                <div className="px-4 py-8 text-sm text-text-muted text-center flex flex-col items-center gap-2">
                   <span className="opacity-50 text-2xl">¯\_(ツ)_/¯</span>
                   <span>No match found</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};