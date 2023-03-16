import { FooterLinkType } from '@obridge/uikit'
import { ContextApi } from '@obridge/localization'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('About'),
    items: [
      {
        label: t('Contact'),
        href: 'https://docs.obridge.finance/contact-us',
        isHighlighted: true,
      },
      {
        label: t('Brand'),
        href: 'https://docs.obridge.finance/brand',
      },
      {
        label: t('Blog'),
        href: 'https://medium.com/obridge',
      },
      {
        label: t('Community'),
        href: 'https://docs.obridge.finance/contact-us/telegram',
      },
      {
        label: t('Litepaper'),
        href: 'https://v2litepaper.obridge.finance/',
      },
      {
        label: '—',
      },
      {
        label: t('Online Store'),
        href: 'https://obridge.creator-spring.com/',
      },
    ],
  },
  {
    label: t('Help'),
    items: [
      {
        label: t('Customer Support'),
        href: 'https://docs.obridge.finance/contact-us/customer-support',
      },
      {
        label: t('Troubleshooting'),
        href: 'https://docs.obridge.finance/help/troubleshooting',
      },
      {
        label: t('Guides'),
        href: 'https://docs.obridge.finance/get-started',
      },
    ],
  },
  {
    label: t('Developers'),
    items: [
      {
        label: 'Github',
        href: 'https://github.com/obridge',
      },
      {
        label: t('Documentation'),
        href: 'https://docs.obridge.finance',
      },
      {
        label: t('Bug Bounty'),
        href: 'https://docs.obridge.finance/code/bug-bounty',
      },
      {
        label: t('Audits'),
        href: 'https://docs.obridge.finance/help/faq#is-obridge-safe-has-obridge-been-audited',
      },
      {
        label: t('Careers'),
        href: 'https://docs.obridge.finance/hiring/become-a-chef',
      },
    ],
  },
]
