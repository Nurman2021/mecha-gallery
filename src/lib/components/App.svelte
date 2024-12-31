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

  const cameraStates = {
    hero: null,
    projects: null,
    about: null,
    contact: null
  };

  const saveCameraState = (section) => {
    cameraStates[section] = {
      position: camera.position.clone(),
      target: $cameraControls._target.clone(),
      zoom: camera.zoom
    };
  };

  const restoreCameraState = (section) => {
    if (cameraStates[section]) {
      const state = cameraStates[section];
      $cameraControls.setLookAt(
        state.position.x,
        state.position.y,
        state.position.z,
        state.target.x,
        state.target.y,
        state.target.z,
        true
      );
      $cameraControls.zoom(state.zoom, true);
    }
  };

  // GSAP ScrollTrigger setup
  const setupScrollTriggers = () => {
    // Hero section
    ScrollTrigger.create({
      trigger: "#hero",
      start: "top center",
      markers: true,
      onEnter: () => {
        $cameraControls.rotate(45 * DEG2RAD, 0, true);
        saveCameraState("hero");
      },
      onLeaveBack: () => restoreCameraState("hero")
    });

    // Projects section
    ScrollTrigger.create({
      trigger: "#projects",
      start: "top center",
      markers: true,
      onEnter: () => {
        $cameraControls.zoom(camera.zoom / 2, true);
        saveCameraState("projects");
      },
      onLeaveBack: () => restoreCameraState("projects")
    });

    // About section
    ScrollTrigger.create({
      trigger: "#about",
      start: "top center",
      markers: true,
      onEnter: () => {
        $cameraControls.moveTo(3, 5, 2, true);
        saveCameraState("about");
      },
      onLeaveBack: () => restoreCameraState("about")
    });

    // Contact section
    ScrollTrigger.create({
      trigger: "#contact",
      start: "top center",
      markers: true,
      onEnter: () => {
        $cameraControls.setLookAt(1, 2, 3, 1, 1, 0, true);
        saveCameraState("contact");
      },
      onLeaveBack: () => restoreCameraState("contact")
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
