<script lang="ts">
  import { T, useFrame } from "@threlte/core";
  import CameraControls from "./camera/CameraControls.svelte";
  import { cameraControls } from "./camera/stores";
  import Mecha from "./models/Mecha.svelte";
</script>

<T.Group>
  <T.PerspectiveCamera
    makeDefault
    position={[3, 28, 12]}
    fov={15}
    on:create={({ ref }) => {
      ref.lookAt(0, 1, 0);
    }}
  >
    <CameraControls
      on:create={({ ref }) => {
        // @ts-ignore
        $cameraControls = ref;
      }}
    />
  </T.PerspectiveCamera>
</T.Group>
<Mecha />

<!-- Floor -->
<T.Mesh rotation.x={-Math.PI / 2} receiveShadow position.y={0.05}>
  <T.CircleGeometry args={[2.2, 40]} />
  <T.MeshStandardMaterial color="#cc4f55" />
</T.Mesh>

<T.DirectionalLight intensity={0.9} position={[8, 6, 6]} castShadow />
<T.AmbientLight intensity={0.3} />
