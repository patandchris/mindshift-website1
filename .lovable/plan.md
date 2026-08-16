# MindShift Meta Landing Page (/mindshift-apply)

A new standalone, founder-led conversion page for cold Meta traffic. Nothing on the existing site changes: no edits to the homepage, existing pages, header/footer navigation, or live routes. The only shared file touched is the router, where one new route is added.

## Page structure

Campaign-only header (Pat & Chris / MindShift on the left, single "Apply for MindShift" CTA on the right — no site nav), then:

1. Hero — two columns on desktop, copy left, "HERO — REAL PAT & CHRIS PHOTO" placeholder right. Headline "Your life isn't bad. But you know you're capable of more." CTA "See If MindShift Is Right for You". Reassurance line, no price.
2. Identification — "You know what you should be doing…" plus six premium statement cards and the closing pattern line.
3. Pat's turning point + the shared decade — editorial long-form with a Pat photo placeholder, Chris's NLP/hypnosis training, the real-estate setbacks reframe, CTA scrolling to the mechanism.
4. The MindShift mechanism — four cards: Identify, Redefine, Reinforce, Act.
5. Haroldo proof — responsive 9:16 video placeholder labeled for replacement, pull-quote headline, truthful excerpt, attribution, grounded supporting story.
6. The 12-week journey — three phases (weeks 1–4, 5–8, 9–12) with themes and descriptions.
7. What clients receive — six feature cards including weekly check-ins and direct WhatsApp access.
8. Meet Pat & Chris — equal-weight founder profiles with two photo placeholders, "Two perspectives. One shared obsession.", combined closing statement.
9. Why MindShift exists — mission section with a Pat & Chris together placeholder.
10. Who it's for / not for — two columns plus the not-medical-treatment disclaimer.
11. Investment — calm $4,000 section, payment plans, what's included, limited capacity, application-first, CTA.
12. Application form — the exact basic details plus eight questions as specified.
13. Minimal campaign footer with copyright and the results-vary disclaimer.

A tasteful sticky bottom CTA appears on mobile after the hero scrolls out.

Note: the existing site footer links to /privacy and /terms, but those routes do not exist in the router today, so the campaign footer will not link to them (avoids sending cold traffic to a 404). Say the word if you'd like those pages created too.

## Application logic

Single-page form with client-side validation, submitted to a new backend table.

Qualified when all three hold: "yes" to full 12-week participation, commitment score 7 or higher, and financial answer 1, 2 or 3.

- Qualified → success state "Your application looks like it may be a good fit.", the not-a-free-coaching-session framing, then a clearly labeled Calendly embed placeholder (no invented URL).
- Not qualified (financial option 4, or "no" to participation, or score below 7) → respectful thank-you message, no calendar. The application is still stored for future nurturing.

## Technical notes

- New files: `src/pages/MindshiftApply.tsx` and section components under `src/components/mindshift-apply/`, plus a small `trackMetaEvent` helper. One line added to `src/App.tsx` for the route.
- Styling uses existing navy/gold semantic tokens from `index.css` and existing shadcn components. No design-system changes.
- Backend: new `mindshift_applications` table (contact fields, all answers, computed `qualified` boolean, timestamp) with RLS + grants — public insert allowed (anonymous applicants), no public read; reads restricted to service role/admin.
- Meta Pixel: a documented no-op-safe helper that fires PageView, ViewContent, Lead (submit), QualifiedLead (passes qualification). Schedule and Purchase are left as documented hooks, not fired, since Calendly and Stripe aren't wired yet. No Pixel ID invented.
- Photo/video placeholders are styled framed blocks with visible replacement labels — no stock, AI, or borrowed people imagery.
- Mobile-first: fluid type, no horizontal overflow, large tap targets and inputs, lazy-loaded below-the-fold media, semantic sections and labeled form controls.
