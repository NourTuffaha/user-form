"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "./LanguageSwitcher";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="dark:bg-gray-800 bg-secondary shadow-lg dark:shadow-md shadow-main/50 dark:shadow-sec/50 sticky top-0 h-[var(--main-header-height)] z-50">
      <div className="container mx-auto px-4 py-4 md:py-6 flex items-center">
        <Link
          href="/"
          className="flex items-center space-x-2 transition-transform duration-200 hover:scale-105 mr-auto"
        >
          <Image
            src="/images/ph.jpg"
            alt="Medical Center Logo"
            width={100}
            height={100}
            className="w-10 h-10 md:w-[69px] md:h-[69px]"
          />
          <span className="text-xl md:text-2xl font-bold text-primary">
            Lorem Ipsum
          </span>
        </Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-6 justify-end h-6 items-center">
            <DesktopNavItems />
            <Separator orientation="vertical" />
            <LanguageSwitcher />
          </ul>
        </nav>
        <div className="flex items-center space-x-4 h-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetTitle className="text-xl font-bold mb-6">Menu</SheetTitle>
              <nav className="flex flex-col space-y-2">
                <MobileNavItems closeSheet={() => setOpen(false)} />
              </nav>
              <div className="mt-8 pt-4 border-t">
                <LanguageSwitcher />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

const DesktopNavItems = () => {
  const pathname = usePathname();
  const navItems = [
    { href: "/ ", label: "Lorem" },
    { href: "/ ", label: "Ipsum" },
    { href: "/ ", label: "Merol" },
    { href: "/ ", label: "Muspi" },
  ];

  return (
    <>
      {navItems.map((item) => (
        <li key={item.label}>
          <Link
            href={item.href}
            className={`text-foreground dark:hover:text-secondary dark:hover:bg-primary hover:bg-primary hover:text-background hover:p-1 rounded transition-all duration-500 ease-in-out relative group ${
              pathname === item.href ? "text-primary" : ""
            }`}
          >
            {item.label}
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-sec scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out" />
          </Link>
        </li>
      ))}
    </>
  );
};

const MobileNavItems = ({ closeSheet }: { closeSheet: () => void }) => {
  const pathname = usePathname();
  const navItems = [
    { href: "/ ", label: "Lorem" },
    { href: "/ ", label: "Ipsum" },
    { href: "/ ", label: "Merol" },
    { href: "/ ", label: "Muspi" },
  ];

  return (
    <>
      {navItems.map((item) => (
        <Button
          key={item.label}
          variant={pathname === item.href ? "default" : "ghost"}
          className="w-full justify-start text-lg py-6 h-auto"
          asChild
        >
          <Link href={item.href} onClick={closeSheet}>
            {item.label}
          </Link>
        </Button>
      ))}
    </>
  );
};

export default Header;
