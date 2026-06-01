export type Locale = "tr" | "en";

export type MenuTabId = "snacks" | "beers" | "cocktails";

export interface Translations {
  a11y: { skipToContent: string };
  meta: { title: string; description: string };
  nav: {
    home: string;
    about: string;
    menu: string;
    gallery: string;
    feedback: string;
    contact: string;
    reserve: string;
    openMenu: string;
    closeMenu: string;
    ariaMain: string;
  };
  hero: {
    ariaLabel: string;
    eyebrow: string;
    headlineLine1: string;
    headlineLine2: string;
    subtitle: string;
    exploreMenu: string;
    reserve: string;
  };
  about: {
    ariaLabel: string;
    eyebrow: string;
    title: string;
    text: string;
    imageAlt: string;
  };
  menu: {
    ariaLabel: string;
    tablistAria: string;
    eyebrow: string;
    title: string;
    tabs: Record<MenuTabId, string>;
    loading: string;
    error: string;
    empty: string;
    retry: string;
    tapForDetails: string;
  };
  product: { backToMenu: string; notFound: string };
  gallery: {
    ariaLabel: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    followInstagram: string;
    images: string[];
  };
  feedback: {
    ariaLabel: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    ratingLabel: string;
    ratingHint: string;
    messageLabel: string;
    messagePlaceholder: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    submit: string;
    thankYou: string;
    note: string;
    emailSubject: string;
  };
  footer: {
    ariaLabel: string;
    contact: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
    openMaps: string;
    followInstagram: string;
    callUs: string;
    slogan: string;
    rightsReserved: string;
    footerNavAria: string;
    formName: string;
    formEmail: string;
    formMessage: string;
    formSubmit: string;
  };
  language: { switchTo: string; tr: string; en: string };
  theme: { switchToLight: string; switchToDark: string };
}
