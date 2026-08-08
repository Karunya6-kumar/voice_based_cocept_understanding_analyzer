// script.js
// Voice based concept understanding analyser - Frontend JavaScript
// Handles navigation, voice input, and communication with the backend API

// ============================================================
// SECTION NAVIGATION
// Shows and hides different sections of the page
// ============================================================
function showSection(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll(".section");
  sections.forEach(function (sec) {
    sec.style.display = "none";
  });

  // Show the selected section
  const target = document.getElementById(sectionId);
  if (target) {
    target.style.display = "block";
  }

  // Update active nav link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(function (link) {
    link.classList.remove("active");
  });

  // Find the matching nav link and mark it active
  const activeLink = document.querySelector('.nav-link[onclick*="' + sectionId + '"]');
  if (activeLink) {
    activeLink.classList.add("active");
  }

  // Scroll to top
  window.scrollTo(0, 0);
}

// ============================================================
// VOICE INPUT USING WEB SPEECH API
// Lets the student speak instead of typing their explanation
// ============================================================
let recognition = null;
let isListening = false;

// Check if the browser supports speech recognition
function setupSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    document.getElementById("voiceStatus").textContent = "Voice input not supported in this browser. You can type instead.";
    document.getElementById("voiceBtn").disabled = true;
    return null;
  }

  const recog = new SpeechRecognition();
  recog.lang = "en-US";
  recog.interimResults = false;
  recog.maxAlternatives = 1;

  // When speech result is received
  recog.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    const textarea = document.getElementById("explanation");

    // Append the spoken text to whatever is already in the textarea
    if (textarea.value.trim() === "") {
      textarea.value = transcript;
    } else {
      textarea.value = textarea.value + " " + transcript;
    }
  };

  // When speech recognition ends
  recog.onend = function () {
    isListening = false;
    document.getElementById("voiceBtn").textContent = "Start Voice Input";
    document.getElementById("voiceStatus").textContent = "Voice input stopped.";
    document.getElementById("voiceStatus").classList.remove("listening");
  };

  // Handle errors
  recog.onerror = function (event) {
    isListening = false;
    document.getElementById("voiceBtn").textContent = "Start Voice Input";
    document.getElementById("voiceStatus").textContent = "Voice input error: " + event.error;
    document.getElementById("voiceStatus").classList.remove("listening");
  };

  return recog;
}

// Start or stop voice input
function startVoiceInput() {
  if (!recognition) {
    recognition = setupSpeechRecognition();
  }

  if (!recognition) return;

  if (isListening) {
    recognition.stop();
    isListening = false;
    document.getElementById("voiceBtn").textContent = "Start Voice Input";
    document.getElementById("voiceStatus").textContent = "Voice input stopped.";
    document.getElementById("voiceStatus").classList.remove("listening");
  } else {
    recognition.start();
    isListening = true;
    document.getElementById("voiceBtn").textContent = "Stop Voice Input";
    document.getElementById("voiceStatus").textContent = "Listening... speak now.";
    document.getElementById("voiceStatus").classList.add("listening");
  }
}

// ============================================================
// ANALYZE UNDERSTANDING
// Sends the form data to the backend API and shows the result
// ============================================================
function analyzeUnderstanding() {
  // Get values from the form
  const subject = document.getElementById("subject").value;
  const concept = document.getElementById("concept").value;
  const explanation = document.getElementById("explanation").value;
  const errorMsg = document.getElementById("errorMsg");
  const resultArea = document.getElementById("resultArea");

  // Hide previous error and result
  errorMsg.style.display = "none";
  resultArea.style.display = "none";

  // Validate: check for empty fields
  if (!subject.trim()) {
    showError("Please enter the subject.");
    return;
  }

  if (!concept.trim()) {
    showError("Please enter the concept.");
    return;
  }

  if (!explanation.trim()) {
    showError("Please explain the concept in your own words.");
    return;
  }

  // Send data to the backend API
  fetch("/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      subject: subject,
      concept: concept,
      explanation: explanation
    })
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (!data.success) {
        showError(data.message || "Something went wrong. Please try again.");
        return;
      }

      // If concept was not found in the knowledge base
      if (data.found === false) {
        showError(data.message || "Concept not found in the knowledge base.");
        return;
      }

      // Show the analysis result
      displayResult(data.data);
    })
    .catch(function (error) {
      showError("Could not connect to the server. Please make sure the server is running.");
      console.error("Analysis error:", error);
    });
}

// Show an error message
function showError(message) {
  const errorMsg = document.getElementById("errorMsg");
  errorMsg.textContent = message;
  errorMsg.style.display = "block";
}

// ============================================================
// DISPLAY RESULT
// Fills the result area with the analysis data from the backend
// ============================================================
function displayResult(data) {
  // Show the result area
  document.getElementById("resultArea").style.display = "block";

  // Fill in score and level
  document.getElementById("resultScore").textContent = data.score;
  document.getElementById("resultLevel").textContent = data.level;

  // Color the level badge based on score
  const levelEl = document.getElementById("resultLevel");
  if (data.score <= 30) levelEl.style.backgroundColor = "#fdeaea";
  else if (data.score <= 50) levelEl.style.backgroundColor = "#fff4e0";
  else if (data.score <= 70) levelEl.style.backgroundColor = "#fffbe0";
  else if (data.score <= 85) levelEl.style.backgroundColor = "#e8f5e9";
  else levelEl.style.backgroundColor = "#e0f5e8";

  // Fill in feedback sections
  document.getElementById("resultUnderstood").textContent = data.understood;
  document.getElementById("resultMissing").textContent = data.missingConcepts;
  document.getElementById("resultImprove").textContent = data.areasToImprove;
  document.getElementById("resultExplanation").textContent = data.simpleExplanation;
  document.getElementById("resultRealLife").textContent = data.realLifeExample;

  // Fill in important points list
  fillList("resultPoints", data.importantPoints);

  // Fill in practice questions list
  fillList("resultPractice", data.practiceQuestions);

  // Fill in learning suggestions list
  fillList("resultSuggestions", data.suggestions);

  // Scroll to result
  document.getElementById("resultArea").scrollIntoView({ behavior: "smooth" });
}

