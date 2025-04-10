import type { Metadata } from "next"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Terms and Conditions | AnimeFreak",
  description: "Read our terms and conditions for using the AnimeFreak website and services.",
}

export default function TermsConditionsPage() {
  return (
    <>
      <Header />
      <main className="container px-4 py-8 md:px-6 md:py-10">
        <Card className="bg-background/80 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-3xl">Terms and Conditions</CardTitle>
            <CardDescription>Last updated: April 9, 2023</CardDescription>
          </CardHeader>
          <CardContent className="prose prose-sm sm:prose max-w-none dark:prose-invert">
            <p>
              Welcome to AnimeFreak. These Terms and Conditions govern your use of our website and services. By
              accessing or using our website, you agree to be bound by these Terms.
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using our website, you agree to these Terms and Conditions and our Privacy Policy. If you
              do not agree to these Terms, please do not use our website.
            </p>

            <h2>2. Changes to Terms</h2>
            <p>
              We may revise these Terms at any time by updating this page. You are expected to check this page from time
              to time to take notice of any changes we made, as they are binding on you.
            </p>

            <h2>3. Account Registration</h2>
            <p>
              To access certain features of our website, you may need to create an account. You are responsible for
              maintaining the confidentiality of your account information and for all activities that occur under your
              account.
            </p>
            <p>
              You agree to provide accurate and complete information when creating an account and to update your
              information to keep it accurate and current.
            </p>

            <h2>4. Products and Purchases</h2>
            <p>
              All products are subject to availability. We reserve the right to discontinue any product at any time.
            </p>
            <p>
              Prices for our products are subject to change without notice. We reserve the right to modify or
              discontinue the Service without notice at any time.
            </p>
            <p>
              We shall not be liable to you or to any third-party for any modification, price change, suspension, or
              discontinuance of the Service.
            </p>

            <h2>5. Order Acceptance and Fulfillment</h2>
            <p>
              Your receipt of an electronic or other form of order confirmation does not signify our acceptance of your
              order, nor does it constitute confirmation of our offer to sell.
            </p>
            <p>
              We reserve the right at any time after receipt of your order to accept or decline your order for any
              reason.
            </p>
            <p>We reserve the right to limit the quantities of any products or services that we offer.</p>

            <h2>6. Shipping and Delivery</h2>
            <p>
              We will make every effort to ship products within the estimated timeframes, but we do not guarantee
              delivery times.
            </p>
            <p>
              You are responsible for providing accurate shipping information. We are not liable for shipping delays or
              failures due to incorrect or incomplete shipping information.
            </p>

            <h2>7. Returns and Refunds</h2>
            <p>Please review our Return Policy for information about returns, refunds, and exchanges.</p>

            <h2>8. Intellectual Property</h2>
            <p>
              All content on our website, including text, graphics, logos, images, and software, is the property of
              AnimeFreak or its content suppliers and is protected by international copyright laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform,
              republish, download, store, or transmit any of the material on our website without our express written
              permission.
            </p>

            <h2>9. User Content</h2>
            <p>
              By posting, uploading, or submitting any content to our website, you grant us a non-exclusive,
              royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt,
              publish, translate, create derivative works from, distribute, and display such content throughout the
              world in any media.
            </p>
            <p>
              You represent and warrant that you own or control all rights to the content you submit, that the content
              is accurate, and that use of the content does not violate these Terms and will not cause injury to any
              person or entity.
            </p>

            <h2>10. Prohibited Activities</h2>
            <p>
              You may not use our website for any illegal or unauthorized purpose. You must not, in the use of the
              Service, violate any laws in your jurisdiction.
            </p>
            <p>You agree not to:</p>
            <ul>
              <li>Use our website in any way that could disable, overburden, damage, or impair the site</li>
              <li>Use any robot, spider, or other automatic device to access our website</li>
              <li>Introduce any viruses, trojan horses, worms, or other harmful material</li>
              <li>Attempt to gain unauthorized access to our website or computer systems</li>
              <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of our website</li>
            </ul>

            <h2>11. Disclaimer of Warranties</h2>
            <p>
              Our website and all products and services are provided "as is" and "as available" without any warranties
              of any kind, either express or implied.
            </p>
            <p>We do not guarantee that our website will be secure or free from bugs or viruses.</p>

            <h2>12. Limitation of Liability</h2>
            <p>
              In no event shall AnimeFreak, its officers, directors, employees, or agents, be liable to you for any
              direct, indirect, incidental, special, punitive, or consequential damages whatsoever resulting from any
              (i) errors, mistakes, or inaccuracies of content; (ii) personal injury or property damage related to your
              use of our website; (iii) any unauthorized access to or use of our servers and/or any personal information
              stored therein; (iv) any interruption or cessation of transmission to or from our website; (v) any bugs,
              viruses, trojan horses, or the like, which may be transmitted to or through our website by any third
              party; and/or (vi) any errors or omissions in any content or for any loss or damage of any kind incurred
              as a result of your use of any content posted, emailed, transmitted, or otherwise made available via our
              website.
            </p>

            <h2>13. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless AnimeFreak, its officers, directors, employees, and
              agents, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and
              expenses arising from your use of and access to our website.
            </p>

            <h2>14. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of Japan, without regard to its
              conflict of law provisions.
            </p>

            <h2>15. Dispute Resolution</h2>
            <p>
              Any dispute arising out of or relating to these Terms shall be resolved through binding arbitration in
              Tokyo, Japan.
            </p>

            <h2>16. Severability</h2>
            <p>
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall
              remain in full force and effect.
            </p>

            <h2>17. Entire Agreement</h2>
            <p>
              These Terms, together with our Privacy Policy and any other legal notices published by us on the website,
              constitute the entire agreement between you and AnimeFreak concerning your use of our website.
            </p>

            <h2>18. Contact Information</h2>
            <p>If you have any questions about these Terms, please contact us at:</p>
            <p>
              Email: <a href="mailto:legal@animefreak.com">legal@animefreak.com</a>
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
