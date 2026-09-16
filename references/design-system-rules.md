# Strict Figma Design System Rules

Version: 2.3  
Status: Working standard  
Language: English  
Primary use case: Review an existing Figma design system  
Platform: Web only

This document is an audit and quality bar for an existing **web** product design system in Figma. It is not a bootstrap kit for a blank file, and it is not an iOS or Android HIG review. Mobile frames in the file are responsive web viewports, not native apps. The assistant reviews what is already in the file, reports findings against these rules, and repairs only after the owner explicitly asks. Project configuration may change, but the operating rules remain mandatory unless an exception is explicitly approved and documented.

The existing project is evidence, not disposable input. Existing variable IDs, component IDs, published APIs, names, and intentional exceptions must be discovered before any target architecture is applied.

Version 2.3 keeps the construction model from 2.2: a composition hierarchy, a 4 px core grid with a controlled 2 px micro-grid, logical three-layer token architecture, explicit property routing, controlled Slot patterns, exposed nested APIs, Preferred instances, separated state dimensions, Variable-driven Light/Dark, token decisions, and a Figma-to-code map when code is in scope. No individual component receives a privileged reference specification. The assistant must not create a new design-system file from scratch.

### Version 2.3 approved decisions

- Restrict this standard to reviewing and, if asked, repairing an existing file. Remove the blank-file creation workflow.
- Inspect Variable modes, palettes, type, icons, frames, and component APIs from the file. Do not interview the owner for facts the file already contains.
- Treat Light and Dark as the default Semantic color modes in Figma Variables. Missing or broken Light/Dark is a finding, not a setup question.
- Inventory extra modes such as brand or high contrast only when they already exist. Do not invent them during review.
- Do not require Figma Code Connect. It is plan-gated and absent from many paid Figma seats. Record it only if the file already uses it.
- A Figma-to-code map is optional. Require it only when the owner requests it or the file already has code syntax. Absence of Code Connect or a code map is not a defect.
- Typography source of truth is Figma Variables. Text Styles bind to those variables for authoring convenience. Components apply Text Styles, not raw values.
- Keep the working project YAML empty and fill it from inspection. Numbers from the guide's example file must not appear as defaults.
- Score every public interactive family with the Figma accessibility checklist in Section 13.1. Do not expand this standard into ARIA or screen-reader implementation.
- Gate A is the review. Gates B–E run only when the owner sets `repairRequested: true`.
- This standard reviews one product design system. Do not require Untitled-style domain shelves such as Base, Product, or Marketing. Composition level is mandatory; file pages follow the actual library.
- This standard is Web only. Do not apply iOS HIG or Android Material constraints. Do not invent `Platform=iOS` or `Platform=Android` modes. A 390 px frame is mobile web unless the file already names a native platform mode.
- Contrast gate is WCAG 2.2 AA using the same luminance-ratio method as Figma's built-in contrast checker: 4.5:1 normal text, 3:1 large text, 3:1 non-text UI. Do not fail a review on APCA. Do not pass contrast by eye. Unmeasured pairs are `unverified`.
- Hit area: below 24 × 24 px is a fail. Primary controls on mobile web should be 44 × 44 px. Dense desktop-only controls may stay at 24 × 24 px when that exception is recorded. Measure the component frame, not the glyph. Unmeasured sizes are `unverified`.
- Do not interview for library consumers during review. Unknown external consumers are not a finding. Before deleting or replacing a published asset, search instances in this file or get owner approval.
- Live Figma inspection (plugin or MCP) is the source of truth. Screenshots are optional visual evidence for a disputed layout, not a review gate. Missing screenshots do not fail a review.

### Version 2.2 approved decisions

- Keep `4 px` as the structural grid and allow a tokenized `2 px` micro-grid only for small internal details.
- Keep percentage line height and percentage letter spacing mandatory in Figma.
- Use hybrid file classification: domain placement plus composition level.
- Allow named functional empty Frames only for approved structural responsibilities.
- Require Primitive, Semantic, and Component as logical token layers while allowing project-specific physical collection layouts.
- Audit file scale first, then ask the owner whether Examples and Templates remain in the system file or move to a separate file.

## 1. AI operating contract

When this document is provided to an AI assistant, the assistant must treat it as a review specification.

Before creating or changing anything, the assistant must:

1. Enter `review-existing` workflow mode. Never bootstrap a new design-system file.
2. Inspect the existing Figma file through the connected Figma plugin or MCP: pages, variables, styles, components, instances, and naming using Section 2.1. Do not review from guesswork or from screenshots alone.
3. Ask only the policy questions in Section 2.2. Do not interview for facts visible in the file.
4. Produce a read-only audit scored against this standard before any structural or library-level change.
5. Default to read-only review. Repair only when the owner explicitly requests it after the audit.
6. Classify any proposed repair as safe, compatibility-sensitive, or destructive.
7. Preserve useful existing work and prefer in-place repair when compatibility matters.
8. Obtain explicit approval before deleting, replacing, renaming, or detaching published assets or changing a public component API.
9. Repair foundations before repairing dependent components.
10. Create component tokens before creating or extending the corresponding component.
11. Repair one component family at a time.
12. Validate each repaired family by inspecting it in Figma before starting the next family.
13. Record every approved exception, repair decision, and compatibility break.

### 1.1 Repair safety rules

- Do not recreate the file from scratch merely because the current structure is inconsistent.
- Do not apply reference colors, typography, dimensions, component axes, or state models blindly.
- Treat current published component and variable IDs as compatibility-sensitive assets.
- Prefer repairing existing Variables and Components in place when their public API can be preserved safely.
- When replacement is necessary, build and validate the replacement in parallel with the old master.
- Redirect documentation and known instances before retiring the old master.
- Never remove an old master while known instances still reference it.
- Do not rename pages, collections, variables, styles, components, properties, or variant values until impact is documented.
- Do not disconnect external libraries or detach instances without explicit approval.
- Preserve current Light/Dark behavior until replacement mode mappings have been verified.
- A failed repair step must leave the last validated system usable.

### 1.2 Required audit output

The default deliverable is a read-only audit. Provide:

- current file and library topology;
- Variables, Styles, Components, and page inventory;
- token-layer map and broken/direct bindings;
- component API and variant matrix inventory;
- layer-hygiene findings;
- accessibility findings against Section 13.1;
- compatibility risks visible in this file;
- findings scored against this standard;
- decisions that require owner approval.

Include a current → target map and a phased repair plan only when the owner has set `repairRequested: true`. Do not produce a repair plan as if writes were already approved.

The assistant must never silently assume a font. It must read font family and weights from Variables first, then Text Styles, then live text. It may ask only when those sources are missing, conflict without a documented exception, or a used weight has no matching variable or style.

## 2. Discovery: inspect first, ask only for policy

This standard reviews an existing design system. The assistant must not interview the owner for facts that are visible in the Figma file. Preserve published IDs and APIs by default.

### 2.1 Read from the file

Once the owner has pointed at the file, record from inspection:

1. Pages, connected libraries, and whether this file is a published library.
2. Project and design-system name from Cover, page names, or the library name.
3. Variable collections, aliases, scopes, and modes. Light and Dark are the default Semantic color modes in Figma Variables. Score their presence and alias health as findings. Do not ask whether Light/Dark "are required".
4. Extra Variable modes only if they already exist: brand, high contrast, density, platform, or other named modes. Record them. Do not invent them. Do not ask whether the owner wants brand or high-contrast themes as part of a standard review.
5. Font family and available weights from Variables first, then Text Styles, then live text on components. Ask only when those sources are missing, mixed without a documented exception, or a used weight has no matching variable or style.
6. Desktop and mobile reference widths from frames, constraints, and width or container tokens. Treat mobile frames as responsive web, not iOS or Android, unless an existing Variable mode is explicitly named for a native platform. Record such a mode in `extraVariableModes`. Do not score the file against HIG or Material.
7. Brand, neutral, and feedback palettes from Variables and Styles.
8. Color scale from primitive names. Do not impose `50–950` unless that is what the file uses.
9. Density from existing modes. If none exist, record a single density.
10. Icon library, family, master size, stroke, and naming. Ask for an approved family only when there is no usable set or families are mixed without an exception.
11. Component families, Slot versus rigid construction, prototypes, keyboard notes, and responsive axes. Use this inventory to decide review order; do not ask for a migration sequence before the audit.
12. Code syntax and Dev Resources if they already exist. Record Code Connect only when the file already contains it. Absence is not a defect.

### 2.2 Ask the owner only for policy

Ask only what the file cannot answer:

1. If multiple sources of truth exist, which one wins for this review: this file, another library, or code tokens?
2. After the audit, may the assistant repair findings, or is the engagement read-only? Default: read-only review.
3. Which accessibility target to score against? Default: WCAG 2.2 AA.
4. If a Figma-to-code map is requested, what framework and token format are the implementation source of truth? Do not require Code Connect.
5. After measuring Examples and Templates, should they stay in this file or move? Do not decide automatically.
6. Are any exceptions to these rules already approved?

If a policy answer cannot be obtained, document the temporary assumption. Do not assume a font. Do not assume permission to write.

## 3. Project configuration template

Fill this block from the file under review. Empty strings, empty arrays, and `null` mean "not yet inspected". Do not copy the example values below into a real review.

```yaml
projectName: ""
workflowMode: review-existing
figmaFile: ""
sourceOfTruth: existing-figma-file
publishedLibrary: null
repairRequested: false
preserveVariableIds: true
preserveComponentIds: true
preserveComponentAPI: true
allowedBreakingChanges: []
platform: web
variableModes: []
extraVariableModes: []
fontFamily: ""
fontWeights: []
desktopFrame: null
mobileFrame: null
colorScale: []
baseGeometryUnit: 4
microGeometryUnit: 2
microGridPolicy: internal-details-only
radii: []
densityModes: null
iconMasterSize: null
iconSource: existing-library
iconFamily: ""
accessibilityTarget: WCAG-2.2-AA
documentationLanguage: English
preservePublishedComponentAPI: true
codeFramework: ""
codeComponentSource: ""
codeTokenSource: ""
codeConnect: not-required
componentComplexityLimit: 30
slotPolicy: controlled
tokenLayers: [primitive, semantic, component]
tokenCollectionStrategy: project-configurable
examplesAndTemplatesLocation: ""
approvedExceptions: []
```

Fields filled from inspection: `projectName`, `figmaFile`, `publishedLibrary`, `variableModes`, `extraVariableModes`, `fontFamily`, `fontWeights`, `desktopFrame`, `mobileFrame`, `colorScale`, `radii`, `densityModes`, `iconMasterSize`, `iconFamily`.

Ask the owner only when the file cannot answer: `repairRequested`, `allowedBreakingChanges`, `codeFramework` if a code map is requested, `examplesAndTemplatesLocation` after measuring the file, `approvedExceptions`.

`baseGeometryUnit`, `microGeometryUnit`, `tokenLayers`, `componentComplexityLimit`, `accessibilityTarget`, and `platform: web` are standard rules, not facts copied from an example file.

Example-only values from the file used while writing this guide — never treat them as the review target:

- Platform: Web.
- Modes found: Light and Dark.
- Font: Inter.
- Frames: 1440 px and 390 px.
- Color scale: 50–950.
- Density: one.
- Icon master: 24 × 24 px.

## 4. Figma file architecture

This standard is for one product design system, not a multi-product kit. Do not require Base / Product / Marketing shelves. Map the current pages first. Do not rename or move compatibility-sensitive pages automatically. Do not invent Marketing, Product, or Base sections if they are not already in the file.

Use separator pages as folder-like categories and `↳` for their child pages when the project owner approves a cleanup.

Example of a single-product library grouped by composition. This is a mapping aid, not a target to impose:

```text
00 · Cover
— Foundations
↳ Overview
↳ Color Primitives
↳ Semantic Colors
↳ Typography
↳ Spacing & Radius
↳ Widths & Containers
↳ Effects & Elevation
↳ Responsive — Light
↳ Responsive — Dark
— Assets
↳ Icons
↳ Logos
— Atoms
↳ Action Control
↳ Form Control
↳ Selection Control
↳ Status Indicator
— Compounds
↳ Search Field
— Sections
↳ Header
— Templates
↳ Authentication Template
— Pages
↳ Registration
— Examples
↳ Component Playground
```

Keep Templates, Pages, and Examples only if they already exist. After the file audit, ask whether Examples and Templates stay in this file or move; never move them without approval.

Rules:

- Each major foundation or component family topic should have its own page when the file already works that way. Do not split a small library into empty shelves.
- Light and Dark semantic colors must be documented together on the same `↳ Semantic Colors` page when that page exists.
- Separator pages remain empty and exist only to create hierarchy.
- Do not keep obsolete dashed separators, duplicate pages, or unnamed pages.
- The only required classification for a reusable UI entity is composition level from Section 11.1: `Primitive`, `Atom`, `Compound`, `Section`, `Template`, or `Page`. Page location is not a second taxonomy.
- Do not use Atomic Design labels `Molecule` or `Organism` for placement or review scoring. `Atom` in this standard means the composition level in Section 11.1, not Brad Frost Atomic Design.
- Neither visual size nor page placement may substitute for dependency analysis.
- A component family must live on one child page. A family may contain multiple public sets, private bases, parts, and Slots; one family does not mean one monolithic Component Set.
- Do not prefix or rename a published component API merely to add its composition level. Page placement and documentation carry the classification unless an API rename is explicitly approved.
- Private support assets must be visibly documented and clearly marked as private; they must not float as unexplained canvas layers.
- Use long documentation frames and readable variant matrices.
- Manual positioning is permitted for the documentation matrix or component-set presentation only. Every component variant inside it must still use Auto Layout.
- In an existing project, page cleanup is performed only after current ownership, links, hand-off usage, and library workflow are understood.

## 5. Geometry: 4 px core grid and 2 px micro-grid

The base geometry unit is `4 px`. A controlled `2 px` micro-grid is available only for small internal details that cannot be expressed faithfully on the core grid.

