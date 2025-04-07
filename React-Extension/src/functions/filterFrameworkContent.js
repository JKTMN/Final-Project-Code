/**
 * This function filters the framework content based on the provided rule_id.
 * It returns the content associated with the rule_id if it exists, otherwise returns null.
 * @param {String} rule_id - The rule_id to filter the framework content.
 * @returns the framework content associated with the rule_id or null if not found.
 */
export const filterFrameworkContent = (rule_id) => {
  if(typeof rule_id !== "string") return null;
  return frameworkContent[rule_id] ?? null;
};

const frameworkContent = {
    "aria-allowed-attr": {
    "rule_id": "aria-allowed-attr",
    "issue_explanation": "ARIA attributes are used incorrectly on an element, violating ARIA specification rules. This can cause assistive technologies to misinterpret the element's purpose.",
    "wcag_guidelines": [
        "4.1.2 Name, Role, Value (WCAG 2.1)",
        "ARIA 1.1 Specification"
    ],
    "impact": {
        "severity": "High",
        "description": "Screen reader users may receive incorrect or misleading information about interactive elements."
    },
    "technical_analysis": {
        "failure_conditions": "Fails when an ARIA attribute is used on an element where it is not permitted (e.g., `aria-checked` on a `div`).",
        "common_causes": "Using ARIA attributes without checking ARIA role-attribute relationships."
    },
    "fixes": [
        {
        "step": "Remove invalid ARIA attributes or use a role that supports them.",
        "code_reference": "https://www.w3.org/TR/wai-aria-1.1/#roles"
        },
        {
        "step": "Use semantic HTML elements instead of overriding with ARIA (e.g., `<button>` instead of `<div role='button'>`).",
        "code_reference": "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles"
        }
    ],
    "best_practices": [
        "Always check ARIA 1.1 specification for allowed attributes per role.",
        "Prefer native HTML elements over custom ARIA implementations."
    ],
    "code_examples": {
        "before": "<div role='button' aria-checked='true'>Click me</div> <!-- Invalid: `aria-checked` not allowed on `role=button` -->",
        "after": "<button aria-pressed='true'>Click me</button> <!-- Correct: `aria-pressed` is valid for buttons -->"
    },
    "resources": [
        {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/aria-allowed-attr"
        },
        {
        "title": "WCAG 4.1.2 Success Criterion",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/name-role-value"
        }
    ]
    },
    "aria-allowed-role": {
    "rule_id": "aria-allowed-role",
    "issue_explanation": "This rule checks that ARIA roles are used in a way that conforms to the WAI-ARIA specification. It fails when an element has an ARIA role that is not allowed for that element, which can cause confusion or misinterpretation by assistive technologies.",
    "wcag_guidelines": [
      "4.1.2 Name, Role, Value (Level A)",
      "WAI-ARIA 1.2 Specification"
    ],
    "impact": {
      "severity": "Moderate",
      "description": "Incorrect ARIA roles can mislead users of assistive technologies, such as screen readers, by presenting elements in a way that doesn't match their actual function or state. This can lead to confusion and a poor user experience, particularly for users with visual impairments who rely on accurate role information."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when an element has an ARIA role that is not permitted for that element according to the WAI-ARIA specification.",
      "common_causes": "Common causes include overriding semantic HTML with inappropriate ARIA roles (e.g., adding `role='button'` to a `div` when a `button` element would be more appropriate) or using roles that are not valid for the element's implicit role."
    },
    "fixes": [
      {
        "step": "Step 1: Replace the incorrect ARIA role with a role that is allowed for the element. Refer to the WAI-ARIA specification for valid roles for each element type.",
        "code_reference": "https://www.w3.org/TR/wai-aria-1.2/#roles"
      },
      {
        "step": "Step 2: If no valid role is appropriate, consider using semantic HTML elements that inherently provide the desired role (e.g., use a `button` element instead of a `div` with `role='button'`).",
        "code_reference": "https://www.w3.org/TR/html-aria/"
      }
    ],
    "best_practices": [
      "Always prefer semantic HTML elements over ARIA roles when possible, as they provide built-in accessibility features.",
      "Test your application with assistive technologies to ensure that roles are being interpreted correctly."
    ],
    "code_examples": {
      "before": "<div role=\"button\" onclick=\"submitForm()\">Submit</div> <!-- Fails: 'div' with 'button' role is not recommended -->",
      "after": "<button onclick=\"submitForm()\">Submit</button> <!-- Correct: Using semantic HTML -->"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/aria-allowed-role"
      },
      {
        "title": "WCAG Success Criterion 4.1.2",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html"
      }
    ]
  }, 
    "aria-hidden-body": {
    "rule_id": "aria-hidden-body",
    "issue_explanation": "This rule checks that `aria-hidden='true'` is not applied to the `<body>` element. Doing so hides the entire page from assistive technologies, making it completely inaccessible to screen reader users.",
    "wcag_guidelines": [
      "1.3.1 Info and Relationships (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 1194.22(a)"
    ],
    "impact": {
      "severity": "Critical",
      "description": "When `aria-hidden='true'` is applied to the `<body>`, all content within it becomes invisible to screen readers. This completely blocks access for users who rely on assistive technologies, effectively rendering the page unusable for them."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when the `<body>` element or any ancestor of the `<body>` has `aria-hidden='true'`.",
      "common_causes": "This typically occurs when: 1) A developer mistakenly applies `aria-hidden` to the body to hide a single element, 2) A CMS or framework incorrectly propagates the attribute, or 3) There's confusion between `aria-hidden` and CSS `visibility`/`display` properties."
    },
    "fixes": [
      {
        "step": "Step 1: Remove `aria-hidden='true'` from the `<body>` element immediately.",
        "code_reference": "https://www.w3.org/TR/wai-aria-1.1/#aria-hidden"
      },
      {
        "step": "Step 2: If you need to hide specific elements, apply `aria-hidden='true'` to those individual elements instead, ensuring they're not focusable.",
        "code_reference": "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-hidden_attribute"
      }
    ],
    "best_practices": [
      "Never apply `aria-hidden` to the `<body>` or structural elements containing major content sections.",
      "When hiding elements, consider whether they should remain accessible to keyboard navigation and whether they'll need to be revealed dynamically."
    ],
    "code_examples": {
      "before": "<body aria-hidden='true'>\n  <!-- All content hidden from AT -->\n  <h1>Welcome</h1>\n</body>",
      "after": "<body>\n  <div aria-hidden='true'>\n    <!-- Only this decorative element is hidden -->\n  </div>\n  <h1>Welcome</h1>\n</body>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/aria-hidden-body"
      },
      {
        "title": "WCAG Success Criterion 4.1.2",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html"
      },
      {
        "title": "ARIA Hidden Attribute",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-hidden"
      }
    ]
  }, 
    "aria-hidden-focus": {
    "rule_id": "aria-hidden-focus",
    "issue_explanation": "This rule checks that elements with `aria-hidden='true'` do not contain focusable elements. When focusable elements are hidden from assistive technologies but remain keyboard-navigable, it creates a mismatch between what keyboard users and screen reader users experience.",
    "wcag_guidelines": [
      "1.3.1 Info and Relationships (Level A)",
      "2.1.1 Keyboard (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 1194.21(a)"
    ],
    "impact": {
      "severity": "High",
      "description": "Screen reader users won't be aware of focusable elements that are aria-hidden, while keyboard users can still interact with them. This creates confusion and breaks the expected interaction model, particularly affecting blind users who rely on screen readers."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when an element with `aria-hidden='true'` contains any focusable elements (elements with tabindex >= 0, or natively focusable elements like buttons, links, or form controls).",
      "common_causes": [
        "Hiding interactive modal dialogs or menus without properly managing focus",
        "Using ARIA-hidden to visually hide content without considering keyboard accessibility",
        "Applying aria-hidden to parent elements without checking child focusability"
      ]
    },
    "fixes": [
      {
        "step": "Step 1: Remove `aria-hidden='true'` from elements containing focusable children",
        "code_reference": "https://www.w3.org/TR/wai-aria-1.1/#aria-hidden"
      },
      {
        "step": "Step 2: For temporarily hidden content (like modals), use proper visibility toggling with JavaScript that manages both visual state and ARIA attributes",
        "code_reference": "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/"
      },
      {
        "step": "Step 3: If elements must be hidden from all users, ensure they're also non-focusable by removing tabindex or disabling interactive elements",
        "code_reference": ""
      }
    ],
    "best_practices": [
      "When hiding elements, consider all user interaction modes (visual, keyboard, and screen reader)",
      "For interactive components, use established patterns from WAI-ARIA Authoring Practices",
      "Test keyboard navigation with screen readers to verify consistent behavior"
    ],
    "code_examples": {
      "before": "<div aria-hidden='true'>\n  <button>Submit</button> <!-- Focusable but hidden from AT -->\n</div>",
      "after": "<div> <!-- aria-hidden removed -->\n  <button>Submit</button>\n</div>\n\n<!-- OR for temporarily hidden content -->\n<div class='visually-hidden' hidden>\n  <button>Submit</button>\n</div>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/aria-hidden-focus"
      },
      {
        "title": "WCAG Success Criterion 4.1.2",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html"
      },
      {
        "title": "ARIA Hidden Attribute",
        "url": "https://www.w3.org/TR/wai-aria-1.1/#aria-hidden"
      },
      {
        "title": "Managing Focus in Modal Dialogs",
        "url": "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/"
      }
    ]
  },
    "aria-required-attr": {
    "rule_id": "aria-required-attr",
    "issue_explanation": "This rule checks that elements with ARIA roles have all required attributes for those roles. Missing required ARIA attributes prevent assistive technologies from properly interpreting and announcing element states and properties, breaking accessibility.",
    "wcag_guidelines": [
      "4.1.2 Name, Role, Value (Level A)",
      "WAI-ARIA 1.2 Specification",
      "Section 508 § 1194.22(a)"
    ],
    "impact": {
      "severity": "High",
      "description": "Screen reader users may receive incomplete or misleading information about interactive elements, form controls, or dynamic content regions. This can prevent proper understanding and interaction, particularly affecting users with visual impairments who rely on accurate role and state information."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when an element has an ARIA role but is missing one or more required attributes for that role (e.g., a combobox missing aria-controls, or a slider missing aria-valuenow).",
      "common_causes": [
        "Implementing complex widgets without fully understanding all required ARIA attributes",
        "Copying ARIA role patterns without including all necessary supporting attributes",
        "Dynamic content that updates states without updating corresponding ARIA attributes"
      ]
    },
    "fixes": [
      {
        "step": "Step 1: Identify all required attributes for the element's ARIA role using the WAI-ARIA specification",
        "code_reference": "https://www.w3.org/TR/wai-aria-1.2/#roles"
      },
      {
        "step": "Step 2: Add all missing required attributes with appropriate values",
        "code_reference": "https://www.w3.org/WAI/ARIA/apg/patterns/"
      },
      {
        "step": "Step 3: For dynamic widgets, ensure JavaScript updates all required state attributes when interactions occur",
        "code_reference": ""
      }
    ],
    "best_practices": [
      "Always consult the ARIA Authoring Practices Guide when implementing custom widgets",
      "Use semantic HTML elements instead of ARIA when possible, as they include built-in accessibility features",
      "Test complex widgets with multiple screen readers to verify all required information is conveyed"
    ],
    "code_examples": {
      "before": "<div role='combobox'>\n  <input type='text'>\n</div>",
      "after": "<div role='combobox' aria-expanded='false' aria-haspopup='listbox' aria-controls='listbox1'>\n  <input type='text' aria-autocomplete='list' aria-activedescendant=''>\n  <ul id='listbox1' role='listbox'>\n    <!-- options -->\n  </ul>\n</div>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/aria-required-attr"
      },
      {
        "title": "WCAG Success Criterion 4.1.2",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html"
      },
      {
        "title": "WAI-ARIA Roles and Required Attributes",
        "url": "https://www.w3.org/TR/wai-aria-1.2/#roles"
      },
      {
        "title": "ARIA Authoring Practices Guide",
        "url": "https://www.w3.org/WAI/ARIA/apg/"
      }
    ]
  }, 
    "aria-required-children": {
    "rule_id": "aria-required-children",
    "issue_explanation": "This rule checks that elements with specific ARIA roles contain all required child elements with corresponding roles. Missing required children elements prevents assistive technologies from properly understanding and navigating component structures.",
    "wcag_guidelines": [
      "4.1.2 Name, Role, Value (Level A)",
      "1.3.1 Info and Relationships (Level A)",
      "WAI-ARIA 1.2 Specification",
      "Section 508 § 1194.22(a)"
    ],
    "impact": {
      "severity": "High",
      "description": "Screen reader users may encounter incomplete or confusing component structures, making it difficult to understand relationships between elements or navigate complex widgets effectively. This particularly affects users with visual impairments who rely on proper structural announcements."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when an element with an ARIA role that requires specific child roles (e.g., combobox, listbox, menu, tree) is missing one or more of those required children.",
      "common_causes": [
        "Implementing composite widgets without including all required child components",
        "Using ARIA roles without understanding their required structural relationships",
        "Incomplete implementation of design patterns from WAI-ARIA Authoring Practices"
      ]
    },
    "fixes": [
      {
        "step": "Step 1: Consult WAI-ARIA specification to identify required children for the parent role",
        "code_reference": "https://www.w3.org/TR/wai-aria-1.2/#roles"
      },
      {
        "step": "Step 2: Add all missing required child elements with their proper roles",
        "code_reference": "https://www.w3.org/WAI/ARIA/apg/patterns/"
      },
      {
        "step": "Step 3: Ensure proper parent-child relationships are established using attributes like aria-owns or aria-controls where needed",
        "code_reference": ""
      }
    ],
    "best_practices": [
      "Always implement complete ARIA widget patterns rather than partial implementations",
      "Use the ARIA Authoring Practices Guide as a reference for proper widget structures",
      "Test complex widgets with screen readers to verify structural relationships are properly announced"
    ],
    "code_examples": {
      "before": "<div role='menu'>\n  <!-- Missing required menuitem children -->\n  <button>Action 1</button>\n  <button>Action 2</button>\n</div>",
      "after": "<div role='menu'>\n  <div role='menuitem' tabindex='0'>Action 1</div>\n  <div role='menuitem' tabindex='-1'>Action 2</div>\n</div>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/aria-required-children"
      },
      {
        "title": "WCAG Success Criterion 4.1.2",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html"
      },
      {
        "title": "WAI-ARIA Roles and Required Children",
        "url": "https://www.w3.org/TR/wai-aria-1.2/#roles"
      },
      {
        "title": "ARIA Authoring Practices Guide",
        "url": "https://www.w3.org/WAI/ARIA/apg/"
      }
    ]
  }, 
    "aria-required-parent": {
    "rule_id": "aria-required-parent",
    "issue_explanation": "This rule checks that elements with specific ARIA roles are contained within their required parent elements. When elements requiring specific parent roles are placed incorrectly in the DOM hierarchy, assistive technologies cannot properly interpret their relationships and purpose.",
    "wcag_guidelines": [
      "1.3.1 Info and Relationships (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "WAI-ARIA 1.2 Specification",
      "Section 508 § 1194.22(a)"
    ],
    "impact": {
      "severity": "High",
      "description": "Screen reader users may encounter elements that are announced without proper context or structural relationships, making it difficult to understand component hierarchies and navigation patterns. This particularly affects users who rely on assistive technologies to understand complex widget structures."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when an element with an ARIA role that requires a specific parent role (e.g., menuitem, treeitem, option) is not contained within an element with the required parent role (menu/menubar, tree, listbox/combobox respectively).",
      "common_causes": [
        "Implementing child elements without their required container elements",
        "Breaking ARIA widget patterns by separating related elements",
        "Using ARIA roles without understanding their required hierarchical relationships"
      ]
    },
    "fixes": [
      {
        "step": "Step 1: Identify the required parent role for the element using WAI-ARIA specification",
        "code_reference": "https://www.w3.org/TR/wai-aria-1.2/#roles"
      },
      {
        "step": "Step 2: Wrap the element in a container with the proper parent role or move it to an existing proper parent",
        "code_reference": "https://www.w3.org/WAI/ARIA/apg/patterns/"
      },
      {
        "step": "Step 3: Ensure proper accessibility relationships are maintained using attributes like aria-owns if DOM structure cannot be changed",
        "code_reference": "https://www.w3.org/TR/wai-aria-1.2/#aria-owns"
      }
    ],
    "best_practices": [
      "Always implement complete ARIA widget patterns including all required parent-child relationships",
      "Consult the ARIA Authoring Practices Guide before implementing custom widgets",
      "Test component structures with screen readers to verify proper relationship announcements"
    ],
    "code_examples": {
      "before": "<div role='menuitem'>Standalone Menu Item</div> <!-- Missing required menu parent -->",
      "after": "<div role='menu'>\n  <div role='menuitem'>Properly Nested Menu Item</div>\n</div>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/aria-required-parent"
      },
      {
        "title": "WCAG Success Criterion 4.1.2",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html"
      },
      {
        "title": "WAI-ARIA Parent/Child Relationships",
        "url": "https://www.w3.org/TR/wai-aria-1.2/#roles"
      },
      {
        "title": "ARIA Authoring Practices Guide",
        "url": "https://www.w3.org/WAI/ARIA/apg/"
      }
    ]
  },
    "aria-roles": {
    "rule_id": "aria-roles",
    "issue_explanation": "This rule checks that elements with ARIA roles use valid, non-abstract roles as defined in the WAI-ARIA specification. Invalid roles prevent assistive technologies from properly interpreting and announcing element purposes and relationships.",
    "wcag_guidelines": [
      "4.1.2 Name, Role, Value (Level A)",
      "1.3.1 Info and Relationships (Level A)",
      "WAI-ARIA 1.2 Specification",
      "Section 508 § 1194.22(a)"
    ],
    "impact": {
      "severity": "High",
      "description": "Screen reader users may receive incorrect or no information about an element's purpose and functionality. This can lead to confusion and inability to properly interact with components, particularly affecting users with visual impairments who rely on accurate role announcements."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when an element has: 1) An invalid ARIA role (not in WAI-ARIA specification), 2) An abstract ARIA role (meant only for authoring tool use), or 3) A malformed role value.",
      "common_causes": [
        "Typographical errors in role names",
        "Using deprecated or removed roles",
        "Attempting to use abstract roles meant for browser/internal use only",
        "Incorrectly assuming custom roles can be created"
      ]
    },
    "fixes": [
      {
        "step": "Step 1: Replace invalid roles with valid, non-abstract roles from the WAI-ARIA specification",
        "code_reference": "https://www.w3.org/TR/wai-aria-1.2/#role_definitions"
      },
      {
        "step": "Step 2: For custom widgets, choose the most appropriate semantic role from existing options",
        "code_reference": "https://www.w3.org/WAI/ARIA/apg/patterns/"
      },
      {
        "step": "Step 3: Remove any abstract roles (indicated in WAI-ARIA spec with 'Abstract Role' in their description)",
        "code_reference": ""
      }
    ],
    "best_practices": [
      "Always consult the official WAI-ARIA role definitions before implementing custom roles",
      "Prefer semantic HTML elements over ARIA roles when possible",
      "Test role implementations with multiple screen readers to verify proper announcements"
    ],
    "code_examples": {
      "before": "<div role='buton'>Click me</div> <!-- Typo in role name -->\n<div role='input'>Form field</div> <!-- Invalid role -->\n<div role='window'> <!-- Abstract role -->",
      "after": "<div role='button'>Click me</div> <!-- Correct role -->\n<input type='text'> <!-- Semantic HTML instead of ARIA -->\n<!-- Abstract role removed -->"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/aria-roles"
      },
      {
        "title": "WCAG Success Criterion 4.1.2",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html"
      },
      {
        "title": "WAI-ARIA Role Definitions",
        "url": "https://www.w3.org/TR/wai-aria-1.2/#role_definitions"
      },
      {
        "title": "ARIA Authoring Practices Guide",
        "url": "https://www.w3.org/WAI/ARIA/apg/"
      }
    ]
  },
    "aria-valid-attr-value": {
    "rule_id": "aria-valid-attr-value",
    "issue_explanation": "This rule checks that all ARIA attributes have valid values according to their specifications. Invalid ARIA attribute values can cause assistive technologies to misinterpret or fail to recognize element states and properties, breaking accessibility.",
    "wcag_guidelines": [
      "4.1.2 Name, Role, Value (Level A)",
      "1.3.1 Info and Relationships (Level A)",
      "WAI-ARIA 1.2 Specification",
      "Section 508 § 1194.22(a)"
    ],
    "impact": {
      "severity": "High",
      "description": "Screen reader users may receive incorrect or no information about element states (like expanded/collapsed) or properties (like live regions). This can prevent proper interaction with dynamic content and widgets, particularly affecting users with visual impairments."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when an ARIA attribute has: 1) A value not allowed by its specification, 2) A malformed ID reference, 3) An incorrect token value, or 4) A missing required value.",
      "common_causes": [
        "Typos in attribute values (e.g., 'ture' instead of 'true')",
        "Using incorrect value types (e.g., string instead of boolean)",
        "Referencing non-existent IDs in relationships (aria-labelledby, aria-controls)",
        "Using deprecated or invalid values"
      ]
    },
    "fixes": [
      {
        "step": "Step 1: Verify attribute values against WAI-ARIA specifications",
        "code_reference": "https://www.w3.org/TR/wai-aria-1.2/#state_prop_def"
      },
      {
        "step": "Step 2: Correct malformed values (e.g., ensure boolean attributes use 'true'/'false')",
        "code_reference": "https://www.w3.org/TR/html-aria/#docconformance"
      },
      {
        "step": "Step 3: Validate ID references exist in the DOM",
        "code_reference": ""
      }
    ],
    "best_practices": [
      "Use automated tools like axe-core to validate ARIA attribute values during development",
      "Consult the ARIA Authoring Practices Guide for proper attribute usage",
      "Test dynamic states with screen readers to verify announcements"
    ],
    "code_examples": {
      "before": "<button aria-expanded='ture'>Menu</button> <!-- Typo in boolean value -->\n<div aria-live='urgent'>Updates</div> <!-- Invalid live region value -->\n<div aria-labelledby='missing-id'>Content</div> <!-- Invalid ID reference -->",
      "after": "<button aria-expanded='true'>Menu</button> <!-- Correct boolean -->\n<div aria-live='assertive'>Updates</div> <!-- Valid live region -->\n<div aria-labelledby='existing-id'>Content</div> <!-- Valid reference -->"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/aria-valid-attr-value"
      },
      {
        "title": "WCAG Success Criterion 4.1.2",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html"
      },
      {
        "title": "WAI-ARIA States and Properties",
        "url": "https://www.w3.org/TR/wai-aria-1.2/#state_prop_def"
      },
      {
        "title": "ARIA Authoring Practices Guide",
        "url": "https://www.w3.org/WAI/ARIA/apg/"
      }
    ]
  },
    "aria-valid-attr": {
    "rule_id": "aria-valid-attr",
    "issue_explanation": "This rule checks that all ARIA attributes are valid according to the WAI-ARIA specification. Invalid ARIA attributes can cause assistive technologies to misinterpret or completely ignore important accessibility information.",
    "wcag_guidelines": [
      "4.1.2 Name, Role, Value (Level A)",
      "1.3.1 Info and Relationships (Level A)",
      "WAI-ARIA 1.2 Specification",
      "Section 508 § 1194.22(a)"
    ],
    "impact": {
      "severity": "High",
      "description": "Screen reader users may miss critical information about element states, properties, and relationships. This can lead to confusion and inability to properly interact with components, particularly affecting users with visual impairments who rely on accurate ARIA attribute announcements."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when an element contains: 1) Non-existent ARIA attributes, 2) ARIA attributes not allowed for the element's role, or 3) Misspelled ARIA attributes.",
      "common_causes": [
        "Typos in attribute names (e.g., 'aria-lable' instead of 'aria-label')",
        "Using attributes not supported by the element's role",
        "Implementing deprecated ARIA attributes",
        "Applying ARIA attributes to elements that don't support them"
      ]
    },
    "fixes": [
      {
        "step": "Step 1: Verify attribute names against the WAI-ARIA specification",
        "code_reference": "https://www.w3.org/TR/wai-aria-1.2/#state_prop_def"
      },
      {
        "step": "Step 2: Remove or replace invalid attributes with valid alternatives",
        "code_reference": "https://www.w3.org/WAI/ARIA/apg/patterns/"
      },
      {
        "step": "Step 3: Check role-attribute compatibility using ARIA in HTML specification",
        "code_reference": "https://www.w3.org/TR/html-aria/"
      }
    ],
    "best_practices": [
      "Use semantic HTML elements instead of ARIA when possible",
      "Consult the ARIA Authoring Practices Guide before implementing custom widgets",
      "Test with screen readers to verify attribute announcements"
    ],
    "code_examples": {
      "before": "<div role='button' aria-pressed='true' aria-required='true'>Submit</div> <!-- aria-required not allowed on buttons -->\n<div aria-lable='Close'>X</div> <!-- Misspelled attribute -->",
      "after": "<div role='button' aria-pressed='true'>Submit</div> <!-- Removed invalid attribute -->\n<div aria-label='Close'>X</div> <!-- Corrected spelling -->"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/aria-valid-attr"
      },
      {
        "title": "WCAG Success Criterion 4.1.2",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html"
      },
      {
        "title": "WAI-ARIA States and Properties",
        "url": "https://www.w3.org/TR/wai-aria-1.2/#state_prop_def"
      },
      {
        "title": "ARIA in HTML",
        "url": "https://www.w3.org/TR/html-aria/"
      }
    ]
  },
    "avoid-inline-spacing": {
    "rule_id": "avoid-inline-spacing",
    "issue_explanation": "This rule checks that text spacing can be adjusted without loss of content or functionality. Inline spacing styles (like line-height, letter-spacing, or word-spacing) that are hard-coded with !important or inline styles can prevent users from overriding these styles to meet their readability needs.",
    "wcag_guidelines": [
      "1.4.12 Text Spacing (Level AA)",
      "1.4.4 Resize Text (Level AA)",
      "EN 301 549 V3.2.1 (2021-03) - 11.8.2"
    ],
    "impact": {
      "severity": "Moderate",
      "description": "Users with low vision or reading disabilities who need to adjust text spacing for readability may be unable to do so when spacing is rigidly enforced. This can make content difficult or impossible to read for these users."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when text spacing properties (line-height, letter-spacing, word-spacing) are applied inline or with !important declarations that override user stylesheets.",
      "common_causes": [
        "Using inline styles for text spacing (e.g., style='line-height: 1.2')",
        "Applying !important to spacing properties in CSS",
        "Fixed spacing values that don't adapt to user preferences",
        "Overriding browser default spacing without providing alternatives"
      ]
    },
    "fixes": [
      {
        "step": "Step 1: Move spacing styles to external CSS without !important declarations",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/css/C36"
      },
      {
        "step": "Step 2: Use relative units (em, rem, %) instead of fixed pixels for spacing",
        "code_reference": "https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units"
      },
      {
        "step": "Step 3: Test with the Text Spacing Bookmarklet to verify adjustments work",
        "code_reference": "https://developer.paciellogroup.com/blog/2018/03/text-spacing-bookmarklet/"
      }
    ],
    "best_practices": [
      "Allow text spacing to be adjustable up to 200% for line-height, 0.16em for letter-spacing, and 0.32em for word-spacing",
      "Test content with different text spacing combinations to ensure no loss of functionality",
      "Avoid fixed height containers that might clip text when spacing is increased"
    ],
    "code_examples": {
      "before": "<p style='line-height: 20px !important; letter-spacing: 1px;'>This text has fixed spacing</p>",
      "after": "<p class='content-text'>This text has adjustable spacing</p>\n\n<style>\n.content-text {\n  line-height: 1.5;\n  letter-spacing: 0.01em;\n}\n</style>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/avoid-inline-spacing"
      },
      {
        "title": "WCAG Success Criterion 1.4.12",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/text-spacing.html"
      },
      {
        "title": "W3C Text Spacing Technique",
        "url": "https://www.w3.org/WAI/WCAG21/Techniques/css/C36"
      },
      {
        "title": "Text Spacing Bookmarklet",
        "url": "https://developer.paciellogroup.com/blog/2018/03/text-spacing-bookmarklet/"
      }
    ]
  },
    "button-name": {
    "rule_id": "button-name",
    "issue_explanation": "This rule checks that all button elements (both native <button> and ARIA button roles) have an accessible name. Buttons without proper labeling create significant barriers for assistive technology users who rely on this information to understand and interact with controls.",
    "wcag_guidelines": [
      "4.1.2 Name, Role, Value (Level A)",
      "2.5.3 Label in Name (Level A)",
      "Section 508 § 1194.22(a)",
      "EN 301 549 V3.2.1 - 11.4.1.2"
    ],
    "impact": {
      "severity": "Critical",
      "description": "Screen reader users receive no information about the button's purpose, making it impossible to understand its function. Keyboard-only users can interact with the button but won't understand its action. Low-vision users may struggle to identify unlabeled buttons in the interface."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when: 1) A button element has no text content, 2) A button has no aria-label or aria-labelledby attribute, 3) A button's accessible name is empty, or 4) An element with role='button' lacks proper labeling.",
      "common_causes": [
        "Icon buttons without text alternatives",
        "Decorative buttons missing aria-hidden",
        "Buttons with only visual styling (CSS shapes) but no text",
        "Dynamic buttons where labels aren't properly updated"
      ]
    },
    "fixes": [
      {
        "step": "Step 1: Add visible text content between <button> tags for primary labeling",
        "code_reference": "https://www.w3.org/WAI/tutorials/forms/labels/"
      },
      {
        "step": "Step 2: For icon buttons, use aria-label to provide a text alternative",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14"
      },
      {
        "step": "Step 3: For buttons with dynamic content, ensure aria-live is properly set",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA22"
      }
    ],
    "best_practices": [
      "Always prefer visible text labels for buttons when possible",
      "Ensure button labels match their visible text when using aria-label (Label in Name)",
      "Test buttons with screen readers to verify announcements"
    ],
    "code_examples": {
      "before": "<button></button>\n<div role='button' class='close-button'>X</div>",
      "after": "<button>Submit Form</button>\n<button aria-label='Close dialog'>X</button>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/button-name"
      },
      {
        "title": "WCAG Success Criterion 4.1.2",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html"
      },
      {
        "title": "WAI Button Labeling Techniques",
        "url": "https://www.w3.org/WAI/tutorials/forms/labels/"
      },
      {
        "title": "ARIA Labeling Techniques",
        "url": "https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14"
      }
    ]
  },
    "bypass": {
    "rule_id": "bypass",
    "issue_explanation": "This rule checks that pages contain a bypass mechanism (typically a 'Skip to Content' link) allowing keyboard users to skip repetitive navigation links. Without this, keyboard-only users must tab through all navigation items on every page before reaching main content.",
    "wcag_guidelines": [
      "2.4.1 Bypass Blocks (Level A)",
      "2.4.3 Focus Order (Level A)",
      "Section 508 § 1194.22(o)",
      "EN 301 549 V3.2.1 - 11.2.1.1"
    ],
    "impact": {
      "severity": "High",
      "description": "Keyboard-only users and screen reader users must navigate through all navigation links on every page before reaching main content, creating significant inefficiency and frustration. Users with motor impairments who rely on keyboards are disproportionately affected."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when: 1) No skip link is present, 2) Skip link is not the first focusable element, 3) Skip link is not visible when focused, or 4) Skip link target doesn't exist or isn't properly labeled.",
      "common_causes": [
        "Missing skip link entirely",
        "Skip link hidden with display:none (making it unfocusable)",
        "Improper CSS styling that hides the skip link",
        "Missing or incorrect ID reference for the target content area"
      ]
    },
    "fixes": [
      {
        "step": "Step 1: Add a visible-on-focus skip link as the first element in the DOM",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/general/G1"
      },
      {
        "step": "Step 2: Ensure the skip link targets a valid main content area with proper labeling",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA11"
      },
      {
        "step": "Step 3: Test keyboard navigation to verify skip link appears and works",
        "code_reference": ""
      }
    ],
    "best_practices": [
      "Make skip links visible when focused (common pattern: hide offscreen, show on focus)",
      "Include skip links on every page with consistent placement",
      "Ensure the target content area has proper ARIA landmarks (e.g., role='main')"
    ],
    "code_examples": {
      "before": "<body>\n  <nav>...</nav>\n  <main>...</main>\n</body>",
      "after": "<body>\n  <a href='#main' class='skip-link'>Skip to main content</a>\n  <nav>...</nav>\n  <main id='main' role='main'>...</main>\n</body>\n\n<style>\n.skip-link {\n  position: absolute;\n  left: -9999px;\n}\n.skip-link:focus {\n  position: static;\n}\n</style>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/bypass"
      },
      {
        "title": "WCAG Success Criterion 2.4.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html"
      },
      {
        "title": "W3C Skip Link Technique",
        "url": "https://www.w3.org/WAI/WCAG21/Techniques/general/G1"
      },
      {
        "title": "ARIA Landmark Roles",
        "url": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
      }
    ]
  },
    "color-contrast": {
    "rule_id": "color-contrast",
    "issue_explanation": "This rule checks that text and interactive elements have sufficient color contrast against their background to meet WCAG requirements. Inadequate contrast makes content difficult to read for users with low vision or color vision deficiencies.",
    "wcag_guidelines": [
      "1.4.3 Contrast (Minimum) (Level AA)",
      "1.4.6 Contrast (Enhanced) (Level AAA)",
      "Section 508 § 1194.22(c)",
      "EN 301 549 V3.2.1 - 11.4.3"
    ],
    "impact": {
      "severity": "High",
      "description": "Users with low vision, color blindness, or aging-related vision changes may struggle to read text or distinguish interactive elements when contrast is insufficient. This affects approximately 8% of men and 0.5% of women with color vision deficiencies."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when: 1) Text has less than 4.5:1 contrast for normal text (3:1 for large text) against background (AA), 2) Interactive elements have less than 3:1 contrast against adjacent colors, 3) Text is placed over background images without sufficient contrast.",
      "common_causes": [
        "Light gray text on white backgrounds",
        "Similar hue colors with low luminance difference",
        "Text over busy background images",
        "CSS opacity reducing effective contrast",
        "Placeholder text that doesn't meet contrast requirements"
      ]
    },
    "fixes": [
      {
        "step": "Step 1: Use contrast checking tools to identify problematic color pairs",
        "code_reference": "https://webaim.org/resources/contrastchecker/"
      },
      {
        "step": "Step 2: Adjust either text or background colors to meet minimum ratios (4.5:1 for normal text, 3:1 for large text and UI components)",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html"
      },
      {
        "step": "Step 3: For text over images, add semi-opaque backgrounds or text shadows to ensure readability",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/css/C40"
      }
    ],
    "best_practices": [
      "Check contrast during design phase before implementation",
      "Test with color blindness simulators to verify accessibility",
      "Maintain contrast in all states (hover, focus, active)",
      "Consider using patterns or textures in addition to color for important information"
    ],
    "code_examples": {
      "before": "<p style='color: #777777; background: #ffffff;'>Low contrast text</p>\n<button style='color: #f0f0f0; background: #ffffff;'>Submit</button>",
      "after": "<p style='color: #555555; background: #ffffff;'>Improved contrast text</p>\n<button style='color: #ffffff; background: #2266cc;'>Submit</button>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/color-contrast"
      },
      {
        "title": "WCAG Success Criterion 1.4.3",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html"
      },
      {
        "title": "WebAIM Contrast Checker",
        "url": "https://webaim.org/resources/contrastchecker/"
      },
      {
        "title": "Color Blindness Simulator",
        "url": "https://www.toptal.com/designers/colorfilter"
      }
    ]
  },
    "document-title": {
    "rule_id": "document-title",
    "issue_explanation": "This rule checks that web pages have a descriptive and unique title in the `<title>` element. A missing or non-descriptive title prevents users from understanding the page's purpose and makes navigation difficult for screen reader users and those with cognitive disabilities.",
    "wcag_guidelines": [
      "2.4.2 Page Titled (Level A)",
      "3.2.2 On Input (Level AA)",
      "Section 508 § 1194.22(b)",
      "EN 301 549 V3.2.1 - 11.4.2.2"
    ],
    "impact": {
      "severity": "High",
      "description": "Screen reader users rely on page titles for orientation and navigation. Without descriptive titles, users cannot quickly determine the page content or distinguish between multiple open tabs. This also impacts search engine discoverability and bookmarking."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when: 1) No `<title>` element exists, 2) Title is empty, 3) Title is identical across multiple pages, 4) Title doesn't describe the page's purpose or primary content.",
      "common_causes": [
        "Missing `<title>` element in HTML",
        "Using default or placeholder titles (e.g., 'Untitled Document')",
        "Copying the same title across all pages",
        "Including only the site name without page-specific information"
      ]
    },
    "fixes": [
      {
        "step": "Step 1: Add a unique, descriptive `<title>` element in the `<head>` section",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/html/H25"
      },
      {
        "step": "Step 2: Follow the pattern 'Primary Content - Secondary Content - Site Name'",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Understanding/page-titled.html"
      },
      {
        "step": "Step 3: For dynamic content, update the title when the page's primary content changes",
        "code_reference": ""
      }
    ],
    "best_practices": [
      "Keep titles under 60 characters for optimal display in browser tabs",
      "Place the most important information first",
      "Ensure titles match the main heading (h1) of the page",
      "Test with screen readers to verify title announcements"
    ],
    "code_examples": {
      "before": "<head>\n  <title>Home</title>\n</head>\n\n<!-- OR -->\n\n<head>\n  <!-- Missing title element -->\n</head>",
      "after": "<head>\n  <title>Product Catalog - Electronics - ACME Store</title>\n</head>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/document-title"
      },
      {
        "title": "WCAG Success Criterion 2.4.2",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/page-titled.html"
      },
      {
        "title": "W3C Page Title Technique",
        "url": "https://www.w3.org/WAI/WCAG21/Techniques/html/H25"
      },
      {
        "title": "Writing Effective Page Titles",
        "url": "https://www.w3.org/WAI/tutorials/page-structure/title/"
      }
    ]
  },
    "duplicate-id": {
    "rule_id": "duplicate-id",
    "issue_explanation": "This rule checks that all ID attributes in the document are unique. Duplicate IDs can cause unpredictable behavior in assistive technologies, JavaScript functionality, and CSS styling, as IDs are meant to uniquely identify elements.",
    "wcag_guidelines": [
      "4.1.1 Parsing (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 1194.22(a)",
      "EN 301 549 V3.2.1 - 11.4.1.2"
    ],
    "impact": {
      "severity": "High",
      "description": "Screen readers may incorrectly associate labels or descriptions with the wrong element when IDs are duplicated. Keyboard navigation and focus management can break when multiple elements share the same ID. Form submissions and JavaScript interactions may target the wrong element."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when: 1) Two or more elements share the same ID value, 2) An ID is used more than once in the same document, 3) Generated content creates duplicate IDs dynamically.",
      "common_causes": [
        "Copy-pasting code without updating IDs",
        "Using component templates that generate duplicate IDs",
        "CMS or framework automatically generating duplicate IDs",
        "Manual coding errors where unique IDs aren't ensured"
      ]
    },
    "fixes": [
      {
        "step": "Step 1: Search the document for duplicate IDs using developer tools or validators",
        "code_reference": "https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById"
      },
      {
        "step": "Step 2: Rename duplicate IDs to be unique, maintaining logical naming conventions",
        "code_reference": "https://html.spec.whatwg.org/multipage/dom.html#the-id-attribute"
      },
      {
        "step": "Step 3: For dynamically generated content, implement unique ID generation algorithms",
        "code_reference": ""
      }
    ],
    "best_practices": [
      "Use class attributes instead of IDs for styling purposes",
      "Implement naming conventions that prevent collisions (e.g., prefixing with component names)",
      "Test pages with screen readers after ID changes to verify proper associations",
      "Use automated tools to detect duplicate IDs during development"
    ],
    "code_examples": {
      "before": "<div id='main-content'>Content A</div>\n<div id='main-content'>Content B</div>",
      "after": "<div id='homepage-main-content'>Content A</div>\n<div id='article-main-content'>Content B</div>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/duplicate-id"
      },
      {
        "title": "WCAG Success Criterion 4.1.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/parsing.html"
      },
      {
        "title": "HTML ID Attribute Specification",
        "url": "https://html.spec.whatwg.org/multipage/dom.html#the-id-attribute"
      },
      {
        "title": "ARIA and ID References",
        "url": "https://www.w3.org/TR/wai-aria-1.2/#aria_labelledby"
      }
    ]
  },
    "empty-heading": {
    "rule_id": "empty-heading",
    "issue_explanation": "This rule checks that heading elements (h1-h6) contain meaningful text content. Empty headings provide no structural information to assistive technology users and break the document outline that screen readers rely on for navigation.",
    "wcag_guidelines": [
      "1.3.1 Info and Relationships (Level A)",
      "2.4.6 Headings and Labels (Level AA)",
      "Section 508 § 1194.22(a)",
      "EN 301 549 V3.2.1 - 11.4.1.2"
    ],
    "impact": {
      "severity": "Moderate",
      "description": "Screen reader users navigating by headings will encounter empty announcements, creating confusion about document structure and missing important content landmarks. This disrupts efficient navigation for users with visual impairments."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when: 1) A heading element contains no text content, 2) A heading contains only non-text content without proper alternatives, 3) A heading contains only whitespace or hidden characters.",
      "common_causes": [
        "Placeholder headings left during development",
        "Headings with only decorative icons or images",
        "Dynamically generated headings that fail to populate",
        "CSS techniques that visually hide headings without proper accessibility considerations"
      ]
    },
    "fixes": [
      {
        "step": "Step 1: Add descriptive text content to empty headings",
        "code_reference": "https://www.w3.org/WAI/tutorials/page-structure/headings/"
      },
      {
        "step": "Step 2: For visual-only headings, provide screen reader text using CSS techniques like .sr-only",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/css/C7"
      },
      {
        "step": "Step 3: Remove purely decorative headings that serve no structural purpose",
        "code_reference": ""
      }
    ],
    "best_practices": [
      "Ensure headings form a logical outline of the page content",
      "Test heading navigation using screen readers",
      "Use heading levels sequentially (don't skip levels)",
      "Avoid using headings for purely visual formatting"
    ],
    "code_examples": {
      "before": "<h2></h2>\n<h3><span class='icon'></span></h3>",
      "after": "<h2>Product Features</h2>\n<h3><span class='icon' aria-hidden='true'></span><span class='sr-only'>Security</span> Features</h3>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/empty-heading"
      },
      {
        "title": "WCAG Success Criterion 2.4.6",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/headings-and-labels.html"
      },
      {
        "title": "W3C Heading Structure Guide",
        "url": "https://www.w3.org/WAI/tutorials/page-structure/headings/"
      },
      {
        "title": "Screen Reader Text Techniques",
        "url": "https://www.w3.org/WAI/WCAG21/Techniques/css/C7"
      }
    ]
  },
    "heading-order": {
    "rule_id": "heading-order",
    "issue_explanation": "This rule checks that heading levels follow a logical hierarchical order (h1-h6) without skipping levels. Improper heading structure creates confusion for screen reader users who rely on headings to understand page organization and navigate content efficiently.",
    "wcag_guidelines": [
      "1.3.1 Info and Relationships (Level A)",
      "2.4.6 Headings and Labels (Level AA)",
      "Section 508 § 1194.22(a)",
      "EN 301 549 V3.2.1 - 11.4.1.2"
    ],
    "impact": {
      "severity": "High",
      "description": "Screen reader users navigating by headings will encounter an illogical document structure, making content relationships unclear. Skipped heading levels can disorient users and make it difficult to understand content hierarchy."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when: 1) Heading levels are skipped (e.g., h1 followed by h3), 2) The first heading isn't an h1, 3) Heading levels increase by more than one, 4) Headings are used out of hierarchical order.",
      "common_causes": [
        "Using headings for visual styling rather than document structure",
        "Component reuse without adjusting heading levels contextually",
        "Copy-pasting content without updating heading levels",
        "CMS templates with fixed heading levels"
      ]
    },
    "fixes": [
      {
        "step": "Step 1: Restructure headings to follow sequential order without skipping levels",
        "code_reference": "https://www.w3.org/WAI/tutorials/page-structure/headings/"
      },
      {
        "step": "Step 2: Ensure the document starts with an h1 representing the main content",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Understanding/headings-and-labels.html"
      },
      {
        "step": "Step 3: For reusable components, implement contextual heading level adjustment",
        "code_reference": "https://www.w3.org/TR/wai-aria-practices-1.2/#naming_with_aria-label"
      }
    ],
    "best_practices": [
      "Use CSS for visual styling rather than heading levels",
      "Test heading navigation with screen readers",
      "Maintain a single h1 per page as the main title",
      "Consider using ARIA landmarks to supplement heading structure"
    ],
    "code_examples": {
      "before": "<h1>Main Title</h1>\n<h3>Section Title</h3> <!-- Skipped h2 -->\n<h5>Subsection</h5> <!-- Skipped h4 -->",
      "after": "<h1>Main Title</h1>\n<h2>Section Title</h2>\n<h3>Subsection</h3>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/heading-order"
      },
      {
        "title": "WCAG Success Criterion 1.3.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html"
      },
      {
        "title": "W3C Heading Structure Guide",
        "url": "https://www.w3.org/WAI/tutorials/page-structure/headings/"
      },
      {
        "title": "ARIA Landmark Roles",
        "url": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
      }
    ]
  },
    "identical-links-same-purpose": {
    "rule_id": "identical-links-same-purpose",
    "issue_explanation": "This rule checks that links with identical text (or accessible names) that point to different locations serve distinct purposes. When identical link text leads to different destinations, it creates confusion for users who rely on link text to understand navigation options.",
    "wcag_guidelines": [
      "2.4.4 Link Purpose (In Context) (Level A)",
      "2.4.9 Link Purpose (Link Only) (Level AAA)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 1194.22(a)"
    ],
    "impact": {
      "severity": "High",
      "description": "Screen reader users navigating by links may be unable to distinguish between different destinations when link text is identical. This causes navigation difficulties for users with visual impairments and cognitive disabilities who rely on consistent, descriptive link text."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when: 1) Multiple links share identical accessible names but point to different URLs, 2) Links with the same visible text serve different purposes, 3) ARIA labels or hidden text don't sufficiently differentiate link purposes.",
      "common_causes": [
        "Using generic link text like 'Read more' or 'Click here' for multiple purposes",
        "Repeating the same link text in different contexts without clarification",
        "Relying solely on surrounding context that may not be announced by screen readers",
        "Using icon links with identical alt text but different functions"
      ]
    },
    "fixes": [
      {
        "step": "Step 1: Make link text unique and descriptive of each destination",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/general/G91"
      },
      {
        "step": "Step 2: For similar links, add context through aria-label or aria-labelledby",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA8"
      },
      {
        "step": "Step 3: Group related links in a list or provide additional visible context",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/html/H77"
      }
    ],
    "best_practices": [
      "Ensure link purpose is clear from the link text alone",
      "Test link navigation using screen readers in context",
      "Avoid generic link text that requires surrounding context",
      "Maintain consistency when linking to the same destination"
    ],
    "code_examples": {
      "before": "<a href='/about'>Learn more</a>\n<a href='/products'>Learn more</a>",
      "after": "<a href='/about'>Learn more about our company</a>\n<a href='/products'>Learn more about our products</a>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/identical-links-same-purpose"
      },
      {
        "title": "WCAG Success Criterion 2.4.4",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html"
      },
      {
        "title": "Descriptive Link Text Techniques",
        "url": "https://www.w3.org/WAI/WCAG21/Techniques/general/G91"
      },
      {
        "title": "ARIA Labeling Techniques",
        "url": "https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA8"
      }
    ]
  },
    "image-redundant-alt": {
    "rule_id": "image-redundant-alt",
    "issue_explanation": "This rule checks that images with both alt text and adjacent text don't contain redundant information. When alt text repeats visible text adjacent to the image, it creates duplicate announcements for screen reader users, increasing cognitive load and reducing efficiency.",
    "wcag_guidelines": [
      "1.1.1 Non-text Content (Level A)",
      "2.4.6 Headings and Labels (Level AA)",
      "Section 508 § 1194.22(a)",
      "EN 301 549 V3.2.1 - 11.4.1.2"
    ],
    "impact": {
      "severity": "Moderate",
      "description": "Screen reader users hear repetitive information when both the alt text and adjacent text convey the same meaning. This creates unnecessary verbosity and can obscure more important content, particularly affecting users with cognitive disabilities."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when: 1) An image's alt text duplicates adjacent text content, 2) An image's alt text repeats text that is programmatically associated with the image, 3) Decorative images with redundant alt text aren't properly marked as decorative.",
      "common_causes": [
        "Copying adjacent text verbatim into alt attributes",
        "Using default alt text from CMS that duplicates visible text",
        "Not properly marking decorative images that repeat text",
        "Including redundant information in both alt text and aria-labelledby"
      ]
    },
    "fixes": [
      {
        "step": "Step 1: For informative images, either remove redundant alt text or make it complementary to adjacent text",
        "code_reference": "https://www.w3.org/WAI/tutorials/images/decision-tree/"
      },
      {
        "step": "Step 2: For decorative images that repeat text, use empty alt text (alt='')",
        "code_reference": "https://www.w3.org/WAI/tutorials/images/decorative/"
      },
      {
        "step": "Step 3: For functional images, ensure alt text describes function rather than duplicating visible text",
        "code_reference": "https://www.w3.org/WAI/tutorials/images/functional/"
      }
    ],
    "best_practices": [
      "Use alt text to convey information not available in adjacent text",
      "Test image announcements with screen readers in context",
      "Consider whether images that repeat text are truly decorative",
      "Maintain consistency in how similar images are labeled"
    ],
    "code_examples": {
      "before": "<p><img src='warning.png' alt='Warning'> Warning: High voltage</p>",
      "after": "<p><img src='warning.png' alt=''> Warning: High voltage</p>\n<!-- OR -->\n<p><img src='warning.png' alt='Icon showing lightning bolt'> High voltage area</p>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/image-redundant-alt"
      },
      {
        "title": "WCAG Success Criterion 1.1.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html"
      },
      {
        "title": "W3C Image Alt Decision Tree",
        "url": "https://www.w3.org/WAI/tutorials/images/decision-tree/"
      },
      {
        "title": "ARIA and Images",
        "url": "https://www.w3.org/WAI/tutorials/images/"
      }
    ]
  },
    "landmark-banner-is-top-level": {
    "rule_id": "landmark-banner-is-top-level",
    "issue_explanation": "This rule checks that banner landmarks (typically containing site-wide content like logos and navigation) are top-level landmarks that are not nested within other landmarks. Nested banner landmarks can confuse assistive technology users about the page structure and navigation hierarchy.",
    "wcag_guidelines": [
      "1.3.1 Info and Relationships (Level A)",
      "2.4.1 Bypass Blocks (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 1194.22(a)"
    ],
    "impact": {
      "severity": "Moderate",
      "description": "Screen reader users relying on landmark navigation may encounter confusing or duplicate banner regions, making it difficult to understand page organization and efficiently navigate to main content. This particularly affects users with visual impairments who depend on proper landmark structure."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when: 1) A banner landmark (role='banner' or <header> in a document context) is nested within another landmark, 2) Multiple banner landmarks exist at the same level, 3) The banner landmark contains other top-level landmarks.",
      "common_causes": [
        "Placing header content inside article or section elements",
        "Using multiple header elements without proper nesting",
        "Component reuse without considering landmark hierarchy",
        "Incorrect application of ARIA landmark roles"
      ]
    },
    "fixes": [
      {
        "step": "Step 1: Ensure the banner landmark is a direct child of the body element",
        "code_reference": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
      },
      {
        "step": "Step 2: Remove nested banner landmarks or convert them to appropriate roles",
        "code_reference": "https://www.w3.org/TR/wai-aria-1.2/#banner"
      },
      {
        "step": "Step 3: Verify there is only one banner landmark per page",
        "code_reference": ""
      }
    ],
    "best_practices": [
      "Use semantic HTML5 elements (<header>) for banner regions when possible",
      "Test landmark navigation with screen readers",
      "Ensure the banner contains only site-wide content (not page-specific content)",
      "Combine with other navigation landmarks (like role='navigation') for optimal structure"
    ],
    "code_examples": {
      "before": "<body>\n  <main>\n    <header role='banner'> <!-- Nested banner -->\n      <!-- Site header content -->\n    </header>\n  </main>\n</body>",
      "after": "<body>\n  <header role='banner'> <!-- Top-level banner -->\n    <!-- Site header content -->\n  </header>\n  <main>\n    <!-- Page content -->\n  </main>\n</body>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/landmark-banner-is-top-level"
      },
      {
        "title": "WCAG Success Criterion 1.3.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html"
      },
      {
        "title": "ARIA Landmark Roles Guide",
        "url": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
      },
      {
        "title": "HTML5 Sectioning Elements",
        "url": "https://www.w3.org/TR/html-aria/"
      }
    ]
  },
    "landmark-main-is-top-level": {
    "rule_id": "landmark-main-is-top-level",
    "issue_explanation": "This rule checks that the main landmark (role='main' or <main> element) is a top-level landmark that is not nested within other landmarks. Nested main landmarks can confuse assistive technology users about the primary content structure and navigation hierarchy.",
    "wcag_guidelines": [
      "1.3.1 Info and Relationships (Level A)",
      "2.4.1 Bypass Blocks (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 1194.22(a)",
      "EN 301 549 V3.2.1 - 11.4.1.2"
    ],
    "impact": {
      "severity": "High",
      "description": "Screen reader users relying on landmark navigation may struggle to locate the primary content area when the main landmark is nested within other landmarks. This creates significant navigation barriers for users with visual impairments who depend on proper landmark structure to efficiently access content."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when: 1) The main landmark is nested within another landmark (e.g., navigation, complementary, or banner), 2) Multiple main landmarks exist at the same level, 3) The main landmark is not a direct child of the body element.",
      "common_causes": [
        "Placing main content inside article or section elements with landmark roles",
        "Using multiple main elements without proper nesting",
        "Component reuse without considering landmark hierarchy",
        "Incorrect application of ARIA landmark roles"
      ]
    },
    "fixes": [
      {
        "step": "Step 1: Ensure the main landmark is a direct child of the body element",
        "code_reference": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
      },
      {
        "step": "Step 2: Remove nested main landmarks or convert them to appropriate roles",
        "code_reference": "https://www.w3.org/TR/wai-aria-1.2/#main"
      },
      {
        "step": "Step 3: Verify there is only one main landmark per page",
        "code_reference": "https://html.spec.whatwg.org/multipage/grouping-content.html#the-main-element"
      }
    ],
    "best_practices": [
      "Use the semantic <main> element when possible",
      "Test landmark navigation with screen readers",
      "Ensure the main landmark contains all primary content of the document",
      "Combine with other navigation landmarks for optimal structure"
    ],
    "code_examples": {
      "before": "<body>\n  <div role='navigation'>\n    <main> <!-- Nested main landmark -->\n      <!-- Page content -->\n    </main>\n  </div>\n</body>",
      "after": "<body>\n  <nav>\n    <!-- Navigation content -->\n  </nav>\n  <main> <!-- Top-level main landmark -->\n    <!-- Page content -->\n  </main>\n</body>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/landmark-main-is-top-level"
      },
      {
        "title": "WCAG Success Criterion 1.3.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html"
      },
      {
        "title": "ARIA Main Landmark Role",
        "url": "https://www.w3.org/TR/wai-aria-1.2/#main"
      },
      {
        "title": "HTML5 Main Element Specification",
        "url": "https://html.spec.whatwg.org/multipage/grouping-content.html#the-main-element"
      }
    ]
  },
    "landmark-no-duplicate-banner": {
    "rule_id": "landmark-no-duplicate-banner",
    "issue_explanation": "This rule checks that each page contains only one banner landmark (role='banner' or <header> in document context). Multiple banner landmarks create confusion for assistive technology users by suggesting multiple primary header sections, disrupting the expected page structure.",
    "wcag_guidelines": [
      "1.3.1 Info and Relationships (Level A)",
      "2.4.1 Bypass Blocks (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 1194.22(a)",
      "EN 301 549 V3.2.1 - 11.4.1.2"
    ],
    "impact": {
      "severity": "Moderate",
      "description": "Screen reader users navigating by landmarks will encounter multiple banner regions, making it difficult to identify the true primary header content. This creates navigation inefficiencies and cognitive load for users with visual impairments who rely on consistent landmark structure."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when: 1) Multiple elements have role='banner', 2) Multiple <header> elements exist at document level, 3) Both role='banner' and <header> are used redundantly, 4) Nested banner landmarks appear in the DOM.",
      "common_causes": [
        "Using multiple header components without proper scoping",
        "Applying banner role to section headers incorrectly",
        "Component templates that generate duplicate banner landmarks",
        "CMS themes that add redundant header elements"
      ]
    },
    "fixes": [
      {
        "step": "Step 1: Identify and remove duplicate banner landmarks, keeping only one primary header",
        "code_reference": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
      },
      {
        "step": "Step 2: For secondary header content, use appropriate sectioning elements without banner role",
        "code_reference": "https://www.w3.org/TR/html-aria/"
      },
      {
        "step": "Step 3: Ensure the remaining banner contains only site-wide content (logos, main navigation)",
        "code_reference": ""
      }
    ],
    "best_practices": [
      "Use semantic <header> for main banner rather than ARIA when possible",
      "Test landmark navigation with screen readers after changes",
      "Reserve banner landmark exclusively for site identification and global navigation",
      "For article/section headers, use heading elements without landmark roles"
    ],
    "code_examples": {
      "before": "<body>\n  <header role='banner'>Main Header</header>\n  <div role='banner'>Secondary Header</div>\n</body>",
      "after": "<body>\n  <header>\n    <!-- Single banner landmark -->\n    <h1>Site Title</h1>\n    <nav>Main Navigation</nav>\n  </header>\n  <section>\n    <h2>Content Section</h2>\n    <!-- No duplicate banner -->\n  </section>\n</body>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/landmark-no-duplicate-banner"
      },
      {
        "title": "WCAG Success Criterion 1.3.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html"
      },
      {
        "title": "ARIA Banner Landmark Role",
        "url": "https://www.w3.org/TR/wai-aria-1.2/#banner"
      },
      {
        "title": "HTML5 Header Element Specification",
        "url": "https://html.spec.whatwg.org/multipage/sections.html#the-header-element"
      }
    ]
  },
    "landmark-no-duplicate-contentinfo": {
    "rule_id": "landmark-no-duplicate-contentinfo",
    "issue_explanation": "This rule checks that each page contains only one contentinfo landmark (role='contentinfo' or <footer> in document context). Multiple contentinfo landmarks create confusion for assistive technology users by suggesting multiple footer sections, disrupting the expected page structure and navigation patterns.",
    "wcag_guidelines": [
      "1.3.1 Info and Relationships (Level A)",
      "2.4.1 Bypass Blocks (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 1194.22(a)",
      "EN 301 549 V3.2.1 - 11.4.1.2"
    ],
    "impact": {
      "severity": "Moderate",
      "description": "Screen reader users navigating by landmarks will encounter multiple footer regions, making it difficult to locate standard footer content like copyright information and site policies. This creates navigation inefficiencies for users with visual impairments who rely on consistent landmark structure."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when: 1) Multiple elements have role='contentinfo', 2) Multiple <footer> elements exist at document level, 3) Both role='contentinfo' and <footer> are used redundantly, 4) Nested contentinfo landmarks appear in the DOM.",
      "common_causes": [
        "Using multiple footer components without proper scoping",
        "Applying contentinfo role to section footers incorrectly",
        "Component templates that generate duplicate footer landmarks",
        "CMS themes that add redundant footer elements"
      ]
    },
    "fixes": [
      {
        "step": "Step 1: Identify and remove duplicate contentinfo landmarks, keeping only one primary footer",
        "code_reference": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
      },
      {
        "step": "Step 2: For secondary footer content, use appropriate sectioning elements without contentinfo role",
        "code_reference": "https://www.w3.org/TR/html-aria/"
      },
      {
        "step": "Step 3: Ensure the remaining contentinfo contains only site-wide footer content (copyright, policies)",
        "code_reference": ""
      }
    ],
    "best_practices": [
      "Use semantic <footer> for main contentinfo rather than ARIA when possible",
      "Test landmark navigation with screen readers after changes",
      "Reserve contentinfo landmark exclusively for site-wide footer information",
      "For article/section footers, use regular div elements without landmark roles"
    ],
    "code_examples": {
      "before": "<body>\n  <footer role='contentinfo'>Main Footer</footer>\n  <div role='contentinfo'>Secondary Footer</div>\n</body>",
      "after": "<body>\n  <footer>\n    <!-- Single contentinfo landmark -->\n    <p>© 2023 Company Name</p>\n    <nav>Footer Navigation</nav>\n  </footer>\n  <section>\n    <div>Section footer content</div>\n    <!-- No duplicate contentinfo -->\n  </section>\n</body>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/landmark-no-duplicate-contentinfo"
      },
      {
        "title": "WCAG Success Criterion 1.3.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html"
      },
      {
        "title": "ARIA Contentinfo Landmark Role",
        "url": "https://www.w3.org/TR/wai-aria-1.2/#contentinfo"
      },
      {
        "title": "HTML5 Footer Element Specification",
        "url": "https://html.spec.whatwg.org/multipage/sections.html#the-footer-element"
      }
    ]
  },
    "landmark-no-duplicate-main": {
    "rule_id": "landmark-no-duplicate-main",
    "issue_explanation": "This rule checks that each page contains only one main landmark (role='main' or <main> element). Multiple main landmarks create significant confusion for assistive technology users by suggesting multiple primary content sections, severely disrupting the expected page structure and navigation flow.",
    "wcag_guidelines": [
      "1.3.1 Info and Relationships (Level A)",
      "2.4.1 Bypass Blocks (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 1194.22(a)",
      "EN 301 549 V3.2.1 - 11.4.1.2"
    ],
    "impact": {
      "severity": "High",
      "description": "Screen reader users relying on landmark navigation will encounter multiple main content regions, making it impossible to reliably locate the primary content. This creates severe navigation barriers for users with visual impairments who depend on a single, authoritative main landmark to access page content efficiently."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when: 1) Multiple elements have role='main', 2) Multiple <main> elements exist at document level, 3) Both role='main' and <main> are used redundantly, 4) Nested main landmarks appear in the DOM.",
      "common_causes": [
        "Component-based architectures creating multiple main sections",
        "Incorrect use of main landmark in reusable templates",
        "CMS configurations generating duplicate main elements",
        "Improper ARIA role application in dynamic content"
      ]
    },
    "fixes": [
      {
        "step": "Step 1: Consolidate all primary content into a single main landmark",
        "code_reference": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
      },
      {
        "step": "Step 2: Convert secondary 'main' sections to appropriate roles (region, article)",
        "code_reference": "https://www.w3.org/TR/wai-aria-1.2/#main"
      },
      {
        "step": "Step 3: Ensure the main landmark is a direct child of body and contains all primary content",
        "code_reference": "https://html.spec.whatwg.org/multipage/grouping-content.html#the-main-element"
      }
    ],
    "best_practices": [
      "Use semantic <main> element rather than ARIA role when possible",
      "Test landmark navigation with multiple screen readers",
      "Reserve main landmark exclusively for primary content",
      "Implement automated checks to prevent duplicate main landmarks"
    ],
    "code_examples": {
      "before": "<body>\n  <main>Primary Content</main>\n  <div role='main'>Secondary Content</div>\n</body>",
      "after": "<body>\n  <main>\n    <article>Primary Content</article>\n    <section>Secondary Content</section>\n  </main>\n</body>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/landmark-no-duplicate-main"
      },
      {
        "title": "WCAG Success Criterion 1.3.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html"
      },
      {
        "title": "ARIA Main Landmark Role",
        "url": "https://www.w3.org/TR/wai-aria-1.2/#main"
      },
      {
        "title": "HTML5 Main Element Specification",
        "url": "https://html.spec.whatwg.org/multipage/grouping-content.html#the-main-element"
      }
    ]
  },
    "landmark-one-main": {
    "rule_id": "landmark-one-main",
    "issue_explanation": "This rule verifies that each page contains exactly one main landmark (role='main' or <main> element) that serves as the primary content container. Missing or multiple main landmarks disrupt the document structure that assistive technologies rely on for efficient content navigation.",
    "wcag_guidelines": [
      "1.3.1 Info and Relationships (Level A)",
      "2.4.1 Bypass Blocks (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 1194.22(a)",
      "EN 301 549 V3.2.1 - 11.4.1.2"
    ],
    "impact": {
      "severity": "High",
      "description": "Screen reader users depend on the main landmark to quickly access primary content. Missing this landmark forces linear navigation through all page elements, while multiple mains create confusion about where primary content begins and ends."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when: 1) No main landmark exists, 2) Multiple main landmarks are present, 3) The main landmark is nested within another landmark, 4) The main landmark is not a top-level element.",
      "common_causes": [
        "Omitting main landmark in single-page applications",
        "Creating multiple main sections in component-based architectures",
        "Improperly nesting main content within other landmarks",
        "Using divs with main content instead of proper landmark"
      ]
    },
    "fixes": [
      {
        "step": "Step 1: Add a single <main> element wrapping all primary content if missing",
        "code_reference": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
      },
      {
        "step": "Step 2: Consolidate multiple main sections into one, using articles/sections for subdivisions",
        "code_reference": "https://html.spec.whatwg.org/multipage/grouping-content.html#the-main-element"
      },
      {
        "step": "Step 3: Ensure the main landmark is a direct child of body and contains all primary content",
        "code_reference": ""
      }
    ],
    "best_practices": [
      "Use the semantic <main> element rather than ARIA role",
      "Place the main landmark after header/navigation content",
      "Include skip links that target the main landmark",
      "Test with screen readers to verify landmark announcements"
    ],
    "code_examples": {
      "before": "<body>\n  <div id='content'> <!-- Missing main landmark -->\n    <h1>Page Title</h1>\n  </div>\n</body>",
      "after": "<body>\n  <header>...</header>\n  <main id='main-content'>\n    <h1>Page Title</h1>\n  </main>\n</body>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/landmark-one-main"
      },
      {
        "title": "WCAG Success Criterion 2.4.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html"
      },
      {
        "title": "ARIA Main Landmark Role",
        "url": "https://www.w3.org/TR/wai-aria-1.2/#main"
      },
      {
        "title": "HTML5 Main Element Guide",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main"
      }
    ]
  },
    "landmark-unique": {
    "rule_id": "landmark-unique",
    "issue_explanation": "This rule verifies that landmarks of the same type (banner, main, navigation, etc.) have unique labels when multiple instances exist on a page. Uniquely labeled landmarks help users understand the distinct purpose of each region when navigating by landmarks.",
    "wcag_guidelines": [
      "1.3.1 Info and Relationships (Level A)",
      "2.4.1 Bypass Blocks (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 1194.22(a)",
      "EN 301 549 V3.2.1 - 11.4.1.2"
    ],
    "impact": {
      "severity": "Moderate",
      "description": "Screen reader users navigating by landmarks may struggle to differentiate between multiple instances of the same landmark type (e.g., navigation regions) when they lack unique labels. This creates confusion and reduces navigation efficiency for users with visual impairments."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when: 1) Multiple landmarks of the same type exist without unique accessible names, 2) Landmarks with identical roles have identical labels, 3) Navigation landmarks lack distinguishing labels when multiple exist.",
      "common_causes": [
        "Multiple navigation regions with identical labels",
        "Duplicate complementary or region landmarks",
        "Using generic labels like 'navigation' for multiple instances",
        "Omitting aria-label or aria-labelledby for repeated landmarks"
      ]
    },
    "fixes": [
      {
        "step": "Step 1: Add unique accessible names using aria-label or aria-labelledby",
        "code_reference": "https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/"
      },
      {
        "step": "Step 2: For navigation landmarks, use descriptive labels (e.g., 'Main Navigation', 'Footer Navigation')",
        "code_reference": "https://www.w3.org/TR/wai-aria-1.2/#navigation"
      },
      {
        "step": "Step 3: For complementary landmarks, indicate their specific purpose",
        "code_reference": "https://www.w3.org/TR/wai-aria-1.2/#complementary"
      }
    ],
    "best_practices": [
      "Use semantic HTML5 elements with implicit landmark roles when possible",
      "Test landmark navigation with screen readers",
      "Maintain consistent labeling patterns across the site",
      "Keep landmark labels concise but descriptive"
    ],
    "code_examples": {
      "before": "<nav>...</nav>\n<nav>...</nav> <!-- Two unlabeled navigation landmarks -->",
      "after": "<nav aria-label='Main Navigation'>...</nav>\n<nav aria-label='Footer Links'>...</nav>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/landmark-unique"
      },
      {
        "title": "WCAG Success Criterion 1.3.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html"
      },
      {
        "title": "ARIA Landmark Roles",
        "url": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
      },
      {
        "title": "HTML5 Sectioning Elements",
        "url": "https://html.spec.whatwg.org/multipage/sections.html"
      }
    ]
  },
    "link-name": {
    "rule_id": "link-name",
    "issue_explanation": "This rule checks that all links have discernible text that clearly describes their purpose or destination. Links without meaningful text create significant barriers for users who rely on link text to navigate and understand content structure.",
    "wcag_guidelines": [
      "2.4.4 Link Purpose (In Context) (Level A)",
      "2.4.9 Link Purpose (Link Only) (Level AAA)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 1194.22(a)",
      "EN 301 549 V3.2.1 - 11.4.1.2"
    ],
    "impact": {
      "severity": "High",
      "description": "Screen reader users cannot determine link destinations when text is missing or non-descriptive. Keyboard-only users can navigate to links but won't understand their function. Low-vision users scanning pages may miss important links without clear visual text."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when: 1) A link contains no text content, 2) Link text is empty or only whitespace, 3) Link relies solely on ARIA labels without visual text, 4) Link text is non-descriptive (e.g., 'click here', 'read more').",
      "common_causes": [
        "Icon-only links without text alternatives",
        "Links with only images missing alt text",
        "Placeholder links left during development",
        "Generic link text that requires surrounding context"
      ]
    },
    "fixes": [
      {
        "step": "Step 1: Add descriptive text content between <a> tags",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/general/G91"
      },
      {
        "step": "Step 2: For icon links, provide visible or screen-reader-only text",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14"
      },
      {
        "step": "Step 3: Ensure link text makes sense out of context (avoid 'click here')",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/general/G53"
      }
    ],
    "best_practices": [
      "Make link purpose clear from the link text alone",
      "Test link navigation with screen readers",
      "Ensure link text matches or is contained in the accessible name",
      "Maintain consistent link styling for visual identification"
    ],
    "code_examples": {
      "before": "<a href='/about'></a>\n<a href='/products'><span class='icon'></span></a>\n<a href='/contact'>Click here</a>",
      "after": "<a href='/about'>About Our Company</a>\n<a href='/products'><span class='icon' aria-hidden='true'></span><span class='sr-only'>Products</span></a>\n<a href='/contact'>Contact Support</a>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/link-name"
      },
      {
        "title": "WCAG Success Criterion 2.4.4",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html"
      },
      {
        "title": "Descriptive Link Text Techniques",
        "url": "https://www.w3.org/WAI/WCAG21/Techniques/general/G91"
      },
      {
        "title": "ARIA Labeling Techniques",
        "url": "https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14"
      }
    ]
  },
    "meta-viewport-large": {
    "rule_id": "meta-viewport-large",
    "issue_explanation": "This rule checks that the viewport meta tag does not prevent zooming by setting maximum-scale or user-scalable=no. These restrictions prevent users from enlarging content, which creates accessibility barriers for users with low vision.",
    "wcag_guidelines": [
      "1.4.4 Resize Text (Level AA)",
      "1.4.10 Reflow (Level AA)",
      "Section 508 § 1194.22(a)",
      "EN 301 549 V3.2.1 - 11.4.4"
    ],
    "impact": {
      "severity": "Critical",
      "description": "Users with low vision who need to zoom or magnify content will be unable to properly view and interact with the page. This creates a complete barrier for these users, making content effectively inaccessible."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when the viewport meta tag contains: 1) maximum-scale attribute set to less than 2, 2) user-scalable=no, 3) any combination that prevents zooming to at least 200%.",
      "common_causes": [
        "Copying restrictive viewport settings from templates",
        "Attempting to prevent layout shifts on zoom",
        "Misguided attempts to improve mobile UX",
        "Using outdated responsive design patterns"
      ]
    },
    "fixes": [
      {
        "step": "Step 1: Remove maximum-scale and user-scalable restrictions from viewport meta tag",
        "code_reference": "https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag"
      },
      {
        "step": "Step 2: Use the standard responsive viewport tag: <meta name='viewport' content='width=device-width, initial-scale=1'>",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/css/C28"
      },
      {
        "step": "Step 3: Test zoom functionality on mobile devices and desktop browsers",
        "code_reference": ""
      }
    ],
    "best_practices": [
      "Never disable user scaling in production",
      "Design layouts to accommodate 200% zoom",
      "Test with browser zoom and screen magnifiers",
      "Use relative units (em, rem) for text sizing"
    ],
    "code_examples": {
      "before": "<meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'>",
      "after": "<meta name='viewport' content='width=device-width, initial-scale=1'>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/meta-viewport-large"
      },
      {
        "title": "WCAG Success Criterion 1.4.4",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html"
      },
      {
        "title": "Viewport Meta Tag Documentation",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag"
      },
      {
        "title": "Zoom Testing Guide",
        "url": "https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=144#resize-text"
      }
    ]
  },
    "meta-viewport": {
    "rule_id": "meta-viewport",
    "issue_explanation": "This rule verifies that the viewport meta tag is properly configured to allow zooming and scaling, ensuring content remains accessible to users who need to enlarge text or adjust the viewport for better readability. Improper viewport settings can create insurmountable barriers for users with visual impairments.",
    "wcag_guidelines": [
      "1.4.4 Resize Text (Level AA)",
      "1.4.10 Reflow (Level AA)",
      "2.5.1 Pointer Gestures (Level A)",
      "Section 508 § 1194.22(a)",
      "EN 301 549 V3.2.1 - 11.4.4"
    ],
    "impact": {
      "severity": "Critical",
      "description": "Users with low vision who rely on zooming or text enlargement are completely blocked from accessing content when viewport restrictions are present. This affects people with age-related vision loss, conditions like macular degeneration, and other visual impairments requiring content scaling."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when: 1) No viewport meta tag is present, 2) Viewport tag prevents zooming (user-scalable=no), 3) Maximum scale is restricted (maximum-scale < 2), 4) Width is fixed to a specific pixel value, 5) Initial-scale is not set or set to 0.",
      "common_causes": [
        "Using restrictive templates from UI frameworks",
        "Attempting to prevent mobile layout shifts",
        "Misguided responsive design implementations",
        "Copying outdated code examples"
      ]
    },
    "fixes": [
      {
        "step": "Step 1: Implement the standard accessible viewport meta tag: <meta name='viewport' content='width=device-width, initial-scale=1'>",
        "code_reference": "https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag"
      },
      {
        "step": "Step 2: Remove any user-scalable, maximum-scale, or minimum-scale restrictions",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/css/C28"
      },
      {
        "step": "Step 3: Test zoom functionality up to 400% across devices",
        "code_reference": "https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=144#resize-text"
      }
    ],
    "best_practices": [
      "Always allow pinch-to-zoom and text resizing",
      "Design layouts to accommodate 400% zoom without horizontal scrolling",
      "Use relative units (em, rem, %) for all sizing",
      "Test with both browser zoom and OS-level magnification"
    ],
    "code_examples": {
      "before": "<meta name='viewport' content='width=1200, user-scalable=no'>",
      "after": "<meta name='viewport' content='width=device-width, initial-scale=1'>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/meta-viewport"
      },
      {
        "title": "WCAG Success Criterion 1.4.4",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html"
      },
      {
        "title": "Viewport Meta Tag Best Practices",
        "url": "https://web.dev/viewport/"
      },
      {
        "title": "Zoom and Reflow Requirements",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/reflow.html"
      }
    ]
  },
    "region": {
    "rule_id": "region",
    "issue_explanation": "This rule checks that content sections marked as regions (using role='region' or ARIA landmarks) have accessible names that describe their purpose. Unnamed regions provide no semantic value to assistive technology users, making it difficult to understand and navigate page structure.",
    "wcag_guidelines": [
      "1.3.1 Info and Relationships (Level A)",
      "2.4.1 Bypass Blocks (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 1194.22(a)",
      "EN 301 549 V3.2.1 - 11.4.1.2"
    ],
    "impact": {
      "severity": "Moderate",
      "description": "Screen reader users navigating by regions will encounter unnamed sections that provide no contextual information, forcing them to explore content linearly to understand its purpose. This creates navigation inefficiencies for users with visual impairments."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when: 1) An element has role='region' without an accessible name, 2) A section element has aria-label or aria-labelledby but no role='region', 3) A landmark region lacks a descriptive label.",
      "common_causes": [
        "Using role='region' without providing a name",
        "Applying regions to generic containers without purpose",
        "Omitting labels when converting sections to regions",
        "Using regions where standard landmarks would be more appropriate"
      ]
    },
    "fixes": [
      {
        "step": "Step 1: Add an accessible name using aria-label or aria-labelledby",
        "code_reference": "https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/"
      },
      {
        "step": "Step 2: For section elements, either add role='region' or use a more specific landmark role",
        "code_reference": "https://www.w3.org/TR/wai-aria-1.2/#region"
      },
      {
        "step": "Step 3: Consider using standard landmarks (navigation, main, etc.) instead of generic regions",
        "code_reference": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
      }
    ],
    "best_practices": [
      "Use standard landmarks before resorting to generic regions",
      "Ensure region names are concise but descriptive",
      "Test region navigation with screen readers",
      "Maintain consistent naming patterns across the site"
    ],
    "code_examples": {
      "before": "<div role='region'>\n  <!-- Content without accessible name -->\n</div>",
      "after": "<div role='region' aria-labelledby='products-heading'>\n  <h2 id='products-heading'>Featured Products</h2>\n  <!-- Content -->\n</div>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/region"
      },
      {
        "title": "WCAG Success Criterion 1.3.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html"
      },
      {
        "title": "ARIA Region Role",
        "url": "https://www.w3.org/TR/wai-aria-1.2/#region"
      },
      {
        "title": "Landmark Regions Guide",
        "url": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
      }
    ]
  },
    "scrollable-region-focusable": {
    "rule_id": "scrollable-region-focusable",
    "issue_explanation": "This rule checks that scrollable regions (elements with overflow: auto or scroll) can receive keyboard focus and be scrolled using keyboard controls. Scrollable regions that aren't focusable create accessibility barriers for keyboard-only users who need to access overflow content.",
    "wcag_guidelines": [
      "2.1.1 Keyboard (Level A)",
      "2.4.3 Focus Order (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 1194.22(a)",
      "EN 301 549 V3.2.1 - 11.4.1.2"
    ],
    "impact": {
      "severity": "High",
      "description": "Keyboard users cannot scroll or access content within scrollable regions that don't receive focus. This particularly affects users with motor impairments who rely on keyboard navigation and cannot use mouse wheel or touch scrolling."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when: 1) A scrollable element has no tabindex attribute, 2) The element cannot receive focus programmatically, 3) Keyboard scroll events aren't handled, 4) The element has overflow:scroll/auto but isn't keyboard operable.",
      "common_causes": [
        "Creating custom scroll containers without keyboard support",
        "Using overflow styles without considering keyboard access",
        "Assuming mouse/touch scrolling is sufficient",
        "Modal dialogs with scrollable content that traps focus"
      ]
    },
    "fixes": [
      {
        "step": "Step 1: Add tabindex='0' to make scrollable region focusable",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/failures/F15"
      },
      {
        "step": "Step 2: Ensure scrollable region can be operated with keyboard (arrow keys, page up/down)",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/keyboard/KEYBOARD"
      },
      {
        "step": "Step 3: For custom scroll components, implement keyboard event handlers",
        "code_reference": "https://www.w3.org/TR/wai-aria-practices-1.2/#keyboard-interaction-for-scrollable-regions"
      }
    ],
    "best_practices": [
      "Prefer native scrollable elements when possible",
      "Test all scrollable regions with keyboard only",
      "Ensure focus indicators are visible for scrollable regions",
      "Handle both vertical and horizontal scrolling with keyboard"
    ],
    "code_examples": {
      "before": "<div style='overflow: auto; height: 200px;'>\n  <!-- Scrollable content -->\n</div>",
      "after": "<div style='overflow: auto; height: 200px;' tabindex='0'>\n  <!-- Keyboard-operable scrollable content -->\n</div>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/scrollable-region-focusable"
      },
      {
        "title": "WCAG Success Criterion 2.1.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html"
      },
      {
        "title": "ARIA Scrollable Regions",
        "url": "https://www.w3.org/TR/wai-aria-practices-1.2/#keyboard-interaction-for-scrollable-regions"
      },
      {
        "title": "Keyboard Accessibility Techniques",
        "url": "https://www.w3.org/WAI/WCAG21/Techniques/keyboard/KEYBOARD"
      }
    ]
  },
    "html-has-lang": {
    "rule_id": "html-has-lang",
    "issue_explanation": "This rule checks that the HTML document specifies a language attribute (lang) on the root element. Missing language declaration prevents assistive technologies from properly interpreting and announcing content in the correct language, affecting pronunciation and character handling.",
    "wcag_guidelines": [
      "3.1.1 Language of Page (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 1194.22(a)",
      "EN 301 549 V3.2.1 - 11.4.1.2"
    ],
    "impact": {
      "severity": "Critical",
      "description": "Screen readers may mispronounce content or use incorrect character sets when the language isn't specified. This creates comprehension barriers for users with visual impairments and cognitive disabilities who rely on proper language interpretation. Search engines and translation tools also depend on this attribute."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when: 1) The html element has no lang attribute, 2) The lang attribute is empty, 3) The lang value is invalid (not a recognized language code), 4) The xml:lang attribute is used without corresponding lang attribute.",
      "common_causes": [
        "Omitting the lang attribute in template files",
        "Using incomplete or incorrect language codes",
        "Assuming browser defaults are sufficient",
        "CMS configurations that don't include language metadata"
      ]
    },
    "fixes": [
      {
        "step": "Step 1: Add a valid lang attribute to the html element (e.g., <html lang='en'>)",
        "code_reference": "https://www.w3.org/International/questions/qa-html-language-declarations"
      },
      {
        "step": "Step 2: For multilingual pages, specify language changes in content sections",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/html/H58"
      },
      {
        "step": "Step 3: Verify language codes using IANA language subtag registry",
        "code_reference": "https://www.iana.org/assignments/language-subtag-registry"
      }
    ],
    "best_practices": [
      "Always declare the primary document language",
      "Use ISO 639-1 language codes for maximum compatibility",
      "Test with screen readers in the specified language",
      "Include lang attribute in all HTML templates"
    ],
    "code_examples": {
      "before": "<html>\n  <!-- Missing lang attribute -->\n  <head>...</head>\n</html>",
      "after": "<html lang='en'>\n  <!-- Proper language declaration -->\n  <head>...</head>\n</html>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/html-has-lang"
      },
      {
        "title": "WCAG Success Criterion 3.1.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/language-of-page.html"
      },
      {
        "title": "HTML Language Declaration Guide",
        "url": "https://www.w3.org/International/questions/qa-html-language-declarations"
      },
      {
        "title": "Language Subtag Registry",
        "url": "https://www.iana.org/assignments/language-subtag-registry"
      }
    ]
  },
    "image-alt": {
    "rule_id": "image-alt",
    "issue_explanation": "This rule verifies that all meaningful images have appropriate alternative text (alt attributes) that conveys their purpose and content. Images without proper alternative text create information gaps for users who cannot see them, including screen reader users and those with images disabled.",
    "wcag_guidelines": [
      "1.1.1 Non-text Content (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 1194.22(a)",
      "EN 301 549 V3.2.1 - 11.4.1.2"
    ],
    "impact": {
      "severity": "High",
      "description": "Screen reader users receive no information about images missing alt text, losing important visual content. Low-vision users relying on text alternatives miss contextual information. Search engines cannot properly index image content without alt attributes."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when: 1) An img element has no alt attribute, 2) The alt attribute is empty on meaningful images, 3) Decorative images lack empty alt (alt=''), 4) SVG images without proper text alternatives, 5) CSS background images conveying information lack text alternatives.",
      "common_causes": [
        "Omitting alt attributes during development",
        "Using placeholder or default alt text",
        "Not distinguishing between decorative and informative images",
        "Assuming complex images don't need descriptions",
        "Using images as text without proper alternatives"
      ]
    },
    "fixes": [
      {
        "step": "Step 1: Add descriptive alt text for informative images (alt='description')",
        "code_reference": "https://www.w3.org/WAI/tutorials/images/decision-tree/"
      },
      {
        "step": "Step 2: Mark decorative images with empty alt (alt='')",
        "code_reference": "https://www.w3.org/WAI/tutorials/images/decorative/"
      },
      {
        "step": "Step 3: For complex images, provide extended descriptions using aria-describedby or longdesc",
        "code_reference": "https://www.w3.org/WAI/tutorials/images/complex/"
      }
    ],
    "best_practices": [
      "Write concise, descriptive alt text that conveys the image's purpose",
      "Test with screen readers to verify alt text announcements",
      "Avoid redundant alt text that duplicates adjacent text",
      "For functional images, describe the function rather than appearance",
      "Use CSS for decorative elements instead of img tags when possible"
    ],
    "code_examples": {
      "before": "<img src='logo.png'>\n<img src='decorative-border.jpg'>\n<img src='chart.jpg' alt='chart'>",
      "after": "<img src='logo.png' alt='Company logo'>\n<img src='decorative-border.jpg' alt=''>\n<img src='chart.jpg' alt='Sales growth chart showing 20% increase Q3 2023'>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/image-alt"
      },
      {
        "title": "WCAG Success Criterion 1.1.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html"
      },
      {
        "title": "W3C Image Alt Decision Tree",
        "url": "https://www.w3.org/WAI/tutorials/images/decision-tree/"
      },
      {
        "title": "ARIA and Images",
        "url": "https://www.w3.org/WAI/tutorials/images/"
      }
    ]
  },
    "page-has-heading-one": {
    "rule_id": "page-has-heading-one",
    "issue_explanation": "This rule checks that each page contains at least one heading level 1 (h1) element that serves as the primary title of the page content. Missing h1 headings create structural and navigational challenges for assistive technology users by depriving them of clear content hierarchy.",
    "wcag_guidelines": [
      "1.3.1 Info and Relationships (Level A)",
      "2.4.6 Headings and Labels (Level AA)",
      "2.4.10 Section Headings (Level AAA)",
      "Section 508 § 1194.22(a)",
      "EN 301 549 V3.2.1 - 11.4.1.2"
    ],
    "impact": {
      "severity": "High",
      "description": "Screen reader users navigating by headings lose the most important structural landmark, making it difficult to understand the page's main topic and content organization. This creates significant navigation inefficiencies for users with visual impairments and cognitive disabilities."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when: 1) No h1 element exists in the document, 2) The h1 is hidden from assistive technologies, 3) Multiple h1 elements create ambiguous page structure, 4) The h1 doesn't accurately describe the page content.",
      "common_causes": [
        "Using divs with styling instead of semantic headings",
        "Hiding the h1 visually without proper accessibility considerations",
        "Component-based architectures that fragment heading structure",
        "CMS templates that omit or duplicate h1 elements"
      ]
    },
    "fixes": [
      {
        "step": "Step 1: Add a single, descriptive h1 element that summarizes the page content",
        "code_reference": "https://www.w3.org/WAI/tutorials/page-structure/headings/"
      },
      {
        "step": "Step 2: Ensure the h1 is visible to assistive technologies (avoid display:none)",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/failures/F43"
      },
      {
        "step": "Step 3: Maintain proper heading hierarchy (h1 followed by h2, etc.)",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/general/G141"
      }
    ],
    "best_practices": [
      "Use a single h1 per page as the main content title",
      "Make h1 content distinct from page title or site name",
      "Test heading navigation with screen readers",
      "Ensure visual styling matches heading level importance",
      "Maintain consistent heading patterns across the site"
    ],
    "code_examples": {
      "before": "<body>\n  <h2>Section Title</h2>\n  <!-- Content without h1 -->\n</body>",
      "after": "<body>\n  <h1>Product Documentation</h1>\n  <h2>Installation Guide</h2>\n  <!-- Proper heading hierarchy -->\n</body>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/page-has-heading-one"
      },
      {
        "title": "WCAG Success Criterion 2.4.6",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/headings-and-labels.html"
      },
      {
        "title": "W3C Heading Structure Guide",
        "url": "https://www.w3.org/WAI/tutorials/page-structure/headings/"
      },
      {
        "title": "ARIA Heading Roles",
        "url": "https://www.w3.org/TR/wai-aria-1.2/#heading"
      }
    ]
  },
    "accesskeys": {
    "rule_id": "accesskeys",
    "issue_explanation": "This rule checks that accesskey attributes are not used, as they often conflict with browser and screen reader shortcuts, creating unexpected behavior for keyboard users. Accesskeys can override assistive technology commands and vary across browsers and platforms, leading to inconsistent user experiences.",
    "wcag_guidelines": [
      "2.1.1 Keyboard (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 1194.22(a)",
      "EN 301 549 V3.2.1 - 11.4.1.2"
    ],
    "impact": {
      "severity": "High",
      "description": "Keyboard users, particularly those with motor impairments relying on assistive technologies, may experience broken shortcuts or unexpected focus jumps when accesskeys conflict with their tools. Screen reader users may have their navigation commands overridden by page-defined accesskeys."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when: 1) Any accesskey attribute is present, 2) Accesskeys conflict with browser/OS shortcuts, 3) Multiple elements share the same accesskey, 4) Accesskeys lack visual indication or documentation.",
      "common_causes": [
        "Attempting to create keyboard shortcuts without considering conflicts",
        "Copying legacy code with accesskey implementations",
        "Assuming accesskeys provide universal keyboard navigation benefits",
        "Not testing with various assistive technologies"
      ]
    },
    "fixes": [
      {
        "step": "Step 1: Remove all accesskey attributes from elements",
        "code_reference": "https://www.w3.org/TR/html-aria/#docconformance"
      },
      {
        "step": "Step 2: Implement proper keyboard navigation with tabindex and JavaScript event handlers",
        "code_reference": "https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/"
      },
      {
        "step": "Step 3: Provide visible keyboard shortcuts documentation if needed",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/general/G127"
      }
    ],
    "best_practices": [
      "Avoid accesskeys entirely in modern web development",
      "Use semantic HTML and proper tab order for keyboard navigation",
      "Test all interactive elements with keyboard-only operation",
      "Consider ARIA keyboard patterns for complex widgets",
      "Document any custom keyboard interactions clearly"
    ],
    "code_examples": {
      "before": "<button accesskey='s'>Save</button>",
      "after": "<button id='save-btn'>Save</button>\n<script>\n  document.addEventListener('keydown', (e) => {\n    if (e.ctrlKey && e.key === 's') {\n      e.preventDefault();\n      document.getElementById('save-btn').click();\n    }\n  });\n</script>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/accesskeys"
      },
      {
        "title": "WCAG Success Criterion 2.1.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html"
      },
      {
        "title": "ARIA Keyboard Patterns",
        "url": "https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/"
      },
      {
        "title": "HTML Accessibility Guidance",
        "url": "https://html.spec.whatwg.org/multipage/interaction.html#the-accesskey-attribute"
      }
    ]
  },
    "area-alt": {
    "rule_id": "area-alt",
    "issue_explanation": "The `area-alt` rule checks that every `<area>` element within an image map has a non-empty `alt` attribute. Image maps require alternative text for each clickable area to ensure screen reader users understand the purpose of each region. Without `alt` text, users with visual impairments cannot navigate or understand the functionality of the image map.",
    "wcag_guidelines": [
      "1.1.1 Non-text Content (Level A)",
      "2.4.4 Link Purpose (In Context) (Level A)",
      "4.1.2 Name, Role, Value (Level A)"
    ],
    "impact": {
      "severity": "Critical",
      "description": "Screen reader users rely on `alt` text to interpret image maps. Missing `alt` attributes render these interactive areas unusable, effectively hiding navigation or functionality from assistive technology users."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when an `<area>` element: 1) Has no `alt` attribute, or 2) Has an empty `alt` attribute (`alt=\"\"`), unless the area is decorative (which should use `role=\"presentation\"`).",
      "common_causes": "1) Omitting `alt` attributes for `<area>` elements. 2) Using placeholder or repetitive `alt` text (e.g., `alt=\"link\"`). 3) Incorrectly marking decorative areas without `role=\"presentation\"`."
    },
    "fixes": [
      {
        "step": "Add a descriptive `alt` attribute to every `<area>` element that conveys the purpose of the link (e.g., `alt=\"Contact Us\"`).",
        "code_reference": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/area#attr-alt"
      },
      {
        "step": "If the area is purely decorative, add `role=\"presentation\"` and an empty `alt` (`alt=\"\"`).",
        "code_reference": "https://www.w3.org/WAI/tutorials/images/decorative/"
      }
    ],
    "best_practices": [
      "Use client-side image maps (`<map>` with `<area>`) sparingly; consider alternative navigation structures for complex interactions.",
      "Test image maps with screen readers to verify `alt` text is announced clearly."
    ],
    "code_examples": {
      "before": "<map name=\"nav-map\">\n  <area shape=\"rect\" coords=\"0,0,100,50\" href=\"home.html\"> <!-- Violation: Missing `alt` -->\n  <area shape=\"circle\" coords=\"200,50,25\" href=\"about.html\" alt=\"\"> <!-- Violation: Empty `alt` -->\n</map>",
      "after": "<map name=\"nav-map\">\n  <area shape=\"rect\" coords=\"0,0,100,50\" href=\"home.html\" alt=\"Home\"> <!-- Fixed: Descriptive `alt` -->\n  <area shape=\"circle\" coords=\"200,50,25\" href=\"about.html\" alt=\"About Us\"> <!-- Fixed: Meaningful `alt` -->\n</map>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.8/area-alt"
      },
      {
        "title": "WCAG Success Criterion 1.1.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html"
      }
    ]
  },
    "aria-input-field-name": {
    "rule_id": "aria-input-field-name",
    "issue_explanation": "The `aria-input-field-name` rule ensures that ARIA input fields (e.g., `role='textbox'`, `role='combobox'`) have an accessible name. Without a proper name, screen reader users cannot understand the purpose or expected input of the field, leading to confusion and inaccessible forms.",
    "wcag_guidelines": [
      "4.1.2 Name, Role, Value (Level A)",
      "3.3.2 Labels or Instructions (Level A)",
      "Section 508 § 502.3.1 (Interoperability with Assistive Technology)"
    ],
    "impact": {
      "severity": "High",
      "description": "Screen reader users rely on accessible names to interact with form inputs. Missing names make it impossible to understand the field's purpose, preventing users from completing forms or providing accurate input."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when an element with an ARIA input role (e.g., `textbox`, `combobox`, `searchbox`) lacks an accessible name. This includes missing: `aria-label`, `aria-labelledby`, a referenced `<label>`, or a native HTML label (e.g., `<label for='...'>`).",
      "common_causes": "1) Using ARIA roles without providing a name. 2) Relying on visual cues (e.g., placeholder text) as the sole label. 3) Incorrectly associating labels with ARIA properties."
    },
    "fixes": [
      {
        "step": "Add an `aria-label` or `aria-labelledby` attribute to the ARIA input field (e.g., `aria-label='Search term'`).",
        "code_reference": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
      },
      {
        "step": "Use a native `<label>` element with `for=[id]` to associate text with the input (preferred over ARIA).",
        "code_reference": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label"
      }
    ],
    "best_practices": [
      "Prefer semantic HTML inputs (`<input type='text'>`, `<select>`) with native labels instead of ARIA roles where possible.",
      "Test ARIA inputs with screen readers to verify names are announced correctly."
    ],
    "code_examples": {
      "before": "<div role='textbox' id='search'> <!-- Violation: No accessible name -->\n  Enter search term\n</div>",
      "after": "<div role='textbox' id='search' aria-label='Search term'> <!-- Fixed: `aria-label` added -->\n  Enter search term\n</div>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.8/aria-input-field-name"
      },
      {
        "title": "WCAG Success Criterion 4.1.2",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html"
      }
    ]
  },
    "aria-roledescription": {
    "rule_id": "aria-roledescription",
    "issue_explanation": "The `aria-roledescription` rule ensures that when the `aria-roledescription` attribute is used, the element also has a valid ARIA role and that the custom role description doesn't obscure the element's actual role or state. Misuse can mislead screen reader users by providing unclear or incorrect semantic information about the element's function.",
    "wcag_guidelines": [
      "4.1.2 Name, Role, Value (Level A)",
      "1.3.1 Info and Relationships (Level A)",
      "Section 508 § 502.3.1 (Interoperability with Assistive Technology)"
    ],
    "impact": {
      "severity": "Moderate",
      "description": "Screen reader users rely on accurate role information to understand and interact with UI components. An incorrect or misleading `aria-roledescription` can cause confusion, especially for users with cognitive disabilities or those relying on consistent semantic mappings."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when: 1) `aria-roledescription` is used without a valid ARIA role, 2) The description overrides critical role semantics (e.g., calling a button a 'card'), or 3) The description is redundant or unhelpful (e.g., 'clickable thing').",
      "common_causes": "1) Using `aria-roledescription` without setting a proper ARIA role. 2) Over-customizing descriptions to the point of obscuring functionality. 3) Applying `aria-roledescription` to non-interactive elements unnecessarily."
    },
    "fixes": [
      {
        "step": "Ensure the element has a valid ARIA role (e.g., `role='button'`) before using `aria-roledescription`.",
        "code_reference": "https://www.w3.org/TR/wai-aria-1.2/#aria-roledescription"
      },
      {
        "step": "Use `aria-roledescription` sparingly and only to enhance—not replace—the element's semantic role (e.g., `role='button' aria-roledescription='Slide controller'`).",
        "code_reference": "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-roledescription"
      }
    ],
    "best_practices": [
      "Test with screen readers to verify the custom description complements (not conflicts with) the announced role.",
      "Avoid using `aria-roledescription` for static content or elements with well-understood roles (e.g., standard buttons)."
    ],
    "code_examples": {
      "before": "<div aria-roledescription='card'> <!-- Violation: Missing role -->\n  Click me\n</div>",
      "after": "<div role='button' aria-roledescription='Card action'> <!-- Fixed: Valid role + meaningful description -->\n  Click me\n</div>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.8/aria-roledescription"
      },
      {
        "title": "WCAG Success Criterion 4.1.2",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html"
      }
    ]
  },
    "aria-toggle-field-name": {
    "rule_id": "aria-toggle-field-name",
    "issue_explanation": "This rule ensures that toggle elements (e.g., checkboxes, switches) with ARIA roles like 'switch' or 'checkbox' have an accessible name. Without a proper name, screen reader users cannot understand the purpose or current state of the toggle control, making it impossible to interact with effectively.",
    "wcag_guidelines": [
      "4.1.2 Name, Role, Value (Level A)",
      "3.3.2 Labels or Instructions (Level A)",
      "Section 508 § 502.3.1 (Interoperability with Assistive Technology)",
      "EN 301 549 V3.2.1 - 11.5.2.5 (Label Relationships)"
    ],
    "impact": {
      "severity": "High",
      "description": "Screen reader users rely on accessible names to understand and operate toggle controls. Missing names prevent users from knowing what the toggle controls, its current state (on/off), or how to interact with it, creating barriers in forms and interactive interfaces."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when an element with a toggle role (e.g., role='switch', role='checkbox') lacks an accessible name provided through: aria-label, aria-labelledby, a referenced <label> element, or a native HTML label association.",
      "common_causes": [
        "Using ARIA toggle roles without providing any accessible name",
        "Relying solely on visual text near the toggle that isn't programmatically associated",
        "Using placeholder text as a label substitute",
        "Incorrectly implementing custom toggle controls without proper ARIA attributes"
      ]
    },
    "fixes": [
      {
        "step": "Add an explicit label using aria-label if there's no visible text (e.g., aria-label='Enable dark mode')",
        "code_reference": "https://www.w3.org/WAI/ARIA/apg/patterns/switch/"
      },
      {
        "step": "Associate visible text with the toggle using aria-labelledby or a <label> element with for=[id]",
        "code_reference": "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby"
      },
      {
        "step": "For native HTML checkboxes, always use a <label> element instead of ARIA solutions",
        "code_reference": "https://www.w3.org/WAI/tutorials/forms/labels/"
      }
    ],
    "best_practices": [
      "Prefer native HTML checkboxes (<input type='checkbox'>) with <label> elements over ARIA implementations when possible",
      "Ensure toggle controls clearly indicate their state (e.g., using aria-checked='true/false')",
      "Test all toggle controls with screen readers to verify name and state announcements",
      "Keep toggle labels concise but descriptive of both the control and its effect"
    ],
    "code_examples": {
      "before": [
        "<!-- Violation: Missing accessible name -->",
        "<div role='switch' tabindex='0'></div>",
        "",
        "<!-- Violation: Visual text not programmatically associated -->",
        "<span id='toggle-text'>Dark Mode</span>",
        "<div role='checkbox' tabindex='0'></div>"
      ],
      "after": [
        "<!-- Fixed: Using aria-label -->",
        "<div role='switch' tabindex='0' aria-label='Enable dark mode' aria-checked='false'></div>",
        "",
        "<!-- Fixed: Using aria-labelledby -->",
        "<span id='toggle-label'>Dark Mode</span>",
        "<div role='checkbox' tabindex='0' aria-labelledby='toggle-label' aria-checked='false'></div>",
        "",
        "<!-- Preferred: Native HTML with label -->",
        "<label>",
        "  <input type='checkbox'> Dark Mode",
        "</label>"
      ]
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.8/aria-toggle-field-name"
      },
      {
        "title": "WCAG Success Criterion 4.1.2",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html"
      },
      {
        "title": "ARIA Switch Pattern",
        "url": "https://www.w3.org/WAI/ARIA/apg/patterns/switch/"
      },
      {
        "title": "WebAIM: Creating Accessible Forms",
        "url": "https://webaim.org/techniques/forms/controls"
      }
    ]
  }, 
    "autocomplete-valid": {
    "rule_id": "autocomplete-valid",
    "issue_explanation": "This rule ensures form fields requiring user input have valid and appropriate autocomplete attributes. The autocomplete attribute helps users with cognitive disabilities, motor impairments, or memory limitations by allowing browsers to fill in fields automatically with previously stored information. Invalid or missing autocomplete values make forms harder to complete, particularly for users who rely on this functionality.",
    "wcag_guidelines": [
      "1.3.5 Identify Input Purpose (Level AA)",
      "3.3.2 Labels or Instructions (Level A)",
      "Section 508 § 502.3.1 (Interoperability with Assistive Technology)",
      "EN 301 549 V3.2.1 - 11.5.2.5 (Label Relationships)"
    ],
    "impact": {
      "severity": "Moderate",
      "description": "Users with cognitive disabilities, memory impairments, or motor control difficulties are significantly impacted when autocomplete functionality is missing or incorrect. These users may struggle to complete forms accurately or efficiently, leading to frustration and potential form abandonment."
    },
    "technical_analysis": {
      "failure_conditions": [
        "The autocomplete attribute contains an invalid value not specified in the HTML Living Standard",
        "Required form fields (like username, email, or credit card fields) lack appropriate autocomplete attributes",
        "The autocomplete value doesn't match the field's actual purpose (e.g., using 'email' for a username field)"
      ],
      "common_causes": [
        "Omitting autocomplete attributes for important form fields",
        "Using custom or made-up autocomplete values instead of standard ones",
        "Incorrectly implementing autocomplete for complex or custom form controls",
        "Setting autocomplete='off' for fields that should support autofill"
      ]
    },
    "fixes": [
      {
        "step": "Add appropriate autocomplete attributes to all relevant form fields using standard values from the HTML specification (e.g., 'given-name', 'email', 'current-password')",
        "code_reference": "https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill"
      },
      {
        "step": "For sensitive fields where autocomplete should be disabled, use autocomplete='off' or specific values like 'new-password' for password fields",
        "code_reference": "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete"
      },
      {
        "step": "Ensure autocomplete values match the field's actual purpose (e.g., use 'tel' for phone numbers, 'email' for email addresses)",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/html/H98"
      }
    ],
    "best_practices": [
      "Use the most specific autocomplete value available for each field type",
      "Test form autocompletion behavior across different browsers and devices",
      "Combine autocomplete with proper labeling for maximum accessibility",
      "Only disable autocomplete (autocomplete='off') when there's a genuine security requirement",
      "For complex forms, consider using section-specific autocomplete like 'section-blue shipping tel'"
    ],
    "code_examples": {
      "before": [
        "<!-- Violation: Missing autocomplete -->",
        "<input type='text' id='name'>",
        "",
        "<!-- Violation: Invalid autocomplete value -->",
        "<input type='email' id='email' autocomplete='email-address'>",
        "",
        "<!-- Violation: Unnecessarily disabled -->",
        "<input type='password' id='pw' autocomplete='off'>"
      ],
      "after": [
        "<!-- Fixed: Proper autocomplete -->",
        "<input type='text' id='name' autocomplete='name'>",
        "",
        "<!-- Fixed: Correct standard value -->",
        "<input type='email' id='email' autocomplete='email'>",
        "",
        "<!-- Fixed: Appropriate password handling -->",
        "<input type='password' id='pw' autocomplete='current-password'>"
      ]
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.8/autocomplete-valid"
      },
      {
        "title": "WCAG Success Criterion 1.3.5",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose.html"
      },
      {
        "title": "HTML Living Standard Autofill",
        "url": "https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill"
      },
      {
        "title": "WebAIM: Form Controls and Autocomplete",
        "url": "https://webaim.org/techniques/forms/controls#autocomplete"
      }
    ]
  },
    "blink": {
    "rule_id": "blink",
    "issue_explanation": "This rule identifies content that blinks or flashes more than 3 times per second, which can trigger seizures in users with photosensitive epilepsy and cause discomfort for users with vestibular disorders. The blinking effect, typically created via the deprecated <blink> HTML element or CSS/JavaScript animations, fails accessibility requirements for flashing content.",
    "wcag_guidelines": [
      "2.3.1 Three Flashes or Below Threshold (Level A)",
      "2.2.2 Pause, Stop, Hide (Level A)",
      "Section 508 § 501 (Interoperability with Assistive Technology)",
      "EN 301 549 V3.2.1 - 11.8.2 (Flashing)"
    ],
    "impact": {
      "severity": "Critical",
      "description": "Blinking content poses serious health risks, including triggering seizures in users with photosensitive epilepsy. It can also cause nausea, dizziness, or migraines for users with vestibular disorders, and generally creates a distracting experience for all users, particularly those with cognitive disabilities."
    },
    "technical_analysis": {
      "failure_conditions": [
        "Content flashes or blinks more than 3 times per second",
        "Use of the deprecated <blink> HTML element",
        "CSS animations or JavaScript that create rapid blinking effects (faster than 3Hz)",
        "Animated GIFs that flash rapidly"
      ],
      "common_causes": [
        "Legacy use of the <blink> tag",
        "CSS animations with rapid opacity/visibility changes",
        "JavaScript setInterval() calls with short durations creating blinking effects",
        "Embedded flashing advertisements or media",
        "Animated GIFs designed to attract attention"
      ]
    },
    "fixes": [
      {
        "step": "Remove all instances of the <blink> HTML element and replace with static content or accessible animations",
        "code_reference": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blink"
      },
      {
        "step": "For necessary animations, ensure they flash no more than 3 times per second and provide pause/stop controls",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/general/G4"
      },
      {
        "step": "Replace blinking effects with less intrusive visual cues (color changes, static highlights) that don't flash",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/general/G195"
      }
    ],
    "best_practices": [
      "Avoid all blinking/flashing content unless absolutely necessary",
      "If flashing must be used, strictly limit to maximum 3 flashes per second with small flash areas",
      "Provide prominent pause/stop controls for any moving or flashing content",
      "Test content with photosensitive epilepsy validation tools",
      "Consider alternative methods to draw attention (color contrast, icons, positioning)"
    ],
    "code_examples": {
      "before": [
        "<!-- Violation: Deprecated blink element -->",
        "<blink>Warning: Important message!</blink>",
        "",
        "<!-- Violation: Rapid CSS blinking -->",
        "<style>",
        ".alert { animation: blink 200ms infinite; }",
        "@keyframes blink { 50% { opacity: 0; } }",
        "</style>",
        "<div class='alert'>Urgent notification</div>"
      ],
      "after": [
        "<!-- Fixed: Static warning with visual cues -->",
        "<div class='warning' style='color: #d00; font-weight: bold;'>Warning: Important message!</div>",
        "",
        "<!-- Fixed: Subtle pulsing animation (meets flash thresholds) -->",
        "<style>",
        ".alert { animation: pulse 2s infinite; }",
        "@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.8; } }",
        "</style>",
        "<div class='alert'>Urgent notification <button onclick='stopAnimation()'>Stop</button></div>"
      ]
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.8/blink"
      },
      {
        "title": "WCAG Success Criterion 2.3.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/three-flashes-or-below-threshold.html"
      },
      {
        "title": "Photosensitive Epilepsy Analysis Tool",
        "url": "https://trace.umd.edu/peat/"
      },
      {
        "title": "WebAIM: Seizure Disorders",
        "url": "https://webaim.org/articles/seizure/"
      }
    ]
  },
    "definition-list": {
    "rule_id": "definition-list",
    "issue_explanation": "This rule ensures proper semantic structure for definition lists (<dl> elements) by requiring that they contain at least one definition term (<dt>) paired with at least one definition description (<dd>). Malformed definition lists create confusion for screen reader users and fail to properly convey relationships between terms and their definitions.",
    "wcag_guidelines": [
      "1.3.1 Info and Relationships (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 502.3.1 (Interoperability with Assistive Technology)"
    ],
    "impact": {
      "severity": "Moderate",
      "description": "Screen reader users rely on proper semantic structure to understand content relationships. Malformed definition lists may cause screen readers to announce content incorrectly or fail to convey the term-definition relationship, making it harder for users with visual impairments to understand paired information."
    },
    "technical_analysis": {
      "failure_conditions": [
        "A <dl> element contains no <dt> elements",
        "A <dl> element contains no <dd> elements",
        "A <dt> is not followed by at least one <dd> (or vice versa in invalid structures)",
        "Definition list items are structured incorrectly (e.g., <dd> before <dt>)"
      ],
      "common_causes": [
        "Using <dl> for layout purposes rather than semantic term-definition pairs",
        "Incorrect nesting of <dt> and <dd> elements",
        "Omitting either <dt> or <dd> when creating definition lists",
        "Using other elements (like <div> or <p>) instead of proper definition list elements"
      ]
    },
    "fixes": [
      {
        "step": "Ensure every <dl> contains at least one <dt>-<dd> pair",
        "code_reference": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl"
      },
      {
        "step": "Maintain proper nesting order: <dt> followed by one or more <dd> elements",
        "code_reference": "https://html.spec.whatwg.org/multipage/grouping-content.html#the-dl-element"
      },
      {
        "step": "For non-definition list content, use appropriate semantic containers like <ul>, <ol>, or <div> instead of <dl>",
        "code_reference": "https://www.w3.org/WAI/tutorials/page-structure/content/#lists"
      }
    ],
    "best_practices": [
      "Only use definition lists for true term-definition pairs (e.g., glossaries, metadata displays)",
      "Group related terms and definitions together within the same <dl>",
      "Consider using headings with regular lists for complex information structures",
      "Test definition lists with screen readers to verify proper announcement of relationships"
    ],
    "code_examples": {
      "before": [
        "<!-- Violation: Empty definition list -->",
        "<dl></dl>",
        "",
        "<!-- Violation: Missing <dd> -->",
        "<dl>",
        "  <dt>Term 1</dt>",
        "  <dt>Term 2</dt>",
        "</dl>",
        "",
        "<!-- Violation: Incorrect structure -->",
        "<dl>",
        "  <dd>Description first</dd>",
        "  <dt>Term after</dt>",
        "</dl>"
      ],
      "after": [
        "<!-- Fixed: Proper term-definition pairs -->",
        "<dl>",
        "  <dt>HTML</dt>",
        "  <dd>HyperText Markup Language</dd>",
        "  <dt>CSS</dt>",
        "  <dd>Cascading Style Sheets</dd>",
        "</dl>",
        "",
        "<!-- Fixed: Multiple descriptions for one term -->",
        "<dl>",
        "  <dt>WCAG</dt>",
        "  <dd>Web Content Accessibility Guidelines</dd>",
        "  <dd>A set of recommendations for making web content more accessible</dd>",
        "</dl>"
      ]
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.8/definition-list"
      },
      {
        "title": "WCAG Success Criterion 1.3.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html"
      },
      {
        "title": "HTML DL Element Specification",
        "url": "https://html.spec.whatwg.org/multipage/grouping-content.html#the-dl-element"
      },
      {
        "title": "WebAIM: Creating Accessible Lists",
        "url": "https://webaim.org/techniques/semanticstructure/#lists"
      }
    ]
  },
    "dlitem": {
    "rule_id": "dlitem",
    "issue_explanation": "This rule ensures that definition list items (<dt> and <dd>) are properly contained within a <dl> element and follow correct structural patterns. When definition list items exist outside a <dl> container or in incorrect sequences, screen readers cannot properly interpret the term-definition relationships, breaking the semantic structure.",
    "wcag_guidelines": [
      "1.3.1 Info and Relationships (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 502.3.1 (Interoperability with Assistive Technology)"
    ],
    "impact": {
      "severity": "Moderate",
      "description": "Screen reader users rely on proper document structure to understand content relationships. Isolated <dt> or <dd> elements, or improperly sequenced items, prevent assistive technologies from correctly announcing term-definition pairs, making glossary-style content difficult to comprehend for users with visual impairments."
    },
    "technical_analysis": {
      "failure_conditions": [
        "A <dt> or <dd> element exists outside a <dl> container",
        "A <dt> is not immediately followed by at least one <dd>",
        "A <dd> appears without a preceding <dt> in the same <dl>",
        "Definition list items are nested in invalid parent elements"
      ],
      "common_causes": [
        "Placing definition list items directly in <body> or other non-<dl> containers",
        "Using incorrect element order (e.g., <dd> before <dt>)",
        "Splitting term-definition pairs across multiple <dl> elements",
        "Semantically misusing <dt>/<dd> for styling purposes rather than true definitions"
      ]
    },
    "fixes": [
      {
        "step": "Wrap all <dt> and <dd> elements in a parent <dl> element",
        "code_reference": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl"
      },
      {
        "step": "Ensure each <dt> is immediately followed by one or more <dd> elements",
        "code_reference": "https://html.spec.whatwg.org/multipage/grouping-content.html#the-dl-element"
      },
      {
        "step": "For non-definition content, use appropriate semantic containers like <div>, <ul>, or <section> instead",
        "code_reference": "https://www.w3.org/WAI/tutorials/page-structure/content/"
      }
    ],
    "best_practices": [
      "Only use definition lists for true term-definition relationships (not for layout)",
      "Group related terms and definitions in single <dl> containers",
      "Maintain consistent patterns (one <dt> followed by one or more <dd> elements)",
      "Test with screen readers to verify proper announcement of term-definition pairs",
      "Consider ARIA roles like 'list' and 'listitem' for custom interactive lists"
    ],
    "code_examples": {
      "before": [
        "<!-- Violation: Definition items outside <dl> -->",
        "<dt>Accessibility</dt>",
        "<dd>The practice of making content usable by all people</dd>",
        "",
        "<!-- Violation: Incorrect sequence -->",
        "<dl>",
        "  <dd>Description without term</dd>",
        "  <dt>Isolated term</dt>",
        "</dl>"
      ],
      "after": [
        "<!-- Fixed: Properly contained in <dl> -->",
        "<dl>",
        "  <dt>Accessibility</dt>",
        "  <dd>The practice of making content usable by all people</dd>",
        "</dl>",
        "",
        "<!-- Fixed: Correct sequence -->",
        "<dl>",
        "  <dt>WCAG</dt>",
        "  <dd>Web Content Accessibility Guidelines</dd>",
        "  <dt>WAI-ARIA</dt>",
        "  <dd>Web Accessibility Initiative - Accessible Rich Internet Applications</dd>",
        "  <dd>Provides additional semantics for custom widgets</dd>",
        "</dl>"
      ]
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.8/dlitem"
      },
      {
        "title": "WCAG Success Criterion 1.3.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html"
      },
      {
        "title": "HTML Definition Lists Specification",
        "url": "https://html.spec.whatwg.org/multipage/grouping-content.html#the-dl-element"
      },
      {
        "title": "WebAIM: Semantic Structure",
        "url": "https://webaim.org/techniques/semanticstructure/"
      }
    ]
  },
    "duplicate-id-active": {
    "rule_id": "duplicate-id-active",
    "issue_explanation": "This rule identifies duplicate ID values assigned to active, focusable elements in the DOM. When multiple interactive elements share the same ID, it causes ambiguity in assistive technology and JavaScript interactions, breaking ARIA relationships and fragment navigation. The issue manifests when screen readers or keyboard users attempt to interact with elements that cannot be uniquely identified.",
    "wcag_guidelines": [
      "4.1.1 Parsing (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 502.3.1 (Interoperability with Assistive Technology)",
      "EN 301 549 V3.2.1 - 11.5.2.5 (Label Relationships)"
    ],
    "impact": {
      "severity": "High",
      "description": "Screen reader users may experience incorrect focus announcements or be unable to interact with intended elements. Keyboard users may navigate to unexpected locations. All users may encounter broken functionality when JavaScript relies on unique IDs for event handling or ARIA relationships (e.g., aria-labelledby, aria-describedby)."
    },
    "technical_analysis": {
      "failure_conditions": [
        "Two or more focusable elements share the same ID value in the same document",
        "Duplicate IDs exist on interactive elements (buttons, links, form controls, etc.)",
        "Duplicate IDs break ARIA relationships or fragment identifiers",
        "The duplicate IDs are in the document simultaneously (not hidden/templated)"
      ],
      "common_causes": [
        "Copy-pasting component code without updating IDs",
        "Dynamically generated content with non-unique IDs",
        "Using component libraries that don't scope IDs properly",
        "Manual ID assignment without checking uniqueness",
        "Including the same template/partial multiple times"
      ]
    },
    "fixes": [
      {
        "step": "Ensure all interactive elements have unique IDs across the entire document",
        "code_reference": "https://html.spec.whatwg.org/multipage/dom.html#the-id-attribute"
      },
      {
        "step": "For dynamically generated content, use unique identifiers or UUIDs",
        "code_reference": "https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID"
      },
      {
        "step": "Remove unnecessary IDs if they're not used for ARIA, labels, or JavaScript",
        "code_reference": "https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/"
      },
      {
        "step": "Use class names or data attributes instead of IDs for styling and JavaScript hooks",
        "code_reference": "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*"
      }
    ],
    "best_practices": [
      "Implement automated ID uniqueness checking in your build process",
      "Use component-scoped IDs in modern frameworks (e.g., Vue's scoped IDs)",
      "Test with screen readers after dynamic content updates",
      "Verify all ARIA relationships work correctly after ID changes",
      "Consider using aria-labelledby only when necessary to reduce ID dependencies"
    ],
    "code_examples": {
      "before": [
        "<!-- Violation: Duplicate IDs on buttons -->",
        "<button id='submit-btn'>Save</button>",
        "<button id='submit-btn'>Submit</button>",
        "",
        "<!-- Violation: Duplicate IDs breaking ARIA -->",
        "<div id='error-msg'>Invalid input</div>",
        "<input aria-describedby='error-msg'>",
        "<div id='error-msg'>Different error</div>"
      ],
      "after": [
        "<!-- Fixed: Unique IDs -->",
        "<button id='save-btn'>Save</button>",
        "<button id='submit-btn'>Submit</button>",
        "",
        "<!-- Fixed: Unique ARIA references -->",
        "<div id='name-error'>Invalid name</div>",
        "<input aria-describedby='name-error'>",
        "<div id='email-error'>Invalid email</div>",
        "<input aria-describedby='email-error'>"
      ]
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.8/duplicate-id-active"
      },
      {
        "title": "WCAG Success Criterion 4.1.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/parsing.html"
      },
      {
        "title": "HTML ID Attribute Specification",
        "url": "https://html.spec.whatwg.org/multipage/dom.html#the-id-attribute"
      },
      {
        "title": "WebAIM: Creating Accessible Forms",
        "url": "https://webaim.org/techniques/forms/"
      }
    ]
  },
    "duplicate-id-aria": {
    "rule_id": "duplicate-id-aria",
    "issue_explanation": "This rule identifies duplicate ID values used in ARIA attributes (e.g., aria-labelledby, aria-describedby) which create ambiguous relationships between elements. When multiple elements share the same ID referenced by ARIA properties, assistive technologies cannot reliably determine which element should be announced as the label or description, leading to incorrect or missing accessibility information.",
    "wcag_guidelines": [
      "4.1.2 Name, Role, Value (Level A)",
      "1.3.1 Info and Relationships (Level A)",
      "Section 508 § 502.3.1 (Interoperability with Assistive Technology)",
      "EN 301 549 V3.2.1 - 11.5.2.5 (Label Relationships)"
    ],
    "impact": {
      "severity": "High",
      "description": "Screen reader users may receive incorrect or missing labels/descriptions for interactive elements, making forms and complex widgets unusable. Keyboard users may lack critical context for operating controls. The issue particularly impacts users with visual and cognitive disabilities who rely on accurate programmatic associations."
    },
    "technical_analysis": {
      "failure_conditions": [
        "Two or more elements share the same ID value in the same document",
        "The duplicate ID is referenced by ARIA attributes (aria-labelledby, aria-describedby, etc.)",
        "The duplicate IDs are visible in the accessibility tree",
        "The duplicate IDs exist simultaneously in the DOM (not hidden or removed)"
      ],
      "common_causes": [
        "Reusing component templates without updating referenced IDs",
        "Copy-pasting ARIA patterns without verifying ID uniqueness",
        "Dynamically generated content with non-unique relationship IDs",
        "Manual ID assignment in content management systems",
        "Including the same widget multiple times on a page"
      ]
    },
    "fixes": [
      {
        "step": "Ensure all IDs referenced by ARIA attributes are unique across the entire document",
        "code_reference": "https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/"
      },
      {
        "step": "For reusable components, generate unique IDs at runtime or use scoping techniques",
        "code_reference": "https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID"
      },
      {
        "step": "Use aria-label instead of aria-labelledby when possible to reduce ID dependencies",
        "code_reference": "https://www.w3.org/TR/wai-aria-1.2/#aria-label"
      },
      {
        "step": "Implement automated testing to catch duplicate IDs in CI/CD pipelines",
        "code_reference": "https://dequeuniversity.com/tips/test-aria-relationships"
      }
    ],
    "best_practices": [
      "Prefer direct labeling (aria-label) over referenced labeling (aria-labelledby) for simple cases",
      "Use component-scoped IDs in modern frameworks (e.g., Vue's scoped attributes)",
      "Test ARIA relationships with multiple screen readers (NVDA, JAWS, VoiceOver)",
      "Validate that all referenced IDs exist in the DOM",
      "Document ID naming conventions to prevent collisions in large codebases"
    ],
    "code_examples": {
      "before": [
        "<!-- Violation: Duplicate IDs in ARIA references -->",
        "<span id='error'>Invalid input</span>",
        "<input aria-describedby='error'>",
        "<span id='error'>Different error</span>",
        "<input aria-describedby='error'>",
        "",
        "<!-- Violation: Reused component with duplicate IDs -->",
        "<div class='tooltip' id='help-text'>Tooltip content</div>",
        "<button aria-labelledby='help-text'>Action 1</button>",
        "<div class='tooltip' id='help-text'>Different content</div>",
        "<button aria-labelledby='help-text'>Action 2</button>"
      ],
      "after": [
        "<!-- Fixed: Unique IDs for ARIA references -->",
        "<span id='name-error'>Name required</span>",
        "<input aria-describedby='name-error'>",
        "<span id='email-error'>Invalid email</span>",
        "<input aria-describedby='email-error'>",
        "",
        "<!-- Fixed: Scoped IDs in components -->",
        "<div class='tooltip' id='help-text-1'>Save your work</div>",
        "<button aria-labelledby='help-text-1'>Save</button>",
        "<div class='tooltip' id='help-text-2'>Submit form</div>",
        "<button aria-labelledby='help-text-2'>Submit</button>"
      ]
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.8/duplicate-id-aria"
      },
      {
        "title": "WCAG Success Criterion 4.1.2",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html"
      },
      {
        "title": "ARIA Authoring Practices Guide - Naming",
        "url": "https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/"
      },
      {
        "title": "WebAIM: ARIA and Screen Readers",
        "url": "https://webaim.org/techniques/aria/"
      }
    ]
  },
    "form-field-multiple-labels": {
    "rule_id": "form-field-multiple-labels",
    "issue_explanation": "This rule identifies form fields that have multiple labeling mechanisms (e.g., both a <label> element and an aria-label attribute) which can create redundant or conflicting announcements in screen readers. While technically valid per HTML specifications, multiple labeling methods often result in poor user experiences as assistive technologies may concatenate or prioritize labels unpredictably.",
    "wcag_guidelines": [
      "1.3.1 Info and Relationships (Level A)",
      "3.3.2 Labels or Instructions (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 502.3.1 (Interoperability with Assistive Technology)"
    ],
    "impact": {
      "severity": "Moderate",
      "description": "Screen reader users may hear duplicate or confusing label announcements, making forms harder to complete accurately. Users with cognitive disabilities may struggle with redundant information, while all users experience inconsistent behavior across different screen reader/browser combinations."
    },
    "technical_analysis": {
      "failure_conditions": [
        "A form control has both a visible <label> element and an aria-label attribute",
        "An input has both a <label> and a title attribute serving as a label",
        "An element has multiple ARIA labeling methods (aria-label and aria-labelledby)",
        "The multiple labels provide essentially the same information"
      ],
      "common_causes": [
        "Adding ARIA labels as 'extra insurance' without removing existing HTML labels",
        "Copy-pasting code patterns that include redundant labeling",
        "Using component libraries that automatically add ARIA labels",
        "Mixing different labeling approaches in a codebase",
        "Not removing title attributes when adding proper labels"
      ]
    },
    "fixes": [
      {
        "step": "Choose a single labeling method per form control and remove redundant labels",
        "code_reference": "https://www.w3.org/WAI/tutorials/forms/labels/"
      },
      {
        "step": "Prefer visible <label> elements over ARIA labels when possible",
        "code_reference": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label"
      },
      {
        "step": "For custom controls where visible labels aren't practical, use either aria-label or aria-labelledby (not both)",
        "code_reference": "https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/"
      },
      {
        "step": "Remove title attributes when they duplicate other labeling mechanisms",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/html/H65"
      }
    ],
    "best_practices": [
      "Establish consistent labeling patterns across your codebase",
      "Test form labels with multiple screen reader/browser combinations",
      "Use the Accessibility Inspector in browser dev tools to verify name computation",
      "Document your preferred labeling approach for team consistency",
      "Remember that placeholder text should never serve as the sole label"
    ],
    "code_examples": {
      "before": [
        "<!-- Violation: Multiple labeling methods -->",
        "<label for='name'>Full Name</label>",
        "<input id='name' aria-label='Enter your full name'>",
        "",
        "<!-- Violation: Redundant ARIA labels -->",
        "<div id='desc'>Description</div>",
        "<textarea aria-labelledby='desc' aria-label='Item description'></textarea>"
      ],
      "after": [
        "<!-- Fixed: Single labeling method -->",
        "<label for='name'>Full Name</label>",
        "<input id='name'>",
        "",
        "<!-- Fixed: Clean ARIA labeling -->",
        "<div id='desc'>Description</div>",
        "<textarea aria-labelledby='desc'></textarea>",
        "",
        "<!-- Alternative: ARIA label only when needed -->",
        "<input aria-label='Search query' placeholder='Search...'>"
      ]
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.8/form-field-multiple-labels"
      },
      {
        "title": "WCAG Success Criterion 3.3.2",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html"
      },
      {
        "title": "WebAIM: Creating Accessible Forms",
        "url": "https://webaim.org/techniques/forms/"
      },
      {
        "title": "ARIA Labeling Relationships",
        "url": "https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/"
      }
    ]
  },
    "frame-tested": {
    "rule_id": "frame-tested",
    "issue_explanation": "This rule verifies that all frames and iframes have been manually tested for accessibility, as automated tools cannot fully evaluate content within frames. Frames that haven't been properly tested may contain inaccessible content, keyboard traps, or other barriers that aren't detectable through automated testing alone. The issue manifests when screen reader users or keyboard-only users encounter untested frame content that hasn't been evaluated for accessibility compliance.",
    "wcag_guidelines": [
      "4.1.2 Name, Role, Value (Level A)",
      "2.4.1 Bypass Blocks (Level A)",
      "2.1.1 Keyboard (Level A)",
      "Section 508 § 502.3.1 (Interoperability with Assistive Technology)"
    ],
    "impact": {
      "severity": "High",
      "description": "Users of assistive technologies may encounter completely inaccessible content within untested frames. Screen reader users may find frame content unannounced or improperly structured. Keyboard users may become trapped in frames or unable to navigate frame content. Low-vision users may experience contrast or zoom issues that weren't caught by automated testing."
    },
    "technical_analysis": {
      "failure_conditions": [
        "A frame or iframe exists without documented accessibility testing",
        "Frame content hasn't been evaluated with screen readers and keyboard navigation",
        "The frame's accessibility cannot be programmatically determined to meet WCAG",
        "Third-party frames (ads, embeds) haven't been vetted for accessibility"
      ],
      "common_causes": [
        "Assuming automated tools catch all frame accessibility issues",
        "Embedding third-party content without accessibility verification",
        "Using frames for dynamic content that changes without retesting",
        "Lacking a process for manual frame accessibility testing",
        "Not testing frames across different assistive technology combinations"
      ]
    },
    "fixes": [
      {
        "step": "Manually test all frames with screen readers (NVDA, JAWS, VoiceOver) and keyboard-only navigation",
        "code_reference": "https://www.w3.org/WAI/standards-guidelines/wcag/non-web-ict/"
      },
      {
        "step": "Provide accessible names for frames using title attribute or aria-label",
        "code_reference": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#accessibility_concerns"
      },
      {
        "step": "Ensure frame content meets all WCAG requirements independently of the parent page",
        "code_reference": "https://www.w3.org/WAI/tutorials/frames/"
      },
      {
        "step": "Document accessibility testing results for each frame in your codebase",
        "code_reference": "https://www.w3.org/WAI/test-evaluate/"
      }
    ],
    "best_practices": [
      "Avoid frames when possible - use modern alternatives like components or APIs",
      "Establish a testing protocol for all embedded content (ads, maps, etc.)",
      "Retest frames after any content updates or design changes",
      "Include frame testing in your accessibility audit checklist",
      "Provide a visible border or visual indicator for frames to help low-vision users"
    ],
    "code_examples": {
      "before": [
        "<!-- Violation: Untested iframe with no accessible name -->",
        "<iframe src='https://example.com/widget'></iframe>",
        "",
        "<!-- Violation: Frame with unknown accessibility -->",
        "<frame src='navigation.html'>"
      ],
      "after": [
        "<!-- Fixed: Tested iframe with proper labeling -->",
        "<iframe src='https://example.com/accessible-widget' title='Interactive map widget' aria-label='Interactive map showing store locations'></iframe>",
        "",
        "<!-- Fixed: Documented accessible frame -->",
        "<!-- Accessibility tested 2023-05-15 with NVDA/Firefox - no issues found -->",
        "<frame src='navigation.html' title='Site navigation'>"
      ]
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.8/frame-tested"
      },
      {
        "title": "WCAG Success Criterion 4.1.2",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html"
      },
      {
        "title": "W3C Frame Accessibility Tutorial",
        "url": "https://www.w3.org/WAI/tutorials/frames/"
      },
      {
        "title": "WebAIM: Accessibility Testing",
        "url": "https://webaim.org/articles/testing/"
      }
    ]
  },
    "frame-title-unique": {
    "rule_id": "frame-title-unique",
    "issue_explanation": "This rule ensures that each frame and iframe has a unique, descriptive title that distinguishes it from other frames on the page. When frames share identical titles, screen reader users cannot differentiate between them, making navigation confusing and potentially disorienting. The issue manifests when assistive technology users encounter multiple frames announced with the same name.",
    "wcag_guidelines": [
      "2.4.1 Bypass Blocks (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 502.3.1 (Interoperability with Assistive Technology)",
      "EN 301 549 V3.2.1 - 11.5.2.5 (Label Relationships)"
    ],
    "impact": {
      "severity": "Moderate",
      "description": "Screen reader users rely on unique frame titles to understand page structure and navigate between frames. Identical titles force users to explore each frame's content to determine its purpose, significantly increasing cognitive load. Users with cognitive disabilities may become disoriented, while all assistive technology users experience reduced navigation efficiency."
    },
    "technical_analysis": {
      "failure_conditions": [
        "Two or more frames/iframes on the same page share identical title attributes",
        "Frames have empty or missing titles (treated as identical by assistive tech)",
        "ARIA labels used for frames are not unique",
        "The duplicate titles cannot be distinguished by context alone"
      ],
      "common_causes": [
        "Copy-pasting frame code without updating titles",
        "Using generic titles like 'frame' or 'content'",
        "Dynamic frame generation without unique title assignment",
        "Assuming parent page context makes duplicate titles acceptable",
        "Using component templates that don't generate unique frame titles"
      ]
    },
    "fixes": [
      {
        "step": "Assign unique, descriptive titles to each frame using the title attribute",
        "code_reference": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#accessibility_concerns"
      },
      {
        "step": "For dynamic frames, generate titles that reflect their specific content or purpose",
        "code_reference": "https://www.w3.org/WAI/tutorials/frames/"
      },
      {
        "step": "Supplement with aria-label if additional context is needed (while maintaining uniqueness)",
        "code_reference": "https://www.w3.org/TR/wai-aria-1.2/#aria-label"
      },
      {
        "step": "Implement automated checks to prevent duplicate titles in CI/CD pipelines",
        "code_reference": "https://dequeuniversity.com/tips/test-frame-titles"
      }
    ],
    "best_practices": [
      "Make frame titles both unique and descriptive of the frame's specific content",
      "Test frame navigation with screen readers (NVDA, JAWS, VoiceOver)",
      "Include frame titles in accessibility testing checklists",
      "Avoid using numbers alone to differentiate frames (e.g., 'Frame 1', 'Frame 2')",
      "Document frame title conventions for development teams"
    ],
    "code_examples": {
      "before": [
        "<!-- Violation: Duplicate frame titles -->",
        "<iframe src='nav.html' title='Navigation'></iframe>",
        "<iframe src='content.html' title='Navigation'></iframe>",
        "",
        "<!-- Violation: Generic titles -->",
        "<frame src='sidebar.html' title='Frame'>",
        "<frame src='main.html' title='Frame'>"
      ],
      "after": [
        "<!-- Fixed: Unique descriptive titles -->",
        "<iframe src='nav.html' title='Primary site navigation'></iframe>",
        "<iframe src='content.html' title='Article content'></iframe>",
        "",
        "<!-- Fixed: Context-specific titles -->",
        "<frame src='sidebar.html' title='Product filters'>",
        "<frame src='main.html' title='Product listing'>",
        "",
        "<!-- Alternative: Dynamic title -->",
        "<iframe src='widget.html' title={`${productName} details widget`}></iframe>"
      ]
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.8/frame-title-unique"
      },
      {
        "title": "WCAG Success Criterion 2.4.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html"
      },
      {
        "title": "W3C Frame Accessibility Tutorial",
        "url": "https://www.w3.org/WAI/tutorials/frames/"
      },
      {
        "title": "WebAIM: Frames and Iframes",
        "url": "https://webaim.org/techniques/frames/"
      }
    ]
  },
    "frame-title": {
    "rule_id": "frame-title",
    "issue_explanation": "This rule verifies that all frame and iframe elements have a descriptive title attribute that clearly identifies their purpose or content. Without proper titles, screen reader users cannot understand the role or content of frames, making navigation difficult and content potentially inaccessible. The issue manifests when assistive technologies encounter unnamed frames that cannot be properly announced or distinguished.",
    "wcag_guidelines": [
      "2.4.1 Bypass Blocks (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 502.3.1 (Interoperability with Assistive Technology)",
      "EN 301 549 V3.2.1 - 11.5.2.5 (Label Relationships)"
    ],
    "impact": {
      "severity": "High",
      "description": "Screen reader users may miss important content contained within untitled frames or struggle to navigate between frames. Keyboard users may become disoriented when encountering unlabeled frame boundaries. Users with cognitive disabilities may find it difficult to understand the page structure when frames lack descriptive identifiers."
    },
    "technical_analysis": {
      "failure_conditions": [
        "A frame or iframe element lacks a title attribute",
        "The title attribute is empty or contains only whitespace",
        "The title is non-descriptive (e.g., 'frame', 'content', 'untitled')",
        "The title doesn't accurately reflect the frame's content or purpose"
      ],
      "common_causes": [
        "Omitting title attributes during development",
        "Using placeholder text that wasn't replaced",
        "Copy-pasting frame code without updating titles",
        "Assuming visual context makes titles unnecessary",
        "Using component libraries that generate frames without titles"
      ]
    },
    "fixes": [
      {
        "step": "Add a descriptive title attribute to every frame and iframe element",
        "code_reference": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#accessibility_concerns"
      },
      {
        "step": "Ensure titles accurately describe the frame's content or function",
        "code_reference": "https://www.w3.org/WAI/tutorials/frames/"
      },
      {
        "step": "For dynamic frames, generate meaningful titles based on their content",
        "code_reference": "https://www.w3.org/TR/wai-aria-practices/#naming"
      },
      {
        "step": "Supplement with aria-label if additional context is needed",
        "code_reference": "https://www.w3.org/TR/wai-aria-1.2/#aria-label"
      }
    ],
    "best_practices": [
      "Make frame titles concise but descriptive (3-5 words typically sufficient)",
      "Test frame navigation with multiple screen readers (NVDA, JAWS, VoiceOver)",
      "Avoid using the same title for multiple frames on a page",
      "Include frame titles in accessibility testing checklists",
      "Consider visible frame labels for low-vision users when appropriate"
    ],
    "code_examples": {
      "before": [
        "<!-- Violation: Missing title -->",
        "<iframe src='navigation.html'></iframe>",
        "",
        "<!-- Violation: Empty title -->",
        "<frame src='content.html' title=''>",
        "",
        "<!-- Violation: Non-descriptive title -->",
        "<iframe src='chart.html' title='Widget'>"
      ],
      "after": [
        "<!-- Fixed: Descriptive title -->",
        "<iframe src='navigation.html' title='Primary site navigation menu'></iframe>",
        "",
        "<!-- Fixed: Meaningful title -->",
        "<frame src='content.html' title='Article text content'>",
        "",
        "<!-- Fixed: Specific title -->",
        "<iframe src='chart.html' title='Monthly sales performance chart'>",
        "",
        "<!-- Alternative: Dynamic title -->",
        "<iframe src='dashboard.html' title={`${userRole} control panel`}></iframe>"
      ]
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.8/frame-title"
      },
      {
        "title": "WCAG Success Criterion 4.1.2",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html"
      },
      {
        "title": "W3C Frame Accessibility Tutorial",
        "url": "https://www.w3.org/WAI/tutorials/frames/"
      },
      {
        "title": "WebAIM: Frames and Iframes",
        "url": "https://webaim.org/techniques/frames/"
      }
    ]
  },
    "html-lang-valid": {
    "rule_id": "html-lang-valid",
    "issue_explanation": "This rule verifies that the HTML document's primary language is correctly declared using a valid lang attribute in the <html> element. An invalid or missing language declaration prevents assistive technologies from properly interpreting and announcing content, particularly for screen reader users who rely on accurate language information for pronunciation and character handling.",
    "wcag_guidelines": [
      "3.1.1 Language of Page (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 502.3.1 (Interoperability with Assistive Technology)",
      "EN 301 549 V3.2.1 - 11.5.2.5 (Label Relationships)"
    ],
    "impact": {
      "severity": "High",
      "description": "Screen reader users may experience incorrect pronunciation of content when the language isn't properly declared. Users with cognitive disabilities may struggle with unexpected language changes. Search engines and translation tools may misinterpret content without proper language metadata. The issue affects all users who rely on proper language processing."
    },
    "technical_analysis": {
      "failure_conditions": [
        "The <html> element lacks a lang attribute",
        "The lang attribute value is empty or contains only whitespace",
        "The language code is invalid (not following BCP 47 standards)",
        "The language code doesn't match the actual content language",
        "The lang attribute appears on elements other than <html>"
      ],
      "common_causes": [
        "Omitting the lang attribute during initial page setup",
        "Using deprecated language codes (e.g., 'iw' instead of 'he' for Hebrew)",
        "Incorrectly formatting language-region codes (e.g., 'en_US' instead of 'en-US')",
        "Copy-pasting templates without updating language declarations",
        "Mismatching lang attributes across different parts of a multilingual site"
      ]
    },
    "fixes": [
      {
        "step": "Add a valid lang attribute to the <html> element using BCP 47 language codes",
        "code_reference": "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang"
      },
      {
        "step": "Ensure the declared language matches the page's primary content language",
        "code_reference": "https://www.w3.org/International/questions/qa-html-language-declarations"
      },
      {
        "step": "For multilingual pages, use lang attributes on specific elements for language changes",
        "code_reference": "https://www.w3.org/TR/i18n-html-tech-lang/"
      },
      {
        "step": "Validate language codes using the IANA Language Subtag Registry",
        "code_reference": "https://www.iana.org/assignments/language-subtag-registry"
      }
    ],
    "best_practices": [
      "Always declare a default language in the <html> element",
      "Use the shortest valid language code (e.g., 'fr' instead of 'fr-FR' when regional differences aren't needed)",
      "Test with screen readers to verify proper pronunciation",
      "Include language validation in your build process",
      "Document language declaration standards for your development team"
    ],
    "code_examples": {
      "before": [
        "<!-- Violation: Missing lang attribute -->",
        "<html>",
        "",
        "<!-- Violation: Invalid language code -->",
        "<html lang='english'>",
        "",
        "<!-- Violation: Deprecated code -->",
        "<html lang='iw'> <!-- Hebrew should use 'he' -->"
      ],
      "after": [
        "<!-- Fixed: Valid language declaration -->",
        "<html lang='en'>",
        "",
        "<!-- Fixed: Language with region -->",
        "<html lang='es-ES'>",
        "",
        "<!-- Fixed: Updated language code -->",
        "<html lang='he'> <!-- Modern Hebrew code -->",
        "",
        "<!-- Multilingual example -->",
        "<html lang='en'>",
        "<body>",
        "  <p>This is English content</p>",
        "  <p lang='fr'>Ceci est du contenu français</p>",
        "</body>"
      ]
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.8/html-lang-valid"
      },
      {
        "title": "WCAG Success Criterion 3.1.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/language-of-page.html"
      },
      {
        "title": "MDN HTML lang Attribute",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang"
      },
      {
        "title": "W3C Internationalization Checker",
        "url": "https://validator.w3.org/i18n-checker/"
      }
    ]
  },
    "html-xml-lang-mismatch": {
    "rule_id": "html-xml-lang-mismatch",
    "issue_explanation": "This rule checks for mismatches between the `lang` attribute in the HTML document and the `xml:lang` attribute. These attributes should always match to ensure consistent language announcement by assistive technologies, particularly screen readers. A mismatch can cause confusion for users who rely on accurate language settings for proper pronunciation and interpretation.",
    "wcag_guidelines": [
      "3.1.1 Language of Page (Level A)",
      "Section 508 § 1194.22 (i)"
    ],
    "impact": {
      "severity": "Moderate",
      "description": "Screen reader users may experience incorrect pronunciation or interpretation of content if the language attributes are mismatched or missing. This affects users who rely on assistive technologies to understand the language context of the page."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when the `lang` attribute in the `<html>` tag does not match the `xml:lang` attribute, or when one is present and the other is missing.",
      "common_causes": "Common causes include inconsistent language declarations during dynamic content generation, manual coding errors, or omitting one of the attributes while including the other."
    },
    "fixes": [
      {
        "step": "Ensure the `<html>` tag includes both `lang` and `xml:lang` attributes with identical values.",
        "code_reference": "https://www.w3.org/International/questions/qa-html-language-declarations"
      },
      {
        "step": "If only one attribute is present, add the missing attribute with the same value.",
        "code_reference": ""
      }
    ],
    "best_practices": [
      "Always declare both `lang` and `xml:lang` attributes in the `<html>` tag for consistency.",
      "Use valid language codes (e.g., 'en' for English, 'es' for Spanish) as per IETF BCP 47 standards."
    ],
    "code_examples": {
      "before": "<html lang=\"en\">\n  <!-- Missing `xml:lang` attribute or mismatched value -->\n</html>",
      "after": "<html lang=\"en\" xml:lang=\"en\">\n  <!-- Both attributes match and are correctly declared -->\n</html>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/html-xml-lang-mismatch"
      },
      {
        "title": "WCAG Success Criterion 3.1.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/language-of-page.html"
      }
    ]
  },
    "input-button-name": {
    "rule_id": "input-button-name",
    "issue_explanation": "This rule ensures that input buttons (`<input type='button'>`, `<input type='submit'>`, `<input type='reset'>`) and `<button>` elements have an accessible name. Without a proper label or accessible name, screen readers cannot announce the purpose of the button, making it unusable for users who rely on assistive technologies.",
    "wcag_guidelines": [
      "4.1.2 Name, Role, Value (Level A)",
      "2.5.3 Label in Name (Level A)",
      "Section 508 § 1194.22 (a)"
    ],
    "impact": {
      "severity": "Critical",
      "description": "Screen reader users and keyboard-only users cannot determine the function of unlabeled buttons, rendering them non-functional. This violates WCAG's requirement for operable and understandable UI components."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when an `<input type='button'>`, `<input type='submit'>`, `<input type='reset'>`, or `<button>` element has no accessible name (e.g., missing `value`, `aria-label`, `aria-labelledby`, or inner text).",
      "common_causes": [
        "Omitting the `value` attribute for `<input>` buttons.",
        "Using empty or placeholder-only `<button>` elements.",
        "Relying on visual cues (like icons) without text alternatives."
      ]
    },
    "fixes": [
      {
        "step": "For `<input>` buttons: Add a descriptive `value` attribute (e.g., `<input type='submit' value='Submit Form'>`).",
        "code_reference": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/button#value"
      },
      {
        "step": "For `<button>` elements: Provide visible text content (e.g., `<button>Save Changes</button>`) or use `aria-label`/`aria-labelledby` if text is not feasible.",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14"
      }
    ],
    "best_practices": [
      "Always use a visible label for buttons to benefit all users.",
      "Prefer `<button>` over `<input>` for buttons, as it offers more flexibility (e.g., supports nested elements).",
      "Test with screen readers (e.g., NVDA, VoiceOver) to verify announcements."
    ],
    "code_examples": {
      "before": "<input type='submit'> <!-- Missing `value` -->\n<button><span class='icon'></span></button> <!-- No text or label -->",
      "after": "<input type='submit' value='Submit'> <!-- Added `value` -->\n<button aria-label='Save'><span class='icon'></span></button> <!-- Added `aria-label` -->"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/input-button-name"
      },
      {
        "title": "WCAG Success Criterion 4.1.2",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html"
      }
    ]
  },
    "input-image-alt": {
    "rule_id": "input-image-alt",
    "issue_explanation": "This rule ensures that `<input type='image'>` elements have a meaningful `alt` attribute. These inputs function as graphical buttons, and without proper alternative text, screen reader users cannot understand their purpose. The `alt` attribute serves as the accessible name for the button.",
    "wcag_guidelines": [
      "1.1.1 Non-text Content (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 1194.22 (a)"
    ],
    "impact": {
      "severity": "Critical",
      "description": "Screen reader users will hear only 'unlabeled graphic button' or similar, making the button's function unclear. Keyboard-only users may also struggle if the button's purpose isn't programmatically determinable."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when an `<input type='image'>` element: 1) has no `alt` attribute, 2) has an empty `alt` (`alt=''`), or 3) has an `alt` attribute containing only whitespace.",
      "common_causes": [
        "Omitting the `alt` attribute entirely.",
        "Using placeholder `alt` text like 'image' or 'button'.",
        "Setting `alt=''` (which hides the button from assistive tech, unless it's purely decorative)."
      ]
    },
    "fixes": [
      {
        "step": "Add a concise, descriptive `alt` attribute that explains the button's action (e.g., 'Search' for a magnifying glass icon).",
        "code_reference": "https://www.w3.org/WAI/tutorials/images/functional/"
      },
      {
        "step": "If the image is purely decorative (rare for buttons), use `alt=''` and provide an `aria-label` or `aria-labelledby` for the action.",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14"
      }
    ],
    "best_practices": [
      "Treat `<input type='image'>` like a button, not an image—describe the action, not the visual appearance.",
      "Prefer `<button>` with an `<img>` inside for more flexibility in labeling.",
      "Avoid using `title` as a substitute for `alt`; it is not reliably announced by screen readers."
    ],
    "code_examples": {
      "before": "<input type='image' src='submit.png'> <!-- Missing `alt` -->\n<input type='image' src='search.png' alt=''> <!-- Empty `alt` -->",
      "after": "<input type='image' src='submit.png' alt='Submit Form'> <!-- Descriptive `alt` -->\n<input type='image' src='search.png' alt='Search' aria-label='Search'> <!-- `alt` + `aria-label` for redundancy -->"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/input-image-alt"
      },
      {
        "title": "WCAG Success Criterion 1.1.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html"
      }
    ]
  },
    "label-title-only": {
    "rule_id": "label-title-only",
    "issue_explanation": "This rule identifies form labels that only use the `title` attribute to provide label text. The `title` attribute is not reliably accessible to screen readers and should not be used as the sole method for labeling form controls. This creates barriers for users who rely on assistive technologies to understand and complete forms.",
    "wcag_guidelines": [
      "3.3.2 Labels or Instructions (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 1194.22 (n)"
    ],
    "impact": {
      "severity": "High",
      "description": "Screen reader users may not hear the label for form controls, making it difficult or impossible to understand what information to input. Keyboard-only users may also struggle as `title` text is typically only visible on hover and not keyboard-accessible."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when a form control (input, select, textarea) is associated with a label that only provides text via the `title` attribute, without a proper visible label or other accessible labeling method.",
      "common_causes": [
        "Using `title` as a quick way to add tooltips without considering accessibility",
        "Assuming `title` text will be read by screen readers",
        "Not providing a visible `<label>` element or other accessible labeling method"
      ]
    },
    "fixes": [
      {
        "step": "Replace `title`-only labels with proper `<label>` elements associated with the form control using `for` and `id` attributes.",
        "code_reference": "https://www.w3.org/WAI/tutorials/forms/labels/"
      },
      {
        "step": "If a visible label isn't desired, use `aria-label` or `aria-labelledby` instead of `title` for accessible labeling.",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14"
      }
    ],
    "best_practices": [
      "Always provide visible labels for form controls when possible",
      "Use `title` only for supplemental information, never as the sole labeling method",
      "Test forms with screen readers to verify labels are properly announced"
    ],
    "code_examples": {
      "before": "<input type='text' title='Search term'> <!-- Label only in title -->\n<input type='email' title='Your email address'>",
      "after": "<label for='search'>Search term</label>\n<input type='text' id='search'>\n\n<label for='email'>Email address</label>\n<input type='email' id='email'>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/label-title-only"
      },
      {
        "title": "WCAG Success Criterion 3.3.2",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html"
      }
    ]
  },
    "label": {
    "rule_id": "label",
    "issue_explanation": "This rule ensures that form inputs have appropriate labels, either through explicit <label> elements or other accessible labeling methods. Missing or improper labels prevent screen readers from announcing the purpose of form controls, creating barriers for users with disabilities.",
    "wcag_guidelines": [
      "1.3.1 Info and Relationships (Level A)",
      "3.3.2 Labels or Instructions (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 1194.22 (n)"
    ],
    "impact": {
      "severity": "Critical",
      "description": "Screen reader users cannot determine what information to enter in unlabeled form controls. Low-vision users may struggle to associate labels with inputs when the relationship isn't programmatically established. All users may experience confusion when form controls lack clear labels."
    },
    "technical_analysis": {
      "failure_conditions": [
        "Form control (input, select, textarea) has no associated label",
        "Label exists but isn't programmatically associated (missing for/id attributes)",
        "ARIA labeling (aria-label, aria-labelledby) is used when visible text would be better",
        "Placeholder text is used as the sole labeling method"
      ],
      "common_causes": [
        "Omitting label elements for visual design reasons",
        "Using incorrect label association (mismatched for/id values)",
        "Relying on visual proximity instead of programmatic association",
        "Using placeholder text as a label substitute"
      ]
    },
    "fixes": [
      {
        "step": "Use explicit <label> elements with for attributes matching the input's id",
        "code_reference": "https://www.w3.org/WAI/tutorials/forms/labels/"
      },
      {
        "step": "For cases where visible labels aren't possible, use aria-label or aria-labelledby with clear, descriptive text",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14"
      },
      {
        "step": "Wrap the input inside its label when space permits (removes need for for/id pairing)",
        "code_reference": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label#wrapping_label"
      }
    ],
    "best_practices": [
      "Always prefer visible labels for maximum usability",
      "Ensure labels are positioned close to their associated controls",
      "Test with screen readers to verify label announcements",
      "Avoid using placeholder text as the only label",
      "Use sentence-style capitalization for labels (not all caps)"
    ],
    "code_examples": {
      "before": [
        "<input type='text' id='name'> <!-- Missing label -->",
        "<label>Email</label>\n<input type='email'> <!-- No association -->",
        "<input type='tel' placeholder='Phone number'> <!-- Placeholder as label -->"
      ],
      "after": [
        "<label for='name'>Full name</label>\n<input type='text' id='name'>",
        "<label for='email'>Email address</label>\n<input type='email' id='email'>",
        "<label for='phone'>Phone number</label>\n<input type='tel' id='phone'>"
      ]
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/label"
      },
      {
        "title": "WCAG Success Criterion 3.3.2",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html"
      },
      {
        "title": "WebAIM: Creating Accessible Forms",
        "url": "https://webaim.org/techniques/forms/"
      }
    ]
  },
    "landmark-complementary-is-top-level": {
    "rule_id": "landmark-complementary-is-top-level",
    "issue_explanation": "This rule ensures that <aside> elements with ARIA role='complementary' are top-level landmarks. When complementary landmarks are nested within other landmarks, screen reader users may lose context or have difficulty navigating to these sections independently, as they become child landmarks of their parent container.",
    "wcag_guidelines": [
      "1.3.1 Info and Relationships (Level A)",
      "2.4.1 Bypass Blocks (Level A)",
      "4.1.2 Name, Role, Value (Level A)"
    ],
    "impact": {
      "severity": "Moderate",
      "description": "Screen reader users relying on landmark navigation may miss or have difficulty accessing complementary content when it's nested within other landmarks. This affects the ability to efficiently navigate page sections and understand content relationships."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when an element with role='complementary' or an <aside> element (which has an implicit complementary role) is nested within another landmark (e.g., main, navigation, banner, contentinfo, form, or region).",
      "common_causes": [
        "Placing <aside> elements inside <main> or other landmark regions without considering landmark hierarchy",
        "Using ARIA role='complementary' on elements within other landmarks",
        "Misunderstanding the purpose of complementary landmarks as supporting but separate from main content"
      ]
    },
    "fixes": [
      {
        "step": "Move the complementary landmark outside of other landmark regions to make it a top-level landmark",
        "code_reference": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
      },
      {
        "step": "If the content must remain nested, consider using role='region' with an appropriate aria-label instead of role='complementary'",
        "code_reference": "https://www.w3.org/TR/wai-aria-1.2/#region"
      }
    ],
    "best_practices": [
      "Reserve complementary landmarks for content that is tangentially related to the main content",
      "Limit use of complementary landmarks to 1-2 per page for better navigation",
      "Always provide accessible names for complementary landmarks using aria-label or aria-labelledby"
    ],
    "code_examples": {
      "before": "<main>\n  <article>\n    <!-- Main content -->\n  </article>\n  <aside>\n    <!-- Related content (fails: nested in main) -->\n  </aside>\n</main>",
      "after": "<main>\n  <article>\n    <!-- Main content -->\n  </article>\n</main>\n<aside aria-label='Related articles'>\n  <!-- Now top-level complementary landmark -->\n</aside>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/landmark-complementary-is-top-level"
      },
      {
        "title": "WCAG Success Criterion 1.3.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html"
      },
      {
        "title": "ARIA Landmarks Guide",
        "url": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
      }
    ]
  },
    "landmark-contentinfo-is-top-level": {
    "rule_id": "landmark-contentinfo-is-top-level",
    "issue_explanation": "This rule ensures that contentinfo landmarks (typically containing footer information) are top-level landmarks in the document structure. When contentinfo landmarks are nested within other landmarks, it creates navigation confusion for screen reader users and disrupts the expected document hierarchy.",
    "wcag_guidelines": [
      "1.3.1 Info and Relationships (Level A)",
      "2.4.1 Bypass Blocks (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 1194.22 (o)"
    ],
    "impact": {
      "severity": "Moderate",
      "description": "Screen reader users relying on landmark navigation may experience: 1) Difficulty finding footer content when nested, 2) Unexpected landmark hierarchy that doesn't match document structure, and 3) Redundant navigation paths to the same content."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when an element with role='contentinfo' or a <footer> element (which has an implicit contentinfo role) is nested within another landmark (e.g., main, navigation, complementary, form, or region).",
      "common_causes": [
        "Placing <footer> inside <main> or <article> elements",
        "Creating multiple contentinfo landmarks on a single page",
        "Using role='contentinfo' on elements within other landmarks",
        "Misunderstanding that contentinfo should only appear once per page"
      ]
    },
    "fixes": [
      {
        "step": "Move the contentinfo landmark outside of other landmark regions to make it a direct child of the <body>",
        "code_reference": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/#contentinfo"
      },
      {
        "step": "If footer content must appear within other sections, remove the landmark semantics by not using <footer> or role='contentinfo'",
        "code_reference": "https://www.w3.org/TR/html-aria/#el-footer"
      }
    ],
    "best_practices": [
      "Use only one contentinfo landmark per page, typically for the main page footer",
      "Ensure the contentinfo landmark is a direct child of the <body> element",
      "Provide distinct, useful information in the contentinfo (copyright, contact info, etc.)",
      "Avoid placing interactive elements (like navigation) in the contentinfo landmark"
    ],
    "code_examples": {
      "before": "<main>\n  <article>\n    <!-- Article content -->\n    <footer>Article footer (fails: nested in article)</footer>\n  </article>\n</main>",
      "after": "<main>\n  <article>\n    <!-- Article content -->\n    <div class=\"article-footer\">Article footer (non-landmark)</div>\n  </article>\n</main>\n<footer>\n  <!-- Page footer (top-level contentinfo) -->\n</footer>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/landmark-contentinfo-is-top-level"
      },
      {
        "title": "WCAG Success Criterion 1.3.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html"
      },
      {
        "title": "ARIA Authoring Practices for Landmarks",
        "url": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
      }
    ]
  },
    "list": {
    "rule_id": "list",
    "issue_explanation": "This rule verifies that list structures (<ul>, <ol>, and <dl>) are properly implemented with corresponding list items (<li> or <dt>/<dd>). Screen readers rely on proper list semantics to communicate the number of items and their relationships, which helps users understand content structure and navigate more efficiently.",
    "wcag_guidelines": [
      "1.3.1 Info and Relationships (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 1194.22 (o)"
    ],
    "impact": {
      "severity": "Moderate",
      "description": "Screen reader users may not receive proper information about list content and structure, making it harder to understand relationships between items. Keyboard users may experience navigation difficulties, and all users may miss important structural cues that lists provide."
    },
    "technical_analysis": {
      "failure_conditions": [
        "List items (<li>) not contained within a proper list container (<ul> or <ol>)",
        "Description list items (<dt>/<dd>) not contained within a <dl>",
        "Using ARIA list roles (role='list', role='listitem') without proper hierarchy",
        "Using non-semantic elements (like <div> or <span>) to create visual lists without proper semantics"
      ],
      "common_causes": [
        "Styling elements to look like lists without using proper list markup",
        "Using <br> tags to separate items instead of proper list structure",
        "Incorrectly nesting list items or mixing list types",
        "Using CSS to remove default list styling leading to semantic markup removal"
      ]
    },
    "fixes": [
      {
        "step": "Convert non-semantic list structures to proper HTML list elements (<ul>, <ol>, or <dl>)",
        "code_reference": "https://www.w3.org/WAI/tutorials/page-structure/content/#lists"
      },
      {
        "step": "Ensure all list items are properly nested within their parent list elements",
        "code_reference": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li"
      },
      {
        "step": "If CSS reset is removing list styling, use alternative CSS methods to style while preserving semantics",
        "code_reference": "https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html"
      }
    ],
    "best_practices": [
      "Always use semantic HTML list elements for any grouped items",
      "Prefer native HTML lists over ARIA list roles when possible",
      "Maintain proper nesting (don't skip heading levels or mix list types improperly)",
      "Test lists with screen readers to verify proper announcement of list type and item count"
    ],
    "code_examples": {
      "before": [
        "<div>\n  <span>• Item 1</span><br>\n  <span>• Item 2</span><br>\n  <span>• Item 3</span>\n</div>",
        "<ul>\n  <div>Item 1</div>\n  <div>Item 2</div>\n</ul>"
      ],
      "after": [
        "<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n  <li>Item 3</li>\n</ul>",
        "<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>"
      ]
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/list"
      },
      {
        "title": "WCAG Success Criterion 1.3.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html"
      },
      {
        "title": "HTML Lists Tutorial",
        "url": "https://www.w3schools.com/html/html_lists.asp"
      },
      {
        "title": "ARIA List Role Documentation",
        "url": "https://www.w3.org/TR/wai-aria-1.2/#list"
      }
    ]
  },
    "listitem": {
    "rule_id": "listitem",
    "issue_explanation": "This rule ensures that list items have proper parent list containers. List items (<li>, <dt>, <dd>, or elements with role='listitem') must be contained within appropriate list elements (<ul>, <ol>, <dl>, or elements with role='list' or 'group') to maintain proper document structure and enable accurate screen reader navigation.",
    "wcag_guidelines": [
      "1.3.1 Info and Relationships (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 1194.22 (o)"
    ],
    "impact": {
      "severity": "Moderate",
      "description": "Screen reader users lose critical structural information about content relationships when list items aren't properly contained. This impacts navigation efficiency and comprehension of item groupings, particularly for users with cognitive disabilities who benefit from clear content structure."
    },
    "technical_analysis": {
      "failure_conditions": [
        "List item element (<li>, <dt>, <dd>, or role='listitem') not contained within a proper parent list element (<ul>, <ol>, <dl>, role='list', or role='group')",
        "List items nested in incorrect container types (e.g., <li> in <dl>)",
        "Orphaned list items without any parent list container"
      ],
      "common_causes": [
        "Using <div> or other non-semantic elements as list containers",
        "Incorrectly converting between list types during dynamic content updates",
        "Placing list items directly in document flow without list containers",
        "Using CSS to visually style elements as lists without proper semantics"
      ]
    },
    "fixes": [
      {
        "step": "Wrap orphaned list items in appropriate parent list elements (<ul>, <ol>, or <dl>)",
        "code_reference": "https://www.w3.org/WAI/tutorials/page-structure/content/#lists"
      },
      {
        "step": "For custom list implementations using ARIA, ensure role='listitem' elements are contained in role='list' or role='group'",
        "code_reference": "https://www.w3.org/TR/wai-aria-1.2/#listitem"
      },
      {
        "step": "Verify proper list type hierarchy (e.g., <li> only in <ul>/<ol>, <dt>/<dd> only in <dl>)",
        "code_reference": "https://html.spec.whatwg.org/multipage/grouping-content.html#the-li-element"
      }
    ],
    "best_practices": [
      "Always prefer native HTML list elements over ARIA equivalents when possible",
      "Maintain consistent list types throughout content sections",
      "Test list structures with screen readers to verify proper announcement of list type and item count",
      "Avoid using list markup for purely presentational purposes"
    ],
    "code_examples": {
      "before": [
        "<div>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</div>",
        "<ul>\n  <dt>Term</dt>\n  <dd>Definition</dd>\n</ul>"
      ],
      "after": [
        "<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>",
        "<dl>\n  <dt>Term</dt>\n  <dd>Definition</dd>\n</dl>"
      ]
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/listitem"
      },
      {
        "title": "WCAG Success Criterion 1.3.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html"
      },
      {
        "title": "HTML List Elements Specification",
        "url": "https://html.spec.whatwg.org/multipage/grouping-content.html#the-li-element"
      },
      {
        "title": "ARIA List and Listitem Roles",
        "url": "https://www.w3.org/TR/wai-aria-1.2/#list"
      }
    ]
  },
    "marquee": {
    "rule_id": "marquee",
    "issue_explanation": "This rule identifies the use of the deprecated <marquee> element or any element with equivalent auto-scrolling behavior. These moving elements can cause significant accessibility issues as they cannot be paused by users, may create distractions, and often lack proper semantic meaning for assistive technologies.",
    "wcag_guidelines": [
      "2.2.2 Pause, Stop, Hide (Level A)",
      "1.4.2 Audio Control (Level A)",
      "2.3.1 Three Flashes or Below Threshold (Level A)",
      "Section 508 § 1194.22 (j)"
    ],
    "impact": {
      "severity": "High",
      "description": "Users with cognitive disabilities may be distracted or unable to focus. Screen reader users may struggle with content that constantly updates. Low-vision users may find the movement disorienting. All users may have difficulty reading or interacting with moving content."
    },
    "technical_analysis": {
      "failure_conditions": [
        "Presence of <marquee> element",
        "Elements with CSS or JavaScript that create auto-scrolling behavior without user control",
        "Content that moves, scrolls, or updates automatically for more than 5 seconds without pause mechanism"
      ],
      "common_causes": [
        "Using <marquee> for news tickers or scrolling announcements",
        "Implementing custom scrolling animations without accessibility considerations",
        "Using CSS animations with infinite loops for important content"
      ]
    },
    "fixes": [
      {
        "step": "Replace <marquee> with static content and proper semantic HTML elements",
        "code_reference": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/marquee#accessibility_concerns"
      },
      {
        "step": "If scrolling is necessary, implement a controlled animation with pause/play controls",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/client-side-script/SCR33"
      },
      {
        "step": "Ensure any moving content stops after 5 seconds or provides user controls to pause/stop/hide",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide.html"
      }
    ],
    "best_practices": [
      "Avoid moving content unless absolutely necessary for functionality",
      "Provide visible controls for any animated content",
      "Ensure animations respect prefers-reduced-motion media query",
      "Test with screen readers and keyboard-only navigation"
    ],
    "code_examples": {
      "before": "<marquee behavior='scroll' direction='left'>Breaking news item</marquee>",
      "after": "<div class='news-ticker' aria-live='polite'>\n  <button id='pauseTicker'>Pause</button>\n  <div id='newsContent'>Breaking news item</div>\n</div>\n<script>\n  // Implement controlled animation with pause functionality\n</script>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/marquee"
      },
      {
        "title": "WCAG Success Criterion 2.2.2",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide.html"
      },
      {
        "title": "MDN Marquee Accessibility Concerns",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/marquee#accessibility_concerns"
      },
      {
        "title": "Prefers Reduced Motion Guide",
        "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion"
      }
    ]
  },
    "meta-refresh": {
    "rule_id": "meta-refresh",
    "issue_explanation": "This rule identifies the use of <meta http-equiv='refresh'> to automatically reload or redirect pages. Such automatic refreshes can disorient users, interrupt screen reader interactions, and create barriers for those who need more time to read content or complete actions.",
    "wcag_guidelines": [
      "2.2.1 Timing Adjustable (Level A)",
      "2.2.2 Pause, Stop, Hide (Level A)",
      "3.2.5 Change on Request (Level AAA)",
      "Section 508 § 1194.22 (p)"
    ],
    "impact": {
      "severity": "High",
      "description": "Screen reader users may lose their place or have content read interrupted. Users with cognitive disabilities may not have enough time to process information. Keyboard users may lose focus during form completion. All users may be unexpectedly redirected without warning."
    },
    "technical_analysis": {
      "failure_conditions": [
        "Presence of <meta http-equiv='refresh'> with a time delay",
        "Automatic redirects or refreshes without user control",
        "Refresh intervals shorter than WCAG's recommended minimum time (typically < 20 hours)"
      ],
      "common_causes": [
        "Using meta refresh for simple page redirects",
        "Implementing content updates through page reloads",
        "Creating splash pages that automatically forward",
        "Using refresh to simulate real-time updates"
      ]
    },
    "fixes": [
      {
        "step": "Replace meta refresh with server-side redirects (HTTP 301/302) for page redirects",
        "code_reference": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Redirections"
      },
      {
        "step": "Implement user-initiated refresh buttons for content updates",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/client-side-script/SCR16"
      },
      {
        "step": "For real-time updates, use AJAX or WebSockets to update content dynamically",
        "code_reference": "https://www.w3.org/WAI/ARIA/apg/patterns/feed/"
      }
    ],
    "best_practices": [
      "Always provide user control over content updates and page changes",
      "Use proper HTTP status codes for permanent/temporary redirects",
      "Implement visible notifications for content updates",
      "Ensure any automatic updates can be paused or adjusted"
    ],
    "code_examples": {
      "before": "<meta http-equiv='refresh' content='5;url=newpage.html'>",
      "after": [
        "<!-- For redirects -->",
        "<!-- Configure server to send proper HTTP redirect -->",
        "",
        "<!-- For content updates -->",
        "<button id='refreshButton'>Refresh Content</button>",
        "<script>",
        "document.getElementById('refreshButton').addEventListener('click', () => location.reload());",
        "</script>"
      ]
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/meta-refresh"
      },
      {
        "title": "WCAG Success Criterion 2.2.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/timing-adjustable.html"
      },
      {
        "title": "MDN HTTP Redirects",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Redirections"
      },
      {
        "title": "WAI-ARIA Feed Pattern",
        "url": "https://www.w3.org/WAI/ARIA/apg/patterns/feed/"
      }
    ]
  },
    "object-alt": {
    "rule_id": "object-alt",
    "issue_explanation": "This rule ensures that <object> elements have appropriate text alternatives. Unlike <img> elements, <object> elements can embed various types of media (Flash, PDF, etc.), making text alternatives crucial for users who cannot perceive or interact with the embedded content directly.",
    "wcag_guidelines": [
      "1.1.1 Non-text Content (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 1194.22 (a)"
    ],
    "impact": {
      "severity": "Critical",
      "description": "Screen reader users receive no information about the embedded content. Keyboard users cannot interact with the content. Low-vision users have no fallback when the embedded content is unavailable. All users may miss critical information when the embedded content fails to load."
    },
    "technical_analysis": {
      "failure_conditions": [
        "<object> element with no text alternative in any form",
        "Empty or whitespace-only text alternative",
        "Text alternative that doesn't adequately describe the object's content or function"
      ],
      "common_causes": [
        "Assuming the embedded content provides its own accessibility",
        "Using placeholder text like 'object' or 'media' as alternatives",
        "Omitting alternatives for decorative objects",
        "Relying on title attribute alone for text alternatives"
      ]
    },
    "fixes": [
      {
        "step": "Provide a text alternative between the opening and closing <object> tags",
        "code_reference": "https://www.w3.org/WAI/tutorials/objects/"
      },
      {
        "step": "For complex objects, include both a brief alternative in the object and a link to a full alternative",
        "code_reference": "https://www.w3.org/TR/WCAG20-TECHS/H53.html"
      },
      {
        "step": "Use aria-label or aria-labelledby if the text alternative should not be visible",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA6"
      }
    ],
    "best_practices": [
      "Always test object elements with screen readers and keyboard navigation",
      "Provide alternatives that convey the same information as the embedded content",
      "For interactive objects, ensure all functionality is available to keyboard users",
      "Include visible text alternatives when possible for all users' benefit"
    ],
    "code_examples": {
      "before": [
        "<object data='chart.swf' type='application/x-shockwave-flash'></object>",
        "<object data='report.pdf' type='application/pdf' title='PDF'></object>"
      ],
      "after": [
        "<object data='chart.swf' type='application/x-shockwave-flash'>\n  <p>Bar chart showing quarterly sales figures: Q1 $1.2M, Q2 $1.8M, Q3 $2.1M, Q4 $2.4M</p>\n</object>",
        "<object data='report.pdf' type='application/pdf' aria-labelledby='pdf-desc'>\n  <p id='pdf-desc'>Annual financial report 2023 (PDF format)</p>\n</object>"
      ]
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/object-alt"
      },
      {
        "title": "WCAG Success Criterion 1.1.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html"
      },
      {
        "title": "W3C Object Tutorial",
        "url": "https://www.w3.org/WAI/tutorials/objects/"
      },
      {
        "title": "PDF Accessibility",
        "url": "https://www.w3.org/WAI/standards-guidelines/pdf/"
      }
    ]
  },
    "role-img-alt": {
    "rule_id": "role-img-alt",
    "issue_explanation": "This rule ensures that elements with role='img' (used to identify elements as images when semantic HTML <img> cannot be used) have appropriate text alternatives. Without proper alternatives, users of assistive technologies cannot understand the content or purpose of these image elements.",
    "wcag_guidelines": [
      "1.1.1 Non-text Content (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 1194.22 (a)"
    ],
    "impact": {
      "severity": "High",
      "description": "Screen reader users receive no information about the image content. Keyboard users cannot interact with actionable images. Low-vision users may miss important visual information that isn't properly conveyed through text alternatives. All users may experience confusion when the image fails to load or display properly."
    },
    "technical_analysis": {
      "failure_conditions": [
        "Element with role='img' has no accessible name (missing aria-label, aria-labelledby, or inner text)",
        "Accessible name is empty, whitespace-only, or non-descriptive",
        "Decorative role='img' elements without aria-hidden='true' or empty alt text"
      ],
      "common_causes": [
        "Using role='img' on non-semantic elements without providing text alternatives",
        "Assuming CSS background images don't need ARIA equivalents",
        "Using placeholder text like 'image' or 'graphic' as alternatives",
        "Applying role='img' to complex graphics without adequate descriptions"
      ]
    },
    "fixes": [
      {
        "step": "Provide a concise, descriptive text alternative using aria-label or aria-labelledby",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA6"
      },
      {
        "step": "For decorative images, add aria-hidden='true' to remove from accessibility tree",
        "code_reference": "https://www.w3.org/TR/wai-aria-1.2/#aria-hidden"
      },
      {
        "step": "For complex images, provide both a short description (aria-label) and a long description (aria-describedby linking to detailed text)",
        "code_reference": "https://www.w3.org/WAI/tutorials/images/complex/"
      }
    ],
    "best_practices": [
      "Prefer semantic <img> elements over role='img' when possible",
      "Ensure text alternatives convey the same information as the visual content",
      "Test with screen readers to verify proper announcement of role and description",
      "Keep decorative images out of the accessibility tree",
      "For interactive images, ensure keyboard operability and proper role"
    ],
    "code_examples": {
      "before": [
        "<div role='img' class='company-logo'></div>",
        "<span role='img' aria-label='image'></span>"
      ],
      "after": [
        "<div role='img' aria-label='Acme Corporation logo' class='company-logo'></div>",
        "<span role='img' aria-hidden='true' class='decorative-icon'></span>",
        "<div role='img' aria-label='Sales growth chart' aria-describedby='chart-desc'>\n  <svg>...</svg>\n</div>\n<p id='chart-desc'>Line chart showing 15% quarterly sales growth from Q1 to Q4 2023</p>"
      ]
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/role-img-alt"
      },
      {
        "title": "WCAG Success Criterion 1.1.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html"
      },
      {
        "title": "ARIA img Role Documentation",
        "url": "https://www.w3.org/TR/wai-aria-1.2/#img"
      },
      {
        "title": "WAI-ARIA Authoring Practices for Images",
        "url": "https://www.w3.org/WAI/ARIA/apg/patterns/image/"
      }
    ]
  },
    "scope-attr-valid": {
    "rule_id": "scope-attr-valid",
    "issue_explanation": "This rule verifies that the scope attribute on table header cells (<th>) contains valid values that correctly define the relationship between headers and data cells. Improper scope attributes disrupt how screen readers navigate and present table information, making tabular data inaccessible.",
    "wcag_guidelines": [
      "1.3.1 Info and Relationships (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 1194.22 (g)"
    ],
    "impact": {
      "severity": "High",
      "description": "Screen reader users lose critical context about table structure and data relationships. Users with cognitive disabilities may struggle to associate headers with corresponding data cells. All users may misinterpret data when header relationships aren't properly established."
    },
    "technical_analysis": {
      "failure_conditions": [
        "scope attribute with invalid values (anything other than 'col', 'row', 'colgroup', 'rowgroup', or 'auto')",
        "scope attribute on non-th elements",
        "Missing scope attribute when needed for complex tables",
        "Conflicting scope and headers/id attributes"
      ],
      "common_causes": [
        "Using scope='column' instead of scope='col'",
        "Applying scope to regular data cells (<td>)",
        "Omitting scope in complex multi-level headers",
        "Mixing scope and headers attributes incorrectly"
      ]
    },
    "fixes": [
      {
        "step": "Use correct scope values: 'col' for column headers, 'row' for row headers, 'colgroup'/'rowgroup' for grouped headers",
        "code_reference": "https://www.w3.org/TR/html52/tabular-data.html#the-th-element"
      },
      {
        "step": "Remove scope attribute from non-th elements",
        "code_reference": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-scope"
      },
      {
        "step": "For complex tables, combine scope with headers/id attributes as needed",
        "code_reference": "https://www.w3.org/WAI/tutorials/tables/multi-level/"
      }
    ],
    "best_practices": [
      "Always specify scope for simple tables with clear row/column headers",
      "Test tables with screen readers to verify header announcements",
      "Prefer scope over headers/id for simple table structures",
      "Use ARIA attributes (role='columnheader'/'rowheader') for dynamic tables"
    ],
    "code_examples": {
      "before": [
        "<th scope='column'>Header</th>",
        "<td scope='row'>Data</td>",
        "<th scope='invalid'>Header</th>"
      ],
      "after": [
        "<th scope='col'>Header</th>",
        "<th scope='row'>Row Header</th>",
        "<th scope='colgroup'>Group Header</th>"
      ]
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/scope-attr-valid"
      },
      {
        "title": "WCAG Success Criterion 1.3.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html"
      },
      {
        "title": "HTML th element specification",
        "url": "https://html.spec.whatwg.org/multipage/tables.html#the-th-element"
      },
      {
        "title": "W3C Table Tutorial",
        "url": "https://www.w3.org/WAI/tutorials/tables/"
      }
    ]
  },
    "server-side-image-map": {
    "rule_id": "server-side-image-map",
    "issue_explanation": "This rule identifies the use of server-side image maps (using the `ismap` attribute), which are inaccessible because they rely on mouse coordinates sent to the server rather than client-side interactivity. This prevents keyboard navigation, screen reader access, and creates barriers for users who cannot precisely control a pointing device.",
    "wcag_guidelines": [
      "2.1.1 Keyboard (Level A)",
      "2.4.3 Focus Order (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 1194.22 (e)"
    ],
    "impact": {
      "severity": "Critical",
      "description": "Keyboard users cannot navigate or activate links in the image map. Screen reader users receive no information about the interactive regions. Users with motor impairments cannot target specific areas. All users lose functionality when JavaScript is disabled or the server is unavailable."
    },
    "technical_analysis": {
      "failure_conditions": [
        "Presence of <img> with `ismap` attribute",
        "Image wrapped in <a> tag with `ismap` attribute",
        "Server-side processing of image map coordinates"
      ],
      "common_causes": [
        "Legacy implementations of image maps",
        "Misunderstanding between client-side and server-side image maps",
        "Using server-side processing for what should be client-side interactions"
      ]
    },
    "fixes": [
      {
        "step": "Replace server-side image maps with client-side image maps using <map> and <area> elements",
        "code_reference": "https://www.w3.org/WAI/tutorials/images/imagemap/"
      },
      {
        "step": "For complex interactive images, use SVG with proper ARIA attributes and keyboard support",
        "code_reference": "https://www.w3.org/WAI/tutorials/images/"
      },
      {
        "step": "If server-side processing is absolutely necessary, provide redundant text links elsewhere on the page",
        "code_reference": "https://www.w3.org/TR/WCAG20-TECHS/G196.html"
      }
    ],
    "best_practices": [
      "Always prefer client-side solutions over server-side image maps",
      "Ensure all <area> elements have proper alt text",
      "Test image maps with keyboard-only navigation",
      "Provide visible focus indicators for interactive areas",
      "Consider responsive alternatives for mobile devices"
    ],
    "code_examples": {
      "before": "<a href=\"imagemap.php\">\n  <img src=\"image.png\" ismap alt=\"Server-side image map\">\n</a>",
      "after": [
        "<img src=\"image.png\" usemap=\"#clientmap\" alt=\"Client-side image map\">",
        "<map name=\"clientmap\">",
        "  <area shape=\"rect\" coords=\"0,0,100,100\" href=\"page1.html\" alt=\"Page 1\">",
        "  <area shape=\"rect\" coords=\"100,0,200,100\" href=\"page2.html\" alt=\"Page 2\">",
        "</map>"
      ]
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/server-side-image-map"
      },
      {
        "title": "WCAG Success Criterion 2.1.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html"
      },
      {
        "title": "W3C Image Map Tutorial",
        "url": "https://www.w3.org/WAI/tutorials/images/imagemap/"
      },
      {
        "title": "ARIA Image Map Techniques",
        "url": "https://www.w3.org/WAI/ARIA/apg/patterns/image/"
      }
    ]
  },
    "skip-link": {
    "rule_id": "skip-link",
    "issue_explanation": "This rule checks for the presence and proper implementation of skip links, which allow users to bypass repetitive navigation content. Missing or improperly implemented skip links force keyboard and screen reader users to navigate through all navigation items on every page, creating significant barriers to efficient content access.",
    "wcag_guidelines": [
      "2.4.1 Bypass Blocks (Level A)",
      "2.4.3 Focus Order (Level A)",
      "1.3.1 Info and Relationships (Level A)",
      "Section 508 § 1194.22 (o)"
    ],
    "impact": {
      "severity": "High",
      "description": "Keyboard users must tab through all navigation links before reaching main content. Screen reader users are forced to listen to full navigation menus repeatedly. Users with motor impairments experience unnecessary physical strain. All users waste time navigating redundant content."
    },
    "technical_analysis": {
      "failure_conditions": [
        "No skip link present in the document",
        "Skip link not visible when focused (typically via keyboard)",
        "Skip link target does not exist or is not properly identified",
        "Skip link implemented with incorrect tab order"
      ],
      "common_causes": [
        "Omitting skip links entirely",
        "Hiding skip links with display:none instead of visually-hidden techniques",
        "Linking to incorrect or non-existent IDs",
        "Using JavaScript for functionality without proper fallbacks"
      ]
    },
    "fixes": [
      {
        "step": "Add a skip link as the first focusable element in the DOM, using proper semantic HTML",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/general/G1"
      },
      {
        "step": "Ensure the skip link becomes visible on focus and links to the main content area",
        "code_reference": "https://webaim.org/techniques/skipnav/"
      },
      {
        "step": "Verify the target exists with proper tabindex=\"-1\" for programmatic focus",
        "code_reference": "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex"
      }
    ],
    "best_practices": [
      "Include skip links on every page of your site",
      "Use CSS clip/position techniques rather than display:none for hiding",
      "Test with multiple screen readers and keyboard-only navigation",
      "Consider multiple skip links for complex page structures",
      "Ensure skip links work without JavaScript enabled"
    ],
    "code_examples": {
      "before": "<body>\n  <nav>...</nav>\n  <main id=\"main-content\">...</main>\n</body>",
      "after": "<body>\n  <a href=\"#main-content\" class=\"skip-link\">Skip to main content</a>\n  <nav>...</nav>\n  <main id=\"main-content\" tabindex=\"-1\">...</main>\n</body>\n\n<style>\n  .skip-link {\n    position: absolute;\n    top: -40px;\n    left: 0;\n    background: #000;\n    color: white;\n    padding: 8px;\n    z-index: 100;\n  }\n  .skip-link:focus {\n    top: 0;\n  }\n</style>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/skip-link"
      },
      {
        "title": "WCAG Success Criterion 2.4.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html"
      },
      {
        "title": "WebAIM Skip Navigation Links",
        "url": "https://webaim.org/techniques/skipnav/"
      },
      {
        "title": "W3C Skip Link Technique",
        "url": "https://www.w3.org/WAI/WCAG21/Techniques/general/G1"
      }
    ]
  },
    "svg-img-alt": {
    "rule_id": "svg-img-alt",
    "issue_explanation": "This rule ensures that SVG images embedded via <img> or <object> tags have appropriate text alternatives. Unlike regular images, SVG content can be complex and potentially interactive, requiring careful consideration for accessibility. Missing or inadequate alternatives prevent screen reader users from understanding the image content.",
    "wcag_guidelines": [
      "1.1.1 Non-text Content (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 1194.22 (a)"
    ],
    "impact": {
      "severity": "High",
      "description": "Screen reader users receive no information about the SVG image content. Keyboard users cannot interact with actionable SVG elements. Low-vision users may miss critical information when SVG rendering fails. All users lose context when the SVG doesn't load properly."
    },
    "technical_analysis": {
      "failure_conditions": [
        "<img> or <object> referencing SVG without alt attribute or empty alt",
        "SVG with no accessible name (missing title/desc elements)",
        "Decorative SVG without proper hiding (aria-hidden=\"true\" or role=\"presentation\")",
        "Complex SVG without adequate textual description"
      ],
      "common_causes": [
        "Assuming SVG doesn't need alt text because it's vector-based",
        "Using placeholder text like 'image' or 'graphic' as alternatives",
        "Omitting accessibility attributes for decorative SVGs",
        "Not providing sufficient descriptions for complex data visualizations"
      ]
    },
    "fixes": [
      {
        "step": "For simple SVGs, add alt text to the <img> tag",
        "code_reference": "https://www.w3.org/WAI/tutorials/images/tips/#svg-images"
      },
      {
        "step": "For complex SVGs, embed <title> and <desc> elements in the SVG markup",
        "code_reference": "https://www.w3.org/TR/SVG11/struct.html#DescriptionAndTitleElements"
      },
      {
        "step": "For decorative SVGs, add aria-hidden=\"true\" or role=\"img\" with empty alt",
        "code_reference": "https://www.w3.org/TR/wai-aria-1.2/#aria-hidden"
      }
    ],
    "best_practices": [
      "Prefer inline SVG over <img> when accessibility enhancements are needed",
      "Provide both short (title) and long (desc) descriptions for complex SVGs",
      "Test with screen readers to verify announcements",
      "Ensure SVG text remains accessible when images are disabled",
      "Maintain proper color contrast for text within SVGs"
    ],
    "code_examples": {
      "before": [
        "<img src=\"chart.svg\">",
        "<object data=\"diagram.svg\" type=\"image/svg+xml\"></object>"
      ],
      "after": [
        "<img src=\"chart.svg\" alt=\"Sales growth chart: 15% increase Q1 to Q4\">",
        "<object data=\"diagram.svg\" type=\"image/svg+xml\" aria-labelledby=\"svg-desc\">\n  <span id=\"svg-desc\">Process flow diagram showing 5-step workflow</span>\n</object>",
        "<!-- Inline SVG example -->\n<svg aria-labelledby=\"title1 desc1\" role=\"img\">\n  <title id=\"title1\">Company logo</title>\n  <desc id=\"desc1\">Acme Corporation circular logo with mountain icon</desc>\n  <!-- SVG paths -->\n</svg>"
      ]
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/svg-img-alt"
      },
      {
        "title": "WCAG Success Criterion 1.1.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html"
      },
      {
        "title": "W3C SVG Accessibility",
        "url": "https://www.w3.org/TR/svg-aam-1.0/"
      },
      {
        "title": "WebAIM SVG Accessibility",
        "url": "https://webaim.org/techniques/svg/"
      }
    ]
  },
    "tabindex": {
    "rule_id": "tabindex",
    "issue_explanation": "This rule identifies improper use of the tabindex attribute, which can disrupt logical keyboard navigation and create accessibility barriers. The tabindex attribute controls whether an element is focusable and its position in the tab order, and incorrect values can make interfaces unusable for keyboard and screen reader users.",
    "wcag_guidelines": [
      "2.4.3 Focus Order (Level A)",
      "2.1.1 Keyboard (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 1194.22 (c)"
    ],
    "impact": {
      "severity": "High",
      "description": "Keyboard users may encounter focus traps or illogical navigation sequences. Screen reader users may experience unexpected focus jumps. Users with cognitive disabilities may become disoriented by non-sequential focus order. All keyboard-reliant users face navigation challenges when tabindex is misused."
    },
    "technical_analysis": {
      "failure_conditions": [
        "tabindex value greater than 0 creating unnatural tab order",
        "tabindex='0' on non-interactive elements without proper ARIA roles",
        "tabindex='-1' on elements that should be focusable",
        "tabindex used to make non-interactive content focusable"
      ],
      "common_causes": [
        "Using positive tabindex values to force focus order",
        "Adding tabindex to decorative elements",
        "Applying tabindex without considering keyboard interaction",
        "Using tabindex as a substitute for proper semantic markup"
      ]
    },
    "fixes": [
      {
        "step": "Remove all tabindex values greater than 0 to maintain natural DOM order",
        "code_reference": "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex"
      },
      {
        "step": "Use tabindex='0' only for custom interactive elements with proper ARIA roles",
        "code_reference": "https://www.w3.org/TR/wai-aria-practices/#kbd_general_between"
      },
      {
        "step": "Reserve tabindex='-1' for programmatic focus management only",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/client-side-script/SCR29"
      }
    ],
    "best_practices": [
      "Let the browser manage default tab order whenever possible",
      "Use semantic HTML elements (button, a, input) instead of tabindex",
      "Test keyboard navigation with all interactive elements",
      "Ensure focus indicators are visible for all focusable elements",
      "Manage focus for dynamic content changes"
    ],
    "code_examples": {
      "before": [
        "<div tabindex='1'>First in tab order</div>",
        "<span tabindex='0'>Non-interactive span</span>",
        "<button tabindex='2'>Important button</button>"
      ],
      "after": [
        "<button>Button in natural DOM order</button>",
        "<div role='button' tabindex='0'>Custom interactive element</div>",
        "<div tabindex='-1' id='programmatic-focus'></div>"
      ]
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/tabindex"
      },
      {
        "title": "WCAG Success Criterion 2.4.3",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html"
      },
      {
        "title": "MDN tabindex Documentation",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex"
      },
      {
        "title": "WAI-ARIA Authoring Practices for Focus Management",
        "url": "https://www.w3.org/TR/wai-aria-practices/#kbd_generalnav"
      }
    ]
  },
    "table-duplicate-name": {
    "rule_id": "table-duplicate-name",
    "issue_explanation": "This rule identifies tables that have duplicate accessible names, which occurs when multiple methods are used to provide the same table caption or description. Duplicate names create redundant announcements in screen readers and can confuse users about the table's purpose and content structure.",
    "wcag_guidelines": [
      "1.3.1 Info and Relationships (Level A)",
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 1194.22 (g)"
    ],
    "impact": {
      "severity": "Moderate",
      "description": "Screen reader users hear repetitive announcements of the same table name, creating confusion and cognitive overload. Users may struggle to determine which name is authoritative, and the redundancy can obscure other important information about the table structure."
    },
    "technical_analysis": {
      "failure_conditions": [
        "Table with both <caption> element and aria-labelledby/aria-label providing identical text",
        "Table with multiple aria-labelledby references to identical content",
        "Table with title attribute duplicating caption or ARIA label text",
        "Nested tables inheriting duplicate naming from parent tables"
      ],
      "common_causes": [
        "Adding ARIA labels as redundancy without removing HTML captions",
        "Copy-pasting table code without reviewing accessibility attributes",
        "Using CMS templates that automatically generate duplicate labels",
        "Applying both visible and hidden labels with identical content"
      ]
    },
    "fixes": [
      {
        "step": "Choose a single labeling method (prefer <caption> for visible tables)",
        "code_reference": "https://www.w3.org/WAI/tutorials/tables/caption-summary/"
      },
      {
        "step": "Remove duplicate ARIA attributes when using <caption>",
        "code_reference": "https://www.w3.org/TR/wai-aria-1.2/#aria-labelledby"
      },
      {
        "step": "For programmatically hidden tables, use either aria-label or aria-labelledby (not both)",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA17"
      }
    ],
    "best_practices": [
      "Prefer <caption> elements for visible table titles",
      "Use aria-describedby for supplementary descriptions (not names)",
      "Ensure table names are unique within the page",
      "Test with screen readers to verify announcement clarity",
      "Avoid using title attribute for table naming"
    ],
    "code_examples": {
      "before": [
        "<table aria-label='Sales Data' caption='Sales Data'>...</table>",
        "<table aria-labelledby='t1' title='Quarterly Results'>\n  <caption id='t1'>Quarterly Results</caption>\n</table>"
      ],
      "after": [
        "<table>\n  <caption>Sales Data</caption>\n  ...\n</table>",
        "<table aria-labelledby='t1'>\n  <caption id='t1'>Quarterly Results</caption>\n</table>",
        "<!-- For hidden tables -->\n<table aria-label='Statistical Analysis'>\n  <!-- Content -->\n</table>"
      ]
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/table-duplicate-name"
      },
      {
        "title": "WCAG Success Criterion 1.3.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html"
      },
      {
        "title": "W3C Table Caption Guidance",
        "url": "https://www.w3.org/WAI/tutorials/tables/caption-summary/"
      },
      {
        "title": "ARIA Labeling Practices",
        "url": "https://www.w3.org/TR/wai-aria-practices/#naming_with_aria"
      }
    ]
  },
    "td-headers-attr": {
    "rule_id": "td-headers-attr",
    "issue_explanation": "This rule verifies that complex data tables properly associate data cells with their corresponding header cells using the headers attribute. When data cells aren't correctly linked to their headers, screen readers cannot programmatically determine relationships between headers and data, making tabular information incomprehensible to users who rely on assistive technologies.",
    "wcag_guidelines": [
      "1.3.1 Info and Relationships (Level A)", 
      "4.1.2 Name, Role, Value (Level A)",
      "Section 508 § 1194.22 (g)"
    ],
    "impact": {
      "severity": "High",
      "description": "Screen reader users cannot understand which headers correspond to which data cells, making table content meaningless. Users with cognitive disabilities lose structural context. All users may misinterpret data relationships in complex tables with multiple header levels."
    },
    "technical_analysis": {
      "failure_conditions": [
        "Data cell (<td>) in complex table missing headers attribute",
        "headers attribute referencing non-existent header IDs",
        "Incorrect header cell associations in multi-directional tables",
        "Missing id attributes on relevant header cells (<th>)"
      ],
      "common_causes": [
        "Using only scope attribute for complex tables with multiple header levels",
        "Copying simple table patterns to complex table structures",
        "Generating tables dynamically without proper header associations",
        "Omitting id attributes on header cells"
      ]
    },
    "fixes": [
      {
        "step": "Add unique id attributes to all header cells (<th>)",
        "code_reference": "https://www.w3.org/WAI/tutorials/tables/multi-level/"
      },
      {
        "step": "Add headers attribute to each data cell (<td>) referencing all associated header ids",
        "code_reference": "https://www.w3.org/TR/WCAG20-TECHS/H43.html"
      },
      {
        "step": "For tables with both row and column headers, list all relevant header ids in headers attribute (space-separated)",
        "code_reference": "https://www.w3.org/WAI/WCAG21/Techniques/html/H63"
      }
    ],
    "best_practices": [
      "Use scope attribute for simple tables with single-direction headers",
      "Reserve headers attribute for complex tables with multiple header levels",
      "Test table navigation with screen readers",
      "Ensure header ids are unique within the page",
      "Consider simplifying table structure when possible"
    ],
    "code_examples": {
      "before": [
        "<table>",
        "  <tr><th>Region</th><th>Q1</th><th>Q2</th></tr>",
        "  <tr><th>North</th><td>120</td><td>150</td></tr>",
        "</table>"
      ],
      "after": [
        "<table>",
        "  <tr>",
        "    <th id=\"region\">Region</th>",
        "    <th id=\"q1\" scope=\"col\">Q1</th>",
        "    <th id=\"q2\" scope=\"col\">Q2</th>",
        "  </tr>",
        "  <tr>",
        "    <th id=\"north\" scope=\"row\">North</th>",
        "    <td headers=\"north q1\">120</td>",
        "    <td headers=\"north q2\">150</td>",
        "  </tr>",
        "</table>"
      ]
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/td-headers-attr"
      },
      {
        "title": "WCAG Success Criterion 1.3.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html"
      },
      {
        "title": "W3C Complex Table Tutorial",
        "url": "https://www.w3.org/WAI/tutorials/tables/multi-level/"
      },
      {
        "title": "HTML headers Attribute Specification",
        "url": "https://html.spec.whatwg.org/multipage/tables.html#attr-tdth-headers"
      }
    ]
  }, 
    "th-has-data-cells": {
    "rule_id": "th-has-data-cells",
    "issue_explanation": "This rule ensures that every `<th>` (table header) element has associated data cells (`<td>`) in the same table. A violation occurs when a `<th>` is not properly linked to data cells, which can confuse screen reader users and disrupt the logical structure of the table.",
    "wcag_guidelines": [
      "1.3.1 Info and Relationships (Level A)",
      "4.1.2 Name, Role, Value (Level A)"
    ],
    "impact": {
      "severity": "Moderate",
      "description": "Screen reader users rely on properly associated headers and data cells to understand table structures. When headers lack associated data cells, users may misinterpret or miss information, leading to confusion or incorrect data interpretation."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when a `<th>` element does not have corresponding `<td>` cells in the same table, or when the headers attribute on `<td>` does not correctly reference the `<th>` IDs.",
      "common_causes": "Missing or incorrect `scope` attributes on `<th>`, improper table nesting, or dynamically generated tables where headers and data cells are not properly linked."
    },
    "fixes": [
      {
        "step": "Ensure every `<th>` has associated `<td>` cells in the same table. Use the `scope` attribute to define the scope of the header (e.g., `scope='col'` or `scope='row'`).",
        "code_reference": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-scope"
      },
      {
        "step": "For complex tables, use `headers` attributes on `<td>` elements to explicitly reference the IDs of their associated `<th>` elements.",
        "code_reference": "https://www.w3.org/WAI/tutorials/tables/multi-level/"
      }
    ],
    "best_practices": [
      "Always use semantic HTML for tables, ensuring headers and data cells are logically connected.",
      "Test tables with screen readers to verify that the relationship between headers and data cells is announced correctly."
    ],
    "code_examples": {
      "before": "<table>\n  <tr>\n    <th id='name'>Name</th>\n    <th id='email'>Email</th>\n  </tr>\n  <!-- Missing <td> cells for headers -->\n</table>",
      "after": "<table>\n  <tr>\n    <th scope='col'>Name</th>\n    <th scope='col'>Email</th>\n  </tr>\n  <tr>\n    <td>John Doe</td>\n    <td>john@example.com</td>\n  </tr>\n</table>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/th-has-data-cells"
      },
      {
        "title": "WCAG Success Criterion 1.3.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html"
      }
    ]
  },
    "valid-lang": {
    "rule_id": "valid-lang",
    "issue_explanation": "This rule ensures that the `lang` attribute on the `<html>` element or any descendant elements specifies a valid language code (e.g., 'en', 'fr', 'es'). A violation occurs when an invalid or malformed language code is used, which can disrupt screen readers' pronunciation and language-specific text processing.",
    "wcag_guidelines": [
      "3.1.1 Language of Page (Level A)",
      "3.1.2 Language of Parts (Level AA)"
    ],
    "impact": {
      "severity": "Moderate",
      "description": "Screen readers and other assistive technologies rely on the `lang` attribute to pronounce content correctly. An invalid language code may cause mispronunciation, confusing users who rely on auditory feedback. It also affects braille translation and language-specific styling."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when: 1) The `lang` attribute is missing on the `<html>` element, 2) The value is not a valid BCP 47 language code (e.g., 'english' instead of 'en'), or 3) A descendant element's `lang` value is invalid.",
      "common_causes": "Typos in language codes (e.g., 'eng' instead of 'en'), using deprecated codes (e.g., 'iw' instead of 'he' for Hebrew), or omitting the `lang` attribute entirely."
    },
    "fixes": [
      {
        "step": "Ensure the `<html>` element has a valid `lang` attribute (e.g., `<html lang='en'>`). Use ISO 639-1 codes for primary languages.",
        "code_reference": "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang"
      },
      {
        "step": "For multilingual content, use valid `lang` attributes on descendant elements (e.g., `<span lang='fr'>Bonjour</span>`).",
        "code_reference": "https://www.w3.org/International/questions/qa-html-language-declarations"
      }
    ],
    "best_practices": [
      "Always declare a default language on the `<html>` element, even for single-language pages.",
      "Test with screen readers to verify pronunciation matches the declared language."
    ],
    "code_examples": {
      "before": "<html>\n  <body>\n    <p>This page has no language set.</p>\n  </body>\n</html>",
      "after": "<html lang='en'>\n  <body>\n    <p>This page is in English.</p>\n    <p lang='es'>Este texto está en español.</p>\n  </body>\n</html>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/valid-lang"
      },
      {
        "title": "WCAG Success Criterion 3.1.1",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/language-of-page.html"
      },
      {
        "title": "BCP 47 Language Codes",
        "url": "https://www.rfc-editor.org/info/bcp47"
      }
    ]
  },
    "video-caption": {
    "rule_id": "video-caption",
    "issue_explanation": "This rule ensures that videos embedded in the page have synchronized captions for users who are deaf or hard of hearing. A violation occurs when a `<video>` element lacks captions, making the audio content inaccessible to users who cannot hear it.",
    "wcag_guidelines": [
      "1.2.2 Captions (Prerecorded) (Level A)",
      "1.2.4 Captions (Live) (Level AA)",
      "Section 508 § 1194.22(b)"
    ],
    "impact": {
      "severity": "High",
      "description": "Users who are deaf or hard of hearing rely on captions to understand audio content. Without captions, video content becomes completely inaccessible to these users, violating fundamental accessibility principles."
    },
    "technical_analysis": {
      "failure_conditions": "Fails when: 1) A `<video>` element contains audio but no captions are provided, 2) Captions exist but are not synchronized with the audio, or 3) Captions are provided in an unsupported format.",
      "common_causes": "Omitting `<track>` elements for captions, using incorrect caption formats (e.g., non-WebVTT), or failing to enable captions by default in video players."
    },
    "fixes": [
      {
        "step": "Add a WebVTT caption file using the `<track>` element with `kind='captions'` and `srclang` attributes. Example: `<track kind='captions' src='captions.vtt' srclang='en' default>`",
        "code_reference": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track"
      },
      {
        "step": "For third-party video players (e.g., YouTube), ensure captions are available and enabled by default. Use the `cc_load_policy=1` parameter for YouTube embeds.",
        "code_reference": "https://support.google.com/youtube/answer/100078"
      }
    ],
    "best_practices": [
      "Always provide captions for videos with spoken content, even if the video is short.",
      "Test captions with multiple screen readers and browsers to ensure compatibility."
    ],
    "code_examples": {
      "before": "<video controls>\n  <source src='video.mp4' type='video/mp4'>\n  <!-- Missing captions -->\n</video>",
      "after": "<video controls>\n  <source src='video.mp4' type='video/mp4'>\n  <track kind='captions' src='captions.vtt' srclang='en' default>\n</video>"
    },
    "resources": [
      {
        "title": "Deque University Rule Reference",
        "url": "https://dequeuniversity.com/rules/axe/4.7/video-caption"
      },
      {
        "title": "WCAG Success Criterion 1.2.2",
        "url": "https://www.w3.org/WAI/WCAG21/Understanding/captions-prerecorded.html"
      },
      {
        "title": "WebVTT Format Guide",
        "url": "https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API"
      }
    ]
  },             
};