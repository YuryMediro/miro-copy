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
import clsx from "clsx";
import { useViewModel } from "./viewModel/useViewModel";
import type { Rect } from "./domain/rect";
import { useWindowEvents } from "./hooks/useWindowEvents";

export default function BoardPage() {
  const nodesModel = useNodes();
  const focusLayoutRef = useLayoutFocus();
  const { canvasRef, canvasRect } = useCanvasRect();

  const viewModel = useViewModel({
    canvasRect,
    nodesModel,
  });

  useWindowEvents(viewModel);

  return (
    <Layout ref={focusLayoutRef} onKeyDown={viewModel.layout?.onKeyDown}>
      <Dots />
      <Canvas ref={canvasRef} onClick={viewModel.canvas?.onClick}>
        <Overlay
          onClick={viewModel.overlay?.onClick}
          onMouseDown={viewModel.overlay?.onMouseDown}
        />
        {viewModel.nodes.map((node) => (
          <Sticker
            key={node.id}
            text={node.text}
            x={node.x}
            y={node.y}
            selected={node.isSelected}
            onClick={node.onClick}
          />
        ))}
      </Canvas>
      {viewModel.selectionWindow && (
        <SelectionWindow {...viewModel.selectionWindow} />
      )}
      <Actions>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <ActionButton
                isActive={viewModel.actions?.addSticker?.isActive}
                onClick={viewModel.actions?.addSticker?.onClick}
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

function SelectionWindow({ height, width, x, y }: Rect) {
  return (
    <div
      className="absolute inset-0 bg-blue-500/30 border-2 border-blue-500"
      style={{
        transform: `translate(${x}px, ${y}px)`,
        width: width,
        height: height,
      }}
    ></div>
  );
}

function Overlay({
  onClick,
  onMouseDown,
  onMouseUp,
}: {
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseUp?: (e: React.MouseEvent<HTMLDivElement>) => void;
}) {
  return (
    <div
      className="absolute inset-0"
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    ></div>
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
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  selected?: boolean;
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
  isActive?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
