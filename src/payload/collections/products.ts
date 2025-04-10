import type { CollectionConfig } from "payload"
import { isAdmin } from "../access/isAdmin"

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "price", "stock"],
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "richText",
      required: true,
    },
    {
      name: "price",
      type: "number",
      required: true,
      min: 0,
    },
    {
      name: "compareAtPrice",
      label: "Compare at Price",
      type: "number",
      min: 0,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
    },
    {
      name: "images",
      type: "array",
      label: "Product Images",
      minRows: 1,
      maxRows: 10,
      required: true,
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "alt",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "stock",
      type: "number",
      required: true,
      defaultValue: 0,
      min: 0,
    },
    {
      name: "isOutOfStock",
      type: "checkbox",
      label: "Mark as out of stock",
      defaultValue: false,
    },
    {
      name: "isNew",
      type: "checkbox",
      label: "Mark as new",
      defaultValue: false,
    },
    {
      name: "isFeatured",
      type: "checkbox",
      label: "Mark as featured",
      defaultValue: false,
    },
    {
      name: "colors",
      type: "array",
      label: "Available Colors",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "value",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "sizes",
      type: "array",
      label: "Available Sizes",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "label",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "anime",
      type: "text",
      label: "Anime Series",
    },
    {
      name: "brand",
      type: "text",
      required: true,
      defaultValue: "AnimeFreak",
    },
    {
      name: "style",
      type: "select",
      options: [
        { label: "Casual", value: "Casual" },
        { label: "Formal", value: "Formal" },
        { label: "Party", value: "Party" },
        { label: "Bohemian", value: "Bohemian" },
        { label: "Vintage", value: "Vintage" },
        { label: "Anime", value: "Anime" },
        { label: "Cosplay", value: "Cosplay" },
        { label: "Streetwear", value: "Streetwear" },
      ],
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "meta",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Meta Title",
        },
        {
          name: "description",
          type: "textarea",
          label: "Meta Description",
        },
      ],
      admin: {
        position: "sidebar",
      },
    },
  ],
}
