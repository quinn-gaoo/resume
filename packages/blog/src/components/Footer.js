import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-foreground">学习笔记</span>
          </div>
          <p className="text-sm text-muted-foreground">
            持续学习，不断进步。
            <br />© {new Date().getFullYear()} 学习笔记. Built with{" "}
            <span className="text-primary font-medium">Next.js</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
