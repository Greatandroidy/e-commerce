import type { Metadata } from "next"
import Link from "next/link"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Privacy Policy | AnimeFreak",
  description: "Learn about how we collect, use, and protect your personal information.",
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="container px-4 py-8 md:px-6 md:py-10">
        <Card className="bg-background/80 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-3xl">Privacy Policy</CardTitle>
            <CardDescription>Last updated: April 9, 2023</CardDescription>
          </CardHeader>
          <CardContent className="prose prose-sm sm:prose max-w-none dark:prose-invert">
            <p>
              At AnimeFreak, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose,
              and safeguard your information when you visit our website or make a purchase.
            </p>

            <h2>Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when you register for an account, make a purchase,
              sign up for our newsletter, or otherwise communicate with us. This information may include:
            </p>
            <ul>
              <li>Personal identifiers (name, email address, postal address, phone number)</li>
              <li>Account credentials (username, password)</li>
              <li>Payment information (credit card details, billing address)</li>
              <li>Purchase history and preferences</li>
              <li>Communications with our customer service team</li>
            </ul>

            <p>
              We also automatically collect certain information about your device and how you interact with our website,
              including:
            </p>
            <ul>
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage data (pages visited, time spent on site, referring URLs)</li>
              <li>Location information</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process and fulfill your orders</li>
              <li>Manage your account and provide customer support</li>
              <li>Send transactional emails and order updates</li>
              <li>Personalize your shopping experience</li>
              <li>Send marketing communications (if you've opted in)</li>
              <li>Improve our website and services</li>
              <li>Detect and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>Sharing Your Information</h2>
            <p>We may share your information with:</p>
            <ul>
              <li>Service providers (payment processors, shipping companies, marketing partners)</li>
              <li>Business partners (when necessary to provide services you've requested)</li>
              <li>Legal authorities (when required by law or to protect our rights)</li>
            </ul>
            <p>We do not sell your personal information to third parties for their marketing purposes.</p>

            <h2>Your Rights and Choices</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul>
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your information</li>
              <li>Restriction of processing</li>
              <li>Data portability</li>
              <li>Objection to processing</li>
            </ul>
            <p>
              To exercise these rights, please contact us at{" "}
              <a href="mailto:privacy@animefreak.com">privacy@animefreak.com</a>.
            </p>

            <h2>Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and
              personalize content. You can manage your cookie preferences through your browser settings.
            </p>
            <p>
              For more information about our use of cookies, please see our{" "}
              <Link href="/cookie-policy">Cookie Policy</Link>.
            </p>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized access, loss, or alteration. However, no method of transmission over the Internet or
              electronic storage is 100% secure, so we cannot guarantee absolute security.
            </p>

            <h2>International Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your country of residence.
              These countries may have different data protection laws. We ensure appropriate safeguards are in place to
              protect your information when transferred internationally.
            </p>

            <h2>Children's Privacy</h2>
            <p>
              Our website is not intended for children under 16 years of age. We do not knowingly collect personal
              information from children under 16. If you are a parent or guardian and believe your child has provided us
              with personal information, please contact us.
            </p>

            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The updated version will be indicated by an updated
              "Last Updated" date. We encourage you to review this Privacy Policy periodically.
            </p>

            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p>
              Email: <a href="mailto:privacy@animefreak.com">privacy@animefreak.com</a>
              <br />
              Address: 123 Anime Street, Tokyo, Japan 100-0001
              <br />
              Phone: +1 (800) 123-4567
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  )
}
