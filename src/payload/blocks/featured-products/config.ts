import type { Block } from "payload"

export const FeaturedProducts: Block = {
  slug: "featured-products",
  labels: {
    singular: "Featured Products",
    plural: "Featured Products",
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
          label: "Grid",
          value: "grid",
        },
        {
          label: "Carousel",
          value: "carousel",
        },
        {
          label: "Featured",
          value: "featured",
        },
        {
          label: "Compact",
          value: "compact",
        },
      ],
      defaultValue: "grid",
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
      name: "products",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
      required: true,
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
