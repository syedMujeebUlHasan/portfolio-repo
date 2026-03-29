function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white/70 backdrop-blur-md shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo / Brand */}
        <h1 className="text-xl font-bold text-gray-800">MyPortfolio</h1>

        {/* Menu */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <li className="hover:text-black cursor-pointer transition">Home</li>
          <li className="hover:text-black cursor-pointer transition">
            Projects
          </li>
          <li className="hover:text-black cursor-pointer transition">Skills</li>
          <li className="hover:text-black cursor-pointer transition">
            Contact
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-gray-700 cursor-pointer">☰</div>
      </div>
    </nav>
  );
}

export default Navbar;
