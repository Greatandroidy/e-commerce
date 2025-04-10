import { EmailLayout } from "./email-layout"

interface ProductRestockEmailProps {
  name: string
  productName: string
  productImage: string
  productUrl: string
  price: number
  discount?: number
}

export function ProductRestockEmail({
  name,
  productName,
  productImage,
  productUrl,
  price,
  discount,
}: ProductRestockEmailProps) {
  return (
    <EmailLayout previewText={`${productName} is back in stock!`}>
      <h1>Back in Stock Alert!</h1>
      <p>Hello {name},</p>
      <p>Good news! An item on your wishlist is back in stock and ready to order.</p>

      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={productImage || "/placeholder.svg"}
            alt={productName}
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "4px",
              marginRight: "16px",
            }}
          />
          <div>
            <h3 style={{ margin: "0 0 8px 0" }}>{productName}</h3>
            <div>
              {discount ? (
                <div>
                  <span style={{ fontWeight: "600", color: "#ef4444", fontSize: "18px" }}>
                    ${(price * (1 - discount / 100)).toFixed(2)}
                  </span>
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "#6b7280",
                      fontSize: "14px",
                      marginLeft: "8px",
                    }}
                  >
                    ${price.toFixed(2)}
                  </span>
                </div>
              ) : (
                <div style={{ fontWeight: "600", fontSize: "18px" }}>${price.toFixed(2)}</div>
              )}
            </div>
          </div>
        </div>
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <a href={productUrl} className="button">
            View Product
          </a>
        </div>
      </div>

      <p>Don't wait too long - popular items sell out quickly!</p>

      <p>
        Happy shopping!
        <br />
        The AnimeFreak Team
      </p>
    </EmailLayout>
  )
}
