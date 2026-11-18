import { Article, LiveStat, SplitFlapItem } from "@/types/article";

export const MOCK_AUTHORS = {
  elena: {
    id: "auth-1",
    name: "Elena Rostova",
    title: "Senior Geopolitical Bureau Chief",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    bio: "Covering diplomatic corridors, Arctic sovereignty, and Eurasian trade infrastructure for twenty years.",
  },
  marcus: {
    id: "auth-2",
    name: "Dr. Marcus Vance",
    title: "Deep Tech & Intelligence Editor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    bio: "Former researcher at Cambridge Institute of Technology; analyses AI governance, chip supply chains, and quantum cryptography.",
  },
  soraya: {
    id: "auth-3",
    name: "Soraya Al-Khatib",
    title: "Global Energy & Macroeconomics Lead",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    bio: "Investigating central bank liquidity, critical mineral cartels, and sovereign wealth reserves across the Global South.",
  },
  julian: {
    id: "auth-4",
    name: "Julian Thorne",
    title: "Chief Architectural & Cultural Critic",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    bio: "Author of 'The Monolithic Age' and recipient of the International Essayist Medal.",
  },
  amara: {
    id: "auth-5",
    name: "Amara Okonkwo",
    title: "Environmental Investigations Correspondent",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80",
    bio: "Focusing on equatorial rainforest monitoring, aquifer depletion, and rare earth mining accountability.",
  },
};

