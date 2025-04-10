import type { CollectionConfig } from "payload"
import { isAdmin } from "../access/isAdmin"

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
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
      type: "textarea",
    },
    {
      name: "parent",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
      filterOptions: ({ id }) => {
        return {
          id: {
            not_equals: id,
          },
        }
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
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
  ],
}
