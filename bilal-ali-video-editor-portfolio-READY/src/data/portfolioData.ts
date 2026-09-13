import {
  PortfolioProject,
  SpecialtyService,
  ProcessStep,
  TimelineTrack,
} from '../types';

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'project-01',
    projectNumber: '01',
    title: 'Edit 03 — Story-Driven Edit',
    category: 'BRAND CONTENT',
    projectType: 'Concept Edit',
    description:
      'Narrative storytelling format with motion overlays, suspenseful audio ducking, rhythmic sound design, and cohesive thematic color grading.',
    duration: '0:49',
    aspectRatio: '9:16',
    featured: true,
    videoUrl: '/videos/edit-03.mp4',
    fallbackVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-with-neon-lights-and-flying-vehicles-41566-large.mp4',
    posterUrl: '/images/edit-03-cover.jpg',
    tools: ['After Effects', 'Premiere Pro', 'Illustrator'],
    techniques: ['Narrative Arc', 'Motion Graphics', 'Soundscapes', 'Audio Ducking'],
    tags: ['Brand Story', 'Motion Graphics', 'Sound Design', 'Storytelling'],
    metricsOrHighlight: 'Visual Metaphors & Narrative Structure',
    quote: '"Visual storytelling that transforms technical concepts into engaging viewing."',
  },
  {
    id: 'project-02',
    projectNumber: '02',
    title: 'Edit 02 — Social Media Cut',
    category: 'SHORT-FORM',
    projectType: 'Spec Project',
    description:
      'Fast-paced short-form edit featuring tight micro-trims removing dead air, atmospheric b-roll transitions, and high-contrast styling.',
    duration: '0:14',
    aspectRatio: '9:16',
    featured: false,
    videoUrl: '/videos/edit-02.mp4',
    fallbackVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-a-laptop-in-a-dark-room-43093-large.mp4',
    posterUrl: '/images/edit-02-cover.jpg',
    tools: ['Premiere Pro', 'DaVinci Resolve'],
    techniques: ['Micro-Trims', 'B-Roll Sync', 'Atmospheric Grading', 'Dialogue Cleanup'],
    tags: ['Short-Form', 'Micro-Trims', 'B-Roll Timing', 'Color Grade'],
    metricsOrHighlight: 'Cadence Control & Seamless B-Roll',
    quote: '"Removing dead air while preserving natural speech rhythm."',
  },
  {
    id: 'project-03',
    projectNumber: '03',
    title: 'Edit 01 — High-Retention Reel',
    category: 'REELS',
    projectType: 'Portfolio Showcase',
    description:
      'Engineered for maximum viewer retention with dynamic punch-in zooms, synchronized sound effects, kinetic subtitles, and rhythmic pacing.',
    duration: '0:18',
    aspectRatio: '9:16',
    featured: false,
    videoUrl: '/videos/edit-01.mp4',
    fallbackVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-walking-in-a-stadium-tunnel-41724-large.mp4',
    posterUrl: '/images/edit-01-cover.jpg',
    tools: ['Premiere Pro', 'After Effects', 'Audition'],
    techniques: ['Retention Pacing', 'Punch-in Zooms', 'Kinetic Typography', 'Sound Design'],
    tags: ['Reels', 'Retention Pacing', 'Kinetic Text', 'Sound Design'],
    metricsOrHighlight: 'Punch-in Zooms & Keyword Accents',
    quote: '"Every cut has a deliberate purpose — holding attention from the first second."',
  },
  {
    id: 'project-04',
    projectNumber: '04',
    title: 'Edit 04 — Dynamic Short',
    category: 'SOCIAL MEDIA',
    projectType: 'Practice Edit',
    description:
      'High-energy creator-style editing with jump cuts, graphic callouts, timeline-synced visuals, and punchy audio impacts.',
    duration: '0:24',
    aspectRatio: '9:16',
    featured: false,
    videoUrl: '/videos/edit-04.mp4',
    fallbackVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-in-an-office-42646-large.mp4',
    posterUrl: '/images/edit-04-cover.jpg',
    tools: ['Premiere Pro', 'After Effects'],
    techniques: ['Beat Matching', 'Jump Cuts', 'Graphic Callouts', 'SFX Layering'],
    tags: ['Social Media', 'Jump Cuts', 'Graphic Elements', 'Rhythm'],
    metricsOrHighlight: 'Jump Cuts & Visual Anchors Every 2s',
    quote: '"Visual motion engineered so viewers never have a reason to swipe away."',
  },
  {
    id: 'project-05',
    projectNumber: '05',
    title: 'Edit 05 — Pacing & Sound Showcase',
    category: 'CINEMATIC',
    projectType: 'Personal Edit',
    description:
      'Atmospheric color science, emotive pacing, spatial sound design, and subtle typographic styling that builds an immersive cinematic tone.',
    duration: '0:15',
    aspectRatio: '9:16',
    featured: false,
    videoUrl: '/videos/edit-05.mp4',
    fallbackVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fog-over-the-mountains-and-forest-41571-large.mp4',
    posterUrl: '/images/edit-05-cover.jpg',
    tools: ['DaVinci Resolve Studio', 'Audition'],
    techniques: ['Color Science', 'Film Emulation', 'Spatial Audio', 'Subtle Typography'],
    tags: ['Cinematic', 'Color Grading', 'Soundscape', 'Pacing'],
    metricsOrHighlight: 'Rec.709 Color Science & Atmosphere',
    quote: '"Emotion through rhythmic breathing room and sound design."',
  },
];

