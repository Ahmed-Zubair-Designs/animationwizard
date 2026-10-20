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
   - Want the length badge on a card? Add it: { category: "Promos", link: "...", duration: "1:24" },
   - A line with an empty link ("") is ignored, so you can keep spare lines ready to fill in.
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
    "Website Explainers",
    "Promos",
    "Character Explainers",
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
      { category: "SaaS & B2B Explainers", link: "https://youtu.be/Y5UX43H8iU8" },
      { category: "SaaS & B2B Explainers", link: "https://youtu.be/l33YFxdREss" },
      { category: "SaaS & B2B Explainers", link: "https://youtu.be/woZYvYuZhZI?si=VRSohhG4zpBR2op5" },
      { category: "SaaS & B2B Explainers", link: "https://youtu.be/21fsmlS_2Jc" },
    ],

    // "Work I'm proud of": the tall reel on the left (use a YouTube Shorts link)
    proudReel: { category: "Verticals", link: "https://youtube.com/shorts/2N_M9mBPQzk?si=7Pq8x8nA1Mmwc60x" },

    // "Work I'm proud of": the 4 landscape videos on the right
    proud: [
      { category: "SaaS & B2B Explainers", link: "https://youtu.be/FJomY08T1H0?si=zmkaVqKub7QFHKvb" },
      { category: "Website Explainers", link: "https://youtu.be/JVuAJcZUcX8?si=LfRef5y9WMg3Xyf_" },
      { category: "Promos", link: "https://youtu.be/xImSMqxKf1Q?si=-bMJ6n1eWqf5WX1m" },
      { category: "Character Explainers", link: "https://youtu.be/khmMrMlp90w?si=XIJcXYll9NtYMsmf" },
    ]
  },

  // ================= PORTFOLIO PAGE =================
  // Add as many videos as you like under each category.
  portfolio: [

    // ---- SaaS & B2B Explainers ----
    { category: "SaaS & B2B Explainers", link: "https://youtu.be/DvXf8TZCTUY" },
    { category: "SaaS & B2B Explainers", link: "https://youtu.be/uvb6TsDVpjw" },
    { category: "SaaS & B2B Explainers", link: "https://youtu.be/yKsfkDb_2i8" },
    { category: "SaaS & B2B Explainers", link: "https://youtu.be/woZYvYuZhZI?si=ZaIOx7Greb6xpuET" },
    { category: "SaaS & B2B Explainers", link: "https://youtu.be/FJomY08T1H0?si=i0_Zu2Lef9go1z9t" },
    { category: "SaaS & B2B Explainers", link: "https://youtu.be/IaKkPIdu4Lg" },
    { category: "SaaS & B2B Explainers", link: "https://youtu.be/Y5UX43H8iU8?si=sUj9PVNH79iQ_Clq" },
    { category: "SaaS & B2B Explainers", link: "https://youtu.be/-nhXl9C5dUw" },
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

    // ---- Website Explainers ----
    { category: "Website Explainers", link: "" },
    { category: "Website Explainers", link: "" },
    { category: "Website Explainers", link: "" },

    // ---- Promos ----
    { category: "Promos", link: "https://youtu.be/nsvFRLw8c4g" },
    { category: "Promos", link: "https://youtu.be/l33YFxdREss?si=eovo3dWLuWCgKcxh" },
    { category: "Promos", link: "https://youtu.be/21fsmlS_2Jc?si=xDROilN5BqjNE16e" },
    { category: "Promos", link: "https://youtu.be/xImSMqxKf1Q?si=6PImpXeEOmRUS-Fm" },
    { category: "Promos", link: "https://youtu.be/V7VCO-IWYEw?si=sIyX8iDG9_HIUJXX" },
    { category: "Promos", link: "https://youtu.be/Q37d3nRzISM?si=0Hjjagabh-0id4Uc" },
    { category: "Promos", link: "https://youtu.be/9IyM38OhbJs?si=TqAG4gSZTjTy4Ups" },
    { category: "Promos", link: "https://youtu.be/CH6VXUkdhBk?si=nCJoXDp71Z37NHu8" },
    { category: "Promos", link: "https://youtu.be/kko5tfRXc6s?si=GnAONBtVKftRF04r" },
    { category: "Promos", link: "https://youtu.be/fN5IHX-wzoY?si=nsKXC8l4qYntVz4d" },

    // ---- Character Explainers ----
    { category: "Character Explainers", link: "https://youtu.be/khmMrMlp90w?si=9hAYWEY7bXNihqh5" },
    { category: "Character Explainers", link: "https://youtu.be/Em3c29fdCbY?si=R5G7M_1IvR7dt-ff" },
    { category: "Character Explainers", link: "https://youtu.be/H2Lu3h1thP8?si=9BYU4jfwE9h8jrur" },
    { category: "Character Explainers", link: "https://youtu.be/Ejs4ONAe7Rc?si=Fk4xbaVa4HnCdA7e" },
    { category: "Character Explainers", link: "https://youtu.be/6AZPLzILd3Q?si=QwMwy4jG7SYZMnT1" },
    { category: "Character Explainers", link: "https://youtu.be/pZuh7i0Z_KY?si=MkD4QCfEK1w1ZoLF" },

    // ---- Video Editing ----
    { category: "Video Editing", link: "https://youtu.be/rFVJzg9gzAk?si=DZrbn_s5wQE2on-W" },
    { category: "Video Editing", link: "https://youtu.be/0rRXUv9PFeE" },
    { category: "Video Editing", link: "https://youtu.be/OSVtImiYZLA" },
    { category: "Video Editing", link: "https://youtu.be/lqJNbQn6ENE?si=u0qFtCzh22-p2hUh" },
    { category: "Video Editing", link: "https://youtu.be/8IyAjx6xcG8?si=p1Aki8BYgr0N8X6q" },
    { category: "Video Editing", link: "https://youtu.be/l0BBeHiuiuM?si=e4gNZNU27x5w5W_a" },

    // ---- Verticals ----
    { category: "Verticals", link: "https://youtube.com/shorts/2N_M9mBPQzk?si=7Pq8x8nA1Mmwc60x" },
    { category: "Verticals", link: "https://youtube.com/shorts/b-azqPeiYe0?si=nZoQ-kxLkYZwkxfC" },
    { category: "Verticals", link: "https://youtube.com/shorts/gge2-nMxhJ8?si=EkE7XvL_v80HG12L" },
    { category: "Verticals", link: "" },
    { category: "Verticals", link: "" },
    { category: "Verticals", link: "" }, 
    { category: "Verticals", link: "" },
    { category: "Verticals", link: "" },
    { category: "Verticals", link: "" }, 

    // ---- Talking Head Videos ----
    { category: "Talking Head Videos", link: "" },
    { category: "Talking Head Videos", link: "" },
    { category: "Talking Head Videos", link: "" },
  ],

  // ================= PRICING (home page) =================
  // "from" is the starting price in dollars. "includes" are the ticks on each row.
  // The name must match a category above, so clicking the row opens those videos.
  pricing: [
    { name: "SaaS & B2B Explainers", from: 300, popular: true, includes: ["60 to 90 seconds", "Script and storyboard", "Voiceover and music", "UI animation from your screens", "4 rounds of revisions"] },
    { name: "Website Explainers",    from: 250, includes: ["60 to 90 seconds", "Script and storyboard", "Voiceover and music", "UI animation from your screens", "3 rounds of revisions"] },
    { name: "Promos",                from: 200, includes: ["30 to 60 seconds", "UI animation from your screens", "Device mockups", "4 rounds of revisions"] },
    { name: "Character Explainers",  from: 400, includes: ["Custom character design", "Up to 80 seconds", "4 rounds of revisions"] },
    { name: "Video Editing",         from: 250, includes: ["4 to 5 minutes", "Cuts, colour and audio", "Titles and lower thirds", "B-roll and animated B-roll", "3 rounds of revisions"] },
    { name: "Verticals",             from: 70,  includes: ["Reels, Shorts, TikTok", "Captions and motion text", "60 to 80 seconds", "2 rounds of revisions"] },
    { name: "Talking Head Videos",   from: 50,  includes: ["60 to 90 seconds", "Captions and B-roll", "Zooms and graphics", "2 rounds of revisions"] }
  ]
};
