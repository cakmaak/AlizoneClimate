import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const ChevronDown = ({ className = "" }) => (
  <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const ChevronRight = ({ className = "" }) => (
  <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default function Navbar({ variant = "default" }) {
  const dropdownContainerRef = useRef(null);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isKlimaOpen, setIsKlimaOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileKlimaOpen, setMobileKlimaOpen] = useState(false);

  // Close all dropdowns when clicking outside
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleClickOutside = (event) => {
      if (dropdownContainerRef.current && !dropdownContainerRef.current.contains(event.target)) {
        setIsProductsOpen(false);
        setIsKlimaOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isHero = variant === "hero";
  const headerBg = isHero ? "bg-transparent" : "bg-white/90 backdrop-blur shadow-sm";
  const linkBase = isHero ? "text-white hover:text-emerald-200" : "text-gray-800 hover:text-emerald-600";

  const links = [
    { href: "/", label: "Anasayfa" },
    { href: "/references", label: "Referanslarımız" },
    { href: "/about", label: "Hakkımızda" },
    { href: "/contact", label: "İletişim" }
  ];

  const klimaMenuItems = [
    { href: "/products?type=split", label: "Split Klimalar" },
    { href: "/products?type=multi-split", label: "Multi Split Klimalar" },
    { href: "/products?type=mobile", label: "Mobil Klimalar" },
    { href: "/products?type=ticari", label: "Ticari Klimalar" }
  ];

  const productMenuItems = [
    { 
      type: 'dropdown', 
      label: 'Klimalar', 
      items: klimaMenuItems 
    },
    { 
      href: "/product/isi-pompasi", 
      label: "Isı Pompası" 
    }
  ];

  const closeAllMenus = () => {
    setIsProductsOpen(false);
    setIsKlimaOpen(false);
    setMobileMenuOpen(false);
    setMobileProductsOpen(false);
    setMobileKlimaOpen(false);
  };

  const handleLinkClick = () => {
    closeAllMenus();
  };

  return (
    <header className={`sticky top-0 z-30 ${headerBg}`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center">
          {/* DESKTOP */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map(link => (
              <Link key={link.href} href={link.href} className={`${linkBase} text-sm font-medium`}>
                {link.label}
              </Link>
            ))}

            {/* ÜRÜNLER */}
            <div 
              className="relative"
              ref={dropdownContainerRef}
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => {
                // Add a small delay to allow clicking on the dropdown
                setTimeout(() => {
                  if (!document.querySelector('.dropdown-menu:hover')) {
                    setIsProductsOpen(false);
                    setIsKlimaOpen(false);
                  }
                }, 200);
              }}
            >
              <button 
                type="button" 
                className={`${linkBase} flex items-center gap-1`}
                onClick={() => setIsProductsOpen(!isProductsOpen)}
              >
                Ürünler <ChevronDown className={`transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProductsOpen && (
                <div 
                  className="dropdown-menu absolute left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                  onMouseEnter={() => setIsProductsOpen(true)}
                  onMouseLeave={() => {
                    setIsProductsOpen(false);
                    setIsKlimaOpen(false);
                  }}
                >
                  {productMenuItems.map((item, index) => (
                    <div key={index} className="relative">
                      {item.type === 'dropdown' ? (
                        <div
                          className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                          onMouseEnter={() => setIsKlimaOpen(true)}
                        >
                          <span>{item.label}</span>
                          <ChevronRight />
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={handleLinkClick}
                        >
                          {item.label}
                        </Link>
                      )}
                      
                      {isKlimaOpen && item.type === 'dropdown' && (
                        <div 
                          className="absolute left-full top-0 ml-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                          onMouseEnter={() => setIsKlimaOpen(true)}
                          onMouseLeave={() => setIsKlimaOpen(false)}
                        >
                          {item.items.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={handleLinkClick}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* MOBILE */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div 
            className="md:hidden mt-2 bg-white rounded-lg shadow-xl p-4 absolute left-4 right-4 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="space-y-2">
              {links.map(link => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-50 rounded-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="border-t border-gray-100 pt-2 mt-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setMobileProductsOpen(!mobileProductsOpen);
                  }} 
                  className="w-full text-left px-4 py-2 font-semibold text-gray-700 flex items-center justify-between"
                >
                  <span>Ürünler</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`} />
                </button>

                {mobileProductsOpen && (
                  <div className="mt-1 space-y-1">
                    <div className="pl-4">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setMobileKlimaOpen(!mobileKlimaOpen);
                        }} 
                        className="w-full text-left py-2 px-2 text-gray-600 flex items-center justify-between"
                      >
                        <span>Klimalar</span>
                        <ChevronRight className={`w-4 h-4 transition-transform ${mobileKlimaOpen ? 'rotate-90' : ''}`} />
                      </button>

                      {mobileKlimaOpen && (
                        <div className="pl-4 space-y-1">
                          {klimaMenuItems.map(item => (
                            <Link 
                              key={item.href} 
                              href={item.href} 
                              className="block py-2 px-2 text-sm text-gray-600 hover:bg-gray-50 rounded"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                    <Link 
                      href="/product/isi-pompasi" 
                      className="block px-6 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Isı Pompası
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </nav>
    </header>
  );
}