import type { ViewModelParams } from "../viewModelParams";
import type { ViewModel } from "../viewModelType";
import { goToIdle } from "./idle";

export type AddStickerViewSate = {
  type: "add-sticker";
};

export function useAddStickerViewModel({
  nodesModel,
  setViewState,
  canvasRect,
}: ViewModelParams) {
  return (): ViewModel => ({
    layout: {
      onKeyDown: (e) => {
        if (e.key === "Escape") {
          setViewState(goToIdle());
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
        setViewState(goToIdle());
      },
    },
    nodes: nodesModel.nodes,
    actions: {
      addSticker: {
        onClick: () => {
          setViewState(goToIdle());
        },
        isActive: true,
      },
    },
  });
}

export function goToAddSticker(): AddStickerViewSate {
  return {
    type: 'add-sticker'
  };
}

