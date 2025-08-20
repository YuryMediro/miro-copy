import { useState } from "react";

export type AddStickerViewSate = {
  type: "add-sticker";
};

export type IdleViewState = {
  type: "idle";
  selectedIds: Set<string>;
};

type ViewState = AddStickerViewSate | IdleViewState;

export function useViewState() {
  const [viewState, setViewState] = useState<ViewState>({
    type: "idle",
    selectedIds: new Set(),
  });

  const goToIdle = () => {
    setViewState({
      type: "idle",
      selectedIds: new Set(),
    });
  };

  const selection = (
    ids: string[],
    modif: "replace" | "add" | "toggle" = "replace",
  ) =>
    setViewState((s) => {
      if (s.type === "idle") {
        return selectItems(s, ids, modif);
      }
      return s;
    });

  const goToAddSticker = () => {
    setViewState({
      type: "add-sticker",
    });
  };

  return { viewState, goToAddSticker, goToIdle, selection };
}

export type ViewStateModel = ReturnType<typeof useViewState>;

function selectItems(
  viewState: IdleViewState,
  ids: string[],
  modif: "replace" | "add" | "toggle" = "replace",
) {
  if (modif === "replace") {
    return {
      ...viewState,
      selectedIds: new Set(ids),
    };
  }

  if (modif === "add") {
    return {
      ...viewState,
      selectedIds: new Set([...viewState.selectedIds, ...ids]),
    };
  }

  if (modif === "toggle") {
    const currentIds = new Set(viewState.selectedIds);
    const newIds = new Set(ids);

    const base = Array.from(viewState.selectedIds).filter(
      (id) => !newIds.has(id),
    );
    const added = ids.filter((id) => !currentIds.has(id));

    return {
      ...viewState,
      selectedIds: new Set([...base, ...added]),
    };
  }
  return viewState;
}
