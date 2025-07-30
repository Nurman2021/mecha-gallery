<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";

  const experiences = [
    {
      id: 1,
      year: "2023 - Present",
      title: "Senior Frontend Developer",
      company: "Tech Innovation Lab",
      description:
        "Leading frontend development team, implementing modern web technologies and mentoring junior developers. Focus on React, Svelte, and Three.js applications.",
      technologies: ["svelte", "react", "threejs", "typescript"],
      achievements: [
        "Increased app performance by 40%",
        "Led team of 5 developers",
        "Implemented 3D visualization features",
      ],
    },
    {
      id: 2,
      year: "2022 - 2023",
      title: "Frontend Developer",
      company: "Digital Creative Studio",
      description:
        "Developed interactive websites and web applications with focus on user experience and modern design patterns. Specialized in animation and 3D web experiences.",
      technologies: ["javascript", "css3", "threejs", "gsap"],
      achievements: [
        "Built 15+ interactive websites",
        "Specialized in 3D web experiences",
        "Improved client satisfaction by 35%",
      ],
    },
    {
      id: 3,
      year: "2021 - 2022",
      title: "Junior Web Developer",
      company: "StartUp Solutions",
      description:
        "Started career developing responsive websites and learning modern web technologies. Gained experience in full-stack development and agile methodologies.",
      technologies: ["html5", "css3", "javascript", "nodejs"],
      achievements: [
        "Delivered 20+ projects on time",
        "Learned modern development practices",
        "Contributed to open source projects",
      ],
    },
    {
      id: 4,
      year: "2020 - 2021",
      title: "Freelance Web Developer",
      company: "Self Employed",
      description:
        "Worked with various clients to create custom websites and web applications. Gained experience in client communication and project management.",
      technologies: ["wordpress", "php", "javascript", "css3"],
      achievements: [
        "Served 30+ satisfied clients",
        "Built diverse project portfolio",
        "Learned business fundamentals",
      ],
    },
  ];

  let container: HTMLElement;

  onMount(() => {
    // Disable internal animations - let App.svelte handle them
    // Animation will be handled by App.svelte through .animate-in classes

    // Only animate timeline line after section is visible
    setTimeout(() => {
      gsap.fromTo(
        container.querySelector(".timeline-line"),
        { height: 0 },
        {
          height: "100%",
          duration: 2,
          ease: "power2.out",
          delay: 0.5,
        }
      );
    }, 800); // Wait for section animation to complete
  });
</script>

<div bind:this={container} class="my-experience-container animate-in">
  <h2 class="section-title animate-in">My Experience</h2>

  <div class="timeline animate-in">
    <div class="timeline-line"></div>

    {#each experiences as experience, index}
      <div class="timeline-item animate-in" class:reverse={index % 2 === 1}>
        <div class="timeline-marker">
          <div class="marker-dot"></div>
          <div class="marker-year">{experience.year}</div>
        </div>

        <div class="timeline-content">
          <div class="experience-card">
            <div class="experience-header">
              <h3 class="experience-title">{experience.title}</h3>
              <p class="experience-company">{experience.company}</p>
            </div>

            <p class="experience-description">
              {experience.description}
            </p>

            <div class="experience-achievements">
              <h4>Key Achievements:</h4>
              <ul>
                {#each experience.achievements as achievement}
                  <li>{achievement}</li>
                {/each}
              </ul>
            </div>

            <div class="experience-tech">
              {#each experience.technologies as tech}
                <span class="tech-badge">
                  <i
                    class="devicon-{tech}-{tech === 'nodejs' ||
                    tech === 'typescript' ||
                    tech === 'wordpress'
                      ? 'plain'
                      : 'original'}"
                  ></i>
                  {tech}
                </span>
              {/each}
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .my-experience-container {
    width: 100%;
    max-width: 1000px;
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

  .timeline {
    position: relative;
    padding: 2rem 0;
  }

  .timeline-line {
    position: absolute;
    left: 50%;
    top: 0;
    width: 4px;
    height: 0;
    background: linear-gradient(180deg, #cc4f55, #68151d);
    transform: translateX(-50%);
    border-radius: 2px;
  }

  .timeline-item {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 4rem;
  }

  .timeline-item:last-child {
    margin-bottom: 0;
  }

  .timeline-marker {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;
  }

  .marker-dot {
    width: 20px;
    height: 20px;
    background: #cc4f55;
    border: 4px solid #000;
    border-radius: 50%;
    box-shadow: 0 0 20px rgba(204, 79, 85, 0.5);
  }

  .marker-year {
    background: #cc4f55;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    font-weight: bold;
    font-size: 0.8rem;
    margin-top: 0.5rem;
    white-space: nowrap;
    font-family: "Druk", sans-serif;
  }

  .timeline-content {
    width: 45%;
  }

  .timeline-item:nth-child(odd) .timeline-content {
    margin-right: auto;
    padding-right: 2rem;
  }

  .timeline-item:nth-child(even) .timeline-content {
    margin-left: auto;
    padding-left: 2rem;
  }

  .experience-card {
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7));
    border: 2px solid #68151d;
    border-radius: 1rem;
    padding: 2rem;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .experience-card:hover {
    transform: translateY(-5px);
    border-color: #cc4f55;
    box-shadow: 0 20px 40px rgba(204, 79, 85, 0.2);
  }

  .experience-header {
    margin-bottom: 1rem;
  }

  .experience-title {
    font-family: "Druk", sans-serif;
    font-size: 1.3rem;
    color: #cc4f55;
    margin: 0 0 0.5rem 0;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .experience-company {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1rem;
    margin: 0;
    font-weight: 500;
  }

  .experience-description {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .experience-achievements {
    margin-bottom: 1.5rem;
  }

  .experience-achievements h4 {
    color: white;
    font-size: 0.9rem;
    margin: 0 0 0.8rem 0;
    font-weight: 600;
  }

  .experience-achievements ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .experience-achievements li {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.85rem;
    padding: 0.3rem 0;
    position: relative;
    padding-left: 1.5rem;
  }

  .experience-achievements li::before {
    content: "▸";
    color: #cc4f55;
    position: absolute;
    left: 0;
    font-weight: bold;
  }

  .experience-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tech-badge {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    background: rgba(204, 79, 85, 0.1);
    border: 1px solid rgba(204, 79, 85, 0.3);
    color: white;
    padding: 0.4rem 0.8rem;
    border-radius: 0.5rem;
    font-size: 0.75rem;
    text-transform: uppercase;
    font-weight: 500;
  }

  .tech-badge i {
    font-size: 1rem;
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .my-experience-container {
      padding: 1rem;
    }

    .section-title {
      font-size: 2rem;
      margin-bottom: 2rem;
    }

    .timeline-line {
      left: 2rem;
    }

    .timeline-item {
      flex-direction: column;
      align-items: flex-start;
      padding-left: 4rem;
    }

    .timeline-marker {
      left: 2rem;
      position: absolute;
      top: 0;
    }

    .marker-year {
      writing-mode: vertical-rl;
      text-orientation: mixed;
      padding: 1rem 0.5rem;
      margin-top: 1rem;
      margin-left: 2rem;
    }

    .timeline-content {
      width: 100%;
      padding-left: 0 !important;
      padding-right: 0 !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
    }

    .experience-card {
      padding: 1.5rem;
    }

    .experience-title {
      font-size: 1.1rem;
    }

    .experience-achievements li {
      font-size: 0.8rem;
    }

    .tech-badge {
      font-size: 0.7rem;
      padding: 0.3rem 0.6rem;
    }
  }
</style>
