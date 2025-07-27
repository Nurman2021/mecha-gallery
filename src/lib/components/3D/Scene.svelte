<script lang="ts">
  import { T, useFrame } from "@threlte/core";
  import CameraControls from "./camera/CameraControls.svelte";
  import { cameraControls } from "./camera/stores";
  import Mecha from "./models/Mecha.svelte";
  import { onMount, createEventDispatcher } from "svelte";
  import {
    loadingStore,
    setTotalAssets,
    incrementAssetLoaded,
    completeLoading,
  } from "$lib/stores/loadingStore";

  const dispatch = createEventDispatcher();

  let assetsLoaded = 0;
  const totalAssetsToLoad = 3; // Mecha model, textures, etc.

  onMount(() => {
    setTotalAssets(totalAssetsToLoad);

    // Simulate loading various assets
    const assetNames = ["3D Model", "Textures", "Animations"];

    assetNames.forEach((assetName, index) => {
      setTimeout(
        () => {
          incrementAssetLoaded(assetName);
          assetsLoaded++;

          // Dispatch progress to parent
          const progress = (assetsLoaded / totalAssetsToLoad) * 100;
          dispatch("loadProgress", { progress });

          // Complete loading when all assets are loaded
          if (assetsLoaded >= totalAssetsToLoad) {
            setTimeout(() => {
              completeLoading();
              dispatch("loadComplete");
            }, 500);
          }
        },
        (index + 1) * 800
      ); // Stagger the loading
    });
  });
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
