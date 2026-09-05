"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface FaqAccordionProps {
  data: FAQItem[];
  className?: string;
  timestamp?: string;
}

export function FaqAccordion({
  data,
  className,
  timestamp,
}: FaqAccordionProps) {
  const [openId, setOpenId] = React.useState<number | null>(1);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className={cn("flex flex-col gap-3.5 w-full", className)}>
      {timestamp && (
        <div className="mb-2 text-xs sm:text-sm font-medium text-[var(--text-muted)] text-center">
          {timestamp}
        </div>
      )}

      {data.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div key={item.id} className="flex flex-col w-full">
            {/* Question Chat Bubble (Без серой рамки!) */}
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className={cn(
                "flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 transition-all duration-200 text-left border-none cursor-pointer select-none",
                isOpen
                  ? "bg-[rgba(15,118,110,0.12)] text-[var(--accent-emerald)] shadow-sm"
                  : "bg-white hover:bg-[rgba(15,118,110,0.05)] text-[var(--text-main)] shadow-sm"
              )}
              style={{
                outline: "none",
                border: "none", // Без серой рамки!
              }}
            >
              <span className="font-semibold text-base sm:text-lg leading-snug">
                {item.question}
              </span>

              {/* + and - toggle icon without any gray frame or button */}
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full transition-colors",
                  isOpen
                    ? "text-[var(--accent-emerald)]"
                    : "text-[var(--text-muted)] group-hover:text-[var(--accent-emerald)]"
                )}
              >
                {isOpen ? (
                  <Minus className="size-5 stroke-[2.5]" />
                ) : (
                  <Plus className="size-5 stroke-[2.5]" />
                )}
              </span>
            </button>

            {/* Answer Chat Bubble underneath */}
            <motion.div
              initial="collapsed"
              animate={isOpen ? "open" : "collapsed"}
              variants={{
                open: { opacity: 1, height: "auto", marginTop: 8 },
                collapsed: { opacity: 0, height: 0, marginTop: 0 },
              }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="ml-3 sm:ml-8 mr-1">
                <div
                  className="rounded-2xl bg-[var(--accent-emerald)] text-white px-5 py-3.5 text-sm sm:text-base leading-relaxed shadow-md text-left border-none font-normal"
                  style={{
                    border: "none", // Без серой рамки!
                  }}
                >
                  {item.answer}
                </div>
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
