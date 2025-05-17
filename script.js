const topics = [
  {
    name: "Pick a Language",
    description: "Choose a programming language to implement data structures and algorithms.",
    difficulty: "Beginner",
    subtopics: [
      "JavaScript",
      "Python",
      "C++",
      "Java",
      "Go",
      "Rust",
      "C#",
      "Ruby"
    ]
  },
  {
    name: "Platforms for Practice",
    description: "Utilize platforms to practice and improve your skills.",
    difficulty: "Beginner",
    subtopics: [
      "LeetCode",
      "HackerRank",
      "Codeforces",
      "GeeksforGeeks",
      "Edabit"
    ]
  },
  {
    name: "Programming Fundamentals",
    description: "Understand the core concepts of programming.",
    difficulty: "Beginner",
    subtopics: [
      "Language Syntax",
      "Control Structures (if, else, switch)",
      "Loops (for, while)",
      "Functions",
      "Object-Oriented Programming Basics",
      "Pseudo Code"
    ]
  },
  {
    name: "Data Structures",
    description: "Learn about various data structures and their applications.",
    difficulty: "Intermediate",
    subtopics: [
      "What are Data Structures?",
      "Importance of Data Structures",
      "Basic Data Structures",
      "Advanced Data Structures",
      "Complex Data Structures"
    ]
  },
  {
    name: "Algorithmic Complexity",
    description: "Understand the efficiency of algorithms.",
    difficulty: "Intermediate",
    subtopics: [
      "Asymptotic Notation",
      "Big O Notation",
      "Big Θ Notation",
      "Big Ω Notation",
      "Common Runtimes (Constant, Logarithmic, Linear, etc.)",
      "Time vs Space Complexity",
      "How to Calculate Complexity?"
    ]
  },
  {
    name: "Strings",
    description: "Sequence of characters used to represent text.",
    difficulty: "Beginner",
    subtopics: ["Reversal", "Palindrome Check", "Pattern Matching", "String Compression"]
  },
  {
    name: "Sorting Algorithms",
    description: "Learn various sorting techniques.",
    difficulty: "Intermediate",
    subtopics: [
      "Bubble Sort",
      "Insertion Sort",
      "Selection Sort",
      "Merge Sort",
      "Quick Sort",
      "Heap Sort"
    ]
  },
  {
    name: "Search Algorithms",
    description: "Understand different searching methods.",
    difficulty: "Intermediate",
    subtopics: [
      "Linear Search",
      "Binary Search"
    ]
  },
  {
    name: "Basic Data Structures",
    description: "Explore fundamental data structures.",
    difficulty: "Intermediate",
    subtopics: [
      "Arrays",
      "Linked Lists",
      "Stacks",
      "Queues",
      "Hash Tables"
    ]
  },
  {
    name: "Arrays",
    description: "Collection of items stored at contiguous memory locations.",
    difficulty: "Beginner",
    subtopics: ["Traversal", "Insertion", "Deletion", "Searching", "Sorting"]
  },
  {
    name: "Linked Lists",
    description: "Linear data structure where elements point to the next.",
    difficulty: "Intermediate",
    subtopics: ["Singly Linked List", "Doubly Linked List", "Circular Linked List", "Reversal"]
  },
  {
    name: "Stacks & Queues",
    description: "LIFO and FIFO data structures for storing and managing data.",
    difficulty: "Intermediate",
    subtopics: ["Stack using Arrays", "Queue using Arrays", "Stack using Linked List", "Queue using Linked List"]
  },
  {
    name: "Tree Data Structures",
    description: "Dive into tree-based data structures.",
    difficulty: "Advanced",
    subtopics: [
      "Binary Trees",
      "Binary Search Trees",
      "AVL Trees",
      "B-Trees",
      "Tree Traversal (In-Order, Pre-Order, Post-Order)"
    ]
  },
  {
    name: "Graph Data Structures",
    description: "Explore graph theory and related algorithms.",
    difficulty: "Advanced",
    subtopics: [
      "Directed Graphs",
      "Undirected Graphs",
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)",
      "Shortest Path Algorithms (Dijkstra's, Bellman-Ford)",
      "Minimum Spanning Tree (Prim's, Kruskal's)"
    ]
  },
  {
    name: "Advanced Data Structures",
    description: "Study complex data structures for specialized applications.",
    difficulty: "Advanced",
    subtopics: [
      "Trie",
      "Segment Trees",
      "Fenwick Trees (Binary Indexed Trees)",
      "Disjoint Set (Union-Find)",
      "Suffix Trees and Arrays"
    ]
  },
  {
    name: "Complex Data Structures",
    description: "Understand data structures used in databases and indexing.",
    difficulty: "Advanced",
    subtopics: [
      "B/B+ Trees",
      "Skip List",
      "ISAM",
      "2-3 Trees"
    ]
  },
  {
    name: "Indexing",
    description: "Learn about data indexing methods.",
    difficulty: "Advanced",
    subtopics: [
      "Linear Indexing",
      "Tree-Based Indexing"
    ]
  },
  {
    name: "Problem Solving Techniques",
    description: "Develop strategies to tackle algorithmic problems.",
    difficulty: "Advanced",
    subtopics: [
      "Brute Force",
      "Greedy Algorithms",
      "Divide and Conquer",
      "Dynamic Programming",
      "Backtracking",
      "Randomized Algorithms",
      "Recursion",
      "Two Pointer Technique",
      "Sliding Window Technique"
    ]
  },
   {
    name: "Greedy Algorithms",
    description: "Algorithms that make locally optimal choices.",
    difficulty: "Intermediate",
    subtopics: ["Activity Selection", "Huffman Encoding", "Job Sequencing", "Greedy Choice Property"]
  },
  {
    name: "Recursion & Backtracking",
    description: "Solving problems via recursion and undoing choices.",
    difficulty: "Advanced",
    subtopics: ["Recursion Basics", "N-Queens", "Sudoku Solver", "Subsets/Permutations"]
  }
];
const topicsContainer = document.getElementById("topics");
const progressBar = document.getElementById("progress");

