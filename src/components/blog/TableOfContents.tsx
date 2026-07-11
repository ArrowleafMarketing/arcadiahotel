"use client";

import { useState } from "react";

type TocItem = {
  id: string;
  label: string;
};

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [expanded, setExpanded] = useState(false);

  if (items.length === 0) return null;

  const visible = expanded ? items : items.slice(0, 4);

  return (
    <div className="hidden lg:block">
      <p className="text-[0.78rem] font-medium uppercase tracking-[0.18em] text-[#8a8a84]">
        In This Article
      </p>
      <div className="mt-4 h-px w-full bg-[#d6d1ca]" />
      <nav className="mt-4 space-y-1.5">
        {visible.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="block text-[0.98rem] leading-6 tracking-[-0.02em] text-[#6d7178] transition-colors hover:text-[#111111]"
          >
            {item.label}
          </a>
        ))}
      </nav>
      {items.length > 4 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 text-[0.85rem] font-medium tracking-[-0.01em] text-[#1f231f] transition-colors hover:text-[#111111]"
        >
          {expanded ? "Show less ↑" : `See ${items.length - 4} more ↓`}
        </button>
      )}
    </div>
  );
}