export const MOCK_ARTICLES: Article[] = [
  // --- 20 FEATURED HERO ARTICLES (Order 1 to 20) ---
  {
    id: "hero-1",
    slug: "strait-of-malacca-quantum-radar-corridor",
    title: "The Quiet Fortress: Autonomous Radar Corridors Reshape the Strait of Malacca",
    excerpt:
      "A network of sub-surface quantum magnetic anomaly sensors and unmanned hydrofoils is transforming the world's most congested maritime chokepoint into a digitally fortified sanctuary.",
    content: `
# The Quiet Fortress: Autonomous Radar Corridors Reshape the Strait of Malacca

*By Elena Rostova, Senior Geopolitical Bureau Chief*

From the navigation deck of an ultra-large crude carrier steaming past the Phillip Channel, the water appears deceptively serene. Yet beneath the equatorial swell lies the densest deployment of distributed quantum sensors on earth.

In an unannounced initiative code-named **Corridor Meridian**, three littoral states have quietly harmonized their maritime surveillance architectures. The result is a real-time synthetic aperture map capable of resolving displacement anomalies down to three centimeters through tropical silt and thermal stratification.

> "We are no longer tracking vessels by transponders; we are tracking the hydrostatic displacement of oceanic mass in real time," notes maritime strategist Commander Aris Munandar.

### Strategic Consequences for Global Merchant Shipping

1. **Autonomous Escorts**: Autonomous patrol hydrofoils now maintain perpetual perimeter vigilance without human fatigue.
2. **Algorithmic Routing**: Dynamic lanes compress vessel separation margins from twelve nautical miles to less than two.
3. **Decoupled Verification**: Neutral cryptographic timestamps verify cargo bills of lading before vessels cross the 100th meridian east.

For international commerce, the shift promises an unprecedented reduction in marine insurance premiums, even as sovereign observers debate who holds the master cryptographic key to the corridor's telemetry.

Learn more through our [Global Dispatches Bureau](/category/global-dispatches) and review previous briefings on [Energy Corridors](/category/markets-capital).
    `,
    category: "Global Dispatches",
    categorySlug: "global-dispatches",
    author: MOCK_AUTHORS.elena,
    publishedAt: "2026-11-18T12:30:00Z",
    readTimeMinutes: 7,
    featuredOrder: 1,
    heroRank: "01",
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Maritime shipping lane at dusk with technological sensor beacons",
    tags: ["Maritime", "Geopolitics", "Quantum Sensors", "Trade"],
    stats: { views: 42300, shares: 3820, comments: 241 },
  },
  {
    id: "hero-2",
    slug: "silicon-photonic-breakthrough-cryogenic-compute",
    title: "Beyond Copper Interconnects: The 100-Terabit Photonic Core That Silenced Silicon Valley",
    excerpt:
      "Laboratory trials in Grenoble reveal an optical wafer mesh operating at 180 Kelvin that cuts artificial neural network training power consumption by ninety-two percent.",
    content: `
# Beyond Copper Interconnects: The 100-Terabit Photonic Core That Silenced Silicon Valley

*By Dr. Marcus Vance, Deep Tech & Intelligence Editor*

For seven decades, the thermal dissipation of copper wires has dictated the physical geography of computation. Today, that physical ceiling was effectively repealed.

A consortium of European physics laboratories and private semiconductor labs has demonstrated an operational 12-inch wafer consisting entirely of **lithographically etched silicon-germanium waveguides**. By substituting coherent pulses of infrared laser light for electrical valence currents, the architecture achieves internal packet exchange speeds exceeding 100 terabits per second per square centimeter.

### The Physics of Coherent Interconnects

\`\`\`
Architecture Comparison:
Standard Copper Bus: 1.4 pJ/bit at 85°C
Photonic Waveguide:  0.08 pJ/bit at 180K (94% reduction)
\`\`\`

The breakthrough renders multi-megawatt data centers obsolete for dense matrix multiplications. Rather than spanning football-field cooling halls, next-generation synthetic cognition systems can be enclosed within the volume of an upright grandfather clock.

Read our companion analysis on [Frontier Quantum Architectures](/article/quantum-supremacy-materials-synthesis).
    `,
    category: "Deep Tech",
    categorySlug: "deep-tech",
    author: MOCK_AUTHORS.marcus,
    publishedAt: "2026-11-18T11:15:00Z",
    readTimeMinutes: 9,
    featuredOrder: 2,
    heroRank: "02",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Macro view of microchip circuit tracks illuminated in amber gold",
    tags: ["Semiconductors", "Deep Tech", "Photonics", "Hardware"],
    stats: { views: 56100, shares: 5120, comments: 389 },
  },
  {
    id: "hero-3",
    slug: "atacama-lithium-brine-direct-extraction-pact",
    title: "The Salt Table Accord: How Zero-Evaporation Refining Saved the Atacama Basin",
    excerpt:
      "Indigenous councils and state mining conglomerates sign a binding treaty mandating nanofiltration direct lithium extraction, restoring five million cubic meters of ancestral groundwater.",
    content: `
# The Salt Table Accord: How Zero-Evaporation Refining Saved the Atacama Basin

*By Soraya Al-Khatib, Global Energy & Macroeconomics Lead*

Under the blinding ultraviolet glare of the high Andean plateau, vast iridescent evaporation ponds once consumed billions of liters of pristine groundwater annually. As of this morning, the last traditional evaporation basin in the Salar de Atacama has been decommissioned.

The transition to **closed-loop selective membrane extraction** is not merely a technical triumph; it represents a historic diplomatic compromise between the Atacameño Indigenous Union and sovereign mineral syndicates.

### Ecological & Economic Metrics:
- **Groundwater Re-injection**: 98.4% returned to original aquifer depth.
- **Cycle Duration**: Reduced from 18 months in sun ponds to 42 minutes inside closed autoclaves.
- **Sovereign Royalty Tier**: 14% direct equity held in community heritage trusts.

The treaty sets a non-negotiable benchmark for critical mineral extraction worldwide, from the salt flats of Bolivia to the brine aquifers of Western Australia.
    `,
    category: "Climate & Planet",
    categorySlug: "climate-planet",
    author: MOCK_AUTHORS.soraya,
    publishedAt: "2026-11-18T10:00:00Z",
    readTimeMinutes: 6,
    featuredOrder: 3,
    heroRank: "03",
    coverImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Vast white salt plains and mountain horizons under high sun",
    tags: ["Climate", "Lithium", "Energy", "Latin America"],
    stats: { views: 28400, shares: 1980, comments: 142 },
  },
  {
    id: "hero-4",
    slug: "brutalist-concrete-restoration-and-cellular-healing",
    title: "Concrete That Bleeds Calcite: The Renaissance of Post-War Monumentalism",
    excerpt:
      "Engineers infuse bacterial spores and microvascular resin networks into London and Belgrade's threatened modernist icons, giving monolithic facades the power to heal their own fissures.",
    content: `
# Concrete That Bleeds Calcite: The Renaissance of Post-War Monumentalism

*By Julian Thorne, Chief Architectural & Cultural Critic*

For half a century, the brutalist landmarks of Europe were dismissed as unyielding grey monoliths destined for demolition by rain, frost, and carbonation. Today, they are awakening with biological vitality.

Through deep-injection microvascular networks loaded with *Sporosarcina pasteurii* and encapsulated nutrient gel, historic architectural structures now autonomously deposit calcium carbonate crystals whenever micro-cracks allow moisture to infiltrate.

> "We are witnessing the fusion of monumental mid-century form with organic self-preservation," Thorne writes. "The building is no longer an inanimate ruin; it possesses an immune system."

Explore our ongoing series on [Culture & Architecture](/category/culture-arts).
    `,
    category: "Culture & Arts",
    categorySlug: "culture-arts",
    author: MOCK_AUTHORS.julian,
    publishedAt: "2026-11-18T08:45:00Z",
    readTimeMinutes: 8,
    featuredOrder: 4,
    heroRank: "04",
    coverImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Dramatic modernist architectural geometry with cast concrete shadows",
    tags: ["Architecture", "Culture", "Materials", "Design"],
    stats: { views: 33800, shares: 3200, comments: 198 },
  },
  {
    id: "hero-5",
    slug: "central-bank-digital-liquidity-corridor-g7",
    title: "Project Amber Bridge: Seven Central Banks Finalize Cross-Border Instant Clearing",
    excerpt:
      "A sovereign cryptographic settlement network eliminates multi-day correspondent banking friction, settling multi-billion foreign exchange trades within 400 milliseconds.",
    content: `
# Project Amber Bridge: Seven Central Banks Finalize Cross-Border Instant Clearing

*By Soraya Al-Khatib, Global Energy & Macroeconomics Lead*

The architecture of international currency exchange has remained virtually unchanged since the 1970s, reliant on layered correspondent bank nostro-vostro ledgers. This afternoon, Project Amber Bridge entered live production.

Jointly governed by seven monetary authorities, the system utilizes zero-knowledge atomic swaps backed by central bank reserve deposits.

### System Specs:
* **Settlement Latency**: 380 milliseconds round-trip.
* **Capital Velocity**: Liquidity recycling speed increased by a factor of 14.
* **Foreign Exchange Spreads**: Compressed by 90% for non-reserve pairs.
    `,
    category: "Markets & Capital",
    categorySlug: "markets-capital",
    author: MOCK_AUTHORS.soraya,
    publishedAt: "2026-11-18T07:20:00Z",
    readTimeMinutes: 5,
    featuredOrder: 5,
    heroRank: "05",
    // TEST FALLBACK: Article 5 has NO image (null) to verify SafeImage fallback!
    coverImage: null,
    coverImageAlt: "Central bank financial vault and digital monetary ledgers",
    tags: ["Banking", "Economics", "Monetary Policy", "Fintech"],
    stats: { views: 39100, shares: 2750, comments: 164 },
  },
  {
    id: "hero-6",
    slug: "arctic-cable-under-transpolar-sea-ice",
    title: "The Deep North Line: Subsea Fiber Across the Melting Transpolar Ridge",
    excerpt:
      "Robotic trenchers operating beneath 300 meters of pack ice connect Tokyo directly to Dublin, shaving thirty-four milliseconds off global financial latency.",
    content: `
# The Deep North Line: Subsea Fiber Across the Melting Transpolar Ridge

*By Elena Rostova, Senior Geopolitical Bureau Chief*

Sailing north of Svalbard through floating pack ice, the expedition vessel *Nordic Cableway* has completed the most hostile cable-laying operation in telecommunications history.

The line threads through underwater canyons carved by polar glaciers, clad in triple-layer titanium armoring to withstand iceberg keels.
    `,
    category: "Global Dispatches",
    categorySlug: "global-dispatches",
    author: MOCK_AUTHORS.elena,
    publishedAt: "2026-11-18T06:10:00Z",
    readTimeMinutes: 7,
    featuredOrder: 6,
    heroRank: "06",
    coverImage: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Vast icy polar seas and misty arctic horizon",
    tags: ["Arctic", "Telecom", "Geopolitics", "Infrastructure"],
    stats: { views: 31200, shares: 2600, comments: 177 },
  },
  {
    id: "hero-7",
    slug: "synthetic-biology-drought-resistant-sorghum",
    title: "The Golden Stem: CRISPR-Edited Sorghum Yields Double in the Sahel Drought",
    excerpt:
      "Field trials across Burkina Faso and Chad confirm that epigenetic stomatal regulation allows cereal crops to flourish in forty-five degree heat with half the seasonal rainfall.",
    content: `
# The Golden Stem: CRISPR-Edited Sorghum Yields Double in the Sahel Drought

*By Amara Okonkwo, Environmental Investigations Correspondent*

In the dry winds of the Ouagadougou plains, a field of amber grain stands unbowed beneath fifty straight days without rain. 

Through precise non-transgenic base editing, researchers have reconfigured the crop's stomatal response to atmospheric vapor pressure deficits. Water loss is reduced by 62% during peak midday temperatures without compromising carbon fixation.
    `,
    category: "Climate & Planet",
    categorySlug: "climate-planet",
    author: MOCK_AUTHORS.amara,
    publishedAt: "2026-11-18T05:00:00Z",
    readTimeMinutes: 6,
    featuredOrder: 7,
    heroRank: "07",
    coverImage: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Golden grain fields stretching across wide agricultural plains",
    tags: ["Agriculture", "Climate", "Biotech", "Africa"],
    stats: { views: 24700, shares: 2100, comments: 130 },
  },
  {
    id: "hero-8",
    slug: "ai-patent-treaty-geneva-open-foundry",
    title: "The Geneva Compact: Mandatory Source Disclosure for Algorithmic Medicine",
    excerpt:
      "Forty nations adopt a historic intellectual property convention requiring verifiable model weights and training clinical trial data for all diagnostic artificial intelligence.",
    content: `
# The Geneva Compact: Mandatory Source Disclosure for Algorithmic Medicine

*By Dr. Marcus Vance, Deep Tech & Intelligence Editor*

Inside the Palais des Nations, negotiators voted by overwhelming majority to ratify what is being called the 'Nuremberg Code of Machine Learning'.

Beginning next quarter, any therapeutic algorithm deployed in clinical environments must register its verification vectors with an independent international repository.
    `,
    category: "Deep Tech",
    categorySlug: "deep-tech",
    author: MOCK_AUTHORS.marcus,
    publishedAt: "2026-11-18T04:15:00Z",
    readTimeMinutes: 8,
    featuredOrder: 8,
    heroRank: "08",
    coverImage: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Clinical laboratory glassware and medical computational displays",
    tags: ["Healthcare", "AI Governance", "Ethics", "Policy"],
    stats: { views: 27900, shares: 2400, comments: 154 },
  },
  {
    id: "hero-9",
    slug: "autonomous-electric-rail-freight-trans-eurasian",
    title: "Iron Zephyr: High-Speed Electric Freight Unites Rotterdam and Almaty",
    excerpt:
      "Driverless, aerodynamically shrouded container consists begin scheduled 96-hour runs, challenging air freight economics along the central Eurasian land corridor.",
    content: `
# Iron Zephyr: High-Speed Electric Freight Unites Rotterdam and Almaty

*By Elena Rostova, Senior Geopolitical Bureau Chief*

Slicing through the Kazakh steppes at 240 kilometers per hour, the sleek aerodynamic trainset represents a watershed for continental transport economics.
    `,
    category: "Global Dispatches",
    categorySlug: "global-dispatches",
    author: MOCK_AUTHORS.elena,
    publishedAt: "2026-11-18T03:30:00Z",
    readTimeMinutes: 7,
    featuredOrder: 9,
    heroRank: "09",
    coverImage: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "High speed electric train traveling on rails across sweeping landscape",
    tags: ["Rail", "Logistics", "Europe", "Eurasia"],
    stats: { views: 36500, shares: 3100, comments: 188 },
  },
  {
    id: "hero-10",
    slug: "the-death-of-ephemeral-social-curation-revival",
    title: "The Post-Algorithm Press: Why Millions Are Fleeing Feeds for Fixed Daily Editions",
    excerpt:
      "A cultural revolt against bottomless vertical video feeds sparks an unexpected revival of bound broadsides, static dispatches, and finite reading rituals.",
    content: `
# The Post-Algorithm Press: Why Millions Are Fleeing Feeds for Fixed Daily Editions

*By Julian Thorne, Chief Architectural & Cultural Critic*

For fifteen years, the prevailing consensus insisted that human attention could only tolerate fifteen-second dopamine loops. The data of 2026 tells a startlingly contrary narrative.

Independent print periodicals and finite digital editions with clear endpoints are seeing triple-digit subscription expansion across university campuses and design studios.
    `,
    category: "Culture & Arts",
    categorySlug: "culture-arts",
    author: MOCK_AUTHORS.julian,
    publishedAt: "2026-11-18T02:00:00Z",
    readTimeMinutes: 10,
    featuredOrder: 10,
    heroRank: "10",
    coverImage: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Classic printed newspaper pages stacked on a timber table",
    tags: ["Media", "Culture", "Publishing", "Essays"],
    stats: { views: 48900, shares: 6200, comments: 512 },
  },
  {
    id: "hero-11",
    slug: "offshore-floating-fusion-island-north-sea",
    title: "Project Boreas: The First Offshore Magnetized Target Fusion Pilot Fires in Dogger Bank",
    excerpt:
      "Mounted on a repurposed oil spar platform, the two-gigawatt prototype delivers steady-state plasma confinement, feeding green electrons directly into the British grid.",
    content: `
# Project Boreas: The First Offshore Magnetized Target Fusion Pilot Fires in Dogger Bank

*By Soraya Al-Khatib, Global Energy & Macroeconomics Lead*

Rising eighty meters above the cold grey swells of Dogger Bank, the decommissioned petroleum spar has found an astonishing second act. 

Equipped with high-temperature superconducting magnet coils and heavy water deuterium injection, the reactor maintained sustained net energy gain over a continuous 72-hour trial run.
    `,
    category: "Deep Tech",
    categorySlug: "deep-tech",
    author: MOCK_AUTHORS.soraya,
    publishedAt: "2026-11-18T01:15:00Z",
    readTimeMinutes: 7,
    featuredOrder: 11,
    heroRank: "11",
    coverImage: "https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Offshore maritime platform illuminated at twilight in the North Sea",
    tags: ["Fusion", "Energy", "North Sea", "Clean Tech"],
    stats: { views: 41200, shares: 3900, comments: 275 },
  },
  {
    id: "hero-12",
    slug: "decentralized-water-commons-tangier",
    title: "Fog Harvesters of the Rif: How Decentralized Humidity Meshes Replenished Tangier",
    excerpt:
      "Graphene-coated condensation sails suspended across Atlantic coastal ridges now yield twenty thousand liters of potable mineral water daily for mountain communities.",
    content: `
# Fog Harvesters of the Rif: How Decentralized Humidity Meshes Replenished Tangier

*By Amara Okonkwo, Environmental Investigations Correspondent*

Where the moist Atlantic gusts collide with the Rif mountain ridges, towering architectural mesh arrays capture moisture directly from sea fog. 

The water undergoes natural filtration through local volcanic basalt, bypassing municipal energy grids entirely.
    `,
    category: "Climate & Planet",
    categorySlug: "climate-planet",
    author: MOCK_AUTHORS.amara,
    publishedAt: "2026-11-17T23:30:00Z",
    readTimeMinutes: 6,
    featuredOrder: 12,
    heroRank: "12",
    coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Misty mountain ridges and coastal clouds catching morning light",
    tags: ["Water", "Climate", "Morocco", "Innovation"],
    stats: { views: 22100, shares: 1850, comments: 98 },
  },
  {
    id: "hero-13",
    slug: "tokyo-wooden-skyscraper-seismic-timber",
    title: "The Flexible Colossus: Tokyo's 350-Meter Mass-Timber Tower Passes 8.0 Seismic Simulation",
    excerpt:
      "Utilizing laminated cedar beams joined with Japanese wooden mortise craftsmanship and pneumatic dampers, the landmark proves wood can outlive reinforced concrete in earthquake zones.",
    content: `
# The Flexible Colossus: Tokyo's 350-Meter Mass-Timber Tower Passes 8.0 Seismic Simulation

*By Julian Thorne, Chief Architectural & Cultural Critic*

Standing proudly in Tokyo's Marunouchi district, the towering structure is built from 185,000 cubic meters of sustainably harvested Japanese cedar. 

Rather than resisting seismic shock with rigid stiffness, the joinery flexes and dissipates kinetic energy through friction and counterbalanced fluid pendulums.
    `,
    category: "Culture & Arts",
    categorySlug: "culture-arts",
    author: MOCK_AUTHORS.julian,
    publishedAt: "2026-11-17T22:00:00Z",
    readTimeMinutes: 8,
    featuredOrder: 13,
    heroRank: "13",
    coverImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Dramatic illuminated Tokyo skyscrapers and urban architectural grid",
    tags: ["Architecture", "Japan", "Timber", "Urbanism"],
    stats: { views: 35800, shares: 3340, comments: 219 },
  },
  {
    id: "hero-14",
    slug: "synthetic-scent-heritage-reconstructed-lost-gardens",
    title: "Resurrecting Extinct Botany: The Olfactory Archaeologists of Babylon",
    excerpt:
      "Mass spectrometry performed on three-thousand-year-old resin amphorae allows biochemical curators to synthesize the exact scent profiles of legendary ancient flora.",
    content: `
# Resurrecting Extinct Botany: The Olfactory Archaeologists of Babylon

*By Julian Thorne, Chief Architectural & Cultural Critic*

In an underground laboratory in Baghdad, visitors can inhale the precise fragrance of the resin used in Mesopotamian palace rituals during the reign of Nebuchadnezzar II.
    `,
    category: "Culture & Arts",
    categorySlug: "culture-arts",
    author: MOCK_AUTHORS.julian,
    publishedAt: "2026-11-17T20:30:00Z",
    readTimeMinutes: 5,
    featuredOrder: 14,
    heroRank: "14",
    // TEST FALLBACK: Article 14 has NO image (null) to verify SafeImage fallback!
    coverImage: null,
    coverImageAlt: "Archaeological artifacts and ancient botanical resin vessels",
    tags: ["Archaeology", "Culture", "Botany", "History"],
    stats: { views: 19400, shares: 1420, comments: 84 },
  },
  {
    id: "hero-15",
    slug: "autonomous-sovereign-wealth-funds-singapore-zurich",
    title: "Algorithmic Guardians: Zurich and Singapore Hand Sovereign Portfolios to Formal Proofs",
    excerpt:
      "Treasury managers replace discretionary macroeconomic committees with mathematically verified game-theoretic models, insulating state reserves from political turbulence.",
    content: `
# Algorithmic Guardians: Zurich and Singapore Hand Sovereign Portfolios to Formal Proofs

*By Soraya Al-Khatib, Global Energy & Macroeconomics Lead*

State financial reserves amounting to $1.2 trillion are now managed under formally verified Isabelle/HOL proof kernels, ensuring portfolio actions obey strict ethical and solvency invariants.
    `,
    category: "Markets & Capital",
    categorySlug: "markets-capital",
    author: MOCK_AUTHORS.soraya,
    publishedAt: "2026-11-17T18:45:00Z",
    readTimeMinutes: 7,
    featuredOrder: 15,
    heroRank: "15",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Glass financial skyscrapers reaching toward clear sky",
    tags: ["Finance", "Sovereign Funds", "Mathematics", "Markets"],
    stats: { views: 32400, shares: 2510, comments: 167 },
  },
  {
    id: "hero-16",
    slug: "south-atlantic-pelagic-trench-ocean-corridor",
    title: "The Mid-Atlantic Abyss: Deep ROVs Map Three Hundred New Benthic Species in Hydrothermal Vents",
    excerpt:
      "A joint Brazilian-Namibian marine mission reveals chemosynthetic ecosystems thriving at four thousand meters, forcing the suspension of deep-sea mining leases.",
    content: `
# The Mid-Atlantic Abyss: Deep ROVs Map Three Hundred New Benthic Species in Hydrothermal Vents

*By Amara Okonkwo, Environmental Investigations Correspondent*

Hovering beside towering black smoker chimneys along the Rio Grande Rise, deep-sea research drones have captured luminous bioluminescent siphonophores and previously unclassified armored polychaetes.
    `,
    category: "Climate & Planet",
    categorySlug: "climate-planet",
    author: MOCK_AUTHORS.amara,
    publishedAt: "2026-11-17T16:15:00Z",
    readTimeMinutes: 6,
    featuredOrder: 16,
    heroRank: "16",
    coverImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Deep ocean waters and marine submersible exploration glow",
    tags: ["Ocean", "Biology", "Exploration", "Mining Policy"],
    stats: { views: 26800, shares: 2190, comments: 115 },
  },
  {
    id: "hero-17",
    slug: "space-station-cislunar-commercial-foundry",
    title: "Cislunar Smelting: First Ultra-Pure ZBLAN Fiber Spun in Low Earth Microgravity",
    excerpt:
      "Eliminating gravitational convection defects allows orbital furnaces to produce telecommunications glass with loss rates twenty times lower than terrestrial quartz.",
    content: `
# Cislunar Smelting: First Ultra-Pure ZBLAN Fiber Spun in Low Earth Microgravity

*By Dr. Marcus Vance, Deep Tech & Intelligence Editor*

Inside the automated manufacturing module docked at Lagrange Point 1, an induction furnace has completed the continuous extrusion of 500 kilometers of fluoride glass fiber without crystallization flaws.
    `,
    category: "Deep Tech",
    categorySlug: "deep-tech",
    author: MOCK_AUTHORS.marcus,
    publishedAt: "2026-11-17T14:00:00Z",
    readTimeMinutes: 8,
    featuredOrder: 17,
    heroRank: "17",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Earth view from orbit with blue atmospheric luminescence",
    tags: ["Space", "Deep Tech", "Materials", "Physics"],
    stats: { views: 44200, shares: 4180, comments: 289 },
  },
  {
    id: "hero-18",
    slug: "post-silicon-graphene-neuromorphic-implants",
    title: "Synaptic Mesh: Cortical Implants Restore Complete Motor Autonomy for Paraplegic Patients",
    excerpt:
      "A clinical study at the Karolinska Institute demonstrates biocompatible graphene electrodes that seamlessly integrate with pyramidal neuron dendritic trees.",
    content: `
# Synaptic Mesh: Cortical Implants Restore Complete Motor Autonomy for Paraplegic Patients

*By Dr. Marcus Vance, Deep Tech & Intelligence Editor*

Twelve individuals with complete spinal cord transections have walked unassisted across Stockholm's cobbled streets, guided by flexible sub-micron graphene mesh arrays.
    `,
    category: "Deep Tech",
    categorySlug: "deep-tech",
    author: MOCK_AUTHORS.marcus,
    publishedAt: "2026-11-17T11:20:00Z",
    readTimeMinutes: 9,
    featuredOrder: 18,
    heroRank: "18",
    coverImage: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Medical neurological imaging and scientific precision instruments",
    tags: ["Medicine", "Neural Mesh", "Bioengineering", "Health"],
    stats: { views: 51200, shares: 5400, comments: 395 },
  },
  {
    id: "hero-19",
    slug: "danube-wetland-natural-floodplain-corridor",
    title: "Rewilding the Iron Gate: The Trans-Balkan Floodplain Restoration Complete",
    excerpt:
      "By breaching twentieth-century Soviet dikes, five hundred square kilometers of natural wetland now buffer Central Europe against once-in-a-century storm surges.",
    content: `
# Rewilding the Iron Gate: The Trans-Balkan Floodplain Restoration Complete

*By Amara Okonkwo, Environmental Investigations Correspondent*

Where concrete embankments once forced the Danube into an unnatural torrent, wide willow meadows and gravel oxbows have reclaimed their natural rhythm.
    `,
    category: "Climate & Planet",
    categorySlug: "climate-planet",
    author: MOCK_AUTHORS.amara,
    publishedAt: "2026-11-17T09:00:00Z",
    readTimeMinutes: 6,
    featuredOrder: 19,
    heroRank: "19",
    // TEST FALLBACK: Article 19 has NO image (null) to verify SafeImage fallback!
    coverImage: null,
    coverImageAlt: "Danube river wetland delta with waterfowl and green reeds",
    tags: ["Rewilding", "Climate", "Europe", "Ecology"],
    stats: { views: 23400, shares: 1910, comments: 104 },
  },
  {
    id: "hero-20",
    slug: "the-monolithic-peace-nordic-baltic-diplomacy",
    title: "The Baltic Accord: Neutrality in the Era of Autonomous Defense Alliances",
    excerpt:
      "In a landmark summit in Mariehamn, northern European nations sign the Archipelago Protocol, establishing autonomous demilitarized navigation corridors.",
    content: `
# The Baltic Accord: Neutrality in the Era of Autonomous Defense Alliances

*By Elena Rostova, Senior Geopolitical Bureau Chief*

Gathered on the autonomous Åland Islands, foreign ministers ratified a non-aggression verification protocol based on open telemetry feeds rather than secret bilateral pacts.
    `,
    category: "Global Dispatches",
    categorySlug: "global-dispatches",
    author: MOCK_AUTHORS.elena,
    publishedAt: "2026-11-17T07:30:00Z",
    readTimeMinutes: 7,
    featuredOrder: 20,
    heroRank: "20",
    coverImage: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Nordic coastal archipelago with calm waters and pine granite shore",
    tags: ["Baltic", "Diplomacy", "Security", "Treaties"],
    stats: { views: 30100, shares: 2780, comments: 172 },
  },

  // --- ADDITIONAL LATEST / TRENDING / PHOTO STORIES ---
  {
    id: "latest-1",
    slug: "nuclear-desalination-gulf-cooperation",
    title: "Small Modular Reactors Power the First Zero-Brine Desalination Cluster in Dubai",
    excerpt: "Combining thermal heat from Generation IV molten salt reactors with mechanical vapor recompression yields drinking water with zero oceanic brine dumping.",
    content: "# Nuclear Desalination in the Arabian Gulf\n\nA new paradigm in water generation...",
    category: "Deep Tech",
    categorySlug: "deep-tech",
    author: MOCK_AUTHORS.soraya,
    publishedAt: "2026-11-18T13:45:00Z",
    readTimeMinutes: 6,
    isTrending: true,
    trendingRank: 1,
    coverImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Modern coastal infrastructure and architecture in Dubai",
    tags: ["Nuclear", "Water", "Middle East", "Clean Tech"],
  },
  {
    id: "latest-2",
    slug: "semiconductor-glass-substrate-packaging",
    title: "The Glass Substrate Shift: How Microelectronics Left Organic Resins Behind",
    excerpt: "With co-packaged optics requiring micron-level thermal flatness, ultra-dense glass cores replace fiberglass PCBs across leading foundry nodes.",
    content: "# The Glass Substrate Shift\n\nInside the advanced packaging facilities...",
    category: "Deep Tech",
    categorySlug: "deep-tech",
    author: MOCK_AUTHORS.marcus,
    publishedAt: "2026-11-18T13:00:00Z",
    readTimeMinutes: 8,
    isTrending: true,
    trendingRank: 2,
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Abstract matrix of digital optical circuit paths",
    tags: ["Chips", "Hardware", "Semiconductors"],
  },
  {
    id: "latest-3",
    slug: "sovereign-food-reserves-grain-corridor",
    title: "The Black Sea Grain Verification Protocol Enters Full Electronic Notarization",
    excerpt: "Satellite grain volume sensors and biometric port manifests ensure unhindered food distribution to East African relief hubs.",
    content: "# Sovereign Food Reserves and Electronic Notarization\n\nEnsuring humanitarian trade...",
    category: "Global Dispatches",
    categorySlug: "global-dispatches",
    author: MOCK_AUTHORS.elena,
    publishedAt: "2026-11-18T12:00:00Z",
    readTimeMinutes: 5,
    isTrending: true,
    trendingRank: 3,
    coverImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Golden wheat ears and harvesting agricultural equipment",
    tags: ["Agriculture", "Trade", "Humanitarian"],
  },
  {
    id: "latest-4",
    slug: "the-new-typographic-modernism",
    title: "Ink on Paper as Resistance: The Radical Underground Press of Leipzig",
    excerpt: "In clandestine workshops powered by pedal presses, young typographers revive lead type casting to publish uncensorable manifestos on aesthetics.",
    content: "# Ink on Paper as Resistance\n\nIn an age of instantaneous digital alteration...",
    category: "Culture & Arts",
    categorySlug: "culture-arts",
    author: MOCK_AUTHORS.julian,
    publishedAt: "2026-11-18T11:40:00Z",
    readTimeMinutes: 7,
    isTrending: true,
    trendingRank: 4,
    coverImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Traditional letterpress metal types and wooden trays",
    tags: ["Typography", "Design", "Culture"],
  },
  {
    id: "latest-5",
    slug: "lithium-sulfur-battery-aviation-certification",
    title: "Regional Electric Flights Clear Final Airworthiness with Sulfur-Cathode Packs",
    excerpt: "With energy density touching 520 Wh/kg, forty-seat hybrid turboprops begin inter-island commercial services between Stockholm and Helsinki.",
    content: "# Regional Electric Flights Clear Final Certification\n\nAviation takes its first silent hop...",
    category: "Climate & Planet",
    categorySlug: "climate-planet",
    author: MOCK_AUTHORS.amara,
    publishedAt: "2026-11-18T10:30:00Z",
    readTimeMinutes: 6,
    isTrending: true,
    trendingRank: 5,
    coverImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Airplane wing cutting through clouds at high altitude",
    tags: ["Aviation", "Batteries", "Clean Tech"],
  },
  {
    id: "latest-6",
    slug: "algorithmic-antitrust-court-rules-on-weights",
    title: "The Supreme Court of Brussels Enforces Model Divestiture in Monopoly Case",
    excerpt: "Regulators require foundation model conglomerates to bifurcate inference infrastructure from consumer search platforms.",
    content: "# The Supreme Court of Brussels Enforces Model Divestiture\n\nLegal landmark in antitrust law...",
    category: "Deep Tech",
    categorySlug: "deep-tech",
    author: MOCK_AUTHORS.marcus,
    publishedAt: "2026-11-18T09:40:00Z",
    readTimeMinutes: 8,
    isTrending: true,
    trendingRank: 6,
    coverImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Classical court building columns and judicial seal",
    tags: ["Antitrust", "Legal", "AI"],
  },
  {
    id: "latest-7",
    slug: "renewable-hydrogen-corridor-chile-germany",
    title: "The Green Ammonia Highway: First Cryogenic Tanker Docks at Wilhelmshaven",
    excerpt: "Synthesized using Patagonia's relentless winds, eighty thousand cubic meters of green ammonia arrive to fuel Ruhr industrial furnaces.",
    content: "# The Green Ammonia Highway\n\nPatagonian winds arrive in northern Germany...",
    category: "Markets & Capital",
    categorySlug: "markets-capital",
    author: MOCK_AUTHORS.soraya,
    publishedAt: "2026-11-18T08:15:00Z",
    readTimeMinutes: 7,
    isTrending: true,
    trendingRank: 7,
    coverImage: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Modern wind turbines standing in a windy open valley",
    tags: ["Hydrogen", "Energy", "Germany", "Chile"],
  },
  {
    id: "latest-8",
    slug: "underground-geothermal-superhot-drilling-iceland",
    title: "Magma-Tap Power: Superhot Geothermal Well at Reykjanes Hits 450°C Steam",
    excerpt: "Directly tapping deep supercritical fluids allows a single wellbore to produce ten times the electrical output of standard geothermal shafts.",
    content: "# Magma-Tap Power at Reykjanes\n\nDeep volcanic drilling produces clean base power...",
    category: "Climate & Planet",
    categorySlug: "climate-planet",
    author: MOCK_AUTHORS.amara,
    publishedAt: "2026-11-18T07:00:00Z",
    readTimeMinutes: 6,
    isTrending: true,
    trendingRank: 8,
    coverImage: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Volcanic landscape and geothermal steam vents in Iceland",
    tags: ["Geothermal", "Energy", "Iceland"],
  },
  {
    id: "latest-9",
    slug: "the-death-of-digital-scarcity-nft-reckoning",
    title: "The Museum of Fleeting Tokens: Why Galleries Are Archiving Abandoned Blockchains",
    excerpt: "Curators at the Pompidou preserve forgotten smart contracts as historic mementos of early twenty-first-century financial mania.",
    content: "# The Museum of Fleeting Tokens\n\nCultural retrospectives on speculative bubbles...",
    category: "Culture & Arts",
    categorySlug: "culture-arts",
    author: MOCK_AUTHORS.julian,
    publishedAt: "2026-11-18T06:30:00Z",
    readTimeMinutes: 7,
    isTrending: true,
    trendingRank: 9,
    coverImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Art gallery interior with framed modern artwork and visitors",
    tags: ["Art", "Culture", "Digital History"],
  },
  {
    id: "latest-10",
    slug: "space-debris-laser-sweeper-orbit",
    title: "Orbital Custodians: Ground-Based Laser Sweepers De-Orbit Two Hundred Rogue Satellites",
    excerpt: "A pulse station in the Australian outback ablates centimeter-sized space junk with sub-millimeter tracking accuracy, securing orbital paths.",
    content: "# Orbital Custodians: Ground-Based Laser Sweepers\n\nClearing low earth orbit...",
    category: "Deep Tech",
    categorySlug: "deep-tech",
    author: MOCK_AUTHORS.marcus,
    publishedAt: "2026-11-18T05:20:00Z",
    readTimeMinutes: 7,
    isTrending: true,
    trendingRank: 10,
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Earth at night with shimmering orbital lights",
    tags: ["Space", "Laser", "Aerospace"],
  },

  // --- EDITOR'S PICKS (Sticky 3D Stack) ---
  {
    id: "editor-1",
    slug: "the-vanishing-middle-power-sovereignty",
    title: "The Architecture of Non-Alignment: Why Middle Powers Are Rejecting Dual Hegemony",
    excerpt: "From Jakarta to Brasília, diplomatic corps are building multi-vector coalitions that refuse binary geopolitical allegiance.",
    content: `
# The Architecture of Non-Alignment

*By Elena Rostova, Senior Geopolitical Bureau Chief*

For three generations, international politics was framed around two competing superpower orbits. Today's reality is aggressively polycentric.

Sovereign states are asserting autonomy by signing bilateral micro-pacts across defense, chip manufacture, and energy distribution.
    `,
    category: "The Long View",
    categorySlug: "the-long-view",
    author: MOCK_AUTHORS.elena,
    publishedAt: "2026-11-18T09:00:00Z",
    readTimeMinutes: 11,
    isEditorsPick: true,
    coverImage: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Diplomatic summit hall with flags and sovereign delegations",
    tags: ["Geopolitics", "Essays", "Diplomacy"],
  },
  {
    id: "editor-2",
    slug: "cellular-automata-urban-planning-zurich",
    title: "Cities That Grow Like Coral: The Generative Districts of New Zurich",
    excerpt: "Algorithmic zoning allows neighborhoods to dynamically allocate green space, retail density, and transit stops based on pedestrian footfall telemetry.",
    content: `
# Cities That Grow Like Coral: The Generative Districts of New Zurich

*By Julian Thorne, Chief Architectural & Cultural Critic*

Gone are the rigid master plans drafted decades in advance. Modern urban architecture responds organically to citizen behavior.
    `,
    category: "Culture & Arts",
    categorySlug: "culture-arts",
    author: MOCK_AUTHORS.julian,
    publishedAt: "2026-11-17T15:00:00Z",
    readTimeMinutes: 8,
    isEditorsPick: true,
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Modern glass architectural complex reflecting clouds and light",
    tags: ["Urbanism", "Architecture", "Design"],
  },
  {
    id: "editor-3",
    slug: "synthetic-scarcity-and-the-entropy-crisis",
    title: "Thermodynamics of Thought: Why Compute Is the True Currency of the 21st Century",
    excerpt: "Every civilization's power was measured by its energy surplus. Today, power belongs to whoever extracts the highest cognition per megawatt-hour.",
    content: `
# Thermodynamics of Thought

*By Dr. Marcus Vance, Deep Tech & Intelligence Editor*

We have passed from the industrial epoch into the thermodynamic computation era. The sovereign currency of nations is no longer petrodollars, but cognitive density.
    `,
    category: "The Long View",
    categorySlug: "the-long-view",
    author: MOCK_AUTHORS.marcus,
    publishedAt: "2026-11-16T18:00:00Z",
    readTimeMinutes: 12,
    isEditorsPick: true,
    coverImage: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Atmospheric laboratory laser and quantum optics experimentation",
    tags: ["Philosophy", "Deep Tech", "Energy", "Entropy"],
  },
  {
    id: "editor-4",
    slug: "indus-basin-water-peace-treaty",
    title: "The Indus Rebirth: Shared Hydrological telemetry Between Pakistan and India",
    excerpt: "Rival meteorologists install mutual real-time acoustic streamflow monitors across the Himalayan headwaters, defusing water disputes before the monsoon.",
    content: `
# The Indus Rebirth: Shared Hydrological Telemetry

*By Amara Okonkwo, Environmental Investigations Correspondent*

Where military skirmishes once threatened over glacial water diversions, high-altitude acoustic sensors have created a transparent, incontrovertible record of water flow.
    `,
    category: "Global Dispatches",
    categorySlug: "global-dispatches",
    author: MOCK_AUTHORS.amara,
    publishedAt: "2026-11-15T14:30:00Z",
    readTimeMinutes: 9,
    isEditorsPick: true,
    coverImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Majestic snow-capped mountain range and high altitude glacial river",
    tags: ["Himalayas", "Water", "Peace", "South Asia"],
  },

  // --- PHOTO STORY CUBE FACES (4 Story Angles) ---
  {
    id: "photo-face-1",
    slug: "photo-story-the-last-salt-gleaners",
    title: "The Salt Caravans of Danakil",
    excerpt: "In the hottest inhabited place on Earth, Afar camel drovers follow tracks mapped three thousand years ago to carve slabs of solid sodium chloride.",
    content: "# The Salt Caravans of Danakil\n\nVisual chronicle from 120 meters below sea level in the Afar Depression...",
    category: "Photo Story",
    categorySlug: "culture-arts",
    author: MOCK_AUTHORS.julian,
    publishedAt: "2026-11-18T10:00:00Z",
    readTimeMinutes: 4,
    isPhotoStory: true,
    photoStoryAngle: "Face 01 • The Salt Caravans of Danakil",
    coverImage: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Afar salt plains glowing amber in early dawn",
    tags: ["Photo Story", "Ethiopia", "Tradition"],
  },
  {
    id: "photo-face-2",
    slug: "photo-story-deep-fjord-salmon-hatcheries",
    title: "Luminescence in the Hardangerfjord",
    excerpt: "Subsea geodesic spheres cradle resilient Arctic char under robotic UV sterilization, preserving wild migratory fjords.",
    content: "# Luminescence in the Hardangerfjord\n\nBeneath sixty fathoms of glacial meltwater...",
    category: "Photo Story",
    categorySlug: "climate-planet",
    author: MOCK_AUTHORS.amara,
    publishedAt: "2026-11-17T14:00:00Z",
    readTimeMinutes: 4,
    isPhotoStory: true,
    photoStoryAngle: "Face 02 • Subsea Geodesic Spheres",
    coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Dramatic fjord waters reflecting snow peaks and turquoise ice",
    tags: ["Photo Story", "Norway", "Aquaculture"],
  },
  {
    id: "photo-face-3",
    slug: "photo-story-kyoto-zen-bamboo-preservation",
    title: "The Sound of Arashiyama at Dawn",
    excerpt: "Centuries-old acoustic gardening techniques ensure that morning breeze passing through bamboo groves vibrates at meditative frequencies.",
    content: "# The Sound of Arashiyama at Dawn\n\nPreserving Japanese auditory landscapes...",
    category: "Photo Story",
    categorySlug: "culture-arts",
    author: MOCK_AUTHORS.julian,
    publishedAt: "2026-11-16T12:00:00Z",
    readTimeMinutes: 4,
    isPhotoStory: true,
    photoStoryAngle: "Face 03 • Acoustic Bamboo Sanctuaries",
    coverImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Towering green bamboo stalks catching morning mist",
    tags: ["Photo Story", "Japan", "Soundscape"],
  },
  {
    id: "photo-face-4",
    slug: "photo-story-atacama-observatory-stellar-nursery",
    title: "Chajnantor: Listening to the Cosmic Dawn",
    excerpt: "Sixty-six millimeter antennas synchronized across five thousand meters elevation capture the accretion disks of newborn stars.",
    content: "# Chajnantor: Listening to the Cosmic Dawn\n\nHigh above the clouds in the Atacama...",
    category: "Photo Story",
    categorySlug: "deep-tech",
    author: MOCK_AUTHORS.marcus,
    publishedAt: "2026-11-15T22:00:00Z",
    readTimeMinutes: 4,
    isPhotoStory: true,
    photoStoryAngle: "Face 04 • ALMA Submillimeter Array",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Deep starfield and radio telescope dishes against the Milky Way",
    tags: ["Photo Story", "Astronomy", "Atacama"],
  },
];