All structural layout values must be divisible by four:

- spacing;
- gaps;
- padding;
- margins;
- component widths and heights;
- control heights;
- icon frames;
- min/max dimensions;
- layout offsets;
- corner radii.

Allowed examples: `4, 8, 12, 16, 20, 24, 32, 36, 40, 44, 48, 64`.

Micro-grid values such as `2, 6, 10, 14, 18` are allowed only through approved micro tokens and only for internal optical details, compact glyph alignment, small indicator geometry, or component internals where a 4 px value materially harms the result. They are forbidden for page layout, grids, containers, primary gaps, section spacing, component outer dimensions, and arbitrary offsets.

Forbidden values include every value that is neither `4n` nor an approved `2n` micro token. Raw one-off values are forbidden.

Exceptions:

- 1 px borders;
- approved 2 px micro-grid tokens;
- 2 px icon strokes or focus/error borders;
- opacity;
- ratios;
- colors;
- typographic font sizes.

Every micro-grid use must resolve through a named token and be documented at the family level. Any other exception must be approved and documented on the affected token or component.

Do not use the micro-grid when an existing `4n` token can express the design. Do not introduce a new value when an approved core or micro token already exists.

## 6. Auto Layout and layer hygiene

- Every layout-bearing frame must use Auto Layout.
- Every layout-bearing public component and component variant root must use Auto Layout.
- A nested frame is allowed only when it owns a real responsibility: direction, gap, padding, alignment, responsive sizing, clipping, scrolling, overlay anchoring, or a component slot.
- Decorative or spacing-only wrappers are forbidden.
- Figma Groups are forbidden in UI components.
- Empty Frames are allowed only when they have an explicit responsibility as a named Slot region, media placeholder, clipping region, overlay anchor, mask container, or responsive structural region. Every other empty, orphaned, duplicate, unused, or unexplained Frame is forbidden.
- Alternative states must not be stored as hidden frames or duplicate hidden trees.
- Model change through variants, Boolean properties, Text properties, Instance Swap properties, or a separate documented component.
- A hidden node is allowed when its visibility is a public Boolean component property, such as `Show icon`, or when it is a documented internal implementation detail. Do not unhide those nodes or explode them into extra variants just to empty the hidden-layer list.
- Hidden nodes are forbidden when they store unused leftovers, duplicate state trees, or undocumented layers. Hover, pressed, disabled, and other alternative states must not live as hidden copies inside another variant.
- Absolute positioning is allowed only for genuine overlays such as badges, notification dots, floating actions, or decorative overlap.
- Never use absolute positioning to compensate for broken Auto Layout.
- Pure vector, icon, logo, mask, background-media, and decorative masters are exempt from Auto Layout when they do not own layout. They must still define correct resizing, vector constraints, stroke scaling, and optical bounds.

Before publication, the page must contain:

- zero Groups;
- zero unexplained hidden Frames — Boolean-controlled optional layers and documented internal hidden nodes are allowed;
- zero unexplained empty Frames;
- zero unexplained absolute-positioned layers;
- zero redundant wrappers;
- zero duplicate or ambiguous component names.

## 7. Token architecture

Use three logically mandatory layers:

```text
Primitives → Semantic → Component
```

For an existing project, create a mapping table before renaming or replacing tokens:

```text
Current token → Target layer/name → Consumers → Migration action → Compatibility risk
```

Existing aliases that already express the required meaning should be preserved and normalized in place where practical. Raw values must not be duplicated merely to match the examples in this document.

The three layers do not have to be three physical Figma collections. Their physical distribution is project-configurable when all of the following remain explicit: layer ownership, alias direction, supported modes, publishing boundaries, scopes, code mapping, and consumer guidance. The assistant must document the chosen collection strategy before implementation.

### 7.1 Primitives

Primitives contain raw values and must not be used directly in product components.

Examples:

```text
color/brand/600
color/neutral/950
spacing/4
size/40
radius/sm
stroke/1
opacity/disabled
```

Rules:

- Color palettes use the numeric scale found in the file. Do not impose `50–950` unless that is what the primitives already use.
- Values are grouped by palette or value category and sorted sequentially.
- Names describe the raw value, not product meaning.
- Primitive documentation shows name, value, and HEX where applicable.
- Hide Primitive collections from publishing when product designers are not expected to bind UI directly to them. If publishing is required for tooling or code synchronization, document the reason and prevent direct product-component use through scopes and review rules.
- Raw alpha colors, opacity values, shadow colors, and effect values belong in Primitive or dedicated Effects foundations. Do not leave unexplained raw color values inside Semantic or Component namespaces.

### 7.2 Semantic tokens

Semantic tokens describe purpose and alias Primitives.

Examples:

```text
color/background/surface/primary
color/background/brand/hover
color/text/primary
color/text/disabled
color/icon/error
color/border/brand
color/focus-ring/error
```

Rules:

- Light and Dark are modes of the same Semantic collection.
- Product designs bind to Semantic tokens only when no Component layer applies.
- Semantic names must remain stable when raw palette values change.
- Future brand modes must be addable without renaming Semantic tokens.
- Documentation shows Light and Dark values, primitive aliases, raw values, intended use, and misuse warnings.

### 7.3 Component tokens and token decisions

Every new component starts with a documented token decision. Create a component namespace when the component owns a stable visual contract, needs independent evolution, or has component-specific state or dimension decisions:

```text
component/{component-name}/...
```

Examples:

```text
component/action-control/primary/default/background
component/selection-control/selected/focus/border
component/notification/error/content
component/status-indicator/size/md/height
```

Hard rules:

- Record the token decision before creating or extending the component.
- Create the component token namespace before implementation when the component owns component-specific values, state styling, or a stable public token API.
- Component color tokens alias Semantic color tokens.
- Component dimension tokens alias shared Dimension tokens.
- A simple Atom may bind directly to a Semantic token only when no component-specific decision exists and the direct binding is documented. Direct Primitive bindings remain forbidden.
- Do not create meaningless one-to-one component aliases for values that always express an unchanged shared semantic decision.
- When a Component namespace exists, every component-specific tokenizable property binds through that namespace.
- If a required Component token does not exist, create it before applying the visual value.
- Component tokens require descriptions. Record Web code syntax only when it already exists.
- A nested public component may use its own component-token namespace; this must be intentional and documented.
- Documentation-only frames may bind Semantic tokens because they are not shipped component visuals.
- The documentation for every family must state one of: `semantic bindings only`, `component namespace`, or `approved exception`.

### 7.4 Shared dimensions, widths, and containers

Define project-approved shared dimension categories before responsive component work:

```text
spacing/*
radius/*
size/*
width/*
container/max-width/*
container/padding/*
paragraph/max-width/*
effect/*
opacity/*
```

- Width and Container values are project configuration, not universal reference values.
- Container padding must alias approved spacing tokens.
- Component-specific widths alias shared Width or Container tokens when they represent the same decision.
- Breakpoint, viewport, container, and paragraph-width concepts must not be collapsed into one ambiguous token family.
- Record scopes for every dimension variable so Figma exposes it only for valid properties.

