// Interactive Bible Timeline - Dataset
//
// Conventions:
//   year:  signed integer. Negative = BC, positive = AD. (No year 0.)
//   dateCertainty: "firm"        - widely accepted academic date (+/- a few years)
//                  "approximate" - debated but a mainstream academic estimate
//                  "textual"     - derived from biblical text (Genesis 5/11 ages, etc.)
//                                  rather than independent historical evidence
//                  "legendary"   - figure not historically attested; date is symbolic
//
// Chronology choices (academic mainstream):
//   - Late-date Exodus (~1250 BC), Conquest (~1200 BC)
//   - Thiele's chronology for the Divided Monarchy
//   - Jerusalem falls 586 BC, Cyrus's edict 538 BC, Second Temple dedicated 516 BC
//   - Jesus born ~5 BC, crucifixion 30 AD, Second Temple destroyed 70 AD
//
// The Genesis 5/11 patriarchs are anchored to a notional Adam = 4000 BC purely so
// they fit on the timeline. Their textualAge field preserves the lifespans given
// in the Masoretic Text so the "traditional" chronology can still be derived.

const BibleTimeline = {
  meta: {
    chronology: "academic-late-date",
    notes: "Genesis 5/11 ages from Masoretic Text. Pre-flood dates are textual, not historical."
  },
  people: [],
  events: []
};

// ---------- Primeval era: Genesis 5 & 11 ----------
BibleTimeline.people.push(
  {
    id: "adam", name: "Adam",
    birthYear: -4000, deathYear: -3070, textualAge: 930,
    dateCertainty: "textual", era: "primeval", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 1:26 - 5:5"],
    spouses: ["eve"], children: ["cain", "abel", "seth"],
    description: "First human in the biblical narrative, formed from the dust of the ground in Eden. With Eve, ate the forbidden fruit and was exiled. Lived 930 years according to Genesis 5.",
    tags: ["creation", "fall", "eden"]
  },
  {
    id: "eve", name: "Eve",
    birthYear: -4000, deathYear: null, textualAge: null,
    dateCertainty: "textual", era: "primeval", category: "matriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 2:18 - 4:25"],
    spouses: ["adam"], children: ["cain", "abel", "seth"],
    description: "First woman, formed from Adam's side. Tempted by the serpent to eat the forbidden fruit. Mother of Cain, Abel, Seth and 'other sons and daughters'.",
    tags: ["creation", "fall", "eden"]
  },
  {
    id: "cain", name: "Cain",
    birthYear: -3970, deathYear: null, textualAge: null,
    dateCertainty: "textual", era: "primeval", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 4"],
    parents: ["adam", "eve"],
    description: "Firstborn of Adam and Eve. Killed his brother Abel out of jealousy after God accepted Abel's offering and rejected his. Banished, marked, and founded the line that built the first city (Enoch).",
    tags: ["fall", "first-murder"]
  },
  {
    id: "abel", name: "Abel",
    birthYear: -3968, deathYear: -3940, textualAge: null,
    dateCertainty: "textual", era: "primeval", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 4", "Hebrews 11:4"],
    parents: ["adam", "eve"],
    description: "Second son of Adam and Eve, a shepherd. His offering was accepted by God; murdered by his older brother Cain. Cited in the New Testament as the first martyr of righteous faith.",
    tags: ["martyr", "first-murder"]
  },
  {
    id: "seth", name: "Seth",
    birthYear: -3870, deathYear: -2958, textualAge: 912,
    dateCertainty: "textual", era: "primeval", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 4:25 - 5:8"],
    parents: ["adam", "eve"], children: ["enosh"],
    description: "Third son of Adam and Eve, born when Adam was 130. Considered a replacement for Abel; through Seth's line came Noah and ultimately the patriarchs.",
    tags: ["genealogy"]
  },
  {
    id: "enosh", name: "Enosh",
    birthYear: -3765, deathYear: -2860, textualAge: 905,
    dateCertainty: "textual", era: "primeval", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 5:6-11"],
    parents: ["seth"], children: ["kenan"],
    description: "Son of Seth. Genesis notes that 'at that time people began to call on the name of the LORD' (Gen 4:26).",
    tags: ["genealogy"]
  },
  {
    id: "kenan", name: "Kenan",
    birthYear: -3675, deathYear: -2765, textualAge: 910,
    dateCertainty: "textual", era: "primeval", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 5:9-14"],
    parents: ["enosh"], children: ["mahalalel"],
    tags: ["genealogy"]
  },
  {
    id: "mahalalel", name: "Mahalalel",
    birthYear: -3605, deathYear: -2710, textualAge: 895,
    dateCertainty: "textual", era: "primeval", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 5:12-17"],
    parents: ["kenan"], children: ["jared"],
    tags: ["genealogy"]
  },
  {
    id: "jared", name: "Jared",
    birthYear: -3540, deathYear: -2578, textualAge: 962,
    dateCertainty: "textual", era: "primeval", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 5:15-20"],
    parents: ["mahalalel"], children: ["enoch"],
    tags: ["genealogy"]
  },
  {
    id: "enoch", name: "Enoch",
    birthYear: -3378, deathYear: -3013, textualAge: 365,
    dateCertainty: "textual", era: "primeval", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 5:18-24", "Hebrews 11:5", "Jude 14"],
    parents: ["jared"], children: ["methuselah"],
    description: "'Walked with God; and he was not, for God took him.' One of two figures in the Hebrew Bible (with Elijah) said to have been taken to heaven without dying. Cited as a prophet in Jude.",
    tags: ["genealogy", "translated"]
  },
  {
    id: "methuselah", name: "Methuselah",
    birthYear: -3313, deathYear: -2344, textualAge: 969,
    dateCertainty: "textual", era: "primeval", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 5:21-27"],
    parents: ["enoch"], children: ["lamech"],
    description: "Longest-lived figure in the Bible at 969 years. By the Masoretic chronology he dies the year of the Flood.",
    tags: ["genealogy", "longest-lived"]
  },
  {
    id: "lamech-sethite", name: "Lamech (son of Methuselah)",
    birthYear: -3126, deathYear: -2349, textualAge: 777,
    dateCertainty: "textual", era: "primeval", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 5:25-31"],
    parents: ["methuselah"], children: ["noah"],
    description: "Father of Noah. Named his son Noah ('rest'), prophesying that he would bring relief from the cursed ground.",
    tags: ["genealogy"]
  },
  {
    id: "noah", name: "Noah",
    birthYear: -2944, deathYear: -1994, textualAge: 950,
    dateCertainty: "textual", era: "primeval", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 5:28 - 9:29", "Hebrews 11:7", "1 Peter 3:20"],
    parents: ["lamech-sethite"], children: ["shem", "ham", "japheth"],
    description: "Built the ark and survived the Flood with his wife, three sons and their wives. After the Flood received the Noahic covenant (the rainbow). Considered the second father of humanity.",
    tags: ["flood", "covenant", "ark"]
  },
  {
    id: "shem", name: "Shem",
    birthYear: -2444, deathYear: -1844, textualAge: 600,
    dateCertainty: "textual", era: "primeval", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 5:32 - 11:11"],
    parents: ["noah"], children: ["arpachshad"],
    description: "Eldest son of Noah and ancestor of the Semitic peoples, including the line leading to Abraham.",
    tags: ["genealogy", "flood-survivor"]
  },
  {
    id: "ham", name: "Ham",
    birthYear: -2442, deathYear: null, textualAge: null,
    dateCertainty: "textual", era: "primeval", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 9:18 - 10:20"],
    parents: ["noah"], children: ["canaan", "cush", "mizraim", "put"],
    description: "Second son of Noah; ancestor of Canaan, Cush (Ethiopia), Mizraim (Egypt) and Put. Cursed through his son Canaan after the incident in Noah's tent.",
    tags: ["genealogy", "flood-survivor"]
  },
  {
    id: "japheth", name: "Japheth",
    birthYear: -2446, deathYear: null, textualAge: null,
    dateCertainty: "textual", era: "primeval", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 9:18 - 10:5"],
    parents: ["noah"],
    description: "Youngest son of Noah; ancestor of the peoples of the northern coastlands (often associated with Indo-European groups).",
    tags: ["genealogy", "flood-survivor"]
  },
  {
    id: "arpachshad", name: "Arpachshad",
    birthYear: -2342, deathYear: -1904, textualAge: 438,
    dateCertainty: "textual", era: "primeval", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 11:10-13"],
    parents: ["shem"], children: ["shelah"],
    tags: ["genealogy"]
  },
  {
    id: "shelah", name: "Shelah",
    birthYear: -2307, deathYear: -1874, textualAge: 433,
    dateCertainty: "textual", era: "primeval", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 11:12-15"],
    parents: ["arpachshad"], children: ["eber"],
    tags: ["genealogy"]
  },
  {
    id: "eber", name: "Eber",
    birthYear: -2277, deathYear: -1813, textualAge: 464,
    dateCertainty: "textual", era: "primeval", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 11:14-17"],
    parents: ["shelah"], children: ["peleg"],
    description: "Eponymous ancestor of the Hebrews ('ivri').",
    tags: ["genealogy"]
  },
  {
    id: "peleg", name: "Peleg",
    birthYear: -2243, deathYear: -2004, textualAge: 239,
    dateCertainty: "textual", era: "primeval", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 11:16-19"],
    parents: ["eber"], children: ["reu"],
    description: "Genesis notes 'in his days the earth was divided' - traditionally associated with the dispersion at Babel.",
    tags: ["genealogy", "babel"]
  },
  {
    id: "reu", name: "Reu",
    birthYear: -2213, deathYear: -1974, textualAge: 239,
    dateCertainty: "textual", era: "primeval", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 11:18-21"],
    parents: ["peleg"], children: ["serug"],
    tags: ["genealogy"]
  },
  {
    id: "serug", name: "Serug",
    birthYear: -2181, deathYear: -1951, textualAge: 230,
    dateCertainty: "textual", era: "primeval", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 11:20-23"],
    parents: ["reu"], children: ["nahor-sr"],
    tags: ["genealogy"]
  },
  {
    id: "nahor-sr", name: "Nahor (son of Serug)",
    birthYear: -2151, deathYear: -2003, textualAge: 148,
    dateCertainty: "textual", era: "primeval", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 11:22-25"],
    parents: ["serug"], children: ["terah"],
    tags: ["genealogy"]
  },
  {
    id: "terah", name: "Terah",
    birthYear: -2122, deathYear: -1917, textualAge: 205,
    dateCertainty: "textual", era: "primeval", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 11:24-32"],
    parents: ["nahor-sr"], children: ["abraham", "nahor", "haran"],
    description: "Father of Abram (Abraham), Nahor and Haran. Left Ur of the Chaldeans for Canaan but settled in Haran, where he died.",
    tags: ["genealogy", "ur"]
  }
);

// ---------- Patriarchal era (~2000-1600 BC, dates approximate) ----------
BibleTimeline.people.push(
  {
    id: "abraham", name: "Abraham (Abram)",
    birthYear: -2000, deathYear: -1825, textualAge: 175,
    dateCertainty: "approximate", era: "patriarchal", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 11:26 - 25:11", "Romans 4", "Hebrews 11:8-19"],
    parents: ["terah"], spouses: ["sarah", "hagar", "keturah"],
    children: ["ishmael", "isaac"],
    description: "Called by God to leave Ur and Haran for Canaan, with the promise of land, descendants, and blessing to all nations. Recipient of the Abrahamic covenant (circumcision). Considered the father of the faithful in Judaism, Christianity, and Islam.",
    tags: ["covenant", "abrahamic-covenant", "father-of-nations"]
  },
  {
    id: "sarah", name: "Sarah (Sarai)",
    birthYear: -1990, deathYear: -1863, textualAge: 127,
    dateCertainty: "approximate", era: "patriarchal", category: "matriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 11:29 - 23:20", "Hebrews 11:11", "1 Peter 3:6"],
    spouses: ["abraham"], children: ["isaac"],
    description: "Half-sister and wife of Abraham. Bore Isaac at age 90 after decades of barrenness. The only woman whose age at death is recorded in the Hebrew Bible.",
    tags: ["matriarch", "promise"]
  },
  {
    id: "hagar", name: "Hagar",
    birthYear: -1980, deathYear: null, textualAge: null,
    dateCertainty: "approximate", era: "patriarchal", category: "matriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 16", "Genesis 21:8-21", "Galatians 4:21-31"],
    spouses: ["abraham"], children: ["ishmael"],
    description: "Egyptian servant of Sarah, given to Abraham as a concubine. Bore Ishmael. After Isaac's birth, sent away with her son and met by God in the wilderness.",
    tags: ["matriarch", "ishmaelites"]
  },
  {
    id: "ishmael", name: "Ishmael",
    birthYear: -1914, deathYear: -1777, textualAge: 137,
    dateCertainty: "approximate", era: "patriarchal", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 16-17", "Genesis 21", "Genesis 25:12-18"],
    parents: ["abraham", "hagar"],
    description: "Firstborn of Abraham, by Hagar. Father of twelve princes; ancestor of the Ishmaelite tribes. Promised by God to become a great nation.",
    tags: ["ishmaelites", "twelve-princes"]
  },
  {
    id: "lot", name: "Lot",
    birthYear: -1985, deathYear: null, textualAge: null,
    dateCertainty: "approximate", era: "patriarchal", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 11:27 - 14:16", "Genesis 19", "2 Peter 2:7"],
    parents: ["haran"],
    description: "Nephew of Abraham. Settled in Sodom; rescued by Abraham from invading kings, and again by angels before Sodom's destruction. Father of Moab and Ammon by his daughters.",
    tags: ["sodom", "moab", "ammon"]
  },
  {
    id: "isaac", name: "Isaac",
    birthYear: -1900, deathYear: -1720, textualAge: 180,
    dateCertainty: "approximate", era: "patriarchal", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 21-28", "Genesis 35:27-29"],
    parents: ["abraham", "sarah"], spouses: ["rebekah"],
    children: ["esau", "jacob"],
    description: "Son of promise, born to Abraham and Sarah in their old age. Bound by Abraham on Mount Moriah but spared. Father of Esau and Jacob; the second of the three patriarchs.",
    tags: ["covenant", "binding-of-isaac"]
  },
  {
    id: "rebekah", name: "Rebekah",
    birthYear: -1880, deathYear: null, textualAge: null,
    dateCertainty: "approximate", era: "patriarchal", category: "matriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 24", "Genesis 25:19-28", "Genesis 27"],
    spouses: ["isaac"], children: ["esau", "jacob"],
    description: "Granddaughter of Abraham's brother Nahor. Brought from Mesopotamia by Abraham's servant. Mother of Esau and Jacob; engineered the blessing going to Jacob.",
    tags: ["matriarch"]
  },
  {
    id: "esau", name: "Esau",
    birthYear: -1840, deathYear: null, textualAge: null,
    dateCertainty: "approximate", era: "patriarchal", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 25:19 - 36:43", "Hebrews 12:16"],
    parents: ["isaac", "rebekah"],
    description: "Firstborn twin of Isaac. Sold his birthright to Jacob for stew and lost his blessing. Father of the Edomites, who settled in Seir.",
    tags: ["edomites", "birthright"]
  },
  {
    id: "jacob", name: "Jacob (Israel)",
    birthYear: -1840, deathYear: -1693, textualAge: 147,
    dateCertainty: "approximate", era: "patriarchal", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 25:19 - 50:14"],
    parents: ["isaac", "rebekah"], spouses: ["leah", "rachel", "bilhah", "zilpah"],
    children: ["reuben", "simeon", "levi", "judah", "dan", "naphtali", "gad", "asher", "issachar", "zebulun", "joseph", "benjamin", "dinah"],
    description: "Younger twin of Esau; obtained the birthright and blessing. Wrestled with God at Peniel and was renamed Israel. Father of the twelve tribes; moved to Egypt during the famine.",
    tags: ["twelve-tribes", "israel"]
  },
  {
    id: "leah", name: "Leah",
    birthYear: -1820, deathYear: null, textualAge: null,
    dateCertainty: "approximate", era: "patriarchal", category: "matriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 29-30", "Genesis 49:31"],
    spouses: ["jacob"], children: ["reuben", "simeon", "levi", "judah", "issachar", "zebulun", "dinah"],
    description: "Elder daughter of Laban. Married to Jacob through Laban's deception. Mother of six tribes including Judah (royal line) and Levi (priestly line).",
    tags: ["matriarch"]
  },
  {
    id: "rachel", name: "Rachel",
    birthYear: -1815, deathYear: -1750, textualAge: null,
    dateCertainty: "approximate", era: "patriarchal", category: "matriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 29-31", "Genesis 35:16-20"],
    spouses: ["jacob"], children: ["joseph", "benjamin"],
    description: "Younger daughter of Laban; Jacob's beloved. Died giving birth to Benjamin near Bethlehem.",
    tags: ["matriarch"]
  },
  {
    id: "joseph", name: "Joseph",
    birthYear: -1750, deathYear: -1640, textualAge: 110,
    dateCertainty: "approximate", era: "patriarchal", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 30:22-24", "Genesis 37-50"],
    parents: ["jacob", "rachel"], spouses: ["asenath"],
    children: ["manasseh", "ephraim"],
    description: "Favored son of Jacob. Sold into Egyptian slavery by his brothers, rose to be vizier of Egypt, and saved his family from famine. His sons Ephraim and Manasseh became two of the twelve tribes.",
    tags: ["egypt", "twelve-tribes", "famine"]
  },
  {
    id: "judah", name: "Judah",
    birthYear: -1810, deathYear: null, textualAge: null,
    dateCertainty: "approximate", era: "patriarchal", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 29:35", "Genesis 38", "Genesis 49:8-12"],
    parents: ["jacob", "leah"],
    description: "Fourth son of Jacob and Leah; ancestor of the royal Davidic line and ultimately Jesus. Pledged his life for Benjamin's safe return from Egypt.",
    tags: ["twelve-tribes", "davidic-line", "messianic-line"]
  },
  {
    id: "benjamin", name: "Benjamin",
    birthYear: -1750, deathYear: null, textualAge: null,
    dateCertainty: "approximate", era: "patriarchal", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 35:16-18", "Genesis 42-45"],
    parents: ["jacob", "rachel"],
    description: "Youngest son of Jacob; only full brother of Joseph. Ancestor of the tribe of Benjamin, which produced King Saul and the apostle Paul.",
    tags: ["twelve-tribes"]
  },
  {
    id: "reuben", name: "Reuben",
    birthYear: -1815, deathYear: null, textualAge: null,
    dateCertainty: "approximate", era: "patriarchal", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 29:32", "Genesis 49:3-4"],
    parents: ["jacob", "leah"],
    description: "Firstborn son of Jacob and Leah. Lost his birthright due to sleeping with Bilhah. Ancestor of the tribe of Reuben.",
    tags: ["twelve-tribes"]
  },
  {
    id: "simeon-jacob", name: "Simeon",
    birthYear: -1813, deathYear: null, textualAge: null,
    dateCertainty: "approximate", era: "patriarchal", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 29:33", "Genesis 49:5-7"],
    parents: ["jacob", "leah"],
    description: "Second son of Jacob and Leah. Took part in avenging the rape of Dinah. Ancestor of the tribe of Simeon.",
    tags: ["twelve-tribes"]
  },
  {
    id: "levi", name: "Levi",
    birthYear: -1810, deathYear: null, textualAge: null,
    dateCertainty: "approximate", era: "patriarchal", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 29:34", "Genesis 49:5-7"],
    parents: ["jacob", "leah"],
    description: "Third son of Jacob and Leah. Ancestor of the Levites, the priestly tribe. His descendants include Moses and Aaron.",
    tags: ["twelve-tribes", "levite"]
  },
  {
    id: "issachar", name: "Issachar",
    birthYear: -1808, deathYear: null, textualAge: null,
    dateCertainty: "approximate", era: "patriarchal", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 30:17-18", "Genesis 49:14-15"],
    parents: ["jacob", "leah"],
    description: "Fifth son of Jacob and Leah. Described as a strong donkey resting between burdens. Ancestor of the tribe of Issachar.",
    tags: ["twelve-tribes"]
  },
  {
    id: "zebulun", name: "Zebulun",
    birthYear: -1806, deathYear: null, textualAge: null,
    dateCertainty: "approximate", era: "patriarchal", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 30:19-20", "Genesis 49:13"],
    parents: ["jacob", "leah"],
    description: "Sixth son of Jacob and Leah. Dwelt by the seashore. Ancestor of the tribe of Zebulun.",
    tags: ["twelve-tribes"]
  },
  {
    id: "naphtali", name: "Naphtali",
    birthYear: -1806, deathYear: null, textualAge: null,
    dateCertainty: "approximate", era: "patriarchal", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 30:7-8", "Genesis 49:21"],
    parents: ["jacob", "bilhah"],
    description: "Son of Jacob and Bilhah, Rachel's servant. Ancestor of the tribe of Naphtali.",
    tags: ["twelve-tribes"]
  },
  {
    id: "gad", name: "Gad",
    birthYear: -1805, deathYear: null, textualAge: null,
    dateCertainty: "approximate", era: "patriarchal", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 30:10-11", "Genesis 49:19"],
    parents: ["jacob", "zilpah"],
    description: "Son of Jacob and Zilpah, Leah's servant. Ancestor of the tribe of Gad.",
    tags: ["twelve-tribes"]
  },
  {
    id: "asher", name: "Asher",
    birthYear: -1804, deathYear: null, textualAge: null,
    dateCertainty: "approximate", era: "patriarchal", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 30:12-13", "Genesis 49:20"],
    parents: ["jacob", "zilpah"],
    description: "Son of Jacob and Zilpah, Leah's servant. Blessed with abundance. Ancestor of the tribe of Asher.",
    tags: ["twelve-tribes"]
  },
  {
    id: "dinah", name: "Dinah",
    birthYear: -1800, deathYear: null, textualAge: null,
    dateCertainty: "approximate", era: "patriarchal", category: "matriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 30:21", "Genesis 34"],
    parents: ["jacob", "leah"],
    description: "Daughter of Jacob and Leah. Her rape at Shechem led to the deceptive revenge of her brothers.",
    tags: ["matriarch"]
  },
  {
    id: "leah", name: "Leah",
    birthYear: -1805, deathYear: null, textualAge: null,
    dateCertainty: "approximate", era: "patriarchal", category: "matriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 29-35"],
    spouses: ["jacob"], children: ["reuben", "simeon-jacob", "levi", "judah", "issachar", "zebulun", "dinah"],
    description: "First wife of Jacob. Mother of six sons and a daughter who became mothers of six tribes of Israel.",
    tags: ["matriarch"]
  },
  {
    id: "bilhah", name: "Bilhah",
    birthYear: -1810, deathYear: null, textualAge: null,
    dateCertainty: "approximate", era: "patriarchal", category: "matriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 29:29", "Genesis 30:3-8"],
    spouses: ["jacob"], children: ["dan", "naphtali"],
    description: "Rachel's maidservant; bore two sons for Jacob: Dan and Naphtali.",
    tags: ["matriarch"]
  },
  {
    id: "zilpah", name: "Zilpah",
    birthYear: -1810, deathYear: null, textualAge: null,
    dateCertainty: "approximate", era: "patriarchal", category: "matriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 29:24", "Genesis 30:9-13"],
    spouses: ["jacob"], children: ["gad", "asher"],
    description: "Leah's maidservant; bore two sons for Jacob: Gad and Asher.",
    tags: ["matriarch"]
  },
  {
    id: "dan", name: "Dan",
    birthYear: -1804, deathYear: null, textualAge: null,
    dateCertainty: "approximate", era: "patriarchal", category: "patriarch", testament: "OT",
    book: "Genesis", references: ["Genesis 30:5-6", "Genesis 49:16-18"],
    parents: ["jacob", "bilhah"],
    description: "Son of Jacob and Bilhah. Ancestor of the tribe of Dan. Described as one who 'shall judge his people.'",
    tags: ["twelve-tribes"]
  }
);

