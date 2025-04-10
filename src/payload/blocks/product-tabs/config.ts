import type { Block } from "payload"

export const ProductTabs: Block = {
  slug: "product-tabs",
  labels: {
    singular: "Product Tabs",
    plural: "Product Tabs",
  },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
    },
    {
      name: "subheading",
      type: "text",
    },
    {
      name: "layout",
      type: "select",
      options: [
        {
          label: "Default",
          value: "default",
        },
        {
          label: "Minimal",
          value: "minimal",
        },
        {
          label: "Bordered",
          value: "bordered",
        },
        {
          label: "Underlined",
          value: "underlined",
        },
      ],
      defaultValue: "default",
    },
    {
      name: "style",
      type: "group",
      fields: [
        {
          name: "backgroundColor",
          type: "select",
          options: [
            {
              label: "None",
              value: "none",
            },
            {
              label: "Light",
              value: "light",
            },
            {
              label: "Dark",
              value: "dark",
            },
            {
              label: "Primary",
              value: "primary",
            },
            {
              label: "Secondary",
              value: "secondary",
            },
          ],
          defaultValue: "none",
        },
        {
          name: "textAlignment",
          type: "select",
          options: [
            {
              label: "Left",
              value: "left",
            },
            {
              label: "Center",
              value: "center",
            },
            {
              label: "Right",
              value: "right",
            },
          ],
          defaultValue: "center",
        },
        {
          name: "paddingTop",
          type: "select",
          options: [
            {
              label: "None",
              value: "none",
            },
            {
              label: "Small",
              value: "small",
            },
            {
              label: "Medium",
              value: "medium",
            },
            {
              label: "Large",
              value: "large",
            },
          ],
          defaultValue: "medium",
        },
        {
          name: "paddingBottom",
          type: "select",
          options: [
            {
              label: "None",
              value: "none",
            },
            {
              label: "Small",
              value: "small",
            },
            {
              label: "Medium",
              value: "medium",
            },
            {
              label: "Large",
              value: "large",
            },
          ],
          defaultValue: "medium",
        },
      ],
    },
    {
      name: "tabs",
      type: "array",
      minRows: 1,
      maxRows: 5,
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "products",
          type: "relationship",
          relationTo: "products",
          hasMany: true,
          required: true,
        },
      ],
    },
    {
      name: "viewAllLink",
      type: "text",
      defaultValue: "/shop",
    },
    {
      name: "viewAllLabel",
      type: "text",
      defaultValue: "View All Products",
    },
  ],
}
