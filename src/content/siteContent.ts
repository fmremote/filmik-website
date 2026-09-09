/**
 * Filmik's editable website copy. Keep wording changes in this file so the
 * presentation components can stay focused on layout and interaction.
 */
export const siteContent = {
  navigation: {
    links: [
      { href: "#solutions", label: "For Stunt Departments" },
      { href: "#performers", label: "For Performers" },
      { href: "#workflow-video", label: "Workflow" },
      { href: "#workflow", label: "How It Works" },
      { href: "#pricing", label: "Plans" },
    ],
    workflowCta: "Workflow",
    signInCta: "Sign In",
    requestAccessCta: "Request Access",
    mobile: {
      title: "Request access",
      description: "Tell us who you are and which department you work in to request an invitation.",
      workflowCta: "Watch the Workflow",
      pricingCta: "View Plans",
    },
  },
  hero: {
    announcement: "Built for stunt departments. Connected to production.",
    headline: ["The Stunt Department Workflow", "for Film & TV Production"],
    description: "Keep your team, talent, scene information, and production coordination in one permission-based workspace.",
    requestAccessCta: "Request Access",
    workflowCta: "Watch the Workflow",
    proof: ["Built around real stunt department workflows", "Permission-based access for every collaborator"],
    videoModalTitle: "See how Filmik supports the stunt department workflow",
  },
  trustedBy: {
    heading: "Built by production professionals for the teams that keep sets moving.",
    companies: ["Feature & episodic workflows", "Department-led collaboration", "Permission-based by design"],
  },
  solutions: {
    eyebrow: "Built for the stunt department",
    heading: ["Run the work.", "Share only what production needs."],
    cards: [
      { title: "Your Department, In One Place", tagline: "One platform, one location, always current.", features: ["Intelligent file architecture", "Dynamic visibility", "Final presentation folders"] },
      { title: "Scene Cards", tagline: "Keep action-scene information organized in collaborative cards the right team members can access and share.", features: ["One organized scene view", "Share with the right team", "Built for review and updates"] },
      { title: "Submission Board", tagline: "Present performer and asset options in a polished review experience.", features: ["Portfolio presentation", "Submission kits", "Frictionless selection"] },
      { title: "Calendars & Scheduling", tagline: "Schedule your team, organize production dates, and keep everyone aligned as the schedule changes.", features: ["Team and department views", "Reuse schedule details", "Clear time-zone updates"] },
    ],
    learnMore: "Learn more",
  },
  platformFeatures: {
    eyebrow: "Built for the work on set",
    heading: ["The tools your department uses.", "The control production needs."],
    cards: [
      ["Projects", "Keep department work organized around the projects and people involved."],
      ["Script Breakdown", "Organize scene-by-scene information for the action department."],
      ["Calendars", "Production schedules and timeline coordination across your entire team."],
      ["Scene Cards", "Keep scene-specific information and equipment at a glance."],
      ["General Documents", "Centralized document management, version control, and secure sharing."],
      ["Media", "Asset management for all production media, organized by scene and department."],
      ["Memos", "Internal production communication with read receipts and threaded replies."],
      ["Notifications", "Stay updated on every production change with intelligent alerts."],
      ["Member Directory", "Searchable crew and talent directory with roles, availability, and contact info."],
      ["Public Profiles", "Professional performer profiles and portfolios discoverable by coordinators."],
      ["Submission Boards", "Talent submission management, side-by-side review, and collaborative decisions."],
      ["Automated Workflows", "Tools that help reduce repetitive setup work. Details coming soon."],
    ],
  },
  coordinator: {
    eyebrow: "Department-led collaboration",
    heading: ["Your department.", "One controlled workspace."],
    description: "Start with the stunt department, then bring in production and other department heads with exactly the access they need.",
    cards: [
      ["Managing projects", "Centralized project hub"], ["Submission Boards", "Review talent with ease"], ["Sharing files", "Secure, instant sharing"],
      ["Assigning calendars", "Team-wide scheduling"], ["Managing scenes", "Visual scene tracking"], ["Action Breakdown", "Days of work in minutes"],
    ],
    mockup: { url: "app.filmik.io/productions/project-x", navigation: ["Dashboard", "Scene Cards", "Submissions", "Calendar", "Documents"], stats: [["Scenes", "42"], ["Submissions", "18"], ["Crew", "31"], ["Shoot Days", "12"]] },
  },
  performers: {
    eyebrow: "For Performers",
    heading: ["A Profile Built", "for Getting Hired"],
    description: "Build one professional hub for your experience, skills, media, photos, reels, and project-ready files. Keep your materials organized, choose what to share for each opportunity, and make your work discoverable to the people doing the hiring.",
    profile: { stats: [["Credits", "24"], ["Self-Tapes", "8"], ["Views", "1.2k"]], url: "https://app.filmik.io/tim.connolly", copyCta: "Copy" },
    features: ["Bio & Skills", "Photo Gallery", "Video Reel", "Self-Tape", "Submission Kit", "Hair & Makeup", "Wardrobe Kit", "Credits", "Shareable URL"],
    closing: ["One profile. One link.", "Ready when the right opportunity comes up."],
  },
  workflow: {
    cards: [
      ["Command Center", "Your Department, In One Place", "See active work, upcoming needs, and team activity without jumping between spreadsheets, texts, and folders.", "Live sync"],
      ["Scene Information", "Scene Cards", "Keep scene-specific information, equipment, notes, and department details in one clear view.", "42 scenes"],
      ["Team Review", "Submission Board", "Review talent and submissions with the right people involved, organized in one shared place.", "18 pending"],
      ["Time Management", "Calendars & Scheduling", "Production calendars that sync across your entire team. From shoot days to production meetings - keep everyone on the same schedule.", "Synced"],
    ],
    explorePrefix: "See",
    productUrl: "filmik.io",
  },
  pricing: {
    eyebrow: "Choose Your Plan",
    heading: "Plans for talent, department heads, and production teams.",
    funnel: { eyebrow: "Free-trial funnel", heading: "Start on the pricing wall, not in a sales queue.", steps: [["Pick your role", "Coordinator, producer, or performer pricing tuned to your workflow."], ["Choose the fastest path", "Jump into the recommended plan first, then compare the rest."], ["Start your trial", "No credit card required to begin your 7-day free trial."]] },
    recommended: { eyebrow: "Recommended first click", unlockHeading: "What you unlock", cta: "Compare plans", supportingCopy: "Best starting point for teams ready to replace spreadsheets with one shared production workspace.", badge: "Recommended" },
    footerNote: "All paid plans start with a 7-day free trial. No credit card required to explore the workflow first.",
  },
  testimonials: {
    eyebrow: "What Filmik members say", heading: ["Built around the people", "doing the work."],
    cards: [
      ["Whether you’re Stunt Coordinating a Commercial, Music Video, TV Show or a Feature film, Filmik is a game changer.\n\nThis platform is helping our profession to streamline our work flow with every department in production. With all of the added tasks we are asked of in the industry, Filmik has made my job easier with an assistant and without one.\n\nTime is precious while in production so do yourself a favor and have Filmik in your life.", "TJ White", "Stunt Coordinator / 2nd Unit Director", "T Minus Productions", "TW"],
      ["Innovative, efficient, and user friendly. Filmik seamlessly connects departments by replacing the laborious workflows we’ve grown accustomed to using with a central database that can be accessed company wide.\n\nFrom an assistant director’s perspective, interdepartmental communication is now simplified. The “middleman problem” is alleviated as departments can directly interact utilizing Filmik’s resources updated in real-time. As a result, creative visions are more easily implemented with less obstruction or errors.\n\nI look forward to the day when Filmik becomes an industry wide standard!", "Chris Haley", "Assistant Director", "", "CH"],
      ["Filmik is the future of efficiency, accessibility and organization in the film industry.\n\nAs a stunt coordinator it allows for me to share information easily with the touch of a button and that’s just the beginning!\n\nThis app is the game changer we need in this industry.", "Greg Rementer", "Second Unit Director / Stunt Coordinator", "", "GR"],
    ],
  },
  community: {
    eyebrow: "Community", heading: ["Join the", "Community"], description: "Stay connected with production professionals worldwide. Learn, share, and grow together.", exploreCta: "Explore",
    cards: [["Industry News", "Stay current with the latest from film & TV - casting trends, studio news, and production updates."], ["Industry Events", "Production workshops, networking events, and community meetups for film professionals."], ["Product Updates", "Be the first to know about new features, improvements, and releases across Filmik."], ["Stunt Previz Showdown", "Annual community competition showcasing the best stunt previsualization work from our members."], ["Release Notes", "Detailed changelog with every fix, improvement, and addition to the Filmik platform."]],
  },
  finalCta: {
    eyebrow: "Bring Your Department Together", heading: ["Less chasing information.", "More time", "doing the work."], description: "See how Filmik helps stunt departments stay organized, share the right details, and coordinate with production without giving up control of the workspace.", benefits: ["Department-led collaboration", "Permission-based by design"], primaryCta: "Request Access", secondaryCta: "Watch the Workflow", note: "Built for department-led collaboration. Permission-based by design.",
  },
  requestAccess: {
    title: "Request Access", description: "Tell us about your role and department. We will follow up with the right next step for your team.", successEyebrow: "Request received", successHeading: "Thanks - we received your request.", successDescription: "Our team will review your details and follow up soon.", fields: { name: "Name", namePlaceholder: "Your full name", email: "Email", emailPlaceholder: "me@company.com", department: "Which film department do you belong to?", departmentPlaceholder: "Select your department" }, departments: ["Stunts", "Production", "Casting", "Directing", "Camera", "Art Department", "Costume", "Hair & Makeup", "Sound", "Post-Production", "Performer", "Other"], note: "We will be in touch with next steps.", submitCta: "Request Access",
  },
  footer: {
    description: "Filmik helps stunt departments organize their work, manage access, and coordinate with the production teams around them.",
    newsletter: { heading: "Stay updated", description: "New features, industry news, and updates - no spam.", placeholder: "Enter your email", cta: "Subscribe" },
    linkGroups: [
      { title: "Product", links: [["For Stunt Departments", "#solutions"], ["The Filmik Directory", "#directory"], ["How It Works", "#workflow"], ["Plans", "#pricing"]] },
      { title: "Resources", links: [["Platform Features", "#features"], ["Community", "#news"], ["Contact", "mailto:hello@filmik.com"]] },
      { title: "Company", links: [["About Filmik", "https://www.linkedin.com/company/filmikio"], ["Request Access", "#request-access"], ["Privacy", "https://app.termly.io/policy-viewer/policy.html?policyUUID=2a58c3f5-4008-4ef9-b878-9c494ecd5598"]] },
    ],
    legalLinks: ["Privacy", "Terms", "Cookies"],
  },
} as const;