export const MOCK_BREAKING_HEADLINES: string[] = [
  "GLOBAL DISPATCH: Strait of Malacca quantum radar corridor becomes fully operational across 3 littoral states.",
  "DEEP TECH: European photonic wafer achieves 100 terabit optical interconnect speeds at 180K.",
  "MARKETS: Project Amber Bridge clears first $10B multi-currency atomic swap in 380 milliseconds.",
  "CLIMATE: Atacama Basin direct lithium extraction accord signed with zero-evaporation mandate.",
  "AEROSPACE: Cislunar automated microgravity foundry extrudes 500km of ultra-pure ZBLAN optical fiber.",
  "MEDICINE: Geneva Compact establishes open-weights verification treaty for diagnostic artificial intelligence.",
];

export const MOCK_LIVE_STATS: LiveStat[] = [
  {
    id: "stat-1",
    label: "Active Dispatches",
    value: 4892,
    prefix: "#",
    description: "Verified field dispatches published across global bureau terminals.",
    trend: "+2.4%",
  },
  {
    id: "stat-2",
    label: "Telemetry Latency",
    value: 380,
    suffix: "ms",
    description: "Mean clearing latency across sovereign Amber Bridge settlements.",
    trend: "ACTIVE",
  },
  {
    id: "stat-3",
    label: "Global Bureaus",
    value: 28,
    suffix: " hubs",
    description: "Independent editorial offices operating from Reykjavik to Tokyo.",
    trend: "ACTIVE",
  },
  {
    id: "stat-4",
    label: "Cryptographic Attestations",
    value: 99.98,
    suffix: "%",
    description: "Articles verified with public SHA-256 provenance hashes.",
    trend: "CRITICAL",
  },
];

