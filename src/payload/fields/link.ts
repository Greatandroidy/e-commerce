import type { Field } from "payload"

export const link: Field = {
  name: "link",
  type: "group",
  fields: [
    {
      name: "type",
      type: "radio",
      options: [
        {
          label: "Internal",
          value: "internal",
        },
        {
          label: "External",
          value: "external",
        },
      ],
      defaultValue: "internal",
      admin: {
        layout: "horizontal",
      },
    },
    {
      name: "internalLink",
      type: "relationship",
      relationTo: ["pages", "products", "categories"],
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.type === "internal",
      },
    },
    {
      name: "externalLink",
      type: "text",
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.type === "external",
      },
    },
    {
      name: "label",
      type: "text",
      required: true,
    },
    {
      name: "newTab",
      type: "checkbox",
      label: "Open in new tab",
    },
  ],
}