// ---------- Exodus / Wilderness era (~1350-1200 BC) ----------
BibleTimeline.people.push(
  {
    id: "amram", name: "Amram",
    birthYear: -1430, deathYear: -1293, textualAge: 137,
    dateCertainty: "approximate", era: "exodus", category: "patriarch", testament: "OT",
    book: "Exodus", references: ["Exodus 6:18-20", "Numbers 26:59"],
    spouses: ["jochebed"], children: ["aaron", "moses", "miriam"],
    description: "Father of Moses, Aaron, and Miriam. A Levite descended from Kohath.",
    tags: ["levite"]
  },
  {
    id: "jochebed", name: "Jochebed",
    birthYear: -1420, deathYear: null, textualAge: null,
    dateCertainty: "approximate", era: "exodus", category: "matriarch", testament: "OT",
    book: "Exodus", references: ["Exodus 2:1-10", "Exodus 6:20", "Numbers 26:59"],
    spouses: ["amram"], children: ["aaron", "moses", "miriam"],
    description: "Mother of Moses; hid her son in a basket on the Nile to save him from Pharaoh's edict.",
    tags: ["levite"]
  },
  {
    id: "miriam", name: "Miriam",
    birthYear: -1360, deathYear: -1230, textualAge: null,
    dateCertainty: "approximate", era: "exodus", category: "prophet", testament: "OT",
    book: "Exodus", references: ["Exodus 2:4-8", "Exodus 15:20-21", "Numbers 12", "Numbers 20:1"],
    parents: ["amram", "jochebed"],
    description: "Sister of Moses and Aaron. Watched over baby Moses in the Nile. Led the women in song after the Red Sea crossing. Struck with leprosy after challenging Moses' authority.",
    tags: ["prophet", "exodus"]
  },
  {
    id: "aaron", name: "Aaron",
    birthYear: -1353, deathYear: -1230, textualAge: 123,
    dateCertainty: "approximate", era: "exodus", category: "priest", testament: "OT",
    book: "Exodus", references: ["Exodus 4-40", "Leviticus 8-10", "Numbers 20:22-29"],
    parents: ["amram", "jochebed"], children: ["nadab", "abihu", "eleazar", "ithamar"],
    description: "Older brother of Moses; first High Priest of Israel. Spoke for Moses before Pharaoh. Made the golden calf at Sinai. Died on Mount Hor.",
    tags: ["priest", "exodus", "high-priest"]
  },
  {
    id: "moses", name: "Moses",
    birthYear: -1350, deathYear: -1230, textualAge: 120,
    dateCertainty: "approximate", era: "exodus", category: "prophet", testament: "OT",
    book: "Exodus", references: ["Exodus 2 - Deuteronomy 34", "Hebrews 11:23-29"],
    parents: ["amram", "jochebed"], spouses: ["zipporah"], children: ["gershom", "eliezer"],
    description: "Lawgiver and prophet who led Israel out of Egypt. Received the Torah at Sinai. Led the people forty years in the wilderness; saw the Promised Land from Mount Nebo but did not enter. Considered the greatest prophet in Judaism.",
    tags: ["exodus", "lawgiver", "prophet", "sinai"]
  },
  {
    id: "zipporah", name: "Zipporah",
    birthYear: -1340, deathYear: null, textualAge: null,
    dateCertainty: "approximate", era: "exodus", category: "matriarch", testament: "OT",
    book: "Exodus", references: ["Exodus 2:21", "Exodus 4:24-26", "Exodus 18:1-6"],
    spouses: ["moses"], children: ["gershom", "eliezer"],
    description: "Midianite daughter of Jethro; wife of Moses. Circumcised her son in a critical moment, saving Moses' life.",
    tags: ["midianite"]
  },
  {
    id: "jethro", name: "Jethro",
    birthYear: -1380, deathYear: null, textualAge: null,
    dateCertainty: "approximate", era: "exodus", category: "priest", testament: "OT",
    book: "Exodus", references: ["Exodus 2:16-22", "Exodus 18"],
    children: ["zipporah"],
    description: "Priest of Midian, father-in-law of Moses. Advised Moses to delegate judicial duties.",
    tags: ["midianite", "priest"]
  },
  {
    id: "joshua", name: "Joshua",
    birthYear: -1300, deathYear: -1190, textualAge: 110,
    dateCertainty: "approximate", era: "exodus", category: "judge", testament: "OT",
    book: "Joshua", references: ["Exodus 17:8-16", "Numbers 13-14", "Joshua 1-24"],
    description: "Successor to Moses; led Israel into Canaan and conducted the conquest. One of two spies (with Caleb) who urged faith. Renewed the covenant at Shechem before his death.",
    tags: ["conquest", "spy", "successor"]
  },
  {
    id: "caleb", name: "Caleb",
    birthYear: -1300, deathYear: -1180, textualAge: null,
    dateCertainty: "approximate", era: "exodus", category: "patriarch", testament: "OT",
    book: "Joshua", references: ["Numbers 13-14", "Joshua 14"],
    description: "One of the twelve spies; with Joshua, gave a faithful report. Received Hebron as his inheritance at age 85.",
    tags: ["spy", "conquest"]
  },
  {
    id: "balaam", name: "Balaam",
    birthYear: -1290, deathYear: -1230, textualAge: null,
    dateCertainty: "approximate", era: "exodus", category: "prophet", testament: "OT",
    book: "Numbers", references: ["Numbers 22-24", "Numbers 31:8", "2 Peter 2:15"],
    description: "Mesopotamian seer hired by Balak of Moab to curse Israel; instead pronounced four oracles of blessing. Later led Israel into idolatry at Peor and was killed in the Midianite war.",
    tags: ["prophet", "moab"]
  },
  {
    id: "nadab-priest", name: "Nadab (Aaron's son)",
    birthYear: -1330, deathYear: -1230, textualAge: null,
    dateCertainty: "approximate", era: "exodus", category: "priest", testament: "OT",
    book: "Leviticus", references: ["Leviticus 10:1-2", "Exodus 6:23"],
    parents: ["aaron"],
    description: "Elder son of Aaron. Offered strange/profane fire before the LORD with his brother Abihu and were both consumed by fire.",
    tags: ["priest"]
  },
  {
    id: "abihu", name: "Abihu",
    birthYear: -1328, deathYear: -1230, textualAge: null,
    dateCertainty: "approximate", era: "exodus", category: "priest", testament: "OT",
    book: "Leviticus", references: ["Leviticus 10:1-2", "Exodus 6:23"],
    parents: ["aaron"],
    description: "Second son of Aaron. Offered strange/profane fire with his brother Nadab and were both consumed by fire as punishment.",
    tags: ["priest"]
  },
  {
    id: "eleazar", name: "Eleazar",
    birthYear: -1325, deathYear: -1200, textualAge: null,
    dateCertainty: "approximate", era: "exodus", category: "priest", testament: "OT",
    book: "Exodus", references: ["Exodus 6:23", "Numbers 20:25-29", "Joshua 14:1"],
    parents: ["aaron"], children: ["phinehas"],
    description: "Third son of Aaron; succeeded his father as High Priest after Nadab and Abihu's death. Father of Phinehas.",
    tags: ["priest", "high-priest"]
  },
  {
    id: "ithamar", name: "Ithamar",
    birthYear: -1323, deathYear: -1200, textualAge: null,
    dateCertainty: "approximate", era: "exodus", category: "priest", testament: "OT",
    book: "Exodus", references: ["Exodus 6:23", "1 Chronicles 24:4"],
    parents: ["aaron"],
    description: "Fourth son of Aaron. Oversaw the fabric-workers and leather-workers of the Tabernacle. Ancestor of a priestly division.",
    tags: ["priest"]
  },
  {
    id: "phinehas", name: "Phinehas (son of Eleazar)",
    birthYear: -1310, deathYear: -1190, textualAge: null,
    dateCertainty: "approximate", era: "exodus", category: "priest", testament: "OT",
    book: "Numbers", references: ["Numbers 25:10-13", "Psalm 106:30-31"],
    parents: ["eleazar"],
    description: "Grandson of Aaron; high priest succeeding his father Eleazar. Zealous for the LORD; stopped a plague by executing an Israelite man and his Midianite companion.",
    tags: ["priest", "high-priest"]
  },
  {
    id: "rahab", name: "Rahab",
    birthYear: -1230, deathYear: null, textualAge: null,
    dateCertainty: "approximate", era: "conquest", category: "other", testament: "OT",
    book: "Joshua", references: ["Joshua 2", "Joshua 6:17-25", "Matthew 1:5", "Hebrews 11:31"],
    spouses: ["salmon"], children: ["boaz"],
    description: "Canaanite of Jericho who hid the Israelite spies. Spared with her household when Jericho fell. Listed in the genealogy of Jesus.",
    tags: ["conquest", "messianic-line"]
  }
);

// ---------- Judges era (~1200-1020 BC) ----------
BibleTimeline.people.push(
  {
    id: "othniel", name: "Othniel",
    birthYear: -1240, deathYear: -1170, textualAge: null,
    dateCertainty: "approximate", era: "judges", category: "judge", testament: "OT",
    book: "Judges", references: ["Judges 1:11-15", "Judges 3:7-11"],
    description: "First judge of Israel; nephew of Caleb. Delivered Israel from Cushan-Rishathaim of Aram.",
    tags: ["judge"]
  },
  {
    id: "ehud", name: "Ehud",
    birthYear: -1200, deathYear: -1130, textualAge: null,
    dateCertainty: "approximate", era: "judges", category: "judge", testament: "OT",
    book: "Judges", references: ["Judges 3:12-30"],
    description: "Left-handed Benjaminite judge who killed Eglon, king of Moab, with a concealed dagger.",
    tags: ["judge"]
  },
  {
    id: "deborah", name: "Deborah",
    birthYear: -1180, deathYear: -1100, textualAge: null,
    dateCertainty: "approximate", era: "judges", category: "judge", testament: "OT",
    book: "Judges", references: ["Judges 4-5"],
    description: "Prophetess and only female judge of Israel. With Barak defeated Sisera and the Canaanite king Jabin. Her victory song (Judges 5) is among the oldest passages in the Hebrew Bible.",
    tags: ["judge", "prophet"]
  },
  {
    id: "barak", name: "Barak",
    birthYear: -1180, deathYear: null, textualAge: null,
    dateCertainty: "approximate", era: "judges", category: "judge", testament: "OT",
    book: "Judges", references: ["Judges 4-5", "Hebrews 11:32"],
    description: "Israelite commander who, with Deborah, defeated Sisera at the Kishon River.",
    tags: ["judge", "warrior"]
  },
  {
    id: "gideon", name: "Gideon",
    birthYear: -1160, deathYear: -1080, textualAge: null,
    dateCertainty: "approximate", era: "judges", category: "judge", testament: "OT",
    book: "Judges", references: ["Judges 6-8"],
    description: "Judge from Manasseh who, with 300 men, routed the Midianite army. Tested God with the fleece. Refused kingship but later made a problematic ephod.",
    tags: ["judge", "midianite-war"]
  },
  {
    id: "jephthah", name: "Jephthah",
    birthYear: -1110, deathYear: -1070, textualAge: null,
    dateCertainty: "approximate", era: "judges", category: "judge", testament: "OT",
    book: "Judges", references: ["Judges 11-12", "Hebrews 11:32"],
    description: "Gileadite judge who defeated the Ammonites. Made a tragic vow that bound him to sacrifice his daughter.",
    tags: ["judge", "ammonite-war"]
  },
  {
    id: "manoah", name: "Manoah",
    birthYear: -1140, deathYear: null, textualAge: null,
    dateCertainty: "approximate", era: "judges", category: "patriarch", testament: "OT",
    book: "Judges", references: ["Judges 13"],
    spouses: ["manoah-wife"], children: ["samson"],
    description: "Father of Samson from the tribe of Dan. Received the annunciation of Samson's birth from the angel of the LORD.",
    tags: []
  },
  {
    id: "manoah-wife", name: "Wife of Manoah",
    birthYear: -1135, deathYear: null, textualAge: null,
    dateCertainty: "approximate", era: "judges", category: "matriarch", testament: "OT",
    book: "Judges", references: ["Judges 13"],
    spouses: ["manoah"], children: ["samson"],
    description: "Mother of Samson. Barren until the angel of the LORD announced she would bear a son dedicated to God as a Nazirite. Her name is not recorded in Scripture.",
    tags: []
  },
  {
    id: "samson", name: "Samson",
    birthYear: -1100, deathYear: -1070, textualAge: null,
    dateCertainty: "approximate", era: "judges", category: "judge", testament: "OT",
    book: "Judges", references: ["Judges 13-16", "Hebrews 11:32"],
    parents: ["manoah", "manoah-wife"],
    description: "Nazirite judge of supernatural strength from the tribe of Dan. Fought the Philistines; betrayed by Delilah; pulled down the temple of Dagon, killing himself with thousands of Philistines.",
    tags: ["judge", "nazirite", "philistines"]
  },
  {
    id: "ruth", name: "Ruth",
    birthYear: -1130, deathYear: null, textualAge: null,
    dateCertainty: "approximate", era: "judges", category: "matriarch", testament: "OT",
    book: "Ruth", references: ["Book of Ruth", "Matthew 1:5"],
    spouses: ["boaz"], children: ["obed"],
    description: "Moabite widow who pledged loyalty to her mother-in-law Naomi and to the God of Israel. Married Boaz; great-grandmother of David and ancestor of Jesus.",
    tags: ["moabite", "messianic-line"]
  },
  {
    id: "boaz", name: "Boaz",
    birthYear: -1140, deathYear: null, textualAge: null,
    dateCertainty: "approximate", era: "judges", category: "patriarch", testament: "OT",
    book: "Ruth", references: ["Book of Ruth", "Matthew 1:5"],
    parents: ["salmon", "rahab"], spouses: ["ruth"], children: ["obed"],
    description: "Wealthy Bethlehemite who acted as kinsman-redeemer for Ruth and Naomi. Great-grandfather of David.",
    tags: ["messianic-line"]
  },
  {
    id: "naomi", name: "Naomi",
    birthYear: -1160, deathYear: null, textualAge: null,
    dateCertainty: "approximate", era: "judges", category: "other", testament: "OT",
    book: "Ruth", references: ["Book of Ruth"],
    description: "Israelite woman who lost her husband and sons in Moab. Returned to Bethlehem with Ruth.",
    tags: []
  },
  {
    id: "eli", name: "Eli",
    birthYear: -1140, deathYear: -1050, textualAge: 98,
    dateCertainty: "approximate", era: "judges", category: "priest", testament: "OT",
    book: "1 Samuel", references: ["1 Samuel 1-4"],
    children: ["hophni", "phinehas-eli"],
    description: "High priest at Shiloh who raised the boy Samuel. His sons Hophni and Phinehas were corrupt; both died on the day the Philistines captured the Ark. Eli fell and died on hearing the news.",
    tags: ["priest", "high-priest", "shiloh"]
  },
  {
    id: "hophni", name: "Hophni",
    birthYear: -1105, deathYear: -1050, textualAge: null,
    dateCertainty: "approximate", era: "judges", category: "priest", testament: "OT",
    book: "1 Samuel", references: ["1 Samuel 1:3", "1 Samuel 2:12-17", "1 Samuel 4:4-11"],
    parents: ["eli"],
    description: "Elder son of Eli; priest at Shiloh. Known for corrupt practices and irreverence. Killed by the Philistines when the Ark of the Covenant was captured.",
    tags: ["priest"]
  },
  {
    id: "phinehas-eli", name: "Phinehas (Eli's son)",
    birthYear: -1103, deathYear: -1050, textualAge: null,
    dateCertainty: "approximate", era: "judges", category: "priest", testament: "OT",
    book: "1 Samuel", references: ["1 Samuel 1:3", "1 Samuel 2:12-17", "1 Samuel 4:4-11"],
    parents: ["eli"],
    description: "Younger son of Eli; priest at Shiloh. Shared his brother's corrupt practices. Killed by the Philistines on the same day the Ark was captured; his wife bore him a son after hearing the news.",
    tags: ["priest"]
  },
  {
    id: "samuel", name: "Samuel",
    birthYear: -1075, deathYear: -1012, textualAge: null,
    dateCertainty: "approximate", era: "judges", category: "prophet", testament: "OT",
    book: "1 Samuel", references: ["1 Samuel 1-25", "1 Samuel 28"],
    parents: ["elkanah", "hannah"],
    description: "Last judge of Israel and the prophet who anchored the transition to monarchy. Anointed both Saul and David. Dedicated to God by his mother Hannah and raised by Eli.",
    tags: ["prophet", "judge", "anointer"]
  },
  {
    id: "hannah", name: "Hannah",
    birthYear: -1100, deathYear: null, textualAge: null,
    dateCertainty: "approximate", era: "judges", category: "matriarch", testament: "OT",
    book: "1 Samuel", references: ["1 Samuel 1-2"],
    spouses: ["elkanah"], children: ["samuel"],
    description: "Mother of Samuel. Vowed to give her son to the LORD if granted a child. Her prayer of thanksgiving (1 Sam 2) prefigures the Magnificat.",
    tags: ["matriarch", "prayer"]
  },
  {
    id: "tola", name: "Tola",
    birthYear: -1130, deathYear: -1107, textualAge: null,
    dateCertainty: "textual", era: "judges", category: "judge", testament: "OT",
    book: "Judges", references: ["Judges 10:1-2"],
    description: "Judge from Issachar. Judged Israel 23 years after Abimelech's reign. Details of his leadership are minimal.",
    tags: ["judge", "issachar"]
  },
  {
    id: "jair", name: "Jair",
    birthYear: -1120, deathYear: -1098, textualAge: null,
    dateCertainty: "textual", era: "judges", category: "judge", testament: "OT",
    book: "Judges", references: ["Judges 10:3-5"],
    children: ["jair-30-sons"],
    description: "Judge from Gilead. Judged Israel 22 years. Had 30 sons who rode 30 donkeys and governed 30 towns.",
    tags: ["judge", "gilead"]
  },
  {
    id: "ibzan", name: "Ibzan",
    birthYear: -1095, deathYear: -1088, textualAge: null,
    dateCertainty: "textual", era: "judges", category: "judge", testament: "OT",
    book: "Judges", references: ["Judges 12:8-10"],
    description: "Judge from Bethlehem. Judged Israel 7 years. Had 30 sons and 30 daughters; the daughters he gave to men outside the family.",
    tags: ["judge", "bethlehem"]
  },
  {
    id: "elon", name: "Elon",
    birthYear: -1085, deathYear: -1075, textualAge: null,
    dateCertainty: "textual", era: "judges", category: "judge", testament: "OT",
    book: "Judges", references: ["Judges 12:11-12"],
    description: "Judge from Zebulun. Judged Israel 10 years. Buried in Aijalon.",
    tags: ["judge", "zebulun"]
  },
  {
    id: "abdon", name: "Abdon",
    birthYear: -1075, deathYear: -1067, textualAge: null,
    dateCertainty: "textual", era: "judges", category: "judge", testament: "OT",
    book: "Judges", references: ["Judges 12:13-15"],
    description: "Judge from Pirathon. Judged Israel 8 years. Had 40 sons and 30 grandsons who rode on 70 donkeys.",
    tags: ["judge", "ephraim"]
  },
  {
    id: "shamgar", name: "Shamgar",
    birthYear: -1170, deathYear: -1150, textualAge: null,
    dateCertainty: "textual", era: "judges", category: "judge", testament: "OT",
    book: "Judges", references: ["Judges 3:31", "Judges 5:6"],
    description: "Judge who killed 600 Philistines with an ox goad. Mentioned briefly between Ehud and Deborah. Possibly a contemporary of Deborah.",
    tags: ["judge", "philistines"]
  }
);

