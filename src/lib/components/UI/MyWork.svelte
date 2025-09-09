<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { MoveUpRight, Github } from "lucide-svelte";

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
      category: "frontend-dev",
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
      category: "sveltekit",
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
      category: "sveltekit",
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
      category: "nextjs",
    },
    {
      id: 5,
      title: "Cognir AI Platform",
      description: "AI Analysis Platform",
      image: "/images/porto/cognir.png",
      technologies: ["nextjs", "tailwindcss", "radix ui"],
      liveUrl: "https://algo-coffee.vercel.app/",
      repoUrl: "https://github.com/Nurman2021/zafatrans-clone",
      size: "small",
      category: "nextjs",
    },
  ];

  // Tab system
  const tabs = [
    { id: "frontend-dev", label: "Frontend Dev", count: projects.length },
    { id: "sveltekit", label: "SvelteKit", count: projects.filter(p => p.category === "sveltekit").length },
    { id: "nextjs", label: "Next.js", count: projects.filter(p => p.category === "nextjs").length },
  ];

  let activeTab = "frontend-dev";
  let container: HTMLElement;
  let isAnimating = false;

  // Reactive filtered projects
  $: filteredProjects = activeTab === "frontend-dev" 
    ? projects 
    : projects.filter(project => project.category === activeTab);

  // Tab switching function
  const switchTab = async (tabId: string) => {
    if (tabId === activeTab || isAnimating) return;
    
    isAnimating = true;

    // Animate out current projects
    await gsap.to(container.querySelectorAll(".project-card"), {
      opacity: 0,
      scale: 0.8,
      rotationY: -45,
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.in"
    });

    // Switch tab
    activeTab = tabId;

    // Wait for DOM update
    await new Promise(resolve => setTimeout(resolve, 50));

    // Animate in new projects
    gsap.fromTo(
      container.querySelectorAll(".project-card"),
      { opacity: 0, scale: 0.8, rotationY: 45 },
      {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        onComplete: () => {
          isAnimating = false;
        }
      }
    );
  };

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

  <!-- Tab Navigation -->
  <div class="tab-container">
    {#each tabs as tab}
      <button
        class="tab-button"
        class:active={activeTab === tab.id}
        class:disabled={isAnimating}
        on:click={() => switchTab(tab.id)}
      >
        {tab.label}
        <span class="tab-count">({tab.count})</span>
      </button>
    {/each}
  </div>

  <!-- Projects Grid -->
  <div class="bento-grid">
    {#each filteredProjects as project (project.id)}
      <div class="project-card {project.size}">
        <div class="project-image">
          <img src={project.image} alt={project.title} />
          <div class="image-overlay"></div>
        </div>

        <div class="project-content">
          <div class="project-header">
            <h3 class="project-title font-druk text-lg">{project.title}</h3>
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
                <Github size={16} />
              </a>
            </div>
          </div>

          <p class="project-description text-left text-sm">
            {project.description}
          </p>

          <div class="project-tech">
            {#each project.technologies as tech}
              <span class="tech-tag">
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
    color: var(--text-color);
    text-align: center;
    margin-bottom: 2rem;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  /* Tab System Styles */
  .tab-container {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
  }

  .tab-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    color: var(--text-color);
    padding: 0.8rem 1.5rem;
    border-radius: 2rem;
    font-weight: 600;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    cursor: pointer;
    backdrop-filter: blur(10px);
  }

  :global(.light-theme) .tab-button {
    background: rgba(139, 127, 115, 0.1);
    border: 2px solid rgba(139, 127, 115, 0.3);
  }

  .tab-button:hover:not(.disabled) {
    background: rgba(255, 255, 255, 0.2);
    border-color: var(--primary-color);
  }

  :global(.light-theme) .tab-button:hover:not(.disabled) {
    background: rgba(139, 127, 115, 0.2);
  }

  .tab-button.active {
    background: var(--primary-color);
    border-color: var(--primary-color);
    color: white;
  }

  .tab-button.disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .tab-count {
    font-size: 0.8rem;
    opacity: 0.8;
    font-weight: 500;
  }

  .tab-button.active .tab-count {
    opacity: 1;
  }

  .bento-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(8, 100px);
    gap: 1rem;
    min-height: 800px;
  }

  .project-card {
    background: rgba(0, 0, 0, 0.3);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    overflow: hidden;
    position: relative;
    transition: all 0.3s ease;
    opacity: 0;
    cursor: pointer;
  }

  /* Light theme project cards */
  :global(.light-theme) .project-card {
    background: rgba(255, 255, 255, 0.9);
    border: 2px solid rgba(139, 127, 115, 0.2);
    box-shadow: 0 4px 20px rgba(139, 127, 115, 0.1);
  }

  .project-card:hover {
    transform: translateY(-5px);
    border-color: var(--primary-color);
  }

  /* Dark theme hover */
  :global(.dark-theme) .project-card:hover {
    box-shadow: 0 20px 40px rgba(204, 79, 85, 0.2);
  }

  /* Light theme hover */
  :global(.light-theme) .project-card:hover {
    box-shadow: 0 20px 40px rgba(247, 181, 0, 0.2);
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
    color: var(--primary-color);
  }

  .project-description {
    color: var(--text-color);
    opacity: 0.9;
  }

  .project-links {
    display: flex;
    gap: 0.5rem;
  }

  .project-link {
    color: var(--text-color);
    padding: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 0.5rem;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :global(.light-theme) .project-link {
    border: 1px solid rgba(139, 127, 115, 0.3);
  }

  .project-link:hover {
    background: var(--primary-color);
    border-color: var(--primary-color);
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
    color: var(--text-color);
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
    font-size: 0.75rem;
    text-transform: uppercase;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  :global(.light-theme) .tech-tag {
    background: rgba(139, 127, 115, 0.1);
  }

  .tech-tag:hover {
    background: var(--primary-color);
    color: white;
  }

  .project-card.small .tech-tag {
    font-size: 0.7rem;
    padding: 0.2rem 0.4rem;
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .my-work-container {
      padding: 1rem;
    }

    .section-title {
      font-size: 2rem;
      margin-bottom: 1.5rem;
    }

    .tab-container {
      gap: 0.5rem;
      margin-bottom: 2rem;
    }

    .tab-button {
      padding: 0.6rem 1rem;
      font-size: 0.8rem;
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
      background: rgba(255, 255, 255, 0.15);
    }

    :global(.light-theme) .project-card {
      background: rgba(139, 127, 115, 0.15);
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

    .project-description {
      display: block !important;
      font-size: 0.8rem;
    }
  }
</style>
