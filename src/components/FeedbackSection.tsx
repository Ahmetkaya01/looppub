"use client";

import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { CONTACT } from "@/lib/constants";
import FadeIn from "./FadeIn";

export default function FeedbackSection() {
  const { t } = useLanguage();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const displayRating = hoverRating || rating;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating < 1) return;

    const subject = encodeURIComponent(`Loop Pub — ${t.feedback.emailSubject}`);
    const body = encodeURIComponent(
      [
        `${t.feedback.ratingLabel}: ${rating}/5`,
        "",
        `${t.feedback.messageLabel}:`,
        form.message,
        "",
        form.name ? `${t.feedback.nameLabel}: ${form.name}` : "",
        form.email ? `${t.feedback.emailLabel}: ${form.email}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    );

    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section
      id="feedback"
      className="section-padding border-t border-[var(--border)] bg-page transition-colors duration-500"
      aria-label={t.feedback.ariaLabel}
    >
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <div className="text-center">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-gold">
              {t.feedback.eyebrow}
            </p>
            <h2 className="section-title mt-3">{t.feedback.title}</h2>
            <p className="section-subtitle mx-auto">{t.feedback.subtitle}</p>
            <div className="gold-divider" />
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <form
            onSubmit={handleSubmit}
            className="glass-card mt-12 p-8 md:p-10"
          >
            <fieldset>
              <legend className="font-body text-sm font-medium uppercase tracking-wider text-ink">
                {t.feedback.ratingLabel}
              </legend>
              <div
                className="mt-4 flex justify-center gap-2"
                role="radiogroup"
                aria-label={t.feedback.ratingLabel}
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={rating === value}
                    aria-label={`${value} / 5`}
                    onClick={() => setRating(value)}
                    onMouseEnter={() => setHoverRating(value)}
                    onMouseLeave={() => setHoverRating(0)}
                    onFocus={() => setHoverRating(value)}
                    onBlur={() => setHoverRating(0)}
                    className="rounded-md p-2 transition-transform duration-200 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    <StarIcon
                      filled={value <= displayRating}
                      className="h-9 w-9 sm:h-10 sm:w-10"
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="mt-3 text-center text-sm text-muted">
                  {t.feedback.ratingHint.replace("{n}", String(rating))}
                </p>
              )}
            </fieldset>

            <div className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="feedback-message"
                  className="font-body text-xs uppercase tracking-wider text-muted"
                >
                  {t.feedback.messageLabel} *
                </label>
                <textarea
                  id="feedback-message"
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  placeholder={t.feedback.messagePlaceholder}
                  className="mt-2 w-full resize-none rounded-md border border-[var(--border)] bg-transparent px-4 py-3 text-ink outline-none transition-colors focus:border-gold"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="feedback-name"
                    className="font-body text-xs uppercase tracking-wider text-muted"
                  >
                    {t.feedback.nameLabel}
                  </label>
                  <input
                    id="feedback-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder={t.feedback.namePlaceholder}
                    className="mt-2 w-full rounded-md border border-[var(--border)] bg-transparent px-4 py-3 text-ink outline-none transition-colors focus:border-gold"
                  />
                </div>
                <div>
                  <label
                    htmlFor="feedback-email"
                    className="font-body text-xs uppercase tracking-wider text-muted"
                  >
                    {t.feedback.emailLabel}
                  </label>
                  <input
                    id="feedback-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    placeholder={t.feedback.emailPlaceholder}
                    className="mt-2 w-full rounded-md border border-[var(--border)] bg-transparent px-4 py-3 text-ink outline-none transition-colors focus:border-gold"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={rating < 1 || !form.message.trim()}
              className="btn-primary mt-8 w-full disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {t.feedback.submit}
            </button>

            {submitted && (
              <p className="mt-4 text-center text-sm text-muted" role="status">
                {t.feedback.thankYou}
              </p>
            )}

            <p className="mt-6 text-center text-xs text-muted">
              {t.feedback.note}
            </p>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}

function StarIcon({
  filled,
  className,
}: {
  filled: boolean;
  className?: string;
}) {
  return (
    <svg
      className={`${className ?? ""} ${filled ? "text-gold" : "text-[var(--border)]"} transition-colors`}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  );
}
