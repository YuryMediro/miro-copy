import type { IdleViewState } from "../../model/viewState";
import type { ViewModelParams } from "../viewModelParams";
import type { ViewModel } from "../viewModelType";

export function useIdleViewModel({
  nodesModel,
  viewStateModel,
}: ViewModelParams) {
  return (idleState: IdleViewState): ViewModel => ({
    layout: {
      onKeyDown: (e) => {
        if (e.key === "s") {
          viewStateModel.goToAddSticker();
        }
      },
    },
    nodes: nodesModel.nodes.map((node) => ({
      ...node,
      isSelected: idleState.selectedIds.has(node.id),
      onClick: (e) => {
        if (e.ctrlKey || e.shiftKey) {
          viewStateModel.selection([node.id], "toggle");
        } else {
          viewStateModel.selection([node.id], "replace");
        }
      },
    })),
    actions: {
      addSticker: {
        onClick: () => {
          viewStateModel.goToAddSticker();
        },
        isActive: false,
      },
    },
    overlay: {
      onClick() {
        viewStateModel.selection([], "replace");
      },
    },
  });
}
