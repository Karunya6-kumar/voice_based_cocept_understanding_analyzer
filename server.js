// server.js
// Voice based concept understanding analyser - Backend server
// B.Tech student project using Node.js + Express

const express = require("express");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware to parse JSON and form data from the frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS) from the public folder
app.use(express.static(path.join(__dirname, "public")));

// ============================================================
// KNOWLEDGE BASE
// This is a simple local knowledge base of common CSE/AI&DS concepts.
// Each concept stores: keywords, definition, important points,
// example, real-life example, and practice questions.
// To add a new concept, just add a new entry below.
// ============================================================
const knowledgeBase = {
  variables: {
    name: "Variables",
    keywords: ["variable", "store", "value", "name", "data", "assign", "memory", "declaration", "type", "identifier"],
    definition: "A variable is a named storage location in memory used to hold a value that can change during program execution.",
    importantPoints: [
      "A variable has a name and a value",
      "Variables can be of different types like int, float, string",
      "The value of a variable can be changed during program execution",
      "Variables must be declared before they are used"
    ],
    example: "int age = 20;  Here 'age' is a variable storing the value 20.",
    realLifeExample: "Think of a variable like a labeled box. You write 'age' on the box and put the number 20 inside. You can change the number later.",
    practiceQuestions: [
      "What is a variable in programming?",
      "Why do we need to declare a variable before using it?",
      "Give a real-life example of a variable."
    ],
    suggestions: [
      "Practice declaring variables of different types",
      "Try changing the value of a variable in a program",
      "Learn about variable naming rules"
    ]
  },

  arrays: {
    name: "Arrays",
    keywords: ["array", "collection", "elements", "index", "indexing", "same type", "contiguous", "memory", "size", "access", "store", "multiple"],
    definition: "An array is a collection of elements of the same type stored in contiguous memory locations and accessed using an index.",
    importantPoints: [
      "Arrays store multiple values of the same type",
      "Each element is accessed using an index",
      "Array indexing starts from 0",
      "Arrays have a fixed size in most languages",
      "Arrays are stored in contiguous memory locations"
    ],
    example: "int marks[5] = {90, 85, 70, 95, 60};  marks[0] gives 90.",
    realLifeExample: "Think of an array like a row of lockers in a school. Each locker has a number (index) and stores one item inside.",
    practiceQuestions: [
      "What is an array?",
      "Why is indexing used in arrays?",
      "Give a real-life example of an array."
    ],
    suggestions: [
      "Practice accessing array elements by index",
      "Try looping through an array",
      "Learn the difference between arrays and lists"
    ]
  },

  loops: {
    name: "Loops",
    keywords: ["loop", "repeat", "iteration", "for", "while", "do while", "condition", "iterate", "repetition", "counter", "continue", "break"],
    definition: "A loop is a programming structure that repeats a block of code as long as a condition is true.",
    importantPoints: [
      "Loops are used to repeat a block of code",
      "For loop is used when the number of iterations is known",
      "While loop is used when the number of iterations is unknown",
      "Loops help reduce code repetition",
      "A loop must have a stopping condition to avoid infinite loops"
    ],
    example: "for (int i = 0; i < 5; i++) { printf(\"%d\", i); }  This prints 0 to 4.",
    realLifeExample: "Think of a loop like reading pages of a book. You keep turning pages (repeating) until you reach the last page (condition becomes false).",
    practiceQuestions: [
      "What is a loop in programming?",
      "What is the difference between for loop and while loop?",
      "Give a real-life example of a loop."
    ],
    suggestions: [
      "Practice writing for and while loops",
      "Learn about break and continue statements",
      "Try solving problems using loops"
    ]
  },

  functions: {
    name: "Functions",
    keywords: ["function", "method", "call", "return", "parameter", "argument", "reusable", "modular", "define", "invoke", "modularity", "call"],
    definition: "A function is a reusable block of code that performs a specific task and can be called whenever needed.",
    importantPoints: [
      "Functions make code reusable",
      "Functions improve code readability and modularity",
      "A function can take inputs called parameters",
      "A function can return a value",
      "Functions help in dividing large programs into smaller parts"
    ],
    example: "int add(int a, int b) { return a + b; }  This function adds two numbers and returns the result.",
    realLifeExample: "Think of a function like a recipe. You give it ingredients (parameters), it follows steps, and gives you a dish (return value).",
    practiceQuestions: [
      "What is a function?",
      "Why do we use functions in programming?",
      "What is the difference between parameter and argument?"
    ],
    suggestions: [
      "Practice writing functions with and without parameters",
      "Try writing functions that return values",
      "Learn about recursion as a function calling itself"
    ]
  },

  oop: {
    name: "OOP",
    keywords: ["oop", "object", "class", "encapsulation", "inheritance", "polymorphism", "abstraction", "object oriented", "method", "instance", "constructor", "message passing"],
    definition: "Object-Oriented Programming (OOP) is a programming approach based on the concept of objects that contain data and code.",
    importantPoints: [
      "OOP is based on objects and classes",
      "Encapsulation hides internal data of an object",
      "Inheritance allows a class to use properties of another class",
      "Polymorphism allows the same function to behave differently",
      "Abstraction hides complexity and shows only essential features"
    ],
    example: "class Car { String color; void start() { ... } }  Here Car is a class and we can create objects of Car.",
    realLifeExample: "Think of a class like a blueprint of a house. You can build many houses (objects) from the same blueprint.",
    practiceQuestions: [
      "What is OOP?",
      "What are the four pillars of OOP?",
      "Give a real-life example of a class and object."
    ],
    suggestions: [
      "Learn the four pillars of OOP in detail",
      "Practice creating classes and objects",
      "Try writing programs using inheritance"
    ]
  },

  sql: {
    name: "SQL",
    keywords: ["sql", "query", "select", "insert", "update", "delete", "database", "table", "where", "join", "primary key", "foreign key", "structured query language"],
    definition: "SQL (Structured Query Language) is a language used to communicate with and manage relational databases.",
    importantPoints: [
      "SQL is used to manage relational databases",
      "SELECT is used to retrieve data",
      "INSERT is used to add new data",
      "UPDATE is used to modify existing data",
      "DELETE is used to remove data",
      "WHERE clause is used to filter records"
    ],
    example: "SELECT * FROM students WHERE marks > 80;  This retrieves all students with marks above 80.",
    realLifeExample: "Think of SQL like asking a librarian to find books. You give a command (query) and the librarian (database) returns the books (data).",
    practiceQuestions: [
      "What is SQL?",
      "What is the difference between SELECT and INSERT?",
      "Give a real-life example where SQL is used."
    ],
    suggestions: [
      "Practice writing SELECT, INSERT, UPDATE, DELETE queries",
      "Learn about JOINs in SQL",
      "Try creating tables and inserting data"
    ]
  },

  dbms: {
    name: "DBMS",
    keywords: ["dbms", "database", "management system", "data", "store", "retrieve", "redundancy", "consistency", "integrity", "security", "acidity", "transaction", "schema", "normalization"],
    definition: "DBMS (Database Management System) is software that allows users to create, manage, and access databases efficiently.",
    importantPoints: [
      "DBMS helps in storing and retrieving data efficiently",
      "It reduces data redundancy",
      "It maintains data consistency and integrity",
      "It provides security and access control",
      "Examples include MySQL, Oracle, PostgreSQL"
    ],
    example: "A college uses a DBMS to store student records, course details, and attendance in an organized way.",
    realLifeExample: "Think of a DBMS like a digital filing cabinet. It stores files (data) in an organized way so you can find and update them easily.",
    practiceQuestions: [
      "What is a DBMS?",
      "What are the advantages of using a DBMS?",
      "Give a real-life example of a DBMS."
    ],
    suggestions: [
      "Learn about normalization in DBMS",
      "Study ACID properties",
      "Practice creating database schemas"
    ]
  },

  "machine learning": {
    name: "Machine Learning",
    keywords: ["machine learning", "ml", "model", "training", "data", "algorithm", "prediction", "supervised", "unsupervised", "features", "labels", "accuracy", "dataset", "classification", "regression", "train", "test"],
    definition: "Machine Learning is a branch of AI where a system learns patterns from data and improves its performance without being explicitly programmed.",
    importantPoints: [
      "Machine Learning is a part of Artificial Intelligence",
      "Supervised learning uses labeled data",
      "Unsupervised learning uses unlabeled data",
      "A model is trained using a dataset",
      "The trained model is used to make predictions on new data"
    ],
    example: "A spam filter is trained on many emails (spam and not spam). It then predicts whether a new email is spam.",
    realLifeExample: "Think of Machine Learning like learning to ride a bicycle. You fall, you practice, and over time you improve without someone telling you every step.",
    practiceQuestions: [
      "What is Machine Learning?",
      "What is the difference between supervised and unsupervised learning?",
      "Give a real-life example of Machine Learning."
    ],
    suggestions: [
      "Learn about supervised and unsupervised learning",
      "Practice with simple datasets like Iris",
      "Learn about training and testing a model"
    ]
  },

  "artificial intelligence": {
    name: "Artificial Intelligence",
    keywords: ["artificial intelligence", "ai", "intelligent", "machine", "human", "reasoning", "learning", "problem solving", "nlp", "neural network", "agent", "decision", "knowledge", "perception", "cognitive"],
    definition: "Artificial Intelligence is the field of creating systems that can perform tasks that normally require human intelligence.",
    importantPoints: [
      "AI aims to create intelligent systems",
      "AI includes learning, reasoning, and problem solving",
      "AI is used in speech recognition, image processing, and decision making",
      "Machine Learning and Deep Learning are parts of AI",
      "AI can be narrow (specific task) or general (human-like)"
    ],
    example: "A chatbot uses AI to understand user questions and give answers like a human would.",
    realLifeExample: "Think of AI like a smart assistant. You ask it questions, it understands, thinks, and gives you an answer.",
    practiceQuestions: [
      "What is Artificial Intelligence?",
      "What is the difference between AI and Machine Learning?",
      "Give a real-life example of AI."
    ],
    suggestions: [
      "Learn the difference between AI, ML, and Deep Learning",
      "Study real-world AI applications",
      "Learn about neural networks"
    ]
  },

  "data structures": {
    name: "Data Structures",
    keywords: ["data structure", "array", "linked list", "stack", "queue", "tree", "graph", "organize", "store", "efficient", "access", "traversal", "node", "pointer", "hash", "sorting"],
    definition: "A data structure is a way of organizing and storing data in a computer so that it can be used efficiently.",
    importantPoints: [
      "Data structures organize data for efficient access",
      "Common data structures include arrays, linked lists, stacks, queues, trees, and graphs",
      "Choosing the right data structure improves program performance",
      "Stacks follow LIFO (Last In First Out)",
      "Queues follow FIFO (First In First Out)"
    ],
    example: "A stack is used in undo functionality. The last action you did is the first to be undone.",
    realLifeExample: "Think of a data structure like a bookshelf. How you arrange books decides how fast you can find a book.",
    practiceQuestions: [
      "What is a data structure?",
      "What is the difference between a stack and a queue?",
      "Give a real-life example of a data structure."
    ],
    suggestions: [
      "Practice implementing stacks and queues",
      "Learn about linked lists and trees",
      "Try solving problems using different data structures"
    ]
  },

  "computer networks": {
    name: "Computer Networks",
    keywords: ["computer network", "network", "lan", "wan", "man", "protocol", "tcp", "ip", "router", "switch", "topology", "osi", "packet", "communication", "connection", "internet", "client", "server"],
    definition: "A computer network is a group of connected computers that share resources and communicate with each other.",
    importantPoints: [
      "Networks allow computers to share data and resources",
      "LAN covers a small area, WAN covers a large area",
      "The OSI model has 7 layers",
      "TCP/IP is the most common protocol used on the internet",
      "Devices like routers and switches help connect networks"
    ],
    example: "The internet is the largest computer network connecting millions of devices worldwide.",
    realLifeExample: "Think of a computer network like a postal system. Data (letters) is sent from one computer (sender) to another (receiver) through routers (post offices).",
    practiceQuestions: [
      "What is a computer network?",
      "What is the OSI model?",
      "Give a real-life example of a computer network."
    ],
    suggestions: [
      "Learn the 7 layers of the OSI model",
      "Study the difference between LAN, MAN, and WAN",
      "Learn about TCP/IP protocol"
    ]
  },

  "operating systems": {
    name: "Operating Systems",
    keywords: ["operating system", "os", "kernel", "process", "memory", "scheduling", "file", "system", "resource", "management", "cpu", "deadlock", "thread", "multitasking", "interrupt", "booting"],
    definition: "An Operating System is system software that manages computer hardware and software resources and provides services to programs.",
    importantPoints: [
      "An OS manages memory, processes, and files",
      "Common operating systems include Windows, Linux, and macOS",
      "The OS acts as a bridge between the user and the hardware",
      "It handles process scheduling and resource allocation",
      "It provides a user interface"
    ],
    example: "When you start your computer, the OS loads into memory and lets you run applications.",
    realLifeExample: "Think of an Operating System like a manager of a factory. It assigns tasks to workers (hardware), manages resources, and makes sure everything runs smoothly.",
    practiceQuestions: [
      "What is an Operating System?",
      "What are the main functions of an OS?",
      "Give a real-life example of an Operating System."
    ],
    suggestions: [
      "Learn about process scheduling",
      "Study memory management techniques",
      "Learn about deadlocks and how they are prevented"
    ]
  }
};

