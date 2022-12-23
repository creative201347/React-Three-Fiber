# [LEVA](https://github.com/pmndrs/leva)


```
import { button, folder, useControls } from "leva";

function TweakableBox() {
  const [{ scale, color, wireframe, position }, set] = useControls(
    "Box",
    () => ({
      transform: folder({
        scale: {
          value: 1,
          min: 0.4,
          max: 4,
          step: 0.2,
        },
        position: [0, 0, 0],
      }),
      material: folder({
        color: "#333",
        wireframe: false,
      }),
      reset: button(() => {
        set({
          scale: 1,
          position: [0, 0, 0],
          color: "#333",
          wireframe: false,
        });
      }),
    })
  );

  return (
    <Box scale={scale} position={position}>
      <meshStandardMaterial color={color} wireframe={wireframe} />
    </Box>
  );
}
```