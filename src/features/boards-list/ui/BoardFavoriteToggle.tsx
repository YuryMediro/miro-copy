import  { cn } from "@/shared/lib/css";
import { StarIcon } from "lucide-react";

interface BoardFavoriteToggleProps {
   isFavorite: boolean
   isFavoriteToggle: () => void; 
   className?: string;
   disabled?: boolean;
}
export default function BoardFavoriteToggle({isFavorite, isFavoriteToggle,className,disabled = false}:BoardFavoriteToggleProps) {
  return (
    <button onClick={isFavoriteToggle} disabled={disabled} className={cn( 'p-1 rounded-full hover:bg-gray-100 transition-colors', disabled && 'opacity-50 cursor-not-allowed', className)} >
        <StarIcon className={cn('w-5 h-5', isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400',  )}/>
    </button>
  )
}
