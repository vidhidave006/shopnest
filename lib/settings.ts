import fs from "fs";
import path from "path";

export type HomePageMode = "ecommerce" | "informational";

export interface AppSettings {
  homePageMode: HomePageMode;
  updatedAt?: string;
}

const SETTINGS_FILE = path.join(process.cwd(), "data", "settings.json");

const DEFAULT_SETTINGS: AppSettings = {
  homePageMode: "ecommerce",
  updatedAt: new Date().toISOString(),
};

export async function getAppSettings(): Promise<AppSettings> {
  try {
    if (!fs.existsSync(SETTINGS_FILE)) {
      // Ensure data directory exists
      const dataDir = path.dirname(SETTINGS_FILE);
      if (!fs.existsSync(dataDir)) {
        await fs.promises.mkdir(dataDir, { recursive: true });
      }
      await fs.promises.writeFile(
        SETTINGS_FILE,
        JSON.stringify(DEFAULT_SETTINGS, null, 2),
        "utf-8"
      );
      return DEFAULT_SETTINGS;
    }
    const content = await fs.promises.readFile(SETTINGS_FILE, "utf-8");
    const parsed = JSON.parse(content);
    return {
      homePageMode: parsed.homePageMode === "informational" ? "informational" : "ecommerce",
      updatedAt: parsed.updatedAt || new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error reading settings.json:", error);
    return DEFAULT_SETTINGS;
  }
}

export async function saveAppSettings(settings: Partial<AppSettings>): Promise<AppSettings> {
  try {
    const current = await getAppSettings();
    const updated: AppSettings = {
      ...current,
      ...settings,
      updatedAt: new Date().toISOString(),
    };

    const dataDir = path.dirname(SETTINGS_FILE);
    if (!fs.existsSync(dataDir)) {
      await fs.promises.mkdir(dataDir, { recursive: true });
    }

    await fs.promises.writeFile(
      SETTINGS_FILE,
      JSON.stringify(updated, null, 2),
      "utf-8"
    );
    return updated;
  } catch (error) {
    console.error("Error writing settings.json:", error);
    throw error;
  }
}