### 7.5 Token naming

- Use lowercase slash-delimited namespaces.
- Use purpose before state-specific detail.
- Use stable state names: `default`, `hover`, `pressed`, `focus`, `disabled`, `loading`, `error`, `filled`.
- Never mix `focus` and `focused`.
- Never encode raw HEX values or visual adjectives such as `light-purple` in Semantic or Component names.
- Never append the current Primitive scale to a Semantic or Component token, such as `text-primary (900)` or `background-brand-600`. Alias targets may change without renaming the semantic contract.
- Never create parallel aliases with different spelling for the same meaning.

## 8. Color system

Minimum palette categories:

- Base: white and black.
- Neutral.
- Brand.
- Error.
- Warning.
- Success.
- Additional product palettes only when required.

Rules:

- Define the palette before component work.
- Keep avatars, photography, and content assets outside color-token namespaces.
- Brand tokens drive primary interactions.
- Feedback colors must not communicate meaning through color alone.
- Check every relevant Light and Dark combination before publication.

## 9. Typography

Typography uses this chain:

```text
Variables → Text Styles → text layers in components
```

- Variables are the source of truth for font family, weight, size, line height, and letter spacing.
- Text Styles bind to those variables. They exist for authoring convenience: a designer applies `Body/md` or `Heading/lg` instead of wiring each property by hand.
- Components apply Text Styles. Do not enter raw typographic values on text layers. Do not bind component text directly to Primitive variables when a Text Style already expresses that decision.
- A file with only raw Text Styles and no typography Variables is a finding. A file with Variables but no Text Styles is also a finding: tokens exist, but the apply layer is missing.
- Do not invent a second parallel type system. One variable contract, one set of styles that consume it.
- Figma font size remains a numeric pixel value because Figma does not support percentage font sizes.
- In code, map font-size tokens to `rem`, normally using `16 px = 1rem`.
- Use percentage line height in Figma.
- Map Figma line height to an equivalent unitless ratio in code.
- Use percentage letter spacing in Figma.
- Map letter spacing to `em` in code.
- Resolved line heights should land on the 4 px grid where practical.
- Do not lock browser root font sizing in a way that disables user accessibility scaling.
- Every Text Style needs a description explaining intended use.

Example:

```text
Variable: font/size/16, font/line-height/150, font/letter-spacing/0
Text Style: Body/md → those variables
Figma resolved: 16 px / 150% / 0%
Code:  1rem / 1.5 / 0em
Resolved line box: 24 px
```

## 10. Icon system

- Discover the existing icon library before introducing icons. The project file and any published icon library are the default source.
- This standard does not mandate an external icon catalog. Paid or rate-limited third-party icon services are project policy, not operating rules, and must not be treated as a required source.
- Search by intended meaning and interaction first. Choose an icon that communicates the component action, status, object, or navigation destination without relying on decoration.
- Record one primary icon family already used in the project. Do not mix icon families inside one product or component library unless a documented functional gap is approved.
- Match the selected family's stroke width, corner style, optical weight, grid, and filled/outlined treatment.
- Record the source family and original icon name in the icon master description when they are known. License and attribution remain an owner or legal responsibility; the assistant must not claim that a license was verified.
- Use editable vector geometry in Figma. Do not use screenshots, raster captures, emoji, text glyphs, or manually approximated drawings as substitutes for a library icon.
- If an appropriate semantic icon is not available in the approved project family, stop and ask the designer for the exact icon or approved alternative. Do not silently invent an icon or pull from an unapproved external catalog.
- In an existing project, preserve valid published icon components and their IDs unless replacement is explicitly approved.
- Each icon is a standalone master component.
- Do not put an icon library into one giant variant set.
- Default master size is project-configurable; the reference value is 24 × 24 px.
- Resize icon instances in 4 px steps.
- Lock aspect ratio by default.
- Use one inner layer named `Vector` so overrides survive Instance Swap.
- Vector constraints must be Scale / Scale.
- Use lowercase kebab-case names such as `arrow-right`.
- Remove Groups and unnecessary hidden fills.
- Monochrome icons should use a flattened vector where practical.
- Use tokens or styles for icon color.
- Avoid fractional geometry.
- Document optical exceptions instead of silently breaking the grid.

### 10.1 Semantic icon selection workflow

For every component that requires an icon:

1. Define the semantic role in plain language, for example `submit`, `close`, `expand`, `success`, `warning`, `search`, or `external link`.
2. Search the existing project icon library for that meaning.
3. Stay inside the recorded project-approved icon family.
4. Compare candidate icons at the project master size and in both Light and Dark contexts.
5. Verify that the meaning remains clear without accompanying color.
6. If no suitable icon exists, ask the designer for the asset or an approved exception. Do not browse an external catalog unless the owner has already named that catalog as the project source.
7. Create or reuse the standalone icon master.
8. Name the master with the approved lowercase kebab-case semantic name.
9. Record the original family and icon name when known.
10. Insert the icon into components through Instance Swap; never paste independent vector copies into every variant.

Selection priority:

```text
Correct meaning
→ approved project family
→ accessibility and recognition
→ visual consistency
→ optical fit
```

Visual novelty must never override semantic clarity.

## 11. Component construction rules

### 11.1 Composition hierarchy

Every reusable interface entity must declare its composition level before it is built, repaired, published, or documented.

```text
Primitive → Atom → Compound → Section → Template → Page
```

- **Primitive** — private or public foundation building block with no product responsibility, such as Icon, Text primitive, Surface, or layout primitive.
- **Atom** — smallest reusable control or display entity with one primary responsibility, such as an action control, form control, selection control, status indicator, icon, or avatar.
- **Compound** — a small composition that performs one local task, such as Search Field, Password Field, Select Trigger, Pagination, or Form Field.
- **Section** — a substantial reusable region with one bounded responsibility, such as Header, Navigation, Authentication Form, or Checkout Summary.
- **Template** — a content-agnostic responsive skeleton with regions and Slots.
- **Page** — a concrete product screen with real content, scenarios, and route-specific state.

Do not use Atomic Design `Molecule` or `Organism` for review or placement. Dependency direction in the table below is authoritative.

```text
Primitive → Primitives only
Atom      → Primitives or smaller Atoms
Compound  → Primitives + Atoms
Section   → Primitives + Atoms + Compounds
Template  → Primitives + Atoms + Compounds + Sections
Page      → all approved lower levels + Templates
```

Hard rules:

- Dependencies point downward only; cyclic and upward dependencies are forbidden.
- Classification is based on responsibility and composition, not size.
- A component with unrelated responsibilities must be split before publication.
- Components with different accessibility roles, keyboard behavior, selection models, or code responsibilities must not be merged through a `Type` variant solely because they look similar.
- Reuse approved nested instances; do not duplicate their layers.
- Variant axes must never switch composition level.
- Templates contain placeholders or controlled Slots; Pages contain concrete content.
- Detached copies are not valid composition.
- Documentation records level, purpose, allowed children, direct dependencies, and whether the asset is public or private.

### 11.2 Component family model

A component family is the unit of ownership, documentation, tokens, migration, and testing. A family may contain multiple public Component Sets, public parts, private bases, and Slots.

