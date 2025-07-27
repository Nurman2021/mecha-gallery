<script>
  import { Instagram, Github, Linkedin, Mail, Briefcase } from "lucide-svelte";
</script>

<div class="text-center">
  <h2 class="text-white font-druk text-2xl mb-8">GET IN TOUCH</h2>
  <div class="bg-[#68151D] p-2 rounded-2xl relative">
    <div class="bg-black rounded-2xl p-4 flex gap-4">
      <div class="text-left my-8">
        <h1 class="text-white font-bold text-5xl">Hi, I'm Nurman 👋</h1>
        <h4 class="text-white">
          Frontend Developer. I love building things that make difference.
        </h4>
      </div>

      <img
        src="https://ik.imagekit.io/nurman/Portofolio/nurman-profile-portofolio.png?updatedAt=1727346483705"
        alt="nurman"
        class=" h-24 w-24 rounded-full"
      />
    </div>
    <div
      class="bg-white flex py-4 justify-center rounded-full gap-4 w-1/2 mx-auto -mt-8"
    >
      <a href="/ig"><Instagram /></a>
      <a href="/linkedind"><Linkedin /></a>
      <a href="/github"><Github /></a>
      <a href="/mail"><Mail /></a>
      <a href="/cv"><Briefcase /></a>
    </div>
  </div>
</div>
