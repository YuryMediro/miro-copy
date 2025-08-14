import { Skeleton } from "@/shared/ui/kit/skeleton";

export function BoardsListLayout({
  header,
  children,
  filters,
  sidebar,
  templates,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
  filters?: React.ReactNode;
  templates?: React.ReactNode;
  sidebar?: React.ReactNode;
}) {
  return (
    <div className="container mx-auto">
      <div className="flex gap-4">
        {sidebar}
        <div className="flex-1  p-4 flex flex-col gap-6">
          {templates && (
            <div className="rounded-md bg-gray-100 p-4">{templates}</div>
          )}
          {header}
          {filters}
          {children}
        </div>
      </div>
    </div>
  );
}

export function BoardsListLayoutHeader({
  title,
  actions,
  description,
}: {
  title: string;
  actions?: React.ReactNode;
  description?: string;
}) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && <p className="text-gray-500">{description}</p>}
      </div>
      {actions}
    </div>
  );
}

export function BoardsListLayoutFilters({
  sort,
  search,
  actions,
}: {
  sort?: React.ReactNode;
  search?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <p className="text-sm text-gray-500 whitespace-nowrap">Search by</p>{" "}
        {search}
      </div>
      <div className="flex items-center gap-2">
        <p className="text-sm text-gray-500 whitespace-nowrap">Sort by</p>{" "}
        {sort}
      </div>
      {actions && <div className="ml-auto">{actions}</div>}
    </div>
  );
}

export function BoardsListLayoutContent({
  children,
  cursorRef,
  isPending,
  hasCursor,
  isPendingNext,
  isEmpty,
  mode,
  renderList,
  renderGrid,
}: {
  children?: React.ReactNode;
  cursorRef?: React.Ref<HTMLDivElement>;
  isPending?: boolean;
  hasCursor?: boolean;
  isPendingNext?: boolean;
  isEmpty?: boolean;
  mode: "grid" | "list";
  renderList: () => React.ReactNode;
  renderGrid: () => React.ReactNode;
}) {
  return (
    <div>
      {isPending && <div className="text-center py-10">Загрузка...</div>}
      {mode === "list" && (
        <div className="flex flex-col gap-4">{renderList()}</div>
      )}
      {mode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {renderGrid()}
        </div>
      )}
      {!isPending && children}

      {isEmpty && !isPending && (
        <div className="text-center py-10">Доски не найдены</div>
      )}

      {hasCursor && (
        <div ref={cursorRef} className="text-center py-8">
          {isPendingNext &&
            {
              list: (
                <div className="flex flex-col gap-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ),
              grid: (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Skeleton className="h-40 w-full" />
                  <Skeleton className="h-40 w-full" />
                  <Skeleton className="h-40 w-full" />
                </div>
              ),
            }[mode]}
        </div>
      )}
    </div>
  );
}
