import type { CanvasRect } from "../hooks/useCanvasRect";
import type { NodesModel } from "../model/nodes";
import type { ViewStateModel } from "../model/viewState";

export type ViewModelParams = {
  nodesModel: NodesModel;
  viewStateModel: ViewStateModel;
  canvasRect: CanvasRect | undefined;
};
