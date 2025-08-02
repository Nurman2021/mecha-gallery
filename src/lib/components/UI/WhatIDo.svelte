<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { Palette, Zap, Code } from "lucide-svelte";

  const services = [
    {
      id: 1,
      title: "Designing",
      description:
        "Creating beautiful and intuitive user interfaces with modern design principles",
      icon: Palette,
      technologies: ["figma", "photoshop", "illustrator"],
      color: "#cc4f55",
    },
    {
      id: 2,
      title: "Optimizing",
      description:
        "Enhancing performance and user experience through code optimization and best practices",
      icon: Zap,
      technologies: ["webpack", "vite", "lighthouse"],
      color: "#55cc4f",
    },
    {
      id: 3,
      title: "Developing",
      description:
        "Building interactive web applications using modern frameworks and technologies",
      icon: Code,
      technologies: ["svelte", "react", "threejs", "javascript"],
      color: "#4f55cc",
    },
  ];

  let container: HTMLElement;

  onMount(() => {
    // Animate cards on mount
    gsap.fromTo(
      container.querySelectorAll(".service-card"),
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.5,
      }
    );
  });
</script>

<div bind:this={container} class="what-i-do-container">
  <h2 class="section-title">What I Do</h2>

  <div class="services-grid">
    {#each services as service}
      <div class="service-card" style="--accent-color: {service.color}">
        <div class="service-icon">
          <svelte:component this={service.icon} size={48} />
        </div>

        <h3 class="service-title">{service.title}</h3>

        <p class="service-description">
          {service.description}
        </p>

        <div class="service-tech">
          {#each service.technologies as tech}
            <i
              class="devicon-{tech}-{tech === 'javascript' ||
              tech === 'webpack' ||
              tech === 'vite' ||
              tech === 'lighthouse'
                ? 'plain'
                : 'original'}"
            ></i>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .what-i-do-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .section-title {
    font-family: "Druk", sans-serif;
    font-size: 2.5rem;
    color: white;
    text-align: center;
    margin-bottom: 3rem;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    align-items: stretch;
  }

  .service-card {
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6));
    border: 2px solid #68151d;
    border-radius: 1rem;
    padding: 2rem;
    text-align: center;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(10px);
    opacity: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .service-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--accent-color);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  .service-card:hover::before {
    transform: scaleX(1);
  }

  .service-card:hover {
    transform: translateY(-10px);
    border-color: var(--accent-color);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  }

  .service-icon {
    font-size: 3rem;
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--accent-color);
  }

  .service-title {
    font-family: "Druk", sans-serif;
    font-size: 1.5rem;
    color: var(--accent-color);
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .service-description {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    flex-grow: 1;
  }

  .service-tech {
    display: flex;
    justify-content: center;
    gap: 1rem;
    font-size: 1.5rem;
    margin-top: auto;
  }

  .service-tech i {
    opacity: 0.7;
    transition: all 0.3s ease;
  }

  .service-tech i:hover {
    opacity: 1;
    transform: scale(1.2);
    color: var(--accent-color);
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .what-i-do-container {
      padding: 1rem;
    }

    .section-title {
      font-size: 2rem;
      margin-bottom: 2rem;
    }

    .services-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .service-card {
      padding: 1.5rem;
    }

    .service-title {
      font-size: 1.2rem;
    }

    .service-description {
      font-size: 0.85rem;
    }

    .service-tech {
      font-size: 1.2rem;
      gap: 0.8rem;
    }
  }
</style>
