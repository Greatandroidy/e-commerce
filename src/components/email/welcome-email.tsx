import { EmailLayout } from "./email-layout"

interface WelcomeEmailProps {
  name: string
  verifyUrl: string
}

export function WelcomeEmail({ name, verifyUrl }: WelcomeEmailProps) {
  return (
    <EmailLayout previewText="Welcome to AnimeFreak!">
      <h1>Welcome to AnimeFreak, {name}!</h1>
      <p>Thank you for joining our community of anime fashion enthusiasts. We're excited to have you on board!</p>
      <p>To get started, please verify your email address by clicking the button below:</p>
      <div className="text-center">
        <a href={verifyUrl} className="button">
          Verify Email Address
        </a>
      </div>
      <p>If the button doesn't work, you can also copy and paste the following link into your browser:</p>
      <p className="text-sm text-muted">
        <a href={verifyUrl}>{verifyUrl}</a>
      </p>
      <div className="divider"></div>
      <h3>What's next?</h3>
      <p>Once your email is verified, you can:</p>
      <ul>
        <li>Browse our exclusive anime-inspired collections</li>
        <li>Create a wishlist of your favorite items</li>
        <li>Enjoy special discounts and promotions</li>
        <li>Track your orders and shipping status</li>
      </ul>
      <p>If you have any questions or need assistance, our support team is always ready to help.</p>
      <p>
        Happy shopping!
        <br />
        The AnimeFreak Team
      </p>
    </EmailLayout>
  )
}
