import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/kit/select";
import type { BoardsSortOption } from "./model/useBoardsFilter";

interface BoardsSortFilter {
  value: string;
  onValueChange: (value: BoardsSortOption) => void;
}

export default function BoardsSortFilter({
  value,
  onValueChange,
}: BoardsSortFilter) {
  return (
    <div className="flex flex-col">
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger id="sort" className="w-full">
          <SelectValue placeholder="Сортировка" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="lastOpenedAt">По дате открытия</SelectItem>
          <SelectItem value="createdAt">По дате создания</SelectItem>
          <SelectItem value="updatedAt">По дате обновления</SelectItem>
          <SelectItem value="name">По имени</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
