import type { Block } from "payload"

export const Newsletter: Block = {
  slug: "newsletter",
  labels: {
    singular: "Newsletter",
    plural: "Newsletters",
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
          label: "Standard",
          value: "standard",
        },
        {
          label: "Split",
          value: "split",
        },
        {
          label: "Compact",
          value: "compact",
        },
        {
          label: "Centered",
          value: "centered",
        },
      ],
      defaultValue: "standard",
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
      name: "buttonText",
      type: "text",
      defaultValue: "Subscribe",
    },
    {
      name: "placeholderText",
      type: "text",
      defaultValue: "Your email address",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: {
        condition: (data) => data.layout === "split",
      },
    },
  ],
}