// ---------- United Monarchy (~1050-931 BC) ----------
BibleTimeline.people.push(
  {
    id: "saul", name: "Saul",
    birthYear: -1080, deathYear: -1010, textualAge: null,
    dateCertainty: "approximate", era: "united-monarchy", category: "king-israel", testament: "OT",
    book: "1 Samuel", references: ["1 Samuel 9-31"], reignStart: -1050, reignEnd: -1010,
    children: ["jonathan", "ish-bosheth", "michal"],
    description: "First king of Israel, from the tribe of Benjamin. Anointed by Samuel. Rejected by God for disobedience; pursued David relentlessly. Died with three sons at the battle of Gilboa against the Philistines.",
    tags: ["king", "first-king", "benjaminite"]
  },
  {
    id: "jonathan", name: "Jonathan",
    birthYear: -1055, deathYear: -1010, textualAge: null,
    dateCertainty: "approximate", era: "united-monarchy", category: "other", testament: "OT",
    book: "1 Samuel", references: ["1 Samuel 13-31", "2 Samuel 1"],
    parents: ["saul"], children: ["mephibosheth"],
    description: "Crown prince of Israel; David's covenant friend. Killed beside Saul at Gilboa.",
    tags: ["covenant-friend"]
  },
  {
    id: "david", name: "David",
    birthYear: -1040, deathYear: -970, textualAge: 70,
    dateCertainty: "firm", era: "united-monarchy", category: "king-judah", testament: "OT",
    book: "1 Samuel", references: ["1 Samuel 16 - 1 Kings 2", "Psalms"], reignStart: -1010, reignEnd: -970,
    parents: ["jesse"], spouses: ["michal", "abigail", "bathsheba", "ahinoam"],
    children: ["amnon", "absalom", "adonijah", "solomon", "tamar"],
    description: "Shepherd, harpist, warrior, poet, and second king of Israel. Killed Goliath, captured Jerusalem and made it the capital. Recipient of the Davidic covenant. Ancestor of Jesus. Author of many Psalms.",
    tags: ["king", "davidic-covenant", "messianic-line", "psalmist"]
  },
  {
    id: "bathsheba", name: "Bathsheba",
    birthYear: -1010, deathYear: null, textualAge: null,
    dateCertainty: "approximate", era: "united-monarchy", category: "matriarch", testament: "OT",
    book: "2 Samuel", references: ["2 Samuel 11-12", "1 Kings 1-2"],
    spouses: ["uriah", "david"], children: ["solomon"],
    description: "Wife of Uriah the Hittite, taken by David. Mother of Solomon; played a decisive role in Solomon's accession.",
    tags: ["queen-mother"]
  },
  {
    id: "nathan", name: "Nathan",
    birthYear: -1020, deathYear: -960, textualAge: null,
    dateCertainty: "approximate", era: "united-monarchy", category: "prophet", testament: "OT",
    book: "2 Samuel", references: ["2 Samuel 7", "2 Samuel 12", "1 Kings 1"],
    description: "Court prophet under David; delivered the Davidic covenant and confronted David over Bathsheba and Uriah. Helped secure Solomon's succession.",
    tags: ["prophet", "court-prophet"]
  },
  {
    id: "absalom", name: "Absalom",
    birthYear: -1000, deathYear: -975, textualAge: null,
    dateCertainty: "approximate", era: "united-monarchy", category: "other", testament: "OT",
    book: "2 Samuel", references: ["2 Samuel 13-18"],
    parents: ["david"],
    description: "Third son of David. Killed Amnon to avenge Tamar; later led a rebellion that briefly drove David from Jerusalem. Died caught by his hair in an oak.",
    tags: ["rebellion"]
  },
  {
    id: "solomon", name: "Solomon",
    birthYear: -1010, deathYear: -931, textualAge: null,
    dateCertainty: "firm", era: "united-monarchy", category: "king-judah", testament: "OT",
    book: "1 Kings", references: ["1 Kings 1-11", "Proverbs", "Ecclesiastes", "Song of Songs"], reignStart: -970, reignEnd: -931,
    parents: ["david", "bathsheba"], children: ["rehoboam"],
    description: "Third king of the United Monarchy, builder of the First Temple. Asked God for wisdom; renowned for proverbs and judgments. Late in life turned to idolatry through his foreign wives, leading to the kingdom's division.",
    tags: ["king", "first-temple", "wisdom"]
  }
);

// ---------- Kings of Judah (Thiele's chronology, 931-586 BC) ----------
BibleTimeline.people.push(
  {
    id: "rehoboam", name: "Rehoboam",
    birthYear: -972, deathYear: -913, textualAge: 58,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-judah", testament: "OT",
    book: "1 Kings", references: ["1 Kings 12-14", "2 Chronicles 10-12"], reignStart: -931, reignEnd: -913,
    parents: ["solomon"],
    description: "First king of Judah after the kingdom split. His harsh response to northern tribes' grievances triggered the secession of Israel under Jeroboam.",
    tags: ["king", "kingdom-split"]
  },
  {
    id: "abijah", name: "Abijah (Abijam)",
    birthYear: -940, deathYear: -911, textualAge: null,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-judah", testament: "OT",
    book: "1 Kings", references: ["1 Kings 15:1-8", "2 Chronicles 13"], reignStart: -913, reignEnd: -911,
    parents: ["rehoboam"], tags: ["king"]
  },
  {
    id: "asa", name: "Asa",
    birthYear: -930, deathYear: -870, textualAge: null,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-judah", testament: "OT",
    book: "1 Kings", references: ["1 Kings 15:9-24", "2 Chronicles 14-16"], reignStart: -911, reignEnd: -870,
    parents: ["abijah"],
    description: "Reforming king who removed idols and the queen mother Maacah. Later relied on Aram against Israel rather than the LORD; afflicted with a foot disease.",
    tags: ["king", "reformer"]
  },
  {
    id: "jehoshaphat", name: "Jehoshaphat",
    birthYear: -908, deathYear: -848, textualAge: 60,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-judah", testament: "OT",
    book: "1 Kings", references: ["1 Kings 22", "2 Chronicles 17-20"], reignStart: -873, reignEnd: -848,
    parents: ["asa"],
    description: "Devout king who allied (controversially) with Ahab. Sent Levites to teach Torah throughout Judah. Trusted in song and prayer to defeat invading Moab and Ammon.",
    tags: ["king", "reformer"]
  },
  {
    id: "jehoram-judah", name: "Jehoram (of Judah)",
    birthYear: -882, deathYear: -841, textualAge: 40,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-judah", testament: "OT",
    book: "2 Kings", references: ["2 Kings 8:16-24", "2 Chronicles 21"], reignStart: -848, reignEnd: -841,
    parents: ["jehoshaphat"], spouses: ["athaliah"],
    description: "Married Athaliah, daughter of Ahab and Jezebel; introduced Baal worship to Judah. Killed his brothers; died of an incurable bowel disease.",
    tags: ["king"]
  },
  {
    id: "ahaziah-judah", name: "Ahaziah (of Judah)",
    birthYear: -863, deathYear: -841, textualAge: 22,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-judah", testament: "OT",
    book: "2 Kings", references: ["2 Kings 8:25 - 9:29", "2 Chronicles 22"], reignStart: -841, reignEnd: -841,
    parents: ["jehoram-judah", "athaliah"],
    description: "Reigned one year. Killed by Jehu during his purge of the house of Ahab.",
    tags: ["king"]
  },
  {
    id: "athaliah", name: "Athaliah",
    birthYear: -870, deathYear: -835, textualAge: null,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-judah", testament: "OT",
    book: "2 Kings", references: ["2 Kings 11", "2 Chronicles 22-23"], reignStart: -841, reignEnd: -835,
    parents: ["ahab", "jezebel"], spouses: ["jehoram-judah"],
    description: "Only reigning queen of Judah. Daughter of Ahab and Jezebel. After her son's death she massacred the royal family and seized the throne; overthrown when her grandson Joash was revealed.",
    tags: ["queen", "usurper"]
  },
  {
    id: "joash", name: "Joash (Jehoash) of Judah",
    birthYear: -842, deathYear: -796, textualAge: 47,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-judah", testament: "OT",
    book: "2 Kings", references: ["2 Kings 11-12", "2 Chronicles 22-24"], reignStart: -835, reignEnd: -796,
    parents: ["ahaziah-judah"],
    description: "Hidden in the temple as a baby by his aunt Jehosheba; crowned at age seven. Repaired the temple under the priest Jehoiada; turned to idolatry after Jehoiada's death and was assassinated.",
    tags: ["king", "boy-king"]
  },
  {
    id: "amaziah", name: "Amaziah",
    birthYear: -825, deathYear: -767, textualAge: 54,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-judah", testament: "OT",
    book: "2 Kings", references: ["2 Kings 14:1-22", "2 Chronicles 25"], reignStart: -796, reignEnd: -767,
    parents: ["joash"],
    description: "Defeated Edom, then worshiped Edomite gods. Provoked a disastrous war with Israel; assassinated at Lachish.",
    tags: ["king"]
  },
  {
    id: "uzziah", name: "Uzziah (Azariah)",
    birthYear: -806, deathYear: -740, textualAge: 68,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-judah", testament: "OT",
    book: "2 Kings", references: ["2 Kings 15:1-7", "2 Chronicles 26", "Isaiah 6:1"],
    reignStart: -792, reignEnd: -740,
    parents: ["amaziah"],
    description: "Long, prosperous reign. Modernized the army and engineering. Struck with leprosy after presuming to burn incense in the temple. Died the year of Isaiah's vision.",
    tags: ["king", "leprosy"]
  },
  {
    id: "jotham", name: "Jotham",
    birthYear: -765, deathYear: -732, textualAge: 41,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-judah", testament: "OT",
    book: "2 Kings", references: ["2 Kings 15:32-38", "2 Chronicles 27"], reignStart: -750, reignEnd: -732,
    parents: ["uzziah"], tags: ["king"]
  },
  {
    id: "ahaz", name: "Ahaz",
    birthYear: -752, deathYear: -716, textualAge: 36,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-judah", testament: "OT",
    book: "2 Kings", references: ["2 Kings 16", "2 Chronicles 28", "Isaiah 7"], reignStart: -732, reignEnd: -716,
    parents: ["jotham"], children: ["hezekiah"],
    description: "Refused Isaiah's sign, becoming the foil for the Immanuel prophecy. Submitted Judah to Assyria; sacrificed his son in fire.",
    tags: ["king", "vassal"]
  },
  {
    id: "hezekiah", name: "Hezekiah",
    birthYear: -741, deathYear: -687, textualAge: 54,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-judah", testament: "OT",
    book: "2 Kings", references: ["2 Kings 18-20", "2 Chronicles 29-32", "Isaiah 36-39"],
    reignStart: -716, reignEnd: -687,
    parents: ["ahaz"], children: ["manasseh"],
    description: "Reforming king who centralized worship in Jerusalem and dug the Siloam tunnel. Trusted God during Sennacherib's siege (701 BC); the Assyrian army was destroyed. Granted fifteen extra years after illness.",
    tags: ["king", "reformer", "siloam-tunnel", "assyrian-crisis"]
  },
  {
    id: "manasseh", name: "Manasseh",
    birthYear: -709, deathYear: -642, textualAge: 67,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-judah", testament: "OT",
    book: "2 Kings", references: ["2 Kings 21:1-18", "2 Chronicles 33"], reignStart: -697, reignEnd: -642,
    parents: ["hezekiah"],
    description: "Longest-reigning king of Judah (55 years). Reversed his father's reforms and led Judah into severe idolatry. Taken in chains to Babylon; repented and reformed before his death.",
    tags: ["king", "longest-reign"]
  },
  {
    id: "amon", name: "Amon",
    birthYear: -664, deathYear: -640, textualAge: 24,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-judah", testament: "OT",
    book: "2 Kings", references: ["2 Kings 21:19-26", "2 Chronicles 33:21-25"], reignStart: -642, reignEnd: -640,
    parents: ["manasseh"], tags: ["king"]
  },
  {
    id: "josiah", name: "Josiah",
    birthYear: -648, deathYear: -609, textualAge: 39,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-judah", testament: "OT",
    book: "2 Kings", references: ["2 Kings 22-23", "2 Chronicles 34-35"], reignStart: -640, reignEnd: -609,
    parents: ["amon"],
    description: "Greatest reforming king. Crowned at eight; began purging idolatry at sixteen. Found the Book of the Law in the temple, read it publicly, and renewed the covenant. Killed at Megiddo trying to block Pharaoh Neco.",
    tags: ["king", "reformer", "book-of-the-law"]
  },
  {
    id: "jehoahaz-judah", name: "Jehoahaz (of Judah)",
    birthYear: -632, deathYear: -608, textualAge: null,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-judah", testament: "OT",
    book: "2 Kings", references: ["2 Kings 23:31-33"], reignStart: -609, reignEnd: -609,
    parents: ["josiah"],
    description: "Reigned three months. Deposed by Pharaoh Neco and taken to Egypt, where he died.",
    tags: ["king"]
  },
  {
    id: "jehoiakim", name: "Jehoiakim",
    birthYear: -634, deathYear: -598, textualAge: 36,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-judah", testament: "OT",
    book: "2 Kings", references: ["2 Kings 23:34 - 24:7", "Jeremiah 22", "Jeremiah 36"],
    reignStart: -609, reignEnd: -598,
    parents: ["josiah"],
    description: "Vassal of Egypt and then Babylon. Cut up and burned Jeremiah's scroll. Died as Nebuchadnezzar approached Jerusalem.",
    tags: ["king", "babylonian-vassal"]
  },
  {
    id: "jehoiachin", name: "Jehoiachin (Jeconiah)",
    birthYear: -616, deathYear: -560, textualAge: null,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-judah", testament: "OT",
    book: "2 Kings", references: ["2 Kings 24:8-17", "2 Kings 25:27-30", "Matthew 1:11-12"],
    reignStart: -598, reignEnd: -597,
    parents: ["jehoiakim"],
    description: "Reigned three months before surrendering to Nebuchadnezzar. Exiled to Babylon, eventually released from prison by Evil-Merodach. Listed in the genealogy of Jesus.",
    tags: ["king", "exile", "messianic-line"]
  },
  {
    id: "zedekiah", name: "Zedekiah",
    birthYear: -618, deathYear: -586, textualAge: null,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-judah", testament: "OT",
    book: "2 Kings", references: ["2 Kings 24:17 - 25:7", "Jeremiah 32", "Jeremiah 39", "Jeremiah 52"],
    reignStart: -597, reignEnd: -586,
    parents: ["josiah"],
    description: "Last king of Judah, installed by Nebuchadnezzar. Rebelled against Babylon; saw his sons killed and his eyes put out before being taken in chains to Babylon when Jerusalem fell.",
    tags: ["king", "last-king-judah", "fall-of-jerusalem"]
  }
);

// ---------- Kings of Israel (Northern Kingdom, 931-722 BC) ----------
BibleTimeline.people.push(
  {
    id: "jeroboam-i", name: "Jeroboam I",
    birthYear: -990, deathYear: -910, textualAge: null,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-israel", testament: "OT",
    book: "1 Kings", references: ["1 Kings 11:26 - 14:20"], reignStart: -931, reignEnd: -910,
    children: ["nadab"],
    description: "First king of the Northern Kingdom. Set up golden calves at Bethel and Dan to keep his people from worshiping in Jerusalem - 'the sin of Jeroboam' that the rest of Kings repeatedly references.",
    tags: ["king", "first-king-israel", "golden-calves"]
  },
  {
    id: "nadab", name: "Nadab",
    birthYear: -940, deathYear: -909, textualAge: null,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-israel", testament: "OT",
    book: "1 Kings", references: ["1 Kings 15:25-31"], reignStart: -910, reignEnd: -909,
    parents: ["jeroboam-i"], tags: ["king", "assassinated"]
  },
  {
    id: "baasha", name: "Baasha",
    birthYear: -940, deathYear: -886, textualAge: null,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-israel", testament: "OT",
    book: "1 Kings", references: ["1 Kings 15:27 - 16:7"], reignStart: -909, reignEnd: -886,
    children: ["elah"], tags: ["king", "usurper"]
  },
  {
    id: "elah", name: "Elah",
    birthYear: -910, deathYear: -885, textualAge: null,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-israel", testament: "OT",
    book: "1 Kings", references: ["1 Kings 16:8-14"], reignStart: -886, reignEnd: -885,
    parents: ["baasha"], tags: ["king", "assassinated"]
  },
  {
    id: "zimri", name: "Zimri",
    birthYear: -915, deathYear: -885, textualAge: null,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-israel", testament: "OT",
    book: "1 Kings", references: ["1 Kings 16:9-20"], reignStart: -885, reignEnd: -885,
    description: "Reigned seven days. Burned himself in the palace when Omri besieged Tirzah.",
    tags: ["king", "shortest-reign", "suicide"]
  },
  {
    id: "omri", name: "Omri",
    birthYear: -915, deathYear: -874, textualAge: null,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-israel", testament: "OT",
    book: "1 Kings", references: ["1 Kings 16:15-28"], reignStart: -885, reignEnd: -874,
    children: ["ahab"],
    description: "Founder of the Omride dynasty; built Samaria as Israel's capital. Mentioned in Assyrian and Moabite inscriptions; one of the most archaeologically attested kings.",
    tags: ["king", "samaria", "omrides"]
  },
  {
    id: "ahab", name: "Ahab",
    birthYear: -895, deathYear: -853, textualAge: null,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-israel", testament: "OT",
    book: "1 Kings", references: ["1 Kings 16:29 - 22:40"], reignStart: -874, reignEnd: -853,
    parents: ["omri"], spouses: ["jezebel"], children: ["ahaziah-israel", "joram-israel", "athaliah"],
    description: "Most powerful king of the Northern Kingdom; opponent of Elijah. Married Jezebel and promoted Baal worship. Fought at Qarqar (853 BC, attested in Assyrian records). Killed by a stray arrow at Ramoth-Gilead.",
    tags: ["king", "omrides", "baal-worship"]
  },
  {
    id: "jezebel", name: "Jezebel",
    birthYear: -890, deathYear: -841, textualAge: null,
    dateCertainty: "firm", era: "divided-monarchy", category: "queen", testament: "OT",
    book: "1 Kings", references: ["1 Kings 16-21", "2 Kings 9:30-37"],
    spouses: ["ahab"], children: ["ahaziah-israel", "joram-israel", "athaliah"],
    description: "Phoenician princess, daughter of Ethbaal of Sidon. Imported Baal and Asherah worship; killed prophets of YHWH. Thrown from a window by Jehu's order, eaten by dogs.",
    tags: ["queen", "phoenician", "baal-worship"]
  },
  {
    id: "ahaziah-israel", name: "Ahaziah (of Israel)",
    birthYear: -875, deathYear: -852, textualAge: null,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-israel", testament: "OT",
    book: "1 Kings", references: ["1 Kings 22:51 - 2 Kings 1"], reignStart: -853, reignEnd: -852,
    parents: ["ahab", "jezebel"], tags: ["king"]
  },
  {
    id: "joram-israel", name: "Joram (Jehoram of Israel)",
    birthYear: -875, deathYear: -841, textualAge: null,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-israel", testament: "OT",
    book: "2 Kings", references: ["2 Kings 1:17 - 9:26"], reignStart: -852, reignEnd: -841,
    parents: ["ahab", "jezebel"], tags: ["king", "omrides"]
  },
  {
    id: "jehu", name: "Jehu",
    birthYear: -880, deathYear: -814, textualAge: null,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-israel", testament: "OT",
    book: "2 Kings", references: ["2 Kings 9-10"], reignStart: -841, reignEnd: -814,
    description: "Anointed by Elisha to destroy the house of Ahab. Killed Joram, Ahaziah of Judah, and Jezebel; massacred Baal worshipers. Founder of a four-generation dynasty. Depicted on the Black Obelisk of Shalmaneser III.",
    tags: ["king", "purge-of-baal"]
  },
  {
    id: "jehoahaz-israel", name: "Jehoahaz (of Israel)",
    birthYear: -855, deathYear: -798, textualAge: null,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-israel", testament: "OT",
    book: "2 Kings", references: ["2 Kings 13:1-9"], reignStart: -814, reignEnd: -798,
    parents: ["jehu"], tags: ["king"]
  },
  {
    id: "jehoash-israel", name: "Jehoash (of Israel)",
    birthYear: -830, deathYear: -782, textualAge: null,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-israel", testament: "OT",
    book: "2 Kings", references: ["2 Kings 13:10 - 14:16"], reignStart: -798, reignEnd: -782,
    parents: ["jehoahaz-israel"], children: ["jeroboam-ii"], tags: ["king"]
  },
  {
    id: "jeroboam-ii", name: "Jeroboam II",
    birthYear: -810, deathYear: -753, textualAge: null,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-israel", testament: "OT",
    book: "2 Kings", references: ["2 Kings 14:23-29", "Amos", "Hosea"],
    reignStart: -793, reignEnd: -753,
    parents: ["jehoash-israel"],
    description: "Long, prosperous reign in which Israel reached its greatest territorial extent since Solomon. Setting for the prophets Amos and Hosea, who denounced its social injustice and idolatry.",
    tags: ["king", "prosperity"]
  },
  {
    id: "menahem", name: "Menahem",
    birthYear: -800, deathYear: -742, textualAge: null,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-israel", testament: "OT",
    book: "2 Kings", references: ["2 Kings 15:14-22"], reignStart: -752, reignEnd: -742,
    description: "Paid tribute to Tiglath-Pileser III ('Pul') of Assyria - the moment Israel became an Assyrian vassal.",
    tags: ["king", "assyrian-vassal"]
  },
  {
    id: "pekah", name: "Pekah",
    birthYear: -780, deathYear: -732, textualAge: null,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-israel", testament: "OT",
    book: "2 Kings", references: ["2 Kings 15:25-31", "Isaiah 7"], reignStart: -752, reignEnd: -732,
    description: "Allied with Aram against Judah (the Syro-Ephraimite war), prompting Ahaz to call in Assyria. Lost much of the northern territory to Tiglath-Pileser III.",
    tags: ["king", "syro-ephraimite-war"]
  },
  {
    id: "hoshea", name: "Hoshea",
    birthYear: -770, deathYear: -720, textualAge: null,
    dateCertainty: "firm", era: "divided-monarchy", category: "king-israel", testament: "OT",
    book: "2 Kings", references: ["2 Kings 17"], reignStart: -732, reignEnd: -722,
    description: "Last king of Israel. Rebelled against Assyria and sought help from Egypt; deposed when Shalmaneser V besieged Samaria. The city fell in 722 BC under Sargon II, ending the Northern Kingdom.",
    tags: ["king", "last-king-israel", "fall-of-samaria"]
  }
);

