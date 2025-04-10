/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * Supported timezones in IANA format.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "supportedTimezones".
 */
export type SupportedTimezones =
  | 'Pacific/Midway'
  | 'Pacific/Niue'
  | 'Pacific/Honolulu'
  | 'Pacific/Rarotonga'
  | 'America/Anchorage'
  | 'Pacific/Gambier'
  | 'America/Los_Angeles'
  | 'America/Tijuana'
  | 'America/Denver'
  | 'America/Phoenix'
  | 'America/Chicago'
  | 'America/Guatemala'
  | 'America/New_York'
  | 'America/Bogota'
  | 'America/Caracas'
  | 'America/Santiago'
  | 'America/Buenos_Aires'
  | 'America/Sao_Paulo'
  | 'Atlantic/South_Georgia'
  | 'Atlantic/Azores'
  | 'Atlantic/Cape_Verde'
  | 'Europe/London'
  | 'Europe/Berlin'
  | 'Africa/Lagos'
  | 'Europe/Athens'
  | 'Africa/Cairo'
  | 'Europe/Moscow'
  | 'Asia/Riyadh'
  | 'Asia/Dubai'
  | 'Asia/Baku'
  | 'Asia/Karachi'
  | 'Asia/Tashkent'
  | 'Asia/Calcutta'
  | 'Asia/Dhaka'
  | 'Asia/Almaty'
  | 'Asia/Jakarta'
  | 'Asia/Bangkok'
  | 'Asia/Shanghai'
  | 'Asia/Singapore'
  | 'Asia/Tokyo'
  | 'Asia/Seoul'
  | 'Australia/Brisbane'
  | 'Australia/Sydney'
  | 'Pacific/Guam'
  | 'Pacific/Noumea'
  | 'Pacific/Auckland'
  | 'Pacific/Fiji';

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  blocks: {};
  collections: {
    users: User;
    media: Media;
    products: Product;
    orders: Order;
    pages: Page;
    categories: Category;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    users: UsersSelect<false> | UsersSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    products: ProductsSelect<false> | ProductsSelect<true>;
    orders: OrdersSelect<false> | OrdersSelect<true>;
    pages: PagesSelect<false> | PagesSelect<true>;
    categories: CategoriesSelect<false> | CategoriesSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: number;
  };
  globals: {};
  globalsSelect: {};
  locale: null;
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  role?: ('admin' | 'user') | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  alt: string;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    card?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    hero?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "products".
 */