// ============================================================
// TEXT PROCESSING HELPERS
// These functions clean and normalize text before matching.
// ============================================================

// Convert text to lowercase and remove punctuation
function cleanText(text) {
  return text
    .toLowerCase()
    .replace(/[.,;:!?()'"\/\\@#$%^&*+=<>{}~|`_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Check if any keyword from the knowledge base appears in the student's explanation
function findMatchedKeywords(explanation, keywords) {
  const cleanedExplanation = cleanText(explanation);
  const matched = [];
  for (const keyword of keywords) {
    // Use word boundary matching to avoid partial matches
    const pattern = new RegExp("\\b" + keyword.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b");
    if (pattern.test(cleanedExplanation)) {
      matched.push(keyword);
    }
  }
  return matched;
}

// ============================================================
// ANALYZER FUNCTION (LOCAL)
// This function compares the student's explanation with the
// knowledge base and calculates a score based on matched keywords.
// ============================================================
function analyzeLocally(subject, concept, explanation) {
  // Find the concept in the knowledge base (case-insensitive)
  const conceptKey = concept.toLowerCase().trim();
  const conceptData = knowledgeBase[conceptKey];

  if (!conceptData) {
    return {
      found: false,
      message: "This concept is not in the local knowledge base. Try one of the listed concepts like Variables, Arrays, Loops, Functions, OOP, SQL, DBMS, Machine Learning, Artificial Intelligence, Data Structures, Computer Networks, or Operating Systems."
    };
  }

  // Find which keywords the student mentioned
  const matchedKeywords = findMatchedKeywords(explanation, conceptData.keywords);
  const totalKeywords = conceptData.keywords.length;

  // Calculate score: (matched keywords / total keywords) * 100
  // We use a minimum of 1 to avoid division by zero
  const score = Math.round((matchedKeywords.length / totalKeywords) * 100);

  // Find which keywords the student missed
  const missingKeywords = conceptData.keywords.filter(
    (keyword) => !matchedKeywords.includes(keyword)
  );

  // Determine understanding level based on score
  let level = "";
  if (score >= 0 && score <= 30) level = "Needs Improvement";
  else if (score >= 31 && score <= 50) level = "Basic Understanding";
  else if (score >= 51 && score <= 70) level = "Moderate Understanding";
  else if (score >= 71 && score <= 85) level = "Good Understanding";
  else if (score >= 86 && score <= 100) level = "Excellent Understanding";

  // Build feedback: what the student understood
  const understood = matchedKeywords.length > 0
    ? "You correctly mentioned these key concepts: " + matchedKeywords.join(", ") + "."
    : "You did not mention any of the key concepts related to this topic.";

  // Build feedback: missing concepts
  const missing = missingKeywords.length > 0
    ? "You missed these important concepts: " + missingKeywords.join(", ") + "."
    : "Great! You covered all the important concepts.";

  // Build feedback: areas to improve
  const areasToImprove = missingKeywords.length > 0
    ? "Focus on understanding these terms: " + missingKeywords.slice(0, 5).join(", ") + "."
    : "Your understanding is strong. Try exploring advanced topics related to this concept.";

  return {
    found: true,
    subject: subject,
    concept: conceptData.name,
    score: score,
    level: level,
    understood: understood,
    missingConcepts: missing,
    areasToImprove: areasToImprove,
    simpleExplanation: conceptData.definition,
    realLifeExample: conceptData.realLifeExample,
    importantPoints: conceptData.importantPoints,
    practiceQuestions: conceptData.practiceQuestions,
    suggestions: conceptData.suggestions
  };
}

// ============================================================
// AI ANALYZER FUNCTION (FOR FUTURE ENHANCEMENT)
// This function is designed to call an AI API in the future.
// Currently it is not used because no AI_API_KEY is set.
// To enable it, add AI_API_KEY=your_key to a .env file.
// ============================================================
async function analyzeWithAI(subject, concept, explanation) {
  const apiKey = process.env.AI_API_KEY;

  // If no API key is set, return null so the server falls back to local analysis
  if (!apiKey) {
    return null;
  }

  // Future AI API call would go here, for example:
  // const response = await fetch("https://api.example-ai.com/analyze", {
  //   method: "POST",
  //   headers: { "Authorization": "Bearer " + apiKey, "Content-Type": "application/json" },
  //   body: JSON.stringify({ subject, concept, explanation })
  // });
  // const data = await response.json();
  // return data;

  return null;
}

// ============================================================
// API ROUTES
// ============================================================

// POST /analyze - Main analysis endpoint
// Receives subject, concept, and explanation from the frontend
app.post("/analyze", async (req, res) => {
  try {
    const { subject, concept, explanation } = req.body;

    // Validate input - check for empty fields
    if (!subject || !concept || !explanation) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields: subject, concept, and explanation."
      });
    }

    // Trim whitespace
    const cleanSubject = subject.trim();
    const cleanConcept = concept.trim();
    const cleanExplanation = explanation.trim();

    // Check if explanation is too short
    if (cleanExplanation.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Your explanation is too short. Please write at least one full sentence."
      });
    }

    // First try AI analysis (if API key is configured)
    const aiResult = await analyzeWithAI(cleanSubject, cleanConcept, cleanExplanation);

    if (aiResult) {
      return res.json({ success: true, source: "ai", data: aiResult });
    }

    // Fall back to local analysis
    const result = analyzeLocally(cleanSubject, cleanConcept, cleanExplanation);

    if (!result.found) {
      return res.json({
        success: true,
        source: "local",
        found: false,
        message: result.message
      });
    }

    return res.json({ success: true, source: "local", found: true, data: result });
  } catch (error) {
    console.error("Error during analysis:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong on the server. Please try again."
    });
  }
});