// ---------- Prophets (canonical and non-writing) ----------
BibleTimeline.people.push(
  {
    id: "elijah", name: "Elijah",
    birthYear: -900, deathYear: -849, textualAge: null,
    dateCertainty: "approximate", era: "divided-monarchy", category: "prophet", testament: "OT",
    book: "1 Kings", references: ["1 Kings 17 - 2 Kings 2", "Malachi 4:5", "Matthew 17"],
    description: "Tishbite prophet who confronted Ahab and Jezebel. Defeated the prophets of Baal at Carmel; raised the widow's son; heard the 'still small voice' at Horeb. Taken up to heaven in a whirlwind. Appears with Moses at the Transfiguration.",
    tags: ["prophet", "non-writing", "translated", "carmel"]
  },
  {
    id: "elisha", name: "Elisha",
    birthYear: -890, deathYear: -800, textualAge: null,
    dateCertainty: "approximate", era: "divided-monarchy", category: "prophet", testament: "OT",
    book: "2 Kings", references: ["1 Kings 19:16-21", "2 Kings 2-13"],
    description: "Successor of Elijah, given a double portion of his spirit. Performed miracles for ordinary people - the widow's oil, the Shunammite's son, Naaman's leprosy, the floating axe-head.",
    tags: ["prophet", "non-writing", "miracles"]
  },
  {
    id: "obadiah", name: "Obadiah (prophet)",
    birthYear: -880, deathYear: -840, textualAge: null,
    dateCertainty: "approximate", era: "divided-monarchy", category: "prophet", testament: "OT",
    book: "Obadiah", references: ["Book of Obadiah"],
    description: "Shortest book in the OT (21 verses). Prophesies against Edom for its complicity in Jerusalem's distress. Date debated; likely after the fall of Jerusalem in 586 BC, but possibly earlier.",
    tags: ["prophet", "minor-prophet", "edom"]
  },
  {
    id: "joel", name: "Joel",
    birthYear: -850, deathYear: -800, textualAge: null,
    dateCertainty: "approximate", era: "divided-monarchy", category: "prophet", testament: "OT",
    book: "Joel", references: ["Book of Joel", "Acts 2:16-21"],
    description: "Minor prophet whose locust plague becomes the lens for the Day of the LORD. Quoted by Peter at Pentecost. Date highly uncertain (9th to 4th century BC).",
    tags: ["prophet", "minor-prophet", "day-of-the-lord"]
  },
  {
    id: "jonah", name: "Jonah",
    birthYear: -810, deathYear: -750, textualAge: null,
    dateCertainty: "approximate", era: "divided-monarchy", category: "prophet", testament: "OT",
    book: "Jonah", references: ["2 Kings 14:25", "Book of Jonah", "Matthew 12:39-41"],
    description: "Prophet from Gath-Hepher under Jeroboam II. Famous for fleeing God's call to preach to Nineveh, being swallowed by a great fish, and Nineveh's repentance.",
    tags: ["prophet", "minor-prophet", "nineveh"]
  },
  {
    id: "amos", name: "Amos",
    birthYear: -790, deathYear: -740, textualAge: null,
    dateCertainty: "approximate", era: "divided-monarchy", category: "prophet", testament: "OT",
    book: "Amos", references: ["Book of Amos"],
    description: "Shepherd from Tekoa who prophesied to the Northern Kingdom under Jeroboam II. Denounced social injustice: 'Let justice roll down like waters'.",
    tags: ["prophet", "minor-prophet", "social-justice"]
  },
  {
    id: "hosea", name: "Hosea",
    birthYear: -785, deathYear: -725, textualAge: null,
    dateCertainty: "approximate", era: "divided-monarchy", category: "prophet", testament: "OT",
    book: "Hosea", references: ["Book of Hosea"],
    description: "Last prophet to the Northern Kingdom before its fall. Married Gomer, an unfaithful wife, as a living parable of Israel's idolatry and God's covenant love.",
    tags: ["prophet", "minor-prophet", "northern-kingdom"]
  },
  {
    id: "isaiah", name: "Isaiah",
    birthYear: -765, deathYear: -695, textualAge: null,
    dateCertainty: "approximate", era: "divided-monarchy", category: "prophet", testament: "OT",
    book: "Isaiah", references: ["Book of Isaiah", "2 Kings 19-20", "2 Chronicles 32"],
    description: "Major prophet to Judah under Uzziah, Jotham, Ahaz and Hezekiah. Vision in the temple in the year Uzziah died (740 BC). Counselor to Hezekiah during the Assyrian crisis. Author of the Immanuel and Suffering Servant prophecies.",
    tags: ["prophet", "major-prophet", "messianic-prophecy"]
  },
  {
    id: "micah", name: "Micah",
    birthYear: -755, deathYear: -695, textualAge: null,
    dateCertainty: "approximate", era: "divided-monarchy", category: "prophet", testament: "OT",
    book: "Micah", references: ["Book of Micah", "Jeremiah 26:18", "Matthew 2:6"],
    description: "Contemporary of Isaiah. Foretold the destruction of Samaria and Jerusalem and named Bethlehem as the Messiah's birthplace.",
    tags: ["prophet", "minor-prophet", "messianic-prophecy"]
  },
  {
    id: "nahum", name: "Nahum",
    birthYear: -680, deathYear: -620, textualAge: null,
    dateCertainty: "approximate", era: "divided-monarchy", category: "prophet", testament: "OT",
    book: "Nahum", references: ["Book of Nahum"],
    description: "Prophet of judgment against Nineveh, written shortly before its fall in 612 BC.",
    tags: ["prophet", "minor-prophet", "nineveh"]
  },
  {
    id: "zephaniah", name: "Zephaniah",
    birthYear: -660, deathYear: -610, textualAge: null,
    dateCertainty: "approximate", era: "divided-monarchy", category: "prophet", testament: "OT",
    book: "Zephaniah", references: ["Book of Zephaniah"],
    description: "Prophesied during the reign of Josiah; helped prepare for Josiah's reform. Theme: the Day of the LORD.",
    tags: ["prophet", "minor-prophet", "day-of-the-lord"]
  },
  {
    id: "habakkuk", name: "Habakkuk",
    birthYear: -650, deathYear: -600, textualAge: null,
    dateCertainty: "approximate", era: "divided-monarchy", category: "prophet", testament: "OT",
    book: "Habakkuk", references: ["Book of Habakkuk", "Romans 1:17"],
    description: "Wrestled with God's use of the wicked Babylonians to judge Judah. Source of 'the righteous shall live by his faith'.",
    tags: ["prophet", "minor-prophet", "theodicy"]
  },
  {
    id: "jeremiah", name: "Jeremiah",
    birthYear: -645, deathYear: -580, textualAge: null,
    dateCertainty: "approximate", era: "divided-monarchy", category: "prophet", testament: "OT",
    book: "Jeremiah", references: ["Book of Jeremiah", "Lamentations"],
    description: "The 'weeping prophet'. Called as a youth in Josiah's reign; preached judgment for forty years through the fall of Jerusalem. Imprisoned, thrown into a cistern, and finally taken to Egypt against his will. Promised the New Covenant (Jer 31).",
    tags: ["prophet", "major-prophet", "new-covenant", "fall-of-jerusalem"]
  },
  {
    id: "ezekiel", name: "Ezekiel",
    birthYear: -622, deathYear: -570, textualAge: null,
    dateCertainty: "approximate", era: "exile", category: "prophet", testament: "OT",
    book: "Ezekiel", references: ["Book of Ezekiel"],
    description: "Priest exiled to Babylon in 597 BC. Prophesied to the exiles by the Chebar canal. Visions of God's chariot-throne, the dry bones, and the future temple.",
    tags: ["prophet", "major-prophet", "exile"]
  },
  {
    id: "daniel", name: "Daniel",
    birthYear: -620, deathYear: -535, textualAge: null,
    dateCertainty: "approximate", era: "exile", category: "prophet", testament: "OT",
    book: "Daniel", references: ["Book of Daniel"],
    description: "Judean noble exiled in 605 BC. Rose to high office under Nebuchadnezzar, Belshazzar, Darius the Mede and Cyrus. Interpreted dreams; survived the lions' den; received apocalyptic visions of the four kingdoms and the Son of Man.",
    tags: ["prophet", "exile", "apocalyptic", "babylon"]
  },
  {
    id: "haggai", name: "Haggai",
    birthYear: -570, deathYear: -510, textualAge: null,
    dateCertainty: "approximate", era: "post-exile", category: "prophet", testament: "OT",
    book: "Haggai", references: ["Book of Haggai", "Ezra 5-6"],
    description: "Post-exilic prophet who, with Zechariah, urged Zerubbabel and Joshua the High Priest to rebuild the Temple. Active in 520 BC.",
    tags: ["prophet", "minor-prophet", "post-exile", "second-temple"]
  },
  {
    id: "zechariah", name: "Zechariah (prophet)",
    birthYear: -565, deathYear: -500, textualAge: null,
    dateCertainty: "approximate", era: "post-exile", category: "prophet", testament: "OT",
    book: "Zechariah", references: ["Book of Zechariah", "Ezra 5-6"],
    description: "Contemporary of Haggai. Visions of the rebuilt temple, the Branch, and end-time Jerusalem. Heavily quoted in the Passion narratives.",
    tags: ["prophet", "minor-prophet", "post-exile", "messianic-prophecy"]
  },
  {
    id: "malachi", name: "Malachi",
    birthYear: -480, deathYear: -420, textualAge: null,
    dateCertainty: "approximate", era: "post-exile", category: "prophet", testament: "OT",
    book: "Malachi", references: ["Book of Malachi"],
    description: "Last of the Hebrew prophets, around the time of Nehemiah (~440 BC). Confronted priestly corruption and intermarriage; promised the coming of Elijah before the Day of the LORD.",
    tags: ["prophet", "minor-prophet", "post-exile", "last-prophet"]
  }
);

// ---------- Exile / Post-exile / Foreign rulers ----------
BibleTimeline.people.push(
  {
    id: "nebuchadnezzar", name: "Nebuchadnezzar II",
    birthYear: -634, deathYear: -562, textualAge: null,
    dateCertainty: "firm", era: "exile", category: "foreign-king", testament: "OT",
    book: "2 Kings", references: ["2 Kings 24-25", "Daniel 1-4", "Jeremiah 39", "Jeremiah 52"],
    reignStart: -605, reignEnd: -562,
    description: "King of Babylon. Defeated Egypt at Carchemish (605 BC), exiled Judah in three deportations, and destroyed Jerusalem and the First Temple in 586 BC. Featured prominently in Daniel.",
    tags: ["foreign-king", "babylon", "fall-of-jerusalem"]
  },
  {
    id: "belshazzar", name: "Belshazzar",
    birthYear: -600, deathYear: -539, textualAge: null,
    dateCertainty: "firm", era: "exile", category: "foreign-king", testament: "OT",
    book: "Daniel", references: ["Daniel 5", "Daniel 7-8"],
    description: "Co-regent of Babylon under his father Nabonidus. Saw the writing on the wall during a feast and was killed the night Babylon fell to Cyrus (539 BC).",
    tags: ["foreign-king", "babylon", "fall-of-babylon"]
  },
  {
    id: "cyrus", name: "Cyrus the Great",
    birthYear: -600, deathYear: -530, textualAge: null,
    dateCertainty: "firm", era: "post-exile", category: "foreign-king", testament: "OT",
    book: "Ezra", references: ["2 Chronicles 36:22-23", "Ezra 1", "Isaiah 44:28 - 45:1"],
    reignStart: -559, reignEnd: -530,
    description: "Founder of the Persian Empire. Conquered Babylon in 539 BC and issued the decree (538 BC) allowing the Jews to return and rebuild the temple. Called God's 'anointed' (messiah) by Isaiah.",
    tags: ["foreign-king", "persia", "return-from-exile"]
  },
  {
    id: "darius-i", name: "Darius I",
    birthYear: -550, deathYear: -486, textualAge: null,
    dateCertainty: "firm", era: "post-exile", category: "foreign-king", testament: "OT",
    book: "Ezra", references: ["Ezra 5-6", "Haggai", "Zechariah"],
    reignStart: -522, reignEnd: -486,
    description: "Persian king who confirmed Cyrus's decree, enabling completion of the Second Temple in 516 BC.",
    tags: ["foreign-king", "persia", "second-temple"]
  },
  {
    id: "xerxes", name: "Xerxes I (Ahasuerus)",
    birthYear: -518, deathYear: -465, textualAge: null,
    dateCertainty: "firm", era: "post-exile", category: "foreign-king", testament: "OT",
    book: "Esther", references: ["Book of Esther"],
    reignStart: -486, reignEnd: -465,
    spouses: ["esther"],
    description: "Persian king of the Esther story (the Hebrew 'Ahasuerus'). Defeated by Greece at Salamis (480 BC).",
    tags: ["foreign-king", "persia", "purim"]
  },
  {
    id: "artaxerxes", name: "Artaxerxes I",
    birthYear: -500, deathYear: -424, textualAge: null,
    dateCertainty: "firm", era: "post-exile", category: "foreign-king", testament: "OT",
    book: "Ezra", references: ["Ezra 7", "Nehemiah 2"],
    reignStart: -465, reignEnd: -424,
    description: "Persian king who commissioned Ezra (458 BC) and Nehemiah (445 BC) to lead returns to Judah.",
    tags: ["foreign-king", "persia"]
  },
  {
    id: "zerubbabel", name: "Zerubbabel",
    birthYear: -570, deathYear: -510, textualAge: null,
    dateCertainty: "approximate", era: "post-exile", category: "other", testament: "OT",
    book: "Ezra", references: ["Ezra 2-5", "Haggai", "Zechariah 4", "Matthew 1:12"],
    parents: ["shealtiel"],
    description: "Davidic prince who led the first return from Babylon (538 BC). Laid the foundation of the Second Temple. Listed in the genealogy of Jesus.",
    tags: ["governor", "davidic-line", "second-temple", "messianic-line"]
  },
  {
    id: "joshua-hp", name: "Joshua the High Priest",
    birthYear: -570, deathYear: -510, textualAge: null,
    dateCertainty: "approximate", era: "post-exile", category: "priest", testament: "OT",
    book: "Ezra", references: ["Ezra 3", "Haggai", "Zechariah 3"],
    description: "First post-exilic High Priest. Partnered with Zerubbabel in rebuilding the Temple.",
    tags: ["priest", "high-priest", "second-temple"]
  },
  {
    id: "ezra", name: "Ezra",
    birthYear: -500, deathYear: -440, textualAge: null,
    dateCertainty: "approximate", era: "post-exile", category: "priest", testament: "OT",
    book: "Ezra", references: ["Ezra 7-10", "Nehemiah 8"],
    description: "Priest and scribe who led a return in 458 BC. Reformed Judah's worship and confronted intermarriage. Read the Torah publicly at the Water Gate. Traditionally credited with shaping the Hebrew canon.",
    tags: ["priest", "scribe", "post-exile", "reformer"]
  },
  {
    id: "nehemiah", name: "Nehemiah",
    birthYear: -480, deathYear: -420, textualAge: null,
    dateCertainty: "approximate", era: "post-exile", category: "other", testament: "OT",
    book: "Nehemiah", references: ["Book of Nehemiah"],
    description: "Cupbearer to Artaxerxes who returned in 445 BC to rebuild Jerusalem's walls in 52 days. Governor of Judah; instituted social and religious reforms.",
    tags: ["governor", "post-exile", "wall-rebuilding"]
  },
  {
    id: "esther", name: "Esther",
    birthYear: -510, deathYear: -460, textualAge: null,
    dateCertainty: "approximate", era: "post-exile", category: "queen", testament: "OT",
    book: "Esther", references: ["Book of Esther"],
    spouses: ["xerxes"],
    description: "Jewish queen of Persia. Risked her life to expose Haman's plot to exterminate the Jews. Origin of the festival of Purim.",
    tags: ["queen", "persia", "purim"]
  },
  {
    id: "mordecai", name: "Mordecai",
    birthYear: -520, deathYear: -460, textualAge: null,
    dateCertainty: "approximate", era: "post-exile", category: "other", testament: "OT",
    book: "Esther", references: ["Book of Esther"],
    description: "Cousin and guardian of Esther. Foiled an assassination plot against the king and led the Jewish people in resisting Haman.",
    tags: ["persia", "purim"]
  }
);

