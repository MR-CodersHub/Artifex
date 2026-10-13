/**
 * Artifex Academy — Central Data Repository
 * Realistic data for courses, modules, assignments, instructors, student showcase, blog, and pricing.
 */

window.ArtifexData = {
  academy: {
    name: "Artifex Academy",
    tagline: "The Premier Online Atelier for Illustrators & Visual Artists",
    foundingYear: 2021,
    studentCount: "14,800+",
    completionRate: "94%",
    instructorCount: "38 World-Class Artists",
    contactEmail: "admissions@artifexacademy.com",
    supportEmail: "studentdesk@artifexacademy.com",
    phone: "+1 (888) 478-ARTX",
    studioAddress: "Artifex Studio Hub, 420 Atelier Blvd, San Francisco, CA"
  },

  currentUser: {
    id: "usr_aurora",
    name: "Aurora Sterling",
    role: "student",
    email: "aurora.sterling@studio.artifex.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&crop=top&w=300&h=300&q=80",
    enrolledCourses: ["course_digital_mastery", "course_watercolor_light", "course_figure_anatomy"],
    currentPlan: "All-Access Atelier",
    planStatus: "Active",
    billingCycle: "Annual",
    nextBillingDate: "December 14, 2026",
    paymentMethod: "Visa ending in 4829",
    overallProgress: 68,
    completedLessons: 42,
    totalAssignedLessons: 62,
    pendingAssignments: 2,
    unreadFeedback: 1,
    preferredMedium: "Digital Illustration & Watercolor",
    skillLevel: "Intermediate",
    bio: "Visual storyteller exploring light, fantastical ecology, and character emotional depth."
  },

  courses: [
    {
      id: "course_digital_mastery",
      title: "Digital Illustration Masterclass: From Gesture to Polished Render",
      shortTitle: "Digital Illustration Masterclass",
      slug: "digital-illustration-masterclass",
      instructorId: "inst_elena",
      instructorName: "Elena Rostova",
      instructorRole: "Former Lead Visual Dev Artist, Riot & Netflix",
      instructorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&crop=faces&w=300&h=300&q=80",
      medium: "Digital Illustration",
      skillLevel: "Intermediate",
      duration: "12 Weeks",
      lessonsCount: 36,
      studentsCount: 3420,
      rating: 4.95,
      reviewsCount: 680,
      badge: "Flagship Course",
      price: "$280",
      enrolled: true,
      progress: 72,
      coverImage: "https://i.pinimg.com/1200x/7d/3e/0f/7d3e0f2049d1f3c3342d707a8b967c09.jpg",
      description: "Master modern digital painting workflows: from expressive gesture thumbnails and lighting temperature to intricate surface rendering and emotional focal points.",
      learningOutcomes: [
        "Construct dynamic silhouettes with anatomical grounding and expressive gesture",
        "Control tonal values with precision using digital greyscale value blocks",
        "Master digital brush economy, blending modes, and custom palette creation",
        "Direct viewer eye-movement using compositional staging and edge control",
        "Render materials realistically: iridescent metals, weathered leather, and luminous skin",
        "Complete a portfolio-ready narrative keyframe with studio-ready delivery standards"
      ],
      materialsNeeded: [
        "Drawing tablet (Wacom, iPad Procreate, or Huion display)",
        "Photoshop, Clip Studio Paint, or Procreate",
        "High-res reference library (provided in resources)"
      ],
      modules: [
        {
          id: "mod_1",
          number: 1,
          title: "Anatomy of the Gesture & Dynamic Silhouette",
          description: "Deconstructing organic weight, rhythmic line-of-action, and silhouette readability.",
          duration: "4.5 hours",
          lessons: [
            { id: "les_1_1", title: "1.1 The Rhythmic Line & S-Curve Dynamics", duration: "32 min", completed: true, locked: false, videoSrc: "sample_stream_1" },
            { id: "les_1_2", title: "1.2 Silhouette Economy: Reading at 10% Scale", duration: "48 min", completed: true, locked: false, videoSrc: "sample_stream_2" },
            { id: "les_1_3", title: "1.3 Landmark Anatomy: Shoulders, Pelvis & Core", duration: "55 min", completed: true, locked: false, videoSrc: "sample_stream_3" },
            { id: "les_1_4", title: "1.4 Practical Exercise: 20 Gesture Speed Studies", duration: "40 min", completed: true, locked: false, videoSrc: "sample_stream_4" }
          ]
        },
        {
          id: "mod_2",
          number: 2,
          title: "Value Structure & Lighting Direction",
          description: "Organizing your canvas into distinct value clusters: Key, Midtone, and Deep Occlusion.",
          duration: "5.2 hours",
          lessons: [
            { id: "les_2_1", title: "2.1 The 3-Value Read Strategy for Concept Keyframes", duration: "38 min", completed: true, locked: false, videoSrc: "sample_stream_5" },
            { id: "les_2_2", title: "2.2 Ambient Occlusion vs. Directional Sun Key", duration: "52 min", completed: true, locked: false, videoSrc: "sample_stream_6" },
            { id: "les_2_3", title: "2.3 Painting Cast Shadows with Color Vibration", duration: "45 min", completed: true, locked: false, videoSrc: "sample_stream_7" },
            { id: "les_2_4", title: "2.4 Assignment: 3 Value Thumbnail Variations", duration: "35 min", completed: true, locked: false, videoSrc: "sample_stream_8" }
          ]
        },
        {
          id: "mod_3",
          number: 3,
          title: "Color Temperature & Chromatic Harmony",
          description: "Harnessing complementary shifts, gamut masking, and warm vs cool light interactions.",
          duration: "6.0 hours",
          lessons: [
            { id: "les_3_1", title: "3.1 Gamut Masking: The Secret to Controlled Hues", duration: "42 min", completed: true, locked: false, videoSrc: "sample_stream_9" },
            { id: "les_3_2", title: "3.2 Subsurface Scattering in Organic Creatures", duration: "60 min", completed: true, locked: false, videoSrc: "sample_stream_10" },
            { id: "les_3_3", title: "3.3 Atmospheric Perspective: Golden Hour to Twilight", duration: "50 min", completed: false, locked: false, current: true, videoSrc: "sample_stream_11" },
            { id: "les_3_4", title: "3.4 Color Roughs Demonstration with Elena", duration: "55 min", completed: false, locked: false, videoSrc: "sample_stream_12" }
          ]
        },
        {
          id: "mod_4",
          number: 4,
          title: "Brush Economy & Edge Hierarchy",
          description: "Balancing razor-sharp focus with impressionistic loose brushwork.",
          duration: "4.8 hours",
          lessons: [
            { id: "les_4_1", title: "4.1 Lost & Found Edges: Directing the Viewer's Eye", duration: "44 min", completed: false, locked: false, videoSrc: "sample_stream_13" },
            { id: "les_4_2", title: "4.2 Custom Textured Chalk & Bristle Brushes", duration: "36 min", completed: false, locked: false, videoSrc: "sample_stream_14" },
            { id: "les_4_3", title: "4.3 Layer Stack Efficiency for Fast Industry Revisions", duration: "40 min", completed: false, locked: false, videoSrc: "sample_stream_15" },
            { id: "les_4_4", title: "4.4 Mid-Course Checkpoint Submission", duration: "30 min", completed: false, locked: false, videoSrc: "sample_stream_16" }
          ]
        },
        {
          id: "mod_5",
          number: 5,
          title: "Surface Rendering & Material Tactility",
          description: "Rendering weathered gold, silk, water reflections, and natural foliage.",
          duration: "5.5 hours",
          lessons: [
            { id: "les_5_1", title: "5.1 Specular Highlights & Roughness in Metals", duration: "52 min", completed: false, locked: true, videoSrc: "sample_stream_17" },
            { id: "les_5_2", title: "5.2 Drapery & Fabric Physics in Motion", duration: "48 min", completed: false, locked: true, videoSrc: "sample_stream_18" },
            { id: "les_5_3", title: "5.3 Painting Foliage & Environment Details", duration: "50 min", completed: false, locked: true, videoSrc: "sample_stream_19" },
            { id: "les_5_4", title: "5.4 High-Res Polish Speedrun", duration: "45 min", completed: false, locked: true, videoSrc: "sample_stream_20" }
          ]
        },
        {
          id: "mod_6",
          number: 6,
          title: "Capstone Project: Narrative Portfolio Illustration",
          description: "Complete your final cinematic illustration with instructor critique & portfolio export.",
          duration: "7.0 hours",
          lessons: [
            { id: "les_6_1", title: "6.1 Pitching Your Visual Story & Brief", duration: "35 min", completed: false, locked: true, videoSrc: "sample_stream_21" },
            { id: "les_6_2", title: "6.2 Final Composition Setup & Polish Pass", duration: "70 min", completed: false, locked: true, videoSrc: "sample_stream_22" },
            { id: "les_6_3", title: "6.3 Color Grading, Noise & Chromatic Aberration", duration: "40 min", completed: false, locked: true, videoSrc: "sample_stream_23" },
            { id: "les_6_4", title: "6.4 Portfolio Presentation & Art Station Readiness", duration: "45 min", completed: false, locked: true, videoSrc: "sample_stream_24" }
          ]
        }
      ]
    },
    {
      id: "course_watercolor_light",
      title: "Luminous Watercolors: Wet-on-Wet & Pigment Flow",
      shortTitle: "Luminous Watercolors",
      slug: "luminous-watercolors-mastery",
      instructorId: "inst_mateo",
      instructorName: "Mateo Silva",
      instructorRole: "International Plein Air Master & Botanist",
      instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&crop=top&w=300&h=300&q=80",
      medium: "Watercolor",
      skillLevel: "All Levels",
      duration: "8 Weeks",
      lessonsCount: 24,
      studentsCount: 2150,
      rating: 4.98,
      reviewsCount: 430,
      badge: "Bestseller",
      price: "$220",
      enrolled: true,
      progress: 45,
      coverImage: "https://i.pinimg.com/736x/e5/02/c8/e502c8192e2997100daca95279f49957.jpg",
      description: "Embrace the unpredictable poetry of watercolor. Learn timing, water ratios, granulating pigments, and translucent layering for atmospheric light.",
      learningOutcomes: [
        "Master paper saturation, wet-into-wet blending, and edge timing",
        "Harness granulating mineral pigments for rich tactile textures",
        "Preserve white paper highlights without relying on heavy gouache masking",
        "Paint complex reflections and twilight sky gradients effortlessly"
      ]
    },
    {
      id: "course_character_story",
      title: "Dynamic Character Design & Visual Storytelling",
      shortTitle: "Dynamic Character Design",
      slug: "dynamic-character-design",
      instructorId: "inst_suki",
      instructorName: "Suki Chen",
      instructorRole: "Senior Character Designer & Manga Author",
      instructorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&crop=top&w=300&h=300&q=80",
      medium: "Character Design",
      skillLevel: "Intermediate",
      duration: "10 Weeks",
      lessonsCount: 30,
      studentsCount: 2890,
      rating: 4.92,
      reviewsCount: 512,
      badge: "Popular",
      price: "$260",
      enrolled: false,
      progress: 0,
      coverImage: "https://i.pinimg.com/736x/3a/4c/1f/3a4c1f03525a8e9447ec7afe4b108dfb.jpg",
      description: "Create memorable characters brimming with personality, cultural nuance, kinetic pose energy, and costume design that breathes life into stories.",
      learningOutcomes: [
        "Develop original character archetypes with distinct shape psychology",
        "Design expressive turnaround sheets, facial emotion matrices, and action poses",
        "Integrate costume history, props, and subtext into silhouettes"
      ]
    },
    {
      id: "course_figure_anatomy",
      title: "Foundations of Classical Drawing & Human Anatomy",
      shortTitle: "Classical Drawing Foundations",
      slug: "classical-drawing-foundations",
      instructorId: "inst_julian",
      instructorName: "Julian Vance",
      instructorRole: "Classical Atelier Academician & Draughtsman",
      instructorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&crop=faces&w=300&h=300&q=80",
      medium: "Drawing",
      skillLevel: "Beginner",
      duration: "6 Weeks",
      lessonsCount: 18,
      studentsCount: 4210,
      rating: 4.96,
      reviewsCount: 890,
      badge: "Essential",
      price: "$190",
      enrolled: true,
      progress: 88,
      coverImage: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80",
      description: "Build unshakeable draughtsmanship fundamentals: structural perspective, cross-contour hatching, skeletal landmarks, and confident graphite control.",
      learningOutcomes: [
        "Draw accurately from life and imagination using constructive geometric masses",
        "Map core shadow boundaries, cast shadows, and subtle mid-tone transitions",
        "Render the human skull, torso torsion, and hands with anatomical confidence"
      ]
    },
    {
      id: "course_concept_env",
      title: "Atmospheric Concept Art & Worldbuilding Environments",
      shortTitle: "Concept Art Environments",
      slug: "concept-art-environments",
      instructorId: "inst_elena",
      instructorName: "Elena Rostova",
      instructorRole: "Lead Visual Dev Artist",
      instructorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&crop=faces&w=300&h=300&q=80",
      medium: "Concept Art",
      skillLevel: "Advanced",
      duration: "10 Weeks",
      lessonsCount: 28,
      studentsCount: 1780,
      rating: 4.94,
      reviewsCount: 310,
      badge: "Advanced",
      price: "$290",
      enrolled: false,
      progress: 0,
      coverImage: "https://i.pinimg.com/1200x/ff/7b/a4/ff7ba43df7d7e803487132cd897dda6d.jpg",
      description: "Learn high-end matte painting techniques, architectural worldbuilding, 3D block-in integration, and cinematic light scenarios for games and films.",
      learningOutcomes: [
        "Design believable fantastical architecture and geological formations",
        "Compose complex multi-layered depth with fog, dust particles, and occlusion",
        "Integrate photo textures seamlessly without breaking painterly unity"
      ]
    },
    {
      id: "course_mixed_media",
      title: "Contemporary Mixed Media & Expressive Sketchbooking",
      shortTitle: "Mixed Media Sketchbooking",
      slug: "contemporary-mixed-media",
      instructorId: "inst_chloe",
      instructorName: "Chloe Dubois",
      instructorRole: "Parisian Mixed Media Artist & Gallerist",
      instructorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&crop=faces&w=300&h=300&q=80",
      medium: "Mixed Media",
      skillLevel: "All Levels",
      duration: "6 Weeks",
      lessonsCount: 16,
      studentsCount: 1640,
      rating: 4.89,
      reviewsCount: 245,
      badge: "Creative Freeform",
      price: "$180",
      enrolled: false,
      progress: 0,
      coverImage: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80",
      description: "Break creative blocks through bold ink wash, collaged ephemera, acrylic gouache, and fearless tactile experimentation in your personal art journal.",
      learningOutcomes: [
        "Combine conflicting mediums safely without muddiness or paper warping",
        "Cultivate an authentic, unmistakable visual voice through daily sketchbook prompts",
        "Transform spontaneous mistakes into focal compositional triumphs"
      ]
    }
  ],

  instructors: [
    {
      id: "inst_elena",
      name: "Elena Rostova",
      specialty: "Concept Art & Digital Painting",
      experience: "14 Years Studio Experience",
      bio: "Elena served as visual development artist on award-winning animated features and blockbuster AAA titles. Her teaching emphasizes dynamic story beats, painterly color temperature, and professional studio discipline.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&crop=faces&w=400&h=400&q=80",
      philosophy: "Every brushstroke must serve emotion before technique. The greatest concept art tells an unforgettable story in three seconds.",
      courses: ["course_digital_mastery", "course_concept_env"],
      studentArtworkCount: 420
    },
    {
      id: "inst_mateo",
      name: "Mateo Silva",
      specialty: "Traditional Watercolor & Botanical Illustration",
      experience: "18 Years International Exhibitions",
      bio: "Born in Seville and trained in Madrid, Mateo is celebrated for his luminous plein air landscapes and intricate biological folios. His workshops have inspired thousands across 4 continents.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&crop=top&w=400&h=400&q=80",
      philosophy: "Watercolor is not about control; it is an intimate conversation with water, gravity, and sunlight.",
      courses: ["course_watercolor_light"],
      studentArtworkCount: 310
    },
    {
      id: "inst_suki",
      name: "Suki Chen",
      specialty: "Character Design & Comic Storyboarding",
      experience: "11 Years Graphic Novel & Animation Industry",
      bio: "Suki creates kinetic, highly expressive character designs blending Eastern manga traditions with Western cinematic pacing. Author of three published graphic novels.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&crop=top&w=400&h=400&q=80",
      philosophy: "If your character does not have internal contradictions and posture that speaks before words, redesign them.",
      courses: ["course_character_story"],
      studentArtworkCount: 512
    },
    {
      id: "inst_julian",
      name: "Julian Vance",
      specialty: "Academic Draughtsmanship & Renaissance Figure",
      experience: "22 Years Classical Atelier Education",
      bio: "Julian studied at the Florence Academy of Art and has mentored generations of concept artists in the foundational rigor of line, sight-size drawing, and constructive anatomy.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&crop=faces&w=400&h=400&q=80",
      philosophy: "Mastery of the human figure is the highest gateway to artistic freedom in any digital or physical medium.",
      courses: ["course_figure_anatomy"],
      studentArtworkCount: 680
    },
    {
      id: "inst_chloe",
      name: "Chloe Dubois",
      specialty: "Mixed Media, Collage & Creative Play",
      experience: "12 Years Gallerist & Editorial Illustrator",
      bio: "Chloe's tactile, multi-layered works have graced the covers of European literary reviews and high-fashion magazines. She specializes in guiding blocked artists back to childlike creative bravery.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&crop=faces&w=400&h=400&q=80",
      philosophy: "Perfectionism is the enemy of wonder. Tear the paper, layer the ink, and discover what your soul wanted to say.",
      courses: ["course_mixed_media"],
      studentArtworkCount: 290
    }
  ],

  studentArtworks: [
    {
      id: "art_1",
      title: "Solitude in the Neon Canopy",
      creator: "Aurora Sterling (You)",
      medium: "Digital Illustration",
      category: "Digital",
      relatedCourse: "Digital Illustration Masterclass",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      date: "Oct 8, 2026",
      status: "Feedback Available",
      visibility: "Public Showcase",
      likes: 184,
      critiqueScore: "9.6 / 10",
      caption: "Final project for Module 2: experimenting with cold cyan backlight against warm crimson rim lighting."
    },
    {
      id: "art_2",
      title: "Morning Mist over Sintra's Pines",
      creator: "Liam Gallagher",
      medium: "Watercolor",
      category: "Watercolor",
      relatedCourse: "Luminous Watercolors",
      image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
      date: "Oct 2, 2026",
      status: "Approved",
      visibility: "Public Showcase",
      likes: 242,
      critiqueScore: "9.8 / 10",
      caption: "Granulating cobalt turquoise and raw sienna wet-on-wet study of Portuguese mountain morning light."
    },
    {
      id: "art_3",
      title: "The Clockwork Astrologer",
      creator: "Kenji Takahashi",
      medium: "Character Design",
      category: "Character",
      relatedCourse: "Dynamic Character Design",
      image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80",
      date: "Sep 28, 2026",
      status: "Approved",
      visibility: "Public Showcase",
      likes: 310,
      critiqueScore: "9.7 / 10",
      caption: "Costume turnaround exploring brass astrolabe silhouettes and worn velvet drape textures."
    },
    {
      id: "art_4",
      title: "Torso Torsion & Classical Sanguine Study",
      creator: "Amara Okonjo",
      medium: "Drawing",
      category: "Drawing",
      relatedCourse: "Foundations of Classical Drawing",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80",
      date: "Sep 22, 2026",
      status: "Approved",
      visibility: "Public Showcase",
      likes: 195,
      critiqueScore: "9.5 / 10",
      caption: "Sight-size 2-hour graphite & Conté pencil drawing focusing on anatomical landmarks of the spine."
    },
    {
      id: "art_5",
      title: "Forgotten Temple of the High Steppe",
      creator: "David Novak",
      medium: "Concept Art",
      category: "Digital",
      relatedCourse: "Atmospheric Concept Art",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
      date: "Sep 15, 2026",
      status: "Approved",
      visibility: "Public Showcase",
      likes: 418,
      critiqueScore: "9.9 / 10",
      caption: "Scale-driven visual development matte study utilizing golden hour aerial perspective."
    },
    {
      id: "art_6",
      title: "Botanical Memories: Pressed Fern & Gouache",
      creator: "Sophie Moreau",
      medium: "Mixed Media",
      category: "Mixed Media",
      relatedCourse: "Contemporary Mixed Media",
      image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80",
      date: "Sep 10, 2026",
      status: "Approved",
      visibility: "Public Showcase",
      likes: 275,
      critiqueScore: "9.4 / 10",
      caption: "Layered Japanese washi paper, walnut ink, and acrylic gouache botanical journal spread."
    },
    {
      id: "art_7",
      title: "Echoes in the Rain: Cyberpunk Alley",
      creator: "Marcus Rivera",
      medium: "Digital Illustration",
      category: "Digital",
      relatedCourse: "Digital Illustration Masterclass",
      image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80",
      date: "Aug 29, 2026",
      status: "Approved",
      visibility: "Public Showcase",
      likes: 382,
      critiqueScore: "9.7 / 10",
      caption: "Reflective puddle rendering and specular neon rim lighting exercise from Module 3."
    },
    {
      id: "art_8",
      title: "Venetian Canal at Golden Bell",
      creator: "Elena Rossi",
      medium: "Watercolor",
      category: "Watercolor",
      relatedCourse: "Luminous Watercolors",
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80",
      date: "Aug 20, 2026",
      status: "Approved",
      visibility: "Public Showcase",
      likes: 334,
      critiqueScore: "9.6 / 10",
      caption: "Preserving raw Arches paper white for water highlights while dropping French Ultramarine in wet washes."
    }
  ],

  assignments: [
    {
      id: "assign_1",
      title: "Hero Character Silhouette & 3 Color Variations",
      courseId: "course_digital_mastery",
      courseTitle: "Digital Illustration Masterclass",
      module: "Module 2: Value Structure & Lighting Direction",
      dueDate: "Oct 24, 2026",
      status: "Feedback Available", // Not Started, In Progress, Submitted, Under Review, Feedback Available, Revision Requested, Approved
      submittedDate: "Oct 10, 2026",
      fileFormats: "PSD, TIFF, PNG, JPG (Max 50MB)",
      uploadedArtwork: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80",
      fileName: "Aurora_Sterling_Module2_SilhouetteStudy.png",
      studentNotes: "Focused on achieving high contrast in the focal area around the visor. I felt unsure if the warm orange bounce light was overwhelming the cool rim.",
      instructorFeedbackId: "fb_1"
    },
    {
      id: "assign_2",
      title: "Atmospheric Courtyard Matte Study",
      courseId: "course_digital_mastery",
      courseTitle: "Digital Illustration Masterclass",
      module: "Module 3: Color Temperature & Chromatic Harmony",
      dueDate: "Nov 02, 2026",
      status: "Under Review",
      submittedDate: "Oct 12, 2026",
      fileFormats: "PSD, PNG, JPG (Max 50MB)",
      uploadedArtwork: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=900&q=80",
      fileName: "Aurora_Sterling_Courtyard_LightingStudy.png",
      studentNotes: "Submitted the 3 color roughs from lesson 3.3. Used Gamut Masking as suggested by Elena.",
      instructorFeedbackId: null
    },
    {
      id: "assign_3",
      title: "Wet-on-Wet Gradient & Granulation Swatches",
      courseId: "course_watercolor_light",
      courseTitle: "Luminous Watercolors",
      module: "Module 1: Pigment Physics & Paper Preparation",
      dueDate: "Oct 18, 2026",
      status: "Revision Requested",
      submittedDate: "Oct 06, 2026",
      fileFormats: "High-Res Photo / Scan (PNG, JPG)",
      uploadedArtwork: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=900&q=80",
      fileName: "Aurora_Watercolor_WashTest_Revision1.jpg",
      studentNotes: "First attempt at 300gsm cold-pressed cotton paper with French Ultramarine & Burnt Umber.",
      instructorFeedbackId: "fb_2"
    },
    {
      id: "assign_4",
      title: "Renaissance Sight-Size Skull & Core Shadow Map",
      courseId: "course_figure_anatomy",
      courseTitle: "Foundations of Classical Drawing",
      module: "Module 1: Structural Landmarks",
      dueDate: "Sep 28, 2026",
      status: "Approved",
      submittedDate: "Sep 26, 2026",
      fileFormats: "High-Res Scan (JPG, PNG)",
      uploadedArtwork: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80",
      fileName: "Aurora_Sterling_SkullSightSize_Final.jpg",
      studentNotes: "Completed on toned Strathmore paper with white charcoal highlights.",
      instructorFeedbackId: "fb_3"
    },
    {
      id: "assign_5",
      title: "Final Portfolio Narrative Keyframe",
      courseId: "course_digital_mastery",
      courseTitle: "Digital Illustration Masterclass",
      module: "Module 6: Capstone Project",
      dueDate: "Nov 28, 2026",
      status: "Not Started",
      submittedDate: null,
      fileFormats: "PSD, TIFF, PDF presentation",
      uploadedArtwork: null,
      fileName: null,
      studentNotes: "",
      instructorFeedbackId: null
    }
  ],

  feedbacks: [
    {
      id: "fb_1",
      assignmentId: "assign_1",
      assignmentTitle: "Hero Character Silhouette & 3 Color Variations",
      instructorName: "Elena Rostova",
      instructorRole: "Lead Visual Dev Artist",
      instructorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&crop=faces&w=300&h=300&q=80",
      submissionDate: "Oct 10, 2026",
      feedbackDate: "Oct 12, 2026 (Yesterday)",
      grade: "9.5 / 10 • Exceptional Concept",
      writtenComments: "Aurora, this is a remarkable step forward! Your graphic silhouette readability is razor sharp—the asymmetrical cape design instantly anchors the character's mysterious tone. In thumbnail B, the cyan edge lighting against warm ambient shadow creates hypnotic depth.",
      improvementSuggestions: [
        "Slightly soften the cast shadow under the shoulder pad to maintain focus on the eye landmark.",
        "Your bounce light is slightly too saturated on the cheekbone; drop saturation by 12% so the specular highlight remains the true hero.",
        "Consider grouping the background brushstrokes into broader tonal planes."
      ],
      revisionRequired: false,
      artworkThumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "fb_2",
      assignmentId: "assign_3",
      assignmentTitle: "Wet-on-Wet Gradient & Granulation Swatches",
      instructorName: "Mateo Silva",
      instructorRole: "Watercolor Master",
      instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&crop=top&w=300&h=300&q=80",
      submissionDate: "Oct 06, 2026",
      feedbackDate: "Oct 08, 2026",
      grade: "Revision Requested • Retest Water Ratio",
      writtenComments: "Your pigment choice is gorgeous, Aurora, but you loaded your brush with too much water on swatch #3, causing a backrun (cauliflower bloom) along the upper right perimeter.",
      improvementSuggestions: [
        "Wait 45 seconds longer until the paper has a satin sheen before laying down the second wash layer.",
        "Dab the brush heel once on a dry linen cloth before applying pigment to wet paper.",
        "Please resubmit the 2nd swatch panel following lesson 1.3 demonstration."
      ],
      revisionRequired: true,
      artworkThumbnail: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "fb_3",
      assignmentId: "assign_4",
      assignmentTitle: "Renaissance Sight-Size Skull & Core Shadow Map",
      instructorName: "Julian Vance",
      instructorRole: "Classical Atelier Academician",
      instructorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&crop=faces&w=300&h=300&q=80",
      submissionDate: "Sep 26, 2026",
      feedbackDate: "Sep 28, 2026",
      grade: "Approved with Distinction • 10 / 10",
      writtenComments: "Magnificent discipline. The zygomatic arch landmarks are spot on, and your hatching shows genuine respect for the three-dimensional form. You are thoroughly ready for the musculature module.",
      improvementSuggestions: [
        "Keep your pencil point needle-sharp during the final halftone transitions.",
        "Archive this piece for your Year 1 portfolio milestone."
      ],
      revisionRequired: false,
      artworkThumbnail: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80"
    }
  ],

  pricingPlans: [
    {
      id: "plan_beginner",
      name: "Beginner Studio",
      badge: "Foundational",
      priceMonthly: 24,
      priceYearly: 240,
      description: "Ideal for passionate hobbyists building classical draughtsmanship and foundational visual habits.",
      features: [
        { text: "Access to 6 foundational beginner courses", included: true },
        { text: "Full access to 120+ pre-recorded video lessons", included: true },
        { text: "Curated downloadable brushes & reference packs", included: true },
        { text: "Access to the student community Discord & forums", included: true },
        { text: "Personalized instructor video critiques", included: false },
        { text: "Live bi-weekly masterclass drawing sessions", included: false },
        { text: "Graduation portfolio review & certification", included: false }
      ],
      ctaText: "Start 7-Day Free Trial",
      recommended: false
    },
    {
      id: "plan_all_access",
      name: "All-Access Atelier",
      badge: "Most Popular",
      priceMonthly: 49,
      priceYearly: 490,
      description: "Our comprehensive pass for dedicated artists wanting unrestricted learning and active feedback.",
      features: [
        { text: "Unlimited access to all 38 courses & mediums", included: true },
        { text: "Full high-definition 4K module library (350+ hrs)", included: true },
        { text: "Submit up to 4 assignments per month for critique", included: true },
        { text: "Written & annotated feedback from Artifex instructors", included: true },
        { text: "Access to live bi-weekly masterclass Q&A streams", included: true },
        { text: "Public Student Showcase portfolio profile", included: true },
        { text: "One-on-one portfolio review session (yearly)", included: true }
      ],
      ctaText: "Join All-Access Atelier",
      recommended: true
    },
    {
      id: "plan_master_mentor",
      name: "Master Mentorship",
      badge: "Intensive Studio",
      priceMonthly: 89,
      priceYearly: 890,
      description: "Tailored for aspiring industry professionals aiming for game, film, publishing, or gallery careers.",
      features: [
        { text: "Everything in All-Access Atelier included", included: true },
        { text: "Unlimited assignment submissions with 48h priority review", included: true },
        { text: "Monthly 45-minute 1-on-1 private video mentorship", included: true },
        { text: "Direct line to studio directors (Riot, Pixar, Dark Horse alumni)", included: true },
        { text: "Industry pitch deck & ArtStation portfolio curation", included: true },
        { text: "Physical Artifex Atelier diploma upon course completion", included: true },
        { text: "Private VIP alumni network & studio hiring board", included: true }
      ],
      ctaText: "Apply for Mentorship",
      recommended: false
    }
  ],

  paymentHistory: [
    { id: "inv_2026_10", invoiceNo: "ARX-84920", date: "Oct 14, 2026", amount: "$49.00", plan: "All-Access Atelier (Monthly)", status: "Paid", receiptUrl: "#receipt-oct" },
    { id: "inv_2026_09", invoiceNo: "ARX-79104", date: "Sep 14, 2026", amount: "$49.00", plan: "All-Access Atelier (Monthly)", status: "Paid", receiptUrl: "#receipt-sep" },
    { id: "inv_2026_08", invoiceNo: "ARX-73291", date: "Aug 14, 2026", amount: "$49.00", plan: "All-Access Atelier (Monthly)", status: "Paid", receiptUrl: "#receipt-aug" },
    { id: "inv_2026_07", invoiceNo: "ARX-67102", date: "Jul 14, 2026", amount: "$49.00", plan: "All-Access Atelier (Monthly)", status: "Paid", receiptUrl: "#receipt-jul" }
  ],

  notifications: [
    { id: "notif_1", type: "feedback", title: "New Instructor Critique Received", message: "Elena Rostova left video & annotated notes on your 'Silhouette Study' assignment.", time: "1 hour ago", unread: true },
    { id: "notif_2", type: "assignment", title: "Upcoming Assignment Due Date", message: "Your 'Atmospheric Courtyard Matte Study' is due in 12 days.", time: "1 day ago", unread: false },
    { id: "notif_3", type: "announcement", title: "Live Masterclass with Mateo Silva", message: "Join this Thursday at 6:00 PM UTC for 'Plein Air Pigment Flow Live Demo'.", time: "2 days ago", unread: false },
    { id: "notif_4", type: "billing", title: "Monthly Subscription Receipt", message: "Payment of $49.00 for All-Access Atelier was successfully processed.", time: "3 days ago", unread: false }
  ],

  blogArticles: [
    {
      id: "post_1",
      title: "Mastering Lost and Found Edges: How to Guide the Viewer's Gaze",
      slug: "mastering-lost-and-found-edges",
      category: "Digital Illustration",
      readTime: "7 min read",
      date: "Oct 10, 2026",
      author: "Elena Rostova",
      authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&crop=faces&w=200&h=200&q=80",
      image: "https://i.pinimg.com/1200x/f2/78/29/f278292fc0d92e1817f5e622a90f72e1.jpg",
      excerpt: "Why razor-sharp lines can ruin your painting's emotional power, and how Renaissance masters used soft transitions to create breathing room.",
      tutorialSteps: [
        { step: 1, title: "Identify Your Single Focal Pinnacle", desc: "Before rendering, determine the one point of highest contrast where edges must remain tack-sharp." },
        { step: 2, title: "Group Shadows into Unified Mass", desc: "Blend the shadow edge of your character into the ambient background shadow to unify values." },
        { step: 3, title: "Deploy the Smudge & Textured Rake", desc: "Use a 60% hardness bristle brush to soften turning planes on clothing and foliage." },
        { step: 4, title: "Step Back at 25% Zoom", desc: "If the eye naturally drifts across the silhouette without snagging on trivial noise, your edge hierarchy is solved." }
      ]
    },
    {
      id: "post_2",
      title: "The Alchemy of Granulating Watercolors: Chemistry Meets Poetry",
      slug: "alchemy-of-granulating-watercolors",
      category: "Watercolor",
      readTime: "9 min read",
      date: "Oct 04, 2026",
      author: "Mateo Silva",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&crop=top&w=200&h=200&q=80",
      image: "https://i.pinimg.com/1200x/a5/7f/3d/a57f3d053d02c782aed03e3732a727c8.jpg",
      excerpt: "Explore how mineral pigments like cerulean, cobalt violet, and raw umber settle into the valleys of rough cold-press paper.",
      tutorialSteps: [
        { step: 1, title: "Selecting 100% Cotton Rag Paper", desc: "Cellulose paper repels heavy pigments; 300gsm cold-press cotton allows particles to settle into natural paper crevices." },
        { step: 2, title: "Puddle Consistency vs Tea Consistency", desc: "Granulation requires sufficient standing water to allow heavy mineral oxides to migrate before drying." }
      ]
    },
    {
      id: "post_3",
      title: "Character Silhouette Psychology: Designing Unforgettable Protagonists",
      slug: "character-silhouette-psychology",
      category: "Character Design",
      readTime: "6 min read",
      date: "Sep 27, 2026",
      author: "Suki Chen",
      authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&crop=top&w=200&h=200&q=80",
      image: "https://i.pinimg.com/736x/45/e5/1f/45e51f3376cf24000696cc73addea434.jpg",
      excerpt: "If your protagonist cannot be identified from pure black ink at thumbnail scale, their personality isn't reading. Here is our studio checklist.",
      tutorialSteps: [
        { step: 1, title: "The Three Sacred Shapes", desc: "Circles evoke warmth and innocence; squares imply steadfast reliability; triangles trigger kinetic danger." }
      ]
    },
    {
      id: "post_4",
      title: "Anatomy Without Memorization: Landmark Constructive Method",
      slug: "anatomy-without-memorization",
      category: "Drawing",
      readTime: "8 min read",
      date: "Sep 19, 2026",
      author: "Julian Vance",
      authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&crop=faces&w=200&h=200&q=80",
      image: "https://i.pinimg.com/1200x/02/0c/32/020c325f7888bf6156c9d75843bd8656.jpg",
      excerpt: "Forget Latin medical terms. Master the 7 key bony landmarks that never change regardless of muscle mass or body shape.",
      tutorialSteps: [
        { step: 1, title: "The Clavicular Bow and Sternum", desc: "Anchor the neck and ribcage tilt immediately before sketching arms." }
      ]
    },
    {
      id: "post_5",
      title: "Worldbuilding Through Tonal Mood: Creating Depth in Concept Art",
      slug: "worldbuilding-through-tonal-mood",
      category: "Concept Art",
      readTime: "11 min read",
      date: "Sep 12, 2026",
      author: "Elena Rostova",
      authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&crop=faces&w=200&h=200&q=80",
      image: "https://i.pinimg.com/736x/be/27/cc/be27ccfce59620606c73d415be5c431f.jpg",
      excerpt: "How atmospheric density, haze, and light scattering turn flat landscapes into vast, cinematic worlds.",
      tutorialSteps: [
        { step: 1, title: "Foreground, Midground, Sky Planes", desc: "Establishing strict value steps from 10% black in the foreground to 85% ambient haze at the horizon." }
      ]
    },
    {
      id: "post_6",
      title: "Fearless Sketchbooking: Breaking the Tyranny of the Blank Page",
      slug: "fearless-sketchbooking",
      category: "Mixed Media",
      readTime: "5 min read",
      date: "Aug 30, 2026",
      author: "Chloe Dubois",
      authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&crop=faces&w=200&h=200&q=80",
      image: "https://i.pinimg.com/736x/78/21/ad/7821adcf3ed31f160c4ab4361af67997.jpg",
      excerpt: "Why the prettiest sketchbooks are often the most restrictive, and how collage and ink splatters bring liberation.",
      tutorialSteps: [
        { step: 1, title: "Stain the First Page", desc: "Spill coffee, splatter walnut ink, or paste a train ticket before drawing a single line." }
      ]
    },
    {
      id: "post_7",
      title: "Digital Brushes Demystified: Texture, Flow vs Opacity",
      slug: "digital-brushes-demystified",
      category: "Digital Illustration",
      readTime: "6 min read",
      date: "Aug 14, 2026",
      author: "Elena Rostova",
      authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&crop=faces&w=200&h=200&q=80",
      image: "https://i.pinimg.com/1200x/7e/71/81/7e7181a3f93599ce98df9edf5ccd2e0c.jpg",
      excerpt: "Stop collecting 5,000 brushes. Discover the 4 core brush dynamics that professional concept artists rely on.",
      tutorialSteps: [
        { step: 1, title: "Flow Versus Opacity", desc: "Flow controls how much paint lands per stroke pass; opacity caps total transparency. Professionals ride flow for gradual build-up." },
        { step: 2, title: "The Four Core Dynamics", desc: "Size jitter, opacity jitter, texture grain, and edge hardness cover ninety percent of studio rendering work." },
        { step: 3, title: "The One-Brush Challenge", desc: "Paint a complete study with a single round brush to master pressure control before expanding your library." }
      ]
    }
  ],

  adminOverview: {
    totalStudents: 14820,
    activeLearnersToday: 1845,
    assignmentSubmissionsPending: 38,
    monthlyRecurringRevenue: "$142,680",
    courseCompletionAvg: "94.2%",
    instructorsOnDuty: 14,
    recentEnrollments: [
      { name: "Siddharth Menon", course: "Digital Illustration Masterclass", time: "12 min ago", plan: "All-Access Atelier" },
      { name: "Camilla Lindqvist", course: "Luminous Watercolors", time: "28 min ago", plan: "Beginner Studio" },
      { name: "Ethan Brooks", course: "Dynamic Character Design", time: "1 hour ago", plan: "Master Mentorship" },
      { name: "Hanae Mori", course: "Atmospheric Concept Art", time: "3 hours ago", plan: "All-Access Atelier" }
    ]
  }
};
