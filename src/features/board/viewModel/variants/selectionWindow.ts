import type { ViewModelParams } from "../viewModelParams";
import type { ViewModel } from "../viewModelType";
import { goToIdle } from "./idle";

export type SelectionWindowViewSate = {
  type: "selection-window";
};

export function useSelectionWindowViewModel({
  nodesModel,
  setViewState,
  canvasRect,
}: ViewModelParams) {
  return (): ViewModel => {
    return {
      selectionWindow: {
        x: 0,
        y: 0,
        width: 100,
        height: 200,
      },
      nodes: nodesModel.nodes,
      window: {
        onMouseUp: () => {
          setViewState(goToIdle())
        }
      }
    };
  };
}

export function goToSelectionWindow(): SelectionWindowViewSate {
  return {
    type: "selection-window",
  };
}
