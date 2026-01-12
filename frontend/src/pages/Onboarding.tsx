import React, { useState, useRef, useEffect } from "react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { SearchableSelect } from "../components/ui/SearchableSelect";
import { PhoneVerifier } from "../components/onboarding/PhoneVerifier";

// IMPORT VERIFIERS
import { MentorPickVerifier } from "../components/onboarding/verifiers/MentorPickVerifier";
import { LeetCodeVerifier } from "../components/onboarding/verifiers/LeetCodeVerifier";
import { CodeChefVerifier } from "../components/onboarding/verifiers/CodeChefVerifier";
import { CodeForcesVerifier } from "../components/onboarding/verifiers/CodeForcesVerifier";
import { LinkedInVerifier } from "../components/onboarding/verifiers/LinkedInVerifier";
import { GitHubVerifier } from "../components/onboarding/verifiers/GitHubVerifier";

import COLLEGES from "../data/colleges.json";
import { logger } from "../lib/Logger";

export const Onboarding: React.FC = () => {
  // 1. Initialize State with DB Schema Names
  const [formData, setFormData] = useState({
    firstName: "", 
    lastName: "", 
    countryCode: "+91",
    phone: "",
    isStudent: false, 
    college: "",
    rollNumber: "",
    mentorpickUsername: "", 
    leetcodeUsername: "", 
    codechefUsername: "", 
    codeforcesUsername: "",
    githubUsername: "",
    linkedinUsername: ""
  });

  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Refs
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const collegeRef = useRef<HTMLDivElement>(null);
  const rollNumberRef = useRef<HTMLInputElement>(null);

  // Load Draft
  useEffect(() => {
    const savedData = localStorage.getItem("onboarding_draft");
    const userInfo = JSON.parse(localStorage.getItem("user_info") || "{}");
    
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (e) { logger.error("error", e); }
    } else if (userInfo.given_name) {
       setFormData(prev => ({...prev, firstName: userInfo.given_name, lastName: userInfo.family_name || "" }));
    }
    setIsLoaded(true);
  }, []);

  // Save Draft
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("onboarding_draft", JSON.stringify(formData));
    }
  }, [formData, isLoaded]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // --- VALIDATION ---
    const newErrors: { [key: string]: string } = {};
    let firstErrorRef: any = null;

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      if (!firstErrorRef) firstErrorRef = firstNameRef;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      if (!firstErrorRef) firstErrorRef = lastNameRef;
    }
    if (!formData.phone.trim() || formData.phone.length < 5) {
      newErrors.phone = "Valid phone number is required";
      if (!firstErrorRef) firstErrorRef = phoneRef;
    }
    if (formData.isStudent) {
      if (!formData.college) {
        newErrors.college = "Please select your college";
        if (!firstErrorRef) firstErrorRef = collegeRef;
      }
      if (!formData.rollNumber.trim()) {
        newErrors.rollNumber = "Roll/Registration number is required";
        if (!firstErrorRef) firstErrorRef = rollNumberRef;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      if (firstErrorRef && firstErrorRef.current) {
        firstErrorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        if (firstErrorRef.current.focus) firstErrorRef.current.focus();
      }
      return;
    }
    
    // --- SUBMIT ---
    setIsSaving(true);
    
    try {
      const token = localStorage.getItem("token");
      //replace with written api.
      const response = await fetch("http://localhost:3000/api/user/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        localStorage.removeItem("onboarding_draft");
        
        const userInfo = JSON.parse(localStorage.getItem("user_info") || "{}");
        userInfo.isProfileComplete = true;
        userInfo.given_name = formData.firstName;
        localStorage.setItem("user_info", JSON.stringify(userInfo));
        
        window.dispatchEvent(new Event("user_updated"));
        alert("Profile Saved Successfully!");
      } else {
        alert("Failed to save: " + data.message);
      }
    } catch (error) {
      logger.error("API Error:", error);
      alert("Something went wrong. Is the backend running?");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-2xl w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">
            Complete Your Profile
          </h1>
          <p className="text-text-muted">Tell us about yourself so we can personalize your coding journey.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* --- CARD 1: PERSONAL DETAILS --- */}
          <div className="bg-bg-elevated border border-border rounded-xl p-6 md:p-8 shadow-sm relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary-dark rounded-l-xl" />
            
            <div className="flex items-center gap-2 mb-6 text-text-primary">
              <svg className="text-primary-light" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              <h2 className="text-xl font-semibold">Personal Details</h2>
            </div>

            <div className="space-y-6">
              <div ref={firstNameRef}>
                <Input label="First Name" placeholder="Enter your first name" value={formData.firstName} onChange={(e) => handleChange("firstName", e.target.value)} error={errors.firstName} />
              </div>

              <div ref={lastNameRef}>
                <Input label="Last Name" placeholder="Enter your last name" value={formData.lastName} onChange={(e) => handleChange("lastName", e.target.value)} error={errors.lastName} />
              </div>

              {/* MOVED PHONE NUMBER HERE (Before Student Checkbox) */}
              <div ref={phoneRef}>
                 <PhoneVerifier countryCode={formData.countryCode} phoneNumber={formData.phone} onCodeChange={(val) => handleChange("countryCode", val)} onNumberChange={(val) => handleChange("phone", val)} error={errors.phone} />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="relative flex items-center">
                  <input type="checkbox" id="student-check" className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-border bg-bg-surface checked:bg-primary-light checked:border-primary-light transition-all" checked={formData.isStudent} onChange={(e) => handleChange("isStudent", e.target.checked)} />
                  <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </div>
                <label htmlFor="student-check" className="text-text-primary cursor-pointer select-none">I am currently a student</label>
              </div>

              {formData.isStudent && (
                <div className="animate-in fade-in slide-in-from-top-2 space-y-6 pl-4 border-l-2 border-border/50 relative z-20">
                  <div ref={collegeRef}>
                    <SearchableSelect label="Select College / University" options={COLLEGES} value={formData.college} onChange={(val) => handleChange("college", val)} placeholder="Search for your college..." error={!!errors.college} />
                    {errors.college && <span className="text-xs text-red-500 mt-1 block">{errors.college}</span>}
                  </div>
                  <div ref={rollNumberRef}>
                    <Input label="Roll / Registration Number" placeholder="e.g. 21BCE1045" value={formData.rollNumber} onChange={(e) => handleChange("rollNumber", e.target.value.toUpperCase())} error={errors.rollNumber} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* --- CARD 2: CODING HANDLES --- */}
          <div className="bg-bg-elevated border border-border rounded-xl p-6 md:p-8 shadow-sm relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 rounded-l-xl" />
            <div className="flex items-center gap-2 mb-6 text-text-primary">
              <svg className="text-blue-500" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
              <h2 className="text-xl font-semibold">Coding Handles</h2>
            </div>
            
            <div className="space-y-5">
              <MentorPickVerifier value={formData.mentorpickUsername} onChange={(val) => handleChange("mentorpickUsername", val)} />
              <LeetCodeVerifier value={formData.leetcodeUsername} onChange={(val) => handleChange("leetcodeUsername", val)} />
              <CodeChefVerifier value={formData.codechefUsername} onChange={(val) => handleChange("codechefUsername", val)} />
              <CodeForcesVerifier value={formData.codeforcesUsername} onChange={(val) => handleChange("codeforcesUsername", val)} />
            </div>
          </div>

          {/* --- CARD 3: PROFESSIONAL PROFILES --- */}
          <div className="bg-bg-elevated border border-border rounded-xl p-6 md:p-8 shadow-sm relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-purple-500 rounded-l-xl" />

            <div className="flex items-center gap-2 mb-6 text-text-primary">
              {/* Generic "User Profile" Icon */}
              <svg className="text-purple-500" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                 <circle cx="12" cy="7" r="4" />
                 <rect x="3" y="3" width="18" height="18" rx="2" ry="2" className="opacity-20" />
              </svg>
              <h2 className="text-xl font-semibold">Professional Profiles</h2>
            </div>

            <div className="space-y-5">
              <LinkedInVerifier 
                value={formData.linkedinUsername} 
                onChange={(val) => handleChange("linkedinUsername", val)} 
              />

              <GitHubVerifier 
                value={formData.githubUsername} 
                onChange={(val) => handleChange("githubUsername", val)} 
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" isLoading={isSaving} className="w-full md:w-auto min-w-[150px]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
              </svg>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};