
## What’s happening (root cause)
- The button label color is being set to `text-primary`.
- In your design system, `primary` is the **gold** color (`--primary: 44 75% 32%`), not the dark navy.
- Since the button background is also gold (`bg-accent`), the label ends up looking gold-on-gold (nearly invisible), which matches what you’re seeing.

In the rest of the site, the “standard dark blue” button text is achieved with **`text-background`** (because `--background` is your dark navy).

## Implementation approach (so it stays fixed)
### A) Fix the button variant itself (preferred)
Because `variant="premium"` is only used on `/week-one-offer`, we can safely update it to be the “standard gold button with navy text” by default:
- Update `src/components/ui/button.tsx`:
  - Change `premium` variant from:
    - `bg-accent text-accent-foreground ...`
  - To:
    - `bg-accent text-background font-bold`
  - Also remove “effects” from this variant (border/hover styling) so it’s a clean, solid gold button as requested earlier.

This prevents future regressions where a page accidentally uses the wrong text color again.

### B) Remove the incorrect overrides on the page
Update `src/pages/WeekOneOffer.tsx`:
- Remove `text-primary` from **both** buttons.
- Keep only layout classes like `mb-4` if needed.

After A + B, both buttons will consistently render as:
- Gold background
- Dark navy text (standard)

## Files to change
1) `src/components/ui/button.tsx`
- Update `premium` variant to use `text-background` and remove effects.

2) `src/pages/WeekOneOffer.tsx`
- Remove `className="... text-primary"` from both premium buttons (top + bottom).

## Verification checklist (what you’ll see after)
- Both “Start Week One Now” buttons show clearly readable **dark navy** text.
- Buttons are solid gold with no glow/gradient/extra styling.
- No other site buttons change unexpectedly (since `premium` is only used on this page).

## Notes (technical)
- `text-background` maps to `hsl(var(--background))` which is your navy: `225 44% 14%`.
- This is already the pattern used elsewhere (Hero, Coaching, Podcast buttons).
