const { useEffect, useMemo, useRef, useState } = React;
const {
  COMMUNITY_STORIES,
  COMMUNITY_PEOPLE,
  DiscoverScreen,
  StoryDetailScreen,
  GardenScreen,
  ShareCardScreen
} = window.MulanCommunity;

const TOPICS = {
  craft: {
    label: "工作与手艺",
    icon: "briefcase",
    questions: [
      "最近有什么事，别人觉得难，你却把它做成了？",
      "当时，你最先注意到了什么？",
      "你怎么知道下一步应该这样做？",
      "如果换一个人来做，最容易忽略什么？"
    ],
    examples: [
      "我看了一遍图纸，就照着把零件做出来了。",
      "我先看几个部件怎么连接，再在脑子里想它装起来的样子。",
      "我会先找最关键的尺寸，从那个地方往外推，顺序就清楚了。",
      "很多人只看线条，容易忽略装配顺序和哪个位置最容易卡住。"
    ],
    title: "你能把复杂的事，看懂、拆开，再变成现实",
    detail: "你不是简单地记住图纸，而是先抓住结构关系，在脑中预演步骤，并提前判断哪里容易出错。",
    qualities: ["观察力", "结构思考", "行动力", "空间想象", "错误预判"],
    palette: ["#8f1d2c", "#fff8f2", "#edc4c5", "#425e50"]
  },
  body: {
    label: "身体与生活",
    icon: "heart",
    questions: [
      "你曾经怎样为自己的身体做过一次主动选择？",
      "你最先发现了身体的什么变化？",
      "你怎样一点点找到适合自己的节奏？",
      "后来为什么有人愿意跟着你一起做？"
    ],
    examples: [
      "身体不舒服以后，我决定从慢跑开始，让生活重新有一点节奏。",
      "我发现不是越快越好，第二天的感觉会告诉我昨天是不是太多了。",
      "我会根据睡眠和疲劳调整距离，不跟别人比，只看自己能不能稳定。",
      "我从不催大家，只是把我的记录发出来，慢慢就有人来问能不能一起。"
    ],
    title: "你会听见身体，也会把自己的改变变成大家的力量",
    detail: "你从细小感受中判断节奏，用持续行动验证方法，再用真实改变带动身边的人。",
    qualities: ["身体觉察", "自我调节", "持续行动", "希望感", "带动力"],
    palette: ["#7f2f37", "#fff8f2", "#efc7bd", "#486658"]
  },
  style: {
    label: "审美与表达",
    icon: "palette",
    questions: [
      "最近哪一次搭配，让你觉得这很像自己？",
      "你在挑选时最先看什么？",
      "预算、场合和舒适度冲突时，你怎么取舍？",
      "别人从你的搭配里，会认识一个怎样的你？"
    ],
    examples: [
      "我用一件很普通的旧外套，搭出了朋友都说很精神的一套。",
      "我先看颜色是不是衬气色，再看工作的时候行动方不方便。",
      "我会把钱花在最常穿的那一件上，其他用旧衣服重新组合。",
      "他们会觉得我很利落，但又有一点自己的颜色，不会人云亦云。"
    ],
    title: "你会在限制里做选择，也会把自己穿出来",
    detail: "你同时理解颜色、场合、预算和身体感受，并把这些限制重新组合成独特表达。",
    qualities: ["审美判断", "资源组合", "情境感知", "创造力", "自我表达"],
    palette: ["#823c59", "#fff9f5", "#e9c7d7", "#4d6259"]
  },
  influence: {
    label: "带动他人",
    icon: "people",
    questions: [
      "有没有一件事，原本只有你在做，后来大家也加入了？",
      "你最先看见了大家的什么需要？",
      "你做了什么，让别人愿意迈出第一步？",
      "这件事最后给身边的人带来了什么变化？"
    ],
    examples: [
      "我先自己做了一段时间，后来把方法整理给身边的姐妹。",
      "我发现大家不是不想改变，而是不知道怎么开始，也怕做不好。",
      "我把第一步变得很小，还会陪第一次来的人一起做。",
      "后来大家会彼此提醒和分享经验，不再觉得只能一个人扛。"
    ],
    title: "你不只是自己向前，也会让别人更容易迈出第一步",
    detail: "你能看见他人的顾虑，把行动拆得足够小，并用陪伴和示范建立信任。",
    qualities: ["共情力", "行动设计", "信任感", "组织力", "影响力"],
    palette: ["#8a272f", "#fff8f1", "#efc9c0", "#3f685b"]
  }
};

