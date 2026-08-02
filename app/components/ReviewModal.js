'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ReviewModal({ item, onClose, onSubmitSuccess }) {
  const [overallRating, setOverallRating] = useState(5);
  const [guideRating, setGuideRating] = useState(5);
  const [experienceRating, setExperienceRating] = useState(5);
  const [photos, setPhotos] = useState([]);
  const [comment, setComment] = useState('');
  const [showUsername, setShowUsername] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!item) return null;

  const RATING_LABELS = {
    1: 'Terrible',
    2: 'Poor',
    3: 'Fair',
    4: 'Good',
    5: 'Excellent',
  };

  const RATING_MESSAGES = {
    1: "Thanks for your rating. We're sorry to hear that, please tell us more so we can improve.",
    2: "Thanks for your rating. We're sorry to hear that, please tell us more so we can improve.",
    3: "Thanks for your rating. We're sorry to hear that, please tell us more so we can improve.",
    4: "Thanks for your rating. Please tell us more!",
    5: "Thanks for your rating. Please tell us more!",
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map((file) => URL.createObjectURL(file));
    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  const removePhoto = (idx) => {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        if (onSubmitSuccess) {
          onSubmitSuccess({
            ...item,
            overallRating,
            guideRating,
            experienceRating,
            photos,
            comment,
            showUsername,
            date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          });
        }
        onClose();
      }, 1000);
    }, 600);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '20px',
          maxWidth: '620px',
          width: '100%',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
          animation: 'fadeInScale 0.25s ease-out',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#F8FAFC',
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800', color: '#0F172A' }}>My Reviews</h3>
            <span style={{ fontSize: '0.82rem', color: '#64748B' }}>Share your experience with other travelers</span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#E2E8F0',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              fontWeight: 'bold',
              color: '#475569',
              fontSize: '1rem',
            }}
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px', maxHeight: '80vh', overflowY: 'auto' }}>
          {success ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#15803D' }}>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🎉</div>
              <h4 style={{ fontSize: '1.3rem', fontWeight: '800', margin: '0 0 8px 0' }}>Review Submitted Successfully!</h4>
              <p style={{ fontSize: '0.9rem', color: '#475569' }}>Thank you for helping our travel community.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Product / Tour Snippet */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '12px 16px',
                  background: '#F8FAFC',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  marginBottom: '20px',
                }}
              >
                <div style={{ width: '64px', height: '64px', position: 'relative', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                  <Image src={item.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'} alt={item.name} fill style={{ objectFit: 'cover' }} />
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: '800', color: '#0F172A' }}>{item.name}</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B' }}>Booked on: {item.date || '07 Feb 2024'} • Qty: {item.qty || 1}</p>
                </div>
              </div>

              {/* 1. Select Tour/Service Ratings */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '800', color: '#1E293B', display: 'block', marginBottom: '8px' }}>
                  Select Tour/Service Ratings
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => setOverallRating(star)}
                        style={{
                          cursor: 'pointer',
                          fontSize: '1.8rem',
                          color: star <= overallRating ? '#FF9900' : '#CBD5E1',
                          transition: 'transform 0.15s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#FF9900' }}>{RATING_LABELS[overallRating]}</span>
                </div>

                {/* Dynamic Feedback Banner based on Stars (PDF Page 7 & 8) */}
                <div
                  style={{
                    background: overallRating <= 3 ? '#FEF2F2' : '#F0FDF4',
                    border: overallRating <= 3 ? '1px solid #FCA5A5' : '1px solid #86EFAC',
                    color: overallRating <= 3 ? '#991B1B' : '#166534',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    fontSize: '0.84rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span>{overallRating <= 3 ? '⚠️' : '✓'}</span>
                  <span>{RATING_MESSAGES[overallRating]}</span>
                </div>
              </div>

              {/* 2. Additional Ratings Grid (Guide & Experience) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px', background: '#F8FAFC', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Tour Guide Service</label>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => setGuideRating(star)}
                        style={{ cursor: 'pointer', fontSize: '1.2rem', color: star <= guideRating ? '#FF9900' : '#CBD5E1' }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Service Experience</label>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => setExperienceRating(star)}
                        style={{ cursor: 'pointer', fontSize: '1.2rem', color: star <= experienceRating ? '#FF9900' : '#CBD5E1' }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Add Photos and Video */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.88rem', fontWeight: '800', color: '#1E293B', display: 'block', marginBottom: '8px' }}>
                  Add Photos and Video
                </label>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <label
                    style={{
                      width: '90px',
                      height: '90px',
                      borderRadius: '10px',
                      border: '2px dashed #CBD5E1',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      background: '#F8FAFC',
                      color: '#0097B2',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      textAlign: 'center',
                      padding: '4px',
                    }}
                  >
                    <span style={{ fontSize: '1.4rem' }}>📷</span>
                    <span>+ Add Photo</span>
                    <input type="file" multiple accept="image/*,video/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
                  </label>

                  {photos.map((src, idx) => (
                    <div key={idx} style={{ width: '90px', height: '90px', position: 'relative', borderRadius: '10px', overflow: 'hidden', border: '1px solid #CBD5E1' }}>
                      <Image src={src} alt="Uploaded preview" fill style={{ objectFit: 'cover' }} />
                      <button
                        type="button"
                        onClick={() => removePhoto(idx)}
                        style={{
                          position: 'absolute',
                          top: '4px',
                          right: '4px',
                          background: 'rgba(0,0,0,0.6)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '50%',
                          width: '20px',
                          height: '20px',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <small style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block', marginTop: '4px' }}>Please upload images and video according to Community Guidelines.</small>
              </div>

              {/* 4. Add Written Review */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.88rem', fontWeight: '800', color: '#1E293B', display: 'block', marginBottom: '8px' }}>
                  Add Written Review
                </label>
                <div style={{ position: 'relative' }}>
                  <textarea
                    rows={4}
                    maxLength={500}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="How was the quality of the tour/service? Is it worth its price?"
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.9rem',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />
                  <small style={{ position: 'absolute', bottom: '8px', right: '12px', fontSize: '0.75rem', color: '#94A3B8' }}>
                    {comment.length}/500
                  </small>
                </div>
              </div>

              {/* 5. Show Username Checkbox Toggle */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem', color: '#334155', fontWeight: '600' }}>
                  <input
                    type="checkbox"
                    checked={showUsername}
                    onChange={(e) => setShowUsername(e.target.checked)}
                    style={{ width: '16px', height: '16px', accentColor: '#0097B2', cursor: 'pointer' }}
                  />
                  Show username on review
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: '100%',
                  background: '#FF6B00',
                  color: '#ffffff',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '10px',
                  fontWeight: '800',
                  fontSize: '1rem',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 12px rgba(255, 107, 0, 0.3)',
                  transition: 'background 0.2s ease',
                }}
              >
                {submitting ? 'Submitting Review...' : 'SUBMIT REVIEW'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