```text
Action family
├── Action
├── Icon Action
├── Menu Action
├── Split Action
└── _Action Base
```

Hard rules:

- One family lives on one component page and uses one shared state vocabulary and token strategy.
- “One family” never requires one monolithic Component Set.
- Public sets may be split when anatomy, accessibility contract, code API, or variant count differs materially.
- Private bases start with `_`, remain undocumented as public assets, and are never inserted into product screens directly.
- The family page must state why public sets are unified or split.

### 11.3 Required build order

For every component family:

1. Define purpose, composition level, usage, and misuse.
2. Inspect the current Figma API and compatibility constraints. Inspect a code API only when code is in scope under Section 11.11.
3. Define the public family API and state model.
4. Complete the property-routing and token decisions.
5. Create required Component tokens before component-specific values are applied.
6. Create a private base only when it removes real duplication without hiding the public API.
7. Build the smallest representative public variant.
8. Validate Auto Layout, resizing, bindings, and nested-instance behavior.
9. Add properties and only the valid variant combinations.
10. Add Light and Dark previews; theme through Variable modes where possible.
11. Add interactive prototype behavior when it communicates real interaction.
12. Test the family in Component Playground or an equivalent test bench.
13. Run structural, token, accessibility, code-parity, and visual audits in Figma.
14. Obtain owner approval before the next family only when the repair is compatibility-sensitive or destructive. A screenshot is optional if a visual dispute remains.

### 11.4 Mandatory property-routing decision

Use exactly the property type that matches the intended freedom:

| Figma mechanism | Required use |
|---|---|
| VARIANT | Visual or structural differences such as Style, Size, Type, State, or Selection |
| BOOLEAN | Show or hide one optional element without changing the component's responsibility |
| TEXT | Editable plain text content |
| INSTANCE_SWAP | Replace one fixed nested component such as Icon, Avatar, Logo, Flag, or Action |
| SLOT PATTERN | Add, remove, reorder, or freely compose a controlled content region through an approved Figma implementation |
| VARIABLE MODE | Theme, density, or other system-wide configuration already in the file. Do not invent iOS or Android platform modes. |

Hard rules:

- Optional content must not multiply variants when Boolean, Text, or Instance Swap can express it.
- A fixed one-item region uses Instance Swap, not Slot.
- A repeating or free-form content region may use Slot only under Section 11.6.
- `Slot` is an architectural pattern, not an assumed native Component Property type. Never invent a `SLOT` property when the connected Figma API or file does not support one.
- A Variable mode must not replace an explicit user-facing component choice.
- Boolean, String, or Number Variables may drive variant properties on nested instances only when values map exactly and the behavior is documented.
- Deprecated Simplified Instances must not be used. Public nested controls are exposed explicitly.

### 11.5 Component complexity budget

- `1–30` top-level variants: normal range.
- `31–60`: requires a written complexity rationale and complete matrix test.
- `61+`: requires architecture review and explicit owner approval.
- A Cartesian product is forbidden when it creates invalid or unused combinations.
- Variant count must be reduced with properties, nested composition, family splitting, or Slots when those mechanisms preserve a clearer API.
- One public family may contain multiple coordinated Component Sets and private bases. Keeping a family together never justifies a monolithic Cartesian matrix.
- Large sets import and maintain the entire variant family; convenience on the canvas is not sufficient justification.
- Every exception records formula, total count, valid/invalid combinations, performance implications, and code mapping.

### 11.6 Slot policy

Slots provide controlled composition without detaching an instance. A Slot is an architectural contract and may be implemented through exposed nested instances, Instance Swap, public nested properties, a dedicated child component, or a supported native Figma Slot mechanism. The selected implementation must match the connected Figma API and be documented; the assistant must not assume that `SLOT` exists as a Component Property type.

Slots are normally permitted for Card, Modal, Form Section, List, Table region, Empty State, Template region, and comparable containers. Slots are normally forbidden for rigid Atoms such as action controls, selection controls, toggles, status indicators, and icons.

Every Slot requires:

- a semantic name and description;
- allowed content types or preferred components;
- minimum, maximum, empty, overflow, and reorder behavior;
- Auto Layout, sizing, wrapping, and responsive rules;
- Light/Dark validation;
- code mapping to `children`, a named slot, or a compound-component part;
- a test proving that library updates do not require detachment.

A Slot must not turn a public component into an unrestricted Frame. If the content is fixed to one replaceable item, use Instance Swap with Preferred instances.

### 11.7 Nested instances, Preferred instances, and exposed properties

- Every Instance Swap property must define a curated Preferred instances list when the replacement domain is known.
- Preferred lists must not mix semantic icons, logos, flags, illustrations, and unrelated component families.
- Expose nested instance properties that belong to the top-level public API so users do not need deep selection.
- Do not expose every internal property. Expose only the controls required to use the component correctly.
- Order properties from structural choices to content choices: Type, Style, Size, State, Selection, content, visibility, swaps.
- Use the same public property names and defaults across every compatible variant.
- Hidden nested instances must not leave unexplained or unreachable public properties.
- Property identifiers returned by the Figma API may include internal suffixes such as `#3285:0`. Preserve those identifiers during compatibility-sensitive automation, but show the clean public property name without the generated suffix in human-facing documentation.

### 11.8 State model

Do not use `active` as a universal state. Separate independent concerns:

```text
Interaction: default | hover | focus | pressed
Selection:   unselected | selected | indeterminate
Availability: enabled | disabled | read-only
Validation:  none | error | warning | success
Progress:    idle | loading
```

Rules:

- A component receives only the dimensions applicable to its behavior.
- Selection and interaction remain separate so combinations such as `selected + hover` are expressible.
- `focus` represents keyboard or equivalent navigation and must remain visible.
- `read-only` is distinct from `disabled` when the value remains readable or focusable.
- `loading` preserves geometry, prevents duplicate action, and retains an accessible name.
- State names map to the accessibility behavior on the family page. Map them one-to-one to a code API only when code is in scope.

### 11.9 Theme behavior

- Light, Dark, brand, and density are Variable modes whenever they change values rather than anatomy.
- Do not add `Theme=Light|Dark` to every Component Set when Variable modes can resolve the appearance.
- A theme variant is allowed only when the mode changes structure or assets in a way Variables cannot represent.
- Nested instances inherit modes unless a documented local override is required.
- Every family is validated in all supported modes without duplicating arbitrary component matrices.

### 11.10 Mandatory component documentation

Every component family page must visibly document:

- public family and set names;
- composition level and allowed dependencies;
- purpose, usage, and misuse;
- current API and exact valid variant formula;
- every axis and allowed value;
- property-routing summary for Variant, Boolean, Text, Instance Swap, and Slot;
- Preferred instances and exposed nested properties;
- token decision and namespace;
- Light/Dark previews;
- responsive, long-content, empty, loading, and error examples where applicable;
- accessibility and keyboard requirements from Section 13.1;
- Figma-to-code map under Section 11.11 only when code is in scope;
- approved complexity and compatibility exceptions.

