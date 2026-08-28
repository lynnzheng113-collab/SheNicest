(() => {
const COMMUNITY_STORIES = [
  {
    id: "drawing-cabinet",
    personId: "aqin",
    name: "阿琴",
    initials: "琴",
    title: "我把一张图纸，变成了真的柜子",
    excerpt: "她先找关键尺寸，再在脑子里把装配顺序走一遍。",
    evidence: "第一次接触那张复杂图纸时，阿琴没有硬记每一根线。她先找到承重的位置和关键尺寸，再顺着连接关系把零件拆开。动手前，她已经在脑子里装过一次，也提前知道哪里最容易卡住。",
    quote: "看懂，不是把线条记住，是知道它们为什么连在一起。",
    tags: ["结构思考", "空间想象", "错误预判"],
    height: "tall",
    cover: "blueprint"
  },
  {
    id: "running-together",
    personId: "xiaomei",
    name: "小梅",
    initials: "梅",
    title: "生病以后，我带着大家一起跑起来",
    excerpt: "她先听身体的变化，再把第一步变得足够小。",
    evidence: "身体不舒服以后，小梅从慢跑十分钟开始。她用第二天的感受调整距离，不跟别人比快慢。姐妹们来问时，她不讲大道理，只陪第一次来的人把最短的一圈跑完。",
    quote: "我先把自己照顾好，再让想开始的人不必一个人。",
    tags: ["身体觉察", "持续行动", "带动力"],
    height: "medium",
    cover: "running"
  },
  {
    id: "thirty-yuan-style",
    personId: "linjie",
    name: "林姐",
    initials: "林",
    title: "三十块，也能穿得很精神",
    excerpt: "她把预算、场合和舒适度重新排了一次顺序。",
    evidence: "林姐挑衣服先看颜色衬不衬气色，再看工作时能不能伸展。钱不够时，她把预算留给最常穿的一件，其他旧衣重新搭配。",
    quote: "不是贵才好看，是知道什么适合现在的自己。",
    tags: ["审美判断", "资源组合"],
    height: "short",
    cover: "style"
  },
  {
    id: "night-shift-note",
    personId: "aqin",
    name: "阿琴",
    initials: "琴",
    title: "一个电话，帮她留住了工作",
    excerpt: "她多问一句，把别人没说出口的难处听见了。",
    evidence: "新同事连续迟到，大家都以为她不想干。阿琴打了一通电话，才知道对方临时没有人照看孩子。她把班次调开，也教她怎样提前说清楚困难。",
    quote: "很多时候，不是她不负责，是她不知道还能向谁开口。",
    tags: ["共情力", "行动设计"],
    height: "tall",
    cover: "phone"
  },
  {
    id: "repair-coat",
    personId: "linjie",
    name: "林姐",
    initials: "林",
    title: "一件旧外套，我让它又穿了三年",
    excerpt: "她看见的不只是破口，还有一件衣服能继续怎样生活。",
    evidence: "袖口磨破以后，林姐没有急着丢。她拆下里侧完好的布补在外面，又顺手改短了衣长，穿起来反而更利落。",
    quote: "东西旧了，不等于它没有下一种样子。",
    tags: ["实践智慧", "创造力"],
    height: "medium",
    cover: "mending"
  },
  {
    id: "teach-newcomer",
    personId: "xiaomei",
    name: "小梅",
    initials: "梅",
    title: "我把最难的一步，教给了新同事",
    excerpt: "她把自己踩过的坑，变成别人少走的弯路。",
    evidence: "小梅发现新人总在同一个环节返工，就把动作拆成三步，还专门标出最容易看错的位置。后来，新人第一周就能独立完成。",
    quote: "会做是一回事，让别人也会做，是另一种本事。",
    tags: ["经验传承", "组织力"],
    height: "short",
    cover: "teaching"
  }
];

const COMMUNITY_PEOPLE = {
  aqin: { id: "aqin", name: "阿琴", initials: "琴", intro: "我做成的事，正在这里慢慢开花。" },
  xiaomei: { id: "xiaomei", name: "小梅", initials: "梅", intro: "我在照顾身体，也在陪身边的人重新出发。" },
  linjie: { id: "linjie", name: "林姐", initials: "林", intro: "日子有很多限制，我总能找到另一种做法。" }
};

const OWN_GARDEN_STORIES = [
  {
    id: "my-running-story", personId: "me", name: "我", initials: "我", cover: "running", height: "medium",
    title: "我先跑了一小圈，后来有人愿意和我一起",
    excerpt: "我把改变拆成了可以开始的一小步。",
    evidence: "我没有要求自己一次做到最好，而是先找到身体能够接受的节奏。后来我把方法告诉身边的人，也陪她们走完最开始的一段。",
    quote: "我不催别人，只让第一步变得没有那么难。", tags: ["身体觉察", "带动力"]
  },
  {
    id: "my-old-coat", personId: "me", name: "我", initials: "我", cover: "mending", height: "short",
    title: "一件旧衣，我让它重新合身",
    excerpt: "我在有限条件里，找到了另一种做法。",
    evidence: "我留下还能用的部分，重新调整尺寸和搭配。原本要丢掉的衣服，又变成了适合现在生活的样子。",
    quote: "限制不是没有办法，只是要换一种看法。", tags: ["实践智慧", "创造力"]
  },
  {
    id: "my-care-story", personId: "me", name: "我", initials: "我", cover: "phone", height: "tall",
    title: "最忙的时候，我仍把一家人的日子安排好了",
    excerpt: "我记住每个人的需要，也给自己留下喘息。",
    evidence: "事情一起涌来时，我先分清哪些必须今天完成，哪些可以请别人帮忙。我没有把所有事都自己扛，而是让一家人一起参与。",
    quote: "照顾不是一个人牺牲，而是让日子一起往前走。", tags: ["关系照料", "协调力"]
  },
  {
    id: "my-teaching-story", personId: "me", name: "我", initials: "我", cover: "teaching", height: "medium",
    title: "我把容易做错的地方，教给了新同事",
    excerpt: "我把踩过的坑，变成别人少走的弯路。",
    evidence: "我把最难的一步拆开示范，还告诉她我以前为什么会错。她不只记住了动作，也知道遇到变化时该怎样判断。",
    quote: "会做是一回事，让别人也会做，是另一种本事。", tags: ["经验传承", "耐心"]
  },
  {
    id: "my-boundary-story", personId: "me", name: "我", initials: "我", cover: "style", height: "short",
    title: "第一次，我把不愿意说出了口",
    excerpt: "我没有伤害别人，也没有再委屈自己。",
    evidence: "我先想清楚自己能承担什么，再把理由平静地说出来。那次以后，我发现拒绝不等于不近人情。",
    quote: "说不，也是认真对待自己的选择。", tags: ["边界感", "担当"]
  }
];

function CommunityBottomNav({ active, onNavigate, onCreate, Icon }) {
  return (
    <nav className="community-nav" aria-label="主导航">
      <button className={active === "discover" ? "active" : ""} onClick={() => onNavigate("discover")}>
        <Icon name="story" /><span>故事</span>
      </button>
      <button className="create-story-button" onClick={onCreate} aria-label="开始语音讲述">
        <span className="create-orb"><Icon name="mic" size={22} /></span><span>讲述</span>
      </button>
      <button className={active === "garden" ? "active" : ""} onClick={() => onNavigate("garden")}>
        <Icon name="garden" /><span>我的花海</span>
      </button>
    </nav>
  );
}

const COVER_LABELS = {
  blueprint: "图纸与柜体",
  running: "清晨一起跑步",
  style: "旧衣重新搭配",
  phone: "电话与排班表",
  mending: "修补旧外套",
  teaching: "在缝纫机旁带新人"
};

function StoryCoverArt({ variant = "blueprint" }) {
  const scenes = {
    blueprint: (
      <g>
        <rect x="32" y="35" width="146" height="116" rx="10" fill="#fffaf4" stroke="#9c3140" strokeWidth="3" />
        {[58, 84, 110, 136].map((y) => <path key={y} d={`M45 ${y}h118`} stroke="#dcb7b2" strokeWidth="2" />)}
        {[66, 98, 130].map((x) => <path key={x} d={`M${x} 46v94`} stroke="#ead2ce" strokeWidth="1.5" />)}
        <path d="M56 126V74h75v52M56 98h75M92 74v52" fill="none" stroke="#425e50" strokeWidth="5" />
        <path d="M202 63h82v113h-82zM202 101h82M243 63v113" fill="#d9b58f" stroke="#5b463d" strokeWidth="5" />
        <path d="m168 163 82 25" stroke="#9c3140" strokeWidth="8" strokeLinecap="round" />
        <path d="m172 163 18-6-7 17Z" fill="#f3d7c7" />
      </g>
    ),
    running: (
      <g>
        <circle cx="252" cy="47" r="24" fill="#e2a6a2" />
        <path d="M0 116C68 73 119 94 169 78c51-17 90-1 151-29v95H0Z" fill="#718271" />
        <path d="M110 220c25-61 51-95 86-116 22 22 37 56 45 116Z" fill="#f5e7dc" />
        <g stroke="#6c2832" strokeWidth="8" strokeLinecap="round" fill="none">
          <circle cx="128" cy="103" r="10" fill="#d9a19a" stroke="none" /><path d="m128 116-12 36m12-23 24 13m-36 10-22 31m22-31 26 25" />
          <circle cx="184" cy="89" r="10" fill="#d9a19a" stroke="none" /><path d="m184 102 7 39m-3-24 24 10m-21 14-18 36m18-36 25 28" />
          <circle cx="232" cy="109" r="10" fill="#d9a19a" stroke="none" /><path d="m232 122-4 35m2-22 22 14m-24 8-22 29m22-29 21 29" />
        </g>
      </g>
    ),
    style: (
      <g>
        <rect x="28" y="26" width="94" height="170" rx="47" fill="#e8d6cb" stroke="#8b6b64" strokeWidth="4" />
        <path d="M199 44v29m-43 19 43-19 43 19" fill="none" stroke="#425e50" strokeWidth="5" strokeLinecap="round" />
        <path d="m162 91 24-13 13 17 13-17 24 13 24 101h-122Z" fill="#963646" stroke="#6c2431" strokeWidth="4" />
        <path d="m199 95-22 55 22 23 22-23Z" fill="#f4e7dc" />
        <path d="M146 176h106" stroke="#e7b9ad" strokeWidth="6" strokeDasharray="10 8" />
        <path d="M53 173c18-23 33-21 50-3" fill="none" stroke="#425e50" strokeWidth="8" strokeLinecap="round" />
      </g>
    ),
    phone: (
      <g>
        <rect x="34" y="49" width="94" height="154" rx="17" fill="#5b403d" />
        <rect x="44" y="64" width="74" height="112" rx="9" fill="#fff9f2" />
        <circle cx="81" cy="189" r="6" fill="#e8b8af" />
        <rect x="160" y="36" width="124" height="151" rx="8" fill="#fffaf4" stroke="#9c3140" strokeWidth="3" />
        <path d="M160 72h124M185 36v36" stroke="#9c3140" strokeWidth="4" />
        {[96, 122, 148].map((y) => <path key={y} d={`M177 ${y}h90`} stroke="#d8b9b2" strokeWidth="5" strokeLinecap="round" />)}
        <path d="M208 188v-31c0-17 12-27 27-27s27 10 27 27v31" fill="#425e50" />
        <path d="M217 148h36" stroke="#f5e4d6" strokeWidth="5" />
      </g>
    ),
    mending: (
      <g>
        <path d="m95 48 46-18 38 18 38-18 46 18-21 64-27-10v102H115V102l-27 10Z" fill="#6b7b6e" stroke="#425e50" strokeWidth="5" />
        <path d="M141 30c4 24 42 24 38 0" fill="#f1dfd2" stroke="#425e50" strokeWidth="4" />
        <rect x="178" y="124" width="48" height="42" rx="5" fill="#a84450" stroke="#f2c9bd" strokeWidth="4" strokeDasharray="7 5" />
        <path d="M233 77c38 23 31 62 5 83" fill="none" stroke="#9c3140" strokeWidth="4" strokeLinecap="round" />
        <path d="m238 160 15-4-10-10Z" fill="#f0c9bd" />
        <circle cx="67" cy="174" r="28" fill="none" stroke="#e4a39c" strokeWidth="9" />
      </g>
    ),
    teaching: (
      <g>
        <path d="M33 176h255" stroke="#5a4540" strokeWidth="8" strokeLinecap="round" />
        <path d="M108 68h89c23 0 38 19 38 41v28h-127Z" fill="#f4e9dc" stroke="#425e50" strokeWidth="5" />
        <path d="M146 69V49h55v22M197 109h31M129 137h124" fill="none" stroke="#425e50" strokeWidth="5" />
        <circle cx="67" cy="75" r="21" fill="#d9a19a" /><path d="M38 147c2-38 13-57 29-57s29 19 31 57" fill="#923646" />
        <circle cx="269" cy="78" r="21" fill="#d9a19a" /><path d="M242 147c2-35 12-54 27-54s25 19 27 54" fill="#6b7c70" />
        <path d="m84 126 62 19m111-17-45 17" stroke="#d9a19a" strokeWidth="11" strokeLinecap="round" />
        <path d="M130 145h95" stroke="#a83d4b" strokeWidth="7" strokeDasharray="8 5" />
      </g>
    )
  };
  return (
    <svg className={`story-cover-art cover-art-${variant}`} viewBox="0 0 320 220" role="img" aria-label={COVER_LABELS[variant] || "故事配图"}>
      <rect width="320" height="220" rx="18" fill="#f2e4da" />
      <circle cx="24" cy="21" r="45" fill="#fff7f0" opacity="0.58" />
      {scenes[variant] || scenes.blueprint}
    </svg>
  );
}

function StoryCoverVisual({ story, compact = false }) {
  return (
    <div className={`story-cover-visual cover-${story.cover || "blueprint"} ${compact ? "compact" : ""}`}>
      <StoryCoverArt variant={story.cover} />
      <span className="demo-pill">合成演示</span>
    </div>
  );
}

function DiscoverScreen({ onOpenStory, onOpenProfile, onNavigate, onCreate, Icon, motion }) {
  return (
    <section className="screen discover-screen" data-screen-label="故事瀑布流" data-motion={motion}>
      <header className="discover-header">
        <p className="brand-kicker">雁过有声</p>
        <div className="discover-title-row"><div><h2>听见她们</h2><p>每一件做成的小事，都值得被看见</p></div><span className="brand-mark">雁</span></div>
      </header>
      <div className="discover-scroll">
        <div className="story-masonry">
          {COMMUNITY_STORIES.map((story) => (
            <article className={`story-card ${story.height}`} key={story.id}>
              <button className="story-open" onClick={() => onOpenStory(story)} aria-label={`打开故事：${story.title}`}>
                <StoryCoverVisual story={story} compact={story.height === "short"} />
                <div className="story-card-copy">
                  <h3>{story.title}</h3>
                  <p>{story.excerpt}</p>
                  <div className="story-tags">{story.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
              </button>
              <button className="story-person" onClick={() => onOpenProfile(story.personId)} aria-label={`进入${story.name}的花海`}>
                <span className="avatar">{story.initials}</span><span>{story.name}</span><small>去她的花海</small>
              </button>
            </article>
          ))}
        </div>
        <p className="feed-boundary">这里不计算热度，只保存每一个真实的做成。</p>
      </div>
      <CommunityBottomNav active="discover" onNavigate={onNavigate} onCreate={onCreate} Icon={Icon} />
    </section>
  );
}

function StoryDetailScreen({ story, onBack, onOpenProfile, ScreenTop, Icon, Waveform, showToast, motion }) {
  const [playing, setPlaying] = React.useState(false);
  const play = () => {
    setPlaying(true);
    showToast("正在播放合成演示原声");
    window.setTimeout(() => setPlaying(false), 1800);
  };
  return (
    <section className="screen story-detail-screen" data-screen-label="故事详情" data-motion={motion}>
      <ScreenTop title="她做成的一件小事" onBack={onBack} />
      <div className="story-detail-scroll">
        <StoryCoverVisual story={story} />
        <button className="detail-person" onClick={() => onOpenProfile(story.personId)}>
          <span className="avatar">{story.initials}</span><span><strong>{story.name}</strong><small>走进她的花海</small></span><Icon name="next" />
        </button>
        <article className="detail-evidence">
          <p className="label">这件事里，她看见了</p>
          <h2>{story.title}</h2>
          <div className="story-tags">{story.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <p className="story-body">{story.evidence}</p>
          <blockquote>{story.quote}</blockquote>
          <button className="detail-audio" onClick={play}>
            <span className="detail-play"><Icon name={playing ? "pause" : "play"} /></span>
            <Waveform active={playing} bars={20} /><span>听她自己讲</span>
          </button>
          <p className="demo-disclosure">此页面内容为产品演示使用的合成故事，不对应真实人物。</p>
        </article>
      </div>
    </section>
  );
}

const GARDEN_POSITIONS = [
  [8, 31, 116], [58, 24, 132], [30, 48, 126], [67, 54, 110], [2, 67, 108], [47, 72, 128]
];

function GardenScreen({ person, isMine, currentStory, onBack, onOpenStory, onNavigate, onCreate, ScreenTop, Icon, Magnolia, palette, glow, motion }) {
  const personStories = isMine
    ? [currentStory, ...OWN_GARDEN_STORIES].filter(Boolean)
    : COMMUNITY_STORIES.filter((story) => story.personId === person.id);
  const displayStories = isMine ? personStories.slice(0, 6) : personStories;
  return (
    <section className="screen garden-screen" data-screen-label={isMine ? "我的花海" : `${person.name}的花海`} data-motion={motion}>
      <ScreenTop title={isMine ? "我的花海" : `${person.name}的花海`} onBack={isMine ? null : onBack} />
      <div className="garden-profile">
        <span className="avatar large">{person.initials}</span>
        <div><h3>{person.name}</h3><p>{person.intro}</p></div>
        <span className="garden-demo-label">合成演示</span>
      </div>
      <div className="garden-world" aria-label={`${person.name}做成的小事组成的木兰花海`}>
        <div className="garden-haze"></div>
        {displayStories.map((story, index) => {
          const [left, top, size] = GARDEN_POSITIONS[index];
          return (
            <button className={`garden-bloom bloom-${index + 1}`} key={`${story.id}-${index}`} style={{ left: `${left}%`, top: `${top}%` }} onClick={() => onOpenStory(story)}>
              <Magnolia bloom={0.86 + index * 0.025} size={size} palette={palette} glow={glow && index === 0} id={`garden-${story.id}-${index}`} />
              <span>{story.tags[0]}</span>
            </button>
          );
        })}
        <div className="garden-ground-copy"><strong>{displayStories.length} 个故事，正在开花</strong><span>点一朵木兰，听见它从哪里长出来</span></div>
      </div>
      {isMine && <CommunityBottomNav active="garden" onNavigate={onNavigate} onCreate={onCreate} Icon={Icon} />}
    </section>
  );
}

function wrapCanvasText(context, text, x, y, maxWidth, lineHeight, maxLines = 4) {
  const chars = Array.from(text);
  let line = "";
  let lines = 0;
  for (let index = 0; index < chars.length; index += 1) {
    const test = line + chars[index];
    if (context.measureText(test).width > maxWidth && line) {
      context.fillText(line, x, y + lines * lineHeight);
      line = chars[index];
      lines += 1;
      if (lines >= maxLines - 1) break;
    } else line = test;
  }
  if (line && lines < maxLines) context.fillText(line, x, y + lines * lineHeight);
}

function drawCanvasStoryCover(context, variant) {
  const x = 542; const y = 155; const width = 430; const height = 380;
  context.fillStyle = "#f2e4da";
  context.fillRect(x, y, width, height);
  context.strokeStyle = "#425e50";
  context.fillStyle = "#fffaf4";
  context.lineWidth = 8;
  if (variant === "running") {
    context.fillStyle = "#e2a6a2"; context.beginPath(); context.arc(x + 340, y + 72, 38, 0, Math.PI * 2); context.fill();
    context.strokeStyle = "#6c2832";
    [[x + 115, y + 135], [x + 220, y + 110], [x + 315, y + 150]].forEach(([rx, ry]) => {
      context.beginPath(); context.arc(rx, ry, 15, 0, Math.PI * 2); context.stroke();
      context.beginPath(); context.moveTo(rx, ry + 18); context.lineTo(rx, ry + 95); context.moveTo(rx, ry + 45); context.lineTo(rx - 35, ry + 72); context.moveTo(rx, ry + 48); context.lineTo(rx + 38, ry + 64); context.moveTo(rx, ry + 95); context.lineTo(rx - 37, ry + 145); context.moveTo(rx, ry + 95); context.lineTo(rx + 43, ry + 138); context.stroke();
    });
  } else if (variant === "style") {
    context.strokeStyle = "#425e50"; context.beginPath(); context.moveTo(x + 220, y + 55); context.lineTo(x + 220, y + 104); context.moveTo(x + 145, y + 138); context.lineTo(x + 220, y + 104); context.lineTo(x + 295, y + 138); context.stroke();
    context.fillStyle = "#963646"; context.beginPath(); context.moveTo(x + 150, y + 137); context.lineTo(x + 194, y + 112); context.lineTo(x + 220, y + 148); context.lineTo(x + 246, y + 112); context.lineTo(x + 290, y + 137); context.lineTo(x + 330, y + 330); context.lineTo(x + 110, y + 330); context.closePath(); context.fill();
  } else if (variant === "teaching") {
    context.fillStyle = "#fffaf4"; context.strokeStyle = "#425e50"; context.fillRect(x + 90, y + 90, 240, 150); context.strokeRect(x + 90, y + 90, 240, 150);
    context.beginPath(); context.moveTo(x + 130, y + 240); context.lineTo(x + 360, y + 240); context.moveTo(x + 180, y + 90); context.lineTo(x + 180, y + 55); context.lineTo(x + 280, y + 55); context.lineTo(x + 280, y + 90); context.stroke();
    context.strokeStyle = "#9c3140"; context.beginPath(); context.moveTo(x + 55, y + 300); context.lineTo(x + 375, y + 300); context.stroke();
  } else {
    context.fillStyle = "#fffaf4"; context.strokeStyle = "#9c3140"; context.fillRect(x + 30, y + 48, 210, 220); context.strokeRect(x + 30, y + 48, 210, 220);
    context.strokeStyle = "#425e50"; context.beginPath(); context.moveTo(x + 62, y + 220); context.lineTo(x + 62, y + 92); context.lineTo(x + 200, y + 92); context.lineTo(x + 200, y + 220); context.moveTo(x + 62, y + 154); context.lineTo(x + 200, y + 154); context.stroke();
    context.fillStyle = "#d9b58f"; context.fillRect(x + 270, y + 88, 125, 210); context.strokeRect(x + 270, y + 88, 125, 210);
  }
}

async function buildShareImage(topic, coverKey) {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1440;
  const context = canvas.getContext("2d");
  context.fillStyle = "#fff8f2";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = "#dfc7c0";
  context.lineWidth = 3;
  context.strokeRect(56, 56, 968, 1328);
  context.fillStyle = "#8f1d2c";
  context.font = "700 58px 'Noto Serif SC', serif";
  context.fillText("这是我的故事", 96, 148);
  drawCanvasStoryCover(context, coverKey);
  context.fillStyle = "#301c19";
  context.font = "700 64px 'Noto Serif SC', serif";
  wrapCanvasText(context, topic.title, 96, 700, 850, 88, 4);
  let tagX = 96;
  context.font = "500 28px 'Noto Sans SC', sans-serif";
  topic.qualities.slice(0, 3).forEach((tag) => {
    const width = context.measureText(tag).width + 56;
    context.strokeStyle = "#c9878b";
    context.strokeRect(tagX, 1040, width, 56);
    context.fillStyle = "#8f1d2c";
    context.fillText(tag, tagX + 28, 1078);
    tagX += width + 18;
  });
  context.fillStyle = "#7b625d";
  context.font = "400 30px 'Noto Sans SC', sans-serif";
  wrapCanvasText(context, topic.detail, 96, 1160, 860, 48, 3);
  context.strokeStyle = "#dfc7c0";
  context.beginPath(); context.moveTo(96, 1300); context.lineTo(984, 1300); context.stroke();
  context.fillStyle = "#8f1d2c";
  context.font = "600 30px 'Noto Serif SC', serif";
  context.fillText("雁过有声 · 让她做成的事，被看见。", 96, 1350);
  return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
}

function ShareCardScreen({ topic, coverKey, onBack, onAddGarden, ScreenTop, Icon, Waveform, showToast, motion }) {
  const [saving, setSaving] = React.useState(false);
  const makeFile = async () => {
    setSaving(true);
    try {
      const blob = await buildShareImage(topic, coverKey);
      return new File([blob], "我的故事卡.png", { type: "image/png" });
    } finally { setSaving(false); }
  };
  const save = async () => {
    try {
      const file = await makeFile();
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url; link.download = file.name; link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 600);
      showToast("故事卡已保存为图片");
    } catch {
      showToast("图片生成失败，请稍后再试");
    }
  };
  const share = async () => {
    try {
      const file = await makeFile();
      if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
        await navigator.share({ title: "这是我的故事", text: "让她做成的事，被看见。", files: [file] });
        return;
      }
      const url = URL.createObjectURL(file);
      const link = document.createElement("a"); link.href = url; link.download = file.name; link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 600);
      showToast("当前浏览器不支持直接分享，已为你保存图片");
    } catch (error) {
      if (error?.name !== "AbortError") showToast("分享没有完成，请稍后再试");
    }
  };
  return (
    <section className="screen share-card-screen" data-screen-label="分享故事卡" data-motion={motion}>
      <ScreenTop title="保存我的故事卡" onBack={onBack} />
      <div className="share-scroll">
        <article className="share-card-preview">
          <p className="share-name">这是我的故事</p>
          <div className="share-cover"><StoryCoverArt variant={coverKey} /></div>
          <h2>{topic.title}</h2>
          <div className="story-tags">{topic.qualities.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
          <p>{topic.detail}</p>
          <div className="share-audio"><Icon name="play" /><Waveform bars={15} /><span>我的原声</span></div>
          <footer><span className="share-logo">雁</span><strong>雁过有声</strong><span>让她做成的事，被看见。</span></footer>
        </article>
        <div className="share-actions">
          <button className="outline-button" onClick={save} disabled={saving}><Icon name="save" />{saving ? "正在生成" : "保存图片"}</button>
          <button className="primary-button" onClick={share} disabled={saving}><Icon name="share" />分享给朋友</button>
        </div>
        <button className="add-garden-button" onClick={onAddGarden}><Icon name="garden" />加入我的花海</button>
        <p className="privacy-note">只有你主动分享后，别人才能看见这张卡。</p>
      </div>
    </section>
  );
}

window.MulanCommunity = {
  COMMUNITY_STORIES,
  COMMUNITY_PEOPLE,
  StoryCoverArt,
  DiscoverScreen,
  StoryDetailScreen,
  GardenScreen,
  ShareCardScreen
};
})();
