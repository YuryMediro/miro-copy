import { distanceFroPoints } from "../../domain/point";
import { selectItems, type SelectionModifier } from "../../domain/selection";
import type { CanvasRect } from "../../hooks/useCanvasRect";
import type { ViewModelParams } from "../viewModelParams";
import type { ViewModel } from "../viewModelType";
import { goToAddSticker } from "./addSticker";
import { goToSelectionWindow } from "./selectionWindow";

export type IdleViewState = {
  type: "idle";
  selectedIds: Set<string>;
  mouseDown?: {
    x: number;
    y: number;
  };
};

export function useIdleViewModel({
  nodesModel,
  setViewState,
  canvasRect,
}: ViewModelParams) {
  const select = (
    lastState: IdleViewState,
    ids: string[],
    modif: SelectionModifier,
  ) => {
    setViewState({
      ...lastState,
      selectedIds: selectItems(lastState.selectedIds, ids, modif),
    });
  };

  return (idleState: IdleViewState): ViewModel => ({
    layout: {
      onKeyDown: (e) => {
        if (e.key === "s") {
          setViewState(goToAddSticker());
        }
      },
    },
    nodes: nodesModel.nodes.map((node) => ({
      ...node,
      isSelected: idleState.selectedIds.has(node.id),
      onClick: (e) => {
        if (e.ctrlKey || e.shiftKey) {
          select(idleState, [node.id], "toggle");
        } else {
          select(idleState, [node.id], "replace");
        }
      },
    })),
    actions: {
      addSticker: {
        onClick: () => {
          setViewState(goToAddSticker());
        },
        isActive: false,
      },
    },
    overlay: {
      onClick() {
        select(idleState, [], "replace");
      },
      onMouseDown: (e) => {
        if (!canvasRect) return;
        setViewState({
          ...idleState,
          mouseDown: {
            x: e.clientX,
            y: e.clientY,
          },
        });
      },
    },
    window: {
      onMouseMove(e) {
        if (idleState.mouseDown) {
          const currentPoint = {
            x: e.clientX,
            y: e.clientY,
          };

          if (distanceFroPoints(idleState.mouseDown, currentPoint) > 5) {
            setViewState(goToSelectionWindow());
          }
        }
      },
      onMouseUp() {
        setViewState({
          ...idleState,
          mouseDown: undefined,
        });
      },
    },
  });
}

export function goToIdle(): IdleViewState {
  return {
    type: "idle",
    selectedIds: new Set(),
  };
}

export function pointOnScreenToCanvas(
  point: { x: number; y: number },
  canvasRect?: CanvasRect,
) {
  if (!canvasRect) return point;
  return { x: point.x - canvasRect.x, y: point.y - canvasRect.y };
}