function saveProgress(progress) {
  localStorage.setItem("dsaProgress", JSON.stringify(progress));
}

function loadProgress() {
  const saved = localStorage.getItem("dsaProgress");
  if (!saved) return {};
  try {
    return JSON.parse(saved);
  } catch {
    return {};
  }
}

function updateProgressBar(progress) {
  let total = 0, done = 0;
  topics.forEach((topic, i) => {
    total++;
    if (progress[i]?.main) done++;
    topic.subtopics.forEach((_, j) => {
      total++;
      if (progress[i]?.subtopics?.[j]) done++;
    });
  });
  const percent = total === 0 ? 0 : (done / total) * 100;
  progressBar.style.width = percent + "%";
}

function onMainCheckboxChange(topicIndex, checked, progress) {
  progress[topicIndex] = progress[topicIndex] || { main: false, subtopics: [] };
  progress[topicIndex].main = checked;
  progress[topicIndex].subtopics = topics[topicIndex].subtopics.map(() => checked);
  saveProgress(progress);
  renderTopics(document.getElementById("difficultyFilter").value, progress);
  updateProgressBar(progress);
}

function onSubtopicCheckboxChange(topicIndex, subIndex, checked, progress) {
  const topicName = topics[topicIndex].name;
  progress[topicIndex] = progress[topicIndex] || { main: false, subtopics: [] };

  if (topicName === "Pick a Language" || topicName === "Platforms for Practice") {
    // Ensure only one subtopic is selected at a time
    progress[topicIndex].subtopics = topics[topicIndex].subtopics.map((_, i) => i === subIndex ? checked : false);
    
    // If a subtopic is checked, mark the main topic as checked too
    progress[topicIndex].main = checked;
  } else {
    // Standard behavior for other topics
    progress[topicIndex].subtopics[subIndex] = checked;
    const allChecked = topics[topicIndex].subtopics.every((_, i) => progress[topicIndex].subtopics[i]);
    progress[topicIndex].main = allChecked;
  }

  saveProgress(progress);
  renderTopics(document.getElementById("difficultyFilter").value, progress);
  updateProgressBar(progress);
}


function resetProgress() {
  localStorage.removeItem("dsaProgress");
  renderTopics(document.getElementById("difficultyFilter").value, {});
  updateProgressBar({});
}

function renderTopics(filter = "All", progress = {}) {
  topicsContainer.innerHTML = "";
  topics.forEach((topicObj, topicIndex) => {
    if (filter !== "All" && topicObj.difficulty !== filter) return;

    const div = document.createElement("div");
    div.className = "topic";

    const header = document.createElement("div");
    header.className = "topic-header";

    const mainCheckbox = document.createElement("input");
    mainCheckbox.type = "checkbox";
    mainCheckbox.checked = progress[topicIndex]?.main || false;
    mainCheckbox.addEventListener("change", e => {
      onMainCheckboxChange(topicIndex, e.target.checked, progress);
    });

    const label = document.createElement("label");
    label.textContent = `${topicObj.name} (${topicObj.difficulty})`;

    header.appendChild(mainCheckbox);
    header.appendChild(label);

    const description = document.createElement("div");
    description.className = "description";
    description.textContent = topicObj.description;

    const subtopicList = document.createElement("ul");
    subtopicList.className = "subtopics";

    topicObj.subtopics.forEach((subtopic, subIndex) => {
      const li = document.createElement("li");
      const subCheckbox = document.createElement("input");
      subCheckbox.type = "checkbox";
      subCheckbox.checked = progress[topicIndex]?.subtopics?.[subIndex] || false;
      subCheckbox.addEventListener("change", e => {
        onSubtopicCheckboxChange(topicIndex, subIndex, e.target.checked, progress);
      });

      const subLabel = document.createElement("label");
      subLabel.textContent = subtopic;

      li.appendChild(subCheckbox);
      li.appendChild(subLabel);
      subtopicList.appendChild(li);
    });

    div.appendChild(header);
    div.appendChild(description);
    div.appendChild(subtopicList);

    topicsContainer.appendChild(div);
  });
}

function filterTopics() {
  const filter = document.getElementById("difficultyFilter").value;
  const progress = loadProgress();
  renderTopics(filter, progress);
  updateProgressBar(progress);
}

function toggleTheme() {
  const body = document.body;
  const isLight = body.classList.toggle("light");
  localStorage.setItem("dsaTheme", isLight ? "light" : "dark");
  updateThemeIcon();
}

function applySavedTheme() {
  const theme = localStorage.getItem("dsaTheme") || "dark";
  document.body.classList.toggle("light", theme === "light");
  updateThemeIcon();
}

function updateThemeIcon() {
  const icon = document.getElementById("themeIcon");
  const isLight = document.body.classList.contains("light");
  icon.textContent = isLight ? "🌞" : "🌙";
}

window.addEventListener("load", () => {
  applySavedTheme();
  const progress = loadProgress();
  renderTopics("All", progress);
  updateProgressBar(progress);
});
