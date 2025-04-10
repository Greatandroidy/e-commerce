import type { Block } from "payload"

export const ImageGallery: Block = {
  slug: "image-gallery",
  labels: {
    singular: "Image Gallery",
    plural: "Image Galleries",
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
          label: "Masonry",
          value: "masonry",
        },
        {
          label: "Carousel",
          value: "carousel",
        },
        {
          label: "Lightbox",
          value: "lightbox",
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
        {
          name: "gapSize",
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
      name: "images",
      type: "array",
      minRows: 1,
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
        {
          name: "caption",
          type: "text",
        },
        {
          name: "link",
          type: "text",
        },
      ],
    },
  ],
}
