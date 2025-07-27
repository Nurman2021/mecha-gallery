<script lang="ts">
  import gsap from "gsap";
  import { onMount, createEventDispatcher } from "svelte";
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
    setActiveAnimation,
  } from "$lib/components/3D/animationState";
  import Swiper from "../UI/Swiper.svelte";
  import ProgressBar from "../UI/ProgressBar.svelte";
  import ContactCard from "../UI/ContactCard.svelte";

  gsap.registerPlugin(ScrollTrigger);

  const dispatch = createEventDispatcher();

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

  // State variables untuk tracking
  let currentSection = "hero";
  let isTransitioning = false;
  let scrollProgress = 0;
  let sceneLoaded = false;

  // Handle loading events from Scene
  const handleLoadProgress = (event: any) => {
    dispatch("loadProgress", event.detail);
  };

  const handleLoadComplete = () => {
    sceneLoaded = true;
    dispatch("loadComplete");

    // Setup ScrollTriggers after scene is loaded
    setTimeout(() => {
      setupScrollTriggers();
    }, 500);
  };

  // GSAP ScrollTrigger setup
  const setupScrollTriggers = () => {
    // Hero section
    ScrollTrigger.create({
      trigger: "#hero",
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        currentSection = "hero";
        isTransitioning = true;
        // @ts-ignore
        $cameraControls.reset(true);
        setActiveAnimation("idle");

        // Debug log
        console.log(
          "Entered hero section, active animation:",
          $idle ? "idle" : "other"
        );

        setTimeout(() => {
          isTransitioning = false;
        }, 1000);
      },
      onLeave: () => {
        // Animation will be set by next section
      },
      onEnterBack: () => {
        currentSection = "hero";
        isTransitioning = true;
        // @ts-ignore
        $cameraControls.reset(true);
        setActiveAnimation("idle");

        setTimeout(() => {
          isTransitioning = false;
        }, 1000);
      },
      onLeaveBack: () => {
        // Animation will be set by previous section if any
      },
    });

    // Projects section
    ScrollTrigger.create({
      trigger: "#projects",
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        currentSection = "projects";
        isTransitioning = true;
        // @ts-ignore
        $cameraControls.setPosition(-10, 12, 16, true);
        // @ts-ignore
        $cameraControls.moveTo(4, 0.5, -2, true);

        setActiveAnimation("run");

        // Debug log
        console.log(
          "Entered projects section, active animation:",
          $run ? "run" : "other"
        );

        setTimeout(() => {
          isTransitioning = false;
        }, 1000);
      },
      onLeave: () => {
        // Animation will be set by next section
      },
      onEnterBack: () => {
        currentSection = "projects";
        isTransitioning = true;
        // @ts-ignore
        $cameraControls.setPosition(-10, 12, 16, true);
        // @ts-ignore
        $cameraControls.moveTo(4, 0.5, -2, true);

        setActiveAnimation("run");

        setTimeout(() => {
          isTransitioning = false;
        }, 1000);
      },
      onLeaveBack: () => {
        // @ts-ignore
        $cameraControls.reset(true);
        setActiveAnimation("idle");
      },
      scrub: false,
      onUpdate: (self) => {
        scrollProgress = self.progress;

        // Only dispatch at specific intervals
        const discreteProgress = Math.floor(self.progress * 10) / 10;

        // Dispatch event untuk swiper dengan less frequent updates
        window.dispatchEvent(
          new CustomEvent("swiperScroll", {
            detail: {
              progress: discreteProgress,
              section: "projects",
            },
          })
        );
      },
    });

    // About section
    ScrollTrigger.create({
      trigger: "#about",
      start: "center bottom",
      end: "bottom center",
      onEnter: () => {
        currentSection = "about";
        isTransitioning = true;
        // @ts-ignore
        $cameraControls.setPosition(5, 10, 20, true);
        // @ts-ignore
        $cameraControls.moveTo(-4, 2, 0, true);

        setActiveAnimation("idlePose");

        // Debug log
        console.log(
          "Entered about section, active animation:",
          $idlePose ? "idlePose" : "other"
        );

        setTimeout(() => {
          isTransitioning = false;
        }, 1000);
      },
      onLeave: () => {
        // Animation will be set by next section
      },
      onEnterBack: () => {
        currentSection = "about";
        isTransitioning = true;
        // @ts-ignore
        $cameraControls.setPosition(5, 10, 20, true);
        // @ts-ignore
        $cameraControls.moveTo(-4, 2, 0, true);

        setActiveAnimation("idlePose");

        setTimeout(() => {
          isTransitioning = false;
        }, 1000);
      },
      onLeaveBack: () => {
        // @ts-ignore
        $cameraControls.setPosition(-10, 12, 16, true);
        // @ts-ignore
        $cameraControls.moveTo(4, 0.5, -2, true);

        setActiveAnimation("run");
      },
    });

    // Contact section
    ScrollTrigger.create({
      trigger: "#contact",
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        currentSection = "contact";
        isTransitioning = true;
        // @ts-ignore
        $cameraControls.moveTo(2, 2, -2, true);

        setActiveAnimation("channel");

        // Debug log
        console.log(
          "Entered contact section, active animation:",
          $channel ? "channel" : "other"
        );

        setTimeout(() => {
          isTransitioning = false;
        }, 1000);
      },
      onLeave: () => {
        // Animation will be set if there's a next section
      },
      onEnterBack: () => {
        currentSection = "contact";
        isTransitioning = true;
        // @ts-ignore
        $cameraControls.moveTo(2, 2, -2, true);

        setActiveAnimation("channel");

        setTimeout(() => {
          isTransitioning = false;
        }, 1000);
      },
      onLeaveBack: () => {
        // @ts-ignore
        $cameraControls.setPosition(5, 10, 20, true);
        // @ts-ignore
        $cameraControls.moveTo(-4, 2, 0, true);

        setActiveAnimation("idlePose");
      },
    });
  };

  // Remove onMount that immediately calls setupScrollTriggers
  // It will be called after scene is loaded

  // Reactive statements untuk debug dan tracking
  $: {
    if (currentSection) {
      console.log("Current section:", currentSection);
    }
  }

  $: {
    if ($idle) console.log("Idle animation active");
    if ($run) console.log("Run animation active");
    if ($idlePose) console.log("IdlePose animation active");
    if ($channel) console.log("Channel animation active");
  }

  $: {
    if (scrollProgress > 0) {
      console.log("Scroll progress:", scrollProgress);
    }
  }
