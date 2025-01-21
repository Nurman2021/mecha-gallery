<script lang="ts">
  import gsap from "gsap";
  import { onMount } from "svelte";
  import Scene from "./Scene.svelte";
  import { ChevronDown } from "lucide-svelte";
  import { Canvas } from "@threlte/core";
  import ScrollTrigger from "gsap/ScrollTrigger";
  import { cameraControls } from "./camera/stores";
  import {
    idle,
    idlePose,
    run,
    channel,
  } from "$lib/components/3D/animationState";
  import Swiper from "../UI/Swiper.svelte";
  import ProgressBar from "../UI/ProgressBar.svelte";
  import ContactCard from "../UI/ContactCard.svelte";

  gsap.registerPlugin(ScrollTrigger);

  // Camera store reactive variable
  /**
   * @type {{ zoom: number; }}
   */
  // @ts-ignore
  let camera;
  // @ts-ignore
  $: if ($cameraControls) {
    // @ts-ignore
    camera = $cameraControls._camera;
  }

  // GSAP ScrollTrigger setup
  const setupScrollTriggers = () => {
    // Hero section
    ScrollTrigger.create({
      trigger: "#hero",
      start: "top center",
      onEnter: () => {
        // @ts-ignore
        $cameraControls.reset(true);
        $idle = true;
      },
      onLeave: () => {
        $idle = !$idle;
      },
      onLeaveBack: () => {
        // @ts-ignore
        $cameraControls.reset(true);
        $idle = true;
      },
    });

    // Projects section
    ScrollTrigger.create({
      trigger: "#projects",
      start: "top center",
      onEnter: () => {
        // @ts-ignore

        $cameraControls.setPosition(-10, 12, 16, true);
        // @ts-ignore
        $cameraControls.moveTo(4, 0.5, -2, true);

        $run = true;
      },
      onLeave: () => {
        $run = !$run;
      },
      onLeaveBack: () => {
        // @ts-ignore
        $cameraControls.reset(true);
        $run = true;
      },
    });

    // About section
    ScrollTrigger.create({
      trigger: "#about",
      start: "center bottom",
      onEnter: () => {
        // @ts-ignore
        $cameraControls.setPosition(5, 10, 20, true);
        // @ts-ignore
        $cameraControls.moveTo(-4, 2, 0, true);

        $idlePose = true;
      },
      onLeave: () => {
        $idlePose = !$idlePose;
      },
      onLeaveBack: () => {
        $idlePose = true;
      },
    });

    // Contact section
    ScrollTrigger.create({
      trigger: "#contact",
      start: "top center",
      onEnter: () => {
        // @ts-ignore
        $cameraControls.moveTo(2, 2, -2, true);

        $channel = true;
      },
      onLeave: () => {
        $channel = !$channel;
      },
      onLeaveBack: () => {
        $channel = true;
      },
    });
  };

  onMount(() => {
    setupScrollTriggers();
  });
</script>

<div class="fixed z-20 w-full h-screen">
  <Canvas>
    <Scene />
  </Canvas>
</div>

<main class="z-30">
  <section
    id="hero"
    class="h-screen flex flex-col relative justify-center items-center"
  >
    <div class="flex justify-between w-1/2">
      <p class="text-white font-bold font-druk text-sm">Let's <br /> Drive</p>
      <p class="text-white font-bold font-druk text-sm">
        I'm Painting <br /> on
        <span class="text-[#cc4f55]">&lt;canvas/&gt;</span>
      </p>
    </div>

    <p
      class="text-white font-light bottom-0 flex flex-col items-center absolute animate-bounce"
    >
      Scroll down
      <ChevronDown size={24} />
    </p>
  </section>
  <section id="projects" class="h-screen flex justify-center items-center">
    <div class="w-3/5 flex"></div>
    <div class="w-2/5">
      <Swiper />
    </div>
  </section>
  <section id="about" class="h-screen flex">
    <ProgressBar />
    <div class="w-1/2"></div>
  </section>
  <section id="contact" class="h-screen flex justify-center items-center">
    <div class="w-2/5 flex"></div>
    <!-- <div class="w-2/5"> -->
    <ContactCard />
    <!-- </div> -->
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
