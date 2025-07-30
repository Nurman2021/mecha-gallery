<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { MoveUpRight } from "lucide-svelte";

  const projects = [
    {
      id: 1,
      title: "Starwars Helmet",
      description: "Interactive 3D helmet visualization",
      image: "/images/porto/starwars.png",
      technologies: ["threejs", "javascript", "css3"],
      liveUrl: "https://starwars-helmet.vercel.app/",
      repoUrl: "https://github.com/Nurman2021/starwars-helmet",
      size: "large",
    },
    {
      id: 2,
      title: "Dermasense",
      description: "AI-powered skin analysis platform",
      image: "/images/porto/derma.png",
      technologies: ["svelte", "supabase", "tailwindcss"],
      liveUrl: "https://www.dermasense.skin",
      repoUrl: "https://github.com/Nurman2021/dermasense_web_app",
      size: "medium",
    },
    {
      id: 3,
      title: "Algo Coffee",
      description: "Modern coffee shop experience",
      image: "/images/porto/algo.png",
      technologies: ["svelte", "threejs", "tailwindcss"],
      liveUrl: "https://algo-coffee.vercel.app/",
      repoUrl: "https://github.com/Nurman2021/algoCoffee",
      size: "medium",
    },
    {
      id: 4,
      title: "Zafa Clone",
      description: "Transportation service clone",
      image: "/images/porto/zafa.png",
      technologies: ["nextjs", "tailwindcss", "antdesign"],
      liveUrl: "https://algo-coffee.vercel.app/",
      repoUrl: "https://github.com/Nurman2021/zafatrans-clone",
      size: "small",
    },
  ];

  let container: HTMLElement;

  onMount(() => {
    // Animate project cards on mount
    gsap.fromTo(
      container.querySelectorAll(".project-card"),
      { opacity: 0, scale: 0.8, rotationY: 45 },
      {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.3,
      }
    );
  });
</script>

<div bind:this={container} class="my-work-container">
  <h2 class="section-title">My Work</h2>

  <div class="bento-grid">
    {#each projects as project}
      <div class="project-card {project.size}">
        <div class="project-image">
          <img src={project.image} alt={project.title} />
          <div class="image-overlay"></div>
        </div>

        <div class="project-content">
          <div class="project-header">
            <h3 class="project-title">{project.title}</h3>
            <div class="project-links">
              <a
                href={project.liveUrl}
                target="_blank"
                class="project-link"
                title="Live Site"
              >
                <MoveUpRight size={16} />
              </a>
              <a
                href={project.repoUrl}
                target="_blank"
                class="project-link"
                title="Repository"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
              </a>
            </div>
          </div>

          <p class="project-description">{project.description}</p>

          <div class="project-tech">
            {#each project.technologies as tech}
              <span class="tech-tag">
                <i
                  class="devicon-{tech}-{tech === 'nextjs'
                    ? 'original'
                    : 'plain'}"
                ></i>
                {tech}
              </span>
            {/each}
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .my-work-container {
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

  .bento-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(8, 100px);
    gap: 1rem;
    min-height: 800px;
  }

  .project-card {
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7));
    border: 2px solid #68151d;
    border-radius: 1rem;
    overflow: hidden;
    position: relative;
    transition: all 0.3s ease;
    opacity: 0;
    cursor: pointer;
  }

  .project-card:hover {
    transform: translateY(-5px);
    border-color: #cc4f55;
    box-shadow: 0 20px 40px rgba(204, 79, 85, 0.2);
  }

  /* Bento Grid Sizes */
  .project-card.large {
    grid-column: span 8;
    grid-row: span 5;
  }

  .project-card.medium {
    grid-column: span 4;
    grid-row: span 4;
  }

  .project-card.small {
    grid-column: span 4;
    grid-row: span 3;
  }

  .project-image {
    position: relative;
    height: 60%;
    overflow: hidden;
  }

  .project-card.small .project-image {
    height: 50%;
  }

  .project-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: contrast(120%) brightness(85%);
    transition: transform 0.3s ease;
  }

  .project-card:hover .project-image img {
    transform: scale(1.1);
  }

  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgba(0, 0, 0, 0.8) 100%
    );
  }

  .project-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1.5rem;
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .project-card.small .project-content {
    height: 50%;
    padding: 1rem;
  }

  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.5rem;
  }

  .project-title {
    font-family: "Druk", sans-serif;
    font-size: 1.2rem;
    color: #cc4f55;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .project-card.small .project-title {
    font-size: 1rem;
  }

  .project-links {
    display: flex;
    gap: 0.5rem;
  }

  .project-link {
    color: white;
    padding: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 0.5rem;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .project-link:hover {
    color: #cc4f55;
    border-color: #cc4f55;
    background: rgba(204, 79, 85, 0.1);
  }

  .project-description {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
    line-height: 1.4;
    margin: 0.5rem 0;
    flex-grow: 1;
  }

  .project-card.small .project-description {
    font-size: 0.8rem;
    display: none; /* Hide description on small cards to save space */
  }

  .project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: auto;
  }

  .tech-tag {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
    font-size: 0.75rem;
    text-transform: uppercase;
    font-weight: 500;
  }

  .project-card.small .tech-tag {
    font-size: 0.7rem;
    padding: 0.2rem 0.4rem;
  }

  .tech-tag i {
    font-size: 1rem;
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .my-work-container {
      padding: 1rem;
    }

    .section-title {
      font-size: 2rem;
      margin-bottom: 2rem;
    }

    .bento-grid {
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      gap: 1rem;
      min-height: auto;
    }

    .project-card {
      grid-column: 1 !important;
      grid-row: auto !important;
      min-height: 300px;
    }

    .project-card.small {
      min-height: 250px;
    }

    .project-image {
      height: 50%;
    }

    .project-content {
      height: 50%;
      padding: 1rem;
    }

    .project-title {
      font-size: 1rem;
    }

    .project-description {
      display: block !important;
      font-size: 0.8rem;
    }
  }
</style>
