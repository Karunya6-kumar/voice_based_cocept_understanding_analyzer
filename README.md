# Voice based concept understanding analyser

A B.Tech student project that captures a user's voice, converts speech into text, analyzes the meaning and concepts expressed, and evaluates the user's level of understanding.

## Project Introduction

The **Voice-Based Concept Understanding Analyzer** is an AI-based system that:
- Converts spoken answers into text using Speech-to-Text
- Identifies important concepts and keywords in the response
- Compares the user's answer with a reference/expected answer
- Measures semantic similarity and understanding level
- Provides a score and feedback to help the user improve their conceptual knowledge

## Features

- **Voice Input**: Speak your explanation using the browser's Web Speech API
- **Concept Analysis**: Get an understanding score from 0 to 100
- **Understanding Levels**: Needs Improvement, Basic, Moderate, Good, Excellent
- **Feedback**: See what you understood, what you missed, and areas to improve
- **Teach Me Mode**: Get a beginner-friendly explanation of any concept
- **Practice Questions**: Answer 3 practice questions and get feedback
- **Local Knowledge Base**: Works without any paid AI API
- **AI Ready**: Designed so an AI API can be added later via environment variable

## Technologies

- HTML
- CSS
- JavaScript
- Node.js
- Express.js

## Project Structure

```
concept-understanding-analyzer/
├── public/
│   ├── index.html      # Main HTML page with all sections
│   ├── style.css        # Simple stylesheet (student-style design)
│   └── script.js        # Frontend JavaScript (voice input, API calls)
├── server.js            # Backend server with knowledge base and API
├── package.json         # Project metadata and dependencies
└── README.md            # This file
```

## Installation

1. Make sure you have Node.js installed (version 14 or above)
2. Open a terminal in the project folder
3. Run the following command to install dependencies:

```
npm install
```

## How to Run

1. Start the server:

```
node server.js
```

2. Open your browser and go to:

```
http://localhost:5000
```

3. Click on "Analyze Concept", enter a subject and concept, and speak or type your explanation.

## How Analysis Works

1. The student enters a subject, concept, and their explanation (by typing or voice)
2. The frontend sends this data to the backend via `POST /analyze`
3. The backend cleans the text (lowercase, remove punctuation)
4. The backend looks up the concept in the local knowledge base
5. It matches the student's explanation against stored keywords using word-boundary matching
6. It calculates a score based on how many keywords were matched
7. It generates feedback: what was understood, what was missed, and suggestions
8. The result is sent back to the frontend and displayed

## Score Calculation

The score is calculated using this formula:

```
Score = (Matched Keywords / Total Keywords) * 100
```

Example: If a concept has 10 important keywords and the student mentions 8, the score is (8/10) * 100 = 80/100.

Understanding Levels:
- 0 to 30: Needs Improvement
- 31 to 50: Basic Understanding
- 51 to 70: Moderate Understanding
- 71 to 85: Good Understanding
- 86 to 100: Excellent Understanding

## How to Add New Concepts

Open `server.js` and find the `knowledgeBase` object. Add a new entry like this:

```javascript
"recursion": {
  name: "Recursion",
  keywords: ["recursion", "base case", "function", "call itself", "stack", "terminate", "repeat"],
  definition: "Recursion is when a function calls itself to solve a smaller version of the same problem.",
  importantPoints: [
    "A recursive function calls itself",
    "A base case is needed to stop the recursion",
    "Without a base case, recursion causes a stack overflow",
    "Recursion is used in problems like factorial and tree traversal"
  ],
  example: "int factorial(int n) { if (n <= 1) return 1; return n * factorial(n - 1); }",
  realLifeExample: "Think of recursion like Russian nesting dolls. You open one doll to find a smaller one inside, and repeat until the smallest doll.",
  practiceQuestions: [
    "What is recursion?",
    "Why is a base case important in recursion?",
    "Give a real-life example of recursion."
  ],
  suggestions: [
    "Practice writing recursive functions",
    "Learn about stack overflow",
    "Compare recursion with loops"
  ]
}
```

Save the file and restart the server. The new concept will be available for analysis.

## Future AI Enhancement

The backend is designed to support AI integration in the future:

1. An `analyzeWithAI()` function is already defined in `server.js`
2. It checks for an environment variable called `AI_API_KEY`
3. If no API key is set, it automatically falls back to the local analyzer
4. To enable AI analysis, set the environment variable and add the API call code inside `analyzeWithAI()`

Example for future use:

```bash
# Set the API key before starting the server
export AI_API_KEY=your_api_key_here
node server.js
```

The project works fully without any AI API. AI is an optional enhancement for the future.

## Available Concepts

The knowledge base currently includes:
- Variables
- Arrays
- Loops
- Functions
- OOP
- SQL
- DBMS
- Machine Learning
- Artificial Intelligence
- Data Structures
- Computer Networks
- Operating Systems

## Notes

- Voice input works best in Google Chrome
- The project uses only Express.js as a dependency
- All code is beginner-friendly and commented for viva explanation
- The design is simple and clean, suitable for a B.Tech student project
