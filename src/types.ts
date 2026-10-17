export type AdFormat = 'story' | 'feed' | 'playable' | 'landing';
export type DeviceMode = 'mobile' | 'tablet' | 'desktop';
export type Language = 'fr' | 'en';

export interface AdConfig {
  gameTitle: string;
  tagline: string;
  badgeText: string;
  ctaText: string;
  ratingScore: string;
  reviewCount: string;
  genre: string;
  destinationUrl: string;
  releaseDate: string;
  discountBonus: string;
}

export const DEFAULT_CONFIG: Record<Language, AdConfig> = {
  fr: {
    gameTitle: "OPHIDIA SUPRÊME : LE SERPENT TITANESQUE",
    tagline: "Affrontez le Léviathan Reptile Suprême dans un Duel Mythique au Cœur de la Jungle.",
    badgeText: "ÉDITION SUPRÊME 2026",
    ctaText: "Débloquer l'Édition Suprême",
    ratingScore: "4.9",
    reviewCount: "185 400 avis",
    genre: "Action RPG Suprême / Dark Fantasy",
    destinationUrl: "https://store.steampowered.com/app/ophidia_supreme",
    releaseDate: "15 Novembre 2026",
    discountBonus: "+10 000 Gemmes Runiques & Armure Anti-Venin du Serpent Suprême Offerte"
  },
  en: {
    gameTitle: "OPHIDIA SUPREME: THE TITAN SERPENT",
    tagline: "Defy the Supreme Primal Wyrm in an Epic Visceral Clash Deep Inside the Jungle.",
    badgeText: "SUPREME EDITION 2026",
    ctaText: "Unlock Supreme Edition",
    ratingScore: "4.9",
    reviewCount: "185,400 reviews",
    genre: "Supreme Action RPG / Dark Fantasy",
    destinationUrl: "https://store.steampowered.com/app/ophidia_supreme",
    releaseDate: "November 15, 2026",
    discountBonus: "+10,000 Runic Gems & Supreme Serpent Venom Armor Included"
  }
};
