import { useState } from "react";

type AddStickerViewSate = {
  type: "add-sticker";
};

type IdleViewState = {
  type: "idle";
};

type ViewState = AddStickerViewSate | IdleViewState;

export function useBoardViewState() {
  const [viewState, setViewState] = useState<ViewState>({
    type: "idle",
  });

  const goToIdle = () => {
    setViewState({
      type: "idle",
    });
  };
  const goToAddSticker = () => {
    setViewState({
      type: "add-sticker",
    });
  };

  return { viewState, goToAddSticker, goToIdle };
}
