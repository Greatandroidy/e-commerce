import { EmailLayout } from "./email-layout"

interface PasswordResetEmailProps {
  name: string
  resetUrl: string
}

export function PasswordResetEmail({ name, resetUrl }: PasswordResetEmailProps) {
  return (
    <EmailLayout previewText="Reset your AnimeFreak password">
      <h1>Reset Your Password</h1>
      <p>Hello {name},</p>
      <p>
        We received a request to reset your password for your AnimeFreak account. If you didn't make this request, you
        can safely ignore this email.
      </p>
      <p>To reset your password, click the button below:</p>
      <div className="text-center">
        <a href={resetUrl} className="button">
          Reset Password
        </a>
      </div>
      <p>This link will expire in 15 minutes. If you need a new link, you can request another password reset.</p>
      <p className="text-sm text-muted">
        If the button doesn't work, you can copy and paste this link into your browser:
        <br />
        <a href={resetUrl}>{resetUrl}</a>
      </p>
      <div className="divider"></div>
      <p>
        If you didn't request a password reset, please contact our support team immediately at{" "}
        <a href="mailto:support@animefreak.com">support@animefreak.com</a>.
      </p>
      <p>
        Best regards,
        <br />
        The AnimeFreak Security Team
      </p>
    </EmailLayout>
  )
}
