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
  import WhatIDo from "../UI/WhatIDo.svelte";
  import MyWork from "../UI/MyWork.svelte";
  import ProgressBar from "../UI/ProgressBar.svelte";
  import MyExperience from "../UI/MyExperience.svelte";
  import ContactCard from "../UI/ContactCard.svelte";
  import { getCameraConfig } from "$lib/configs/cameraConfig";

  gsap.registerPlugin(ScrollTrigger);

  const dispatch = createEventDispatcher<{
    loadProgress: any;
    loadComplete: void;
  }>();

  // Camera store reactive variable with proper typing
  let camera: THREE.Camera | undefined;

  $: if ($cameraControls) {
    camera = ($cameraControls as any)._camera;
  }

  // State variables untuk tracking
  let currentSection: string = "hero";
  let isTransitioning: boolean = false;
  let scrollProgress: number = 0;
  let sceneLoaded: boolean = false;

  // Section elements for GSAP transitions
  let heroSection: HTMLElement;
  let projectsSection: HTMLElement;
  let aboutSection: HTMLElement;
  let contactSection: HTMLElement;

  // Handle loading events from Scene
  const handleLoadProgress = (event: CustomEvent<any>) => {
    dispatch("loadProgress", event.detail);
  };

  const handleLoadComplete = () => {
    console.log("Scene loading complete");
    sceneLoaded = true;

    // Setup ScrollTriggers and animations after scene loads
    setTimeout(() => {
      setupScrollTriggers();
      initializeSectionAnimations();
    }, 500);

    dispatch("loadComplete");
  };

  // Handle window resize for responsive camera positioning
  let previousIsMobile: boolean = false;
  let isInitialized: boolean = false;
  let resizeTimeout: number;

  const handleResize = (): void => {
    if (!sceneLoaded || !$cameraControls) return;

    // Clear previous timeout to debounce
    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
    }

    resizeTimeout = setTimeout(() => {
      const currentIsMobile: boolean = window.innerWidth < 768; // md breakpoint

      // Initialize the previous state on first run
      if (!isInitialized) {
        previousIsMobile = currentIsMobile;
        isInitialized = true;
        return;
      }

      // Check if we crossed the mobile/desktop breakpoint
      if (previousIsMobile !== currentIsMobile) {
        console.log(
          `Media screen changed: ${previousIsMobile ? "mobile" : "desktop"} -> ${currentIsMobile ? "mobile" : "desktop"}`
        );
        console.log("Refreshing page to reset camera positioning...");

        // Add a small delay to ensure the change is intentional
        setTimeout(() => {
          window.location.reload();
        }, 200);
        return;
      }

      // Update camera position based on current section and new viewport size
      const cameraConfig = getCameraConfig(currentSection);

      setTimeout(() => {
        if ($cameraControls) {
          ($cameraControls as any).setPosition(
            cameraConfig.position[0],
            cameraConfig.position[1],
            cameraConfig.position[2],
            true
          );

          ($cameraControls as any).moveTo(
            cameraConfig.target[0],
            cameraConfig.target[1],
            cameraConfig.target[2],
            true
          );
        }
      }, 100);
    }, 300); // Debounce delay of 300ms
  };

  onMount(() => {
    // Add resize listener
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      // Clear any pending timeout
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
    };
  });

  // Initialize section animations
  const initializeSectionAnimations = (): void => {
    if (!sceneLoaded) return; // Don't initialize until scene is loaded

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
  const animateSection = (section: HTMLElement, show: boolean = true): void => {
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
  const setupScrollTriggers = (): void => {
    if (!sceneLoaded) return; // Don't setup triggers until scene is loaded

    // Clear any existing ScrollTriggers first
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    console.log("Setting up ScrollTriggers with spacers...");

    // Hero section
    ScrollTrigger.create({
      trigger: "#hero",
      start: "top 20%", // Hero tetap 20% karena tidak ada spacer sebelumnya
      end: "bottom 80%",
      onEnter: () => {
        console.log("ScrollTrigger: Entering HERO section");
        if (currentSection !== "hero") {
          currentSection = "hero";
          animateSection(heroSection, true);
        }
        isTransitioning = true;

        // Sync BehindBackground immediately
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("sectionChange", {
              detail: { section: "hero" },
            })
          );
        }

        if ($cameraControls) {
          ($cameraControls as any).reset(true);
        }
        setActiveAnimation("idle");

        setTimeout(() => {
          isTransitioning = false;
        }, 1000);
      },
      onEnterBack: () => {
        console.log("ScrollTrigger: Entering back HERO section");
        currentSection = "hero";
        animateSection(heroSection, true);
        isTransitioning = true;

        // Sync BehindBackground immediately
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("sectionChange", {
              detail: { section: "hero" },
            })
          );
        }

        if ($cameraControls) {
          ($cameraControls as any).reset(true);
        }
        setActiveAnimation("idle");

        setTimeout(() => {
          isTransitioning = false;
        }, 1000);
      },
      onLeave: () => {
        console.log("ScrollTrigger: Leaving HERO section");
        animateSection(heroSection, false);
      },
      onLeaveBack: () => {
        console.log("ScrollTrigger: Leaving back HERO section");
        animateSection(heroSection, false);
      },
    });

    // Projects section
    ScrollTrigger.create({
      trigger: "#projects",
      start: "top 30%", // Lebih lambat masuk karena ada spacer
      end: "bottom 70%", // Lebih cepat keluar untuk smooth transition
      onEnter: () => {
        console.log("ScrollTrigger: Entering PROJECTS section");
        if (currentSection !== "projects") {
          currentSection = "projects";
          animateSection(projectsSection, true);
        }
        isTransitioning = true;

        // Sync BehindBackground immediately
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("sectionChange", {
              detail: { section: "projects" },
            })
          );
        }

        const cameraConfig = getCameraConfig("projects");
        if ($cameraControls) {
          ($cameraControls as any).setPosition(
            cameraConfig.position[0],
            cameraConfig.position[1],
            cameraConfig.position[2],
            true
          );
          ($cameraControls as any).moveTo(
            cameraConfig.target[0],
            cameraConfig.target[1],
            cameraConfig.target[2],
            true
          );
        }

        setActiveAnimation("run");

        setTimeout(() => {
          isTransitioning = false;
        }, 1000);
      },
      onEnterBack: () => {
        console.log("ScrollTrigger: Entering back PROJECTS section");
        currentSection = "projects";
        animateSection(projectsSection, true);
        isTransitioning = true;

        // Sync BehindBackground immediately
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("sectionChange", {
              detail: { section: "projects" },
            })
          );
        }

        const cameraConfig = getCameraConfig("projects");
        if ($cameraControls) {
          ($cameraControls as any).setPosition(
            cameraConfig.position[0],
            cameraConfig.position[1],
            cameraConfig.position[2],
            true
          );
          ($cameraControls as any).moveTo(
            cameraConfig.target[0],
            cameraConfig.target[1],
            cameraConfig.target[2],
            true
          );
        }

        setActiveAnimation("run");

        setTimeout(() => {
          isTransitioning = false;
        }, 1000);
      },
      onLeave: () => {
        console.log("ScrollTrigger: Leaving PROJECTS section");
        animateSection(projectsSection, false);
      },
      onLeaveBack: () => {
        console.log("ScrollTrigger: Leaving back PROJECTS section");
        animateSection(projectsSection, false);

        // Reset to hero when leaving projects going back
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("sectionChange", {
              detail: { section: "hero" },
            })
          );
        }

        if ($cameraControls) {
          ($cameraControls as any).reset(true);
        }
        setActiveAnimation("idle");
      },
      scrub: false,
      onUpdate: (self) => {
        scrollProgress = self.progress;
        const discreteProgress = Math.floor(self.progress * 10) / 10;

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

    // About section - FIX TRIGGER!
    ScrollTrigger.create({
      trigger: "#about",
      start: "top 30%", // Lebih lambat masuk karena ada spacer
      end: "bottom 70%", // Lebih cepat keluar untuk smooth transition
      onEnter: () => {
        console.log("ScrollTrigger: Entering ABOUT section");
        if (currentSection !== "about") {
          currentSection = "about";
          animateSection(aboutSection, true);
        }
        isTransitioning = true;

        // Sync BehindBackground immediately
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("sectionChange", {
              detail: { section: "about" },
            })
          );
        }

        const cameraConfig = getCameraConfig("about");
        if ($cameraControls) {
          ($cameraControls as any).setPosition(
            cameraConfig.position[0],
            cameraConfig.position[1],
            cameraConfig.position[2],
            true
          );
          ($cameraControls as any).moveTo(
            cameraConfig.target[0],
            cameraConfig.target[1],
            cameraConfig.target[2],
            true
          );
        }

        setActiveAnimation("idlePose");

        setTimeout(() => {
          isTransitioning = false;
        }, 1000);
      },
      onEnterBack: () => {
        console.log("ScrollTrigger: Entering back ABOUT section");
        currentSection = "about";
        animateSection(aboutSection, true);
        isTransitioning = true;

        // Sync BehindBackground immediately
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("sectionChange", {
              detail: { section: "about" },
            })
          );
        }

        const cameraConfig = getCameraConfig("about");
        if ($cameraControls) {
          ($cameraControls as any).setPosition(
            cameraConfig.position[0],
            cameraConfig.position[1],
            cameraConfig.position[2],
            true
          );
          ($cameraControls as any).moveTo(
            cameraConfig.target[0],
            cameraConfig.target[1],
            cameraConfig.target[2],
            true
          );
        }

        setActiveAnimation("idlePose");

        setTimeout(() => {
          isTransitioning = false;
        }, 1000);
      },
      onLeave: () => {
        console.log("ScrollTrigger: Leaving ABOUT section");
        animateSection(aboutSection, false);
      },
      onLeaveBack: () => {
        console.log("ScrollTrigger: Leaving back ABOUT section");
        animateSection(aboutSection, false);

        // Go back to projects
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("sectionChange", {
              detail: { section: "projects" },
            })
          );
        }

        const cameraConfig = getCameraConfig("projects");
        if ($cameraControls) {
          ($cameraControls as any).setPosition(
            cameraConfig.position[0],
            cameraConfig.position[1],
            cameraConfig.position[2],
            true
          );
          ($cameraControls as any).moveTo(
            cameraConfig.target[0],
            cameraConfig.target[1],
            cameraConfig.target[2],
            true
          );
        }

        setActiveAnimation("run");
      },
    });

    // Contact section
    ScrollTrigger.create({
      trigger: "#contact",
      start: "top 30%", // Lebih lambat masuk karena ada spacer
      end: "bottom 70%", // Lebih cepat keluar untuk smooth transition
      onEnter: () => {
        console.log("ScrollTrigger: Entering CONTACT section");
        if (currentSection !== "contact") {
          currentSection = "contact";
          animateSection(contactSection, true);
        }
        isTransitioning = true;

        // Sync BehindBackground immediately
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("sectionChange", {
              detail: { section: "contact" },
            })
          );
        }

        const cameraConfig = getCameraConfig("contact");
        if ($cameraControls) {
          ($cameraControls as any).setPosition(
            cameraConfig.position[0],
            cameraConfig.position[1],
            cameraConfig.position[2],
            true
          );
          ($cameraControls as any).moveTo(
            cameraConfig.target[0],
            cameraConfig.target[1],
            cameraConfig.target[2],
            true
          );
        }

        setActiveAnimation("respawn");

        setTimeout(() => {
          isTransitioning = false;
        }, 1000);
      },
      onEnterBack: () => {
        console.log("ScrollTrigger: Entering back CONTACT section");
        currentSection = "contact";
        animateSection(contactSection, true);
        isTransitioning = true;

        // Sync BehindBackground immediately
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("sectionChange", {
              detail: { section: "contact" },
            })
          );
        }

        const cameraConfig = getCameraConfig("contact");
        if ($cameraControls) {
          ($cameraControls as any).setPosition(
            cameraConfig.position[0],
            cameraConfig.position[1],
            cameraConfig.position[2],
            true
          );
          ($cameraControls as any).moveTo(
            cameraConfig.target[0],
            cameraConfig.target[1],
            cameraConfig.target[2],
            true
          );
        }

        setActiveAnimation("respawn");

        setTimeout(() => {
          isTransitioning = false;
        }, 1000);
      },
      onLeave: () => {
        console.log("ScrollTrigger: Leaving CONTACT section");
        animateSection(contactSection, false);
      },
      onLeaveBack: () => {
        console.log("ScrollTrigger: Leaving back CONTACT section");
        animateSection(contactSection, false);

        // Go back to about
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("sectionChange", {
              detail: { section: "about" },
            })
          );
        }

        const cameraConfig = getCameraConfig("about");
        if ($cameraControls) {
          ($cameraControls as any).setPosition(
            cameraConfig.position[0],
            cameraConfig.position[1],
            cameraConfig.position[2],
            true
          );
          ($cameraControls as any).moveTo(
            cameraConfig.target[0],
            cameraConfig.target[1],
            cameraConfig.target[2],
            true
          );
        }

        setActiveAnimation("idlePose");
      },
    });

    // Refresh ScrollTrigger setelah setup
    ScrollTrigger.refresh();
  };

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