// Helper to fill a <ul> element with list items
function fillList(elementId, items) {
  const ul = document.getElementById(elementId);
  ul.innerHTML = "";
  if (items && items.length > 0) {
    items.forEach(function (item) {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });
  }
}

// ============================================================
// TEACH ME MODE
// Fetches teaching content for the selected concept from the backend
// ============================================================
function showTeachMode() {
  const concept = document.getElementById("concept").value.trim();
  const subject = document.getElementById("subject").value.trim();

  if (!concept) {
    showError("Please enter a concept first.");
    return;
  }

  // Hide other areas
  document.getElementById("resultArea").style.display = "none";
  document.getElementById("practiceArea").style.display = "none";
  document.getElementById("teachArea").style.display = "block";

  // Fetch teach content from the backend
  fetch("/teach?concept=" + encodeURIComponent(concept) + "&subject=" + encodeURIComponent(subject))
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (!data.success) {
        document.getElementById("teachContent").innerHTML =
          '<p class="error-msg">' + (data.message || "Concept not found.") + "</p>";
        return;
      }

      document.getElementById("teachConceptName").textContent = data.concept;

      // Build the teach content in 8 beginner-friendly steps
      const t = data.teachContent;
      const html =
        '<div class="teach-item"><h4>1. Concept in One Sentence</h4><p>' + t.oneSentence + "</p></div>" +
        '<div class="teach-item"><h4>2. Simple Explanation</h4><p>' + t.simpleExplanation + "</p></div>" +
        '<div class="teach-item"><h4>3. Why It Is Used</h4><p>' + t.whyItIsUsed + "</p></div>" +
        '<div class="teach-item"><h4>4. How It Works</h4><p>' + t.howItWorks + "</p></div>" +
        '<div class="teach-item"><h4>5. Simple Example</h4><p>' + t.simpleExample + "</p></div>" +
        '<div class="teach-item"><h4>6. Real-Life Example</h4><p>' + t.realLifeExample + "</p></div>" +
        '<div class="teach-item"><h4>7. Common Mistake</h4><p>' + t.commonMistake + "</p></div>" +
        '<div class="teach-item"><h4>8. Quick Question</h4><p>' + t.quickQuestion + "</p></div>";

      document.getElementById("teachContent").innerHTML = html;
    })
    .catch(function (error) {
      document.getElementById("teachContent").innerHTML =
        '<p class="error-msg">Could not connect to the server.</p>';
      console.error("Teach error:", error);
    });
}

// ============================================================
// PRACTICE MODE
// Fetches practice questions and lets students check their answers
// ============================================================
let currentPracticeAnswers = [];

function showPractice() {
  const concept = document.getElementById("concept").value.trim();

  if (!concept) {
    showError("Please enter a concept first.");
    return;
  }

  // Hide other areas
  document.getElementById("resultArea").style.display = "none";
  document.getElementById("teachArea").style.display = "none";
  document.getElementById("practiceArea").style.display = "block";

  // Fetch practice questions from the backend
  fetch("/practice?concept=" + encodeURIComponent(concept))
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (!data.success) {
        document.getElementById("practiceQuestions").innerHTML =
          '<p class="error-msg">' + (data.message || "Concept not found.") + "</p>";
        return;
      }

      document.getElementById("practiceConceptName").textContent = data.concept;
      document.getElementById("practiceFeedback").style.display = "none";

      // Build question inputs
      currentPracticeAnswers = data.questions;
      let html = "";
      data.questions.forEach(function (q, index) {
        html +=
          '<div class="practice-question">' +
          "<p>" + (index + 1) + ". " + q + "</p>" +
          '<input type="text" id="practiceAnswer' + index + '" placeholder="Type your answer here" />' +
          "</div>";
      });
      document.getElementById("practiceQuestions").innerHTML = html;
    })
    .catch(function (error) {
      document.getElementById("practiceQuestions").innerHTML =
        '<p class="error-msg">Could not connect to the server.</p>';
      console.error("Practice error:", error);
    });
}

// Check practice answers and give simple feedback
function checkPracticeAnswers() {
  const feedbackDiv = document.getElementById("practiceFeedback");
  let html = "<h4>Feedback</h4>";

  currentPracticeAnswers.forEach(function (q, index) {
    const input = document.getElementById("practiceAnswer" + index);
    const answer = input ? input.value.trim() : "";

    if (answer === "") {
      html += '<p style="color:#c0392b;">Q' + (index + 1) + ": You did not answer this question. Try again!</p>";
    } else if (answer.length < 5) {
      html += '<p style="color:#e67e22;">Q' + (index + 1) + ": Your answer is too short. Try to explain in more detail.</p>";
    } else {
      html += '<p style="color:#27ae60;">Q' + (index + 1) + ': Good attempt! You can compare your answer with reference material to check accuracy.</p>';
    }
  });

  feedbackDiv.innerHTML = html;
  feedbackDiv.style.display = "block";
}

// ============================================================
// INITIAL SETUP
// Initialize speech recognition when the page loads
// ============================================================
window.onload = function () {
  setupSpeechRecognition();
};
