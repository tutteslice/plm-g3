
import { InstagramIcon, TikTokIcon, PinterestIcon } from './components/Icons';
import { SocialLink, ProductCategory, CategoryLinkInfo } from './types';

export const COLORS = {
  primary: '#FFFFFF',
  text: '#222222',
  accent: '#FF6B6B',
  secondaryAccent: '#F9F871',
  lightGray: '#F3F4F6',
  mediumGray: '#6B7280',
  darkGray: '#1F2937',
  error: '#EF4444',
  success: '#10B981',
};

export const APP_NAME = "Dopamine Threads";
export const TAGLINE = "Reach the peak, not the precinct.";
export const PROFESSIONAL_EMAIL = "hello@dopaminethreads.com"; // Replace with actual email
export const INSTAGRAM_LINK = "https://instagram.com/dopaminethreads"; // Replace
export const TIKTOK_LINK = "https://tiktok.com/@dopaminethreads"; // Replace
export const PINTEREST_LINK = "https://pinterest.com/dopaminethreads"; // Replace

export const SHIPPING_COST = 5;
export const FREE_SHIPPING_THRESHOLD = 75;

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'Instagram', url: INSTAGRAM_LINK, Icon: InstagramIcon },
  { name: 'TikTok', url: TIKTOK_LINK, Icon: TikTokIcon },
  { name: 'Pinterest', url: PINTEREST_LINK, Icon: PinterestIcon },
];

export const CATEGORY_LINKS_INFO: CategoryLinkInfo[] = [
  { 
    name: ProductCategory.DESIGNS, 
    path: `/shop/${encodeURIComponent(ProductCategory.DESIGNS)}`, 
    imageUrl: 'https://picsum.photos/seed/dopaminecat/800/600',
    description: 'Original clothing designs with hidden pockets for your essentials.'
  },
  { 
    name: ProductCategory.PRINTS, 
    path: `/shop/${encodeURIComponent(ProductCategory.PRINTS)}`, 
    imageUrl: 'https://picsum.photos/seed/printscat/800/600',
    description: 'Vibrant art prints to bring energy to your space.'
  },
  { 
    name: ProductCategory.SECOND_HAND, 
    path: `/shop/${encodeURIComponent(ProductCategory.SECOND_HAND)}`, 
    imageUrl: 'https://picsum.photos/seed/secondhandcat/800/600',
    description: 'Curated unique second-hand finds with a story.'
  },
];

export const LANDING_PAGE_INTRO = "Dopamine Threads is a celebration of color, creativity, and self-expression. We offer a curated collection of original art, clothing designs, and unique second-hand finds to help you build a wardrobe that feels like you. Our goal is to get you to the peak — not the precinct. That's why we sew hidden pockets onto all of our pieces where your rave essentials are securely hidden from curious eyes. This is drip for the dancefloor, stitched with care and rebellion. From the come-up to the comedown, we’ve got your back — so you can ride the wave, not catch a case.";

export const ABOUT_US_STORY = "Founded from a passion for the vibrant energy of rave culture and a desire for self-expression, Dopamine Threads was born. We believe that what you wear should be an extension of your joy, your creativity, and your unique vibe. Our pieces, whether original designs or carefully curated second-hand gems, are chosen to inspire confidence and freedom. The 'hidden pocket' concept isn't just a feature; it's a nod to the community, providing a smart way to keep your essentials safe so you can focus on the music and the moment. We're more than just a clothing brand; we're a celebration of individuality, art, and the connections we make on the dance floor. Join us in wearing your joy out loud.";

export const PRIVACY_POLICY_TEXT = `
Last updated: ${new Date().toLocaleDateString()}

Dopamine Threads ("us", "we", or "our") operates the Dopamine Threads website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.

Information Collection and Use
We collect several different types of information for various purposes to provide and improve our Service to you. This may include, but is not limited to, email address, first name and last name, cookies and usage data.

Use of Data
Dopamine Threads uses the collected data for various purposes:
- To provide and maintain the Service
- To notify you about changes to our Service
- To allow you to participate in interactive features of our Service when you choose to do so
- To provide customer care and support
- To provide analysis or valuable information so that we can improve the Service
- To monitor the usage of the Service
- To detect, prevent and address technical issues

Security of Data
The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.

Changes to This Privacy Policy
We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.

Contact Us
If you have any questions about this Privacy Policy, please contact us at ${PROFESSIONAL_EMAIL}.
`;

export const RETURNS_POLICY_TEXT = `
Shipping
All orders are processed within 2-3 business days. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery. If there will be a significant delay in shipment of your order, we will contact you via email.
Shipping charges for your order will be calculated and displayed at checkout. Our standard flat rate shipping is $${SHIPPING_COST}. We offer free shipping for all orders over $${FREE_SHIPPING_THRESHOLD}.

Returns Policy
We want you to love your Dopamine Threads pieces! If you're not completely satisfied with your purchase, we're here to help.
- You have 30 calendar days to return an item from the date you received it.
- To be eligible for a return, your item must be unused and in the same condition that you received it. Your item must be in the original packaging.
- Your item needs to have the receipt or proof of purchase.

Refunds
Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item.
If your return is approved, we will initiate a refund to your original method of payment. You will receive the credit within a certain amount of days, depending on your card issuer's policies.

Non-returnable items:
- Gift cards
- Sale items (if marked as final sale)
- Custom-made products

Contact Us
If you have any questions on how to return your item to us, contact us at ${PROFESSIONAL_EMAIL}.
`;

    