<!-- 3D Scene -->
<div class="fixed z-20 w-full h-screen">
  <Canvas>
    <Scene
      on:loadProgress={handleLoadProgress}
      on:loadComplete={handleLoadComplete}
    />
  </Canvas>
</div>

<!-- Main content -->
<main class="relative z-30">
  <section
    bind:this={heroSection}
    id="hero"
    class="h-screen flex flex-col md:flex-col relative justify-center items-center"
    class:active={currentSection === "hero"}
  >
    <div class="flex justify-between w-full md:w-1/2 px-4 md:px-0">
      <p class="text-white font-druk text-xs md:text-sm animate-in">
        Let's <br /> Drive
      </p>
      <p class="text-white font-druk text-xs md:text-sm animate-in">
        I'm Painting <br /> on
        <span class="text-[#cc4f55]">&lt;canvas/&gt;</span>
      </p>
    </div>

    <p
      class="text-white font-light bottom-4 md:bottom-0 flex flex-col items-center absolute animate-bounce animate-in"
    >
      Scroll down
      <ChevronDown size={24} />
    </p>
  </section>

  <!-- Spacer between hero and projects -->
  <div class="h-32 md:h-48"></div>

  <section
    bind:this={projectsSection}
    id="projects"
    class="flex flex-col justify-center items-center relative min-h-screen py-8"
    class:active={currentSection === "projects"}
  >
    <div class="w-full animate-in mb-12">
      <WhatIDo />
    </div>
    <div class="w-full animate-in">
      <MyWork />
    </div>
  </section>

  <!-- Spacer between projects and about -->
  <div class="h-32 md:h-48"></div>

  <section
    bind:this={aboutSection}
    id="about"
    class="flex flex-col md:flex-row justify-center items-center relative min-h-screen py-8"
    class:active={currentSection === "about"}
  >
    <div class="w-full md:w-1/2 animate-in flex justify-center p-4 md:p-0">
      <ProgressBar />
    </div>
    <div class="w-full md:w-1/2 animate-in">
      <MyExperience />
    </div>
  </section>

  <!-- Spacer between about and contact -->
  <div class="h-32 md:h-48"></div>

  <section
    bind:this={contactSection}
    id="contact"
    class="h-screen flex flex-col md:flex-row justify-center items-center"
    class:active={currentSection === "contact"}
  >
    <div class="w-full md:w-2/5 flex animate-in order-2 md:order-1"></div>
    <div class="animate-in order-1 md:order-2 p-4 md:p-0">
      <ContactCard />
    </div>
  </section>
</main>

<style>
  main {
    position: relative;
  }

  section {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    transition: opacity 0.3s ease;
  }

  /* Projects section can be taller */
  section#projects {
    height: auto;
    min-height: 100vh;
    padding: 4rem 0;
  }

  /* About section can also be taller for timeline */
  section#about {
    height: auto;
    min-height: 100vh;
    padding: 4rem 0;
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
