import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { Live2DModel } from "pixi-live2d-display/cubism4";

export default function AvatarCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const { clientWidth, clientHeight } = containerRef.current;

    const app = new PIXI.Application({
      width: clientWidth,
      height: clientHeight,
      transparent: true,
    });

    containerRef.current.appendChild(app.view);

    (async () => {
      try {
        const model = await Live2DModel.from("/live2d/kei/kei_basic_free_t02.model3.json");
        model.scale.set(0.4);

        // Adjust to center bottom
        model.x = 0;
        model.y = 0;

        Live2DModel.registerTicker(PIXI.Ticker);
        app.stage.addChild(model);
        console.log("✅ Model loaded");
      } catch (err) {
        console.error("❌ Failed to load Live2D model:", err);
      }
    })();

    return () => app.destroy(true, true);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden rounded-xl bg-gray-100"
    />
  );
}
