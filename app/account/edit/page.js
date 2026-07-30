'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AccountSidebar from '../../components/AccountSidebar';

export default function EditProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: 'DeshIT-BD',
    email: 'press.dhaka@fco.gov.uk',
    phone: '+880 17 0000 0000',
    dob: '08/15/1995',
    profession: 'Software Engineer',
    gender: 'Male',
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      router.push('/account/profile');
    }, 1200);
  };

  return (
    <div className="figma-page-shell dark-theme-shell">
      <Navbar />

      <main className="figma-main-content edit-profile-dark-container">
        <div className="account-layout-grid">
          <AccountSidebar />

          <div className="account-main-area">
            <div className="dark-form-card">
          <div className="edit-profile-header">
            <span className="account-eyebrow">Profile Settings</span>
            <h2>Edit Profile</h2>
            <p>Update your personal information and profile photo.</p>
          </div>

          {saved ? (
            <div style={{ color: '#10B981', textAlign: 'center', padding: '40px', fontWeight: '800', fontSize: '1.2rem' }}>
              ✓ Profile changes saved successfully! Redirecting to Profile...
            </div>
          ) : (
            <form onSubmit={handleSave}>
              <div className="form-grid-2col">
                {/* Name */}
                <div className="dark-input-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                {/* E-mail */}
                <div className="dark-input-group">
                  <label>E-mail</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Phone Number */}
                <div className="dark-input-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                {/* Date of Birth */}
                <div className="dark-input-group">
                  <label>Date of birth <small>(MM/DD/YY)</small></label>
                  <div className="input-with-icon">
                    <input
                      type="text"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                    />
                    <span className="calendar-icon">📅</span>
                  </div>
                </div>

                {/* Profession */}
                <div className="dark-input-group">
                  <label>Profession</label>
                  <input
                    type="text"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                  />
                </div>

                {/* Gender */}
                <div className="dark-input-group">
                  <label>Gender</label>
                  <input
                    type="text"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Bottom Section: Photo Upload + Save Button */}
              <div className="dark-form-bottom-row">
                <div className="photo-upload-box">
                  <label>Upload a Photo</label>
                  <label className="photo-dropzone">
                    <input type="file" accept="image/*" className="upload-file-input" />
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span>Click to upload</span>
                  </label>
                </div>

                <div className="save-button-wrap">
                  <button type="submit" className="btn-dark-save">
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
