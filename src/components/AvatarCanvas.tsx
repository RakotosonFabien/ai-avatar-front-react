import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import * as PIXI from "pixi.js";
import { InternalModel, Live2DModel } from "pixi-live2d-display/cubism4";

const AvatarCanvas = forwardRef((_, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<any>(null);
  const isReady = useRef(false);

  useImperativeHandle(ref, () => ({
    animateMouth: (volume: number) => {
      if (isReady.current && modelRef.current?.internalModel) {
        console.log("Animating mouth with volume:", modelRef.current?.internalModel);
        modelRef.current.internalModel.coreModel.setParameterValueById("ParamMouthOpenY", volume);
        modelRef.current.internalModel.coreModel.update();
      }
      else{
        console.log("Model not ready, cannot animate mouth yet.");
        // console.log("modelRef.current.internalModel:", modelRef.current?.internalModel);
      }
    },
    resetMouth: () => {
      if (isReady.current && modelRef.current?.internalModel?.parameters) {
        modelRef.current.internalModel.parameters.setValueById("ParamMouthOpenY", 0);
      }
    },
  }));

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
        model.x = 0;
        model.y = 0;
        app.stage.addChild(model);

        // Wait until the model is rendered at least once
        app.ticker.addOnce(() => {
          modelRef.current = model;
          isReady.current = true;
          console.log("✅ Model fully initialized and ready.");
        });
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
});

export default AvatarCanvas;
