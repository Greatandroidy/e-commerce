import { CollectionConfig } from "payload";

export const Orders: CollectionConfig = {
    slug: 'orders',
    admin: {
      useAsTitle: 'orderNumber',
    },
    access: {
      read: () => true,
    },
    fields: [
      {
        name: 'orderNumber',
        type: 'text',
        required: true,
      },
      {
        name: 'orderDate',
        type: 'date',
        required: true,
      },
      {
        name: 'customer',
        type: 'relationship',
        relationTo: 'users',
        required: true,
      },
      {
        name: 'items',
        type: 'array',
        required: true,
        fields: [
          {
            name: 'product',
            type: 'relationship',
            relationTo: 'products',
            required: true,
          },
        ],
      },
      {
        name: 'total',
        type: 'number',
        required: true,
      }
    ]
}