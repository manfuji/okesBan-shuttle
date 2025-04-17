export const json = {
  title: "OkesBan Shuttle Service - User Feedback Dashboard",
  description:
    "We'd love to hear how we’re doing. Please answer a few questions to help us improve our services.",
  showQuestionNumbers: "off",
  completedHtml:
    "<h3>🎉 Thank you for your feedback!</h3><p>Your input helps us serve you better.</p>",
  pages: [
    {
      name: "dashboard_feedback",
      elements: [
        {
          type: "rating",
          name: "satisfaction",
          title: "How satisfied are you with our shuttle services?",
          rateMin: 1,
          rateMax: 5,
          minRateDescription: "Very Dissatisfied",
          maxRateDescription: "Very Satisfied",
        },
        {
          type: "checkbox",
          name: "services_used",
          title: "Which of our services have you used?",
          isRequired: true,
          choices: ["Ashesi Shuttle", "Bus Rentals", "SchoolBus Pickup"],
        },
        {
          type: "comment",
          name: "feature_requests",
          title: "What features or improvements would you like to see?",
        },
        {
          type: "radiogroup",
          name: "booking_experience",
          title: "How easy was it to book a ride?",
          isRequired: true,
          choices: [
            "Very Easy",
            "Somewhat Easy",
            "Neutral",
            "Somewhat Difficult",
            "Very Difficult",
          ],
        },
        {
          type: "boolean",
          name: "recommendation",
          title: "Would you recommend us to others?",
          labelTrue: "Yes",
          labelFalse: "No",
        },
      ],
    },
  ],
};

// Survey results
const firstResult = {
  organization_type: "In-house",
  developer_count: "1",
  vertical_market: "Education",
  product_discovering: "GitHub",
  javascript_frameworks: ["jQuery"],
  backend_language: ["Ruby"],
  useproduct: "Yes",
  usecomponents: ["Survey Library (Runner)"],
  supported_devices: ["Desktop", "Tablet", "Mobile"],
  native_mobile_support: 2,
  product_alternative: "Self-developed solution",
  product_recommend: "Yes",
  nps_score: 6,
  product_improvement:
    "The lack of accessibility is a huge disadvantage. That's one reason why I cannot use it in all my projects.",
  native_framework: "",
  survey_cloud_platform: "",
  favorite_functionality: "",
};

const secondResult = {
  organization_type: "Consulting",
  developer_count: "3-5",
  vertical_market: "Government (federal, state, local)",
  product_discovering: "Search engine",
  javascript_frameworks: ["Vue", "jQuery", "other"],
  backend_language: ["Python", "Node.js"],
  useproduct: "Yes",
  usecomponents: ["Survey Library (Runner)"],
  supported_devices: ["Desktop"],
  product_alternative: "Develop ourselves",
  product_recommend: "Yes",
  nps_score: 8,
  native_mobile_support: "",
  native_framework: "",
  survey_cloud_platform: "",
  favorite_functionality: "",
  product_improvement: "",
};

export const data = [firstResult, secondResult];
