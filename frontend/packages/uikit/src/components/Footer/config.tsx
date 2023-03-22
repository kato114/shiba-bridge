import { Language } from "../LangSelector/types";
import { FooterLinkType } from "./types";
import { TwitterIcon, TelegramIcon, RedditIcon, InstagramIcon, GithubIcon, DiscordIcon, MediumIcon } from "../Svg";

export const footerLinks: FooterLinkType[] = [
  {
    label: "About",
    items: [
      {
        label: "Contact",
        href: "https://docs.shibwallet.app/contact-us",
      },
      {
        label: "Blog",
        href: "https://medium.com/obridge",
      },
      {
        label: "Community",
        href: "https://docs.shibwallet.app/contact-us/telegram",
      },
      {
        label: "CAKE",
        href: "https://docs.shibwallet.app/tokenomics/cake",
      },
      {
        label: "—",
      },
      {
        label: "Online Store",
        href: "https://obridge.creator-spring.com/",
        isHighlighted: true,
      },
    ],
  },
  {
    label: "Help",
    items: [
      {
        label: "Customer",
        href: "Support https://docs.shibwallet.app/contact-us/customer-support",
      },
      {
        label: "Troubleshooting",
        href: "https://docs.shibwallet.app/help/troubleshooting",
      },
      {
        label: "Guides",
        href: "https://docs.shibwallet.app/get-started",
      },
    ],
  },
  {
    label: "Developers",
    items: [
      {
        label: "Github",
        href: "https://github.com/obridge",
      },
      {
        label: "Documentation",
        href: "https://docs.shibwallet.app",
      },
      {
        label: "Bug Bounty",
        href: "https://app.gitbook.com/@obridge-1/s/obridge/code/bug-bounty",
      },
      {
        label: "Audits",
        href: "https://docs.shibwallet.app/help/faq#is-obridge-safe-has-obridge-been-audited",
      },
      {
        label: "Careers",
        href: "https://docs.shibwallet.app/hiring/become-a-chef",
      },
    ],
  },
];

export const socials = [
  {
    label: "Twitter",
    icon: TwitterIcon,
    href: "https://twitter.com/obridge",
  },
  {
    label: "Telegram",
    icon: TelegramIcon,
    items: [
      {
        label: "English",
        href: "https://t.me/obridge",
      },
      {
        label: "Bahasa Indonesia",
        href: "https://t.me/OBridgeIndonesia",
      },
      {
        label: "中文",
        href: "https://t.me/OBridge_CN",
      },
      {
        label: "Tiếng Việt",
        href: "https://t.me/OBridgeVN",
      },
      {
        label: "Italiano",
        href: "https://t.me/obridge_ita",
      },
      {
        label: "русский",
        href: "https://t.me/obridge_ru",
      },
      {
        label: "Türkiye",
        href: "https://t.me/obridgeturkiye",
      },
      {
        label: "Português",
        href: "https://t.me/OBridgePortuguese",
      },
      {
        label: "Español",
        href: "https://t.me/OBridgeEs",
      },
      {
        label: "日本語",
        href: "https://t.me/obridgejp",
      },
      {
        label: "Français",
        href: "https://t.me/obridgefr",
      },
      {
        label: "Deutsch",
        href: "https://t.me/OBridge_DE",
      },
      {
        label: "Filipino",
        href: "https://t.me/OBridge_Ph",
      },
      {
        label: "ქართული ენა",
        href: "https://t.me/OBridgeGeorgia",
      },
      {
        label: "हिन्दी",
        href: "https://t.me/OBridgeINDIA",
      },
      {
        label: "Announcements",
        href: "https://t.me/OBridgeAnn",
      },
    ],
  },
  {
    label: "Reddit",
    icon: RedditIcon,
    href: "https://reddit.com/r/obridge",
  },
  {
    label: "Instagram",
    icon: InstagramIcon,
    href: "https://instagram.com/obridge_official",
  },
  {
    label: "Github",
    icon: GithubIcon,
    href: "https://github.com/obridge/",
  },
  {
    label: "Discord",
    icon: DiscordIcon,
    href: "https://discord.gg/obridge",
  },
  {
    label: "Medium",
    icon: MediumIcon,
    href: "https://medium.com/obridge",
  },
];

export const langs: Language[] = [...Array(20)].map((_, i) => ({
  code: `en${i}`,
  language: `English${i}`,
  locale: `Locale${i}`,
}));
