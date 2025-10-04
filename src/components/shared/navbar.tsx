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
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ModeToggle from "../ui/mode-toggle";
import Link from "next/link";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";

export function Navbar() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useGetCurrentUser(setIsLoading);

  const handleSignOut = async () => {
    setIsLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    const data = await res.json();
    console.log(data);
  };

  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Courses",
      link: "/app/courses",
    },
  ];

  const privateLinks = [];
  if (user?.role === "User") {
    privateLinks.push({ name: "My Courses", link: "/dashboard/my-courses" });
  } else if (user?.role === "Admin") {
    privateLinks.push({
      name: "Manage Courses",
      link: "/dashboard/manage-courses",
    });
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

            {user && user.email ? (
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
                  <DropdownMenuSeparator />

                  {privateLinks.map((item) => (
                    <Link
                      key={item.link}
                      href={item.link}
                      className="cursor-pointer"
                    >
                      <DropdownMenuItem className="cursor-pointer">
                        {item.name}
                      </DropdownMenuItem>
                    </Link>
                  ))}
                  <DropdownMenuItem className="font-semibold flex-col items-start">
                    Signed as <br />{" "}
                    <p className="-mt-3 font-normal">{user.email}</p>
                  </DropdownMenuItem>

                  <Button
                    disabled={isLoading}
                    variant={"outline"}
                    size={"sm"}
                    onClick={handleSignOut}
                    className="w-full"
                  >
                    Sign out
                  </Button>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <NavbarButton variant="secondary" href="/app/sign-in">
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
              {user && user.email ? (
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

                  <Button
                    disabled={isLoading}
                    variant={"outline"}
                    size={"sm"}
                    onClick={handleSignOut}
                    className="w-full"
                  >
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
