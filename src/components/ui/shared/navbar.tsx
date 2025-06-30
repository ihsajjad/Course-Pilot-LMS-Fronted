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
import { useAppSelector } from "@/lib/redux";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "../dropdown-menu";
import ModeToggle from "../mode-toggle";

export function Navbar() {
  const { user } = useAppSelector((state) => state.authSlice);
  console.log(user);

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

  let dropdownItems: { name: string; link: string }[] = [];
  if (user?.role === "User") {
    navItems.push({ name: "My Courses", link: "/my-courses" });
  } else if (user?.role === "Admin") {
    navItems.push({ name: "All Courses", link: "/all-courses" });
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full">
      <ShadNavbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <ModeToggle />

            {user.email ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="h-[30px] w-[30px] rounded-full overflow-hidden border-2 border-primary"
                    aria-label="User menu"
                  >
                    <Image
                      src={user.profile || "/default-user.webp"}
                      alt={user.name}
                      width={30}
                      height={30}
                    />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent side="bottom" align="end" className="w-52">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <Button variant={"outline"} size={"sm"} className="w-full">
                    Sign out
                  </Button>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <NavbarButton variant="secondary" href="/sign-in">
                Sign in
              </NavbarButton>
            )}
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
              {user.email ? (
                <>
                  <div className="flex items-center gap-2">
                    <Image
                      src={user.profile || "/default-user.webp"}
                      alt={user.name}
                      width={30}
                      height={30}
                      className="rounded-full border border-primary h-[30px] w-[30px]"
                    />

                    <div className="font-semibold">
                      Signed as <br />{" "}
                      <p className="-mt-2 font-normal">{user.email}</p>
                    </div>
                  </div>

                  <Button variant={"outline"} size={"sm"} className="w-full">
                    Sign out
                  </Button>
                </>
              ) : (
                <NavbarButton
                  href="/sign-in"
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full"
                >
                  Sign in
                </NavbarButton>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </ShadNavbar>
    </div>
  );
}
