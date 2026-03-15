
# Standardize Text Colors: Remove All White Text

## Current Issue
The website has a mixture of three text colors:
- Gold (`text-accent`) - for headlines/emphasis
- White (`text-foreground`) - used inconsistently 
- Grey (`text-muted-foreground`) - for body text

## Goal
Standardize to only **two text colors**:
- **Gold** (`text-accent`) - headlines and emphasis
- **Grey** (`text-muted-foreground`) - all other text

## Files to Update

### 1. src/components/Hero.tsx
| Line | Current | Change To |
|------|---------|-----------|
| 41 | `text-foreground` | `text-muted-foreground` |

### 2. src/components/SuccessStories.tsx
| Line | Current | Change To |
|------|---------|-----------|
| 64 | `text-foreground` | `text-muted-foreground` |
| 110 | `text-foreground` | `text-muted-foreground` |

### 3. src/components/Header.tsx
| Line | Current | Change To |
|------|---------|-----------|
| 69 | `text-foreground` | `text-muted-foreground` |

### 4. src/components/Footer.tsx
| Line | Current | Change To |
|------|---------|-----------|
| 91 | `text-foreground` | `text-muted-foreground` |
| 103 | `text-foreground` | `text-muted-foreground` |
| 115 | `text-foreground` | `text-muted-foreground` |

### 5. src/components/AnimatedWeekCard.tsx
| Line | Current | Change To |
|------|---------|-----------|
| 50 | `text-foreground` | `text-muted-foreground` |

### 6. src/pages/CoachingProgram.tsx
| Line | Current | Change To |
|------|---------|-----------|
| 189 | `text-foreground` | `text-muted-foreground` |
| 193 | `text-foreground` | `text-muted-foreground` |

### 7. src/pages/Podcast.tsx
| Line | Current | Change To |
|------|---------|-----------|
| 125 | `text-foreground` | `text-muted-foreground` |

### 8. src/pages/WeekOneAccess.tsx
| Line | Current | Change To |
|------|---------|-----------|
| 185 | `text-foreground` | `text-muted-foreground` |
| 193 | `text-foreground` | `text-muted-foreground` |
| 246 | `text-foreground` | `text-muted-foreground` |
| 259 | `text-foreground` | `text-muted-foreground` |
| 276 | `text-foreground` | `text-muted-foreground` |
| 291 | `hover:text-foreground` | `hover:text-muted-foreground` |
| 301 | `text-foreground` | `text-muted-foreground` |
| 316 | `hover:text-foreground` | `hover:text-muted-foreground` |
| 359 | `hover:text-foreground` | `hover:text-muted-foreground` |

### 9. src/components/week1/AudioLessonCard.tsx
| Line | Current | Change To |
|------|---------|-----------|
| 164 | `hover:text-foreground` | `hover:text-muted-foreground` |
| 187 | `hover:text-foreground` | `hover:text-muted-foreground` |

### 10. src/pages/Auth.tsx
| Line | Current | Change To |
|------|---------|-----------|
| (if exists) | Any `text-foreground` | `text-muted-foreground` |

## Visual Result
After these changes:
- **Gold text** - Headlines, CTAs, emphasis, active navigation
- **Grey text** - Everything else (body copy, labels, descriptions, nav items, footer headers)

No more white text anywhere on the website.

## Technical Note
The CSS variable `--foreground` (white) will remain defined in index.css for potential future use and for UI component defaults, but we will explicitly override it to grey in all custom components.