export const MOCK_SPLIT_FLAP_ITEMS: SplitFlapItem[] = [
  {
    id: "flap-1",
    time: "14:52 UTC",
    category: "GLOBAL",
    headline: "MALACCA QUANTUM CORRIDOR ACTIVE - MARITIME LANES VERIFIED",
    status: "DISPATCHED",
  },
  {
    id: "flap-2",
    time: "14:48 UTC",
    category: "DEEPTECH",
    headline: "100-TB PHOTONIC WAFER PASSES GRENOBLE CRYOGENIC TRIAL",
    status: "CONFIRMED",
  },
  {
    id: "flap-3",
    time: "14:35 UTC",
    category: "MARKETS",
    headline: "AMBER BRIDGE CLEARS $10B SWAP - SPREAD COMPRESSED BY 90%",
    status: "BREAKING",
  },
  {
    id: "flap-4",
    time: "14:12 UTC",
    category: "CLIMATE",
    headline: "ATACAMA BASIN ZERO-EVAPORATION COMPACT ENTERS INTO FORCE",
    status: "CONFIRMED",
  },
  {
    id: "flap-5",
    time: "13:59 UTC",
    category: "AEROSPACE",
    headline: "ORBITAL CISLUNAR SMELTER COMPLETES 500KM ZBLAN RUN",
    status: "UPDATING",
  },
  {
    id: "flap-6",
    time: "13:40 UTC",
    category: "POLICY",
    headline: "GENEVA RATIFIES MANDATORY OPEN WEIGHTS FOR DIAGNOSTICS",
    status: "DISPATCHED",
  },
];
