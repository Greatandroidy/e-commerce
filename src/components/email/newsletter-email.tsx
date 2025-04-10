import { EmailLayout } from "./email-layout"

interface Product {
  name: string
  price: number
  image: string
  url: string
  discount?: number
}

interface NewsletterEmailProps {
  previewText?: string
  headline: string
  intro: string
  featuredProducts: Product[]
  promoCode?: {
    code: string
    discount: string
    expiryDate: string
  }
  ctaText?: string
  ctaUrl?: string
}

export function NewsletterEmail({
  previewText = "Check out our latest products and offers!",
  headline,
  intro,
  featuredProducts,
  promoCode,
  ctaText = "Shop Now",
  ctaUrl = "https://animefreak.com/shop",
}: NewsletterEmailProps) {
  return (
    <EmailLayout previewText={previewText}>
      <h1>{headline}</h1>
      <p>{intro}</p>

      {featuredProducts.length > 0 && (
        <>
          <h3>Featured Products</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {featuredProducts.map((product, index) => (
                <tr key={index}>
                  <td
                    style={{
                      padding: "12px 0",
                      borderBottom: index < featuredProducts.length - 1 ? "1px solid #e5e7eb" : "none",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <a href={product.url} style={{ textDecoration: "none", color: "inherit" }}>
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                            borderRadius: "4px",
                            marginRight: "16px",
                          }}
                        />
                      </a>
                      <div>
                        <a href={product.url} style={{ textDecoration: "none", color: "inherit" }}>
                          <div style={{ fontWeight: "500", fontSize: "16px" }}>{product.name}</div>
                        </a>
                        <div style={{ marginTop: "4px" }}>
                          {product.discount ? (
                            <div>
                              <span style={{ fontWeight: "600", color: "#ef4444" }}>
                                ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                              </span>
                              <span
                                style={{
                                  textDecoration: "line-through",
                                  color: "#6b7280",
                                  fontSize: "12px",
                                  marginLeft: "8px",
                                }}
                              >
                                ${product.price.toFixed(2)}
                              </span>
                            </div>
                          ) : (
                            <div style={{ fontWeight: "600" }}>${product.price.toFixed(2)}</div>
                          )}
                        </div>
                        <div style={{ marginTop: "8px" }}>
                          <a
                            href={product.url}
                            style={{
                              display: "inline-block",
                              backgroundColor: "#a855f7",
                              color: "#ffffff",
                              fontWeight: "500",
                              fontSize: "12px",
                              borderRadius: "4px",
                              padding: "4px 8px",
                              textDecoration: "none",
                            }}
                          >
                            View Product
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {promoCode && (
        <div
          style={{
            margin: "24px 0",
            backgroundColor: "#f3f4f6",
            borderRadius: "6px",
            padding: "16px",
            textAlign: "center",
          }}
        >
          <h3 style={{ margin: "0 0 8px 0" }}>Special Offer</h3>
          <p style={{ margin: "0 0 12px 0" }}>Use the code below to get {promoCode.discount} off your next purchase:</p>
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px dashed #d1d5db",
              borderRadius: "4px",
              padding: "8px 12px",
              fontWeight: "600",
              letterSpacing: "1px",
              display: "inline-block",
            }}
          >
            {promoCode.code}
          </div>
          <p style={{ margin: "12px 0 0 0", fontSize: "12px", color: "#6b7280" }}>Expires on {promoCode.expiryDate}</p>
        </div>
      )}

      <div className="text-center" style={{ margin: "24px 0" }}>
        <a href={ctaUrl} className="button">
          {ctaText}
        </a>
      </div>

      <p>
        Happy shopping!
        <br />
        The AnimeFreak Team
      </p>
    </EmailLayout>
  )
}
