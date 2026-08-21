import { Product } from "@/types/shop";

// Comprehensive Semantic & Synonym Map for E-Commerce Catalog
export const SYNONYM_GROUPS: Record<string, string[]> = {
  footwear: [
    "shoe",
    "shoes",
    "sneaker",
    "sneakers",
    "footwear",
    "running",
    "runner",
    "runners",
    "boots",
    "boot",
    "chelsea",
    "kicks",
    "trainers",
    "trainer",
    "loafers",
    "loafer",
    "slides",
    "sandals",
    "apparel-footwear",
    "fashion-footwear",
    "fashion & footwear",
  ],
  audio: [
    "headphone",
    "headphones",
    "earphone",
    "earphones",
    "earbuds",
    "earbud",
    "buds",
    "audio",
    "sound",
    "speaker",
    "speakers",
    "music",
    "anc",
    "wireless",
    "bluetooth",
    "spatial",
    "acoustics",
    "acoustic",
    "tech-audio",
    "audio-tech",
    "audio & tech",
  ],
  wearables: [
    "watch",
    "watches",
    "smartwatch",
    "smartwatches",
    "wearable",
    "wearables",
    "timepiece",
    "chronograph",
    "fitness",
    "tracker",
    "band",
    "wrist",
    "smart-wearables",
    "smart wearables",
  ],
  apparel: [
    "cloth",
    "clothes",
    "clothing",
    "apparel",
    "shirt",
    "shirts",
    "tshirt",
    "t-shirt",
    "tee",
    "jacket",
    "hoodie",
    "linen",
    "fashion",
    "wear",
    "apparel-footwear",
    "fashion-footwear",
    "fashion & footwear",
  ],
  bags: [
    "bag",
    "bags",
    "backpack",
    "backpacks",
    "duffle",
    "duffel",
    "weekender",
    "luggage",
    "tote",
    "wallet",
    "leather bag",
    "travel",
    "carry",
    "lifestyle-travel",
    "travel-everyday",
    "travel & everyday",
  ],
  lighting: [
    "lamp",
    "lamps",
    "light",
    "lights",
    "lighting",
    "diffuser",
    "home",
    "decor",
    "ambient",
    "desk lamp",
    "living",
    "home-living",
    "home-ambient",
    "home & ambient",
  ],
  skincare: [
    "skin",
    "skincare",
    "serum",
    "cream",
    "face",
    "body",
    "oil",
    "elixir",
    "beauty",
    "wellness",
    "vitamin c",
    "clean beauty",
    "skincare-wellness",
    "beauty-wellness",
    "beauty & wellness",
  ],
  peripherals: [
    "keyboard",
    "keyboards",
    "keychron",
    "typing",
    "mechanical",
    "switches",
    "desk",
    "tech-audio",
    "audio-tech",
  ],
};

// Levenshtein distance for fuzzy typo matching
function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

// Check fuzzy match with tolerance
function isFuzzyMatch(queryWord: string, targetWord: string): boolean {
  if (queryWord.length < 4) return false;
  const maxDistance = queryWord.length > 6 ? 2 : 1;
  return levenshtein(queryWord, targetWord) <= maxDistance;
}

/**
 * Intelligent Semantic, Synonym-Aware, and Fuzzy Product Matcher
 */
export function matchProductSearch(product: Product, query: string): boolean {
  if (!query || !query.trim()) return true;

  const rawQuery = query.toLowerCase().trim();
  const queryTokens = rawQuery.split(/\s+/).filter(Boolean);

  // Extract all searchable product fields
  const productTextParts = [
    product.name,
    product.category,
    product.brand,
    product.description || "",
    ...(product.tags || []),
    ...(product.features || []),
    ...(product.colors?.map((c) => c.name) || []),
    ...Object.values(product.specs || {}),
  ].map((str) => str.toLowerCase());

  const fullProductText = productTextParts.join(" ");
  const wordsInProduct = fullProductText.split(/[\s,.\-()/]+/).filter((w) => w.length >= 3);

  // Every token in query must match something in the product or its synonym network
  return queryTokens.every((token) => {
    // 1. Direct exact or substring match
    if (fullProductText.includes(token)) {
      return true;
    }

    // 2. Singular / Plural stemming match (e.g. "shoes" <-> "shoe", "watches" <-> "watch")
    const singularToken = token.endsWith("ies")
      ? token.slice(0, -3) + "y"
      : token.endsWith("es")
      ? token.slice(0, -2)
      : token.endsWith("s")
      ? token.slice(0, -1)
      : token;

    const pluralToken = token + "s";

    if (
      fullProductText.includes(singularToken) ||
      fullProductText.includes(pluralToken)
    ) {
      return true;
    }

    // 3. Synonym Group semantic expansion
    for (const group of Object.values(SYNONYM_GROUPS)) {
      const tokenInGroup = group.some(
        (term) =>
          term === token ||
          term === singularToken ||
          token.includes(term) ||
          term.includes(token)
      );

      if (tokenInGroup) {
        // Check if ANY synonym in this group is present in the product
        const hasSynonym = group.some((synonym) =>
          fullProductText.includes(synonym)
        );
        if (hasSynonym) return true;
      }
    }

    // 4. Fuzzy typo matching
    const hasFuzzy = wordsInProduct.some((word) => isFuzzyMatch(token, word));
    if (hasFuzzy) return true;

    return false;
  });
}
