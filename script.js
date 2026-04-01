  var burgerBtn = document.getElementById('burgerBtn');
    var mobileMenu = document.getElementById('mobileMenu');
    var mobileClose = document.getElementById('mobileClose');

    burgerBtn.onclick = function () {
      mobileMenu.classList.add('open');
    };

    mobileClose.onclick = function () {
      mobileMenu.classList.remove('open');
    };

    document.querySelectorAll('.mobile-link').forEach(function (link) {
      link.onclick = function () {
        mobileMenu.classList.remove('open');
      };
    });

    var scrollObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.querySelectorAll('.counter').forEach(function (el) {
              animateNumber(el, 0, parseInt(el.dataset.to), 1500);
            });
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    document.querySelectorAll('.scroll-animate').forEach(function (el) {
      scrollObserver.observe(el);
    });

    function animateNumber(el, start, end, duration) {
      var startTime = performance.now();

      function update(currentTime) {
        var elapsed = currentTime - startTime;
        var progress = Math.min(elapsed / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var value = Math.round(start + (end - start) * eased);
        el.textContent = value + '+';
        if (progress < 1) requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
    }

    (function buildContribGraph() {
      var container = document.getElementById('contribGraph');
      var levels = [
        '#21262d',
        'rgba(77,139,245,0.15)',
        'rgba(77,139,245,0.3)',
        'rgba(77,139,245,0.55)',
        'rgba(77,139,245,0.8)',
      ];

      for (var week = 0; week < 38; week++) {
        var col = document.createElement('div');
        col.style.display = 'flex';
        col.style.flexDirection = 'column';
        col.style.gap = '2px';

        for (var day = 0; day < 7; day++) {
          var cell = document.createElement('div');
          cell.className = 'contrib-cell';
          var rand = Math.random();
          var level;
          if (rand < 0.3) level = 0;
          else if (rand < 0.55) level = 1;
          else if (rand < 0.75) level = 2;
          else if (rand < 0.9) level = 3;
          else level = 4;
          cell.style.background = level === 0 ? levels[0] : levels[level];
          col.appendChild(cell);
        }
        container.appendChild(col);
      }
    })();

    var terminalOutput = document.getElementById('terminalOutput');
    var terminalInput = document.getElementById('terminalInput');
    var terminalBody = document.getElementById('terminalBody');

    var neofetchText =
      '<span class="t-blue">        ╱╲         </span><span class="t-secondary">azimjon@portfolio</span>\n' +
      '<span class="t-blue">       ╱  ╲        </span><span class="t-muted">──────────────────</span>\n' +
      '<span class="t-blue">      ╱    ╲       </span><span>OS:</span><span class="t-secondary"> Portfolio v2.0</span>\n' +
      '<span class="t-blue">     ╱  /\\  ╲      </span><span>Role:</span><span class="t-secondary"> AI Engineer & Full-stack Dev</span>\n' +
      '<span class="t-blue">    ╱  /  \\  ╲     </span><span>University:</span><span class="t-secondary"> PDP University</span>\n' +
      '<span class="t-blue">   ╱  /    \\  ╲    </span><span>Stack:</span><span class="t-secondary"> Python, C++, FastAPI, TF, Docker</span>\n' +
      '<span class="t-blue">  ╱  /______\\  ╲   </span><span>Philosophy:</span><span class="t-secondary"> "Less is More"</span>\n' +
      '<span class="t-blue"> ╱______________╲  </span><span>Uptime:</span><span class="t-green"> Building since 2023</span>\n\n' +
      '<span class="t-muted">Type </span><span class="t-blue">\'help\'</span><span class="t-muted"> to see available commands.</span>';

    var terminalCommands = {
      help:
        '<span class="t-blue">Available commands:</span>\n' +
        '  <span>about</span>      <span class="t-muted">— Who is Azimjon?</span>\n' +
        '  <span>skills</span>     <span class="t-muted">— Technical proficiency</span>\n' +
        '  <span>education</span>  <span class="t-muted">— Academic background</span>\n' +
        '  <span>stack</span>      <span class="t-muted">— Current tech stack</span>\n' +
        '  <span>philosophy</span> <span class="t-muted">— Engineering mindset</span>\n' +
        '  <span>contact</span>    <span class="t-muted">— How to reach out</span>\n' +
        '  <span>ls</span>         <span class="t-muted">— List directory</span>\n' +
        '  <span>whoami</span>     <span class="t-muted">— Identity check</span>\n' +
        '  <span>clear</span>      <span class="t-muted">— Clear terminal</span>\n' +
        '  <span>neofetch</span>   <span class="t-muted">— System info</span>',

      about:
        '<span class="t-blue">Azimjon</span> <span class="t-muted">— AI Engineer & Full-stack Developer</span>\n\n' +
        'A systems thinker who builds at the intersection of artificial intelligence\n' +
        'and modern software architecture. Currently studying at <span>PDP University</span>,\n' +
        'focused on creating production-grade AI systems.\n\n' +
        'Not just writing code — designing architectures that scale,\n' +
        'training models that generalize, and building APIs that endure.',

      skills:
        '<span class="t-blue">Technical Proficiency:</span>\n\n' +
        '  <span>Python</span>       <span class="t-secondary">Daily Driver</span> — backend, ML, pipelines, async\n' +
        '  <span>C++</span>          <span class="t-secondary">Proficient</span> — memory mgmt, STL, competitive\n' +
        '  <span>FastAPI</span>      <span class="t-secondary">Daily Driver</span> — REST, Pydantic, OAuth2\n' +
        '  <span>TensorFlow</span>   <span class="t-secondary">Growing</span> — CNN, RNN, Transformers\n' +
        '  <span>PostgreSQL</span>   <span class="t-secondary">Proficient</span> — schema, JOINs, indexing\n' +
        '  <span>Docker</span>       <span class="t-secondary">Proficient</span> — builds, compose, CI/CD\n' +
        '  <span>Git</span>          <span class="t-secondary">Daily Driver</span> — GitFlow, rebase, monorepo',

      education:
        '<span class="t-blue">Education:</span>\n\n' +
        '  <span>PDP University</span>\n' +
        '     <span class="t-muted">AI & Software Engineering</span>\n' +
        '     <span class="t-secondary">2025 — Present</span>\n\n' +
        '  <span>Self-Directed Learning:</span>\n' +
        '     <span class="t-muted">• Deep Learning Specialization (Online)</span>\n' +
        '     <span class="t-muted">• Competitive Programming (Codeforces)</span>\n' +
        '     <span class="t-muted">• System Design (Books & Practice)</span>\n' +
        '     <span class="t-muted">• Open Source Contributions</span>',

      stack:
        '<span class="t-blue">Current Stack:</span>\n\n' +
        '  <span>Languages:</span>    <span class="t-secondary">Python, C++, SQL</span>\n' +
        '  <span>AI/ML:</span>        <span class="t-secondary">TensorFlow, Keras, Transformers, Scikit-learn</span>\n' +
        '  <span>Backend:</span>      <span class="t-secondary">FastAPI, Uvicorn, Pydantic</span>\n' +
        '  <span>Database:</span>     <span class="t-secondary">PostgreSQL, SQLAlchemy, Redis</span>\n' +
        '  <span>DevOps:</span>       <span class="t-secondary">Docker, Git, Linux, CI/CD</span>\n' +
        '  <span>Tools:</span>        <span class="t-secondary">VS Code, Postman, Jupyter, Valgrind</span>',

      philosophy:
        '<span class="t-blue">Engineering Philosophy:</span>\n\n' +
        '  <span class="t-muted">"Less is More"</span>  <span class="t-secondary">— Steve Jobs</span>\n' +
        '  <span class="t-muted">Every unnecessary line is a liability.</span>\n\n' +
        '  <span class="t-muted">"Move Fast with Stable Infrastructure"</span>  <span class="t-secondary">— Zuckerberg</span>\n' +
        '  <span class="t-muted">Speed without foundation is chaos.</span>\n\n' +
        '  <span>My approach:</span>\n' +
        '  <span class="t-muted">1. Understand the problem deeply before writing code</span>\n' +
        '  <span class="t-muted">2. Design the architecture, then implement</span>\n' +
        '  <span class="t-muted">3. Optimize for readability first, performance second</span>\n' +
        '  <span class="t-muted">4. Ship fast, but never compromise on quality</span>',

      contact:
        '<span class="t-blue">Contact:</span>\n\n' +
        '  <span>GitHub:</span>    <span class="t-blue">github.com/azimjon</span>\n' +
        '  <span>LinkedIn:</span>  <span class="t-blue">linkedin.com/in/azimjon</span>\n' +
        '  <span>Telegram:</span>  <span class="t-blue">t.me/azimjon</span>\n' +
        '  <span>Email:</span>     <span class="t-blue">azimjon@example.com</span>\n\n' +
        '  <span class="t-muted">Open to: internships, collaborations, interesting projects.</span>',

      ls:
        '<span>about.md</span>    <span>skills.json</span>  <span>projects/</span>    <span>contact.txt</span>\n' +
        '<span>journey.log</span>  <span>stack.yaml</span>   <span>philosophy.md</span>',

      whoami:
        '<span class="t-blue">azimjon</span> — a future systems architect, currently in training.\n' +
        '<span class="t-muted">Not just a student. Someone who thinks in systems.</span>',

      neofetch: neofetchText,
    };

    var neofetchLines = neofetchText.split('\n');
    var neofetchIndex = 0;

    function typeNeofetch() {
      if (neofetchIndex < neofetchLines.length) {
        var line = document.createElement('div');
        line.innerHTML = neofetchLines[neofetchIndex];
        line.style.whiteSpace = 'pre-wrap';
        terminalOutput.appendChild(line);
        neofetchIndex++;
        terminalBody.scrollTop = terminalBody.scrollHeight;
        setTimeout(typeNeofetch, 40);
      }
    }

    setTimeout(typeNeofetch, 500);

    terminalInput.onkeydown = function (e) {
      if (e.key !== 'Enter') return;

      var value = terminalInput.value.trim().toLowerCase();
      if (!value) return;

      var echoLine = document.createElement('div');
      echoLine.innerHTML =
        '<span class="t-green">azimjon@portfolio</span>' +
        '<span class="t-muted">:</span>' +
        '<span class="t-blue">~</span>' +
        '<span class="t-muted">$</span> <span>' + value + '</span>';
      terminalOutput.appendChild(echoLine);

      if (value === 'clear') {
        terminalOutput.innerHTML = '';
      } else if (terminalCommands[value]) {
        var response = document.createElement('div');
        response.innerHTML = terminalCommands[value];
        response.style.whiteSpace = 'pre-wrap';
        terminalOutput.appendChild(response);
      } else {
        var errorLine = document.createElement('div');
        errorLine.innerHTML =
          '<span class="t-red">zsh: command not found:</span> <span>' + value + '</span>\n' +
          '<span class="t-muted">Type \'help\' for available commands.</span>';
        terminalOutput.appendChild(errorLine);
      }

      terminalInput.value = '';
      terminalBody.scrollTop = terminalBody.scrollHeight;
    };

    document.querySelector('.terminal-body').onclick = function () {
      terminalInput.focus();
    };

    var sortArray = [];
    var isSorting = false;
    var comparisons = 0;
    var swaps = 0;
    var sortStartTime = 0;

    function getDelay() {
      return 201 - document.getElementById('speedSlider').value * 2;
    }

    function generateArray() {
      if (isSorting) return;

      var container = document.getElementById('sortContainer');
      container.innerHTML = '';
      sortArray = [];

      for (var i = 0; i < 50; i++) {
        sortArray.push(Math.floor(Math.random() * 200) + 20);
      }

      renderBars();
      resetStats();
    }

    function renderBars(highlights) {
      var container = document.getElementById('sortContainer');
      container.innerHTML = '';

      sortArray.forEach(function (value, index) {
        var bar = document.createElement('div');
        bar.className = 'sort-bar';
        bar.style.height = value + 'px';

        if (highlights) {
          if (highlights.comparing && highlights.comparing.indexOf(index) !== -1) {
            bar.classList.add('comparing');
          }
          if (highlights.swapping && highlights.swapping.indexOf(index) !== -1) {
            bar.classList.add('swapping');
          }
          if (highlights.sorted && highlights.sorted.indexOf(index) !== -1) {
            bar.classList.add('sorted');
          }
          if (highlights.pivot === index) {
            bar.classList.add('pivot');
          }
        }

        container.appendChild(bar);
      });
    }

    function resetStats() {
      comparisons = 0;
      swaps = 0;
      document.getElementById('statComparisons').textContent = '0';
      document.getElementById('statSwaps').textContent = '0';
      document.getElementById('statTime').textContent = '0ms';
    }

    function updateStats() {
      document.getElementById('statComparisons').textContent = comparisons;
      document.getElementById('statSwaps').textContent = swaps;
      document.getElementById('statTime').textContent =
        (performance.now() - sortStartTime).toFixed(0) + 'ms';
    }

    function sleep(ms) {
      return new Promise(function (resolve) {
        setTimeout(resolve, ms);
      });
    }

    function setSortingState(state) {
      isSorting = state;
      var buttonIds = ['btn-bubble', 'btn-selection', 'btn-insertion', 'btn-quick'];

      buttonIds.forEach(function (id) {
        var btn = document.getElementById(id);
        if (state) {
          btn.disabled = true;
          btn.style.opacity = '0.4';
          btn.style.pointerEvents = 'none';
        } else {
          btn.disabled = false;
          btn.style.opacity = '1';
          btn.style.pointerEvents = 'auto';
        }
      });
    }

    async function startSort(type) {
      if (isSorting) return;

      setSortingState(true);
      resetStats();
      sortStartTime = performance.now();

      var sorted = [];
      var delay = getDelay();

      if (type === 'bubble') {
        for (var i = 0; i < sortArray.length - 1; i++) {
          for (var j = 0; j < sortArray.length - 1 - i; j++) {
            comparisons++;
            renderBars({ comparing: [j, j + 1], sorted: sorted });
            updateStats();
            await sleep(delay);
            if (sortArray[j] > sortArray[j + 1]) {
              var temp = sortArray[j];
              sortArray[j] = sortArray[j + 1];
              sortArray[j + 1] = temp;
              swaps++;
              renderBars({ swapping: [j, j + 1], sorted: sorted });
              updateStats();
              await sleep(delay);
            }
          }
          sorted.push(sortArray.length - 1 - i);
        }
        sorted.push(0);
      }

      else if (type === 'selection') {
        for (var i = 0; i < sortArray.length - 1; i++) {
          var minIndex = i;
          for (var j = i + 1; j < sortArray.length; j++) {
            comparisons++;
            renderBars({ comparing: [minIndex, j], sorted: sorted });
            updateStats();
            await sleep(delay);
            if (sortArray[j] < sortArray[minIndex]) {
              minIndex = j;
            }
          }
          if (minIndex !== i) {
            var temp = sortArray[i];
            sortArray[i] = sortArray[minIndex];
            sortArray[minIndex] = temp;
            swaps++;
            renderBars({ swapping: [i, minIndex], sorted: sorted });
            updateStats();
            await sleep(delay);
          }
          sorted.push(i);
        }
        sorted.push(sortArray.length - 1);
      }

      else if (type === 'insertion') {
        sorted.push(0);
        for (var i = 1; i < sortArray.length; i++) {
          var key = sortArray[i];
          var j = i - 1;
          renderBars({ comparing: [i], sorted: sorted });
          updateStats();
          await sleep(delay);
          while (j >= 0 && sortArray[j] > key) {
            comparisons++;
            sortArray[j + 1] = sortArray[j];
            swaps++;
            renderBars({ swapping: [j, j + 1], sorted: sorted });
            updateStats();
            await sleep(delay);
            j--;
          }
          comparisons++;
          sortArray[j + 1] = key;
          sorted.push(i);
        }
      }

      else if (type === 'quick') {
        async function quickSort(low, high) {
          if (low < high) {
            var pivotIndex = await partition(low, high);
            sorted.push(pivotIndex);
            await quickSort(low, pivotIndex - 1);
            await quickSort(pivotIndex + 1, high);
          } else if (low === high) {
            sorted.push(low);
          }
        }

        async function partition(low, high) {
          var pivot = sortArray[high];
          var i = low - 1;
          for (var j = low; j < high; j++) {
            comparisons++;
            renderBars({ comparing: [j, high], pivot: high, sorted: sorted });
            updateStats();
            await sleep(delay);
            if (sortArray[j] < pivot) {
              i++;
              var temp = sortArray[i];
              sortArray[i] = sortArray[j];
              sortArray[j] = temp;
              swaps++;
              renderBars({ swapping: [i, j], pivot: high, sorted: sorted });
              updateStats();
              await sleep(delay);
            }
          }
          var temp = sortArray[i + 1];
          sortArray[i + 1] = sortArray[high];
          sortArray[high] = temp;
          swaps++;
          renderBars({ swapping: [i + 1, high], sorted: sorted });
          updateStats();
          await sleep(delay);
          return i + 1;
        }

        await quickSort(0, sortArray.length - 1);
      }

      for (var i = 0; i < sortArray.length; i++) {
        sorted.length = i + 1;
        renderBars({ sorted: sorted });
        await sleep(12);
      }

      updateStats();
      setSortingState(false);
    }

    generateArray();

    var chatOpen = false;
    var chatMessages = document.getElementById('chatMessages');
    var chatInput = document.getElementById('chatInput');

    function toggleChat() {
      chatOpen = !chatOpen;
      document.getElementById('chatPanel').classList.toggle('open', chatOpen);

      if (chatOpen && chatMessages.children.length === 0) {
        addBotMessage(
          "Salom! Men Azimjonning AI assistentiman. Savollaringizni bering — tajriba, texnologiyalar, yo'nalish yoki bog'lanish haqida."
        );
      }

      if (chatOpen) {
        setTimeout(function () {
          chatInput.focus();
        }, 300);
      }
    }

    function addBotMessage(text) {
      var wrapper = document.createElement('div');
      wrapper.className = 'chat-msg-bot';
      wrapper.innerHTML =
        '<div class="chat-msg-bot-avatar">AZ</div>' +
        '<div><p>' + text + '</p></div>';
      chatMessages.appendChild(wrapper);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addUserMessage(text) {
      var wrapper = document.createElement('div');
      wrapper.className = 'chat-msg-user';
      wrapper.innerHTML = '<div><p>' + text + '</p></div>';
      chatMessages.appendChild(wrapper);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTypingIndicator() {
      var wrapper = document.createElement('div');
      wrapper.id = 'typingIndicator';
      wrapper.className = 'chat-msg-bot';
      wrapper.innerHTML =
        '<div class="chat-msg-bot-avatar">AZ</div>' +
        '<div><div class="chat-typing-dots"><i></i><i></i><i></i></div></div>';
      chatMessages.appendChild(wrapper);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function hideTypingIndicator() {
      var el = document.getElementById('typingIndicator');
      if (el) el.remove();
    }

    var knowledgeBase = [
      {
        keywords: ['salom', 'hello', 'hi', 'hey', 'assalomu'],
        response: "Salom! Men Azimjonning AI assistentiman. Savollaringizni bering — tajriba, texnologiyalar, yo'nalish yoki bog'lanish haqida.",
      },
      {
        keywords: ['kim', 'who', 'about', 'haqida'],
        response: "Azimjon — AI Engineer va Full-stack Developer. PDP University talabasi, sun'iy intellekt va veb-texnologiyalar kesishmasida ishlaydi.",
      },
      {
        keywords: ['texnologiya', 'stack', 'technology', 'teknologiya'],
        response: "Asosiy stack: <b>Python</b> (asosiy til, ML, backend), <b>C++</b> (algoritmlar, xotira boshqaruvi), <b>FastAPI</b> (REST API), <b>TensorFlow</b> (deep learning), <b>PostgreSQL</b>, <b>Docker</b>, <b>Git</b>.",
      },
      {
        keywords: ['python'],
        response: "Python — asosiy dasturlash tili. Backend sistemalar, data pipeline'lar, ML model training va async dasturlash uchun ishlatadi. <b>Daily Driver</b>.",
      },
      {
        keywords: ['c++', 'cpp'],
        response: "C++ bo'yicha chuqur bilim: qo'lboshqaruvchi xotira, STL konteynerlar, pointers, competitive programming. <b>Proficient</b>.",
      },
      {
        keywords: ['ai', 'ml', 'suniy', 'machine', 'deep learning'],
        response: "AI/ML — hozirgi asosiy yo'nalish. TensorFlow bilan neural network arxitekturalar, model training va GPU optimization. Hozirda RAG va AI Agentlar ustida. <b>Growing</b>.",
      },
      {
        keywords: ['ta\'lim', 'o\'qish', 'university', 'universitet', 'pdp', 'education'],
        response: "PDP Universityda AI & Software Engineering yo'nalishida o'qiydi (2025-hozirgacha). Deep Learning Specialication o'tagan.",
      },
      {
        keywords: ['loyiha', 'project', 'projekt'],
        response: "AI-ga asoslangan backend sistemalar, FastAPI bilan REST API'lar, TensorFlow bilan ML modellar. GitHub'da ochiq loyihalar mavjud.",
      },
      {
        keywords: ['bog\'lanish', 'contact', 'aloqa', 'email', 'telegram'],
        response: "<b>GitHub</b>: github.com/azimjon, <b>LinkedIn</b>: linkedin.com/in/azimjon, <b>Telegram</b>: t.me/azimjon, <b>Email</b>: azimjon@example.com",
      },
      {
        keywords: ['tajriba', 'experience', 'yillar'],
        response: "2023-yildan faol dasturlash. Python bilan boshlagan, keyin C++ va algoritmlarga chuqur sho'ng'igan, hozir AI/ML engineeringga o'tdi.",
      },
      {
        keywords: ['kelajak', 'future', 'reja', 'plan'],
        response: "2025: AI/ML chuqurroq (Transformers, RAG, MLOps). 2026: Full-stack AI Systems Architecture — end-to-end applicationlar, open-source, jamoa yetakchilik.",
      },
      {
        keywords: ['fastapi', 'backend'],
        response: "FastAPI — asosiy backend framework. RESTful API dizayni, Pydantic validation, dependency injection, async endpointlar, OAuth2. <b>Daily Driver</b>.",
      },
      {
        keywords: ['docker', 'devops'],
        response: "Docker bilan multi-stage builds, Docker Compose, volume management, image optimization va CI/CD. <b>Proficient</b>.",
      },
      {
        keywords: ['algoritm', 'algorithm', 'sorting'],
        response: "Sorting (bubble, quick, merge, heap), searching (binary, DFS, BFS), dynamic programming, graph algorithms. 'Algorithm Lab' bo'limida ko'rishingiz mumkin!",
      },
      {
        keywords: ['rahmat', 'thanks', 'thank', 'tashakkur'],
        response: "Arzimaydi! Boshqa savollaringiz bo'lsa bemalol so'rang.",
      },
    ];

    function getResponse(input) {
      var lower = input.toLowerCase();

      for (var i = 0; i < knowledgeBase.length; i++) {
        for (var j = 0; j < knowledgeBase[i].keywords.length; j++) {
          if (lower.indexOf(knowledgeBase[i].keywords[j]) !== -1) {
            return knowledgeBase[i].response;
          }
        }
      }

      return "Kechirasiz, tushunolmadim. Mavzular: <b>kim azimjon</b>, <b>texnologiyalar</b>, <b>AI/ML</b>, <b>ta'lim</b>, <b>loyihalar</b>, <b>bog'lanish</b>, <b>kelajak</b>, <b>algoritmlar</b>.";
    }

    function sendMessage() {
      var text = chatInput.value.trim();
      if (!text) return;

      addUserMessage(text);
      chatInput.value = '';
      showTypingIndicator();

      var responseDelay = 500 + Math.random() * 700;
      setTimeout(function () {
        hideTypingIndicator();
        addBotMessage(getResponse(text));
      }, responseDelay);
    }

    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.navbar-link');

    window.addEventListener('scroll', function () {
      var current = '';
      sections.forEach(function (section) {
        if (window.scrollY >= section.offsetTop - 100) {
          current = section.id;
        }
      });
      navLinks.forEach(function (link) {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
      });
    });