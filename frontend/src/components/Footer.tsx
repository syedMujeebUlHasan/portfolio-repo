function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-4">
      <div className="text-center text-sm">
        © {new Date().getFullYear()} MyPortfolio • Built with React & Three.js
      </div>
    </footer>
  );
}

export default Footer;
