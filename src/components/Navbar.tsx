import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'المميزات', href: '#features' },
    { label: 'كيف يعمل', href: '#how-it-works' },
    { label: 'الأسعار', href: '#pricing' },
    { label: 'قصص النجاح', href: '#success-stories' },
    { label: 'المدونة', href: '#blog' },
    { label: 'من نحن', href: '#about' },
    { label: 'تواصل معنا', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-gray-200/50' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-orange-500/30">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-black text-gray-900">
              Claw<span className="text-orange-500">Commerce</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-600 hover:text-orange-500 transition-colors font-medium text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors font-semibold">
              تسجيل الدخول
            </a>
            <a href="#" className="btn-primary text-sm py-2.5 px-5">
              ابدأ مجاناً
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
        isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-white border-t border-gray-100 px-4 py-6">
          <div className="space-y-1">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
            <a href="#" className="block w-full py-3 text-center text-gray-700 hover:text-orange-600 font-semibold">
              تسجيل الدخول
            </a>
            <a href="#" className="btn-primary block text-center">
              ابدأ مجاناً
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
