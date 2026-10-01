# Morrow Objects

A responsive storefront prototype for a fictional, small-batch home-goods brand. The working brief assumes sustainable ceramics, textiles, and everyday home goods for design-conscious shoppers, with prices from $42 to $168. Product claims, policies, prices, reviews, and maker details are illustrative and must be verified before launch.

## Run

Open `index.html` directly in a browser. No build step is required. Product images and typefaces load from Unsplash and Google Fonts, so those assets need an internet connection. The bag persists in local browser storage. Checkout and newsletter signup are front-end demonstrations, not connected services.

## Store Structure

- Main navigation: Shop all, Ceramics, Textiles, Our point of view.
- Collection taxonomy: Ceramics; Textiles; Home goods. Add maker and material filters when the live assortment supports them.
- Footer: shipping, returns, care, contact, materials and makers, privacy, and terms.
- Homepage flow: brand promise and editorial image, making principles, shoppable collection, maker story, newsletter capture.
- Product detail flow: product title and short description, reviews, price, finish selection, benefit-led specifications, add to bag, delivery/returns reassurance, and objection-handling answers.

## Conversion and Retention

- Keep the product title, price, finish, review proof, and add-to-bag action together in the detail view. Add dimensions, care, material provenance, and a clear delivery estimate before connecting a real catalog.
- Show the $100 free-shipping threshold in the announcement bar and update the cart progress message as the subtotal changes.
- Keep returns visible beside the purchase action and repeat the policy in the footer. Replace the prototype's 30-day and two-business-day assumptions with the actual operating policy.
- After purchase, send an order confirmation, delivery updates, a product-care note, and a review request. Invite a second purchase through maker stories or complementary collections, not artificial urgency.
- Measure collection click-through, product-detail opens, add-to-bag rate, checkout starts, completed purchase, email signup, and repeat purchase.

## Production Stack Recommendation

- **Commerce and inventory:** Shopify for product catalog, variants, stock by location, checkout, payments, and order status. Use Shopify Flow for low-stock alerts once inventory volume warrants it.
- **Email and SMS:** Klaviyo for consent-aware signup, welcome flow, abandoned checkout, post-purchase care, and replenishment or collection announcements. Keep email and SMS consent explicit and separate.
- **Reviews and UGC:** Judge.me for a lean launch; consider Okendo if richer customer attributes and UGC workflows become important. Request verified-purchase reviews after delivery.
- **Analytics:** Shopify analytics plus GA4 through Shopify Customer Events. Add ad pixels only through a consent-aware integration and verify events to avoid duplicate purchase reporting.
- **Search and operations:** Google Search Console for indexing; Shopify Shipping or the chosen fulfillment partner for live delivery rates and tracking. Keep a documented returns and damage workflow.

## Before Launch

Replace sample products, imagery, prices, ratings, and sustainability statements with substantiated catalog data. Connect the real email provider, review widget, payment and fulfillment services, consent manager, and analytics. Test keyboard and mobile checkout, tax and shipping rules, inventory changes, confirmation emails, returns, and analytics events end to end.