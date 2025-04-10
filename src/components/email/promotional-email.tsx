import { EmailLayout } from "./email-layout"

interface PromotionalEmailProps {
  name: string
  title: string
  bannerImage: string
  bannerAlt?: string
  content: string
  promoCode?: {
    code: string
    discount: string
    expiryDate: string
  }
  ctaText: string
  ctaUrl: string
}

export function PromotionalEmail({
  name,
  title,
  bannerImage,
  bannerAlt = "Promotional banner",
  content,
  promoCode,
  ctaText,
  ctaUrl,
}: PromotionalEmailProps) {
  return (
    <EmailLayout previewText={title}>
      <div style={{ margin: "-24px -24px 24px -24px" }}>
        <img
          src={bannerImage || "/placeholder.svg"}
          alt={bannerAlt}
          style={{
            width: "100%",
            maxWidth: "100%",
            height: "auto",
            display: "block",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
        />
      </div>

      <h1>{title}</h1>
      <p>Hello {name},</p>
      <div dangerouslySetInnerHTML={{ __html: content }} />

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
          <p style={{ margin: "0 0 12px 0" }}>Use the code below to get {promoCode.discount} off your purchase:</p>
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
