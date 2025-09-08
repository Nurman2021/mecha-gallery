<div class="progress-container w-full max-w-lg p-4 rounded-2xl">
  <h2
    class="progress-title font-druk text-2xl md:text-4xl mb-8 text-left hidden md:block"
  >
    MY TOOL
  </h2>
  <div class="space-y-6 text-left">
    <div>
      <p class="skill-label md:text-lg text-base font-bold mb-2">Svelte</p>
      <div class="skill-bg w-full h-5 rounded-full overflow-hidden relative">
        <div
          class="skill-bar h-full w-3/4 transition-all duration-1000 ease-out flex items-center justify-end pr-2"
        >
          <span class="skill-percentage text-xs md:font-semibold">75%</span>
        </div>
      </div>
    </div>
    <div>
      <p class="skill-label md:text-lg text-base font-bold mb-2">Photoshop</p>
      <div class="skill-bg w-full h-5 rounded-full overflow-hidden relative">
        <div
          class="skill-bar h-full w-2/4 transition-all duration-1000 ease-out delay-200 flex items-center justify-end pr-2"
        >
          <span class="skill-percentage text-xs md:font-semibold">50%</span>
        </div>
      </div>
    </div>
    <div>
      <p class="skill-label md:text-lg text-base font-bold mb-2">CSS</p>
      <div class="skill-bg w-full h-5 rounded-full overflow-hidden relative">
        <div class="skill-bar h-full w-4/5 flex items-center justify-end pr-2">
          <span class="skill-percentage text-xs md:font-semibold">80%</span>
        </div>
      </div>
    </div>
    <div>
      <p class="skill-label md:text-lg text-base font-bold mb-2">Tailwind</p>
      <div class="skill-bg w-full h-5 rounded-full overflow-hidden relative">
        <div class="skill-bar h-full w-full flex items-center justify-end pr-2">
          <span class="skill-percentage text-xs md:font-semibold">100%</span>
        </div>
      </div>
    </div>
    <div>
      <p class="skill-label md:text-lg text-base font-bold mb-2">NextJS</p>
      <div class="skill-bg w-full h-5 rounded-full overflow-hidden relative">
        <div class="skill-bar h-full w-1/4 flex items-center justify-end pr-2">
          <span class="skill-percentage text-xs md:font-semibold">25%</span>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .progress-container {
    background: rgba(107, 114, 128, 0.5);
    backdrop-filter: blur(10px);
  }

  :global(.light-theme) .progress-container {
    background: rgba(139, 127, 115, 0.2);
  }

  @media (min-width: 768px) {
    .progress-container {
      background: transparent;
    }
  }

  .progress-title {
    color: var(--text-color);
  }

  .skill-label {
    color: var(--text-color);
  }

  .skill-bg {
    background: rgba(229, 231, 235, 0.3);
  }

  :global(.light-theme) .skill-bg {
    background: rgba(139, 127, 115, 0.2);
  }

  .skill-bar {
    background: linear-gradient(
      90deg,
      var(--primary-color),
      var(--primary-color)
    );
    transition: all 0.3s ease;
  }

  :global(.dark-theme) .skill-bar {
    background: linear-gradient(90deg, #cc4f55, #ff6b6b);
  }

  :global(.light-theme) .skill-bar {
    background: linear-gradient(90deg, #f7b500, #ffcc33);
  }

  .skill-percentage {
    color: white;
  }

  .skill-bar:hover {
    filter: brightness(1.1);
  }
</style>
