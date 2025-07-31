import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/kit/tabs";
import { LayoutGrid, ListIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/ui/kit/tooltip";

export default function ViewToggleList() {
  return (
    <Tabs defaultValue="all" className="mb-6">
      <TabsList>
        <Tooltip>
          <TooltipTrigger>
            <TabsTrigger value="list">
              <ListIcon />
            </TabsTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>List view</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
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
