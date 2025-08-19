import { Button } from "@/shared/ui/kit/button";
import { ArrowRight, StickerIcon } from "lucide-react";
import { useNodes } from "./nodes";
import { useBoardViewState } from "./viewState";
import { useCallback, type RefCallback, type Ref, useState } from "react";

type CanvasRef = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const useCanvasRect = () => {
  const [canvasRect, setCanvasRef] = useState<CanvasRef>();

  const canvasRef: RefCallback<HTMLDivElement> = useCallback((el) => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;

        const { x, y } = entry.target.getBoundingClientRect();

        setCanvasRef({ x, y, width, height });
      }
    });

    if (el) {
      observer.observe(el);
      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return { canvasRef, canvasRect };
};

export default function BoardPage() {
  const { nodes, addSticker } = useNodes();
  const { viewState, goToAddSticker, goToIdle } = useBoardViewState();
  const { canvasRef, canvasRect } = useCanvasRect();
  console.log(canvasRect);

  return (
    <Layout>
      <Dots />
      <Canvas
        ref={canvasRef}
        onClick={(e) => {
          if (viewState.type === "add-sticker" && canvasRect) {
            addSticker({
              text: "Default",
              x: e.clientX - canvasRect.x,
              y: e.clientY - canvasRect.y,
            });
            goToIdle();
          }
        }}
      >
        {nodes.map((node) => (
          <Sticker key={node.id} text={node.text} x={node.x} y={node.y} />
        ))}
      </Canvas>
      <Actions>
        <ActionButton
          isActive={viewState.type === "add-sticker"}
          onClick={() => {
            if (viewState.type === "add-sticker") {
              goToIdle();
            } else {
              goToAddSticker();
            }
          }}
        >
          <StickerIcon />
        </ActionButton>
        <ActionButton isActive={false} onClick={() => {}}>
          <ArrowRight />
        </ActionButton>
      </Actions>
    </Layout>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grow relative" tabIndex={0}>
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

function Sticker({ text, x, y }: { text: string; x: number; y: number }) {
  return (
    <div
      className="absolute bg-yellow-300 px-2 py-4 rounded-xs shadow-md"
      style={{ transform: `translate(${x}px, ${y}px)` }}
    >
      {text}
    </div>
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