const FLOW = ["选择一件小事", "讲清怎么做到", "生成专属木兰", "汇入木兰花海"];
const ROUTE_SCREENS = new Set(["discover", "home", "interview", "revealing", "result", "share", "garden", "detail", "profile", "sea"]);

function getInitialScreen() {
  const route = window.location.hash.replace(/^#/, "");
  return ROUTE_SCREENS.has(route) ? route : "discover";
}

function getAnswerFocus(answer) {
  const clean = String(answer || "")
    .replace(/[“”‘’"']/g, "")
    .replace(/[。！？!?；;，,]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!clean) return "这件事";
  const firstThought = clean.split(" ").find((part) => part.length >= 4) || clean;
  return firstThought.length > 16 ? `${firstThought.slice(0, 16)}…` : firstThought;
}

function buildFollowUp(answer, round) {
  const text = String(answer || "").trim();
  const focus = getAnswerFocus(text);

  if (/别人|大家|一起|姐妹|朋友|同事|带着|跟着/.test(text)) {
    return `你提到“${focus}”。别人为什么愿意相信你、跟着你一起做？`;
  }
  if (/发现|注意|看见|看到|感觉|身体|意识/.test(text)) {
    return `你注意到“${focus}”时，哪个细小的迹象最先提醒了你？`;
  }
  if (/先|首先|第一|开始|起初/.test(text)) {
    return `你说自己先做了“${focus}”。你为什么会把它放在第一步？`;
  }
  if (/难|失败|问题|卡住|出错|不顺|放弃/.test(text)) {
    return `“${focus}”最难的那个时候，你靠什么判断下一步怎么办？`;
  }

  const prompts = [
    `如果把“${focus}”慢慢拆开，你真正做对的关键一步是什么？`,
    `做“${focus}”时，有没有一个别人不容易发现、但你很在意的细节？`,
    `当时没有人告诉你答案，你是怎么一点点试出来的？`,
    `现在回头看，这种做法还在哪些事情上帮过你？`,
    `如果把这份经验教给另一个人，你最想提醒她什么？`,
    `还有哪个细节，是别人没问过、但你觉得很重要的？`
  ];
  return prompts[Math.max(0, round - 1) % prompts.length];
}

function getExampleAnswer(topic, round) {
  if (round < topic.examples.length) return topic.examples[round];
  const extras = [
    "后来我发现，我不是碰巧做成，而是每次都会先抓住最关键的地方。",
    "别人可能只看到结果，但我在过程中会不断观察，再根据变化调整。",
    "如果教给别人，我会先让她从最小的一步开始，这样更容易坚持。"
  ];
  return extras[(round - topic.examples.length) % extras.length];
}

function isClosingAnswer(answer) {
  return /没什么(想说|可说|了)|没有了|说完了|想不到了|先到这里|就这些|差不多了/.test(String(answer || ""));
}

function Icon({ name, size = 20, strokeWidth = 1.8 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true
  };
  const paths = {
    arrow: <><path d="m15 18-6-6 6-6" /></>,
    next: <><path d="m9 18 6-6-6-6" /></>,
    mic: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3M9 21h6" /></>,
    volume: <><path d="M11 5 6 9H2v6h4l5 4Z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" /></>,
    stop: <><rect x="7" y="7" width="10" height="10" rx="2" /></>,
    lock: <><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="12" rx="2" /><path d="M8 7V5h8v2M3 12h18M10 12v2h4v-2" /></>,
    heart: <><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" /></>,
    palette: <><path d="M12 3a9 9 0 0 0 0 18h1.6a2.4 2.4 0 0 0 0-4.8h-1a1.7 1.7 0 0 1 0-3.4H15A6 6 0 0 0 15 3Z" /><path d="M7.5 9h.01M9.5 6.5h.01M13 6h.01" /></>,
    people: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    play: <><path d="m8 5 11 7-11 7Z" fill="currentColor" stroke="none" /></>,
    pause: <><path d="M9 5v14M15 5v14" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
    tune: <><path d="M4 7h10M18 7h2M4 17h2M10 17h10M14 4v6M8 14v6" /></>,
    eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="2.5" /></>,
    spark: <><path d="m12 3 1.2 4.8L18 9l-4.8 1.2L12 15l-1.2-4.8L6 9l4.8-1.2Z" /><path d="m18 15 .7 2.3L21 18l-2.3.7L18 21l-.7-2.3L15 18l2.3-.7Z" /></>,
    leaf: <><path d="M20 4C12 4 5 9 5 16c0 2 1 4 3 5 0-6 4-10 10-13-5 4-8 8-8 13" /></>,
    share: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4" /></>,
    reset: <><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></>,
    story: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5Z" /><path d="M4 5.5v15M8 7h8M8 11h7" /></>,
    garden: <><path d="M12 21V10" /><path d="M12 14c-4 0-7-2.5-7-6 4 0 7 2.5 7 6ZM12 11c4 0 7-2.5 7-6-4 0-7 2.5-7 6Z" /><path d="M5 21h14" /></>,
    save: <><path d="M12 3v12M7 10l5 5 5-5" /><path d="M5 19h14" /></>
  };
  return <svg {...common}>{paths[name] || paths.spark}</svg>;
}

function Magnolia({ bloom = 1, size = 210, palette, glow = true, id = "main" }) {
  const growth = Math.max(0.18, Math.min(1, bloom));
  return (
    <div
      className={`magnolia-photo ${glow ? "glow" : ""}`}
      style={{
        width: `${size}px`,
        height: `${size * 1.08}px`,
        "--magnolia-scale": 0.8 + growth * 0.2,
        "--magnolia-opacity": 0.5 + growth * 0.5,
        "--magnolia-rise": `${(1 - growth) * 10}px`
      }}
      role="img"
      aria-label="随故事绽放的木兰花"
    >
      <img src="assets/magnolia-real.png" alt="" draggable="false" />
    </div>
  );
}

function AmbientBranch({ className, palette }) {
  return (
    <div className={`ambient-branch ${className}`} aria-hidden="true">
      <Magnolia bloom={0.94} size={390} palette={palette} glow={false} id={`${className}-ambient`} />
    </div>
  );
}

function Waveform({ active = false, bars = 24 }) {
  return <div className={`waveform ${active ? "active" : ""}`}>{Array.from({ length: bars }, (_, i) => <i key={i}></i>)}</div>;
}

function StatusBar() {
  return (
    <div className="status-bar">
      <span>9:41</span>
      <div className="status-icons"><span>●●●</span><i></i></div>
    </div>
  );
}

function ScreenTop({ title, onBack, action }) {
  return (
    <div className="screen-top">
      {onBack ? <button className="icon-button" onClick={onBack} aria-label="返回"><Icon name="arrow" /></button> : <span></span>}
      <h2>{title}</h2>
      {action || <span></span>}
    </div>
  );
}

function HomeScreen({ selected, setSelected, onStart, onBack, palette, glow, motion }) {
  return (
    <section className="screen home-screen" data-screen-label="01 首页" data-motion={motion}>
      <div className="home-nav">
        <button className="icon-button" onClick={onBack} aria-label="返回故事页"><Icon name="arrow" /></button>
        <div className="home-brand">
          <svg className="brand-mark" viewBox="0 0 40 40" aria-hidden="true">
            <path d="M20 32C7 27 8 12 20 5c12 7 13 22 0 27Z" fill={palette[2]} stroke={palette[0]} />
            <path d="M20 31V13" stroke={palette[0]} strokeWidth="1.8" />
          </svg>
          <span>雁过有声</span>
        </div>
        <span></span>
      </div>
      <div className="home-copy">
        <h2>发现你的<br />木兰时刻</h2>
        <p>每一件做成的小事，<br />都藏着你的力量</p>
      </div>
      <div className="home-flower">
        <Magnolia bloom={0.22} size={190} palette={palette} glow={glow} id="home" />
      </div>
      <div className="topic-grid" role="radiogroup" aria-label="选择讲述主题">
        {Object.entries(TOPICS).map(([key, topic]) => (
          <button
            key={key}
            className={`topic-card ${selected === key ? "selected" : ""}`}
            onClick={() => setSelected(key)}
            role="radio"
            aria-checked={selected === key}
          >
            <Icon name={topic.icon} />
            <span>{topic.label}</span>
          </button>
        ))}
      </div>
      <button className="primary-button" onClick={onStart}>
        <Icon name="mic" />
        <span>开始语音对话</span>
      </button>
      <p className="privacy-note"><Icon name="lock" />不设题数，想说到哪里都由你决定</p>
    </section>
  );
}

function InterviewScreen({ topicKey, questions, questionIndex, answers, setAnswers, onBack, onNext, onFinish, palette, glow, motion, audioUrl, setAudioUrl, showToast }) {
  const topic = TOPICS[topicKey];
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [agentSpeaking, setAgentSpeaking] = useState(false);
  const [processing, setProcessing] = useState(false);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);
  const recognitionRef = useRef(null);
  const transcriptRef = useRef("");
  const utteranceRef = useRef(null);
  const finalizeTimerRef = useRef(null);
  const currentAnswer = answers[questionIndex] || "";
  const currentQuestion = questions[questionIndex] || topic.questions[0];
  const answeredRounds = answers.filter((answer) => answer && answer.trim()).length;
  const bloom = Math.min(1, 0.22 + (answeredRounds + (currentAnswer ? 0.6 : 0)) * 0.11);

  useEffect(() => {
    if (!recording) return undefined;
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [recording]);

  const updateAnswer = (value) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[questionIndex] = value;
      return next;
    });
  };

  const speakQuestion = () => {
    if (!("speechSynthesis" in window)) {
      showToast("当前浏览器没有语音朗读能力");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentQuestion);
    const voices = window.speechSynthesis.getVoices();
    const chineseVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith("zh-cn"))
      || voices.find((voice) => voice.lang.toLowerCase().startsWith("zh"));
    if (chineseVoice) utterance.voice = chineseVoice;
    utterance.lang = "zh-CN";
    utterance.rate = 0.92;
    utterance.pitch = 1.04;
    utterance.onstart = () => setAgentSpeaking(true);
    utterance.onend = () => setAgentSpeaking(false);
    utterance.onerror = () => setAgentSpeaking(false);
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const timer = window.setTimeout(speakQuestion, 420);
    return () => {
      window.clearTimeout(timer);
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
      setAgentSpeaking(false);
    };
  }, [currentQuestion]);

  useEffect(() => () => {
    window.clearTimeout(finalizeTimerRef.current);
    if (recognitionRef.current) recognitionRef.current.abort();
    if (streamRef.current) streamRef.current.getTracks().forEach((track) => track.stop());
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }, []);

  const stopRecording = () => {
    const recorder = recorderRef.current;
    if (recorder && recorder.state === "recording") recorder.stop();
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
    }
    if (streamRef.current) streamRef.current.getTracks().forEach((track) => track.stop());
    setRecording(false);
    setProcessing(true);
    window.clearTimeout(finalizeTimerRef.current);
    finalizeTimerRef.current = window.setTimeout(() => {
      const spokenAnswer = transcriptRef.current.trim() || getExampleAnswer(topic, questionIndex);
      updateAnswer(spokenAnswer);
      setProcessing(false);
      onNext(spokenAnswer);
    }, 650);
  };

  const startRecording = async () => {
    if (recording) {
      stopRecording();
      return;
    }
    if (processing) return;
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setAgentSpeaking(false);
    setSeconds(0);
    chunksRef.current = [];
    transcriptRef.current = "";
    updateAnswer("");

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.lang = "zh-CN";
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.onresult = (event) => {
          let transcript = "";
          for (let index = 0; index < event.results.length; index += 1) {
            transcript += event.results[index][0].transcript;
          }
          transcriptRef.current = transcript.trim();
          updateAnswer(transcriptRef.current);
        };
        recognition.onerror = (event) => {
          if (event.error !== "aborted" && event.error !== "no-speech") {
            showToast("语音识别暂时不可用，本轮将使用演示回答");
          }
        };
        recognition.start();
      } catch {
        recognitionRef.current = null;
      }
    }

    try {
      if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) throw new Error("unsupported");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;
      recorder.ondataavailable = (event) => {
        if (event.data.size) chunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        if (!chunksRef.current.length) return;
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        setAudioUrl(URL.createObjectURL(blob));
      };
      recorder.start();
    } catch {
      showToast("当前浏览器未开放麦克风，已切换为演示录音");
    }
    setRecording(true);
  };

  return (
    <section className="screen voice-interview-screen" data-screen-label={`02 语音访谈第${questionIndex + 1}轮`} data-motion={motion} aria-label={`第${questionIndex + 1}轮语音访谈`}>
      <ScreenTop title="木兰语音访谈" onBack={onBack} />
      <div className={`agent-voice-card ${agentSpeaking ? "speaking" : ""}`} aria-label={`木兰的问题：${currentQuestion}`}>
        <div className="agent-voice-orb"><Icon name="volume" /></div>
        <div className="agent-voice-copy">
          <span>木兰正在陪你聊</span>
          <strong>{agentSpeaking ? "正在和你说话…" : "问题已经播放"}</strong>
        </div>
        <button className="replay-question" onClick={speakQuestion} disabled={recording || processing} aria-label="重新播放问题">
          <Icon name="volume" />
          <span>重听</span>
        </button>
      </div>
      <div className="listening-flower">
        <div className={`listening-rings ${recording || agentSpeaking ? "recording" : ""}`}></div>
        <Magnolia bloom={Math.min(bloom, 0.88)} size={160} palette={palette} glow={glow} id={`interview-${questionIndex}`} />
      </div>
      <div className={`voice-turn ${recording ? "recording" : ""} ${processing ? "processing" : ""}`}>
        <Waveform active={recording || processing} bars={24} />
        <p className="recording-hint">
          {recording
            ? `正在听你说 ${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")} · 再点一下结束`
            : processing
              ? "正在理解你的话，准备继续追问…"
              : "点一下开始讲述，不用按住"}
        </p>
        <button className={`voice-record-button ${recording ? "recording" : ""}`} onClick={startRecording} disabled={processing} aria-label={recording ? "点一下结束回答" : "点一下开始讲述"}>
          <Icon name={recording ? "stop" : "mic"} />
          <span>{recording ? "点一下结束" : "点一下讲述"}</span>
        </button>
      </div>
      <div className="interview-next">
        <button className="finish-interview" disabled={answeredRounds === 0 || recording || processing} onClick={onFinish}>
          <Icon name="leaf" />
          <span>我暂时没什么想说的了</span>
          <small>看看我的木兰花</small>
        </button>
      </div>
    </section>
  );
}

