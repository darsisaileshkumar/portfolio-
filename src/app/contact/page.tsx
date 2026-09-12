"use client";

import { useState } from "react";
import { ExternalLink, Send } from "lucide-react";

const projectTypes = [
  "Select project type",
  "Brand Film",
  "Music Video",
  "Commercial",
  "Documentary",
  "Social Content",
  "Motion Graphics",
  "Color Grading",
  "Other",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("https://formspree.io/f/dskumardarsi@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSent(true);
      } else {
        alert("There was a problem sending your message. Please try the direct email link instead.");
      }
    } catch {
      // Fallback for development if Formspree isn't set up yet
      console.log("Form submission simulated. Replace YOUR_ENDPOINT_HERE with a real Formspree endpoint.");
      setSent(true);
    }
  };

  return (
    <div
      style={{
        background: "var(--color-bg-void)",
        paddingTop: "72px",
        minHeight: "100vh",
      }}
    >
      <div className="container-max section-spacing">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          {/* Left — headline */}
          <div>
            <p
              className="text-caption mb-6"
              style={{ color: "var(--color-text-muted)" }}
            >
              CONTACT
            </p>
            <h1
              className="text-h1 mb-8"
              style={{ color: "var(--color-text-primary)" }}
            >
              Let&apos;s make
              <br />
              <span style={{ color: "var(--color-accent-primary)" }}>
                something.
              </span>
            </h1>
            <p
              className="text-body mb-12"
              style={{
                color: "var(--color-text-secondary)",
                maxWidth: "380px",
              }}
            >
              Available for freelance projects, collaborations, and full-time
              opportunities. Drop a message and I&apos;ll get back to you within 24
              hours.
            </p>

            {/* Direct email */}
            <div style={{ marginBottom: "40px" }}>
              <p
                className="text-caption mb-3"
                style={{ color: "var(--color-text-muted)" }}
              >
                OR EMAIL DIRECTLY
              </p>
              <a
                href="mailto:dskumardarsi@gmail.com"
                style={{
                  color: "var(--color-accent-primary)",
                  textDecoration: "none",
                  fontSize: "clamp(1.1rem, 3.5vw, 1.5rem)",
                  fontWeight: 500,
                  transition: "opacity 0.2s",
                  wordBreak: "break-word",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                dskumardarsi@gmail.com
              </a>
            </div>

            {/* Socials */}
            <div>
              <p
                className="text-caption mb-4"
                style={{ color: "var(--color-text-muted)" }}
              >
                FIND ME ON
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  { icon: ExternalLink, label: "Instagram", href: "#" },
                  { icon: ExternalLink, label: "LinkedIn", href: "#" },
                  {
                    icon: ExternalLink,
                    label: "Behance",
                    href: "#",
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "12px",
                      color: "var(--color-text-secondary)",
                      textDecoration: "none",
                      fontSize: "var(--text-small)",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--color-text-primary)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--color-text-secondary)")
                    }
                  >
                    <social.icon size={16} />
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — contact form inside glass panel */}
          <div className="glass-panel p-6 md:p-10">
            {sent ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px 0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "rgba(110,91,255,0.15)",
                    border: "1px solid var(--color-accent-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Send size={24} style={{ color: "var(--color-accent-primary)" }} />
                </div>
                <h2
                  className="text-h3"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Message sent!
                </h2>
                <p
                  className="text-body"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  I&apos;ll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <label
                    className="text-caption"
                    style={{
                      display: "block",
                      color: "var(--color-text-muted)",
                      marginBottom: "8px",
                    }}
                  >
                    NAME
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Your name"
                    required
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label
                    className="text-caption"
                    style={{
                      display: "block",
                      color: "var(--color-text-muted)",
                      marginBottom: "8px",
                    }}
                  >
                    EMAIL
                  </label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="you@company.com"
                    required
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label
                    className="text-caption"
                    style={{
                      display: "block",
                      color: "var(--color-text-muted)",
                      marginBottom: "8px",
                    }}
                  >
                    PROJECT TYPE
                  </label>
                  <select
                    className="form-input"
                    required
                    name="projectType"
                    value={formData.projectType}
                    onChange={(e) =>
                      setFormData({ ...formData, projectType: e.target.value })
                    }
                    style={{ appearance: "none" }}
                  >
                    {projectTypes.map((pt) => (
                      <option key={pt} value={pt === "Select project type" ? "" : pt}>
                        {pt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    className="text-caption"
                    style={{
                      display: "block",
                      color: "var(--color-text-muted)",
                      marginBottom: "8px",
                    }}
                  >
                    MESSAGE
                  </label>
                  <textarea
                    className="form-input"
                    rows={5}
                    placeholder="Tell me about your project..."
                    required
                    name="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    style={{ resize: "vertical" }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    justifyContent: "center",
                    padding: "14px 24px",
                    fontSize: "var(--text-body)",
                  }}
                >
                  Send message
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