// GET /concepts - Return list of available concepts (for autocomplete or hints)
app.get("/concepts", (req, res) => {
  const concepts = Object.keys(knowledgeBase).map((key) => ({
    key: key,
    name: knowledgeBase[key].name
  }));
  res.json({ success: true, concepts: concepts });
});

// GET /teach - Return teaching content for a concept
app.get("/teach", (req, res) => {
  const conceptKey = (req.query.concept || "").toLowerCase().trim();
  const conceptData = knowledgeBase[conceptKey];

  if (!conceptData) {
    return res.status(404).json({
      success: false,
      message: "Concept not found in the knowledge base."
    });
  }

  // Build the "Teach Me" content in beginner-friendly language
  const teachContent = {
    oneSentence: conceptData.definition,
    simpleExplanation: conceptData.importantPoints.join(" "),
    whyItIsUsed: "It helps programmers solve problems efficiently and is a fundamental concept in " + (req.query.subject || "computer science") + ".",
    howItWorks: conceptData.example,
    simpleExample: conceptData.example,
    realLifeExample: conceptData.realLifeExample,
    commonMistake: "A common mistake students make is not understanding the basic definition before trying to write code. Always start with the concept first.",
    quickQuestion: conceptData.practiceQuestions[0]
  };

  return res.json({ success: true, concept: conceptData.name, teachContent: teachContent });
});

// GET /practice - Return practice questions for a concept
app.get("/practice", (req, res) => {
  const conceptKey = (req.query.concept || "").toLowerCase().trim();
  const conceptData = knowledgeBase[conceptKey];

  if (!conceptData) {
    return res.status(404).json({
      success: false,
      message: "Concept not found in the knowledge base."
    });
  }

  return res.json({
    success: true,
    concept: conceptData.name,
    questions: conceptData.practiceQuestions
  });
});

// Serve index.html for the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log("============================================");
  console.log(" Voice based concept understanding analyser");
  console.log(" Server is running on http://localhost:" + PORT);
  console.log("============================================");
});
