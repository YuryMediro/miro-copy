import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/kit/tabs";
import { LayoutGrid, ListIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/ui/kit/tooltip";

export type ViewMode = "list" | "grid";

export default function ViewToggleList({
  value,
  onChange,
}: {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}) {
  return (
    <Tabs
      defaultValue={value}
      onValueChange={(e) => onChange(e as ViewMode)}
      className="mb-6"
    >
      <TabsList>
        <Tooltip>
          <TooltipTrigger asChild>
            <TabsTrigger value="list">
              <ListIcon />
            </TabsTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>List view</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <TabsTrigger value="grid">
              <LayoutGrid />
            </TabsTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Grid view</p>
          </TooltipContent>
        </Tooltip>
      </TabsList>
    </Tabs>
  );
}
