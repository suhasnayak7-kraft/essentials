import { useEffect, useRef, useState } from "react"
import useMeasure from "react-use-measure"
import { AnimatePresence, motion, MotionConfig } from "motion/react"
import { Megaphone, Sparkles, Wrench, X } from "lucide-react"

import { cn } from "../../lib/utils"
import { useClickOutside } from "../../hooks/useClickOutside"
import { springPanel } from "../../lib/motion"

export interface AnnouncementItem {
  id: string
  title: string
  body: string
  tone?: "info" | "warning"
}

const toneStyles = {
  info: "bg-primary/5 text-primary border-primary/15 hover:bg-primary/10",
  warning: "bg-warning-muted text-warning-foreground border-warning/20 hover:bg-warning-muted/80",
}

const defaultItems: AnnouncementItem[] = [
  {
    id: "1",
    title: "New Feature: Advanced Analytics",
    body: "Check out the new interactive charts and deep-dive reporting tools.",
    tone: "info",
  },
  {
    id: "2",
    title: "Scheduled System Downtime",
    body: "Maintenance this Sunday from 2:00 AM to 4:00 AM EST.",
    tone: "warning",
  },
]

/**
 * Expandable announcement panel with spring animation.
 * Example pattern combining motion + useMeasure + useClickOutside.
 */
export function AnnouncementMic({
  position = "left",
  items = defaultItems,
}: {
  position?: "left" | "right"
  items?: AnnouncementItem[]
}) {
  const [contentRef, { height: heightContent }] = useMeasure()
  const [menuRef, { width: widthContainer }] = useMeasure()
  const ref = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [maxWidth, setMaxWidth] = useState(0)

  useClickOutside(ref, () => setIsOpen(false))

  useEffect(() => {
    if (!widthContainer || maxWidth > 0) return
    setMaxWidth(widthContainer)
  }, [widthContainer, maxWidth])

  return (
    <MotionConfig transition={springPanel}>
      <div
        className={cn(
          "absolute top-0 z-50",
          position === "left" ? "-left-14 xl:-left-16" : "-right-14 xl:-right-16"
        )}
        ref={ref}
      >
        <div className="h-full w-full rounded-2xl border border-border bg-card shadow-lg overflow-hidden">
          <div
            className={cn("flex p-1.5", position === "right" && !isOpen && "justify-end")}
            ref={menuRef}
          >
            <button
              aria-label="Announcements"
              type="button"
              className={cn(
                "relative flex h-11 shrink-0 items-center rounded-xl text-muted-foreground transition-all hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
                isOpen ? "w-full justify-between px-3 text-foreground" : "w-11 justify-center"
              )}
              onClick={() => setIsOpen((v) => !v)}
            >
              <div className="flex items-center gap-2">
                <Megaphone className={cn("h-5 w-5", isOpen && "text-primary")} />
                {isOpen && <span className="font-bold text-[15px]">Announcements</span>}
              </div>
              {!isOpen && (
                <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-danger rounded-full border-2 border-card" />
              )}
              {isOpen && <X size={16} className="text-muted-foreground hover:text-foreground" />}
            </button>
          </div>
          <div className="overflow-hidden">
            <AnimatePresence initial={false} mode="sync">
              {isOpen ? (
                <motion.div
                  key="content"
                  initial={{ height: 0 }}
                  animate={{ height: heightContent || 0 }}
                  exit={{ height: 0 }}
                  style={{ width: maxWidth > 320 ? maxWidth : 320 }}
                >
                  <div ref={contentRef} className="p-4 pt-0">
                    <div className="space-y-3 border-t pt-4">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className={cn(
                            "p-3 rounded-lg text-sm border transition-colors cursor-pointer",
                            toneStyles[item.tone ?? "info"]
                          )}
                        >
                          <strong className="flex items-center gap-1.5 mb-1.5">
                            {item.tone === "warning" ? (
                              <Wrench className="w-3.5 h-3.5" />
                            ) : (
                              <Sparkles className="w-3.5 h-3.5" />
                            )}
                            {item.title}
                          </strong>
                          {item.body}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </MotionConfig>
  )
}