Documentation labels use Auto Layout and must remain readable without opening the right sidebar. Do not use Groups, hidden frames, spacer frames, or decorative wrappers to build the matrix.

### 11.11 Figma-to-code contract

This contract is optional. Apply it only when the owner requested a code map or the file already contains Variable code syntax or Dev Resources. Code Connect is not required. Missing Code Connect, missing code syntax, and a missing code map are not review defects.

When code is in scope, map the design API to the implementation API:

```text
Figma property → code prop
Figma value    → code enum/value
Variable       → code token or CSS custom property
Boolean        → boolean prop
Instance Swap  → icon/component prop
Slot           → children, named slot, or compound part
State          → pseudo-class, ARIA state, or application state
```

Hard rules when code is in scope:

- Figma and code use the same semantic names unless a documented mapping exists.
- Do not invent a Figma axis that has no design or code responsibility.
- Record existing Variable code syntax and Dev Resources. Do not add Code Connect mappings.
- A visual match without API and behavior parity is not a complete code handoff. It is still a valid Figma review result.

### 11.12 Validation bench

Before publication, test:

- every public property and valid combination;
- Light and Dark modes;
- minimum, maximum, fixed, fill, hug, wrapping, and overflow behavior;
- long, empty, localized, and imperfect content;
- focus, disabled, read-only, selected, error, and loading behavior where applicable;
- Preferred instances, exposed nested properties, and Slots;
- interactive transitions without impossible prototype behavior;
- instance overrides before and after a library update;
- code API and token parity only when code is in scope;
- the per-family Figma accessibility checklist in Section 13.1.

## 12. Responsive rules

This is a web product. Desktop and mobile frames are responsive web viewports. Do not review the file as iOS or Android. Do not apply HIG, Material, pt, or dp rules. Missing native-platform modes is not a defect.

- Primary reference frames come from the file under review: existing desktop and mobile frames, constraints, and width or container tokens.
- The guide's example file used 1440 px and 390 px. That pair is not a default to impose. Record whatever frames the project already uses. A 390 px frame is mobile web.
- Tablet is optional unless the product already has tablet frames or breakpoints.
- If the file already demonstrates wider layouts, record those widths. Do not add 1920 px or 2560 px frames during review unless they already exist or the owner asks for that repair.
- Use Auto Layout sizing, min/max constraints, wrapping, and responsive token decisions rather than duplicated arbitrary frames.
- Use Variable modes for density or other existing system-wide configuration only when those modes already exist. Do not add a platform mode.
- Responsive component properties must map to a real web breakpoint or container rule; do not create decorative desktop/mobile variants without behavioral meaning.
- Test long, imperfect, localized, empty, loading, and error content.

## 13. Accessibility

Default target: WCAG 2.2 AA. This section scores what is visible in Figma. ARIA, screen readers, and programmatic associations belong to implementation and are out of scope unless already documented on the family page.

### 13.0 Contrast measurement

The failing and passing gate is WCAG 2 contrast ratio, the same method Figma's built-in color-picker checker uses. Do not invent other numeric thresholds. A number such as 4.1:1 is only a measured result; it fails because it is below 4.5:1, not because 4.1 is a standard.

| Content | AA gate (this standard) | AAA (record only, do not fail AA-targeted files) |
|---|---|---|
| Normal text | 4.5:1 | 7:1 |
| Large text (≥24 px, or ≥18.5 px bold) | 3:1 | 4.5:1 |
| Non-text UI: icons, borders, focus rings | 3:1 | — |

Rules:

- Measure the foreground against the background it actually sits on, in both Light and Dark.
- Prefer a project contrast script when one ships with this standard's skill repository. Otherwise use Figma's built-in checker or an equivalent WCAG 2 luminance-ratio calculation.
- Never pass or fail a pair by visual guess. If the pair was not measured, mark it `unverified`.
- APCA (Lc) may be reported as extra signal. It must not fail a library whose target is WCAG 2.2 AA.
- Do not send the assistant to a third-party contrast website as a required step.

Global rules:

- Meaning must never rely on color alone.
- Keyboard operation is mandatory for interactive patterns and must be documented on the family page. The assistant does not need to implement keyboard behavior in Figma.
- Hit area is measured on the component frame, not the icon glyph. Below 24 × 24 px is a fail (WCAG 2.2 AA). Primary controls that appear on mobile web should be at least 44 × 44 px. Dense pointer/desktop-only controls may use 24 × 24 px when that exception is documented on the family. Unmeasured frames are `unverified`. This is a web hit-area check, not an iOS HIG audit.

### 13.1 Per-family Figma checklist

Run this on every public interactive family during review. Decorative or non-interactive primitives skip controls that do not apply; record the skip.

- Focus is a visible state of its own, not only a hover copy. The focus ring remains readable in Light and Dark.
- Text, icons, borders, and the focus ring meet Section 13.0 contrast in both Light and Dark, or are marked `unverified`.
- Error, success, selected, and disabled remain understandable without color: text, icon, stroke, or another non-color cue is present.
- A text label exists as real content. Placeholder text is not the only label.
- An icon-only action has a visible name on the family page (tooltip, adjacent text, or a documented accessible name). Do not leave a bare icon as the only identifier.
- Disabled is distinct from default and from loading. Loading keeps the control geometry and a visible name; the control does not collapse.
- Error includes visible message text, not only a red border or red icon.
- Hit area: frame ≥ 24 × 24 px always; ≥ 44 × 44 px for primary mobile-web controls; 24 × 24 px allowed for documented desktop-only density. Unmeasured frames are `unverified`.
- The family page states the intended keyboard keys (for example Enter, Space, Escape, arrows) without requiring a working prototype.
- Components with different accessibility roles, keyboard models, or selection models are not merged into one set solely because they look similar.

A missing item is a finding on that family. Do not fail the whole library for one family, and do not rewrite ARIA into Figma layers.

## 14. Documentation requirements

Every foundation and component page must include:

- purpose;
- naming;
- token namespace;
- supported modes;
- states and variants;
- component properties;
- usage guidance;
- misuse guidance;
- accessibility notes;
- Light and Dark previews;
- real configuration examples;
- private support assets, if any, clearly labelled;
- a complete variant matrix.

On-canvas documentation does not replace library metadata. Every published Variable, Style, Component, and Component Set must also have a concise metadata description where Figma supports it. Record Web code syntax, Dev Resources, and Code Connect mappings only when they already exist. Do not treat their absence as a defect. Internal Figma property-ID suffixes remain implementation details and must not appear as public documentation labels.

The documentation must also include the family structure, complexity decision, property-routing table, Preferred instances, exposed nested properties, Slot contracts, state dimensions, and validation status where applicable. Include a Figma-to-code mapping only when code is in scope under Section 11.11.

Documentation must remain synchronized with the actual Variables, Styles, and Components. AI-assisted comparison is encouraged, but final human review remains required.

## 15. Review, then repair if asked

Gate A is the default workflow. Gates B–E are a repair protocol. Do not enter Gates B–E unless the owner has set `repairRequested: true` after the audit.

### 15.1 Gate A — review

