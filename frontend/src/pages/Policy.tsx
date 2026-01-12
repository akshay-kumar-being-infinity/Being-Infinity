import React from 'react';

const Policies: React.FC = () => {
  return (
    <div className="min-h-screen bg-[hsl(var(--bg-dark))] text-[hsl(var(--text-primary))]">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-12 text-center">
            <span className="text-[hsl(var(--primary-light))]">Policies & Terms</span>
          </h1>

          {/* Privacy Policy */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-4 text-[hsl(var(--primary-light))]">Privacy Policy</h2>
            <p className="text-sm text-[hsl(var(--text-muted))] mb-6">Effective Date: 12th Jan 2025</p>
            
            <p className="text-lg text-[hsl(var(--text-muted))] mb-6 leading-relaxed">
              Being Infinity Pvt. Ltd. ("we") respects your privacy and is committed to protecting your personal information.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[hsl(var(--text-primary))]">1. Information We Collect</h3>
                <ul className="space-y-3 pl-6">
                  <li className="text-[hsl(var(--text-muted))] leading-relaxed flex gap-3">
                    <span className="text-[hsl(var(--primary-light))] flex-shrink-0 mt-1">•</span>
                    <span>When you purchase a course via Razorpay, we may collect personal details such as your name, email, phone number, and other necessary information to process your order.</span>
                  </li>
                  <li className="text-[hsl(var(--text-muted))] leading-relaxed flex gap-3">
                    <span className="text-[hsl(var(--primary-light))] flex-shrink-0 mt-1">•</span>
                    <span>Payment details are collected and processed securely by Razorpay.</span>
                  </li>
                  <li className="text-[hsl(var(--text-muted))] leading-relaxed flex gap-3">
                    <span className="text-[hsl(var(--primary-light))] flex-shrink-0 mt-1">•</span>
                    <span>Prior to enrollment, we may request your MentorPick, GitHub, CodeChef, Linkedin, Codeforces, and LeetCode account details to create a centralized view of your coding profiles. This helps us understand your current skill level, streamline onboarding, and provide a more structured and personalized learning experience once the course begins.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-[hsl(var(--text-primary))]">2. How We Use Information</h3>
                <ul className="space-y-3 pl-6">
                  <li className="text-[hsl(var(--text-muted))] leading-relaxed flex gap-3">
                    <span className="text-[hsl(var(--primary-light))] flex-shrink-0 mt-1">•</span>
                    <span>To process your course purchase and provide access.</span>
                  </li>
                  <li className="text-[hsl(var(--text-muted))] leading-relaxed flex gap-3">
                    <span className="text-[hsl(var(--primary-light))] flex-shrink-0 mt-1">•</span>
                    <span>To send receipts, updates, or support communication.</span>
                  </li>
                  <li className="text-[hsl(var(--text-muted))] leading-relaxed flex gap-3">
                    <span className="text-[hsl(var(--primary-light))] flex-shrink-0 mt-1">•</span>
                    <span>We do not sell, rent, or share your personal information with third parties.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-[hsl(var(--text-primary))]">3. Data Security</h3>
                <ul className="space-y-3 pl-6">
                  <li className="text-[hsl(var(--text-muted))] leading-relaxed flex gap-3">
                    <span className="text-[hsl(var(--primary-light))] flex-shrink-0 mt-1">•</span>
                    <span>Payments are processed securely via Razorpay.</span>
                  </li>
                  <li className="text-[hsl(var(--text-muted))] leading-relaxed flex gap-3">
                    <span className="text-[hsl(var(--primary-light))] flex-shrink-0 mt-1">•</span>
                    <span>Our website uses HTTPS.</span>
                  </li>
                  <li className="text-[hsl(var(--text-muted))] leading-relaxed flex gap-3">
                    <span className="text-[hsl(var(--primary-light))] flex-shrink-0 mt-1">•</span>
                    <span>While we take precautions, no method of transmission is fully secure.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-[hsl(var(--text-primary))]">4. Your Rights</h3>
                <p className="text-[hsl(var(--text-muted))] leading-relaxed">
                  For any questions or concerns, please contact us at <a href="mailto:info@being-infinity.in" className="text-[hsl(var(--primary-light))] hover:underline">info@beinginfinity.in</a>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-[hsl(var(--text-primary))]">5. Policy Updates</h3>
                <p className="text-[hsl(var(--text-muted))] leading-relaxed">
                  We may update this policy periodically with a revised "Effective Date."
                </p>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="mb-16 pt-12 border-t border-[hsl(var(--border))]">
            <h2 className="text-3xl font-bold mb-4 text-[hsl(var(--primary-light))]">Terms and Conditions</h2>
            <p className="text-sm text-[hsl(var(--text-muted))] mb-6">Effective Date: 12th Jan 2025</p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[hsl(var(--text-primary))]">1. Use of Website & Courses</h3>
                <ul className="space-y-3 pl-6">
                  <li className="text-[hsl(var(--text-muted))] leading-relaxed flex gap-3">
                    <span className="text-[hsl(var(--primary-light))] flex-shrink-0 mt-1">•</span>
                    <span>Courses are for educational purposes only.</span>
                  </li>
                  <li className="text-[hsl(var(--text-muted))] leading-relaxed flex gap-3">
                    <span className="text-[hsl(var(--primary-light))] flex-shrink-0 mt-1">•</span>
                    <span>You may not copy, share, or distribute course content without permission.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-[hsl(var(--text-primary))]">2. Payments</h3>
                <ul className="space-y-3 pl-6">
                  <li className="text-[hsl(var(--text-muted))] leading-relaxed flex gap-3">
                    <span className="text-[hsl(var(--primary-light))] flex-shrink-0 mt-1">•</span>
                    <span>Payments are processed securely through Razorpay.</span>
                  </li>
                  <li className="text-[hsl(var(--text-muted))] leading-relaxed flex gap-3">
                    <span className="text-[hsl(var(--primary-light))] flex-shrink-0 mt-1">•</span>
                    <span>Course access is provided only after successful payment confirmation.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-[hsl(var(--text-primary))]">3. Intellectual Property</h3>
                <ul className="space-y-3 pl-6">
                  <li className="text-[hsl(var(--text-muted))] leading-relaxed flex gap-3">
                    <span className="text-[hsl(var(--primary-light))] flex-shrink-0 mt-1">•</span>
                    <span>All website and course content belongs to Being Infinity Pvt. Ltd.</span>
                  </li>
                  <li className="text-[hsl(var(--text-muted))] leading-relaxed flex gap-3">
                    <span className="text-[hsl(var(--primary-light))] flex-shrink-0 mt-1">•</span>
                    <span>Unauthorized use of content is prohibited.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-[hsl(var(--text-primary))]">4. Liability</h3>
                <p className="text-[hsl(var(--text-muted))] leading-relaxed">
                  We are not responsible for technical issues, interruptions, or learning outcomes.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-[hsl(var(--text-primary))]">5. Governing Law</h3>
                <p className="text-[hsl(var(--text-muted))] leading-relaxed">
                  These Terms are governed by the laws of India and subject to the jurisdiction of Telangana courts.
                </p>
              </div>
            </div>
          </div>

          {/* Refund & Cancellation Policy */}
          <div className="mb-16 pt-12 border-t border-[hsl(var(--border))]">
            <h2 className="text-3xl font-bold mb-4 text-[hsl(var(--primary-light))]">Refund & Cancellation Policy</h2>
            <p className="text-sm text-[hsl(var(--text-muted))] mb-6">Effective Date: 12th Jan 2025</p>

            <ul className="space-y-3 pl-6">
              <li className="text-[hsl(var(--text-muted))] leading-relaxed flex gap-3">
                <span className="text-[hsl(var(--primary-light))] flex-shrink-0 mt-1">•</span>
                <span>Once a course is purchased, the fees are non-refundable.</span>
              </li>
              <li className="text-[hsl(var(--text-muted))] leading-relaxed flex gap-3">
                <span className="text-[hsl(var(--primary-light))] flex-shrink-0 mt-1">•</span>
                <span>Cancellations are not allowed after successful payment.</span>
              </li>
              <li className="text-[hsl(var(--text-muted))] leading-relaxed flex gap-3">
                <span className="text-[hsl(var(--primary-light))] flex-shrink-0 mt-1">•</span>
                <span>In case of duplicate payment or technical error, please contact us at <a href="mailto:info@beinginfinity.in" className="text-[hsl(var(--primary-light))] hover:underline">info@beinginfinity.in</a>.</span>
              </li>
            </ul>
          </div>

          {/* Shipping Policy */}
          <div className="mb-16 pt-12 border-t border-[hsl(var(--border))]">
            <h2 className="text-3xl font-bold mb-4 text-[hsl(var(--primary-light))]">Shipping Policy</h2>
            <p className="text-sm text-[hsl(var(--text-muted))] mb-6">Effective Date: 12th Jan 2025</p>

            <ul className="space-y-3 pl-6">
              <li className="text-[hsl(var(--text-muted))] leading-relaxed flex gap-3">
                <span className="text-[hsl(var(--primary-light))] flex-shrink-0 mt-1">•</span>
                <span>All our courses are delivered online only.</span>
              </li>
              <li className="text-[hsl(var(--text-muted))] leading-relaxed flex gap-3">
                <span className="text-[hsl(var(--primary-light))] flex-shrink-0 mt-1">•</span>
                <span>No physical products are shipped.</span>
              </li>
              <li className="text-[hsl(var(--text-muted))] leading-relaxed flex gap-3">
                <span className="text-[hsl(var(--primary-light))] flex-shrink-0 mt-1">•</span>
                <span>Access is provided digitally after successful payment confirmation.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Policies;
