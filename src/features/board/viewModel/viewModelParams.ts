import type { Dispatch, SetStateAction } from "react";
import type { CanvasRect } from "../hooks/useCanvasRect";
import type { NodesModel } from "../model/nodes";
import type { ViewState } from "./useViewModel";

export type ViewModelParams = {
  setViewState: Dispatch<SetStateAction<ViewState>>;
  nodesModel: NodesModel;
  canvasRect: CanvasRect | undefined;
};
