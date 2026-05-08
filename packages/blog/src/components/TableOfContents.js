import { useState, useEffect } from "react";
import { List } from "lucide-react";

export default function TableOfContents({ headings }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (!headings || headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      },
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  if (!headings || headings.length === 0) {
    return null;
  }

  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveId(id);
    }
  };

  const getIndentClass = (level) => {
    switch (level) {
      case 2:
        return "pl-0";
      case 3:
        return "pl-4";
      case 4:
        return "pl-8";
      default:
        return "pl-0";
    }
  };

  return (
    <div className="sticky top-24 bg-card rounded-xl border border-border p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
        <List className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">目录</h3>
      </div>
      <nav className="space-y-1">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={(e) => handleClick(e, heading.id)}
            className={`block text-sm py-1.5 px-2 rounded-md transition-colors ${getIndentClass(
              heading.level,
            )} ${
              activeId === heading.id
                ? "text-primary bg-primary/10 font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            }`}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
