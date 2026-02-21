'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    navItems: Array<{ href: string; label: string }>;
    activeSection: string;
    onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
    brandName: string;
    bookingLabel: string;
}

export default function MobileMenu({
    isOpen,
    onClose,
    navItems,
    activeSection,
    onNavClick,
    brandName,
    bookingLabel,
}: MobileMenuProps) {
    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <>
            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Mobile Menu Panel */}
            <div
                id="mobile-menu"
                className={`fixed top-0 right-0 h-full w-72 bg-white z-50 lg:hidden transform transition-transform duration-300 ease-out shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                aria-hidden={!isOpen}
            >
                <div className="flex flex-col h-full">
                    {/* Menu Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <span className="text-lg font-bold bg-gradient-to-r from-amber-600 via-[#fbbf5d] to-orange-600 bg-clip-text text-transparent">
                            {brandName}
                        </span>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-600 hover:text-amber-600 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Menu Items */}
                    <nav className="flex-1 py-4">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={(e) => onNavClick(e, item.href)}
                                className={`block px-6 py-3 font-medium transition-colors ${activeSection === item.href
                                    ? 'bg-amber-50 text-amber-600'
                                    : 'text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                                    }`}
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    {/* Menu Footer with CTA */}
                    <div className="p-4 border-t">
                        <a
                            href="#booking"
                            onClick={(e) => onNavClick(e, '#booking')}
                            className="block w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-full text-center hover:from-amber-600 hover:to-orange-600 transition-all"
                        >
                            {bookingLabel}
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
