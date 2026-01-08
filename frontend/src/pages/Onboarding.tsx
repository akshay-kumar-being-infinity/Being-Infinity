import React, { useState } from "react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { SearchableSelect } from "../components/ui/SearchableSelect";
import { PlatformVerifier } from "../components/onboarding/PlatformVerifier";
import { User, Briefcase, GraduationCap, Save } from "lucide-react";

// Mock College List (In real app, fetch this from API)
const COLLEGE_OPTIONS = [
  { value: "iit_bombay", label: "IIT Bombay" },
  { value: "iit_delhi", label: "IIT Delhi" },
  { value: "nit_trichy", label: "NIT Trichy" },
  { value: "bits_pilani", label: "BITS Pilani" },
  { value: "vit_vellore", label: "VIT Vellore" },
  { value: "other", label: "Other / Not Listed" },
];

export const Onboarding: React.FC = () => {
  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    isStudent: false,
    college: "",
    mentorpick: "",
    leetcode: "",
    codechef: "",
    codeforces: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  // Handlers
  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate Backend API Call
    console.log("Submitting Payload:", formData);
    
    setTimeout(() => {
      setIsSaving(false);
      alert("Profile Saved Successfully!");
      // Here you would redirect user to dashboard
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center p-4 md:p-8">
      <div className="max-w-3xl w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">
            Complete Your Profile
          </h1>
          <p className="text-text-muted">
            Tell us about yourself so we can personalize your coding journey.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Card 1: Personal Information */}
          <div className="bg-bg-elevated border border-border rounded-xl p-6 md:p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary-dark" /> {/* Accent Bar */}
            
            <div className="flex items-center gap-2 mb-6 text-text-primary">
              <User className="text-primary-light" />
              <h2 className="text-xl font-semibold">Personal Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="First Name" 
                placeholder="e.g. Akshay" 
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                required
              />
              <Input 
                label="Last Name" 
                placeholder="e.g. Kumar" 
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                required
              />
            </div>

            {/* Student Status Toggle */}
            <div className="mt-6 flex items-center gap-3">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id="student-check"
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-border bg-bg-surface checked:bg-primary-light checked:border-primary-light transition-all"
                  checked={formData.isStudent}
                  onChange={(e) => handleChange("isStudent", e.target.checked)}
                />
                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
              <label htmlFor="student-check" className="text-text-primary cursor-pointer select-none">
                I am currently a student
              </label>
            </div>

            {/* Conditional College Dropdown */}
            {formData.isStudent && (
              <div className="mt-6 animate-in fade-in slide-in-from-top-2">
                <SearchableSelect 
                  label="Select College / University"
                  options={COLLEGE_OPTIONS}
                  value={formData.college}
                  onChange={(val) => handleChange("college", val)}
                  placeholder="Search for your college..."
                />
              </div>
            )}
          </div>

          {/* Card 2: Coding Profiles */}
          <div className="bg-bg-elevated border border-border rounded-xl p-6 md:p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" /> {/* Different Accent Color */}

            <div className="flex items-center gap-2 mb-6 text-text-primary">
              <Briefcase className="text-blue-500" />
              <h2 className="text-xl font-semibold">Coding Handles</h2>
            </div>

            <div className="space-y-5">
              <PlatformVerifier 
                platformName="MentorPick" 
                value={formData.mentorpick} 
                onChange={(val) => handleChange("mentorpick", val)} 
              />
              <PlatformVerifier 
                platformName="LeetCode" 
                value={formData.leetcode} 
                onChange={(val) => handleChange("leetcode", val)} 
              />
              <PlatformVerifier 
                platformName="CodeChef" 
                value={formData.codechef} 
                onChange={(val) => handleChange("codechef", val)} 
              />
              <PlatformVerifier 
                platformName="CodeForces" 
                value={formData.codeforces} 
                onChange={(val) => handleChange("codeforces", val)} 
              />
            </div>
          </div>

          {/* Footer Action */}
          <div className="flex justify-end pt-4">
            <Button 
              type="submit" 
              isLoading={isSaving}
              className="w-full md:w-auto min-w-[150px]"
            >
              <Save size={18} />
              Save Changes
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};