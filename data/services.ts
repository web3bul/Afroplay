import { ServiceCard, ServiceBenefit } from '../types';

// iconKey maps to a lucide-react icon inside Services.tsx.
export const serviceCards: ServiceCard[] = [
  {
    iconKey: 'educate',
    iconColor: 'text-afro-orange',
    bar: 'from-afro-orange to-yellow-500',
    title: 'Educate & Equip',
    body: 'We provide gamers with the tools, confidence, and knowledge to succeed in the Web3 space.',
  },
  {
    iconKey: 'onboard',
    iconColor: 'text-green-400',
    bar: 'from-green-400 to-blue-500',
    title: 'Simplify Onboarding',
    body: 'We demystify complex game systems, making it easy for new players to get started instantly.',
  },
  {
    iconKey: 'visibility',
    iconColor: 'text-purple-400',
    bar: 'from-purple-500 to-pink-500',
    title: 'Drive Visibility',
    body: 'We build real communities, not just clicks or hype. We drive engagement for Web3 gaming brands.',
  },
  {
    // Brand rule: no cyan on any AfroPlay page — hence red-orange, not cyan.
    iconKey: 'story',
    iconColor: 'text-red-400',
    bar: 'from-red-500 to-orange-600',
    title: 'Tell the Story',
    body: 'We spotlight African Web3 builders through Onchain Africa — our live interview series giving African projects a global stage.',
  },
];

export const serviceBenefits: ServiceBenefit[] = [
  {
    barColor: 'bg-afro-orange',
    title: 'Market Expansion & Visibility',
    body: "Gain direct entry point into Africa's fast-growing gaming audience.",
  },
  {
    barColor: 'bg-afro-accent',
    title: 'Localized Support',
    body: "We bridge cultural and technical gaps so you don't have to.",
  },
  {
    barColor: 'bg-blue-500',
    title: 'Higher Adoption & Retention',
    body: 'We ensure players understand, love, and keep playing your game.',
  },
];
