

export const filterManualGuides = () => {
    return manualGuideContent;
};

const manualGuideContent = {
    "keyboard-navigation": [
        {
            "topic": "Keyboard Navigation",
            "summary": "Ensure all interactive elements are fully operable using only a keyboard interface. Essential for users with motor impairments, blind users navigating with screen readers, and power users.",
            "sections": [
                {
                    "title": "Why Keyboard Navigation Matters",
                    "description": "Keyboard navigation is a cornerstone of digital accessibility, ensuring equitable access for an estimated 1.3 billion people globally with disabilities. In the UK, 22% of adults have a disability, and 71% of disabled users rely on assistive technologies like keyboards. Beyond compliance, it fosters universal design, supporting users with temporary impairments (e.g., repetitive strain injury), situational limitations (e.g., holding a child), or preferences for efficiency. The EU Web Accessibility Directive (2016) and UK Public Sector Bodies Accessibility Regulations (2018) legally enforce keyboard accessibility, aligning with WCAG 2.1 standards.",
                    "items": [
                      "Legal Mandates: Required under WCAG 2.1 (Level AA), EU EN 301 549, and the UK Equality Act 2010, which prohibits discrimination against disabled users.",
                      "Disability Impact: Critical for 135 million people in the EU with disabilities, including those with motor impairments, blindness, or conditions like Parkinson’s.",
                      "Screen Reader Dependency: 98% of screen reader users (e.g., JAWS, NVDA) navigate via keyboard.",
                      "Temporary Barriers: Affects users with injuries (e.g., broken wrist), recovering from surgery, or experiencing fatigue.",
                      "SEO & Performance: Accessible sites rank higher in search engines (Google’s SEO guidelines) and reduce bounce rates.",
                      "Progressive Enhancement: Keyboard compatibility is foundational to ARIA roles and semantic HTML, per W3C standards.",
                      "Business Risk: Non-compliance risks fines up to €20 million under the EU Accessibility Act and reputational damage."
                    ]
                  },
                {
                    "title": "Implementation Guidelines",
                    "description": "Practical techniques from W3C's ARIA Authoring Practices and MDN documentation:",
                    "items": [
                        {
                            "description": "Semantic HTML First: Use native elements (<button>, <a>) that have built-in keyboard support",
                            "example": "Bad practice: <div class='button'>Submit</div>\nGood practice: <button type='button'>Submit</button>",
                            "wcag_refs": ["2.1.1", "4.1.2"],
                            "source": "MDN: Keyboard-navigable JavaScript Widgets"
                        },
                        {
                            "description": "Custom Widget Keyboard Patterns: Implement arrow key navigation for components like dropdowns (W3C APG)",
                            "example": "Dropdown should open with Enter/Spacebar, navigate with Arrow keys, close with Escape",
                            "wcag_refs": ["2.1.1"],
                            "source": "W3C ARIA Authoring Practices"
                        },
                        {
                            "description": "Focus Management: Programmatically control focus for dynamic content using .focus() and tabindex=-1",
                            "example": "After opening modal: document.getElementById('modal-close').focus()",
                            "wcag_refs": ["2.4.3"],
                            "source": "WebAIM: Keyboard Accessibility"
                        },
                        {
                            "description": "Skip Links: Add 'Skip to Content' links for users to bypass repetitive navigation",
                            "example": "<a href='#main' class='skip-link'>Skip to main content</a>",
                            "wcag_refs": ["2.4.1"],
                            "source": "WebAIM: Skip Navigation Links"
                        }
                    ]
                },
                {
                    "title": "Testing Protocol",
                    "description": "Comprehensive testing strategy from Deque University and W3C resources:",
                    "items": [
                        {
                            "description": "Basic Navigation Test:",
                            "checks": [
                                "Can complete all actions using only Tab, Shift+Tab, Enter, Spacebar, and Arrow keys?",
                                "Does focus get trapped in any components (modals should trap focus until dismissed)?"
                            ],
                            "source": "W3C WCAG 2.1 Testing Procedures"
                        },
                        {
                            "description": "Advanced Component Testing:",
                            "checks": [
                                "Do custom widgets follow W3C ARIA design patterns?",
                                "Does browser zoom affect keyboard operability?"
                            ],
                            "source": "Deque University Keyboard Testing"
                        }
                    ]
                },
                {
                    "title": "Common Issues & Fixes",
                    "description": "Solutions from common accessibility audits (WebAIM, WAVE):",
                    "items": [
                        {
                            "issue": "Zero tabindex Abuse: <div tabindex='0'> creating unnecessary focus stops",
                            "fix": "Use tabindex='0' only for interactive custom widgets",
                            "source": "MDN: tabindex Documentation"
                        },
                        {
                            "issue": "Hidden Focusable Elements: Off-screen elements still in tab order",
                            "fix": "Use display: none or visibility: hidden instead of CSS positioning",
                            "source": "WebAIM: CSS and Accessibility"
                        }
                    ]
                }
            ],
            "wcag_references": [
                {
                    "guideline": "2.1.1",
                    "title": "Keyboard",
                    "level": "A",
                    "description": "All functionality must be operable through keyboard interface without timing restrictions",
                    "source": "WCAG 2.1 Success Criterion 2.1.1"
                }
            ],
            "resources": [
                {
                    "type": "W3C Standard",
                    "title": "WAI-ARIA Authoring Practices",
                    "url": "https://www.w3.org/WAI/ARIA/apg/"
                },
                {
                    "type": "Video Tutorial",
                    "title": "WebAIM Keyboard Testing",
                    "url": "https://webaim.org/techniques/keyboard/"
                },
                {
                    "type": "Interactive Guide",
                    "title": "MDN Keyboard Navigation",
                    "url": "https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets"
                }
            ]
        }
    ],
    "screen-reader": [
        {
            "topic": "Screen Reader Support & ARIA Labels",
            "summary": "Create accessible experiences for screen reader users through proper semantics, ARIA, and content structure. Affects 2.4% of users (WebAIM Survey 9).",
            "sections": [
                {
                    "title": "Why Screen Reader Support Matters",
                    "description": "Screen readers are essential for over 253 million people globally with visual impairments, including 2 million in the UK and 30 million in the EU. They convert digital content into speech or braille, enabling users to build accurate mental models of interfaces. Compliance with the EU Web Accessibility Directive (EN 301 549) and UK Public Sector Bodies Accessibility Regulations (2018) is mandatory, aligning with WCAG 2.1 Level AA. Beyond legal requirements, robust screen reader support improves usability for situational impairments (e.g., glare on screens) and aging populations (27% of the EU is over 55).",
                    "items": [
                      "Navigation Efficiency: 89% of screen reader users globally rely on headings for navigation.",
                      "ARIA Landmarks: Properly tagged landmarks reduce page scan time by 40% and are required under WCAG 2.1 Success Criterion 1.3.1.",
                      "Form Accessibility: UK Government research shows unlabeled forms cause 68% of errors for blind users.",
                      "Dynamic Content: Live regions (e.g., ARIA alerts) improve comprehension of real-time updates (e.g., chat messages) by 55%.",
                      "Image Recognition: 92% of screen reader users encounter inaccessible images monthly; proper alt text is mandated by EN 301 549 (EU Standard).",
                      "Mobile Usage: 74% of UK screen reader users access content via mobile (RNIB Tech Survey, 2023), requiring responsive semantic markup.",
                      "Cost of Exclusion: Inaccessible sites cost UK businesses £2 billion annually in lost revenue (Scope UK, 2023).",
                      "Multilingual Support: Screen readers must adapt to 24 official EU languages, necessitating lang attribute compliance.",
                      "Education & Employment: 81% of visually impaired EU adults rely on screen readers for remote work.",
                      "Inclusive Design: Semantic HTML (e.g., <nav>, <article>) ensures compatibility with JAWS, NVDA (EU’s most used tools), and VoiceOver (iOS)."
                    ]
                  },
                {
                    "title": "Implementation Guidelines",
                    "description": "Based on W3C ARIA Specifications and WebAIM recommendations:",
                    "items": [
                        {
                            "description": "Landmark Roles: Use ARIA landmarks (banner, main, navigation) for page structure",
                            "example": "<header role='banner'>\n<nav role='navigation'>",
                            "wcag_refs": ["1.3.1"],
                            "source": "W3C WAI-ARIA Landmarks"
                        },
                        {
                            "description": "Dynamic Updates: Use aria-live regions for AJAX content changes",
                            "example": "<div aria-live='polite' id='search-results'></div>",
                            "wcag_refs": ["4.1.3"],
                            "source": "MDN ARIA Live Regions"
                        },
                        {
                            "description": "Form Labels: Associate labels explicitly using for/id binding",
                            "example": "<label for='email'>Email</label>\n<input id='email' type='email'>",
                            "wcag_refs": ["1.3.1"],
                            "source": "WebAIM Form Labels"
                        }
                    ]
                },
                {
                    "title": "Testing Protocol",
                    "description": "Screen reader testing methodology from WebAIM and A11Y Project:",
                    "items": [
                        {
                            "description": "Screen Reader Navigation Tests:",
                            "checks": [
                                "Can navigate using screen reader shortcuts (e.g., H for headings, L for lists)?",
                                "Do images have meaningful alt text (or marked decorative)?"
                            ],
                            "source": "WebAIM Screen Reader Testing"
                        },
                        {
                            "description": "ARIA State Verification:",
                            "checks": [
                                "Do custom widgets announce their state (e.g., 'expanded', 'selected')?",
                                "Are ARIA attributes updated dynamically (e.g., aria-checked for checkboxes)?"
                            ],
                            "source": "W3C ARIA States and Properties"
                        }
                    ]
                },
                {
                    "title": "Common Issues & Fixes",
                    "description": "Solutions from screen reader user feedback (WebAIM Survey):",
                    "items": [
                        {
                            "issue": "Unlabeled Buttons: Icon buttons without text alternatives",
                            "fix": "Use aria-label='Close menu' or visually hidden text",
                            "source": "A11Y Project Icon Buttons"
                        },
                        {
                            "issue": "Empty Links: <a href='#'> with no meaningful text",
                            "fix": "Add screen-reader-only text or aria-label",
                            "source": "WebAIM Accessible Links"
                        }
                    ]
                }
            ],
            "wcag_references": [
                {
                    "guideline": "4.1.2",
                    "title": "Name, Role, Value",
                    "level": "A",
                    "description": "Screen readers must be able to programmatically determine component names and states",
                    "source": "WCAG 2.1 Success Criterion 4.1.2"
                }
            ],
            "resources": [
                {
                    "type": "W3C Standard",
                    "title": "ARIA in HTML",
                    "url": "https://www.w3.org/TR/html-aria/"
                },
                {
                    "type": "User Survey",
                    "title": "WebAIM Screen Reader User Survey #9",
                    "url": "https://webaim.org/projects/screenreadersurvey9/"
                },
                {
                    "type": "Cheatsheet",
                    "title": "A11Y Project Screen Reader Shortcuts",
                    "url": "https://www.a11yproject.com/screen-reader-shortcuts/"
                }
            ]
        }
    ]
};