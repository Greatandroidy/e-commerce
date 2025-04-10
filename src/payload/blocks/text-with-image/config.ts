import type { Block } from "payload"

export const TextWithImage: Block = {
  slug: "text-with-image",
  labels: {
    singular: "Text with Image",
    plural: "Text with Images",
  },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
    },
    {
      name: "content",
      type: "richText",
    },
    {
      name: "layout",
      type: "select",
      options: [
        {
          label: "Image Left",
          value: "image-left",
        },
        {
          label: "Image Right",
          value: "image-right",
        },
        {
          label: "Image Top",
          value: "image-top",
        },
        {
          label: "Image Bottom",
          value: "image-bottom",
        },
      ],
      defaultValue: "image-right",
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
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "imageAlt",
      type: "text",
      required: true,
    },
    {
      name: "button",
      type: "group",
      fields: [
        {
          name: "text",
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
  ],
}
