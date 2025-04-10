import type { Block } from "payload"

export const Banner: Block = {
  slug: "banner",
  labels: {
    singular: "Banner",
    plural: "Banners",
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
          label: "Full Width",
          value: "full-width",
        },
        {
          label: "Contained",
          value: "contained",
        },
        {
          label: "Sticky",
          value: "sticky",
        },
        {
          label: "Floating",
          value: "floating",
        },
      ],
      defaultValue: "full-width",
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
              label: "Primary",
              value: "primary",
            },
            {
              label: "Secondary",
              value: "secondary",
            },
            {
              label: "Dark",
              value: "dark",
            },
            {
              label: "Light",
              value: "light",
            },
            {
              label: "Custom",
              value: "custom",
            },
          ],
          defaultValue: "primary",
        },
        {
          name: "customBackgroundColor",
          type: "text",
          admin: {
            condition: (data, siblingData) => siblingData?.backgroundColor === "custom",
          },
        },
        {
          name: "textColor",
          type: "select",
          options: [
            {
              label: "Light",
              value: "light",
            },
            {
              label: "Dark",
              value: "dark",
            },
          ],
          defaultValue: "light",
        },
        {
          name: "paddingY",
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
          defaultValue: "small",
        },
        {
          name: "rounded",
          type: "checkbox",
          defaultValue: false,
        },
      ],
    },
    {
      name: "button",
      type: "group",
      fields: [
        {
          name: "label",
          type: "text",
        },
        {
          name: "link",
          type: "text",
        },
        {
          name: "variant",
          type: "select",
          options: [
            { label: "Default", value: "default" },
            { label: "Outline", value: "outline" },
            { label: "Secondary", value: "secondary" },
          ],
          defaultValue: "default",
        },
      ],
    },
    {
      name: "dismissible",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "cookieId",
      type: "text",
      admin: {
        condition: (data) => data.dismissible,
        description: "Unique ID for the cookie to remember dismissal",
      },
    },
  ],
}
