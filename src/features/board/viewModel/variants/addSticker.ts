import type { ViewModel, ViewModelParams } from "../useViewModel";

export function useAddStickerViewModel({
  nodesModel,
  viewStateModel,
  canvasRect
}: ViewModelParams) {
  return (): ViewModel => ({
    layout: {
      onKeyDown: (e) => {
        if (e.key === "Escape") {
          viewStateModel.goToIdle();
        }
      },
    },
    canvas: {
      onClick: (e) => {
        if (!canvasRect) return;
        nodesModel.addSticker({
          text: "Default",
          x: e.clientX - canvasRect.x,
          y: e.clientY - canvasRect.y,
        });
        viewStateModel.goToIdle();
      },
    },
    nodes: nodesModel.nodes,
    actions: {
      addSticker: {
        onClick: () => {
          viewStateModel.goToIdle();
        },
        isActive: true,
      },
    },
  });
}
