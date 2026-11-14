# PaniGo - Karachi Water Tanker Booking and Tracking System

OOP Project (BS Computer Science, 2nd Semester, Section B). Option 2: Solve a Real-World Problem.
Submitted to: Sir Mohsin Ali Solangi.

**Team:** Rabia Abdul Aziz (B2631084), Prishey Khan (B2631083), Nayab Sajid (B2631079), Shakeela (B2631096)

## Live links (after enabling GitHub Pages)
- Portfolio website: `https://YOUR-USERNAME.github.io/YOUR-REPO/`
- Working app: `https://YOUR-USERNAME.github.io/YOUR-REPO/app/`

## What is in this repository
| Path | Content |
|---|---|
| `src/` | React source code. `src/models` is the OOP layer, `src/components` are the screens |
| `docs/index.html` | Portfolio website (GitHub Pages) |
| `docs/app/index.html` | Ready-to-open working app (no install needed) |
| `docs/Approved-Proposal.pdf` | Approved project proposal with instructor signature |
| `docs/PaniGo-Presentation.pptx` | Project presentation |
| `DEMO_SCRIPT.md` | Demo script for the presentation |

## Problem and solution
Many areas of Karachi depend on private water tankers booked by phone: no fixed price, no tracking, no records. PaniGo lets a resident book a tanker in 3 steps with a clear price, a dispatcher assign a driver, and the driver mark delivery. It works in English and Urdu.

## OOP concepts
| Concept | Where |
|---|---|
| Abstraction | `User` and `Tanker` are abstract classes |
| Encapsulation | Private `#status` and `#driver` in `Booking`; changed only by `assign()`, `deliver()`, `cancel()` |
| Inheritance | `Resident`, `Admin`, `Driver` extend `User`; `SmallTanker`, `LargeTanker` extend `Tanker` |
| Polymorphism | `LargeTanker.getPrice()` adds a long-distance charge; same call, different result |

## Run the React project
1. Install Node.js LTS (18 or newer).
2. `npm install`
3. `npm run dev`, then open the link shown (usually http://localhost:5173).

Or just open `docs/app/index.html` in a browser.

## Team work division
| Member | Part |
|---|---|
| Rabia Abdul Aziz | React user interface and screens |
| Prishey Khan | OOP model classes (User, Tanker, Booking) |
| Nayab Sajid | State handling, logic and testing |
| Shakeela | Documentation, presentation and demo preparation |
