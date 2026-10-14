/* =====================================================================
   ANIMATION WIZARD - THE ONLY FILE YOU NEED TO EDIT

   HOW TO ADD A VIDEO
   1. Copy any line that looks like:   { category: "Verticals", link: "" },
   2. Paste it where you want it, put your YouTube link between the quotes.
   3. Keep the category name EXACTLY like the list below (copy it from there).
   4. Keep the comma at the end of the line. Save ("Commit changes" on GitHub).

   - The order of the lines is the order on the website (first line = first video).
   - Titles and thumbnails come from YouTube automatically.
   - Want your own title? Add it:   { category: "Verticals", link: "...", title: "My title" },
   - A line with an empty link ("") shows a placeholder card. Delete the line to remove it.
   - YouTube links can be youtu.be/..., youtube.com/watch?v=..., or youtube.com/shorts/...
   - Videos must be Public or Unlisted on YouTube (not Private).
   ===================================================================== */

window.SITE = {

  // Your contact buttons. Replace the text between the quotes.
  links: {
    whatsapp: "https://wa.me/92XXXXXXXXXX",   // country code + number, no + or spaces
    upwork:   "https://www.upwork.com/freelancers/~YOUR-ID",
    fiverr:   "https://www.fiverr.com/YOUR-USERNAME",
    linkedin: "https://www.linkedin.com/in/YOUR-NAME"
  },

  // Sidebar categories on the Portfolio page (this is also their order).
  // You can rename them, reorder them, or add new ones. Videos use these exact names.
  categories: [
    "SaaS & B2B Explainers",
    "Product Launch & Promos",
    "Web & App Promos",
    "Character Animation",
    "Video Editing",
    "Verticals",
    "Talking Head Videos",
  ],

  // Categories shown as tall 9:16 videos
  verticalCategories: ["Verticals"],

  // ================= HOME PAGE =================
  home: {
    // Your showreel (big video at the top)
    hero: "",

    // "Recent work": 4 videos
    recent: [
      { category: "SaaS & B2B Explainers", link: "" },
      { category: "Product Launch & Promos", link: "" },
      { category: "Web & App Promos", link: "" },
      { category: "Character Animation", link: "" },
    ],

    // "Work that I'm proud of": 4 videos
    proud: [
      { category: "SaaS & B2B Explainers", link: "" },
      { category: "Product Launch & Promos", link: "" },
      { category: "Character Animation", link: "" },
      { category: "Video Editing", link: "" },
    ]
  },

  // ================= PORTFOLIO PAGE =================
  // Add as many videos as you like under each category.
  portfolio: [

    // ---- SaaS & B2B Explainers ----
    { category: "SaaS & B2B Explainers", link: "" },
    { category: "SaaS & B2B Explainers", link: "" },
    { category: "SaaS & B2B Explainers", link: "" },

    // ---- Product Launch & Promos ----
    { category: "Product Launch & Promos", link: "" },
    { category: "Product Launch & Promos", link: "" },
    { category: "Product Launch & Promos", link: "" },

    // ---- Web & App Promos ----
    { category: "Web & App Promos", link: "" },
    { category: "Web & App Promos", link: "" },
    { category: "Web & App Promos", link: "" },

    // ---- Character Animation ----
    { category: "Character Animation", link: "" },
    { category: "Character Animation", link: "" },
    { category: "Character Animation", link: "" },

    // ---- Video Editing ----
    { category: "Video Editing", link: "" },
    { category: "Video Editing", link: "" },
    { category: "Video Editing", link: "" },

    // ---- Verticals ----
    { category: "Verticals", link: "" },
    { category: "Verticals", link: "" },
    { category: "Verticals", link: "" },

    // ---- Talking Head Videos ----
    { category: "Talking Head Videos", link: "" },
    { category: "Talking Head Videos", link: "" },
    { category: "Talking Head Videos", link: "" },
  ]
};