</script>

<div class="fixed z-20 w-full h-screen">
  <Canvas>
    <Scene
      on:loadProgress={handleLoadProgress}
      on:loadComplete={handleLoadComplete}
    />
  </Canvas>
</div>

<main class="z-30">
  <section
    id="hero"
    class="h-screen flex flex-col relative justify-center items-center"
    class:active={currentSection === "hero"}
  >
    <div class="flex justify-between w-1/2">
      <p class="text-white font-druk text-sm">Let's <br /> Drive</p>
      <p class="text-white font-druk text-sm">
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

  <section
    id="projects"
    class="h-screen flex justify-center items-center"
    class:active={currentSection === "projects"}
  >
    <div class="w-3/5 flex"></div>
    <div class="w-2/5">
      <Swiper />
    </div>
  </section>

  <section
    id="about"
    class="h-screen flex"
    class:active={currentSection === "about"}
  >
    <ProgressBar />
    <div class="w-1/2"></div>
  </section>

  <section
    id="contact"
    class="h-screen flex justify-center items-center"
    class:active={currentSection === "contact"}
  >
    <div class="w-2/5 flex"></div>
    <ContactCard />
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
    transition: opacity 0.3s ease;
  }

  section.active {
    /* Styling untuk section yang aktif */
    opacity: 1;
  }
</style>
