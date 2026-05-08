import Link from "next/link";
import { Sparkles } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">我的博客</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-6">
              <Link
                href="/"
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                首页
              </Link>
              <Link
                href="/archive/"
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                归档
              </Link>
            </nav>
            <ThemeToggle />
          </div>

          <div className="md:hidden">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
