import { CONTACT, SITE_NAME } from "@/lib/constants";

export default function Footer() {
  return (
    <footer
      className="border-t border-white/10 bg-surface"
      aria-label="Site alt bilgisi"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-14 md:flex-row md:items-start md:justify-between md:px-10">
        <div>
          <p className="font-display text-2xl font-extrabold uppercase">
            Loop <span className="text-amber">Pub &amp; Bar</span>
          </p>
          <a
            href={CONTACT.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block max-w-xs text-sm leading-relaxed text-muted transition-colors hover:text-amber"
          >
            {CONTACT.address}
          </a>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-eyebrow text-muted">
            İletişim
          </p>
          <a
            href={CONTACT.phoneTel}
            className="mt-3 block font-display text-lg font-bold text-ink transition-colors hover:text-amber"
          >
            {CONTACT.phoneDisplay}
          </a>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-eyebrow text-muted">
            Sosyal Medya
          </p>
          <a
            href={CONTACT.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram — looppub"
            className="mt-3 inline-flex items-center gap-2 text-sm text-ink transition-colors hover:text-amber"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-current"
              aria-hidden="true"
            >
              <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.88 5.88 0 0 0-2.13 1.38A5.88 5.88 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.8.72 1.47 1.38 2.13a5.88 5.88 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm7.85-10.4a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44z" />
            </svg>
            {CONTACT.instagramHandle}
          </a>
        </div>
      </div>

      <div className="border-t border-white/5 py-6 text-center text-xs text-muted">
        {SITE_NAME} © 2026 - All Rights Reserved
      </div>
    </footer>
  );
}
