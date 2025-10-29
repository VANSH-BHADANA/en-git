import { HelpCircle, Info } from "lucide-react";
import { Label } from "./ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function SettingWithTooltip({ label, tooltip, htmlFor, children, size = "default" }) {
  const IconComponent = size === "small" ? HelpCircle : Info;
  const iconSize = size === "small" ? "h-3 w-3" : "h-4 w-4";

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      <Tooltip>
        <TooltipTrigger asChild>
          <IconComponent className={`${iconSize} text-muted-foreground cursor-help`} />
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p>{tooltip}</p>
          {children}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