Perform read-only inspection and score the file against this standard:

1. Inventory pages, libraries, Variables, Styles, Components, and documentation.
2. Record collections, modes, aliases, scopes, descriptions, and code syntax.
3. Map existing colors, spacing, radii, typography, effects, grids, and icons.
4. Audit component axes, states, properties, descriptions, nesting, exposed instances, Preferred instances, Slot implementations, and known instances.
5. Identify raw values, duplicate values, broken aliases, and direct forbidden bindings.
6. Identify naming collisions, legacy conventions, and API compatibility risks.
7. Score each public interactive family with Section 13.1.
8. A node screenshot from the Figma plugin is optional when layout, clipping, or Dark appearance is in dispute. Do not block the review on missing screenshots.
9. Measure the size and ownership of Examples and Templates, then ask the owner whether they remain in the library file or move to a separate file.
10. Deliver the audit. Stop.

No structural or public-API changes are allowed during Gate A. A complete review does not require a repair plan.

### 15.2 Gate B — repair contract

Run this gate only when `repairRequested: true`. Present a repair contract containing:

```text
Scope
Current architecture
Target architecture
Current → target token map
Current → target component API map
In-place repairs
Parallel replacements
Breaking changes
Approved exceptions
Component repair order
Validation and rollback checkpoints
```

Every change must be classified:

- Safe: description, documentation, non-breaking binding repair, or verified visual cleanup.
- Compatibility-sensitive: renaming, property changes, variant-value changes, mode changes, or token moves.
- Destructive: deleting, replacing, detaching, disconnecting a library, or removing a published API.

Compatibility-sensitive and destructive changes require explicit owner approval. Before deleting or replacing a published asset, search instances in this file. If instances exist, do not retire the master. If the file cannot show all usages, get owner approval before the delete. Do not interview for a consumer list during Gate A.

### 15.3 Gate C — foundation repair

1. Preserve and normalize valid existing Primitives.
2. Add missing Primitives without duplicating equivalent values.
3. Repair or create Semantic Light/Dark modes.
4. Verify every alias in both modes.
5. Complete the token decision and create required Component tokens for the first repair target.
6. Produce a before/after token report.
7. Validate representative existing screens before continuing.

Do not repair all components before foundation aliases and modes pass validation.

### 15.4 Gate D — component repair

For each component family in the approved repair scope:

1. Record its existing public API. Search this file for instances of the family.
2. Decide between in-place repair and parallel replacement.
3. Complete the property-routing, complexity, Slot, nested-property, and token decisions.
4. Create missing Component tokens when required by the approved token decision.
5. Build or repair one representative variant.
6. Validate Auto Layout, bindings, Light/Dark, accessibility, and resizing. Validate code parity only when code is in scope.
7. Complete only the valid matrix and configure Preferred instances, exposed nested properties, and Slots where applicable.
8. Redirect documentation and controlled test instances.
9. Run the validation bench in Figma and review update behavior. A plugin screenshot is optional for a visual dispute.
10. Obtain the component checkpoint approval only when the change is compatibility-sensitive or destructive.
11. Continue to the next family only after the checkpoint passes.

### 15.5 Safe replacement protocol

When in-place repair cannot preserve the required architecture:

1. Keep the existing component unchanged.
2. Build the replacement in parallel under a temporary candidate name.
3. Complete structural, token, visual, and accessibility audits on the candidate.
4. Redirect documentation and controlled instances.
5. Verify that no known instances reference the old master.
6. Promote the candidate.
7. Deprecate or remove the old master only after the appropriate approval.

Never delete or replace a published component before its replacement is validated. A failed repair step must leave the last validated version usable.

### 15.6 Gate E — repair validation

1. Run the complete QA checklist in Section 16, including the repair-safety items.
2. Re-inspect representative screens, modes, and aliases in Figma against the Gate A findings. Do not require a screenshot baseline.
3. Verify component properties and responsive examples.
4. Record unresolved risks and intentional exceptions.
5. Produce a final change log.

Required final change-log format:

```text
Changed
Preserved
Deprecated
Removed
Compatibility impact
Known follow-up work
Approved exceptions
```

## 16. Mandatory QA checklist

### Review

- [ ] Existing file and connected libraries were inventoried before any write.
- [ ] The engagement stayed read-only unless `repairRequested` is true.
- [ ] Source of truth is recorded. External library consumers were not required for the review.
- [ ] Findings are scored against this standard.
- [ ] The review used live Figma inspection. Missing screenshots did not fail the review.
- [ ] The review stayed Web-only. iOS HIG and Android Material were not applied. Mobile frames were treated as responsive web.

### Repair safety

Use this block only when `repairRequested: true`.

- [ ] Current → target token and component mappings exist.
- [ ] Proposed changes were classified by risk.
- [ ] Compatibility-sensitive and destructive changes have approval.
- [ ] Published IDs and APIs were preserved or intentionally repaired.
- [ ] Before a published asset was deleted or replaced, instances in this file were searched, or the owner approved the delete.
- [ ] No remaining instances in this file reference a removed master.

### Foundations

- [ ] Project configuration was filled from inspection; policy questions were asked only when the file could not answer.
- [ ] Font family and weights were read from Variables, then Text Styles, then live text.
- [ ] Primitive, Semantic, and Component logical layers exist; their approved physical collection strategy is documented.
- [ ] Light and Dark are modes of the Semantic collection.
- [ ] All aliases resolve.
- [ ] No component binds directly to Primitives; any direct Semantic binding is an approved and documented token decision.
- [ ] Primitive publishing visibility and variable scopes match intended consumers.
- [ ] Raw alpha, opacity, shadow, and effect values live in approved Primitive or Effects foundations.
- [ ] Width, Container, paragraph-width, and responsive dimension tokens are defined where required.
- [ ] Semantic and Component names do not contain HEX values or current Primitive-scale suffixes.
- [ ] Web code syntax and descriptions are recorded if they already exist. Missing code syntax is not a defect.

### Geometry and typography

- [ ] Structural layout geometry follows the 4 px core grid.
- [ ] Every 2 px micro-grid use is limited to a small internal detail, resolves through an approved token, and is documented.
- [ ] No arbitrary value exists outside the approved core and micro scales.
- [ ] Typography follows Variables → Text Styles → component text layers. Raw values on layers are findings.
- [ ] Figma line heights and letter spacing use percentages.
- [ ] Code mappings use rem, unitless line height, and em letter spacing.

### Components