function RevealScreen({ topic, palette, glow, motion }) {
  return (
    <section className="screen reveal-screen" data-screen-label="03 价值显影中" data-motion={motion}>
      <Magnolia bloom={1} size={224} palette={palette} glow={glow} id="reveal" />
      <h2>正在显影你的思考</h2>
      <p>从经历里寻找反复出现的力量</p>
      <div className="reveal-track"><i></i></div>
    </section>
  );
}

function ResultScreen({ topic, palette, glow, motion, audioUrl, onConfirm, onAddGarden, onBack, showToast }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggleAudio = () => {
    if (!audioUrl) {
      showToast("这是一段演示原声波形");
      setPlaying((value) => !value);
      window.setTimeout(() => setPlaying(false), 1800);
      return;
    }
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
      setPlaying(true);
    } else {
      audioRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="screen result-screen" data-screen-label="04 专属木兰花" data-motion={motion}>
      <ScreenTop
        title="你的专属木兰花"
        onBack={onBack}
        action={<button className="ghost-button" onClick={onConfirm} aria-label="生成分享卡"><Icon name="share" /></button>}
      />
      <div className="result-flower-zone">
        {topic.qualities.map((quality, index) => (
          <span className="quality-chip" key={quality} style={{ animationDelay: `${0.08 * index}s` }}>
            <Icon name={index === 0 ? "eye" : index === 4 ? "people" : "spark"} />{quality}
          </span>
        ))}
        <Magnolia bloom={1} size={206} palette={palette} glow={glow} id="result" />
      </div>
      <article className="evidence-card">
        <p className="label">你的价值证据</p>
        <h3>{topic.title}</h3>
        <p>{topic.detail}</p>
        <div className="audio-strip">
          <button className="play-button" onClick={toggleAudio} aria-label={playing ? "暂停原声" : "播放原声"}><Icon name={playing ? "pause" : "play"} /></button>
          <Waveform active={playing} bars={18} />
          <span className="time">原声</span>
        </div>
        {audioUrl && <audio ref={audioRef} src={audioUrl} onEnded={() => setPlaying(false)}></audio>}
      </article>
      <div className="result-actions">
        <button className="primary-button" onClick={onConfirm}>生成分享卡</button>
        <button className="result-outline-button" onClick={onAddGarden}><Icon name="garden" />加入我的花海</button>
        <button className="quiet-action" onClick={onBack}>有一点不像，回去修改</button>
      </div>
    </section>
  );
}

