import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react"; // Ensure lucide-react is installed

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
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter options based on search
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <div className="flex flex-col gap-1.5 w-full relative" ref={dropdownRef}>
      <label className="text-sm font-medium text-text-muted">{label}</label>
      
      {/* The Trigger Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full px-4 py-2.5 text-left rounded-lg border bg-bg-surface flex items-center justify-between
          transition-all duration-200
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-primary-light/50"}
          ${isOpen ? "ring-2 ring-primary-light/50 border-primary-light" : "border-border"}
        `}
      >
        <span className={selectedLabel ? "text-text-primary" : "text-text-muted/50"}>
          {selectedLabel || placeholder}
        </span>
        <ChevronDown size={18} className={`text-text-muted transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* The Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-bg-elevated border border-border rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          
          {/* Search Bar inside Dropdown */}
          <div className="p-2 border-b border-border sticky top-0 bg-bg-elevated">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                className="w-full pl-9 pr-3 py-1.5 text-sm bg-bg-surface border border-border rounded-md text-text-primary focus:outline-none focus:border-primary-light placeholder:text-text-muted/50"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
          </div>

          {/* Options List */}
          <div className="max-h-60 overflow-y-auto">
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
                    px-4 py-2 text-sm cursor-pointer transition-colors
                    ${value === option.value ? "bg-primary-dark/10 text-primary-light" : "text-text-primary hover:bg-bg-surface"}
                  `}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-text-muted text-center">
                No results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};