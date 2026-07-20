export interface Episode {
  id: number;
  videoId: string; // YouTube video ID for embeds
  title: string;
  guest: string;
  guestHandle: string;
  guestImage: string; // path to guest profile picture
  project: string;
  projectHandle: string;
  duration: string;
  tags: string[];
  youtubeUrl: string;
  status?: 'upcoming'; // only set for scheduled episodes not yet aired
}

export const episodes: Episode[] = [
  // ── EP 29 — aired 2026-07-19 ────────────────────────────────────────────────
  {
    id: 29,
    videoId: "dkpmMX4r45U",
    title: "Onchain Africa with @demitchy_ : how dextopus lets any Web3 product accept users from 74 chains",
    guest: "Demitchy",
    guestHandle: "@demitchy_",
    guestImage: "https://pbs.twimg.com/profile_images/1879704643749478400/7b0Isqv0_400x400.jpg",
    project: "Dextopus",
    projectHandle: "@dextopus",
    duration: "1:00:00",
    tags: ["Infrastructure", "Multichain", "Web3"],
    youtubeUrl: "https://www.youtube.com/watch?v=dkpmMX4r45U",
  },
  // ── EP 28 — aired 2026-07-16 ────────────────────────────────────────────────
  {
    id: 28,
    videoId: "wcCVFAFQJwg",
    title: "Can Streamlivr Really Replace TikTok? Live with @its_mojeezy (@streamlivr_app)",
    guest: "Mo'jeezy",
    guestHandle: "@its_mojeezy",
    guestImage: "https://pbs.twimg.com/profile_images/2046595868430651392/zZ65KDQY_400x400.jpg",
    project: "Streamlivr",
    projectHandle: "@streamlivr_app",
    duration: "1:14:16",
    tags: ["Social", "Streaming", "Web3"],
    youtubeUrl: "https://www.youtube.com/watch?v=wcCVFAFQJwg",
  },
  // ── EP 27 — aired 2026-07-14 ────────────────────────────────────────────────
  {
    id: 27,
    videoId: "Mm2sS16UQHs",
    title: "Live on Onchain Africa: Trading Tokenized Assets 24/7 with @L7UMVS (@BladTrade)",
    guest: "Leu",
    guestHandle: "@L7UMVS",
    guestImage: "https://pbs.twimg.com/profile_images/2059787185667334144/wFGRITLH_400x400.jpg",
    project: "BladTrade",
    projectHandle: "@BladTrade",
    duration: "1:12:01",
    tags: ["Trading", "RWA", "DeFi"],
    youtubeUrl: "https://www.youtube.com/watch?v=Mm2sS16UQHs",
  },
  // ── EP 26 — aired 2026-07-07 ────────────────────────────────────────────────
  {
    id: 26,
    videoId: "kloyjJjplMc",
    title: "Onchain Africa live with John Babodor: How RemmintPay wants businesses to sell and settle instantly",
    guest: "John Babodor",
    guestHandle: "@johnbabodor",
    guestImage: "https://pbs.twimg.com/profile_images/2053795120013529088/DvC5pHRW_400x400.jpg",
    project: "RemmintPay",
    projectHandle: "@RemmintPay",
    duration: "1:02:33",
    tags: ["Payments", "Fintech", "Crypto"],
    youtubeUrl: "https://www.youtube.com/watch?v=kloyjJjplMc",
  },
  // ── EP 25 — aired 2026-07-02 ────────────────────────────────────────────────
  {
    id: 25,
    videoId: "i76mBna6DCY",
    title: "Onchain Africa with Kagondu Yvonne: How Blockwisely became a trusted crypto voice for Africa",
    guest: "Kagondu Yvonne",
    guestHandle: "@kagondu_yvonne",
    guestImage: "https://pbs.twimg.com/profile_images/1994282920933011456/Gtbw2-yT_400x400.jpg",
    project: "Blockwisely",
    projectHandle: "@Blockwisely",
    duration: "1:07:29",
    tags: ["Crypto", "Media", "Africa"],
    youtubeUrl: "https://www.youtube.com/watch?v=i76mBna6DCY",
  },
  {
    id: 24,
    videoId: "1PFi3Wjl9Wg",
    title: "Everyday payments onchain: how AirbillsPay makes paying Nigerian bills with crypto actually work",
    guest: "AirbillsPay Team",
    guestHandle: "@airbillspay",
    guestImage: "/guests/airbillspay.jpg",
    project: "AirbillsPay",
    projectHandle: "@airbillspay",
    duration: "54:36",
    tags: ["Payments", "Nigeria", "Crypto"],
    youtubeUrl: "https://www.youtube.com/watch?v=1PFi3Wjl9Wg"
  },
  {
    id: 23,
    videoId: "rTv-Da5VQTo",
    title: "Live with Findy — Building SliqPay",
    guest: "Findy",
    guestHandle: "@findy_dev",
    guestImage: "/guests/findy_dev.jpg",
    project: "SliqPay",
    projectHandle: "@SliqPay",
    duration: "54:57",
    tags: ["Payments", "Fintech"],
    youtubeUrl: "https://www.youtube.com/watch?v=rTv-Da5VQTo"
  },
  {
    id: 22,
    videoId: "T_nZznrsNRc",
    title: "Live with 0xChef — Building Argens",
    guest: "0xChef",
    guestHandle: "@0xchef__",
    guestImage: "/guests/0xchef.jpg",
    project: "Argens",
    projectHandle: "@argensonline",
    duration: "1:11:25",
    tags: ["DeFi", "Building"],
    youtubeUrl: "https://www.youtube.com/watch?v=T_nZznrsNRc"
  },
  {
    id: 21,
    videoId: "_oaG9PaxVJ4",
    title: "Live with Mtchy — Founder of Nippyy",
    guest: "Mtchy",
    guestHandle: "@_mtchy_",
    guestImage: "/guests/mtchy.jpg",
    project: "Nippyy",
    projectHandle: "@nippyyhq",
    duration: "1:03:12",
    tags: ["Social", "Founder"],
    youtubeUrl: "https://www.youtube.com/watch?v=_oaG9PaxVJ4"
  },
  {
    id: 20,
    videoId: "gMhV0qycaeI",
    title: "Live with Israel Igboze — Building Zend Money",
    guest: "Israel Igboze",
    guestHandle: "@israel_igboze",
    guestImage: "/guests/israel_igboze.jpg",
    project: "Zend Money",
    projectHandle: "@Zend_Money",
    duration: "1:11:41",
    tags: ["Payments", "Remittance"],
    youtubeUrl: "https://www.youtube.com/watch?v=gMhV0qycaeI"
  },
  {
    id: 19,
    videoId: "ueK4NbBc1Sk",
    title: "Live with MrBoqer — Co-Founder of Flipeet",
    guest: "MrBoqer",
    guestHandle: "@mrboqer",
    guestImage: "/guests/mrboqer.jpg",
    project: "Flipeet",
    projectHandle: "@flipeet",
    duration: "52:27",
    tags: ["NFTs", "Marketplace"],
    youtubeUrl: "https://www.youtube.com/watch?v=ueK4NbBc1Sk"
  },
  {
    id: 18,
    videoId: "P7hPCrAOBuc",
    title: "Live with W1nszn — Founder of PacificTidesBot",
    guest: "W1nszn",
    guestHandle: "@W1nszn",
    guestImage: "/guests/w1nszn.jpg",
    project: "PacificTidesBot",
    projectHandle: "@Pacifictidesbot",
    duration: "1:14:20",
    tags: ["Bots", "Trading"],
    youtubeUrl: "https://www.youtube.com/watch?v=P7hPCrAOBuc"
  },
  {
    id: 17,
    videoId: "s_xcZiYXecE",
    title: "Live with Prosper Ayere — Building Ghonsiproof",
    guest: "Prosper Ayere",
    guestHandle: "@prosper_ayere",
    guestImage: "/guests/prosper_ayere.jpg",
    project: "Ghonsiproof",
    projectHandle: "@Ghonsiproof",
    duration: "1:20:58",
    tags: ["Infrastructure", "Building"],
    youtubeUrl: "https://www.youtube.com/watch?v=s_xcZiYXecE"
  },
  {
    id: 16,
    videoId: "GE3fsxXaizo",
    title: "Live with Blockchain Josh — Founder of Chainproof",
    guest: "Blockchain Josh",
    guestHandle: "@blockchain_Josh",
    guestImage: "/guests/blockchain_josh.jpg",
    project: "Chainproof",
    projectHandle: "@Chainproof_enc",
    duration: "55:31",
    tags: ["Security", "Verification"],
    youtubeUrl: "https://www.youtube.com/watch?v=GE3fsxXaizo"
  },
  {
    id: 15,
    videoId: "2eqbLesbids",
    title: "Live with Tobi Builder — Building Rail Finance",
    guest: "Tobi Builder",
    guestHandle: "@Tobi_Builder",
    guestImage: "/guests/tobi_builder.jpg",
    project: "Rail Finance",
    projectHandle: "@rail_finance",
    duration: "57:38",
    tags: ["DeFi", "Finance"],
    youtubeUrl: "https://www.youtube.com/watch?v=2eqbLesbids"
  },
  {
    id: 14,
    videoId: "LY1TnkbVxbc",
    title: "Live with Atoyebi Olawale — Founder of Bordawave",
    guest: "Atoyebi Olawale",
    guestHandle: "@AtoyebiOlawale4",
    guestImage: "/guests/atoyebi_olawale.jpg",
    project: "Bordawave",
    projectHandle: "@bordawave",
    duration: "58:17",
    tags: ["Building", "Founder"],
    youtubeUrl: "https://www.youtube.com/watch?v=LY1TnkbVxbc"
  },
  {
    id: 13,
    videoId: "PsacPKCePEs",
    title: "Live with Sarah Wahinya",
    guest: "Sarah Wahinya",
    guestHandle: "@SarahWahinya",
    guestImage: "/guests/sarah_wahinya.jpg",
    project: "",
    projectHandle: "",
    duration: "59:43",
    tags: ["Web3", "Africa"],
    youtubeUrl: "https://www.youtube.com/watch?v=PsacPKCePEs"
  },
  {
    id: 12,
    videoId: "vyxQ-8Lw79I",
    title: "Live with Monipay",
    guest: "Monipay Team",
    guestHandle: "@monipay_xyz",
    guestImage: "/guests/monipay.jpg",
    project: "Monipay",
    projectHandle: "@monipay_xyz",
    duration: "1:06:57",
    tags: ["Payments", "Fintech"],
    youtubeUrl: "https://www.youtube.com/watch?v=vyxQ-8Lw79I"
  },
  {
    id: 11,
    videoId: "Fj8eircVjCw",
    title: "Livestream with HeadlineOdds",
    guest: "HeadlineOdds",
    guestHandle: "@headlineodds",
    guestImage: "/guests/headlineodds.jpg",
    project: "HeadlineOdds",
    projectHandle: "@headlineodds",
    duration: "45:02",
    tags: ["Prediction", "Markets"],
    youtubeUrl: "https://www.youtube.com/watch?v=Fj8eircVjCw"
  },
  {
    id: 10,
    videoId: "sGjhzofdehc",
    title: "Live with Payfrica",
    guest: "Payfrica Team",
    guestHandle: "@Payfrica",
    guestImage: "/guests/payfrica.jpg",
    project: "Payfrica",
    projectHandle: "@Payfrica",
    duration: "1:07:11",
    tags: ["Payments", "Africa"],
    youtubeUrl: "https://www.youtube.com/watch?v=sGjhzofdehc"
  },
  {
    id: 9,
    videoId: "o6udihBo91k",
    title: "Live with Sol Pollinet",
    guest: "Sol Pollinet",
    guestHandle: "@sol_pollinet",
    guestImage: "/guests/sol_pollinet.jpg",
    project: "Sol Pollinet",
    projectHandle: "@sol_pollinet",
    duration: "1:13:15",
    tags: ["Solana", "Building"],
    youtubeUrl: "https://www.youtube.com/watch?v=o6udihBo91k"
  },
  {
    id: 8,
    videoId: "pYhiLNH0nhs",
    title: "Livestream with Clapmihq",
    guest: "Clapmihq",
    guestHandle: "@Clapmihq",
    guestImage: "/guests/clapmihq.jpg",
    project: "Clapmihq",
    projectHandle: "@Clapmihq",
    duration: "1:11:54",
    tags: ["Social", "Web3"],
    youtubeUrl: "https://www.youtube.com/watch?v=pYhiLNH0nhs"
  },
  {
    id: 7,
    videoId: "k0B4TA6_G90",
    title: "Live with GiddyCodes",
    guest: "GiddyCodes",
    guestHandle: "@giddycodes",
    guestImage: "/guests/giddycodes.jpg",
    project: "",
    projectHandle: "",
    duration: "1:05:11",
    tags: ["Developer", "Building"],
    youtubeUrl: "https://www.youtube.com/watch?v=k0B4TA6_G90"
  },
  {
    id: 6,
    videoId: "uQ4q6jMEyT4",
    title: "The Story Behind Corre",
    guest: "Corre Team",
    guestHandle: "",
    guestImage: "", // no X profile for this guest yet
    project: "Corre",
    projectHandle: "",
    duration: "1:06:46",
    tags: ["Startup", "Story"],
    youtubeUrl: "https://www.youtube.com/watch?v=uQ4q6jMEyT4"
  },
  {
    id: 5,
    videoId: "X81dWMd1wuw",
    title: "IN THE FUTURE, CONVICTION HAS A PRICE — AxioMarket",
    guest: "AxioMarket Team",
    guestHandle: "",
    guestImage: "", // no X profile for this guest yet
    project: "AxioMarket",
    projectHandle: "",
    duration: "48:40",
    tags: ["Prediction", "Markets"],
    youtubeUrl: "https://www.youtube.com/watch?v=X81dWMd1wuw"
  },
  {
    id: 4,
    videoId: "AT6ijzJmc6o",
    title: "BUILDING ON SOLANA FROM NIGERIA: THE OFIBOX STORY",
    guest: "Ofibox Team",
    guestHandle: "",
    guestImage: "", // no X profile for this guest yet
    project: "Ofibox",
    projectHandle: "@ofiboxgames",
    duration: "53:51",
    tags: ["Solana", "Gaming", "Nigeria"],
    youtubeUrl: "https://www.youtube.com/watch?v=AT6ijzJmc6o"
  },
  {
    id: 3,
    videoId: "2Z9fq7E8VvE",
    title: "Security as Infrastructure",
    guest: "Security Guest",
    guestHandle: "",
    guestImage: "", // no X profile for this guest yet
    project: "",
    projectHandle: "",
    duration: "59:29",
    tags: ["Security", "Infrastructure"],
    youtubeUrl: "https://www.youtube.com/watch?v=2Z9fq7E8VvE"
  },
  {
    id: 2,
    videoId: "WTJQozH3zgE",
    title: "The Blockchain Career Expo: Building Africa's Web3 Talent Market",
    guest: "Shadrack (Sofenode)",
    guestHandle: "",
    guestImage: "", // no X profile for this guest yet
    project: "Blockchain Career Expo",
    projectHandle: "",
    duration: "1:14:39",
    tags: ["Careers", "Talent", "Africa"],
    youtubeUrl: "https://www.youtube.com/watch?v=WTJQozH3zgE"
  },
  {
    id: 1,
    videoId: "NaHnKWxg-Hs",
    title: "The Untold Story Behind Planbok",
    guest: "Planbok Team",
    guestHandle: "",
    guestImage: "", // no X profile for this guest yet
    project: "Planbok",
    projectHandle: "",
    duration: "1:16:17",
    tags: ["Startup", "Story"],
    youtubeUrl: "https://www.youtube.com/watch?v=NaHnKWxg-Hs"
  }
];
