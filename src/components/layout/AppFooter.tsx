const AppFooter = () => {
  return (
    <footer className="border-t border-border/60 mt-8">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-muted-foreground">
        <p>© {new Date().getFullYear()} Rider Match. All rights reserved.</p>
        <p className="flex gap-2 items-center">
          <span>Lagos, Nigeria</span>
          <span>•</span>
          <span>Built for demo and learning purposes</span>
          <span>•</span>
          <a href="/contact" className="text-foreground hover:underline">
            Contact
          </a>
        </p>
      </div>
    </footer>
  );
};

export default AppFooter;