// ---------- New Testament era ----------
BibleTimeline.people.push(
  {
    id: "herod-the-great", name: "Herod the Great",
    birthYear: -73, deathYear: -4, textualAge: null,
    dateCertainty: "firm", era: "second-temple", category: "foreign-king", testament: "NT",
    book: "Matthew", references: ["Matthew 2", "Luke 1:5"], reignStart: -37, reignEnd: -4,
    children: ["herod-archelaus", "herod-antipas", "philip-tetrarch"],
    description: "Idumean king of Judea installed by Rome. Massive builder (Second Temple expansion, Masada, Caesarea Maritima, Herodium). Ordered the massacre of the innocents in Bethlehem.",
    tags: ["herodian", "rome", "massacre-of-innocents"]
  },
  {
    id: "augustus", name: "Caesar Augustus",
    birthYear: -63, deathYear: 14, textualAge: 75,
    dateCertainty: "firm", era: "second-temple", category: "foreign-king", testament: "NT",
    book: "Luke", references: ["Luke 2:1"], reignStart: -27, reignEnd: 14,
    description: "First Roman emperor. Ordered the census that brought Joseph and Mary to Bethlehem.",
    tags: ["rome", "emperor"]
  },
  {
    id: "tiberius", name: "Tiberius",
    birthYear: -42, deathYear: 37, textualAge: 79,
    dateCertainty: "firm", era: "second-temple", category: "foreign-king", testament: "NT",
    book: "Luke", references: ["Luke 3:1"], reignStart: 14, reignEnd: 37,
    description: "Second Roman emperor; reigning during Jesus' ministry and crucifixion.",
    tags: ["rome", "emperor"]
  },
  {
    id: "herod-antipas", name: "Herod Antipas",
    birthYear: -20, deathYear: 39, textualAge: null,
    dateCertainty: "firm", era: "second-temple", category: "foreign-king", testament: "NT",
    book: "Mark", references: ["Mark 6:14-29", "Luke 3:1", "Luke 23:7-12"],
    reignStart: -4, reignEnd: 39,
    parents: ["herod-the-great"],
    description: "Tetrarch of Galilee and Perea. Beheaded John the Baptist; questioned Jesus during the Passion.",
    tags: ["herodian", "rome"]
  },
  {
    id: "pontius-pilate", name: "Pontius Pilate",
    birthYear: -10, deathYear: 38, textualAge: null,
    dateCertainty: "firm", era: "second-temple", category: "other", testament: "NT",
    book: "Matthew", references: ["Matthew 27", "Mark 15", "Luke 23", "John 18-19"],
    description: "Roman prefect of Judea (26-36 AD) who ordered the crucifixion of Jesus. Known from Tacitus and a stone inscription found at Caesarea Maritima.",
    tags: ["rome", "prefect", "passion"]
  },
  {
    id: "caiaphas", name: "Caiaphas",
    birthYear: -14, deathYear: 46, textualAge: null,
    dateCertainty: "firm", era: "second-temple", category: "priest", testament: "NT",
    book: "Matthew", references: ["Matthew 26:57-68", "John 11:49-52", "John 18", "Acts 4:6"],
    description: "Jewish High Priest 18-36 AD. Presided over the trial of Jesus. His ossuary may have been found in Jerusalem.",
    tags: ["high-priest", "passion"]
  },
  {
    id: "annas", name: "Annas",
    birthYear: -22, deathYear: 40, textualAge: null,
    dateCertainty: "firm", era: "second-temple", category: "priest", testament: "NT",
    book: "John", references: ["Luke 3:2", "John 18:13-24", "Acts 4:6"],
    description: "Former High Priest (6-15 AD), still influential as Caiaphas's father-in-law. Jesus was first taken to Annas after his arrest.",
    tags: ["high-priest", "passion"]
  },
  {
    id: "zechariah-priest", name: "Zechariah (priest)",
    birthYear: -50, deathYear: 4, textualAge: null,
    dateCertainty: "approximate", era: "second-temple", category: "priest", testament: "NT",
    book: "Luke", references: ["Luke 1"],
    spouses: ["elizabeth"], children: ["john-baptist"],
    description: "Priest of the division of Abijah. Struck mute when he doubted Gabriel's announcement of John's birth.",
    tags: ["priest"]
  },
  {
    id: "elizabeth", name: "Elizabeth",
    birthYear: -45, deathYear: null, textualAge: null,
    dateCertainty: "approximate", era: "second-temple", category: "matriarch", testament: "NT",
    book: "Luke", references: ["Luke 1"],
    spouses: ["zechariah-priest"], children: ["john-baptist"],
    description: "Mother of John the Baptist; relative of Mary. Conceived in old age.",
    tags: []
  },
  {
    id: "john-baptist", name: "John the Baptist",
    birthYear: -5, deathYear: 30, textualAge: null,
    dateCertainty: "approximate", era: "nt-gospels", category: "prophet", testament: "NT",
    book: "Matthew", references: ["Matthew 3", "Matthew 14", "Mark 1", "Luke 1", "Luke 3", "John 1"],
    parents: ["zechariah-priest", "elizabeth"],
    description: "Prophet and forerunner of Jesus. Baptized in the Jordan, including Jesus himself. Beheaded by Herod Antipas after rebuking his marriage to Herodias.",
    tags: ["prophet", "baptizer", "forerunner"]
  },
  {
    id: "mary", name: "Mary (mother of Jesus)",
    birthYear: -20, deathYear: 50, textualAge: null,
    dateCertainty: "approximate", era: "nt-gospels", category: "matriarch", testament: "NT",
    book: "Luke", references: ["Matthew 1-2", "Luke 1-2", "John 2", "John 19:25-27", "Acts 1:14"],
    spouses: ["joseph-husband-of-mary"], children: ["jesus", "james-just"],
    description: "Mother of Jesus. Visited by Gabriel; conceived by the Holy Spirit. Sang the Magnificat. Stood at the cross; among the disciples at Pentecost.",
    tags: ["theotokos", "magnificat"]
  },
  {
    id: "joseph-husband-of-mary", name: "Joseph (husband of Mary)",
    birthYear: -25, deathYear: 18, textualAge: null,
    dateCertainty: "approximate", era: "nt-gospels", category: "patriarch", testament: "NT",
    book: "Matthew", references: ["Matthew 1-2", "Luke 1-2"],
    spouses: ["mary"],
    description: "Carpenter from Nazareth, of Davidic descent. Took Mary as his wife despite her pregnancy after an angelic dream. Last mentioned when Jesus was twelve.",
    tags: ["davidic-line", "carpenter"]
  },
  {
    id: "jesus", name: "Jesus of Nazareth",
    birthYear: -5, deathYear: 30, textualAge: 33,
    dateCertainty: "firm", era: "nt-gospels", category: "messiah", testament: "NT",
    book: "Matthew", references: ["Four Gospels", "Acts 1", "Romans 1:1-4", "Hebrews", "Revelation"],
    parents: ["mary", "joseph-husband-of-mary"],
    description: "Central figure of Christianity. Born in Bethlehem, raised in Nazareth; began public ministry around age 30 (~AD 27). Crucified under Pontius Pilate around AD 30. Christians confess his bodily resurrection on the third day and ascension forty days later.",
    tags: ["messiah", "incarnation", "passion", "resurrection"]
  },
  {
    id: "peter", name: "Peter (Simon)",
    birthYear: -1, deathYear: 65, textualAge: null,
    dateCertainty: "approximate", era: "nt-gospels", category: "apostle", testament: "NT",
    book: "Matthew", references: ["Four Gospels", "Acts 1-12", "1 Peter", "2 Peter"],
    description: "Galilean fisherman; leader of the Twelve. Confessed Jesus as the Christ; denied him three times; restored after the resurrection. First to preach to Gentiles (Cornelius). Tradition: martyred in Rome under Nero (~64-67 AD).",
    tags: ["apostle", "twelve", "rock", "martyr"]
  },
  {
    id: "andrew", name: "Andrew",
    birthYear: -3, deathYear: 60, textualAge: null,
    dateCertainty: "approximate", era: "nt-gospels", category: "apostle", testament: "NT",
    book: "John", references: ["Matthew 4:18-20", "John 1:35-42", "John 6:8-9"],
    description: "Brother of Peter; first-called of the Twelve; brought Peter to Jesus.",
    tags: ["apostle", "twelve"]
  },
  {
    id: "james-zebedee", name: "James son of Zebedee",
    birthYear: -1, deathYear: 44, textualAge: null,
    dateCertainty: "firm", era: "nt-gospels", category: "apostle", testament: "NT",
    book: "Matthew", references: ["Matthew 4:21-22", "Matthew 17:1", "Acts 12:2"],
    parents: ["zebedee", "salome"],
    description: "Brother of John; one of the inner three with Peter. Killed by Herod Agrippa I in 44 AD - the first apostle to be martyred.",
    tags: ["apostle", "twelve", "martyr", "first-apostle-martyr"]
  },
  {
    id: "john-apostle", name: "John the Apostle",
    birthYear: 6, deathYear: 100, textualAge: null,
    dateCertainty: "approximate", era: "nt-gospels", category: "apostle", testament: "NT",
    book: "John", references: ["Four Gospels", "Acts", "1-3 John", "Revelation"],
    parents: ["zebedee", "salome"],
    description: "Brother of James; 'the disciple whom Jesus loved'. Took Mary into his home after the crucifixion. Traditionally author of the Gospel, three letters and Revelation. Exiled to Patmos; the only apostle thought to have died of old age.",
    tags: ["apostle", "twelve", "evangelist", "patmos"]
  },
  {
    id: "matthew", name: "Matthew (Levi)",
    birthYear: 0, deathYear: 70, textualAge: null,
    dateCertainty: "approximate", era: "nt-gospels", category: "apostle", testament: "NT",
    book: "Matthew", references: ["Matthew 9:9-13", "Mark 2:13-17", "Luke 5:27-32"],
    description: "Tax collector called by Jesus from his booth in Capernaum. Traditional author of the First Gospel.",
    tags: ["apostle", "twelve", "evangelist", "tax-collector"]
  },
  {
    id: "thomas", name: "Thomas",
    birthYear: 0, deathYear: 72, textualAge: null,
    dateCertainty: "approximate", era: "nt-gospels", category: "apostle", testament: "NT",
    book: "John", references: ["John 11:16", "John 14:5", "John 20:24-29"],
    description: "'Doubting Thomas'. Confessed the risen Jesus as 'My Lord and my God!'. Tradition has him evangelizing India.",
    tags: ["apostle", "twelve"]
  },
  {
    id: "philip-apostle", name: "Philip (apostle)",
    birthYear: 0, deathYear: 80, textualAge: null,
    dateCertainty: "approximate", era: "nt-gospels", category: "apostle", testament: "NT",
    book: "John", references: ["John 1:43-46", "John 6:5-7", "John 14:8-9"],
    description: "Apostle from Bethsaida; brought Nathanael to Jesus.",
    tags: ["apostle", "twelve"]
  },
  {
    id: "bartholomew", name: "Bartholomew (Nathanael)",
    birthYear: 0, deathYear: 70, textualAge: null,
    dateCertainty: "approximate", era: "nt-gospels", category: "apostle", testament: "NT",
    book: "John", references: ["John 1:45-51", "Matthew 10:3"],
    description: "Likely the same as Nathanael of Cana, called 'an Israelite in whom there is no deceit'.",
    tags: ["apostle", "twelve"]
  },
  {
    id: "judas-iscariot", name: "Judas Iscariot",
    birthYear: 0, deathYear: 30, textualAge: null,
    dateCertainty: "firm", era: "nt-gospels", category: "apostle", testament: "NT",
    book: "Matthew", references: ["Matthew 26-27", "John 13", "Acts 1:18-19"],
    description: "Treasurer of the Twelve. Betrayed Jesus for thirty pieces of silver and died by suicide.",
    tags: ["apostle", "twelve", "betrayer"]
  },
  {
    id: "matthias", name: "Matthias",
    birthYear: 0, deathYear: 80, textualAge: null,
    dateCertainty: "approximate", era: "early-church", category: "apostle", testament: "NT",
    book: "Acts", references: ["Acts 1:21-26"],
    description: "Chosen by lot to replace Judas Iscariot among the Twelve.",
    tags: ["apostle", "twelve", "replacement"]
  },
  {
    id: "stephen", name: "Stephen",
    birthYear: 5, deathYear: 35, textualAge: null,
    dateCertainty: "approximate", era: "early-church", category: "other", testament: "NT",
    book: "Acts", references: ["Acts 6-7"],
    description: "First of the seven deacons and first Christian martyr. Stoned in Jerusalem after a long speech recounting Israel's history; Saul of Tarsus approved.",
    tags: ["deacon", "first-martyr"]
  },
  {
    id: "paul", name: "Paul (Saul of Tarsus)",
    birthYear: 5, deathYear: 67, textualAge: null,
    dateCertainty: "firm", era: "early-church", category: "apostle", testament: "NT",
    book: "Acts", references: ["Acts 7-28", "Romans through Philemon"],
    description: "Pharisee who persecuted the church before encountering the risen Christ on the Damascus road (~AD 34). Apostle to the Gentiles. Made three missionary journeys; wrote ~13 NT letters; appealed to Caesar and was taken to Rome. Tradition: beheaded under Nero ~AD 67.",
    tags: ["apostle", "missionary", "epistle-writer", "martyr"]
  },
  {
    id: "barnabas", name: "Barnabas",
    birthYear: 0, deathYear: 62, textualAge: null,
    dateCertainty: "approximate", era: "early-church", category: "apostle", testament: "NT",
    book: "Acts", references: ["Acts 4:36", "Acts 9:27", "Acts 11-15"],
    description: "Levite from Cyprus; sponsored Paul to the Jerusalem apostles. Companion of Paul on the first missionary journey. Cousin of John Mark.",
    tags: ["missionary", "encourager"]
  },
  {
    id: "john-mark", name: "John Mark",
    birthYear: 5, deathYear: 68, textualAge: null,
    dateCertainty: "approximate", era: "early-church", category: "other", testament: "NT",
    book: "Mark", references: ["Acts 12:12", "Acts 13:13", "Acts 15:36-41", "1 Peter 5:13"],
    description: "Cousin of Barnabas; companion of Paul, then Peter. Traditional author of the Gospel of Mark.",
    tags: ["evangelist", "companion-of-peter"]
  },
  {
    id: "luke", name: "Luke",
    birthYear: 5, deathYear: 84, textualAge: null,
    dateCertainty: "approximate", era: "early-church", category: "other", testament: "NT",
    book: "Luke", references: ["Colossians 4:14", "2 Timothy 4:11", "Philemon 24"],
    description: "Gentile physician; companion of Paul on later journeys (the 'we' passages in Acts). Author of the Gospel of Luke and Acts.",
    tags: ["evangelist", "physician", "historian"]
  },
  {
    id: "silas", name: "Silas (Silvanus)",
    birthYear: 10, deathYear: 70, textualAge: null,
    dateCertainty: "approximate", era: "early-church", category: "other", testament: "NT",
    book: "Acts", references: ["Acts 15-18", "1 Thessalonians 1:1", "1 Peter 5:12"],
    description: "Leader in the Jerusalem church; Paul's companion on the second missionary journey, including the Philippian jail.",
    tags: ["missionary"]
  },
  {
    id: "timothy", name: "Timothy",
    birthYear: 17, deathYear: 80, textualAge: null,
    dateCertainty: "approximate", era: "early-church", category: "other", testament: "NT",
    book: "Acts", references: ["Acts 16:1-3", "1 & 2 Timothy", "Hebrews 13:23"],
    description: "Convert from Lystra, son of a Jewish mother and Greek father. Paul's protege; recipient of two pastoral letters.",
    tags: ["missionary", "pastor"]
  },
  {
    id: "titus", name: "Titus",
    birthYear: 18, deathYear: 96, textualAge: null,
    dateCertainty: "approximate", era: "early-church", category: "other", testament: "NT",
    book: "Titus", references: ["2 Corinthians 7-8", "Galatians 2:1-3", "Titus"],
    description: "Greek convert; uncircumcised companion of Paul, used as a test case at the Jerusalem council. Left in Crete to organize the church.",
    tags: ["missionary", "pastor"]
  },
  {
    id: "james-just", name: "James (brother of Jesus)",
    birthYear: -2, deathYear: 62, textualAge: null,
    dateCertainty: "firm", era: "early-church", category: "other", testament: "NT",
    book: "James", references: ["Matthew 13:55", "1 Corinthians 15:7", "Galatians 1:19", "Acts 15", "Acts 21", "James"],
    parents: ["mary", "joseph-husband-of-mary"],
    description: "Brother of Jesus; not a believer during the ministry but became leader of the Jerusalem church after a resurrection appearance. Author of the Letter of James. Stoned to death in Jerusalem in 62 AD (Josephus).",
    tags: ["epistle-writer", "jerusalem-leader", "martyr"]
  },
  {
    id: "jude-brother", name: "Jude (brother of Jesus)",
    birthYear: 0, deathYear: 80, textualAge: null,
    dateCertainty: "approximate", era: "early-church", category: "other", testament: "NT",
    book: "Jude", references: ["Matthew 13:55", "Jude"],
    description: "Brother of Jesus and James. Author of the short letter that warns against false teachers.",
    tags: ["epistle-writer"]
  },
  {
    id: "nero", name: "Nero",
    birthYear: 37, deathYear: 68, textualAge: 30,
    dateCertainty: "firm", era: "early-church", category: "foreign-king", testament: "NT",
    book: "Acts", references: ["Acts 25:11", "2 Timothy 4"], reignStart: 54, reignEnd: 68,
    description: "Roman emperor whose persecution after the great fire of Rome (64 AD) is traditionally tied to the deaths of Peter and Paul.",
    tags: ["rome", "emperor", "persecutor"]
  },
  {
    id: "simon-zelotes", name: "Simon (the Zealot)",
    birthYear: 0, deathYear: 70, textualAge: null,
    dateCertainty: "approximate", era: "nt-gospels", category: "apostle", testament: "NT",
    book: "Matthew", references: ["Matthew 10:4", "Mark 3:18", "Luke 6:15", "Acts 1:13"],
    description: "One of the Twelve apostles. Called 'the Zealot' (or 'the Canaanite'). Little is known of his ministry; tradition places him in various regions.",
    tags: ["apostle", "twelve"]
  },
  {
    id: "james-alphaeus", name: "James (son of Alphaeus)",
    birthYear: 0, deathYear: 62, textualAge: null,
    dateCertainty: "approximate", era: "nt-gospels", category: "apostle", testament: "NT",
    book: "Matthew", references: ["Matthew 10:3", "Mark 3:18", "Luke 6:15"],
    description: "One of the Twelve apostles. Also called James the Less (to distinguish him from James son of Zebedee). Little biographical detail is recorded.",
    tags: ["apostle", "twelve"]
  },
  {
    id: "jude-thaddaeus", name: "Judas (Thaddaeus, son of James)",
    birthYear: 0, deathYear: 65, textualAge: null,
    dateCertainty: "approximate", era: "nt-gospels", category: "apostle", testament: "NT",
    book: "John", references: ["Matthew 10:3", "John 14:22", "Acts 1:13"],
    description: "One of the Twelve apostles, also called Thaddaeus or Lebbaeus. Son of James, distinct from Judas Iscariot.",
    tags: ["apostle", "twelve"]
  },
  {
    id: "martha", name: "Martha",
    birthYear: -20, deathYear: 50, textualAge: null,
    dateCertainty: "approximate", era: "nt-gospels", category: "other", testament: "NT",
    book: "Luke", references: ["Luke 10:38-42", "John 11", "John 12:2"],
    parents: null, spouses: null, children: null,
    description: "Sister of Mary and Lazarus of Bethany. Known for her hospitality and practical concern; gently rebuked by Jesus for worrying.",
    tags: []
  },
  {
    id: "mary-bethany", name: "Mary (of Bethany)",
    birthYear: -20, deathYear: 50, textualAge: null,
    dateCertainty: "approximate", era: "nt-gospels", category: "other", testament: "NT",
    book: "Luke", references: ["Luke 10:39", "John 11", "John 12:3"],
    parents: null, spouses: null, children: null,
    description: "Sister of Martha and Lazarus. Sat at Jesus' feet to hear his teaching. Anointed Jesus' feet with costly perfume before his crucifixion.",
    tags: []
  },
  {
    id: "lazarus", name: "Lazarus",
    birthYear: -20, deathYear: 50, textualAge: null,
    dateCertainty: "approximate", era: "nt-gospels", category: "other", testament: "NT",
    book: "John", references: ["John 11", "John 12"],
    parents: null, spouses: null, children: null,
    description: "Brother of Martha and Mary of Bethany. Died and was raised by Jesus after four days in the tomb — a sign of his power over death.",
    tags: ["resurrection", "beloved"]
  },
  {
    id: "simeon-elder", name: "Simeon (elder)",
    birthYear: -40, deathYear: 5, textualAge: null,
    dateCertainty: "approximate", era: "nt-gospels", category: "other", testament: "NT",
    book: "Luke", references: ["Luke 2:25-35"],
    description: "Righteous and devout elder; led by the Holy Spirit to the Temple. Blessed Jesus and prophesied to Mary about the sword that would pierce her soul.",
    tags: ["temple", "blessed"]
  },
  {
    id: "anna", name: "Anna",
    birthYear: -50, deathYear: 10, textualAge: null,
    dateCertainty: "approximate", era: "nt-gospels", category: "other", testament: "NT",
    book: "Luke", references: ["Luke 2:36-38"],
    description: "Prophetess at the Temple in Jerusalem. Worshiped there with fastings and prayers; spoke about Jesus to all who looked for redemption.",
    tags: ["prophet", "temple", "blessed"]
  },
  {
    id: "zebedee", name: "Zebedee",
    birthYear: -20, deathYear: 45, textualAge: null,
    dateCertainty: "approximate", era: "nt-gospels", category: "other", testament: "NT",
    book: "Matthew", references: ["Matthew 4:21", "Matthew 26:37"],
    parents: null, spouses: ["salome"], children: ["james-zebedee", "john-apostle"],
    description: "Father of the apostles James and John (the 'sons of Zebedee'). A fisherman; his wife Salome was a follower of Jesus.",
    tags: []
  },
  {
    id: "salome", name: "Salome",
    birthYear: -15, deathYear: 50, textualAge: null,
    dateCertainty: "approximate", era: "nt-gospels", category: "other", testament: "NT",
    book: "Matthew", references: ["Matthew 27:55-56", "Mark 16:1"],
    parents: null, spouses: ["zebedee"], children: ["james-zebedee", "john-apostle"],
    description: "Wife of Zebedee; mother of apostles James and John. Asked Jesus that her sons sit at his right and left in the kingdom.",
    tags: []
  },
  {
    id: "herod-great", name: "Herod the Great",
    birthYear: -73, deathYear: -4, textualAge: 69,
    dateCertainty: "firm", era: "second-temple", category: "foreign-king", testament: "NT",
    book: "Matthew", references: ["Matthew 2", "Luke 1:5"], reignStart: -37, reignEnd: -4,
    description: "King of Judea under Rome. Built the Second Temple. Murdered his wife and sons. Attempted to kill the infant Jesus. Died in Jericho.",
    tags: ["king", "judea", "temple", "cruel"]
  },
  {
    id: "herod-antipas", name: "Herod Antipas",
    birthYear: -20, deathYear: 39, textualAge: null,
    dateCertainty: "firm", era: "nt-gospels", category: "foreign-king", testament: "NT",
    book: "Matthew", references: ["Matthew 14", "Mark 6", "Luke 3:19-20"], reignStart: -4, reignEnd: 39,
    parents: ["herod-great"], spouses: ["herodias"], children: null,
    description: "Son of Herod the Great; tetrarch of Galilee. Married Herodias (his brother's wife). Imprisoned John the Baptist; ordered his beheading.",
    tags: ["tetrarch", "galilee"]
  },
  {
    id: "herodias", name: "Herodias",
    birthYear: -5, deathYear: 39, textualAge: null,
    dateCertainty: "approximate", era: "nt-gospels", category: "other", testament: "NT",
    book: "Matthew", references: ["Matthew 14:3-12", "Mark 6:17-29"],
    spouses: ["herod-antipas"], children: null,
    description: "Wife of Herod Antipas (her uncle's son). Demanded the beheading of John the Baptist after her daughter danced before Herod.",
    tags: []
  },
  {
    id: "pontius-pilate", name: "Pontius Pilate",
    birthYear: -25, deathYear: 36, textualAge: null,
    dateCertainty: "firm", era: "nt-gospels", category: "foreign-king", testament: "NT",
    book: "Matthew", references: ["Matthew 27", "Mark 15", "Luke 23", "John 18-19"],
    description: "Roman prefect of Judea 26-36 AD. Presided over the trial of Jesus; reluctantly authorized the crucifixion.",
    tags: ["prefect", "rome", "passion"]
  },
  {
    id: "elkanah", name: "Elkanah",
    birthYear: -1120, deathYear: null, textualAge: null,
    dateCertainty: "approximate", era: "judges", category: "patriarch", testament: "OT",
    book: "1 Samuel", references: ["1 Samuel 1"],
    spouses: ["hannah"], children: ["samuel"],
    description: "Father of the prophet Samuel. Worshiped at Shiloh; took his wives to the yearly festival.",
    tags: []
  }
);