export const EDITING_SPECIALTIES: SpecialtyService[] = [
  {
    id: 'short-form',
    title: 'SHORT-FORM EDITING',
    tagline: 'Hook within 0.8s, hold until the final frame',
    description:
      'Reels, TikToks, YouTube Shorts and high-retention social content engineered to beat the algorithm with ruthless pacing and custom kinetic graphics.',
    tools: ['Premiere Pro', 'After Effects', 'CapCut Pro'],
    deliverables: ['9:16 Vertical Export', 'Custom Subtitles', 'B-Roll Sourcing', 'Audio Leveling'],
  },
  {
    id: 'cinematic',
    title: 'CINEMATIC EDITING',
    tagline: 'Emotion through rhythm and tone',
    description:
      'Story-driven edits with cinematic pacing, color and sound design. Crafting emotional depth for docu-series, brand films, and personal narratives.',
    tools: ['DaVinci Resolve Studio', 'Premiere Pro'],
    deliverables: ['Custom Film Emulation', 'Seamless Match Cuts', 'Soundscapes', 'Director’s Cut'],
  },
  {
    id: 'social-media',
    title: 'SOCIAL MEDIA CONTENT',
    tagline: 'Fast, bold, and platform-native',
    description:
      'Fast, engaging edits designed specifically for modern social platforms. Content optimized for conversion, shares, and high average watch percentage.',
    tools: ['After Effects', 'Audition', 'Premiere Pro'],
    deliverables: ['Multi-Ratio Variants', 'Engagement Hooks', 'Branded Lower Thirds'],
  },
  {
    id: 'motion-graphics',
    title: 'MOTION GRAPHICS',
    tagline: 'Visualizing ideas that cameras cannot capture',
    description:
      'Dynamic text, transitions, graphics and visual effects. From clean UI mockups to expressive 2D/3D kinetic assets that elevate production value.',
    tools: ['After Effects', 'Cinema 4D', 'Illustrator'],
    deliverables: ['Custom Text Animations', 'Iconography', '3D Asset Overlays', 'Logo Intros'],
  },
  {
    id: 'color-grading',
    title: 'COLOR GRADING',
    tagline: 'Transform flat Log into rich cinema',
    description:
      'Professional color correction and cinematic color styling. Accurate skin tones, rich shadow roll-off, and distinctive aesthetic identity across all cameras.',
    tools: ['DaVinci Resolve', 'Color Management'],
    deliverables: ['Rec.709 Normalization', 'Custom Film Grain', 'Shot Matching', 'Hero Looks'],
  },
  {
    id: 'sound-design',
    title: 'SOUND DESIGN',
    tagline: 'The invisible half of video impact',
    description:
      'Music synchronization, sound effects, audio enhancement and impactful transitions. Layered swooshes, risers, foley, and crystal-clear voice EQ.',
    tools: ['Adobe Audition', 'iZotope RX', 'Ableton'],
    deliverables: ['Dialogue Cleanup', 'Whoosh & Riser Sync', 'Music Ducking', 'Sub Bass Hits'],
  },
];

