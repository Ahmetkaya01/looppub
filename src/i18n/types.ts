export type Locale = "tr" | "en";

export type NavKey =
  | "home"
  | "menu"
  | "events"
  | "programs"
  | "takeaway"
  | "gallery"
  | "location"
  | "contact";

export type Dictionary = {
  meta: {
    siteTitle: string;
    siteDescription: string;
  };
  nav: Record<NavKey, string>;
  common: {
    premiumPubBar: string;
    reservation: string;
    reservationCta: string;
    menu: string;
    whatsapp: string;
    scrollHint: string;
    scrollPrev: string;
    scrollNext: string;
    play: string;
    expand: string;
    language: string;
  };
  header: {
    navAria: string;
    openMenu: string;
    closeMenu: string;
    mobileMenu: string;
    navigation: string;
  };
  hero: {
    aria: string;
    tagline: string;
    body: string;
  };
  events: {
    aria: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    orgInfo: string;
    partyReservation: string;
    showcaseAria: string;
    partyTitle: string;
    partyTitleAccent: string;
    partySubtitle: string;
    videosAria: string;
    programsTitle: string;
    programsTitleAccent: string;
    programsSubtitle: string;
    followInstagram: string;
    coming: string;
    video1Title: string;
    video2Title: string;
  };
  takeaway: {
    aria: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    expand: string;
    viewMenu: string;
    orderCta: string;
  };
  gallery: {
    aria: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    scrollAria: string;
  };
  location: {
    aria: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    openMap: string;
    directions: string;
  };
  contact: {
    aria: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    reachUs: string;
    whatsappQuick: string;
    hoursTitle: string;
    hoursLabel: string;
    busyNote: string;
  };
  instagram: {
    aria: string;
    eyebrow: string;
    sloganLine1: string;
    sloganLine2: string;
    body: string;
    follow: string;
  };
  footer: {
    aria: string;
    contact: string;
    social: string;
    rights: string;
  };
  menuPage: {
    title: string;
    call: string;
    footerRights: string;
    gelAlEyebrow: string;
    gelAlTitle: string;
    gelAlNote: string;
    gelAlFullMenu: string;
    searchLabel: string;
    searchPlaceholder: string;
    searchPlaceholderGelAl: string;
    clearSearch: string;
    noResults: string;
    resultsFound: string;
    categoriesAria: string;
    searchTitle: string;
    searchEmpty: string;
    gelAlMenuTitle: string;
  };
  whatsapp: {
    reservation: string;
    organization: string;
    takeaway: string;
  };
  programs: {
    comingSoon: string;
    hint: string;
  };
};