// =============================================================
// EVENTS
// =============================================================
BibleTimeline.events.push(
  {
    id: "creation", name: "Creation",
    year: -4000, endYear: null,
    dateCertainty: "textual", category: "primeval", testament: "OT",
    references: ["Genesis 1-2"],
    description: "Six days of creation followed by the Sabbath rest. The date is purely the textual anchor used here for layout and is not historical.",
    tags: ["creation"]
  },
  {
    id: "fall", name: "The Fall",
    year: -3990, endYear: null,
    dateCertainty: "textual", category: "primeval", testament: "OT",
    references: ["Genesis 3"],
    description: "Adam and Eve eat the forbidden fruit and are exiled from Eden.",
    tags: ["fall"]
  },
  {
    id: "flood", name: "The Flood",
    year: -2344, endYear: -2343,
    dateCertainty: "textual", category: "primeval", testament: "OT",
    references: ["Genesis 6-9"],
    description: "Worldwide deluge from which Noah's family and the animals on the ark are saved. Followed by the Noahic covenant.",
    participants: ["noah", "shem", "ham", "japheth"],
    tags: ["flood", "covenant"]
  },
  {
    id: "babel", name: "Tower of Babel",
    year: -2200, endYear: null,
    dateCertainty: "textual", category: "primeval", testament: "OT",
    references: ["Genesis 11:1-9"],
    description: "Confusion of languages and dispersion of peoples.",
    tags: ["babel"]
  },
  {
    id: "abraham-call", name: "Call of Abraham",
    year: -1925, endYear: null,
    dateCertainty: "approximate", category: "covenant", testament: "OT",
    references: ["Genesis 12:1-9"],
    description: "Abram leaves Haran for Canaan at God's call, with the promise of land, descendants and worldwide blessing.",
    participants: ["abraham"],
    tags: ["covenant", "abrahamic-covenant"]
  },
  {
    id: "abrahamic-covenant", name: "Abrahamic Covenant Ratified",
    year: -1900, endYear: null,
    dateCertainty: "approximate", category: "covenant", testament: "OT",
    references: ["Genesis 15", "Genesis 17"],
    description: "God passes between the divided animals (Gen 15) and later institutes circumcision (Gen 17) as the covenant sign.",
    participants: ["abraham"],
    tags: ["covenant", "abrahamic-covenant"]
  },
  {
    id: "sodom", name: "Destruction of Sodom and Gomorrah",
    year: -1898, endYear: null,
    dateCertainty: "approximate", category: "judgment", testament: "OT",
    references: ["Genesis 18-19"],
    participants: ["abraham", "lot"],
    description: "Cities of the plain destroyed by fire and brimstone; Lot and his daughters escape.",
    tags: ["judgment"]
  },
  {
    id: "joseph-egypt", name: "Joseph rises in Egypt",
    year: -1720, endYear: null,
    dateCertainty: "approximate", category: "event", testament: "OT",
    references: ["Genesis 41"],
    participants: ["joseph"],
    description: "Joseph interprets Pharaoh's dreams and is made vizier; Jacob's family settles in Goshen during the famine.",
    tags: ["egypt", "famine"]
  },
  {
    id: "exodus", name: "The Exodus",
    year: -1250, endYear: null,
    dateCertainty: "approximate", category: "deliverance", testament: "OT",
    references: ["Exodus 1-15"],
    participants: ["moses", "aaron"],
    description: "Israel leaves Egypt under Moses after the ten plagues; the Red Sea parts. Late-date chronology used here; the early date (~1446 BC) is also defended.",
    tags: ["exodus", "passover"]
  },
  {
    id: "sinai-covenant", name: "Sinai Covenant",
    year: -1250, endYear: -1249,
    dateCertainty: "approximate", category: "covenant", testament: "OT",
    references: ["Exodus 19-24", "Exodus 32-34"],
    participants: ["moses", "aaron"],
    description: "Israel meets God at Sinai. Decalogue and Torah given; covenant ratified with blood; tabernacle built.",
    tags: ["covenant", "law", "sinai"]
  },
  {
    id: "wilderness", name: "Wilderness Wanderings",
    year: -1249, endYear: -1210,
    dateCertainty: "approximate", category: "event", testament: "OT",
    references: ["Numbers"],
    description: "Forty years of wandering after Israel refused to enter Canaan at Kadesh-Barnea.",
    tags: ["wilderness"]
  },
  {
    id: "conquest", name: "Conquest of Canaan",
    year: -1210, endYear: -1190,
    dateCertainty: "approximate", category: "event", testament: "OT",
    references: ["Joshua"],
    participants: ["joshua"],
    description: "Israel under Joshua crosses the Jordan, takes Jericho, and gradually subdues Canaan.",
    tags: ["conquest"]
  },
  {
    id: "judges-period", name: "Period of the Judges",
    year: -1200, endYear: -1050,
    dateCertainty: "approximate", category: "era", testament: "OT",
    references: ["Judges", "1 Samuel 1-7"],
    description: "Cycle of apostasy, oppression, repentance and deliverance through judges, until the rise of monarchy.",
    tags: ["judges"]
  },
  {
    id: "saul-anointed", name: "Saul anointed king",
    year: -1050, endYear: null,
    dateCertainty: "approximate", category: "event", testament: "OT",
    references: ["1 Samuel 9-10"],
    participants: ["samuel", "saul"],
    description: "Samuel anoints Saul of Benjamin as Israel's first king.",
    tags: ["monarchy"]
  },
  {
    id: "david-jerusalem", name: "David captures Jerusalem",
    year: -1003, endYear: null,
    dateCertainty: "firm", category: "event", testament: "OT",
    references: ["2 Samuel 5"],
    participants: ["david"],
    description: "David takes the Jebusite stronghold and makes it the capital. The ark is brought up shortly after.",
    tags: ["jerusalem", "monarchy"]
  },
  {
    id: "davidic-covenant", name: "Davidic Covenant",
    year: -1000, endYear: null,
    dateCertainty: "approximate", category: "covenant", testament: "OT",
    references: ["2 Samuel 7", "Psalm 89", "Psalm 132"],
    participants: ["david", "nathan"],
    description: "God promises David an enduring dynasty. The basis of the messianic hope.",
    tags: ["covenant", "davidic-covenant", "messianic-hope"]
  },
  {
    id: "first-temple", name: "First Temple dedicated",
    year: -957, endYear: null,
    dateCertainty: "firm", category: "construction", testament: "OT",
    references: ["1 Kings 6-8", "2 Chronicles 3-7"],
    participants: ["solomon"],
    description: "Solomon's Temple completed in his eleventh year. The glory of the LORD fills the house.",
    tags: ["first-temple", "jerusalem"]
  },
  {
    id: "kingdom-split", name: "Kingdom divides",
    year: -931, endYear: null,
    dateCertainty: "firm", category: "event", testament: "OT",
    references: ["1 Kings 12"],
    participants: ["rehoboam", "jeroboam-i"],
    description: "After Solomon's death, ten northern tribes secede under Jeroboam I; Judah and Benjamin remain with Rehoboam.",
    tags: ["kingdom-split", "divided-monarchy"]
  },
  {
    id: "qarqar", name: "Battle of Qarqar",
    year: -853, endYear: null,
    dateCertainty: "firm", category: "battle", testament: "OT",
    references: ["Assyrian records (Kurkh Monolith)"],
    participants: ["ahab"],
    description: "Coalition including Ahab of Israel halts Shalmaneser III. Not narrated in the Bible but a key external anchor for OT chronology.",
    tags: ["assyria", "external-anchor"]
  },
  {
    id: "fall-samaria", name: "Fall of Samaria",
    year: -722, endYear: null,
    dateCertainty: "firm", category: "judgment", testament: "OT",
    references: ["2 Kings 17"],
    participants: ["hoshea"],
    description: "Sargon II of Assyria captures Samaria; the Northern Kingdom ends and its people are deported.",
    tags: ["assyria", "exile", "northern-kingdom"]
  },
  {
    id: "sennacherib-siege", name: "Sennacherib besieges Jerusalem",
    year: -701, endYear: null,
    dateCertainty: "firm", category: "battle", testament: "OT",
    references: ["2 Kings 18-19", "Isaiah 36-37"],
    participants: ["hezekiah", "isaiah"],
    description: "Assyrian army withdraws after the angel of the LORD strikes 185,000. Hezekiah's tunnel was dug to prepare for the siege.",
    tags: ["assyria", "deliverance"]
  },
  {
    id: "josiah-reform", name: "Josiah's reform",
    year: -622, endYear: null,
    dateCertainty: "firm", category: "reform", testament: "OT",
    references: ["2 Kings 22-23"],
    participants: ["josiah"],
    description: "The Book of the Law is found in the temple; Josiah leads the most thorough reform of Judah's worship.",
    tags: ["reform", "josiah"]
  },
  {
    id: "carchemish", name: "Battle of Carchemish",
    year: -605, endYear: null,
    dateCertainty: "firm", category: "battle", testament: "OT",
    references: ["Jeremiah 46:2", "2 Kings 24:7"],
    participants: ["nebuchadnezzar"],
    description: "Nebuchadnezzar defeats Egypt; Babylon becomes the dominant power. First deportation from Judah follows (Daniel taken).",
    tags: ["babylon", "first-deportation"]
  },
  {
    id: "fall-jerusalem-586", name: "Fall of Jerusalem; First Temple destroyed",
    year: -586, endYear: null,
    dateCertainty: "firm", category: "judgment", testament: "OT",
    references: ["2 Kings 25", "2 Chronicles 36", "Jeremiah 39", "Jeremiah 52"],
    participants: ["nebuchadnezzar", "zedekiah", "jeremiah"],
    description: "After an 18-month siege Jerusalem falls; the temple is burned and most of Judah is exiled.",
    tags: ["babylon", "exile", "fall-of-jerusalem"]
  },
  {
    id: "exile", name: "Babylonian Exile",
    year: -586, endYear: -538,
    dateCertainty: "firm", category: "era", testament: "OT",
    references: ["2 Kings 25", "Jeremiah", "Ezekiel", "Daniel"],
    description: "Jewish community in Babylon. Period of synagogue origins and prophetic ministry of Ezekiel and Daniel.",
    tags: ["exile", "babylon"]
  },
  {
    id: "fall-babylon", name: "Fall of Babylon",
    year: -539, endYear: null,
    dateCertainty: "firm", category: "event", testament: "OT",
    references: ["Daniel 5"],
    participants: ["cyrus", "belshazzar", "daniel"],
    description: "Cyrus's Persian forces take Babylon. Daniel reads the writing on the wall.",
    tags: ["persia", "babylon"]
  },
  {
    id: "cyrus-decree", name: "Decree of Cyrus / first return",
    year: -538, endYear: null,
    dateCertainty: "firm", category: "event", testament: "OT",
    references: ["2 Chronicles 36:22-23", "Ezra 1"],
    participants: ["cyrus", "zerubbabel", "joshua-hp"],
    description: "Cyrus authorizes the rebuilding of the Jerusalem Temple. Zerubbabel leads about 50,000 home.",
    tags: ["return", "persia"]
  },
  {
    id: "second-temple", name: "Second Temple dedicated",
    year: -516, endYear: null,
    dateCertainty: "firm", category: "construction", testament: "OT",
    references: ["Ezra 6"],
    participants: ["zerubbabel", "joshua-hp", "haggai", "zechariah"],
    description: "The rebuilt temple is finished and dedicated, 70 years after the destruction of the first.",
    tags: ["second-temple"]
  },
  {
    id: "ezra-return", name: "Ezra leads a return",
    year: -458, endYear: null,
    dateCertainty: "approximate", category: "event", testament: "OT",
    references: ["Ezra 7-10"],
    participants: ["ezra", "artaxerxes"],
    description: "Ezra returns with a second wave of exiles and reforms the community.",
    tags: ["return", "post-exile"]
  },
  {
    id: "nehemiah-walls", name: "Nehemiah rebuilds the walls",
    year: -445, endYear: -444,
    dateCertainty: "firm", category: "construction", testament: "OT",
    references: ["Nehemiah 1-6"],
    participants: ["nehemiah", "artaxerxes"],
    description: "Jerusalem's walls completed in 52 days despite opposition.",
    tags: ["post-exile", "wall-rebuilding"]
  },
  {
    id: "intertestamental", name: "Intertestamental period",
    year: -420, endYear: -5,
    dateCertainty: "firm", category: "era", testament: "OT",
    description: "The roughly 400 silent years between Malachi and the birth of John the Baptist - including Alexander, the Ptolemies and Seleucids, the Maccabean revolt (167-164 BC), and Roman annexation (63 BC).",
    tags: ["intertestamental"]
  },
  {
    id: "jesus-birth", name: "Birth of Jesus",
    year: -5, endYear: null,
    dateCertainty: "approximate", category: "event", testament: "NT",
    references: ["Matthew 1-2", "Luke 1-2"],
    participants: ["jesus", "mary", "joseph-husband-of-mary"],
    description: "Jesus born in Bethlehem during the reign of Herod the Great (who died in 4 BC). The 'BC/AD' boundary reflects a 6th-century miscalculation.",
    tags: ["incarnation", "nativity"]
  },
  {
    id: "jesus-baptism", name: "Baptism of Jesus / start of ministry",
    year: 27, endYear: null,
    dateCertainty: "approximate", category: "event", testament: "NT",
    references: ["Matthew 3", "Luke 3", "John 1"],
    participants: ["jesus", "john-baptist"],
    description: "Jesus is baptized by John in the Jordan; the Spirit descends as a dove. Public ministry begins (Luke 3:1 dates John's preaching to Tiberius's 15th year, ~AD 28-29).",
    tags: ["baptism"]
  },
  {
    id: "crucifixion", name: "Crucifixion and Resurrection",
    year: 30, endYear: null,
    dateCertainty: "approximate", category: "event", testament: "NT",
    references: ["Four Gospels", "1 Corinthians 15"],
    participants: ["jesus", "pontius-pilate", "caiaphas"],
    description: "Jesus crucified under Pontius Pilate at Passover; rose on the third day. Either AD 30 (used here) or AD 33 - both fit the data.",
    tags: ["passion", "resurrection", "passover"]
  },
  {
    id: "ascension", name: "Ascension",
    year: 30, endYear: null,
    dateCertainty: "approximate", category: "event", testament: "NT",
    references: ["Luke 24", "Acts 1"],
    participants: ["jesus"],
    description: "Forty days after the resurrection, Jesus is taken up from the Mount of Olives.",
    tags: ["ascension"]
  },
  {
    id: "pentecost", name: "Pentecost",
    year: 30, endYear: null,
    dateCertainty: "approximate", category: "event", testament: "NT",
    references: ["Acts 2"],
    participants: ["peter"],
    description: "The Spirit descends on the disciples; Peter preaches and 3,000 are baptized. Birth of the church.",
    tags: ["pentecost", "spirit"]
  },
  {
    id: "stephen-martyr", name: "Stephen martyred",
    year: 35, endYear: null,
    dateCertainty: "approximate", category: "event", testament: "NT",
    references: ["Acts 6-7"],
    participants: ["stephen", "paul"],
    description: "First Christian martyrdom; scatters the church beyond Jerusalem. Saul approves.",
    tags: ["martyrdom"]
  },
  {
    id: "paul-conversion", name: "Conversion of Paul",
    year: 34, endYear: null,
    dateCertainty: "approximate", category: "event", testament: "NT",
    references: ["Acts 9", "Galatians 1"],
    participants: ["paul"],
    description: "Saul of Tarsus encounters the risen Christ on the road to Damascus.",
    tags: ["conversion"]
  },
  {
    id: "jerusalem-council", name: "Jerusalem Council",
    year: 49, endYear: null,
    dateCertainty: "approximate", category: "event", testament: "NT",
    references: ["Acts 15"],
    participants: ["paul", "barnabas", "peter", "james-just"],
    description: "Apostles and elders agree that Gentile believers do not need to be circumcised - a turning point for the early church.",
    tags: ["council"]
  },
  {
    id: "paul-journeys", name: "Paul's missionary journeys",
    year: 47, endYear: 57,
    dateCertainty: "approximate", category: "era", testament: "NT",
    references: ["Acts 13-21"],
    participants: ["paul", "barnabas", "silas", "timothy"],
    description: "Three missionary journeys spreading the gospel through Asia Minor and Greece.",
    tags: ["missions"]
  },
  {
    id: "paul-rome", name: "Paul taken to Rome",
    year: 60, endYear: 62,
    dateCertainty: "approximate", category: "event", testament: "NT",
    references: ["Acts 27-28"],
    participants: ["paul", "luke"],
    description: "Paul appeals to Caesar, is shipwrecked at Malta, and reaches Rome where he is held under house arrest.",
    tags: ["missions", "rome"]
  },
  {
    id: "fire-of-rome", name: "Great Fire of Rome / Neronian persecution",
    year: 64, endYear: null,
    dateCertainty: "firm", category: "event", testament: "NT",
    participants: ["nero"],
    description: "Nero blames Christians for the fire. Tradition places Peter's and Paul's deaths in the resulting persecution.",
    tags: ["rome", "persecution"]
  },
  {
    id: "fall-jerusalem-70", name: "Fall of Jerusalem; Second Temple destroyed",
    year: 70, endYear: null,
    dateCertainty: "firm", category: "judgment", testament: "NT",
    references: ["Matthew 24", "Luke 21"],
    description: "Roman general (later emperor) Titus sacks Jerusalem and destroys the Second Temple, ending the sacrificial system. Fulfills Jesus' prediction.",
    tags: ["rome", "fall-of-jerusalem", "second-temple"]
  },
  {
    id: "revelation", name: "John writes Revelation on Patmos",
    year: 95, endYear: null,
    dateCertainty: "approximate", category: "event", testament: "NT",
    references: ["Revelation 1:9"],
    participants: ["john-apostle"],
    description: "Likely written under Domitian. Last book of the New Testament canon.",
    tags: ["revelation", "patmos"]
  }
);

