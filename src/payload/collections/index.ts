import type { CollectionConfig } from "payload"

// Import collection configs
import { Products } from "./products"
import { Categories } from "./categories"
import { Media } from "./media"
import { Orders } from "./orders"
import { Users } from "./Users"
import { Pages } from "./pages"

// Export collections
export const collections: CollectionConfig[] = [Products, Categories, Media, Orders, Users, Pages]
