"use client";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
  NavbarLogo,
  NavBody,
  NavItems,
  Navbar as ShadNavbar,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import ModeToggle from "../mode-toggle";

export function Navbar() {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Courses",
      link: "/courses",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <ShadNavbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <ModeToggle />
            <NavbarButton variant="secondary">Login</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <div className="flex items-center justify-end gap-3">
              <ModeToggle />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </ShadNavbar>
    </div>
  );
}
