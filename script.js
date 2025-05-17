const topics = [
      {
        name: "Arrays",
        description: "Collection of items stored at contiguous memory locations.",
        difficulty: "Easy",
        subtopics: ["Traversal", "Insertion", "Deletion", "Searching", "Sorting"]
      },
      {
        name: "Strings",
        description: "Sequence of characters used to represent text.",
        difficulty: "Easy",
        subtopics: ["Reversal", "Palindrome Check", "Pattern Matching", "String Compression"]
      },
      {
        name: "Linked Lists",
        description: "Linear data structure where elements point to the next.",
        difficulty: "Medium",
        subtopics: ["Singly Linked List", "Doubly Linked List", "Circular Linked List", "Reversal"]
      },
      {
        name: "Stacks & Queues",
        description: "LIFO and FIFO data structures for storing and managing data.",
        difficulty: "Medium",
        subtopics: ["Stack using Arrays", "Queue using Arrays", "Stack using Linked List", "Queue using Linked List"]
      },
      {
        name: "Trees",
        description: "Hierarchical data structure with a root node.",
        difficulty: "Medium",
        subtopics: ["Binary Tree", "Binary Search Tree", "Traversals", "Balanced Trees"]
      },
      {
        name: "Graphs",
        description: "Set of nodes connected by edges.",
        difficulty: "Hard",
        subtopics: ["BFS", "DFS", "Cycle Detection", "Shortest Path (Dijkstra, Bellman-Ford)"]
      },
      {
        name: "Dynamic Programming",
        description: "Solves problems by breaking into overlapping subproblems.",
        difficulty: "Hard",
        subtopics: ["Memoization", "Tabulation", "Knapsack", "Longest Common Subsequence"]
      },
      {
        name: "Greedy Algorithms",
        description: "Algorithms that make locally optimal choices.",
        difficulty: "Medium",
        subtopics: ["Activity Selection", "Huffman Encoding", "Job Sequencing", "Greedy Choice Property"]
      },
      {
        name: "Recursion & Backtracking",
        description: "Solving problems via recursion and undoing choices.",
        difficulty: "Hard",
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
      progress[topicIndex] = progress[topicIndex] || { main: false, subtopics: [] };
      progress[topicIndex].subtopics[subIndex] = checked;
      const allChecked = topics[topicIndex].subtopics.every((_, i) => progress[topicIndex].subtopics[i]);
      progress[topicIndex].main = allChecked;
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