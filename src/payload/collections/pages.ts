import type { CollectionConfig } from "payload"
import { isAdmin } from "../access/isAdmin"
import { Hero } from "../fields/hero"
import { blocks } from "../blocks"

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "status"],
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "hero",
      type: "group",
      fields: Hero,
    },
    {
      name: "content",
      type: "blocks",
      blocks: blocks,
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
      name: "status",
      type: "select",
      options: [
        {
          label: "Draft",
          value: "draft",
        },
        {
          label: "Published",
          value: "published",
        },
      ],
      defaultValue: "draft",
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
        {
          name: "keywords",
          type: "text",
          label: "Meta Keywords",
        },
      ],
      admin: {
        position: "sidebar",
      },
    },
  ],
}
