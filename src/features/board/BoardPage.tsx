import { Button } from "@/shared/ui/kit/button";
import { ArrowRight, StickerIcon } from "lucide-react";
import { useNodes } from "./model/nodes";
import { useCanvasRect } from "./hooks/useCanvasRect";
import { type Ref } from "react";
import type React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/ui/kit/tooltip";
import { useLayoutFocus } from "./hooks/useLayoutFocus";
import { useViewModel } from "./viewModel";
import clsx from "clsx";

export default function BoardPage() {
  const { nodes, addSticker } = useNodes();
  const viewModel = useViewModel();
  const focusLayoutRef = useLayoutFocus();
  const { canvasRef, canvasRect } = useCanvasRect();

  return (
    <Layout
      ref={focusLayoutRef}
      onKeyDown={(e) => {
        if (viewModel.viewState.type === "add-sticker") {
          if (e.key === "Escape") {
            viewModel.goToIdle();
          }
        }
        if (viewModel.viewState.type === "idle") {
          if (e.key === "s") {
            viewModel.goToAddSticker();
          }
        }
      }}
    >
      <Dots />
      <Canvas
        ref={canvasRef}
        onClick={(e) => {
          if (viewModel.viewState.type === "add-sticker" && canvasRect) {
            addSticker({
              text: "Default",
              x: e.clientX - canvasRect.x,
              y: e.clientY - canvasRect.y,
            });
            viewModel.goToIdle();
          }
        }}
      >
        {nodes.map((node) => (
          <Sticker
            key={node.id}
            text={node.text}
            x={node.x}
            y={node.y}
            selected={viewModel.viewState.type === 'idle' && viewModel.viewState.selectedIds.has(node.id)}
            onClick={(e) => {
              if (viewModel.viewState.type === "idle") {
                if (e.ctrlKey || e.shiftKey) {
                  viewModel.selection([node.id], "toggle");
                } else {
                  viewModel.selection([node.id], "replace");
                }
              }
            }}
          />
        ))}
      </Canvas>
      <Actions>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <ActionButton
                isActive={viewModel.viewState.type === "add-sticker"}
                onClick={() => {
                  if (viewModel.viewState.type === "add-sticker") {
                    viewModel.goToIdle();
                  } else {
                    viewModel.goToAddSticker();
                  }
                }}
              >
                <StickerIcon />
              </ActionButton>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p className="flex items-center gap-2 text-xs font-medium">
              Добавить стикер
              <span className="inline-flex items-center justify-center w-5 h-5 border border-gray-600 bg-gray-600 rounded-sm">
                S
              </span>
            </p>
          </TooltipContent>
        </Tooltip>
        <ActionButton isActive={false} onClick={() => {}}>
          <ArrowRight />
        </ActionButton>
      </Actions>
    </Layout>
  );
}

function Layout({
  children,
  ref,
  ...props
}: {
  children: React.ReactNode;
  ref: Ref<HTMLDivElement>;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="grow relative" tabIndex={0} ref={ref} {...props}>
      {children}
    </div>
  );
}

function Dots() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(#a5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
  );
}

function Canvas({
  children,
  ref,
  ...props
}: {
  children: React.ReactNode;
  ref: Ref<HTMLDivElement>;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div ref={ref} {...props} className="absolute inset-0">
      {children}
    </div>
  );
}

function Sticker({
  text,
  x,
  y,
  onClick,
  selected,
}: {
  text: string;
  x: number;
  y: number;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  selected: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "absolute bg-yellow-300 px-2 py-4 rounded-xs shadow-md",
        selected && "outline-2 outline-blue-500",
      )}
      style={{ transform: `translate(${x}px, ${y}px)` }}
    >
      {text}
    </button>
  );
}

function Actions({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 bg-white p-1 rounded-md shadow">
      {children}
    </div>
  );
}

function ActionButton({
  children,
  isActive,
  onClick,
}: {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={
        isActive
          ? "bg-blue-500/30 hover:bg-blue-600/30 text-blue-500 hover:text-blue-600"
          : ""
      }
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
