
# Color Consistency Fix

## What I'll Change
Update the text color for two headings in the hero section to match the "During week 1" heading style.

## Changes

**File: `src/pages/WeekOneOffer.tsx`**

| Line | Current | New |
|------|---------|-----|
| 53 | `text-foreground` | `text-muted-foreground` |
| 57 | `text-foreground` | `text-muted-foreground` |

This will change:
- "FOR A LIMITED TIME ONLY !!" → from bright white to muted grey
- "ABSOLUTELY FREE!!" → from bright white to muted grey

Both will now match the color of "During week 1, you will begin the process of:"

## Visual Result
All three headings will share the same muted grey color (`text-muted-foreground`), while "GET WEEK 1 OF THE MINDSHIFT SYSTEM 12 WEEK PROGRAM" remains gold (`text-accent`) for emphasis.