- [ ] Every reusable UI entity declares a Primitive, Atom, Compound, Section, Template, or Page composition level.
- [ ] Dependencies point only to allowed lower levels and contain no cycles.
- [ ] Component families are grouped on pages that match the actual file. Missing Marketing, Product, or Base shelves is not a defect.
- [ ] Classification is based on responsibility and composition, not visual size.
- [ ] No component mixes unrelated responsibilities or uses variants to switch composition levels.
- [ ] Components with different accessibility roles, keyboard behavior, selection models, or code responsibilities are not merged merely because they look similar.
- [ ] Compound components and Sections reuse approved lower-level instances instead of duplicating their layers.
- [ ] Templates are content-agnostic; Pages contain concrete product content.
- [ ] New semantic component icons come from the recorded project icon family or the existing published icon library.
- [ ] One primary icon family is recorded and used consistently.
- [ ] Known source family and original icon name are recorded; the assistant did not claim license verification.
- [ ] Icons are editable vector masters and enter components through Instance Swap.
- [ ] Existing published icon IDs were preserved unless replacement was explicitly approved.
- [ ] Every layout-bearing component node uses Auto Layout.
- [ ] Variant axes and values use consistent names.
- [ ] Variant, Boolean, Text, Instance Swap, Slot patterns, and Variable modes are routed intentionally.
- [ ] Every Instance Swap has Preferred instances when its replacement domain is known.
- [ ] Required nested properties are exposed without exposing internal implementation controls.
- [ ] Every Slot has an explicit supported Figma implementation plus allowed-content, sizing, overflow, responsive, and code contracts.
- [ ] Deprecated Simplified Instances are not used.
- [ ] Every component has a documented token decision and required namespace where applicable.
- [ ] Every public set has a description and usage constraints.
- [ ] Interaction, Selection, Availability, Validation, and Progress are separated where applicable.
- [ ] Loading, focus, error, disabled, read-only, selected, and filled behavior is complete where applicable.
- [ ] Light and Dark previews are correct.
- [ ] Theme uses Variable modes unless a structural exception is documented.
- [ ] The component complexity budget passes and large-count exceptions are explicitly approved.
- [ ] Invalid Cartesian-product combinations were not created.
- [ ] If code is in scope, every public Figma property and value maps to the recorded code API. If code is not in scope, skip this check.

### Layer hygiene

- [ ] No Groups in UI components.
- [ ] No unexplained hidden Frames. Hidden layers bound to a public Boolean property, or documented as internal implementation, are allowed. Hidden leftover layers and hidden alternative-state trees are not.
- [ ] No unexplained empty Frames; approved named Slots, media placeholders, clipping regions, overlay anchors, mask containers, and responsive structural regions are documented.
- [ ] No redundant wrappers.
- [ ] No orphaned private masters.
- [ ] No unexplained absolute positioning.
- [ ] No obsolete pages or separators.

### Accessibility

- [ ] WCAG 2.2 AA is the scoring target unless the owner recorded a different target.
- [ ] Every public interactive family was scored with Section 13.1.
- [ ] Focus is visible and distinct from hover in Light and Dark.
- [ ] Contrast was measured with WCAG 2 ratios (4.5:1 / 3:1), not by eye. Unmeasured pairs are `unverified`. APCA did not fail an AA-targeted file.
- [ ] Error, success, selected, and disabled do not rely on color alone.
- [ ] Labels are real text; placeholders are not the only label.
- [ ] Icon-only actions have a documented visible name.
- [ ] Error includes message text, not only a red border.
- [ ] Hit area: no interactive frame below 24 × 24 px; primary mobile-web controls are 44 × 44 px or a desktop-only exception is recorded. Unmeasured frames are `unverified`.
- [ ] Keyboard keys are documented on the family page.

### Delivery

- [ ] Documentation matches actual variables and components.
- [ ] On-canvas documentation is backed by Figma metadata descriptions. Existing Code Syntax or Dev Resources are recorded; they are not required.
- [ ] The owner decided whether Examples and Templates remain in this file or move to a separate file after reviewing the audit recommendation.
- [ ] Component Playground or an equivalent validation bench covers all public properties and valid combinations.
- [ ] Preferred instances, exposed properties, Slots, overrides, and library-update behavior were tested.
- [ ] Code syntax and Dev Resources are recorded if they already exist. Code Connect is not required.
- [ ] If repair ran, existing instances were updated safely and a change log exists.
- [ ] Final file-wide audit passed.
- [ ] Approved exceptions are recorded.

## 17. Definition of done

### 17.1 Complete review

A review is complete when:

- the project configuration is filled from inspection;
- Gate A ran read-only through live Figma inspection;
- the review was scored as Web only, not iOS or Android;
- findings are scored against Section 17.2;
- Section 13.1 was applied to public interactive families;
- no unapproved writes were made;
- the owner was asked whether repair should follow.

A review may finish with open findings. Open findings are not a failed review.

### 17.2 Quality bar for the existing system

Missing items in this list are findings. They become repair work only when `repairRequested: true`.

- foundations are tokenized;
- Light and Dark modes work through Variables;
- every component has an approved token decision, no Primitive binding, and required Component tokens where component-specific contracts exist;
- structural layouts follow the 4 px core grid and every 2 px micro-grid use is tokenized, limited, and documented;
- typography follows Variables → Text Styles → component text layers;
- component APIs are intentional and documented;
- every reusable entity has a documented composition level and valid dependency direction;
- no cyclic, upward, or mixed-level component dependency remains;
- every component family passes its complexity budget and contains only valid combinations;
- the correct Figma mechanism is used for every Variant, Boolean, Text, Instance Swap, Slot-pattern, and Variable-mode decision without inventing unsupported property types;
- Preferred instances, exposed nested properties, and Slot contracts are complete where applicable;
- Interaction, Selection, Availability, Validation, and Progress states are separated and complete where applicable;
- Light/Dark is controlled through Variable modes unless a structural theme exception is documented;
- Figma properties, Variables, Slots, and states map to the approved code API when code is in scope;
- layer hygiene passes;
- accessibility checks pass against Section 13.1 for every public interactive family;
- responsive web reference frames from the file are documented; native platform modes were not required;
- component families, valid matrices, validation benches, and real examples are visible;
- there are no broken aliases, UI-component Groups, unexplained hidden Frames, hidden alternative-state trees, unexplained empty Frames, or direct forbidden bindings.

### 17.3 Complete repair

Use this block only when `repairRequested: true`. A repair is complete when:

- the repair contract was approved;
- compatibility impact is documented;
- repaired families passed their checkpoints;
- the final change log identifies what changed, remained, was deprecated, and was removed;
- the last validated system remained usable after every step.

## 18. References used to form this standard

- Plane documentation: Figma working rules, Variables, references, and icon guidance.
- Untitled UI FREE Figma UI kit and design system v2.0.
- Untitled UI Figma PRO VARIABLES v8.0, audited as a scale and composition reference; its large variant matrices, mixed naming, missing metadata, and raw-value exceptions are not adopted automatically.
- The validated reference Figma implementation created for this guide.
- Figma Components collection: component properties, variants, nested instances, Slots, Interactive Components, and component management.
- Material Design 3 interaction-state model.
- Carbon Design System component specification, token, state, and accessibility patterns.
- Radix Themes composition, Slot, responsive-property, and compound-component patterns.
- Atlassian Design System foundations and token model.

This document is a reusable review baseline for an existing **web** product design system in Figma. Repair is optional and starts only after owner approval. Do not apply iOS or Android native constraints. Project configuration values and existing APIs may change from project to project; discovery, compatibility analysis, token layering, Auto Layout, layer hygiene, accessibility, checkpoint validation, and safe replacement rules remain mandatory unless an exception is explicitly approved.
