import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PhotoGallery1 from '../assets/Gallery/PhotoGallery1.jpeg';
import PhotoGallery2 from '../assets/Gallery/PhotoGallery2.jpeg';
import PhotoGallery3 from '../assets/Gallery/PhotoGallery3.jpeg';
import PhotoGallery4 from '../assets/Gallery/PhotoGallery4.jpeg';
import PhotoGallery5 from '../assets/Gallery/PhotoGallery5.jpeg';
import PhotoGallery6 from '../assets/Gallery/PhotoGallery6.jpeg';
import PhotoGallery7 from '../assets/Gallery/PhotoGallery7.jpeg';
import PhotoGallery8 from '../assets/Gallery/PhotoGallery8.jpeg';



const About: React.FC = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Team Member 1",
      role: "Position",
      image: "",
      bio: "Brief description about the team member's expertise and role."
    },
    {
      id: 2,
      name: "Team Member 2",
      role: "Position",
      image: "",
      bio: "Brief description about the team member's expertise and role."
    },
    {
      id: 3,
      name: "Team Member 3",
      role: "Position",
      image: "",
      bio: "Brief description about the team member's expertise and role."
    },
    {
      id: 4,
      name: "Team Member 4",
      role: "Position",
      image: "",
      bio: "Brief description about the team member's expertise and role."
    },
    {
      id: 5,
      name: "Team Member 5",
      role: "Position",
      image: "",
      bio: "Brief description about the team member's expertise and role."
    },
    {
      id: 6,
      name: "Team Member 6",
      role: "Position",
      image: "",
      bio: "Brief description about the team member's expertise and role."
    },
  ];

  const galleryImages = [
    { id: 1, url: PhotoGallery1, alt: 'Team collaboration' },
    { id: 2, url: PhotoGallery2, alt: 'Coding session' },
    { id: 3, url: PhotoGallery3, alt: 'Learning together' },
    { id: 4, url: PhotoGallery4, alt: 'Workshop' },
    { id: 5, url: PhotoGallery5, alt: 'Tech talk' },
    { id: 6, url: PhotoGallery6, alt: 'discussion' },
    { id: 7, url: PhotoGallery7, alt: 'Team Talk' },
    { id: 8, url: PhotoGallery8, alt: 'Study session' },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  const [startIndex, setStartIndex] = useState(0);

  const visibleMembers = useMemo(() => {
    const count = Math.min(3, teamMembers.length);
    return Array.from({ length: count }, (_, idx) => teamMembers[(startIndex + idx) % teamMembers.length]);
  }, [startIndex, teamMembers]);

  const goPrev = () => setStartIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  const goNext = () => setStartIndex((prev) => (prev + 1) % teamMembers.length);

  return (
    <div className="min-h-screen bg-[hsl(var(--bg-dark))] text-[hsl(var(--text-primary))]">
      {/* Hero Section */}

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]">
            <span className="text-[hsl(var(--primary-light))]">About Being Infinity</span>
          </h1>
          <p className="text-xl text-[hsl(var(--text-muted))] max-w-3xl mx-auto">
            Empowering the next generation of developers through innovative education and training
          </p>
        </div>
      </section>

      {/* Vision Section */}

      <section className="py-20 px-6 bg-[hsl(var(--bg-surface))]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6" style={{ background: 'linear-gradient(to bottom, hsl(76 80% 54%), hsl(0 0% 95%))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Our Vision
              </h2>
              <p className="text-lg text-[hsl(var(--text-muted))] mb-6 leading-relaxed">
                At Being Infinity, we envision a world where every aspiring developer has access to world-class 
                coding education and Industry level preparation.
              </p>
              <p className="text-lg text-[hsl(var(--text-muted))] mb-6 leading-relaxed">
                We believe in bridging the gap between academic learning and industry requirements, 
                preparing students not just for their first job, but for a successful career in technology.
              </p>
              <div className="space-y-4 mt-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[hsl(var(--primary-dark))] flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[hsl(var(--primary-light))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-[hsl(var(--text-primary))]">Quality Education</h3>
                    <p className="text-[hsl(var(--text-muted))]">Comprehensive curriculum designed by industry experts</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[hsl(var(--primary-dark))] flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[hsl(var(--primary-light))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-[hsl(var(--text-primary))]">Career Growth</h3>
                    <p className="text-[hsl(var(--text-muted))]">End-to-end support from learning to placement</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[hsl(var(--primary-dark))] flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[hsl(var(--primary-light))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-[hsl(var(--text-primary))]">Community Focus</h3>
                    <p className="text-[hsl(var(--text-muted))]">Building a supportive network of learners and mentors</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-[hsl(var(--bg-elevated))] rounded-2xl p-8 border border-[hsl(var(--border))]">
                <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
                  {galleryImages.map((image, index) => (
                    <div
                      key={image.id}
                      className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                      style={{ opacity: index === currentImageIndex ? 1 : 0 }}
                    >
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {galleryImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex
                            ? 'bg-[hsl(var(--primary-light))] w-8'
                            : 'bg-[hsl(var(--text-muted)/0.5)] hover:bg-[hsl(var(--text-muted))]'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ background: 'linear-gradient(to bottom, hsl(76 80% 54%), hsl(0 0% 95%))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Meet Our Team
            </h2>
            <p className="text-lg text-[hsl(var(--text-muted))] max-w-2xl mx-auto">
              Passionate educators dedicated to your success
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {visibleMembers.map((member) => (
              <div
                key={member.id}
                className="p-2 flex flex-col items-center text-center"
              >
                <div className="w-28 h-28 rounded-full bg-[hsl(var(--bg-elevated))] border border-[hsl(var(--border))] flex items-center justify-center overflow-hidden mb-4">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <svg
                      className="w-12 h-12 text-[hsl(var(--text-muted))]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-[hsl(var(--text-primary))]">{member.name}</h3>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 mt-10">
            <button
              onClick={goPrev}
              className="w-12 h-12 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--bg-surface))] hover:border-[hsl(var(--primary-light))] hover:text-[hsl(var(--primary-light))] transition-colors duration-200 flex items-center justify-center"
              aria-label="Previous"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goNext}
              className="w-12 h-12 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--bg-surface))] hover:border-[hsl(var(--primary-light))] hover:text-[hsl(var(--primary-light))] transition-colors duration-200 flex items-center justify-center"
              aria-label="Next"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[hsl(var(--bg-surface))]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6" style={{ background: 'linear-gradient(to bottom, hsl(76 80% 54%), hsl(0 0% 95%))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-[hsl(var(--text-muted))] mb-8">
            Join thousands of students who have transformed their careers with Being Infinity
          </p>
          <Link
            to="/courses"
            className="inline-block px-8 py-4 bg-[hsl(var(--primary-light))] text-[hsl(var(--bg-dark))] rounded-xl hover:bg-[hsl(var(--primary-light)/0.9)] transition-all duration-200 font-semibold text-lg"
          >
            Explore Courses
          </Link>
        </div>
      </section>

      {/* Social Media & Footer Section */}
      <section className="py-16 px-6 border-t border-[hsl(var(--border))]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-8">
            <h3 className="text-2xl font-semibold text-[hsl(var(--text-primary))]">Connect With Us</h3>
            
            <div className="flex gap-6 flex-wrap justify-center">
              <a
                href="https://x.com/BeingInfinityoo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-[hsl(var(--bg-surface))] border border-[hsl(var(--border))] rounded-xl hover:border-[hsl(var(--primary-light))] transition-all duration-200"
              >
                <svg className="w-6 h-6 text-[hsl(var(--text-primary))]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="text-[hsl(var(--text-primary))] font-medium">Twitter</span>
              </a>

              <a
                href="https://www.instagram.com/beinginfinityoo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-[hsl(var(--bg-surface))] border border-[hsl(var(--border))] rounded-xl hover:border-[hsl(var(--primary-light))] transition-all duration-200"
              >
                <svg className="w-6 h-6 text-[hsl(var(--text-primary))]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span className="text-[hsl(var(--text-primary))] font-medium">Instagram</span>
              </a>

              <a
                href="https://www.youtube.com/@beinginfinity-oo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-[hsl(var(--bg-surface))] border border-[hsl(var(--border))] rounded-xl hover:border-[hsl(var(--primary-light))] transition-all duration-200"
              >
                <svg className="w-6 h-6 text-[hsl(var(--text-primary))]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                <span className="text-[hsl(var(--text-primary))] font-medium">YouTube</span>
              </a>

              <a
                href="https://www.linkedin.com/company/beinginfinity"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-[hsl(var(--bg-surface))] border border-[hsl(var(--border))] rounded-xl hover:border-[hsl(var(--primary-light))] transition-all duration-200"
              >
                <svg className="w-6 h-6 text-[hsl(var(--text-primary))]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="text-[hsl(var(--text-primary))] font-medium">LinkedIn</span>
              </a>
            </div>

            <div className="mt-4">
              <Link
                to="/policies"
                className="text-[hsl(var(--text-muted))] hover:text-[hsl(var(--primary-light))] transition-colors duration-200 text-sm"
              >
                Privacy Policy & Terms
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default About;
