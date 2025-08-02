<script lang="ts">
  import { Instagram, Github, Linkedin, Mail, Briefcase } from "lucide-svelte";
  import { onMount } from "svelte";

  let form: HTMLFormElement;
  let isSubmitting = false;
  let submitMessage = "";

  onMount(() => {
    // Initialize EmailJS
    if (typeof window !== "undefined") {
      import("@emailjs/browser").then((emailjs) => {
        emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS user ID
      });
    }
  });

  async function handleSubmit(event: Event) {
    event.preventDefault();
    isSubmitting = true;
    submitMessage = "";

    try {
      const emailjs = await import("@emailjs/browser");

      await emailjs.sendForm(
        "service_n9efrj6", // Replace with your EmailJS service ID
        "template_rax8qpj", // Replace with your EmailJS template ID
        form,
        "poy2f3j34ZDCQza4v" // Replace with your EmailJS user ID
      );

      submitMessage = "Message sent successfully!";
      form.reset();
    } catch (error) {
      console.error("Error sending email:", error);
      submitMessage = "Failed to send message. Please try again.";
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div class="text-center">
  <h2 class="text-white font-druk text-2xl mb-8 invisible md:visible">
    GET IN TOUCH
  </h2>

  <div
    class="bg-black rounded-2xl p-4 border-[#68151D] border-2 mb-4 flex gap-4 invisible md:visible"
  >
    <div class="text-left my-8">
      <h1 class="text-white font-bold text-4xl">Hi, I'm Nurman 👋</h1>
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

  <!-- Contact Form -->
  <div class="bg-black p-6 border-2 border-[#68151D] rounded-2xl">
    <form bind:this={form} on:submit={handleSubmit} class="space-y-4">
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name :"
          required
          class="w-full p-4 bg-neutral-800 border-none rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="Email :"
          required
          class="w-full p-4 bg-neutral-800 border-none rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>

      <div>
        <textarea
          name="message"
          placeholder="Message :"
          required
          rows="6"
          class="w-full p-4 bg-neutral-800 border-none rounded-lg text-white placeholder-white resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
        ></textarea>
      </div>

      <div class="flex justify-between items-center pt-4">
        <div class="flex gap-4">
          <a
            href="https://github.com/Nurman2021"
            class="text-white hover:text-gray-600"
            target="_blank"
          >
            <Github class="w-6 h-6" />
          </a>
          <a
            href="www.linkedin.com/in/nurman-awaluddin-368a74353"
            target="_blank"
            class="text-white hover:text-gray-600"
          >
            <Linkedin class="w-6 h-6" />
          </a>
          <a
            href="mailto:nurman.awaluddin2017@gmail.com"
            class="text-white hover:text-gray-600"
            target="_blank"
          >
            <Mail class="w-6 h-6" />
          </a>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          class="bg-[#68151D] hover:bg-red-600 disabled:bg-red-300 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
        >
          {isSubmitting ? "Sending..." : "Submit"}
        </button>
      </div>

      {#if submitMessage}
        <div class="text-center mt-4">
          <p
            class={submitMessage.includes("success")
              ? "text-green-600"
              : "text-red-600"}
          >
            {submitMessage}
          </p>
        </div>
      {/if}
    </form>
  </div>
</div>
