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
  filters,
  actions,
}: {
  sort?: React.ReactNode;
  filters?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <p className="text-sm text-gray-500">Filter by</p> {filters}
      </div>
      <div className="flex items-center gap-2">
        <p className="text-sm text-gray-500">Sort by</p> {sort}
      </div>
      {actions && <div className="ml-auto">{actions}</div>}
    </div>
  );
}
