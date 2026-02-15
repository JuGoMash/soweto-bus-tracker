

# MyBusApp — "Turning Emotion into Information" 🚌

## Overview
A bold, vibrant bus tracking app for PUTCO commuters and drivers in Soweto/Johannesburg. Three interfaces: **Commuter** (public, no login), **Driver** (invite-only login), and **Admin** (separate web dashboard). Built as a React frontend with mock data, ready to connect to a Django backend later.

---

## Phase 1: Commuter Experience (No Auth)

### Landing / Role Selection Screen
- App opens with a bold branded splash: **MyBusApp** logo, tagline "Turning Emotion into Information"
- Two large buttons: **"I'm a Commuter"** and **"I'm a Driver"**
- Commuter selection goes straight to the commuter dashboard — no login required

### Commuter Dashboard
- **Interactive map** centered on Soweto/Johannesburg showing PUTCO bus routes, stops, and mock live bus positions
- **Route list** with search — toggle between map and list views
- Mock PUTCO routes with real Soweto areas:
  - **Route 1**: Meadowlands → Johannesburg CBD
  - **Route 2**: Diepkloof → Johannesburg CBD
  - **Route 3**: Dobsonville → Randburg
  - **Route 4**: Protea Glen → Midrand
  - **Route 5**: Orlando → Johannesburg CBD
  - **Route 6**: Pimville → Sandton
- Each route shows: stops along the way, estimated arrival times (mock), bus name/number
- **"Fill My Bus Tag"** button shown as "Coming Soon" with a teaser tooltip
- Bold, vibrant color palette — township-inspired warm tones (orange, gold, deep blue)

---

## Phase 2: Driver Portal (Invite-Only Auth)

### Driver Login
- Phone number + PIN login (no OTP for now)
- Only pre-invited phone numbers can sign in
- Error message for uninvited numbers: "Your number hasn't been invited yet. Contact your admin."

### Driver Dashboard (Mock Data)
- **My Route Today**: shows assigned route, stops, and schedule
- **Start/Stop Trip** toggle button (mock functionality)
- **Trip History**: list of past trips with dates and routes
- Simple, driver-friendly UI — large buttons, easy to read while glancing

---

## Phase 3: Admin Dashboard (Separate Web Interface)

### Admin Login
- Username/password login (super admin credentials hardcoded or from backend)

### Admin Features
- **Invite Drivers**: enter phone number + name → generates invitation
- **View All Buses**: list of PUTCO buses with names, registration, status
- **Manage Routes & Stops**: CRUD for routes, add/remove/reorder stops on each route
- **Driver-Route Allocation**: assign drivers to specific routes/schedules, view current allocations
- **Driver List**: view all invited/active drivers, their assigned routes, and status
- Data tables with search and filters

---

## Design & UX
- **Bold & vibrant** palette: warm oranges, golds, deep blues — energetic township-inspired feel
- Mobile-first for commuter & driver views
- Desktop-optimized for admin dashboard
- Leaflet/OpenStreetMap for the interactive map (free, no API key needed)
- All data is mock/hardcoded, structured so it's easy to swap in Django API calls later

