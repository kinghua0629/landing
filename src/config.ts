export const SITE = {
  website: "https://oscar0629.com/", // replace this with your deployed domain
  author: "King Hua",
  profile: "https://oscar0629.com/",
  desc: "My personal profile",
  title: "Ziwen's Profile",
  ogImage: "",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Edit page",
    url: "https://github.com/kinghua0629/landing/edit/main/",
  },
  dynamicOgImage: true,
  dir: "auto", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Shanghai", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