// =============================================================
// WORLD HISTORY — non-biblical kingdoms, empires & events
// =============================================================
BibleTimeline.events.push(
  {
    id: "sumer", name: "Sumerian civilization",
    year: -3500, endYear: -2000,
    dateCertainty: "firm", category: "world-empire", testament: "OT",
    description: "First known civilization in southern Mesopotamia. Invented cuneiform, the wheel, and the city-state. Cities like Ur, Uruk, and Eridu flourished.",
    tags: ["mesopotamia", "world-history"]
  },
  {
    id: "egypt-old-kingdom", name: "Egyptian Old Kingdom",
    year: -2686, endYear: -2181,
    dateCertainty: "firm", category: "world-empire", testament: "OT",
    description: "Age of the great pyramid builders (Djoser, Khufu/Cheops, Khafre, Menkaure). Capital at Memphis. Ended in collapse and the First Intermediate Period.",
    tags: ["egypt", "pyramids", "world-history"]
  },
  {
    id: "akkadian-empire", name: "Akkadian Empire",
    year: -2334, endYear: -2154,
    dateCertainty: "firm", category: "world-empire", testament: "OT",
    description: "First true empire in human history, founded by Sargon the Great. Unified Sumer and Akkad under one rule.",
    tags: ["mesopotamia", "world-history"]
  },
  {
    id: "ur-iii", name: "Third Dynasty of Ur",
    year: -2112, endYear: -2004,
    dateCertainty: "firm", category: "world-empire", testament: "OT",
    description: "Sumerian renaissance after the Akkadian collapse. The Ur Abraham left was a leading city of this era.",
    tags: ["mesopotamia", "ur", "world-history"]
  },
  {
    id: "egypt-middle-kingdom", name: "Egyptian Middle Kingdom",
    year: -2055, endYear: -1650,
    dateCertainty: "firm", category: "world-empire", testament: "OT",
    description: "Reunified Egypt with capital at Thebes. The era of Joseph and the patriarchs in Egypt likely overlaps the late Middle Kingdom and the Second Intermediate Period.",
    tags: ["egypt", "world-history"]
  },
  {
    id: "old-babylonian", name: "Old Babylonian Empire (Hammurabi)",
    year: -1894, endYear: -1595,
    dateCertainty: "firm", category: "world-empire", testament: "OT",
    description: "Babylon's first dominance under Hammurabi (~1810-1750 BC), famous for his law code. Contemporary of the patriarchs.",
    tags: ["babylon", "hammurabi", "world-history"]
  },
  {
    id: "hyksos-period", name: "Hyksos rule in Egypt",
    year: -1650, endYear: -1550,
    dateCertainty: "firm", category: "world-empire", testament: "OT",
    description: "Semitic rulers governed Lower Egypt during the Second Intermediate Period. Many scholars place Joseph's rise to power and Israel's settlement in Goshen during or just before this era.",
    tags: ["egypt", "world-history"]
  },
  {
    id: "egypt-new-kingdom", name: "Egyptian New Kingdom",
    year: -1550, endYear: -1077,
    dateCertainty: "firm", category: "world-empire", testament: "OT",
    description: "Egypt's imperial age. Built the temples at Karnak and Luxor. The Pharaohs of the Exodus belong to this period (18th-19th dynasties).",
    tags: ["egypt", "world-history", "exodus-context"]
  },
  {
    id: "hittite-empire", name: "Hittite Empire",
    year: -1600, endYear: -1178,
    dateCertainty: "firm", category: "world-empire", testament: "OT",
    description: "Indo-European empire centered in Anatolia. Rivaled Egypt for control of the Levant; fought the Battle of Kadesh against Ramses II (1274 BC). Hittites appear in Genesis (Abraham buys Machpelah from Ephron the Hittite) and 2 Samuel (Uriah).",
    tags: ["hittites", "world-history"]
  },
  {
    id: "battle-kadesh", name: "Battle of Kadesh",
    year: -1274, endYear: null,
    dateCertainty: "firm", category: "world-event", testament: "OT",
    description: "Massive chariot battle between Ramses II of Egypt and Muwatalli II of the Hittites. Ended in tactical stalemate; led to the first known peace treaty in history.",
    tags: ["egypt", "hittites", "world-history"]
  },
  {
    id: "bronze-age-collapse", name: "Late Bronze Age Collapse",
    year: -1200, endYear: -1150,
    dateCertainty: "firm", category: "world-event", testament: "OT",
    description: "Within a few decades the Hittites, Mycenaean Greeks, and many Egyptian, Syrian, and Cypriot centers collapsed. Sea Peoples, drought, and systemic fragility implicated. Frames the world Israel entered in the Conquest and Judges era.",
    tags: ["world-history", "sea-peoples"]
  },
  {
    id: "trojan-war", name: "Trojan War (traditional)",
    year: -1194, endYear: -1184,
    dateCertainty: "approximate", category: "world-event", testament: "OT",
    description: "Mycenaean coalition besieges Troy. Source of Homer's Iliad. Roughly contemporary with Israel's early Judges era.",
    tags: ["greece", "world-history"]
  },
  {
    id: "phoenicia-peak", name: "Phoenician maritime peak",
    year: -1200, endYear: -800,
    dateCertainty: "firm", category: "world-empire", testament: "OT",
    description: "Tyre, Sidon, and Byblos dominated Mediterranean trade and spread the alphabet. Hiram of Tyre supplied cedar for Solomon's Temple; Jezebel was a Sidonian princess.",
    tags: ["phoenicia", "world-history"]
  },
  {
    id: "founding-rome", name: "Traditional founding of Rome",
    year: -753, endYear: null,
    dateCertainty: "approximate", category: "world-event", testament: "OT",
    description: "Romulus founds Rome (legend). Beginning of the Roman Kingdom; matches roughly with the reigns of Uzziah and Jeroboam II.",
    tags: ["rome", "world-history"]
  },
  {
    id: "neo-assyrian", name: "Neo-Assyrian Empire",
    year: -911, endYear: -609,
    dateCertainty: "firm", category: "world-empire", testament: "OT",
    description: "First true world empire — at its height stretched from Egypt to Iran. Conquered the Northern Kingdom (722) and besieged Hezekiah (701). Fell to a Median-Babylonian coalition; Nineveh sacked in 612 BC.",
    tags: ["assyria", "world-history"]
  },
  {
    id: "fall-nineveh", name: "Fall of Nineveh",
    year: -612, endYear: null,
    dateCertainty: "firm", category: "world-event", testament: "OT",
    description: "Median-Babylonian coalition sacks the Assyrian capital. Fulfilled the prophecies of Nahum and Zephaniah.",
    tags: ["assyria", "world-history"]
  },
  {
    id: "neo-babylonian", name: "Neo-Babylonian Empire",
    year: -626, endYear: -539,
    dateCertainty: "firm", category: "world-empire", testament: "OT",
    description: "Founded by Nabopolassar; reached its peak under Nebuchadnezzar II. Destroyed Jerusalem and the First Temple in 586 BC. Fell to Cyrus the Persian in 539 BC.",
    tags: ["babylon", "world-history"]
  },
  {
    id: "achaemenid", name: "Achaemenid Persian Empire",
    year: -550, endYear: -330,
    dateCertainty: "firm", category: "world-empire", testament: "OT",
    description: "Founded by Cyrus the Great. Largest empire of the ancient world up to that point. Allowed Jewish return and temple rebuilding. Fell to Alexander the Great.",
    tags: ["persia", "world-history"]
  },
  {
    id: "buddha", name: "Life of the Buddha (traditional)",
    year: -563, endYear: -483,
    dateCertainty: "approximate", category: "world-event", testament: "OT",
    description: "Siddhārtha Gautama lives in northern India. Roughly contemporary with the Babylonian Exile.",
    tags: ["world-history"]
  },
  {
    id: "confucius", name: "Confucius",
    year: -551, endYear: -479,
    dateCertainty: "firm", category: "world-event", testament: "OT",
    description: "Chinese philosopher whose lifetime overlaps the Babylonian exile and post-exilic returns under Cyrus and Darius.",
    tags: ["world-history"]
  },
  {
    id: "salamis", name: "Battle of Salamis",
    year: -480, endYear: null,
    dateCertainty: "firm", category: "world-event", testament: "OT",
    description: "Greek navy defeats Xerxes' Persian fleet, halting Persian expansion into Europe. Same Xerxes who appears in Esther.",
    tags: ["persia", "greece", "world-history"]
  },
  {
    id: "classical-greece", name: "Classical Greece",
    year: -480, endYear: -323,
    dateCertainty: "firm", category: "world-empire", testament: "OT",
    description: "Athenian democracy, Socrates, Plato, Aristotle. Sparta-Athens rivalry. Coincides with the post-exilic period and Malachi.",
    tags: ["greece", "world-history"]
  },
  {
    id: "alexander-conquest", name: "Conquests of Alexander the Great",
    year: -334, endYear: -323,
    dateCertainty: "firm", category: "world-event", testament: "OT",
    description: "In a decade Alexander overthrows the Persian Empire and reaches India. Hellenizes the Near East; Greek becomes the lingua franca that would carry the New Testament.",
    tags: ["greece", "world-history", "hellenistic"]
  },
  {
    id: "ptolemaic-kingdom", name: "Ptolemaic Kingdom (Egypt)",
    year: -305, endYear: -30,
    dateCertainty: "firm", category: "world-empire", testament: "OT",
    description: "Greek dynasty in Egypt founded by Ptolemy I. Ruled Judea ~301-200 BC. Sponsored the Septuagint translation of the Hebrew Bible. Ended with Cleopatra VII.",
    tags: ["egypt", "hellenistic", "septuagint", "world-history"]
  },
  {
    id: "seleucid-empire", name: "Seleucid Empire",
    year: -312, endYear: -63,
    dateCertainty: "firm", category: "world-empire", testament: "OT",
    description: "Hellenistic empire in Syria/Mesopotamia. Took Judea from the Ptolemies in 200 BC. Antiochus IV Epiphanes desecrated the Temple in 167 BC, sparking the Maccabean Revolt.",
    tags: ["hellenistic", "world-history"]
  },
  {
    id: "septuagint", name: "Septuagint (LXX) translation begins",
    year: -250, endYear: -130,
    dateCertainty: "approximate", category: "world-event", testament: "OT",
    description: "The Hebrew Bible is translated into Greek for the Jewish community in Alexandria. Becomes the Bible most often quoted in the New Testament.",
    tags: ["septuagint", "alexandria", "world-history"]
  },
  {
    id: "maccabean-revolt", name: "Maccabean Revolt",
    year: -167, endYear: -160,
    dateCertainty: "firm", category: "world-event", testament: "OT",
    description: "Judah Maccabee and his brothers revolt against Antiochus IV's persecution. Rededication of the Temple in 164 BC commemorated as Hanukkah.",
    tags: ["hellenistic", "hanukkah", "world-history"]
  },
  {
    id: "hasmonean", name: "Hasmonean dynasty",
    year: -140, endYear: -37,
    dateCertainty: "firm", category: "world-empire", testament: "OT",
    description: "Independent Jewish kingdom in Judea. Combined high priesthood with kingship. Ended when Herod the Great took the throne in 37 BC.",
    tags: ["hasmonean", "world-history"]
  },
  {
    id: "roman-republic", name: "Roman Republic",
    year: -509, endYear: -27,
    dateCertainty: "firm", category: "world-empire", testament: "OT",
    description: "Roman state from the expulsion of the Tarquins until Augustus. Conquered the Mediterranean; annexed Judea in 63 BC under Pompey.",
    tags: ["rome", "world-history"]
  },
  {
    id: "rome-takes-judea", name: "Rome annexes Judea",
    year: -63, endYear: null,
    dateCertainty: "firm", category: "world-event", testament: "OT",
    description: "Pompey enters Jerusalem; Judea becomes a Roman client state. Sets the political stage for the New Testament.",
    tags: ["rome", "world-history"]
  },
  {
    id: "julius-caesar-died", name: "Assassination of Julius Caesar",
    year: -44, endYear: null,
    dateCertainty: "firm", category: "world-event", testament: "OT",
    description: "Caesar killed on the Ides of March. Triggers civil wars that end the Republic.",
    tags: ["rome", "world-history"]
  },
  {
    id: "roman-empire", name: "Roman Empire",
    year: -27, endYear: 476,
    dateCertainty: "firm", category: "world-empire", testament: "NT",
    description: "Augustus becomes first emperor. The Pax Romana provides the political and infrastructural backdrop for the entire New Testament.",
    tags: ["rome", "world-history"]
  },
  {
    id: "vesuvius", name: "Eruption of Mount Vesuvius",
    year: 79, endYear: null,
    dateCertainty: "firm", category: "world-event", testament: "NT",
    description: "Pompeii and Herculaneum destroyed. A few years before John writes Revelation.",
    tags: ["rome", "world-history"]
  }
);

// =============================================================
// WORLD HISTORY — non-biblical rulers
// =============================================================
BibleTimeline.people.push(
  {
    id: "sargon-akkad", name: "Sargon of Akkad",
    birthYear: -2334, deathYear: -2279, textualAge: null,
    dateCertainty: "approximate", era: "patriarchal", category: "foreign-king", testament: "OT",
    book: "—", references: ["Sumerian King List"],
    reignStart: -2334, reignEnd: -2279,
    description: "Founder of the world's first true empire, the Akkadian Empire. Conquered Sumer and parts of Elam and the Levant. Roughly contemporary with the late life of Noah and the early Genesis 11 patriarchs.",
    tags: ["mesopotamia", "world-history", "foreign-ruler"]
  },
  {
    id: "hammurabi", name: "Hammurabi of Babylon",
    birthYear: -1810, deathYear: -1750, textualAge: null,
    dateCertainty: "firm", era: "patriarchal", category: "foreign-king", testament: "OT",
    book: "—", references: ["Code of Hammurabi"],
    reignStart: -1792, reignEnd: -1750,
    description: "Sixth king of the First Babylonian dynasty. Author of one of the earliest legal codes; rough contemporary of Abraham. Expanded Babylon to dominate Mesopotamia.",
    tags: ["babylon", "world-history", "foreign-ruler", "law-code"]
  },
  {
    id: "hatshepsut", name: "Hatshepsut",
    birthYear: -1507, deathYear: -1458, textualAge: null,
    dateCertainty: "firm", era: "exodus", category: "foreign-king", testament: "OT",
    book: "—",
    reignStart: -1479, reignEnd: -1458,
    description: "Female pharaoh of the 18th dynasty. Some early-date Exodus advocates suggest she was the princess who rescued the infant Moses; chronologically possible but not directly attested.",
    tags: ["egypt", "world-history", "foreign-ruler"]
  },
  {
    id: "thutmose-iii", name: "Thutmose III",
    birthYear: -1481, deathYear: -1425, textualAge: null,
    dateCertainty: "firm", era: "exodus", category: "foreign-king", testament: "OT",
    book: "—",
    reignStart: -1479, reignEnd: -1425,
    description: "Greatest military pharaoh of Egypt's New Kingdom. Some early-date Exodus advocates name him as the Pharaoh of the Oppression.",
    tags: ["egypt", "world-history", "foreign-ruler"]
  },
  {
    id: "akhenaten", name: "Akhenaten",
    birthYear: -1380, deathYear: -1334, textualAge: null,
    dateCertainty: "firm", era: "exodus", category: "foreign-king", testament: "OT",
    book: "—",
    reignStart: -1353, reignEnd: -1336,
    description: "Pharaoh who attempted Egypt's first major monotheistic reform — sole worship of the Aten (sun-disk). Built the new capital Amarna. Sometimes compared to Mosaic monotheism, though the relationship is debated.",
    tags: ["egypt", "world-history", "foreign-ruler", "monotheism"]
  },
  {
    id: "tutankhamun", name: "Tutankhamun",
    birthYear: -1341, deathYear: -1323, textualAge: 18,
    dateCertainty: "firm", era: "exodus", category: "foreign-king", testament: "OT",
    book: "—",
    reignStart: -1332, reignEnd: -1323,
    description: "Boy pharaoh who reversed his father Akhenaten's monotheistic reform. Famous for his intact tomb, discovered in 1922.",
    tags: ["egypt", "world-history", "foreign-ruler"]
  },
  {
    id: "ramses-ii", name: "Ramses II ('the Great')",
    birthYear: -1303, deathYear: -1213, textualAge: 90,
    dateCertainty: "firm", era: "exodus", category: "foreign-king", testament: "OT",
    book: "—",
    reignStart: -1279, reignEnd: -1213,
    description: "Long-reigning pharaoh of the 19th dynasty; built Pi-Ramesses, fought the Hittites at Kadesh. The most common candidate for the Pharaoh of the Exodus on the late-date chronology.",
    tags: ["egypt", "world-history", "foreign-ruler", "exodus-pharaoh"]
  },
  {
    id: "merneptah", name: "Merneptah",
    birthYear: -1273, deathYear: -1203, textualAge: null,
    dateCertainty: "firm", era: "conquest", category: "foreign-king", testament: "OT",
    book: "—",
    reignStart: -1213, reignEnd: -1203,
    description: "Son of Ramses II. His victory stele (1208 BC) contains the earliest extra-biblical reference to 'Israel' — already in Canaan as a people.",
    tags: ["egypt", "world-history", "foreign-ruler", "merneptah-stele"]
  },
  {
    id: "shalmaneser-iii", name: "Shalmaneser III",
    birthYear: -890, deathYear: -824, textualAge: null,
    dateCertainty: "firm", era: "divided-monarchy", category: "foreign-king", testament: "OT",
    book: "—", references: ["Black Obelisk", "Kurkh Monolith"],
    reignStart: -859, reignEnd: -824,
    description: "Neo-Assyrian king. His inscriptions name Ahab of Israel at Qarqar (853 BC) and depict Jehu of Israel paying tribute on the Black Obelisk — two of the earliest extra-biblical references to Israelite kings.",
    tags: ["assyria", "world-history", "foreign-ruler"]
  },
  {
    id: "tiglath-pileser-iii", name: "Tiglath-Pileser III ('Pul')",
    birthYear: -795, deathYear: -727, textualAge: null,
    dateCertainty: "firm", era: "divided-monarchy", category: "foreign-king", testament: "OT",
    book: "2 Kings", references: ["2 Kings 15-16", "1 Chronicles 5:26"],
    reignStart: -745, reignEnd: -727,
    description: "Founder of the Neo-Assyrian Empire's imperial phase. Took tribute from Menahem and deported Galilee; intervened on Ahaz's behalf during the Syro-Ephraimite war.",
    tags: ["assyria", "world-history", "foreign-ruler"]
  },
  {
    id: "sargon-ii", name: "Sargon II",
    birthYear: -770, deathYear: -705, textualAge: null,
    dateCertainty: "firm", era: "divided-monarchy", category: "foreign-king", testament: "OT",
    book: "Isaiah", references: ["Isaiah 20:1"],
    reignStart: -722, reignEnd: -705,
    description: "Completed the conquest of Samaria in 722 BC and deported the Northern Kingdom. Founded Khorsabad. Mentioned by name in Isaiah 20.",
    tags: ["assyria", "world-history", "foreign-ruler", "fall-of-samaria"]
  },
  {
    id: "sennacherib", name: "Sennacherib",
    birthYear: -740, deathYear: -681, textualAge: null,
    dateCertainty: "firm", era: "divided-monarchy", category: "foreign-king", testament: "OT",
    book: "2 Kings", references: ["2 Kings 18-19", "Isaiah 36-37", "Sennacherib's Prism"],
    reignStart: -705, reignEnd: -681,
    description: "Assyrian king who invaded Judah and besieged Jerusalem in 701 BC during Hezekiah's reign. His own annals describe shutting Hezekiah up 'like a bird in a cage'. Assassinated by his sons.",
    tags: ["assyria", "world-history", "foreign-ruler", "assyrian-crisis"]
  },
  {
    id: "esarhaddon", name: "Esarhaddon",
    birthYear: -713, deathYear: -669, textualAge: null,
    dateCertainty: "firm", era: "divided-monarchy", category: "foreign-king", testament: "OT",
    book: "—", references: ["2 Kings 19:37", "Ezra 4:2"],
    reignStart: -681, reignEnd: -669,
    description: "Son of Sennacherib. Conquered Egypt; resettled foreigners in Samaria.",
    tags: ["assyria", "world-history", "foreign-ruler"]
  },
  {
    id: "ashurbanipal", name: "Ashurbanipal",
    birthYear: -685, deathYear: -627, textualAge: null,
    dateCertainty: "firm", era: "divided-monarchy", category: "foreign-king", testament: "OT",
    book: "—", references: ["Ezra 4:10 (Asnapper)"],
    reignStart: -668, reignEnd: -627,
    description: "Last great Neo-Assyrian king. Built the famous library at Nineveh from which the Epic of Gilgamesh was recovered.",
    tags: ["assyria", "world-history", "foreign-ruler"]
  },
  {
    id: "nabopolassar", name: "Nabopolassar",
    birthYear: -658, deathYear: -605, textualAge: null,
    dateCertainty: "firm", era: "divided-monarchy", category: "foreign-king", testament: "OT",
    book: "—",
    reignStart: -626, reignEnd: -605,
    description: "Founder of the Neo-Babylonian Empire. With the Medes, sacked Nineveh in 612 BC.",
    tags: ["babylon", "world-history", "foreign-ruler"]
  },
  {
    id: "neco-ii", name: "Pharaoh Necho II",
    birthYear: -640, deathYear: -595, textualAge: null,
    dateCertainty: "firm", era: "divided-monarchy", category: "foreign-king", testament: "OT",
    book: "2 Kings", references: ["2 Kings 23:29-35", "Jeremiah 46"],
    reignStart: -610, reignEnd: -595,
    description: "26th-dynasty pharaoh. Killed Josiah at Megiddo (609 BC) and was defeated by Nebuchadnezzar at Carchemish (605 BC).",
    tags: ["egypt", "world-history", "foreign-ruler"]
  },
  {
    id: "alexander-great", name: "Alexander the Great",
    birthYear: -356, deathYear: -323, textualAge: 32,
    dateCertainty: "firm", era: "post-exile", category: "foreign-king", testament: "OT",
    book: "Daniel", references: ["Daniel 8 (typological)"],
    reignStart: -336, reignEnd: -323,
    description: "Macedonian king who in twelve years conquered the Persian Empire from the Aegean to the Indus. His campaigns brought Greek language and culture to the Near East. Daniel 8's 'goat from the west' is widely read as referring to him.",
    tags: ["greece", "world-history", "foreign-ruler", "hellenistic"]
  },
  {
    id: "ptolemy-i", name: "Ptolemy I Soter",
    birthYear: -367, deathYear: -283, textualAge: null,
    dateCertainty: "firm", era: "post-exile", category: "foreign-king", testament: "OT",
    book: "—",
    reignStart: -305, reignEnd: -283,
    description: "Macedonian general; founder of the Ptolemaic dynasty in Egypt. His descendants ruled Judea for a century and sponsored the Septuagint.",
    tags: ["hellenistic", "egypt", "world-history", "foreign-ruler"]
  },
  {
    id: "antiochus-iv", name: "Antiochus IV Epiphanes",
    birthYear: -215, deathYear: -164, textualAge: null,
    dateCertainty: "firm", era: "second-temple", category: "foreign-king", testament: "OT",
    book: "Daniel", references: ["Daniel 8", "Daniel 11", "1 Maccabees"],
    reignStart: -175, reignEnd: -164,
    description: "Seleucid king who outlawed Judaism and desecrated the Jerusalem Temple in 167 BC ('the abomination of desolation' — Daniel 11), sparking the Maccabean revolt.",
    tags: ["hellenistic", "world-history", "foreign-ruler", "maccabean"]
  },
  {
    id: "judas-maccabee", name: "Judah Maccabee",
    birthYear: -190, deathYear: -160, textualAge: null,
    dateCertainty: "firm", era: "second-temple", category: "other", testament: "OT",
    book: "—", references: ["1 Maccabees", "2 Maccabees"],
    description: "Third son of Mattathias; led the Jewish revolt against Antiochus IV. Cleansed and rededicated the Temple in 164 BC — the origin of Hanukkah.",
    tags: ["maccabean", "world-history", "hanukkah"]
  },
  {
    id: "pompey-magnus", name: "Pompey the Great",
    birthYear: -106, deathYear: -48, textualAge: null,
    dateCertainty: "firm", era: "second-temple", category: "foreign-king", testament: "OT",
    book: "—",
    description: "Roman general who annexed Judea in 63 BC, ending Hasmonean independence. Famously entered the Holy of Holies but did not loot the Temple.",
    tags: ["rome", "world-history", "foreign-ruler"]
  },
  {
    id: "julius-caesar", name: "Julius Caesar",
    birthYear: -100, deathYear: -44, textualAge: 55,
    dateCertainty: "firm", era: "second-temple", category: "foreign-king", testament: "OT",
    book: "—",
    description: "Roman general and dictator whose assassination in 44 BC triggered the wars that ended the Republic and led to Augustus's empire.",
    tags: ["rome", "world-history", "foreign-ruler"]
  },
  {
    id: "cleopatra-vii", name: "Cleopatra VII",
    birthYear: -69, deathYear: -30, textualAge: 39,
    dateCertainty: "firm", era: "second-temple", category: "queen", testament: "OT",
    book: "—",
    reignStart: -51, reignEnd: -30,
    description: "Last pharaoh of the Ptolemaic dynasty. Allied with Julius Caesar and Mark Antony; her death ended Hellenistic Egypt and brought it into the Roman Empire.",
    tags: ["egypt", "rome", "world-history", "foreign-ruler"]
  },
  {
    id: "herod-agrippa-i", name: "Herod Agrippa I",
    birthYear: -10, deathYear: 44, textualAge: 54,
    dateCertainty: "firm", era: "early-church", category: "foreign-king", testament: "NT",
    book: "Acts", references: ["Acts 12"],
    reignStart: 41, reignEnd: 44,
    description: "Grandson of Herod the Great. Beheaded James son of Zebedee and imprisoned Peter. Died suddenly in Caesarea (Acts 12:23) — corroborated by Josephus.",
    tags: ["herodian", "rome", "world-history"]
  },
  {
    id: "claudius", name: "Claudius",
    birthYear: -10, deathYear: 54, textualAge: 63,
    dateCertainty: "firm", era: "early-church", category: "foreign-king", testament: "NT",
    book: "Acts", references: ["Acts 11:28", "Acts 18:2"],
    reignStart: 41, reignEnd: 54,
    description: "Fourth Roman emperor. His expulsion of Jews from Rome (~AD 49) brought Aquila and Priscilla to Corinth.",
    tags: ["rome", "world-history", "foreign-ruler"]
  }
);