export interface Product {
  id: number;
  name: string;
  description: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  price: number;
  compareAtPrice?: number | null;
  category: number | Category;
  images: {
    image: number | Media;
    alt: string;
    id?: string | null;
  }[];
  stock: number;
  isOutOfStock?: boolean | null;
  isNew?: boolean | null;
  isFeatured?: boolean | null;
  colors?:
    | {
        name: string;
        value: string;
        id?: string | null;
      }[]
    | null;
  sizes?:
    | {
        name: string;
        label: string;
        id?: string | null;
      }[]
    | null;
  anime?: string | null;
  brand: string;
  style?: ('Casual' | 'Formal' | 'Party' | 'Bohemian' | 'Vintage' | 'Anime' | 'Cosplay' | 'Streetwear') | null;
  slug: string;
  meta?: {
    title?: string | null;
    description?: string | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categories".
 */
export interface Category {
  id: number;
  name: string;
  description?: string | null;
  parent?: (number | null) | Category;
  image?: (number | null) | Media;
  slug: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "orders".
 */
export interface Order {
  id: number;
  orderNumber: string;
  orderDate: string;
  customer: number | User;
  items: {
    product: number | Product;
    id?: string | null;
  }[];
  total: number;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: number;
  title: string;
  hero: {
    heading: string;
    subheading?: string | null;
    image: number | Media;
    overlay?: ('none' | 'dark' | 'light' | 'gradient') | null;
    overlayOpacity?: ('10' | '20' | '30' | '40' | '50' | '60' | '70' | '80' | '90') | null;
    textColor?: ('light' | 'dark') | null;
    textAlignment?: ('left' | 'center' | 'right') | null;
    buttons?:
      | {
          label: string;
          link: string;
          variant?: ('primary' | 'secondary' | 'outline') | null;
          id?: string | null;
        }[]
      | null;
    height?: ('small' | 'medium' | 'large' | 'full') | null;
  };
  content?:
    | (
        | {
            heading: string;
            subheading?: string | null;
            layout?: ('grid' | 'carousel' | 'masonry' | 'list') | null;
            style?: {
              backgroundColor?: ('none' | 'light' | 'dark' | 'primary' | 'secondary') | null;
              textAlignment?: ('left' | 'center' | 'right') | null;
              paddingTop?: ('none' | 'small' | 'medium' | 'large') | null;
              paddingBottom?: ('none' | 'small' | 'medium' | 'large') | null;
            };
            categories?:
              | {
                  title: string;
                  image: number | Media;
                  link: string;
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'featured-categories';
          }
        | {
            heading: string;
            subheading?: string | null;
            layout?: ('default' | 'minimal' | 'bordered' | 'underlined') | null;
            style?: {
              backgroundColor?: ('none' | 'light' | 'dark' | 'primary' | 'secondary') | null;
              textAlignment?: ('left' | 'center' | 'right') | null;
              paddingTop?: ('none' | 'small' | 'medium' | 'large') | null;
              paddingBottom?: ('none' | 'small' | 'medium' | 'large') | null;
            };
            tabs?:
              | {
                  label: string;
                  products: (number | Product)[];
                  id?: string | null;
                }[]
              | null;
            viewAllLink?: string | null;
            viewAllLabel?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'product-tabs';
          }
        | {
            heading: string;
            subheading?: string | null;
            layout?: ('standard' | 'split' | 'compact' | 'centered') | null;
            style?: {
              backgroundColor?: ('primary' | 'secondary' | 'dark' | 'light' | 'custom') | null;
              customBackgroundColor?: string | null;
              textColor?: ('light' | 'dark') | null;
              paddingTop?: ('none' | 'small' | 'medium' | 'large') | null;
              paddingBottom?: ('none' | 'small' | 'medium' | 'large') | null;
            };
            buttonText?: string | null;
            placeholderText?: string | null;
            image?: (number | null) | Media;
            id?: string | null;
            blockName?: string | null;
            blockType: 'newsletter';
          }
        | {
            heading: string;
            subheading?: string | null;
            layout?: ('grid' | 'carousel' | 'featured' | 'compact') | null;
            style?: {
              backgroundColor?: ('none' | 'light' | 'dark' | 'primary' | 'secondary') | null;
              textAlignment?: ('left' | 'center' | 'right') | null;
              paddingTop?: ('none' | 'small' | 'medium' | 'large') | null;
              paddingBottom?: ('none' | 'small' | 'medium' | 'large') | null;
            };
            products: (number | Product)[];
            viewAllLink?: string | null;
            viewAllLabel?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'featured-products';
          }
        | {
            heading: string;
            subheading?: string | null;
            layout?: ('standard' | 'with-image' | 'centered' | 'minimal') | null;
            style?: {
              backgroundColor?: ('primary' | 'secondary' | 'dark' | 'light' | 'custom') | null;
              customBackgroundColor?: string | null;
              textColor?: ('light' | 'dark') | null;
              paddingTop?: ('none' | 'small' | 'medium' | 'large') | null;
              paddingBottom?: ('none' | 'small' | 'medium' | 'large') | null;
              rounded?: boolean | null;
            };
            primaryButton: {
              label: string;
              link: string;
              variant?: ('default' | 'outline' | 'secondary') | null;
            };
            secondaryButton?: {
              label?: string | null;
              link?: string | null;
              variant?: ('default' | 'outline' | 'secondary') | null;
            };
            image?: (number | null) | Media;
            id?: string | null;
            blockName?: string | null;
            blockType: 'call-to-action';
          }
        | {
            heading: string;
            subheading?: string | null;
            layout?: ('full-width' | 'contained' | 'sticky' | 'floating') | null;
            style?: {
              backgroundColor?: ('primary' | 'secondary' | 'dark' | 'light' | 'custom') | null;
              customBackgroundColor?: string | null;
              textColor?: ('light' | 'dark') | null;
              paddingY?: ('none' | 'small' | 'medium' | 'large') | null;
              rounded?: boolean | null;
            };
            button?: {
              label?: string | null;
              link?: string | null;
              variant?: ('default' | 'outline' | 'secondary') | null;
            };
            dismissible?: boolean | null;
            /**
             * Unique ID for the cookie to remember dismissal
             */
            cookieId?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'banner';
          }
        | {
            heading: string;
            subheading?: string | null;
            layout?: ('accordion' | 'grid' | 'tabs' | 'simple') | null;
            style?: {
              backgroundColor?: ('none' | 'light' | 'dark' | 'primary' | 'secondary') | null;
              textAlignment?: ('left' | 'center' | 'right') | null;
              paddingTop?: ('none' | 'small' | 'medium' | 'large') | null;
              paddingBottom?: ('none' | 'small' | 'medium' | 'large') | null;
            };
            faqs?:
              | {
                  question: string;
                  answer: string;
                  category?: string | null;
                  id?: string | null;
                }[]
              | null;
            contactButton?: {
              show?: boolean | null;
              label?: string | null;
              link?: string | null;
            };
            id?: string | null;
            blockName?: string | null;
            blockType: 'faq';
          }
        | {
            heading: string;
            subheading?: string | null;
            layout?: ('grid' | 'carousel' | 'masonry' | 'simple') | null;
            style?: {
              backgroundColor?: ('none' | 'light' | 'dark' | 'primary' | 'secondary') | null;
              textAlignment?: ('left' | 'center' | 'right') | null;
              paddingTop?: ('none' | 'small' | 'medium' | 'large') | null;
              paddingBottom?: ('none' | 'small' | 'medium' | 'large') | null;
            };
            testimonials?:
              | {
                  quote: string;
                  author: string;
                  role?: string | null;
                  avatar?: (number | null) | Media;
                  rating?: ('5' | '4' | '3' | '2' | '1') | null;
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'testimonials';
          }
        | {
            heading: string;
            subheading?: string | null;
            layout?: ('grid' | 'masonry' | 'carousel' | 'lightbox') | null;
            style?: {
              backgroundColor?: ('none' | 'light' | 'dark' | 'primary' | 'secondary') | null;
              textAlignment?: ('left' | 'center' | 'right') | null;
              paddingTop?: ('none' | 'small' | 'medium' | 'large') | null;
              paddingBottom?: ('none' | 'small' | 'medium' | 'large') | null;
              gapSize?: ('none' | 'small' | 'medium' | 'large') | null;
            };
            images?:
              | {
                  image: number | Media;
                  alt: string;
                  caption?: string | null;
                  link?: string | null;
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'image-gallery';
          }
        | {
            heading: string;
            content?: {
              root: {
                type: string;
                children: {
                  type: string;
                  version: number;
                  [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
              };
              [k: string]: unknown;
            } | null;
            layout?: ('image-left' | 'image-right' | 'image-top' | 'image-bottom') | null;
            style?: {
              backgroundColor?: ('none' | 'light' | 'dark' | 'primary' | 'secondary') | null;
              textAlignment?: ('left' | 'center' | 'right') | null;
              paddingTop?: ('none' | 'small' | 'medium' | 'large') | null;
              paddingBottom?: ('none' | 'small' | 'medium' | 'large') | null;
            };
            image: number | Media;
            imageAlt: string;
            button?: {
              text?: string | null;
              link?: string | null;
              variant?: ('default' | 'outline' | 'secondary') | null;
            };
            id?: string | null;
            blockName?: string | null;
            blockType: 'text-with-image';
          }
      )[]
    | null;
  slug: string;
  status?: ('draft' | 'published') | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    keywords?: string | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: number;
  document?:
    | ({
        relationTo: 'users';
        value: number | User;
      } | null)
    | ({
        relationTo: 'media';
        value: number | Media;
      } | null)
    | ({
        relationTo: 'products';
        value: number | Product;
      } | null)
    | ({
        relationTo: 'orders';
        value: number | Order;
      } | null)
    | ({
        relationTo: 'pages';
        value: number | Page;
      } | null)
    | ({
        relationTo: 'categories';
        value: number | Category;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  role?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
  sizes?:
    | T
    | {
        thumbnail?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        card?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        hero?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
      };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "products_select".
 */
export interface ProductsSelect<T extends boolean = true> {
  name?: T;
  description?: T;
  price?: T;
  compareAtPrice?: T;
  category?: T;
  images?:
    | T
    | {
        image?: T;
        alt?: T;
        id?: T;
      };
  stock?: T;
  isOutOfStock?: T;
  isNew?: T;
  isFeatured?: T;
  colors?:
    | T
    | {
        name?: T;
        value?: T;
        id?: T;
      };
  sizes?:
    | T
    | {
        name?: T;
        label?: T;
        id?: T;
      };
  anime?: T;
  brand?: T;
  style?: T;
  slug?: T;
  meta?:
    | T
    | {
        title?: T;
        description?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "orders_select".
 */
export interface OrdersSelect<T extends boolean = true> {
  orderNumber?: T;
  orderDate?: T;
  customer?: T;
  items?:
    | T
    | {
        product?: T;
        id?: T;
      };
  total?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages_select".
 */
export interface PagesSelect<T extends boolean = true> {
  title?: T;
  hero?:
    | T
    | {
        heading?: T;
        subheading?: T;
        image?: T;
        overlay?: T;
        overlayOpacity?: T;
        textColor?: T;
        textAlignment?: T;
        buttons?:
          | T
          | {
              label?: T;
              link?: T;
              variant?: T;
              id?: T;
            };
        height?: T;
      };
  content?:
    | T
    | {
        'featured-categories'?:
          | T
          | {
              heading?: T;
              subheading?: T;
              layout?: T;
              style?:
                | T
                | {
                    backgroundColor?: T;
                    textAlignment?: T;
                    paddingTop?: T;
                    paddingBottom?: T;
                  };
              categories?:
                | T
                | {
                    title?: T;
                    image?: T;
                    link?: T;
                    id?: T;
                  };
              id?: T;
              blockName?: T;
            };
        'product-tabs'?:
          | T
          | {
              heading?: T;
              subheading?: T;
              layout?: T;
              style?:
                | T
                | {
                    backgroundColor?: T;
                    textAlignment?: T;
                    paddingTop?: T;
                    paddingBottom?: T;
                  };
              tabs?:
                | T
                | {
                    label?: T;
                    products?: T;
                    id?: T;
                  };
              viewAllLink?: T;
              viewAllLabel?: T;
              id?: T;
              blockName?: T;
            };
        newsletter?:
          | T
          | {
              heading?: T;
              subheading?: T;
              layout?: T;
              style?:
                | T
                | {
                    backgroundColor?: T;
                    customBackgroundColor?: T;
                    textColor?: T;
                    paddingTop?: T;
                    paddingBottom?: T;
                  };
              buttonText?: T;
              placeholderText?: T;
              image?: T;
              id?: T;
              blockName?: T;
            };
        'featured-products'?:
          | T
          | {
              heading?: T;
              subheading?: T;
              layout?: T;
              style?:
                | T
                | {
                    backgroundColor?: T;
                    textAlignment?: T;
                    paddingTop?: T;
                    paddingBottom?: T;
                  };
              products?: T;
              viewAllLink?: T;
              viewAllLabel?: T;
              id?: T;
              blockName?: T;
            };
        'call-to-action'?:
          | T
          | {
              heading?: T;
              subheading?: T;
              layout?: T;
              style?:
                | T
                | {
                    backgroundColor?: T;
                    customBackgroundColor?: T;
                    textColor?: T;
                    paddingTop?: T;
                    paddingBottom?: T;
                    rounded?: T;
                  };
              primaryButton?:
                | T
                | {
                    label?: T;
                    link?: T;
                    variant?: T;
                  };
              secondaryButton?:
                | T
                | {
                    label?: T;
                    link?: T;
                    variant?: T;
                  };
              image?: T;
              id?: T;
              blockName?: T;
            };
        banner?:
          | T
          | {
              heading?: T;
              subheading?: T;
              layout?: T;
              style?:
                | T
                | {
                    backgroundColor?: T;
                    customBackgroundColor?: T;
                    textColor?: T;
                    paddingY?: T;
                    rounded?: T;
                  };
              button?:
                | T
                | {
                    label?: T;
                    link?: T;
                    variant?: T;
                  };
              dismissible?: T;
              cookieId?: T;
              id?: T;
              blockName?: T;
            };
        faq?:
          | T
          | {
              heading?: T;
              subheading?: T;
              layout?: T;
              style?:
                | T
                | {
                    backgroundColor?: T;
                    textAlignment?: T;
                    paddingTop?: T;
                    paddingBottom?: T;
                  };
              faqs?:
                | T
                | {
                    question?: T;
                    answer?: T;
                    category?: T;
                    id?: T;
                  };
              contactButton?:
                | T
                | {
                    show?: T;
                    label?: T;
                    link?: T;
                  };
              id?: T;
              blockName?: T;
            };
        testimonials?:
          | T
          | {
              heading?: T;
              subheading?: T;
              layout?: T;
              style?:
                | T
                | {
                    backgroundColor?: T;
                    textAlignment?: T;
                    paddingTop?: T;
                    paddingBottom?: T;
                  };
              testimonials?:
                | T
                | {
                    quote?: T;
                    author?: T;
                    role?: T;
                    avatar?: T;
                    rating?: T;
                    id?: T;
                  };
              id?: T;
              blockName?: T;
            };
        'image-gallery'?:
          | T
          | {
              heading?: T;
              subheading?: T;
              layout?: T;
              style?:
                | T
                | {
                    backgroundColor?: T;
                    textAlignment?: T;
                    paddingTop?: T;
                    paddingBottom?: T;
                    gapSize?: T;
                  };
              images?:
                | T
                | {
                    image?: T;
                    alt?: T;
                    caption?: T;
                    link?: T;
                    id?: T;
                  };
              id?: T;
              blockName?: T;
            };
        'text-with-image'?:
          | T
          | {
              heading?: T;
              content?: T;
              layout?: T;
              style?:
                | T
                | {
                    backgroundColor?: T;
                    textAlignment?: T;
                    paddingTop?: T;
                    paddingBottom?: T;
                  };
              image?: T;
              imageAlt?: T;
              button?:
                | T
                | {
                    text?: T;
                    link?: T;
                    variant?: T;
                  };
              id?: T;
              blockName?: T;
            };
      };
  slug?: T;
  status?: T;
  meta?:
    | T
    | {
        title?: T;
        description?: T;
        keywords?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categories_select".
 */
export interface CategoriesSelect<T extends boolean = true> {
  name?: T;
  description?: T;
  parent?: T;
  image?: T;
  slug?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}