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
    updateProgress,
  } from "$lib/stores/loadingStore";

  const dispatch = createEventDispatcher();

  let mechaLoaded = false;
  let cameraReady = false;
  let environmentReady = false;

  // Function to check if all components are ready
  function checkAllComponentsReady() {
    if (mechaLoaded && cameraReady && environmentReady) {
      console.log("All 3D assets loaded successfully");
      completeLoading(); // Update the store
      dispatch("loadComplete");
    }
  }

  // Handle Mecha model loading
  function handleMechaLoad() {
    console.log("Mecha model loaded");
    mechaLoaded = true;
    updateProgress(60); // Update store progress
    dispatch("loadProgress", { progress: 60 });
    checkAllComponentsReady();
  }

  // Handle camera setup
  function handleCameraReady() {
    console.log("Camera controls ready");
    cameraReady = true;
    updateProgress(80); // Update store progress
    dispatch("loadProgress", { progress: 80 });
    checkAllComponentsReady();
  }

  onMount(() => {
    // Initialize loading
    updateProgress(0);
    dispatch("loadProgress", { progress: 0 });

    // Environment setup (lights, floor)
    setTimeout(() => {
      console.log("Environment setup complete");
      environmentReady = true;
      updateProgress(40); // Update store progress
      dispatch("loadProgress", { progress: 40 });
      checkAllComponentsReady();
    }, 300);
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
        // Camera is ready after a short delay
        setTimeout(() => {
          handleCameraReady();
        }, 500);
      }}
    />
  </T.PerspectiveCamera>
</T.Group>

<!-- Mecha model with loading handler -->
<Mecha on:loaded={handleMechaLoad} />

<!-- Floor -->
<T.Mesh rotation.x={-Math.PI / 2} receiveShadow position.y={0.05}>
  <T.CircleGeometry args={[2.2, 40]} />
  <T.MeshStandardMaterial color="#cc4f55" />
</T.Mesh>

<T.DirectionalLight intensity={0.9} position={[8, 6, 6]} castShadow />
<T.AmbientLight intensity={0.3} />
