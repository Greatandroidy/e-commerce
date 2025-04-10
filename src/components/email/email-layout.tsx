import type * as React from "react"

interface EmailLayoutProps {
  children: React.ReactNode
  previewText?: string
  backgroundColor?: string
  textColor?: string
}

export function EmailLayout({
  children,
  previewText = "Email from AnimeFreak",
  backgroundColor = "#f9fafb",
  textColor = "#111827",
}: EmailLayoutProps) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>{previewText}</title>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: ${backgroundColor};
            color: ${textColor};
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: none;
            text-size-adjust: none;
            width: 100%;
          }
          
          .email-wrapper {
            width: 100%;
            margin: 0;
            padding: 0;
            background-color: ${backgroundColor};
          }
          
          .email-content {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          
          .email-body {
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            padding: 24px;
            margin-bottom: 24px;
          }
          
          .email-footer {
            text-align: center;
            font-size: 12px;
            color: #6b7280;
            padding: 0 24px 24px;
          }
          
          .email-footer p {
            margin: 4px 0;
          }
          
          .email-footer a {
            color: #6b7280;
            text-decoration: underline;
          }
          
          .button {
            display: inline-block;
            background-color: #a855f7;
            color: #ffffff !important;
            font-weight: 600;
            font-size: 14px;
            border-radius: 6px;
            text-decoration: none;
            text-align: center;
            padding: 10px 20px;
            margin: 16px 0;
          }
          
          .button-outline {
            display: inline-block;
            background-color: transparent;
            color: #a855f7 !important;
            font-weight: 600;
            font-size: 14px;
            border: 1px solid #a855f7;
            border-radius: 6px;
            text-decoration: none;
            text-align: center;
            padding: 10px 20px;
            margin: 16px 0;
          }
          
          .logo {
            text-align: center;
            margin-bottom: 24px;
          }
          
          .logo img {
            max-height: 40px;
          }
          
          h1, h2, h3, h4 {
            color: #111827;
            font-weight: 600;
            margin-top: 0;
          }
          
          p {
            font-size: 14px;
            line-height: 1.5;
            margin: 16px 0;
          }
          
          .divider {
            border-top: 1px solid #e5e7eb;
            margin: 24px 0;
          }
          
          .text-center {
            text-align: center;
          }
          
          .text-sm {
            font-size: 12px;
          }
          
          .text-muted {
            color: #6b7280;
          }
          
          @media only screen and (max-width: 600px) {
            .email-content {
              padding: 12px;
            }
            
            .email-body {
              padding: 16px;
            }
          }
        `,
          }}
        />
      </head>
      <body>
        <div className="email-wrapper">
          <div className="email-content">
            <div className="logo">
              <img src="https://animefreak.com/logo.png" alt="AnimeFreak" />
            </div>
            <div className="email-body">{children}</div>
            <div className="email-footer">
              <p>© {new Date().getFullYear()} AnimeFreak. All rights reserved.</p>
              <p>
                <a href="https://animefreak.com/privacy-policy">Privacy Policy</a> •
                <a href="https://animefreak.com/terms-conditions">Terms of Service</a>
              </p>
              <p>
                If you have any questions, contact us at{" "}
                <a href="mailto:support@animefreak.com">support@animefreak.com</a>
              </p>
              <div className="divider"></div>
              <p className="text-sm">
                You're receiving this email because you signed up for AnimeFreak.
                <br />
                If you'd like to unsubscribe, <a href="https://animefreak.com/unsubscribe">click here</a>.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
