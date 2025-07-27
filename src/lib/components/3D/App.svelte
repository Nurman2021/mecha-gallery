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
    respawn,
    idleReady,
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

  // Section elements for GSAP transitions
  let heroSection: HTMLElement;
  let projectsSection: HTMLElement;
  let aboutSection: HTMLElement;
  let contactSection: HTMLElement;

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
      initializeSectionAnimations();
    }, 500);
  };

  // Initialize section animations
  const initializeSectionAnimations = () => {
    // Set initial states - hide all sections except hero
    gsap.set([projectsSection, aboutSection, contactSection], {
      opacity: 0,
      y: 50,
    });

    // Set hero as visible
    gsap.set(heroSection, {
      opacity: 1,
      y: 0,
    });

    // Animate in individual elements of hero section
    gsap.fromTo(
      heroSection.querySelectorAll(".animate-in"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.8,
      }
    );
  };

  // Enhanced section transition
  const animateSection = (section: HTMLElement, show: boolean = true) => {
    if (show) {
      gsap.to(section, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      // Animate individual elements
      const elements = section.querySelectorAll(".animate-in");
      gsap.fromTo(
        elements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.3,
        }
      );
    } else {
      gsap.to(section, {
        opacity: 0,
        y: -30,
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  };

  // GSAP ScrollTrigger setup
  const setupScrollTriggers = () => {
    // Hero section
    ScrollTrigger.create({
      trigger: "#hero",
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        if (currentSection !== "hero") {
          currentSection = "hero";
          animateSection(heroSection, true);
        }
        isTransitioning = true;
        // @ts-ignore
        $cameraControls.reset(true);
        setActiveAnimation("idle");

        console.log(
          "Entered hero section, active animation:",
          $idle ? "idle" : "other"
        );

        setTimeout(() => {
          isTransitioning = false;
        }, 1000);
      },
      onLeave: () => {
        animateSection(heroSection, false);
      },
      onEnterBack: () => {
        currentSection = "hero";
        animateSection(heroSection, true);
        isTransitioning = true;
        // @ts-ignore
        $cameraControls.reset(true);
        setActiveAnimation("idle");

        setTimeout(() => {
          isTransitioning = false;
        }, 1000);
      },
      onLeaveBack: () => {
        animateSection(heroSection, false);
      },
    });

    // Projects section
    ScrollTrigger.create({
      trigger: "#projects",
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        if (currentSection !== "projects") {
          currentSection = "projects";
          animateSection(projectsSection, true);
        }
        isTransitioning = true;
        // @ts-ignore
        $cameraControls.setPosition(-10, 12, 16, true);
        // @ts-ignore
        $cameraControls.moveTo(4, 0.5, -2, true);

        setActiveAnimation("run");

        console.log(
          "Entered projects section, active animation:",
          $run ? "run" : "other"
        );

        setTimeout(() => {
          isTransitioning = false;
        }, 1000);
      },
      onLeave: () => {
        animateSection(projectsSection, false);
      },
      onEnterBack: () => {
        currentSection = "projects";
        animateSection(projectsSection, true);
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
        animateSection(projectsSection, false);
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
        if (currentSection !== "about") {
          currentSection = "about";
          animateSection(aboutSection, true);
        }
        isTransitioning = true;
        // @ts-ignore
        $cameraControls.setPosition(5, 10, 20, true);
        // @ts-ignore
        $cameraControls.moveTo(-4, 2, 0, true);

        setActiveAnimation("idlePose");

        console.log(
          "Entered about section, active animation:",
          $idlePose ? "idlePose" : "other"
        );

        setTimeout(() => {
          isTransitioning = false;
        }, 1000);
      },
      onLeave: () => {
        animateSection(aboutSection, false);
      },
      onEnterBack: () => {
        currentSection = "about";
        animateSection(aboutSection, true);
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
        animateSection(aboutSection, false);
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
        if (currentSection !== "contact") {
          currentSection = "contact";
          animateSection(contactSection, true);
        }
        isTransitioning = true;
        // @ts-ignore
        $cameraControls.moveTo(2, 2, -2, true);

        setActiveAnimation("respawn");

        console.log(
          "Entered contact section, active animation:",
          $respawn ? "respawn" : "other"
        );

        setTimeout(() => {
          isTransitioning = false;
        }, 1000);
      },
      onLeave: () => {
        animateSection(contactSection, false);
      },
      onEnterBack: () => {
        currentSection = "contact";
        animateSection(contactSection, true);
        isTransitioning = true;
        // @ts-ignore
        $cameraControls.moveTo(2, 2, -2, true);

        setActiveAnimation("respawn");

        setTimeout(() => {
          isTransitioning = false;
        }, 1000);
      },
      onLeaveBack: () => {
        animateSection(contactSection, false);
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
    if ($respawn) console.log("Respawn animation active");
    if ($idleReady) console.log("IdleReady animation active");
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

<main class="relative z-30">
  <section
    bind:this={heroSection}
    id="hero"
    class="h-screen flex flex-col relative justify-center items-center"
    class:active={currentSection === "hero"}
  >
    <div class="flex justify-between w-1/2">
      <p class="text-white font-druk text-sm animate-in">Let's <br /> Drive</p>
      <p class="text-white font-druk text-sm animate-in">
        I'm Painting <br /> on
        <span class="text-[#cc4f55]">&lt;canvas/&gt;</span>
      </p>
    </div>

    <p
      class="text-white font-light bottom-0 flex flex-col items-center absolute animate-bounce animate-in"
    >
      Scroll down
      <ChevronDown size={24} />
    </p>
  </section>

  <section
    bind:this={projectsSection}
    id="projects"
    class="h-screen flex justify-center items-center"
    class:active={currentSection === "projects"}
  >
    <div class="w-3/5 flex animate-in"></div>
    <div class="w-2/5 animate-in">
      <Swiper />
    </div>
  </section>

  <section
    bind:this={aboutSection}
    id="about"
    class="h-screen flex justify-center items-center"
    class:active={currentSection === "about"}
  >
    <div class="w-1/2 animate-in flex justify-center">
      <ProgressBar />
    </div>
    <div class="w-1/2 animate-in"></div>
  </section>

  <section
    bind:this={contactSection}
    id="contact"
    class="h-screen flex justify-center items-center"
    class:active={currentSection === "contact"}
  >
    <div class="w-2/5 flex animate-in"></div>
    <div class="animate-in">
      <ContactCard />
    </div>
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

  /* Classes for GSAP animations */
  .animate-in {
    /* Initial state for GSAP animations */
    opacity: 0;
    transform: translateY(20px);
  }

  /* Debug indicator (optional) */
  section::before {
    content: attr(id);
    position: absolute;
    top: 20px;
    left: 20px;
    color: rgba(255, 255, 255, 0.2);
    font-size: 12px;
    pointer-events: none;
    z-index: 10;
  }
</style>
