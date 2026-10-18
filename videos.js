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
    hero: "https://youtu.be/BjeuQ1os2VU",

    // "Recent work": 4 videos
    recent: [
      { category: "SaaS & B2B Software", link: "https://youtu.be/Y5UX43H8iU8" },
      { category: "SaaS & B2B Software", link: "https://youtu.be/l33YFxdREss" },
      { category: "SaaS & B2B Software", link: "https://youtu.be/woZYvYuZhZI?si=VRSohhG4zpBR2op5" },
      { category: "SaaS & B2B Software", link: "https://youtu.be/21fsmlS_2Jc" },
    ],

    // "Work that I'm proud of": 4 videos
    proud: [
      { category: "SaaS & B2B Explainers", link: "https://youtu.be/FJomY08T1H0?si=zmkaVqKub7QFHKvb" },
      { category: "Product Launch & Promos", link: "https://youtu.be/JVuAJcZUcX8?si=LfRef5y9WMg3Xyf_" },
      { category: "Web & App Promos", link: "https://youtu.be/xImSMqxKf1Q?si=-bMJ6n1eWqf5WX1m" },
      { category: "Character Animation", link: "https://youtu.be/khmMrMlp90w?si=XIJcXYll9NtYMsmf" },
    ]
  },

  // ================= PORTFOLIO PAGE =================
  // Add as many videos as you like under each category.
  portfolio: [

    // ---- SaaS & B2B Explainers ----
    { category: "SaaS & B2B Explainers", link: "https://youtu.be/FJomY08T1H0?si=i0_Zu2Lef9go1z9t" },
    { category: "SaaS & B2B Explainers", link: "https://youtu.be/Y5UX43H8iU8?si=sUj9PVNH79iQ_Clq" },
    { category: "SaaS & B2B Explainers", link: "https://youtu.be/JVuAJcZUcX8?si=VgDYpjBIowYgxTb0" },
    { category: "SaaS & B2B Explainers", link: "https://youtu.be/Yov_-27PXCs?si=HPbIzsJjQY6b6kku" },
    { category: "SaaS & B2B Explainers", link: "https://youtu.be/LsafNhUkkgQ?si=0ySbXME4yAm7_wfy" },
    { category: "SaaS & B2B Explainers", link: "https://youtu.be/RbFkbDkwNvY?si=rFzqjlOezKuXonqb" },
    { category: "SaaS & B2B Explainers", link: "https://youtu.be/hSwf22DdWL4?si=whBomnWteaDC56vh" },
    { category: "SaaS & B2B Explainers", link: "https://youtu.be/9If0ISM7DY0?si=N4bfbREP4xShxm47" },
    { category: "SaaS & B2B Explainers", link: "https://youtu.be/wwjFB1KpOwU?si=9oKBrfnxa4AnhTSJ" },
    { category: "SaaS & B2B Explainers", link: "https://youtu.be/gXNX94spkck?si=hJj5zWYS3EuDXO4y" },
    { category: "SaaS & B2B Explainers", link: "https://youtu.be/qIY7F_38AKc?si=vIjE-G-73TsPZTx0" },
    { category: "SaaS & B2B Explainers", link: "https://youtu.be/IL7YXCTqgZk?si=4CZc7vuNBbkfbXL3" },
    { category: "SaaS & B2B Explainers", link: "https://youtu.be/HRg7nB8S_Sc?si=lnbf6K2k1cdOzmun" },
    { category: "SaaS & B2B Explainers", link: "https://youtu.be/vMZUi7nftk0?si=29i2Pkm1JVuEEE5M" },
    { category: "SaaS & B2B Explainers", link: "https://youtu.be/0MI6KA8SQN0?si=iTzzULIEiJW1Aovq" },
    { category: "SaaS & B2B Explainers", link: "https://youtu.be/E_Ko7lY297w?si=B3NIl7CJrunEPksS" },

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
