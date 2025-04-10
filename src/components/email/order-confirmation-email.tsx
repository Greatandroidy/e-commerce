import { EmailLayout } from "./email-layout"

interface OrderItem {
  name: string
  quantity: number
  price: number
  image: string
  size?: string
  color?: string
}

interface OrderConfirmationEmailProps {
  name: string
  orderNumber: string
  orderDate: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  shippingAddress: {
    line1: string
    line2?: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  trackingUrl?: string
}

export function OrderConfirmationEmail({
  name,
  orderNumber,
  orderDate,
  items,
  subtotal,
  shipping,
  tax,
  total,
  shippingAddress,
  trackingUrl,
}: OrderConfirmationEmailProps) {
  return (
    <EmailLayout previewText={`Order Confirmation #${orderNumber}`}>
      <h1>Thank You for Your Order!</h1>
      <p>Hello {name},</p>
      <p>Your order has been received and is being processed. We'll send you another email when your order ships.</p>

      <div
        style={{
          backgroundColor: "#f3f4f6",
          borderRadius: "6px",
          padding: "12px",
          marginBottom: "24px",
        }}
      >
        <h3 style={{ margin: "0 0 8px 0" }}>Order Summary</h3>
        <p style={{ margin: "4px 0", fontSize: "13px" }}>
          <strong>Order Number:</strong> {orderNumber}
          <br />
          <strong>Order Date:</strong> {orderDate}
        </p>
        {trackingUrl && (
          <div style={{ marginTop: "12px" }}>
            <a href={trackingUrl} className="button-outline" style={{ margin: "0" }}>
              Track Your Order
            </a>
          </div>
        )}
      </div>

      <h3>Items Ordered</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "8px 0", borderBottom: "1px solid #e5e7eb" }}>Item</th>
            <th style={{ textAlign: "center", padding: "8px 0", borderBottom: "1px solid #e5e7eb" }}>Qty</th>
            <th style={{ textAlign: "right", padding: "8px 0", borderBottom: "1px solid #e5e7eb" }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td style={{ padding: "12px 0", borderBottom: "1px solid #e5e7eb" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    style={{
                      width: "48px",
                      height: "48px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      marginRight: "12px",
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: "500" }}>{item.name}</div>
                    {(item.size || item.color) && (
                      <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
                        {item.size && `Size: ${item.size}`}
                        {item.size && item.color && " • "}
                        {item.color && `Color: ${item.color}`}
                      </div>
                    )}
                  </div>
                </div>
              </td>
              <td style={{ textAlign: "center", padding: "12px 0", borderBottom: "1px solid #e5e7eb" }}>
                {item.quantity}
              </td>
              <td style={{ textAlign: "right", padding: "12px 0", borderBottom: "1px solid #e5e7eb" }}>
                ${(item.price * item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table style={{ width: "100%", marginTop: "24px" }}>
        <tbody>
          <tr>
            <td style={{ textAlign: "right", padding: "4px 0" }}>Subtotal:</td>
            <td style={{ textAlign: "right", padding: "4px 0", width: "80px" }}>${subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td style={{ textAlign: "right", padding: "4px 0" }}>Shipping:</td>
            <td style={{ textAlign: "right", padding: "4px 0" }}>${shipping.toFixed(2)}</td>
          </tr>
          <tr>
            <td style={{ textAlign: "right", padding: "4px 0" }}>Tax:</td>
            <td style={{ textAlign: "right", padding: "4px 0" }}>${tax.toFixed(2)}</td>
          </tr>
          <tr>
            <td style={{ textAlign: "right", padding: "8px 0", fontWeight: "600", borderTop: "1px solid #e5e7eb" }}>
              Total:
            </td>
            <td style={{ textAlign: "right", padding: "8px 0", fontWeight: "600", borderTop: "1px solid #e5e7eb" }}>
              ${total.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="divider"></div>

      <h3>Shipping Address</h3>
      <p style={{ margin: "8px 0" }}>
        {shippingAddress.line1}
        <br />
        {shippingAddress.line2 && (
          <>
            {shippingAddress.line2}
            <br />
          </>
        )}
        {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}
        <br />
        {shippingAddress.country}
      </p>

      <div className="divider"></div>

      <p>
        If you have any questions about your order, please contact our customer service team at{" "}
        <a href="mailto:support@animefreak.com">support@animefreak.com</a> or call us at (555) 123-4567.
      </p>

      <p>
        Thank you for shopping with AnimeFreak!
        <br />
        The AnimeFreak Team
      </p>
    </EmailLayout>
  )
}
