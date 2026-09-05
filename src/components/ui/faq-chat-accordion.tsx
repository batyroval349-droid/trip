"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCheck, CheckCircle2, MessageCircle, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  timeClient?: string;
  timeFounder?: string;
}

export interface FaqChatProps {
  data: FAQItem[];
  className?: string;
  headerTitle?: string;
  headerSubtitle?: string;
  dateBadge?: string;
  expandAllText?: string;
  collapseAllText?: string;
}

export function FaqAccordion({
  data,
  className,
  headerTitle = "Основатель Indochine Remote",
  headerSubtitle = "В сети • Отвечает на вопросы о поездке и релокации",
  dateBadge = "Сегодня",
  expandAllText = "Показать все ответы",
  collapseAllText = "Свернуть ответы",
}: FaqChatProps) {
  // Default open the first two items
  const [openItems, setOpenItems] = React.useState<number[]>([1, 2]);
  const [allExpanded, setAllExpanded] = React.useState<boolean>(false);

  const toggleItem = (id: number) => {
    if (openItems.includes(id)) {
      setOpenItems(openItems.filter((item) => item !== id));
    } else {
      setOpenItems([...openItems, id]);
    }
  };

  const handleToggleAll = () => {
    if (allExpanded) {
      setOpenItems([]);
      setAllExpanded(false);
    } else {
      setOpenItems(data.map((item) => item.id));
      setAllExpanded(true);
    }
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--border-subtle)] bg-[#FAF8F5] shadow-lg overflow-hidden",
        className
      )}
    >
      {/* Messenger Chat Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-[#FFFFFF] border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3">
          <div className="relative flex size-11 items-center justify-center rounded-full bg-[var(--accent-emerald)] text-white font-bold text-lg shadow-sm">
            <span>IR</span>
            <span className="absolute bottom-0 right-0 size-3.5 rounded-full border-2 border-white bg-emerald-500" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold text-[var(--text-main)] text-base">
              <span>{headerTitle}</span>
              <CheckCircle2 className="size-4 text-[var(--accent-emerald)]" />
            </div>
            <div className="text-xs text-[var(--text-muted)] flex items-center gap-1.5">
              <span className="inline-block size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{headerSubtitle}</span>
            </div>
          </div>
        </div>

        {/* Quick action to expand/collapse all message replies */}
        <button
          onClick={handleToggleAll}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[var(--accent-emerald)] bg-[rgba(15,118,110,0.08)] hover:bg-[rgba(15,118,110,0.15)] rounded-lg transition-colors border-none cursor-pointer"
        >
          {allExpanded ? <EyeOff size={14} /> : <Eye size={14} />}
          <span>{allExpanded ? collapseAllText : expandAllText}</span>
        </button>
      </div>

      {/* Date badge */}
      <div className="flex justify-center my-4">
        <span className="px-3 py-1 rounded-full text-xs font-medium text-[var(--text-muted)] bg-[rgba(0,0,0,0.05)]">
          {dateBadge}
        </span>
      </div>

      {/* Chat Messages Feed */}
      <div className="px-4 sm:px-6 pb-6 flex flex-col gap-5">
        {data.map((item, index) => {
          const isOpen = openItems.includes(item.id);
          const clientTime = item.timeClient || `10:${10 + index * 3}`;
          const founderTime = item.timeFounder || `10:${11 + index * 3}`;

          return (
            <div key={item.id} className="flex flex-col gap-2">
              
              {/* Client Question Message Bubble */}
              <div className="flex flex-col items-start max-w-[92%] sm:max-w-[85%]">
                <div
                  onClick={() => toggleItem(item.id)}
                  className={cn(
                    "group relative p-3.5 sm:p-4 rounded-2xl rounded-bl-sm border transition-all cursor-pointer select-none text-left shadow-sm",
                    isOpen
                      ? "bg-[#FFFFFF] border-[var(--accent-emerald)] shadow-md"
                      : "bg-[#FFFFFF] border-[var(--border-subtle)] hover:border-[var(--accent-emerald)]/50 hover:shadow"
                  )}
                >
                  <div className="flex items-center justify-between gap-4 mb-1 text-[11px] font-semibold text-[var(--text-muted)]">
                    <span className="flex items-center gap-1">
                      <MessageCircle className="size-3 text-[var(--accent-sand)]" />
                      <span>Вопрос клиента</span>
                    </span>
                    <span className="text-[var(--text-dim)] text-[10px]">{clientTime}</span>
                  </div>
                  <div className="text-[15px] sm:text-base font-medium text-[var(--text-main)] leading-snug">
                    {item.question}
                  </div>
                  
                  {!isOpen && (
                    <div className="mt-2 text-[11px] font-medium text-[var(--accent-emerald)] flex items-center gap-1 opacity-80 group-hover:opacity-100">
                      <span>Нажмите, чтобы прочитать ответ</span>
                      <span>&darr;</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Founder Answer Message Bubble (NO plus/minus, authentic chat message) */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -6, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="overflow-hidden flex flex-col items-start pl-4 sm:pl-8 max-w-[96%] sm:max-w-[88%]"
                  >
                    <div className="relative p-4 rounded-2xl rounded-tl-sm bg-[var(--accent-emerald)] text-white shadow-md text-left">
                      <div className="flex items-center justify-between gap-4 mb-1.5 text-[11px] font-bold text-emerald-100">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="size-3 text-emerald-200" />
                          <span>Основатель Indochine Remote</span>
                        </span>
                        <span className="text-emerald-200 text-[10px] flex items-center gap-1">
                          {founderTime}
                          <CheckCheck className="size-3.5 text-emerald-200" />
                        </span>
                      </div>
                      <p className="text-[14px] sm:text-[15px] leading-relaxed text-white/95 m-0 font-normal">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          );
        })}
      </div>
    </div>
  );
}
