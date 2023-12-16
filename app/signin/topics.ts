export const topics = [
  "Make up",
  "Gymnastics",
  "Descendants movie",
  "Teeth",
  "Cheerleading",
  "Monster High movie",
  "Animals",
  "Nature",
];

interface CategoryItem {
  [key: string]: boolean;
}

export interface Categories {
  [key: string]: CategoryItem;
}

export const categories: Categories = {
  Clubs: {
    Swimming: false,
    Gymnastics: false,
    Cheerleading: false,
  },
  Music: {
    "Descendants soundtrack": false,
    "Matilda soundtrack": false,
    "Christmas songs": false,
    "Ava Max": false,
  },
  TV: {
    Thundermans: false,
    "Ivy & Bean": false,
    "Monster High 1": false,
    "Monster High 2": false,
  },
  Learning: {
    "Digestive system": false,
    Teeth: false,
    "Factor bugs": false,
    "World War 1": false,
  },
  Play: {
    Dancing: false,
    "Make-up": false,
    Elves: false,
    "Arts and Crafts": false,
  },
  Custom: {},
};

export const contentTypes = ["Facts", "Riddles", "Jokes", "Spells"];

export const contentLengths = [
  "Short (1-2 sentences)",
  "Medium (a paragraph",
  "Long (multiple paragraphs)",
];

export const iconIndex = {
  interests: {
    Animals: "🐾",
    "Art & Craft": "🎨",
    Cheerleading: "👯‍♀️",
    "Descendants movie": "🎬",
    Gymnastics: "🤸",
    Magic: "🪄",
    "Make up": "💄",
    "Monster High movie": "🎬",
    Nature: "🌿",
    Space: "🪐",
    Swimming: "🏊",
    Thundermans: "⚡",
    "Ivy & Bean": "👭",
    "Monster High 1": "🎬",
    "Monster High 2": "🎬",
    "Digestive system": "🧠",
    Teeth: "🦷",
    "Factor bugs": "🐞",
    "World War 1": "🌍",
    Dancing: "💃",
    "Make-up": "💄",
    Elves: "🧝‍♂️",
    "Arts and Crafts": "🎨",
    "Descendants soundtrack": "🎵",
    "Matilda soundtrack": "🎵",
    "Christmas songs": "🎄",
    "Ava Max": "🎶",
  },
};
