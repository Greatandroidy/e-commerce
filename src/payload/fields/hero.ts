import type { Field } from "payload"

export const Hero: Field[] = [
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
    name: "image",
    type: "upload",
    relationTo: "media",
    required: true,
  },
  {
    name: "overlay",
    type: "select",
    options: [
      {
        label: "None",
        value: "none",
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
        label: "Gradient",
        value: "gradient",
      },
    ],
    defaultValue: "gradient",
  },
  {
    name: "overlayOpacity",
    type: "select",
    options: [
      {
        label: "10%",
        value: "10",
      },
      {
        label: "20%",
        value: "20",
      },
      {
        label: "30%",
        value: "30",
      },
      {
        label: "40%",
        value: "40",
      },
      {
        label: "50%",
        value: "50",
      },
      {
        label: "60%",
        value: "60",
      },
      {
        label: "70%",
        value: "70",
      },
      {
        label: "80%",
        value: "80",
      },
      {
        label: "90%",
        value: "90",
      },
    ],
    defaultValue: "50",
    admin: {
      condition: (data) => data.overlay !== "none",
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
    name: "buttons",
    type: "array",
    fields: [
      {
        name: "label",
        type: "text",
        required: true,
      },
      {
        name: "link",
        type: "text",
        required: true,
      },
      {
        name: "variant",
        type: "select",
        options: [
          { label: "Primary", value: "primary" },
          { label: "Secondary", value: "secondary" },
          { label: "Outline", value: "outline" },
        ],
        defaultValue: "primary",
      },
    ],
  },
  {
    name: "height",
    type: "select",
    options: [
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
      {
        label: "Full Screen",
        value: "full",
      },
    ],
    defaultValue: "medium",
  },
]
