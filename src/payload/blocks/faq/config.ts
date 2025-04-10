import type { Block } from "payload"

export const FAQ: Block = {
  slug: "faq",
  labels: {
    singular: "FAQ",
    plural: "FAQs",
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
          label: "Accordion",
          value: "accordion",
        },
        {
          label: "Grid",
          value: "grid",
        },
        {
          label: "Tabs",
          value: "tabs",
        },
        {
          label: "Simple",
          value: "simple",
        },
      ],
      defaultValue: "accordion",
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
          defaultValue: "light",
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
          defaultValue: "left",
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
      name: "faqs",
      type: "array",
      minRows: 1,
      fields: [
        {
          name: "question",
          type: "text",
          required: true,
        },
        {
          name: "answer",
          type: "textarea",
          required: true,
        },
        {
          name: "category",
          type: "text",
          admin: {
            condition: (data, siblingData, { rootData }) => rootData.layout === "tabs",
          },
        },
      ],
    },
    {
      name: "contactButton",
      type: "group",
      fields: [
        {
          name: "show",
          type: "checkbox",
          defaultValue: false,
        },
        {
          name: "label",
          type: "text",
          defaultValue: "Contact Support",
          admin: {
            condition: (data, siblingData) => siblingData?.show,
          },
        },
        {
          name: "link",
          type: "text",
          defaultValue: "/contact",
          admin: {
            condition: (data, siblingData) => siblingData?.show,
          },
        },
      ],
    },
  ],
}