const FIELD_FLOWERS = [
  [6, 59, 78, 0.83], [25, 49, 92, 0.96], [50, 53, 82, 0.78], [72, 45, 95, 0.92], [89, 58, 72, 0.7],
  [12, 74, 110, 0.9], [37, 68, 86, 0.75], [61, 71, 106, 0.88], [82, 72, 90, 0.84], [28, 84, 118, 0.96],
  [70, 86, 124, 0.9], [3, 88, 84, 0.7], [93, 89, 88, 0.76]
];

function FlowerSeaScreen({ topic, palette, glow, motion, onRestart, seaCount }) {
  return (
    <section className="screen sea-screen" data-screen-label="05 木兰花海" data-motion={motion}>
      <ScreenTop title="木兰花海" />
      <div className="sea-title">
        <h2>每一朵，<br />都值得被看见</h2>
        <p>不同的经历，开出不同的力量</p>
      </div>
      <div className="flower-field" aria-label="由每个人的故事组成的木兰花海">
        {FIELD_FLOWERS.map(([left, top, size, bloom], index) => (
          <div className="field-flower" key={index} style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${-index * 0.31}s` }}>
            <Magnolia bloom={bloom} size={size} palette={index % 3 === 0 ? TOPICS.style.palette : index % 2 === 0 ? TOPICS.body.palette : palette} glow={false} id={`field-${index}`} />
          </div>
        ))}
        <div className="field-flower mine" style={{ left: "41%", top: "52%" }}>
          <Magnolia bloom={1} size={138} palette={palette} glow={glow} id="mine" />
        </div>
        <div className="mine-label"><Icon name="spark" size={14} />这是我的木兰</div>
        <div className="sea-story one">她把陌生图纸，在脑中先装了一遍</div>
        <div className="sea-story two">她从照顾身体开始，带着大家一起行动</div>
        <div className="sea-story three">她在有限预算里，穿出了自己的颜色</div>
      </div>
      <div className="sea-bottom">
        <div className="sea-added">
          <svg className="mini-mark" viewBox="0 0 40 40" aria-hidden="true">
            <path d="M20 34C7 28 8 12 20 5c12 7 13 23 0 29Z" fill={palette[2]} stroke={palette[0]} />
            <path d="M20 33V12" stroke={palette[0]} strokeWidth="1.7" />
          </svg>
          <div><strong>你的木兰花已加入这片花海</strong><span>这里已有 {seaCount} 朵被看见的木兰</span></div>
        </div>
        <button className="primary-button" onClick={onRestart}><Icon name="reset" /><span>再讲一个故事</span></button>
      </div>
    </section>
  );
}

function App() {
  const [tweaks, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  const [screen, setScreen] = useState(getInitialScreen);
  const [topicKey, setTopicKey] = useState("craft");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([TOPICS.craft.questions[0]]);
  const [answers, setAnswers] = useState([""]);
  const [audioUrl, setAudioUrl] = useState("");
  const [toast, setToast] = useState("");
  const [seaCount, setSeaCount] = useState(() => Number(localStorage.getItem("mulan-sea-count") || 128));
  const [storyAdded, setStoryAdded] = useState(false);
  const [selectedStory, setSelectedStory] = useState(COMMUNITY_STORIES[0]);
  const [profilePersonId, setProfilePersonId] = useState("aqin");
  const topic = TOPICS[topicKey];
  const palette = topic.palette || tweaks.palette;
  const activePalette = tweaks.palette;
  const currentStory = useMemo(() => ({
    id: "my-current-story",
    personId: "me",
    name: "我",
    initials: "我",
    title: topic.title,
    excerpt: topic.detail,
    evidence: topic.detail,
    quote: "原来，这件我习以为常的小事，也藏着自己的办法和力量。",
    tags: topic.qualities,
    height: "tall",
    crop: "crop-a"
  }), [topic]);
  const myProfile = { id: "me", name: "我", initials: "我", intro: "我做成的事，正在这里慢慢开花。" };

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToast(""), 2200);
  };

  const navigateTo = (target, { replace = false } = {}) => {
    if (!ROUTE_SCREENS.has(target)) return;
    const currentDepth = Number(window.history.state?.mulanDepth || 0);
    const state = { mulanRoute: true, mulanDepth: replace ? currentDepth : currentDepth + 1, target };
    if (replace) window.history.replaceState(state, "", `#${target}`);
    else window.history.pushState(state, "", `#${target}`);
    setScreen(target);
  };

  const navigateBack = (fallback = "discover") => {
    const currentDepth = Number(window.history.state?.mulanDepth || 0);
    if (window.history.state?.mulanRoute && currentDepth > 0) window.history.back();
    else navigateTo(fallback, { replace: true });
  };

  useEffect(() => {
    const initial = getInitialScreen();
    window.history.replaceState({ mulanRoute: true, mulanDepth: 0, target: initial }, "", `#${initial}`);
    setScreen(initial);
    const handlePopState = (event) => {
      const route = event.state?.target || getInitialScreen();
      setScreen(ROUTE_SCREENS.has(route) ? route : "discover");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--mulan", activePalette[0]);
    document.documentElement.style.setProperty("--paper", activePalette[1]);
    document.documentElement.style.setProperty("--blush", activePalette[2]);
    document.documentElement.style.setProperty("--jade", activePalette[3]);
  }, [activePalette]);

  useEffect(() => () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
  }, [audioUrl]);

  const shellStyle = {
    "--accent": palette[0],
    "--canvas": palette[1],
    "--petal": palette[2],
    "--leaf": palette[3]
  };

  const start = () => {
    setQuestions([TOPICS[topicKey].questions[0]]);
    setAnswers([""]);
    setQuestionIndex(0);
    navigateTo("interview");
  };

  const nextQuestion = (spokenAnswer) => {
    const answer = String(spokenAnswer || answers[questionIndex] || "").trim();
    if (!answer) return;
    if (questionIndex > 0 && isClosingAnswer(answer)) {
      finishInterview();
      return;
    }
    const followUp = buildFollowUp(answer, questionIndex + 1);
    setQuestions((previous) => [...previous.slice(0, questionIndex + 1), followUp]);
    setAnswers((previous) => [...previous.slice(0, questionIndex + 1), ""]);
    setQuestionIndex((value) => value + 1);
  };

  const finishInterview = () => {
    if (!answers.some((answer) => answer && answer.trim())) {
      showToast("先和我讲一点，再为你生成木兰花");
      return;
    }
    navigateTo("revealing");
    window.setTimeout(() => navigateTo("result", { replace: true }), 1650);
  };

  const confirm = () => navigateTo("share");

  const addToGarden = () => {
    if (!storyAdded) {
      const next = seaCount + 1;
      setSeaCount(next);
      localStorage.setItem("mulan-sea-count", String(next));
      setStoryAdded(true);
      showToast("这朵木兰已加入你的花海");
    }
    navigateTo("garden");
  };

  const openStory = (story) => {
    setSelectedStory(story);
    navigateTo("detail");
  };

  const openProfile = (personId) => {
    if (personId === "me") {
      navigateTo("garden");
      return;
    }
    setProfilePersonId(personId);
    navigateTo("profile");
  };

  const navigate = (target) => navigateTo(target, { replace: true });
  const beginStory = () => navigateTo("home");

  const restart = () => {
    navigateTo("home");
    setQuestionIndex(0);
    setQuestions([TOPICS[topicKey].questions[0]]);
    setAnswers([""]);
  };

  const goBackFromInterview = () => {
    if (questionIndex > 0) setQuestionIndex((value) => value - 1);
    else navigateBack("home");
  };

  const openTweaks = () => window.postMessage({ type: "miaoda:tweaks:activate" }, "*");

  return (
    <main className="prototype-shell" style={shellStyle}>
      <AmbientBranch className="left" palette={palette} />
      <AmbientBranch className="right" palette={palette} />

      <section className="pitch-copy" aria-label="产品介绍">
        <p className="eyebrow">雁过有声 · 女性劳动者价值显影计划</p>
        <h1>让她做成的事，<em>被看见</em></h1>
        <p className="lead">AI不替你定义价值。它陪你回到一个真实瞬间，看见自己当时如何观察、判断并把事情做成。</p>
        <div className="flow-rail">
          {FLOW.map((item, index) => (
            <div className="flow-item" key={item}>
              <span className="index">0{index + 1}</span>
              <strong>{item}</strong>
              <Icon name="next" />
            </div>
          ))}
        </div>
      </section>

      <div className="phone-stage">
        <div className="phone">
          <div className="app-viewport">
            <StatusBar />
            {screen === "discover" && <DiscoverScreen onOpenStory={openStory} onOpenProfile={openProfile} onNavigate={navigate} onCreate={beginStory} Icon={Icon} Magnolia={Magnolia} palette={palette} motion={tweaks.motion} />}
            {screen === "home" && <HomeScreen selected={topicKey} setSelected={setTopicKey} onStart={start} onBack={() => navigateBack("discover")} palette={palette} glow={tweaks.petalGlow} motion={tweaks.motion} />}
            {screen === "interview" && (
              <InterviewScreen
                topicKey={topicKey}
                questions={questions}
                questionIndex={questionIndex}
                answers={answers}
                setAnswers={setAnswers}
                onBack={goBackFromInterview}
                onNext={nextQuestion}
                onFinish={finishInterview}
                palette={palette}
                glow={tweaks.petalGlow}
                motion={tweaks.motion}
                audioUrl={audioUrl}
                setAudioUrl={setAudioUrl}
                showToast={showToast}
              />
            )}
            {screen === "revealing" && <RevealScreen topic={topic} palette={palette} glow={tweaks.petalGlow} motion={tweaks.motion} />}
            {screen === "result" && <ResultScreen topic={topic} palette={palette} glow={tweaks.petalGlow} motion={tweaks.motion} audioUrl={audioUrl} onConfirm={confirm} onAddGarden={addToGarden} onBack={() => navigateBack("interview")} showToast={showToast} />}
            {screen === "share" && <ShareCardScreen topic={topic} onBack={() => navigateBack("result")} onAddGarden={addToGarden} ScreenTop={ScreenTop} Icon={Icon} Magnolia={Magnolia} Waveform={Waveform} palette={palette} glow={tweaks.petalGlow} showToast={showToast} motion={tweaks.motion} />}
            {screen === "garden" && <GardenScreen person={myProfile} isMine currentStory={currentStory} onOpenStory={openStory} onNavigate={navigate} onCreate={beginStory} ScreenTop={ScreenTop} Icon={Icon} Magnolia={Magnolia} palette={palette} glow={tweaks.petalGlow} motion={tweaks.motion} />}
            {screen === "detail" && <StoryDetailScreen story={selectedStory} onBack={() => navigateBack("discover")} onOpenProfile={openProfile} ScreenTop={ScreenTop} Icon={Icon} Magnolia={Magnolia} Waveform={Waveform} palette={palette} showToast={showToast} motion={tweaks.motion} />}
            {screen === "profile" && <GardenScreen person={COMMUNITY_PEOPLE[profilePersonId]} isMine={false} onBack={() => navigateBack("discover")} onOpenStory={openStory} ScreenTop={ScreenTop} Icon={Icon} Magnolia={Magnolia} palette={palette} glow={tweaks.petalGlow} motion={tweaks.motion} />}
            {screen === "sea" && <FlowerSeaScreen topic={topic} palette={palette} glow={tweaks.petalGlow} motion={tweaks.motion} onRestart={restart} seaCount={seaCount} />}
          </div>
        </div>
      </div>

      <aside className="side-notes" aria-label="设计说明">
        <article className="side-note">
          <p className="note-label">签名交互</p>
          <h3>故事越清楚，木兰开得越完整</h3>
          <p>每一轮追问不是收集更多字数，而是让一次行动背后的观察、判断与影响逐层显影。</p>
        </article>
        <article className="side-note">
          <p className="note-label">价值输出</p>
          <h3>一朵花，就是一份可认领的证据</h3>
          <p>花瓣对应真实故事中出现的能力。用户说“这是我”以后，这朵花才会进入花海。</p>
        </article>
        <button className="style-trigger" onClick={openTweaks}><Icon name="tune" /><span>调整视觉风格</span></button>
      </aside>

      <TweaksPanel title="风格">
        <TweakSection label="木兰色系" />
        <TweakColor
          label="配色"
          value={tweaks.palette}
          options={[
            ["#8f1d2c", "#fff8f2", "#edc4c5", "#425e50"],
            ["#9e4337", "#fff9f1", "#f0c6b4", "#4a6754"],
            ["#6f3454", "#fff8fa", "#e8c7d8", "#405f62"]
          ]}
          onChange={(value) => setTweak("palette", value)}
        />
        <TweakSection label="动效" />
        <TweakToggle label="花瓣微光" value={tweaks.petalGlow} onChange={(value) => setTweak("petalGlow", value)} />
        <TweakRadio label="页面过渡" value={tweaks.motion} options={["柔和", "克制"]} onChange={(value) => setTweak("motion", value)} />
      </TweaksPanel>

      {toast && <div className="toast" role="status">{toast}</div>}
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
