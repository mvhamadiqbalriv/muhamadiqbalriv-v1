const socials = [
  { href: "https://github.com/muhamadiqbalriv", label: "GitHub" },
  { href: "https://linkedin.com/in/muhamadiqbalriv", label: "LinkedIn" },
  { href: "https://instagram.com/muhamadiqbalriv", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="relative z-10">
      <div className="mx-auto max-w-3xl px-6 py-6 flex items-center justify-center gap-4">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-muted transition-colors hover:text-[var(--primary)]"
            aria-label={s.label}
          >
            {s.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
