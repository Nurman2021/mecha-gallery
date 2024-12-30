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
  /**
   * @type {{ zoom: number; }}
   */
  let camera;
 // @ts-ignore
   $: if ($cameraControls) {
    // @ts-ignore
    camera = $cameraControls._camera;
  }

  // GSAP ScrollTrigger setup
  const setupScrollTriggers = () => {
    // Rotate camera
    ScrollTrigger.create({
      trigger: "#hero",
      start: "top center",
      markers: true,
      // @ts-ignore
      onEnter: () => $cameraControls.rotate(45 * DEG2RAD, 0, true)
    });

    // Zoom in
    ScrollTrigger.create({
      trigger: "#projects",
      start: "top center",
      markers: true,
      // @ts-ignore
      onEnter: () => $cameraControls.zoom(camera.zoom / 2, true)
    });

    // Move camera to position
    ScrollTrigger.create({
      trigger: "#about",
      start: "top center",
      markers: true,
      // @ts-ignore
      onEnter: () => $cameraControls.moveTo(3, 5, 2, true)
    });

    // Set look at specific target
    ScrollTrigger.create({
      trigger: "#contact",
      start: "top center",
      markers: true,
      // @ts-ignore
      onEnter: () => $cameraControls.setLookAt(1, 2, 3, 1, 1, 0, true)
    });
  };

  // Initiate GSAP triggers when the DOM is loaded
  onMount(() => {
    setupScrollTriggers();
  });
</script>

<div class="fixed z-10 w-full h-screen">
  <Canvas>
    <Scene />
  </Canvas>
</div>

<main class="z-20">
  <section id="hero" class="h-screen flex justify-center items-center">
    <h1 class="text-4xl font-bold">Hero Section</h1>
  </section>
  <section id="projects" class="h-screen flex justify-center items-center">
    <h2 class="text-3xl font-bold text-pink-600">Projects Section</h2>
  </section>
  <section id="about" class="h-screen flex justify-center items-center">
    <h3 class="text-3xl font-bold">About Section</h3>
  </section>
  <section id="contact" class="h-screen flex justify-center items-center">
    <h4 class="text-3xl font-bold">Contact Section</h4>
  </section>

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
