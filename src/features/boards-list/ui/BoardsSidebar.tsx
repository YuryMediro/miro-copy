import { cn } from "@/shared/lib/css";
import { Button } from "@/shared/ui/kit/button";
import { ClockIcon, LayoutGridIcon, StarIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface BoardsSidebarProps {
  className?: string;
}

export default function BoardsSidebar({className}:BoardsSidebarProps) {
  return (
    <div className={cn('w-64 border-r p-4 space-y-4',className )}>
      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-500 px-2">Навигация</div>
          <Button variant='ghost' className="w-full justify-start" asChild>
            <Link to={'/boards'}>
                <LayoutGridIcon className="mr-2 h-4 w-4"/>
                Все доски 
            </Link>
          </Button>
          <Button variant='ghost' className="w-full justify-start" asChild>
            <Link to={'/boards/favorite'}>
                <StarIcon className="mr-2 h-4 w-4"/>
                Избранное 
            </Link>
          </Button>
          <Button variant='ghost' className="w-full justify-start" asChild>
            <Link to={'/boards/recent'}>
                <ClockIcon className="mr-2 h-4 w-4"/>
                Недавние
            </Link>
          </Button>
      </div>
    </div>
  );
}
