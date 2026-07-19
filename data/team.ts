import { TeamCategory } from '../types';

export const teamCategories: TeamCategory[] = [
  {
    title: 'Core Team',
    members: [
      { name: 'Web3bull',    role: 'Founder',              handle: '@udousobenjamin', avatarUrl: '/team/web3bull.jpg'   },
      { name: 'Agent Marvy', role: 'Content Strategist',   handle: '@Agent_Marvy',    avatarUrl: '/team/AgentMarvy.jpg' },
      { name: 'Web3boy',     role: 'Marketing Strategist', handle: '@web3boy_real',   avatarUrl: '/team/web3boy.jpg'    },
      { name: 'KingNFT',     role: 'Partnership',          handle: '@KingNFT_real',   avatarUrl: '/team/KingNFT.jpg'    },
    ],
  },
  {
    title: 'Content Team',
    members: [
      { name: 'Timilehin',      role: 'Content Writer', handle: '@Timileyingbada1', avatarUrl: '/team/Timi.jpeg'   },
      { name: 'Unusual Ehngee', role: 'Content Writer', handle: '@unusualEhngee',   avatarUrl: '/team/Ehngee.jpeg' },
      { name: 'Sammysuit',      role: 'Content Writer', handle: '@Sammysuit3',      avatarUrl: '/team/sammy.jpg'   },
    ],
  },
  {
    title: 'Streamers',
    members: [
      { name: 'Teenyclaws', role: 'Game Streamer', handle: '@Teenyclaws',      avatarUrl: '/team/Teenyclaws.jpeg' },
      { name: 'Old Guard',  role: 'Game Streamer', handle: '@oldguardGaming_', avatarUrl: '/team/old.jpeg'        },
    ],
  },
  {
    title: 'Space Host',
    members: [
      { name: 'FadedSolMaxi',   role: 'Onchain Africa Host',    handle: '@FadedSolMaxi',   avatarUrl: '/team/sos.jpg'        },
      { name: 'CoachDee',       role: 'Onchain Africa Co-Host', handle: '@CoachdeeNG',     avatarUrl: '/team/coach.webp'     },
      { name: 'Emmanuel Pilot', role: 'Space Host',             handle: '@theKingPilot',   avatarUrl: '/team/Pilot.png'      },
      { name: 'Gamer-Ives',     role: 'Space Host',             handle: '@gamingwithives', avatarUrl: '/team/GamerIves.jpeg' },
    ],
  },
  {
    title: 'Partnership',
    members: [
      { name: 'Wardog', role: 'Partner Relations', handle: '@WardogNGG', avatarUrl: '/team/wardog.jpeg' },
      { name: 'SCZAR',  role: 'Partner Relations', handle: '0xSczar',    avatarUrl: '/team/sczar.jpeg'  },
    ],
  },
];
