"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { trackResumeAssistantEvent } from "@/lib/analytics";

const ResumeAssistantPanel = dynamic(
  () => import("./resume-assistant-panel").then((module) => module.ResumeAssistantPanel),
  { ssr: false },
);

export function ResumeAssistantShell({ locale = "en" }: { locale?: "en" | "fa" }) {
  const [open, setOpen] = useState(false);
  const isFa = locale === "fa";

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    if (window.matchMedia("(max-width: 680px)").matches) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
    trackResumeAssistantEvent("agent_opened", { locale });
  };

  return (
    <div className={`resume-assistant-root ${open ? "is-open" : ""}`} dir={isFa ? "rtl" : "ltr"}>
      {!open && (
        <button
          className="resume-assistant-launcher"
          type="button"
          onClick={handleOpen}
          aria-label={isFa ? "باز کردن دستیار هوشمند رزومه" : "Open AI resume assistant"}
          aria-expanded={open}
          aria-controls="resume-assistant-dialog"
        >
          <span className="resume-assistant-launcher-icon" aria-hidden="true">
            <SparkIcon />
          </span>
          <span className="resume-assistant-launcher-copy">
            <strong>{isFa ? "از دستیار AI بپرس" : "Ask AminVost AI"}</strong>
            <small>{isFa ? "پروژه‌ها، مهارت‌ها، همکاری" : "Projects, skills, work"}</small>
          </span>
        </button>
      )}

      {open && <ResumeAssistantPanel locale={locale} onClose={() => setOpen(false)} />}
    </div>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.8c.65 4.4 2.8 6.55 7.2 7.2-4.4.65-6.55 2.8-7.2 7.2-.65-4.4-2.8-6.55-7.2-7.2 4.4-.65 6.55-2.8 7.2-7.2Z" />
      <path d="M18.4 15.2c.27 1.82 1.16 2.72 2.98 2.98-1.82.27-2.71 1.16-2.98 2.98-.27-1.82-1.16-2.71-2.98-2.98 1.82-.26 2.71-1.16 2.98-2.98Z" />
    </svg>
  );
}
