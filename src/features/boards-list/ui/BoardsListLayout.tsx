export function BoardsListLayout({
  header,
  children,
  filters,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
  filters: React.ReactNode;
}) {
  return (
    <div className="container mx-auto p-4 flex flex-col gap-4">
      {header}
      {filters}
      {children}
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
        <p className="text-sm text-gray-500">Search by</p> {search}
      </div>
      <div className="flex items-center gap-2">
        <p className="text-sm text-gray-500">Sort by</p> {sort}
      </div>
      {actions && <div className="ml-auto">{actions}</div>}
    </div>
  );
}

export default function BoardsListLayoutContent({
  children,
  cursorRef,
  isPending,
  hasCursor,
  isPendingNext,
  isEmpty,
}: {
  children: React.ReactNode;
  cursorRef?: React.RefObject<HTMLDivElement>;
  isPending?: boolean;
  hasCursor?: boolean;
  isPendingNext?: boolean;
  isEmpty?: boolean;
}) {
  return (
    <div>
      {isPending && <div className="text-center py-10">Загрузка...</div>}

      {!isPending && children}

      {isEmpty && !isPending && (
        <div className="text-center py-10">Доски не найдены</div>
      )}

      {hasCursor && (
        <div ref={cursorRef} className="text-center py-8">
          {isPendingNext && "Загрузка дополнительных досок..."}
        </div>
      )}
    </div>
  );
}

export function BoardsListLayoutCards({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  );
}

export function BoardsListListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col gap-4">{children}</div>;
}
