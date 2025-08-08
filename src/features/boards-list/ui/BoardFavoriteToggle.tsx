import { cn } from "@/shared/lib/css";
import { StarIcon } from "lucide-react";
import toast from "react-hot-toast";

interface BoardFavoriteToggleProps {
  isFavorite: boolean;
  isFavoriteToggle: () => void;
  className?: string;
  disabled?: boolean;
}
export default function BoardFavoriteToggle({
  isFavorite,
  isFavoriteToggle,
  className,
  disabled = false,
}: BoardFavoriteToggleProps) {
  const handleClick = () => {
    try {
      isFavoriteToggle();
      toast.success(
        isFavorite
          ? "Доска удалена из избранного"
          : "Доска добавлена в избранное",
        {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          icon: isFavorite ? "⭐" : "🌟",
        },
      );
    } catch (error) {
      toast.error("Ошибка при добавлении в избранное", {
        style: {
          borderRadius: "10px",
          background: "#ff3333",
          color: "#fff",
        },

        icon: "❌",
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      <StarIcon
        className={cn(
          "w-5 h-5",
          isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-400",
        )}
      />
    </button>
  );
}
