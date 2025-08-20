import type { CanvasRect } from "../hooks/useCanvasRect";
import type { NodesModel } from "../model/nodes";
import type { ViewStateModel } from "../model/viewState";
import { useAddStickerViewModel } from "./variants/addSticker";
import { useIdleViewModel } from "./variants/idle";

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
};

export type ViewModelParams = {
  nodesModel: NodesModel;
  viewStateModel: ViewStateModel;
  canvasRect: CanvasRect | undefined;
};

export function useViewModel(params: ViewModelParams) {
  let viewModel: ViewModel;

  const addStickerViewModel = useAddStickerViewModel(params);
  const idleViewModel = useIdleViewModel(params);

  switch (params.viewStateModel.viewState.type) {
    case "add-sticker":
      viewModel = addStickerViewModel();
      break;
    case "idle":
      viewModel = idleViewModel(params.viewStateModel.viewState);
      break;
    default:
      throw new Error("Unknown view state");
  }
  return viewModel;
}
