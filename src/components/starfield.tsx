export function Starfield() {
  return (
    <>
      {/* Stars layer — CSS radial-gradient dots, tiled */}
      <div
        className="stars fixed inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      />
      {/* Nebula layer — soft colored glows */}
      <div
        className="nebula fixed inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      />
    </>
  );
}
