"use client";

import { useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  const languages = [
    { code: "en", label: "English" },
    { code: "ar", label: "العربية" },
  ];

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-400 border-0 hover:from-blue-600 hover:to-teal-500 transition-color duration-1000 ease-in-out"
          aria-label="Select language"
        >
          <Globe className="h-5 w-5 text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-32">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className={`flex items-center cursor-pointer ${
              language === lang.code ? "bg-slate-100 font-medium" : ""
            }`}
            onClick={() => {
              // @ts-expect-error: .code type error
              setLanguage(lang.code);
              setOpen(false);
            }}
          >
            <span className="mr-2">{language === lang.code ? "✓" : ""}</span>
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
