import { useState } from "react";
import {
  useAddStickerViewModel,
  type AddStickerViewSate,
} from "./variants/addSticker";
import { useIdleViewModel, type IdleViewState } from "./variants/idle";
import type { ViewModelParams } from "./viewModelParams";
import type { ViewModel } from "./viewModelType";
import {
  useSelectionWindowViewModel,
  type SelectionWindowViewSate,
} from "./variants/selectionWindow";

export type ViewState =
  | AddStickerViewSate
  | IdleViewState
  | SelectionWindowViewSate;

export function useViewModel(params: Omit<ViewModelParams, "setViewSTate">) {
  const [viewState, setViewState] = useState<ViewState>({
    type: "idle",
    selectedIds: new Set(),
  });

  const newParams = {
    ...params,
    setViewState,
  };

  const addStickerViewModel = useAddStickerViewModel(newParams);
  const idleViewModel = useIdleViewModel(newParams);
  const selectionWindowViewModel = useSelectionWindowViewModel(newParams);

  let viewModel: ViewModel;
  switch (viewState.type) {
    case "add-sticker":
      viewModel = addStickerViewModel();
      break;
    case "idle":
      viewModel = idleViewModel(viewState);
      break;
    case "selection-window":
      viewModel = selectionWindowViewModel();
      break;
    default:
      throw new Error("Unknown view state");
  }
  return viewModel;
}
