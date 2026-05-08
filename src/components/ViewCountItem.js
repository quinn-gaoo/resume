import { Eye } from "lucide-react";
import { useViewCounts } from "@/context/ViewContext";

export default function ViewCountItem({ slug, className = "" }) {
  const { views } = useViewCounts(slug);

  if (views === null) {
    return null;
  }

  return (
    <span className={`flex items-center gap-1 text-xs text-muted-foreground ${className}`}>
      <Eye className="w-3 h-3" />
      <span>{views?.toLocaleString() || 0}</span>
    </span>
  );
}