// =============================================================
// BOOKS OF THE BIBLE
//   coversFrom/coversTo : the historical period the book describes
//   writtenFrom/writtenTo : approximate composition date (when known).
//     Where authorship and date are debated, this uses a moderate
//     mainstream view; alternatives are noted in description.
// =============================================================
BibleTimeline.books = [
  // ── Torah / Pentateuch ───────────────────────────────────────
  { id: "book-genesis", name: "Genesis", order: 1, testament: "OT", section: "torah",
    coversFrom: -4000, coversTo: -1640, writtenFrom: -1450, writtenTo: -1400,
    author: "Moses (traditional); composed in stages and finalized post-exile (mainstream academic).",
    description: "Origins of the world, of humanity, and of Israel through Abraham, Isaac, Jacob and Joseph.",
    chapters: 50 },
  { id: "book-exodus", name: "Exodus", order: 2, testament: "OT", section: "torah",
    coversFrom: -1300, coversTo: -1230, writtenFrom: -1450, writtenTo: -1400,
    author: "Moses (traditional)",
    description: "Israel's escape from Egypt, the giving of the Torah at Sinai, and the building of the tabernacle.",
    chapters: 40 },
  { id: "book-leviticus", name: "Leviticus", order: 3, testament: "OT", section: "torah",
    coversFrom: -1250, coversTo: -1249, writtenFrom: -1450, writtenTo: -1400,
    author: "Moses (traditional)",
    description: "Sacrificial system, priestly regulations, and holiness code given at Sinai.",
    chapters: 27 },
  { id: "book-numbers", name: "Numbers", order: 4, testament: "OT", section: "torah",
    coversFrom: -1250, coversTo: -1210, writtenFrom: -1450, writtenTo: -1400,
    author: "Moses (traditional)",
    description: "Forty years of wilderness wandering between Sinai and the plains of Moab.",
    chapters: 36 },
  { id: "book-deuteronomy", name: "Deuteronomy", order: 5, testament: "OT", section: "torah",
    coversFrom: -1210, coversTo: -1210, writtenFrom: -1410, writtenTo: -1210,
    author: "Moses (traditional); core may have been the 'Book of the Law' found under Josiah.",
    description: "Moses' final speeches in Moab, restating the covenant before Israel enters Canaan.",
    chapters: 34 },

  // ── Historical books ────────────────────────────────────────
  { id: "book-joshua", name: "Joshua", order: 6, testament: "OT", section: "history",
    coversFrom: -1210, coversTo: -1180, writtenFrom: -1180, writtenTo: -1050,
    author: "Anonymous; Joshua and others (traditional).",
    description: "Conquest and division of Canaan under Joshua.",
    chapters: 24 },
  { id: "book-judges", name: "Judges", order: 7, testament: "OT", section: "history",
    coversFrom: -1200, coversTo: -1050, writtenFrom: -1050, writtenTo: -950,
    author: "Anonymous (Samuel, traditionally).",
    description: "Cycle of apostasy and deliverance through twelve judges.",
    chapters: 21 },
  { id: "book-ruth", name: "Ruth", order: 8, testament: "OT", section: "history",
    coversFrom: -1130, coversTo: -1100, writtenFrom: -1000, writtenTo: -500,
    author: "Anonymous.",
    description: "A Moabite widow becomes the great-grandmother of David.",
    chapters: 4 },
  { id: "book-1samuel", name: "1 Samuel", order: 9, testament: "OT", section: "history",
    coversFrom: -1100, coversTo: -1010, writtenFrom: -930, writtenTo: -550,
    author: "Anonymous.",
    description: "Birth of Samuel, anointing of Saul, rise of David.",
    chapters: 31 },
  { id: "book-2samuel", name: "2 Samuel", order: 10, testament: "OT", section: "history",
    coversFrom: -1010, coversTo: -970, writtenFrom: -930, writtenTo: -550,
    author: "Anonymous.",
    description: "David's reign — triumphs, sins, and the Davidic covenant.",
    chapters: 24 },
  { id: "book-1kings", name: "1 Kings", order: 11, testament: "OT", section: "history",
    coversFrom: -970, coversTo: -852, writtenFrom: -560, writtenTo: -540,
    author: "Anonymous (Jeremiah, traditionally).",
    description: "Solomon's reign, the temple, the kingdom split, Elijah and Ahab.",
    chapters: 22 },
  { id: "book-2kings", name: "2 Kings", order: 12, testament: "OT", section: "history",
    coversFrom: -852, coversTo: -560, writtenFrom: -560, writtenTo: -540,
    author: "Anonymous (Jeremiah, traditionally).",
    description: "Elisha through the fall of Samaria and Jerusalem.",
    chapters: 25 },
  { id: "book-1chronicles", name: "1 Chronicles", order: 13, testament: "OT", section: "history",
    coversFrom: -4000, coversTo: -970, writtenFrom: -450, writtenTo: -400,
    author: "Anonymous (Ezra, traditionally).",
    description: "Genealogies from Adam through David's reign, retold for the post-exilic community.",
    chapters: 29 },
  { id: "book-2chronicles", name: "2 Chronicles", order: 14, testament: "OT", section: "history",
    coversFrom: -970, coversTo: -538, writtenFrom: -450, writtenTo: -400,
    author: "Anonymous (Ezra, traditionally).",
    description: "Solomon, the kings of Judah, the exile, and the decree of Cyrus.",
    chapters: 36 },
  { id: "book-ezra", name: "Ezra", order: 15, testament: "OT", section: "history",
    coversFrom: -538, coversTo: -440, writtenFrom: -440, writtenTo: -400,
    author: "Ezra (traditional).",
    description: "Two waves of return from exile and the rebuilding of the Temple.",
    chapters: 10 },
  { id: "book-nehemiah", name: "Nehemiah", order: 16, testament: "OT", section: "history",
    coversFrom: -445, coversTo: -430, writtenFrom: -430, writtenTo: -400,
    author: "Nehemiah (traditional).",
    description: "Rebuilding of Jerusalem's walls and post-exilic reform.",
    chapters: 13 },
  { id: "book-esther", name: "Esther", order: 17, testament: "OT", section: "history",
    coversFrom: -483, coversTo: -473, writtenFrom: -460, writtenTo: -350,
    author: "Anonymous.",
    description: "A Jewish queen of Persia saves her people from genocide. Origin of Purim.",
    chapters: 10 },

  // ── Wisdom / poetry ─────────────────────────────────────────
  { id: "book-job", name: "Job", order: 18, testament: "OT", section: "wisdom",
    coversFrom: -2000, coversTo: -1800, writtenFrom: -950, writtenTo: -500,
    author: "Anonymous.",
    description: "A righteous patriarch's suffering and dialogue with friends and God.",
    chapters: 42 },
  { id: "book-psalms", name: "Psalms", order: 19, testament: "OT", section: "wisdom",
    coversFrom: -1010, coversTo: -440, writtenFrom: -1010, writtenTo: -440,
    author: "David (many), Asaph, sons of Korah, Solomon, Moses, others.",
    description: "150 prayers and songs, composed across many centuries and edited into a five-book collection.",
    chapters: 150 },
  { id: "book-proverbs", name: "Proverbs", order: 20, testament: "OT", section: "wisdom",
    coversFrom: -970, coversTo: -700, writtenFrom: -970, writtenTo: -700,
    author: "Solomon (chiefly), Agur, Lemuel; collected by Hezekiah's men.",
    description: "Practical wisdom for living rightly under God.",
    chapters: 31 },
  { id: "book-ecclesiastes", name: "Ecclesiastes", order: 21, testament: "OT", section: "wisdom",
    coversFrom: -935, coversTo: -935, writtenFrom: -935, writtenTo: -935,
    author: "Solomon (traditional); Qoheleth.",
    description: "A meditation on life's vanity and the right use of finite days under God.",
    chapters: 12 },
  { id: "book-song", name: "Song of Songs", order: 22, testament: "OT", section: "wisdom",
    coversFrom: -965, coversTo: -965, writtenFrom: -965, writtenTo: -965,
    author: "Solomon (traditional).",
    description: "A lyrical celebration of marital love.",
    chapters: 8 },

  // ── Major prophets ──────────────────────────────────────────
  { id: "book-isaiah", name: "Isaiah", order: 23, testament: "OT", section: "major-prophets",
    coversFrom: -740, coversTo: -686, writtenFrom: -740, writtenTo: -686,
    author: "Isaiah son of Amoz (traditional). Mainstream scholarship sees chs 40-66 as later.",
    description: "Prophecies of judgment and hope, including the Suffering Servant.",
    chapters: 66 },
  { id: "book-jeremiah", name: "Jeremiah", order: 24, testament: "OT", section: "major-prophets",
    coversFrom: -627, coversTo: -580, writtenFrom: -627, writtenTo: -580,
    author: "Jeremiah, with Baruch as scribe.",
    description: "The 'weeping prophet' through the fall of Jerusalem; promise of a New Covenant.",
    chapters: 52 },
  { id: "book-lamentations", name: "Lamentations", order: 25, testament: "OT", section: "major-prophets",
    coversFrom: -586, coversTo: -585, writtenFrom: -586, writtenTo: -580,
    author: "Jeremiah (traditional).",
    description: "Five poetic laments over the destruction of Jerusalem.",
    chapters: 5 },
  { id: "book-ezekiel", name: "Ezekiel", order: 26, testament: "OT", section: "major-prophets",
    coversFrom: -593, coversTo: -571, writtenFrom: -593, writtenTo: -571,
    author: "Ezekiel.",
    description: "Visionary prophecies to the Babylonian exiles — God's chariot-throne, dry bones, and a future temple.",
    chapters: 48 },
  { id: "book-daniel", name: "Daniel", order: 27, testament: "OT", section: "major-prophets",
    coversFrom: -605, coversTo: -535, writtenFrom: -540, writtenTo: -160,
    author: "Daniel (traditional, 6th C BC); some scholars argue for a 2nd-century BC compilation.",
    description: "Court narratives in Babylon and Persia, plus apocalyptic visions of four kingdoms and the Son of Man.",
    chapters: 12 },

  // ── Minor prophets ──────────────────────────────────────────
  { id: "book-hosea", name: "Hosea", order: 28, testament: "OT", section: "minor-prophets",
    coversFrom: -753, coversTo: -722, writtenFrom: -753, writtenTo: -722,
    author: "Hosea.",
    description: "Israel's idolatry as marital unfaithfulness to YHWH.",
    chapters: 14 },
  { id: "book-joel", name: "Joel", order: 29, testament: "OT", section: "minor-prophets",
    coversFrom: -835, coversTo: -400, writtenFrom: -835, writtenTo: -400,
    author: "Joel son of Pethuel.",
    description: "A locust plague becomes the lens for the Day of the LORD; quoted at Pentecost.",
    chapters: 3 },
  { id: "book-amos", name: "Amos", order: 30, testament: "OT", section: "minor-prophets",
    coversFrom: -760, coversTo: -750, writtenFrom: -760, writtenTo: -750,
    author: "Amos of Tekoa.",
    description: "Denounces social injustice in the wealthy Northern Kingdom under Jeroboam II.",
    chapters: 9 },
  { id: "book-obadiah", name: "Obadiah", order: 31, testament: "OT", section: "minor-prophets",
    coversFrom: -586, coversTo: -550, writtenFrom: -586, writtenTo: -550,
    author: "Obadiah.",
    description: "Shortest OT book — judgment on Edom for complicity in Jerusalem's distress.",
    chapters: 1 },
  { id: "book-jonah", name: "Jonah", order: 32, testament: "OT", section: "minor-prophets",
    coversFrom: -785, coversTo: -750, writtenFrom: -750, writtenTo: -400,
    author: "Anonymous (traditionally Jonah).",
    description: "A reluctant prophet, a great fish, and the repentance of Nineveh.",
    chapters: 4 },
  { id: "book-micah", name: "Micah", order: 33, testament: "OT", section: "minor-prophets",
    coversFrom: -740, coversTo: -686, writtenFrom: -740, writtenTo: -686,
    author: "Micah of Moresheth.",
    description: "Judgment on Samaria and Jerusalem; the messianic prophecy of Bethlehem.",
    chapters: 7 },
  { id: "book-nahum", name: "Nahum", order: 34, testament: "OT", section: "minor-prophets",
    coversFrom: -660, coversTo: -612, writtenFrom: -660, writtenTo: -612,
    author: "Nahum the Elkoshite.",
    description: "Vivid oracle of judgment against Nineveh shortly before its fall.",
    chapters: 3 },
  { id: "book-habakkuk", name: "Habakkuk", order: 35, testament: "OT", section: "minor-prophets",
    coversFrom: -612, coversTo: -598, writtenFrom: -612, writtenTo: -598,
    author: "Habakkuk.",
    description: "A dialogue with God on why he uses the wicked Babylonians. 'The righteous shall live by faith.'",
    chapters: 3 },
  { id: "book-zephaniah", name: "Zephaniah", order: 36, testament: "OT", section: "minor-prophets",
    coversFrom: -640, coversTo: -609, writtenFrom: -640, writtenTo: -609,
    author: "Zephaniah, descendant of Hezekiah.",
    description: "Day of the LORD against Judah and the nations during Josiah's reign.",
    chapters: 3 },
  { id: "book-haggai", name: "Haggai", order: 37, testament: "OT", section: "minor-prophets",
    coversFrom: -520, coversTo: -520, writtenFrom: -520, writtenTo: -520,
    author: "Haggai.",
    description: "Four short oracles in 520 BC urging the returnees to finish the Temple.",
    chapters: 2 },
  { id: "book-zechariah", name: "Zechariah", order: 38, testament: "OT", section: "minor-prophets",
    coversFrom: -520, coversTo: -480, writtenFrom: -520, writtenTo: -480,
    author: "Zechariah son of Berechiah.",
    description: "Visions of the rebuilt Temple and the Branch; heavily quoted in the Passion.",
    chapters: 14 },
  { id: "book-malachi", name: "Malachi", order: 39, testament: "OT", section: "minor-prophets",
    coversFrom: -440, coversTo: -430, writtenFrom: -440, writtenTo: -430,
    author: "Malachi.",
    description: "Final OT prophet — confronts priestly corruption; promises the coming of Elijah.",
    chapters: 4 },

  // ── Gospels ────────────────────────────────────────────────
  { id: "book-matthew", name: "Matthew", order: 40, testament: "NT", section: "gospels",
    coversFrom: -5, coversTo: 30, writtenFrom: 50, writtenTo: 70,
    author: "Matthew the apostle (traditional).",
    description: "Jesus as the promised Messiah of Israel; the Sermon on the Mount.",
    chapters: 28 },
  { id: "book-mark", name: "Mark", order: 41, testament: "NT", section: "gospels",
    coversFrom: 27, coversTo: 30, writtenFrom: 55, writtenTo: 70,
    author: "John Mark, on the testimony of Peter (traditional).",
    description: "The shortest, fastest-paced gospel — Jesus as servant and Son of God.",
    chapters: 16 },
  { id: "book-luke", name: "Luke", order: 42, testament: "NT", section: "gospels",
    coversFrom: -5, coversTo: 30, writtenFrom: 60, writtenTo: 80,
    author: "Luke, Paul's companion.",
    description: "An orderly account written for Theophilus; emphasis on outsiders, women, the poor.",
    chapters: 24 },
  { id: "book-john", name: "John", order: 43, testament: "NT", section: "gospels",
    coversFrom: 27, coversTo: 30, writtenFrom: 85, writtenTo: 95,
    author: "John the apostle (traditional).",
    description: "Theological reflection on Jesus as the eternal Word and 'I AM'.",
    chapters: 21 },

  // ── History (NT) ───────────────────────────────────────────
  { id: "book-acts", name: "Acts", order: 44, testament: "NT", section: "history-nt",
    coversFrom: 30, coversTo: 62, writtenFrom: 62, writtenTo: 80,
    author: "Luke.",
    description: "From Pentecost to Paul under house arrest in Rome — the gospel from Jerusalem to the empire.",
    chapters: 28 },

  // ── Pauline epistles ──────────────────────────────────────
  { id: "book-romans", name: "Romans", order: 45, testament: "NT", section: "epistles",
    coversFrom: 57, coversTo: 57, writtenFrom: 57, writtenTo: 57,
    author: "Paul.",
    description: "Paul's most systematic letter — the gospel for Jew and Gentile.",
    chapters: 16 },
  { id: "book-1corinthians", name: "1 Corinthians", order: 46, testament: "NT", section: "epistles",
    coversFrom: 55, coversTo: 55, writtenFrom: 55, writtenTo: 55,
    author: "Paul.",
    description: "Pastoral correction of a divided, gifted, immature church.",
    chapters: 16 },
  { id: "book-2corinthians", name: "2 Corinthians", order: 47, testament: "NT", section: "epistles",
    coversFrom: 56, coversTo: 56, writtenFrom: 56, writtenTo: 56,
    author: "Paul.",
    description: "Defense of his apostleship and a meditation on power-in-weakness.",
    chapters: 13 },
  { id: "book-galatians", name: "Galatians", order: 48, testament: "NT", section: "epistles",
    coversFrom: 49, coversTo: 55, writtenFrom: 49, writtenTo: 55,
    author: "Paul.",
    description: "Justification by faith, not by works of the law.",
    chapters: 6 },
  { id: "book-ephesians", name: "Ephesians", order: 49, testament: "NT", section: "epistles",
    coversFrom: 60, coversTo: 62, writtenFrom: 60, writtenTo: 62,
    author: "Paul (during his Roman imprisonment).",
    description: "God's eternal plan to unite all things in Christ.",
    chapters: 6 },
  { id: "book-philippians", name: "Philippians", order: 50, testament: "NT", section: "epistles",
    coversFrom: 60, coversTo: 62, writtenFrom: 60, writtenTo: 62,
    author: "Paul.",
    description: "Joy from prison; the great Christ-hymn of chapter 2.",
    chapters: 4 },
  { id: "book-colossians", name: "Colossians", order: 51, testament: "NT", section: "epistles",
    coversFrom: 60, coversTo: 62, writtenFrom: 60, writtenTo: 62,
    author: "Paul.",
    description: "Supremacy and sufficiency of Christ over all powers.",
    chapters: 4 },
  { id: "book-1thessalonians", name: "1 Thessalonians", order: 52, testament: "NT", section: "epistles",
    coversFrom: 50, coversTo: 51, writtenFrom: 50, writtenTo: 51,
    author: "Paul. Possibly Paul's earliest extant letter.",
    description: "Encouragement to a young persecuted church; the Lord's return.",
    chapters: 5 },
  { id: "book-2thessalonians", name: "2 Thessalonians", order: 53, testament: "NT", section: "epistles",
    coversFrom: 51, coversTo: 52, writtenFrom: 51, writtenTo: 52,
    author: "Paul.",
    description: "Clarifies misunderstandings about the Day of the Lord.",
    chapters: 3 },
  { id: "book-1timothy", name: "1 Timothy", order: 54, testament: "NT", section: "epistles",
    coversFrom: 63, coversTo: 65, writtenFrom: 63, writtenTo: 65,
    author: "Paul.",
    description: "Pastoral instruction for Timothy in Ephesus.",
    chapters: 6 },
  { id: "book-2timothy", name: "2 Timothy", order: 55, testament: "NT", section: "epistles",
    coversFrom: 64, coversTo: 67, writtenFrom: 64, writtenTo: 67,
    author: "Paul. Likely his last letter.",
    description: "Final exhortations from prison shortly before martyrdom.",
    chapters: 4 },
  { id: "book-titus", name: "Titus", order: 56, testament: "NT", section: "epistles",
    coversFrom: 63, coversTo: 66, writtenFrom: 63, writtenTo: 66,
    author: "Paul.",
    description: "Instruction for organizing the church in Crete.",
    chapters: 3 },
  { id: "book-philemon", name: "Philemon", order: 57, testament: "NT", section: "epistles",
    coversFrom: 60, coversTo: 62, writtenFrom: 60, writtenTo: 62,
    author: "Paul.",
    description: "Personal letter pleading for the runaway slave Onesimus.",
    chapters: 1 },

  // ── General epistles ──────────────────────────────────────
  { id: "book-hebrews", name: "Hebrews", order: 58, testament: "NT", section: "epistles",
    coversFrom: 60, coversTo: 70, writtenFrom: 60, writtenTo: 70,
    author: "Anonymous.",
    description: "Christ as the better and final priest; warning against drifting back to old patterns.",
    chapters: 13 },
  { id: "book-james", name: "James", order: 59, testament: "NT", section: "epistles",
    coversFrom: 45, coversTo: 50, writtenFrom: 45, writtenTo: 50,
    author: "James, brother of Jesus.",
    description: "Wisdom-style letter on faith expressed in works.",
    chapters: 5 },
  { id: "book-1peter", name: "1 Peter", order: 60, testament: "NT", section: "epistles",
    coversFrom: 62, coversTo: 64, writtenFrom: 62, writtenTo: 64,
    author: "Peter.",
    description: "Hope and holy living for suffering Christians scattered across Asia Minor.",
    chapters: 5 },
  { id: "book-2peter", name: "2 Peter", order: 61, testament: "NT", section: "epistles",
    coversFrom: 64, coversTo: 68, writtenFrom: 64, writtenTo: 68,
    author: "Peter (traditional).",
    description: "Warning against false teachers; certainty of the Lord's return.",
    chapters: 3 },
  { id: "book-1john", name: "1 John", order: 62, testament: "NT", section: "epistles",
    coversFrom: 85, coversTo: 95, writtenFrom: 85, writtenTo: 95,
    author: "John the apostle (traditional).",
    description: "Tests of true faith — light, love, and right confession of Jesus.",
    chapters: 5 },
  { id: "book-2john", name: "2 John", order: 63, testament: "NT", section: "epistles",
    coversFrom: 85, coversTo: 95, writtenFrom: 85, writtenTo: 95,
    author: "John the apostle (traditional).",
    description: "Brief letter on truth and love; warning against deceivers.",
    chapters: 1 },
  { id: "book-3john", name: "3 John", order: 64, testament: "NT", section: "epistles",
    coversFrom: 85, coversTo: 95, writtenFrom: 85, writtenTo: 95,
    author: "John the apostle (traditional).",
    description: "Personal letter to Gaius commending hospitality.",
    chapters: 1 },
  { id: "book-jude", name: "Jude", order: 65, testament: "NT", section: "epistles",
    coversFrom: 65, coversTo: 80, writtenFrom: 65, writtenTo: 80,
    author: "Jude, brother of Jesus and James.",
    description: "Sharp warning against false teachers infiltrating the church.",
    chapters: 1 },

  // ── Apocalypse ────────────────────────────────────────────
  { id: "book-revelation", name: "Revelation", order: 66, testament: "NT", section: "apocalypse",
    coversFrom: 95, coversTo: 95, writtenFrom: 95, writtenTo: 95,
    author: "John (traditional).",
    description: "Apocalyptic vision of the exalted Christ, the suffering church, and the new heaven and new earth.",
    chapters: 22 }
];

if (typeof module !== "undefined") module.exports = BibleTimeline;






