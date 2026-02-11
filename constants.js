
import { GameCategory, GameType } from './types.js';

export const APP_NAME = "NEON ARCADE";
export const REQUEST_GAME_URL = "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAN__ihR0UBUQ0ZONjFaNzRMT1hNTVBVOUZPSUhXOENGSS4u";
export const PANIC_URL = "https://classroom.google.com";

export const GAMES_DATA = [
  {
    id: 'smash-karts',
    title: 'Smash Karts',
    description: 'Our newest game! Drive fast, fire rockets, and smash your opponents in this chaotic multiplayer kart battler.',
    url: 'https://smashkartsio.com/1.embed',
    thumbnail: 'https://i.ibb.co/5X7mL5L6/smashkarts-io.jpg',
    category: GameCategory.MULTIPLAYER,
    type: GameType.IFRAME,
    isNew: true,
    isHot: true,
    popularity: 100 
  },
  {
    id: 'magic-tiles-3',
    title: 'Magic Tiles 3',
    description: 'Tap the black tiles to the rhythm of the music. Don\'t miss a beat in this addictive piano arcade game.',
    url: 'https://html5.gamedistribution.com/58deefb8f63943dcbc5093070b9b5777/?gd_sdk_referrer_url=https://fun.symbaloo.com/home/mix/13ePLWjK81',
    thumbnail: 'https://i.ibb.co/8LpfQwr8/Magic-Tiles-3.jpg',
    category: GameCategory.RHYTHM,
    type: GameType.IFRAME,
    isHot: true,
    maintenance: true,
    popularity: 98
  },
  {
    id: 'basket-random',
    title: 'Basket Random',
    description: 'Score baskets with wacky physics and random players. Play solo or with a friend in this chaotic sports game.',
    url: 'https://html5.gamedistribution.com/rvvASMiM/bf1268dccb5d43e7970bb3edaa54afc8/index.html?gd_sdk_referrer_url=https%3A%2F%2Ffun.symbaloo.com%2Fhome%2Fmix%2F13ePLWjK81&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2Z1bi5zeW1iYWxvby5jb20vaG9tZS9taXgvMTNlcGx3ams4MSIsInBhcmVudERvbWFpbiI6ImZ1bi5zeW1iYWxvby5jb20iLCJ0b3BEb21haW4iOiJmdW4uc3ltYmFsb28uY29tIiwiaGFzSW1wcmVzc2lvbiI6ZmFsc2UsImxvYWRlckVuYWJsZWQiOnRydWUsImhvc3QiOiJodG1sNS5nYW1lZGlzdHJpYnV0aW9uLmNvbSIsInZlcnNpb24iOiIxLjUuMTgifQ%253D%253D',
    thumbnail: 'https://i.ibb.co/zVcs9Yj1/Basket-Random.png',
    category: GameCategory.PHYSICS,
    type: GameType.IFRAME,
    isHot: true,
    popularity: 95
  },
  {
    id: 'roblox-obby-bike',
    title: 'Roblox Obby on a Bike',
    description: 'Navigate challenging obstacle courses on a bike in this Roblox-inspired adventure. Keep your balance!',
    url: 'https://html5.gamedistribution.com/bc2f52c2d9d04e41aee48bef01075d22/?gd_sdk_referrer_url=https://fun.symbaloo.com/home/mix/13ePLWjK81',
    thumbnail: 'https://i.ibb.co/W452Cjyy/obby-but-youre-on-a-bike.png',
    category: GameCategory.PLATFORMER,
    type: GameType.IFRAME,
    isHot: true,
    popularity: 92
  },
  {
    id: 'geometry-jump',
    title: 'Geometry Jump',
    description: 'Jump and fly your way through danger in this rhythm-based action platformer. Test your reflexes.',
    url: 'https://html5.gamedistribution.com/9b634d67ddd6407c95effd409b947a76/?gd_sdk_referrer_url=https://fun.symbaloo.com/home/mix/13ePLWjK81',
    thumbnail: 'https://i.ibb.co/dwv3X39p/geometry-jump.webp',
    category: GameCategory.RHYTHM,
    type: GameType.IFRAME,
    popularity: 88
  },
  {
    id: 'snow-rider-3d',
    title: 'Snow Rider 3D',
    description: 'Experience the thrill of sleigh riding down a snowy mountain in 3D. Avoid obstacles and collect gifts.',
    url: 'https://d11jzht7mj96rr.cloudfront.net/games/2025/unity2/snow-rider-3d/totallyscience/index.html',
    thumbnail: 'https://i.ibb.co/gM7qZnwX/snow-rider-3-D.webp',
    category: GameCategory.SPORTS,
    type: GameType.IFRAME,
    isHot: true,
    popularity: 91
  },
  {
    id: 'love-tester',
    title: 'Love Tester',
    description: 'Test your love compatibility with this fun calculator game. Enter names and find your match percentage.',
    url: 'https://d11jzht7mj96rr.cloudfront.net/games/2021/3/love-tester/index-ts.html',
    thumbnail: 'https://i.ibb.co/ds4wDrSQ/Love-tester.jpg',
    category: GameCategory.ARCADE,
    type: GameType.IFRAME,
    popularity: 75
  },
  {
    id: 'stackball-io',
    title: 'StackBall.io',
    description: 'Smash through colorful platforms to reach the bottom of the tower. Avoid the black stacks!',
    url: 'https://d11jzht7mj96rr.cloudfront.net/games/stackball-io/index.html',
    thumbnail: 'https://i.ibb.co/QvJFrFG5/stackball-io.jpg',
    category: GameCategory.ARCADE,
    type: GameType.IFRAME,
    popularity: 82
  },
  {
    id: 'eggy-car',
    title: 'Eggy Car',
    description: 'Drive carefully to keep the egg safe on top of your car while climbing steep hills. Don\'t crack the egg!',
    url: 'https://d11jzht7mj96rr.cloudfront.net/games/2025/beedo/eggy-car/index.html',
    thumbnail: 'https://i.ibb.co/J02ZwZw/Eggy-Car.jpg',
    category: GameCategory.PHYSICS,
    type: GameType.IFRAME,
    isHot: true,
    popularity: 89
  },
  {
    id: 'moto-x3m-winter',
    title: 'Moto X3M Winter',
    description: 'Race your motorbike through icy tracks and perform stunts in this winter edition of the classic Moto X3M.',
    url: 'https://d11jzht7mj96rr.cloudfront.net/games/2024/gm/moto-x3m-winter/index.html',
    thumbnail: 'https://i.ibb.co/KjTSTSgq/moto-x3m-Winter.jpg',
    category: GameCategory.RACING,
    type: GameType.IFRAME,
    isHot: true,
    popularity: 94
  },
  {
    id: 'basketball-stars',
    title: 'Basketball Stars',
    description: 'Play solo or with a friend in this intense basketball arcade game. Show off your dunks and 3-pointers with legendary players.',
    url: 'https://html5.gamedistribution.com/rvvASMiM/69d78d071f704fa183d75b4114ae40ec/index.html?gd_sdk_referrer_url=https%3A%2F%2Ffun.symbaloo.com%2Fhome%2Fmix%2F13ePLWjK81&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2Z1bi5zeW1iYWxvby5jb20vaG9tZS9taXgvMTNlcGx3ams4MSIsInBhcmVudERvbWFpbiI6ImZ1bi5zeW1iYWxvby5jb20iLCJ0b3BEb21haW4iOiJmdW4uc3ltYmFsb28uY29tIiwiaGFzSW1wcmVzc2lvbiI6ZmFsc2UsImxvYWRlckVuYWJsZWQiOnRydWUsImhvc3QiOiJodG1sNS5nYW1lZGlzdHJpYnV0aW9uLmNvbSIsInZlcnNpb24iOiIxLjUuMTgifQ%253D%253D',
    thumbnail: 'https://i.ibb.co/pv6MR4t4/Basketball-stars.jpg',
    category: GameCategory.SPORTS,
    type: GameType.IFRAME,
    isHot: true,
    popularity: 90
  },
  {
    id: 'neon-snake',
    title: 'Neon Snake',
    description: 'A high-speed, cyber-enhanced version of the classic snake game. Collect data nodes to grow your length while avoiding the firewall boundaries.',
    thumbnail: 'https://placehold.co/400x300/050b14/00f3ff?text=NEON+SNAKE',
    category: GameCategory.ARCADE,
    type: GameType.NATIVE,
    isHot: true,
    url: '#',
    popularity: 80
  },
  {
    id: 'cyber-pong',
    title: 'Cyber Pong',
    description: 'Challenge the AI in this holographic table tennis simulation. Deflect the energy ball and score against the neural network.',
    thumbnail: 'https://placehold.co/400x300/050b14/bd00ff?text=CYBER+PONG',
    category: GameCategory.ARCADE,
    type: GameType.NATIVE,
    isHot: true,
    url: '#',
    popularity: 78
  },
  {
    id: 'obby-tower',
    title: 'Obby Tower Parkour Climb',
    description: 'Master the heights in this parkour challenge. Jump, climb, and avoid falling in this Roblox-inspired tower obby.',
    url: 'https://html5.gamedistribution.com/5532111b774e4ca18238b41c029617e0/?gd_sdk_referrer_url=https://fun.symbaloo.com/home/mix/13ePLWjK81',
    thumbnail: 'https://i.ibb.co/N2L1d2MH/obby-tower-parkour-climb.jpg',
    category: GameCategory.PLATFORMER,
    type: GameType.IFRAME,
    isHot: true,
    popularity: 87
  },
  {
    id: 'vex-x3m',
    title: 'Vex X3m',
    description: 'Extreme racing challenges await. Navigate difficult courses and perform stunts in this intense bike trial game.',
    url: 'https://html5.gamedistribution.com/rvvASMiM/0a3c55fe33ba415f9b761b5831e75b27/index.html?gd_sdk_referrer_url=https%3A%2F%2Ffun.symbaloo.com%2Fhome%2Fmix%2F13ePLWjK81&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2Z1bi5zeW1iYWxvby5jb20vaG9tZS9taXgvMTNlcGx3ams4MSIsInBhcmVudERvbWFpbiI6ImZ1bi5zeW1iYWxvby5jb20iLCJ0b3BEb21haW4iOiJmdW4uc3ltYmFsb28uY29tIiwiaGFzSW1wcmVzc2lvbiI6ZmFsc2UsImxvYWRlckVuYWJsZWQiOnRydWUsImhvc3QiOiJodG1sNS5nYW1lZGlzdHJpYnV0aW9uLmNvbSIsInZlcnNpb24iOiIxLjUuMTgifQ%253D%253D',
    thumbnail: 'https://i.ibb.co/DXbzZK9/Vex-X3m.webp',
    category: GameCategory.RACING,
    type: GameType.IFRAME,
    isHot: true,
    popularity: 86
  },
  {
    id: 'fireboy-watergirl-1',
    title: 'Fireboy and Watergirl 1: Forest Temple',
    description: 'The classic duo adventure begins. Cooperate to solve puzzles and escape the Forest Temple.',
    url: 'https://html5.gamedistribution.com/a55c9cc9c21e4fc683c8c6857f3d0c75/?gd_sdk_referrer_url=https://fun.symbaloo.com/home/mix/13ePLWjK81',
    thumbnail: 'https://i.ibb.co/vCRzv5nx/fireboy1.jpg',
    category: GameCategory.PUZZLE,
    type: GameType.IFRAME,
    popularity: 93
  },
  {
    id: 'fireboy-watergirl-2',
    title: 'Fireboy and Watergirl 2: Light Temple',
    description: 'Use light beams and mirrors to guide Fireboy and Watergirl through the intricate Light Temple.',
    url: 'https://html5.gamedistribution.com/383ad09b92c7446b9113cccc29630517/?gd_sdk_referrer_url=https://fun.symbaloo.com/home/mix/13ePLWjK81',
    thumbnail: 'https://i.ibb.co/ycjJqmwY/Fireboy2.jpg',
    category: GameCategory.PUZZLE,
    type: GameType.IFRAME,
    popularity: 85
  },
  {
    id: 'fireboy-watergirl-3',
    title: 'Fireboy and Watergirl 3: Ice Temple',
    description: 'Slide through the frozen chambers. Control the elements to survive the treacherous Ice Temple.',
    url: 'https://html5.gamedistribution.com/f3a6e1ac0a77412289cbac47658b2b68/?gd_sdk_referrer_url=https://fun.symbaloo.com/home/mix/13ePLWjK81',
    thumbnail: 'https://i.ibb.co/Z6gZCLfv/Fireboy3.webp',
    category: GameCategory.PUZZLE,
    type: GameType.IFRAME,
    popularity: 83
  },
  {
    id: 'fireboy-watergirl-4',
    title: 'Fireboy and Watergirl 4: Crystal Temple',
    description: 'Teleport through portals and solve mind-bending puzzles in the Crystal Temple.',
    url: 'https://html5.gamedistribution.com/3790681b69584409b7f681a8e400102d/?gd_sdk_referrer_url=https://fun.symbaloo.com/home/mix/13ePLWjK81',
    thumbnail: 'https://i.ibb.co/4yR7qcL/Fireboy4.png',
    category: GameCategory.PUZZLE,
    type: GameType.IFRAME,
    popularity: 81
  },
  {
    id: 'fireboy-watergirl-5',
    title: 'Fireboy and Watergirl 5: Elements',
    description: 'Master all the elements combined. A comprehensive challenge for the ultimate duo.',
    url: 'https://html5.gamedistribution.com/03f124074b0049f89fdace0cacf8ead5/?gd_sdk_referrer_url=https://fun.symbaloo.com/home/mix/13ePLWjK81',
    thumbnail: 'https://i.ibb.co/1yw6Yrr/Fireboy5.jpg',
    category: GameCategory.PUZZLE,
    type: GameType.IFRAME,
    popularity: 79
  },
  {
    id: 'fireboy-watergirl-6',
    title: 'Fireboy & Watergirl 6: Fairy Tales',
    description: 'Explore a new temple with the help of magical fairies to switch switches and open doors.',
    url: 'https://html5.gamedistribution.com/56da8a54fe204845b34ccff750d4a60b/?gd_sdk_referrer_url=https://fun.symbaloo.com/home/mix/13ePLWjK81',
    thumbnail: 'https://i.ibb.co/FkBVZvq8/fireboy6.png',
    category: GameCategory.PUZZLE,
    type: GameType.IFRAME,
    isHot: true,
    popularity: 88
  }
];
