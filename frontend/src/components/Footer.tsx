export function Footer() {
  return (
    <footer className="mt-20 border-t">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 text-xs text-neutral-500 text-center">
        Built by students for students who love good food & good convo. Be kind, be curious. © {new Date().getFullYear()}
      </div>
    </footer>
  );
}
