import { useAddStickerViewModel } from "./variants/addSticker";
import { useIdleViewModel } from "./variants/idle";
import type { ViewModelParams } from "./viewModelParams";
import type { ViewModel } from "./viewModelType";

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
