<script>
  import { Canvas } from '@threlte/core';
  import { onMount } from 'svelte';
  import Scene from './Scene.svelte';
  import { cameraControls } from './camera/stores';
  import { DEG2RAD } from 'three/src/math/MathUtils.js';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  // Camera store reactive variable
  let camera;
  $: if ($cameraControls) {
    camera = $cameraControls._camera;
  }

  // GSAP ScrollTrigger setup
  const setupScrollTriggers = () => {
    // Rotate camera
    ScrollTrigger.create({
      trigger: "#hero",
      start: "top center",
      onEnter: () => $cameraControls.rotate(45 * DEG2RAD, 0, true)
    });

    // Zoom in
    ScrollTrigger.create({
      trigger: "#projects",
      start: "top center",
      onEnter: () => $cameraControls.zoom(camera.zoom / 2, true)
    });

    // Move camera to position
    ScrollTrigger.create({
      trigger: "#about",
      start: "top center",
      onEnter: () => $cameraControls.moveTo(3, 5, 2, true)
    });

    // Set look at specific target
    ScrollTrigger.create({
      trigger: "#contact",
      start: "top center",
      onEnter: () => $cameraControls.setLookAt(1, 2, 3, 1, 1, 0, true)
    });
  };

  // Initiate GSAP triggers when the DOM is loaded
  onMount(() => {
    setupScrollTriggers();
  });
</script>

<main>
  <section id="hero" class="h-screen flex justify-center items-center bg-gray-200">
    <h1 class="text-4xl font-bold">Hero Section</h1>
  </section>
  <section id="projects" class="h-screen flex justify-center items-center bg-gray-300">
    <h2 class="text-3xl font-bold">Projects Section</h2>
  </section>
  <section id="about" class="h-screen flex justify-center items-center bg-gray-400">
    <h3 class="text-3xl font-bold">About Section</h3>
  </section>
  <section id="contact" class="h-screen flex justify-center items-center bg-gray-500">
    <h4 class="text-3xl font-bold">Contact Section</h4>
  </section>

  <Canvas>
    <Scene />
  </Canvas>
</main>

<style>
  main {
    position: relative;
  }
  section {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
</style>
