export const dummyProducts = [
  {
    _id: 'dummy-product-1',
    title: 'Sculpted Wool Coat',
    description: 'A sharply tailored wool coat with a soft brushed finish, designed for polished evenings and crisp mornings alike.',
    price: {
      amount: 18990,
      currency: 'INR'
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80'
      },
      {
        url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80'
      }
    ],
    seller: 'demo-seller-1',
    variants: [
      {
        _id: 'dummy-variant-1',
        images: [
          {
            url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80'
          }
        ],
        stock: 7,
        attributes: { Color: 'Charcoal', Size: 'M' },
        price: {
          amount: 18990,
          currency: 'INR'
        }
      }
    ]
  },
  {
    _id: 'dummy-product-2',
    title: 'Minimal Leather Tote',
    description: 'An everyday carry with a structured silhouette, premium calf leather, and hidden compartments for daily essentials.',
    price: {
      amount: 12990,
      currency: 'INR'
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80'
      },
      {
        url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80'
      }
    ],
    seller: 'demo-seller-2',
    variants: [
      {
        _id: 'dummy-variant-2',
        images: [
          {
            url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80'
          }
        ],
        stock: 12,
        attributes: { Color: 'Tan', Size: 'One Size' },
        price: {
          amount: 12990,
          currency: 'INR'
        }
      }
    ]
  },
  {
    _id: 'dummy-product-3',
    title: 'Studio Silk Shirt',
    description: 'Lightweight silk with a fluid drape, finished with a crisp collar and a subtle sheen that elevates everyday dressing.',
    price: {
      amount: 8990,
      currency: 'INR'
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80'
      },
      {
        url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80'
      }
    ],
    seller: 'demo-seller-3',
    variants: [
      {
        _id: 'dummy-variant-3',
        images: [
          {
            url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80'
          }
        ],
        stock: 9,
        attributes: { Color: 'Ivory', Size: 'L' },
        price: {
          amount: 8990,
          currency: 'INR'
        }
      }
    ]
  },
  {
    _id: 'dummy-product-4',
    title: 'Contour Ceramic Lamp',
    description: 'A sculptural lamp with a warm matte glaze and balanced brass base that brings calm architecture to any room.',
    price: {
      amount: 15990,
      currency: 'INR'
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80'
      },
      {
        url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80'
      }
    ],
    seller: 'demo-seller-4',
    variants: [
      {
        _id: 'dummy-variant-4',
        images: [
          {
            url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80'
          }
        ],
        stock: 4,
        attributes: { Color: 'Sand', Size: 'Standard' },
        price: {
          amount: 15990,
          currency: 'INR'
        }
      }
    ]
  }
]

export const getDummyProducts = () => dummyProducts.map((product) => ({ ...product }))

export const getDummyProductById = (id) => dummyProducts.find((product) => product._id === id)