export const WHY_ME_POINTS = [
  {
    number: '01',
    title: 'ATTENTION TO DETAIL',
    description:
      'Every cut, transition, sound and visual element has a purpose. No accidental frames, no misaligned waveforms, and no sloppy tracking.',
  },
  {
    number: '02',
    title: 'RETENTION-FIRST EDITING',
    description:
      'I edit to keep viewers watching instead of simply making footage look good. Hook timing, audio cues, and visual resets are mathematically timed.',
  },
  {
    number: '03',
    title: 'CLEAN & MODERN',
    description:
      'No unnecessary effects or gimmicky plugins. Every element supports the story, elevating the brand rather than shouting over it.',
  },
  {
    number: '04',
    title: 'STORY + STYLE',
    description:
      'I combine pacing, sound, visuals and motion to create memorable content that viewers actually remember, share, and act on.',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'UNDERSTAND',
    description:
      'Understand the footage, goal, audience and message. Analyzing raw media, defining target retention triggers, and identifying the core hook.',
    details: ['Asset ingest & triage', 'Audience & platform strategy', 'Pacing & tone alignment'],
  },
  {
    step: '02',
    title: 'BUILD',
    description:
      'Create the structure, pacing and storytelling. Cutting the dead air, assembling the narrative spine, and structuring visual peaks.',
    details: ['Assembly cut & rhythm', 'A-roll tightening', 'B-roll storyline insertion'],
  },
  {
    step: '03',
    title: 'POLISH',
    description:
      'Add sound design, color grading, captions and motion. Crafting the aesthetic atmosphere and auditory punch.',
    details: ['Sound design & mix', 'Kinetic typography', 'Color grade & film texture'],
  },
  {
    step: '04',
    title: 'DELIVER',
    description:
      'Final quality check and client-ready delivery. Platform-optimized bitrate encoding with rapid revision turnaround.',
    details: ['Master ProRes / H.264 export', 'Thumbnail frame suggestions', 'Ready to publish'],
  },
];

export const TIMELINE_DATA: TimelineTrack[] = [
  {
    id: 'v3',
    name: 'V3 • GFX / TEXT',
    type: 'effect',
    color: '#ff2a32',
    clips: [
      { id: 'c1', name: 'HOOK_KINETIC_TXT', start: 3, duration: 18 },
      { id: 'c2', name: 'LOWER_THIRD_ID', start: 26, duration: 14 },
      { id: 'c3', name: '3D_CAMERA_ASSET', start: 45, duration: 22 },
      { id: 'c4', name: 'HIGHLIGHT_CALLOUT', start: 72, duration: 16 },
    ],
  },
  {
    id: 'v2',
    name: 'V2 • B-ROLL / CUTAWAY',
    type: 'video',
    color: '#991b1b',
    clips: [
      { id: 'c5', name: 'STADIUM_DRONE_4K', start: 12, duration: 15 },
      { id: 'c6', name: 'STUDIO_CREW_BROLL', start: 38, duration: 19 },
      { id: 'c7', name: 'MOUNTAIN_SUNSET', start: 68, duration: 25 },
    ],
  },
  {
    id: 'v1',
    name: 'V1 • A-ROLL MAIN',
    type: 'video',
    color: '#450a0a',
    clips: [
      { id: 'c8', name: 'SPEAKER_TALKING_LOG', start: 0, duration: 32 },
      { id: 'c9', name: 'INTERVIEW_CLOSE_PUNCH', start: 32, duration: 35 },
      { id: 'c10', name: 'FINAL_STATEMENT', start: 67, duration: 33 },
    ],
  },
  {
    id: 'a1',
    name: 'A1 • DIALOGUE / VO',
    type: 'audio',
    color: '#2563eb',
    clips: [
      { id: 'c11', name: 'MIC_CLEAN_MASTER', start: 0, duration: 42 },
      { id: 'c12', name: 'VO_FINAL_PUNCH', start: 46, duration: 54 },
    ],
  },
  {
    id: 'a2',
    name: 'A2 • SFX / IMPACTS',
    type: 'audio',
    color: '#0284c7',
    clips: [
      { id: 'c13', name: 'SWOOSH_TRANSITION', start: 11, duration: 4 },
      { id: 'c14', name: 'SUB_BOOM_HIT', start: 25, duration: 6 },
      { id: 'c15', name: 'RISER_TENSION', start: 41, duration: 8 },
      { id: 'c16', name: 'POP_SFX_KEYWORD', start: 71, duration: 5 },
    ],
  },
  {
    id: 'a3',
    name: 'A3 • SCORE / BEAT',
    type: 'audio',
    color: '#059669',
    clips: [
      { id: 'c17', name: 'CINEMATIC_PULSE_BED', start: 0, duration: 100 },
    ],
  },
];
