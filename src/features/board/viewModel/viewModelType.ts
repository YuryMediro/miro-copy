type ViewModelNode = {
  id: string;
  text: string;
  x: number;
  y: number;
  isSelected?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export type ViewModel = {
  layout?: {
    onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  };
  canvas?: {
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  };
  nodes: ViewModelNode[];
  actions?: {
    addSticker?: {
      onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
      isActive?: boolean;
    };
  };
  overlay?: {
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onMouseUp?: (e: React.MouseEvent<HTMLDivElement>) => void;
  };
};
