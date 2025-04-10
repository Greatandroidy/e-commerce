import type { Field } from "payload"

export const richText: Field = {
  name: "content",
  type: "richText",
  admin: {
    elements: ["h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "link", "ol", "ul", "indent", "upload"],
    leaves: ["bold", "italic", "underline", "strikethrough", "code"],
    upload: {
      collections: {
        media: {
          fields: [
            {
              name: "alt",
              type: "text",
              required: true,
            },
          ],
        },
      },
    },
  },
}
