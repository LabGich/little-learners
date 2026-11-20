export type Lang = "en" | "sw";

export type ActivityType =
  | "multiple_choice"
  | "picture"
  | "matching"
  | "fill_blank"
  | "ordering";

export type Question = {
  // Existing questions default to multiple choice.
  type?: ActivityType;

  prompt: string;
  hint: string;

  // Multiple choice and picture activities.
  options: string[];
  answer: string;

  // Optional data for additional activity types.
  pictureOptions?: {
    label: string;
    emoji: string;
  }[];

  // Matching activities.
  pairs?: {
    left: string;
    right: string;
  }[];

  // Fill-in-the-blank activities.
  sentence?: string;

  // Ordering activities.
  items?: string[];
  correctOrder?: string[];
};

export type Lesson = {
  id: string;
  subject: string;
  age: number[];
  title: Record<Lang, string>;
  description: Record<Lang, string>;
  emoji: string;
  colour: string;
  intro: Record<Lang, string>;
  questions: Record<Lang, Question[]>;
};

export const subjects = [
  {
    id: "reading",
    emoji: "🔤",
    colour: "#FFE7A8",
    title: { en: "Reading & phonics", sw: "Kusoma na sauti" },
    subtitle: {
      en: "Letters, sounds and words",
      sw: "Herufi, sauti na maneno",
    },
  },
  {
    id: "maths",
    emoji: "🔢",
    colour: "#D9F2DE",
    title: { en: "Mathematics", sw: "Hisabati" },
    subtitle: { en: "Count, add and explore", sw: "Hesabu na maumbo" },
  },
  {
    id: "writing",
    emoji: "✏️",
    colour: "#F8DFF0",
    title: { en: "Writing", sw: "Kuandika" },
    subtitle: { en: "Letters and spelling", sw: "Herufi na tahajia" },
  },
  {
    id: "science",
    emoji: "🌱",
    colour: "#DDEBFF",
    title: { en: "Science & nature", sw: "Sayansi na mazingira" },
    subtitle: { en: "Discover the world", sw: "Gundua ulimwengu" },
  },
  {
    id: "life",
    emoji: "🤝",
    colour: "#FFE1D4",
    title: { en: "Life skills", sw: "Stadi za maisha" },
    subtitle: { en: "Healthy, safe and kind", sw: "Afya, usalama na wema" },
  },
  {
    id: "brain",
    emoji: "🧩",
    colour: "#E8E1FF",
    title: { en: "Brain games", sw: "Michezo ya akili" },
    subtitle: { en: "Patterns and puzzles", sw: "Mifumo na mafumbo" },
  },
] as const;

export const lessons: Lesson[] = [
  {
    id: "letter-a",
    subject: "reading",
    age: [6],
    title: { en: "Meet the letter A", sw: "Kutana na herufi A" },
    description: {
      en: "Learn the letter and its sound",
      sw: "Jifunze herufi na sauti yake",
    },
    emoji: "🍎",
    colour: "#FFE7A8",
    intro: {
      en: "A is a letter. It can make the /a/ sound, like in apple. Say it aloud: A, apple!",
      sw: "A ni herufi. Sema sauti yake kama katika “apple”. Sema kwa sauti: A!",
    },
    questions: {
      en: [
        {
          prompt: "Which word starts with A?",
          options: ["Apple", "Ball", "Cat"],
          answer: "Apple",
          hint: "Apple begins with the /a/ sound.",
        },
        {
          prompt: "Find the letter A.",
          options: ["M", "A", "S"],
          answer: "A",
          hint: "A has two slanting sides and a line across.",
        },

        {
          type: "picture",
          prompt: "Which picture begins with the letter A?",
          options: [],
          pictureOptions: [
            { label: "Apple", emoji: "🍎" },
            { label: "Ball", emoji: "⚽" },
            { label: "Cat", emoji: "🐱" },
          ],
          answer: "Apple",
          hint: "Apple begins with the letter A.",
        },
      ],
      sw: [
        {
          prompt: "Ni neno gani linaanza na sauti A?",
          options: ["Apple", "Ball", "Cat"],
          answer: "Apple",
          hint: "Apple huanza na sauti A.",
        },
        {
          prompt: "Tafuta herufi A.",
          options: ["M", "A", "S"],
          answer: "A",
          hint: "A ina mistari miwili ya mteremko.",
        },

        {
          type: "picture",
          prompt: "Ni picha gani inaanza na herufi A?",
          options: [],
          pictureOptions: [
            { label: "Apple", emoji: "🍎" },
            { label: "Ball", emoji: "⚽" },
            { label: "Cat", emoji: "🐱" },
          ],
          answer: "Apple",
          hint: "Apple huanza na herufi A.",
        },
      ],
    },
  },
  {
    id: "first-words",
    subject: "reading",
    age: [6, 7],
    title: { en: "My first words", sw: "Maneno yangu ya kwanza" },
    description: { en: "Read short everyday words", sw: "Soma maneno mafupi" },
    emoji: "📖",
    colour: "#FFE7A8",
    intro: {
      en: "Look at a word, say each sound slowly, then blend the sounds together.",
      sw: "Tazama neno, tamka sauti polepole, kisha ziunganishe.",
    },
    questions: {
      en: [
        {
          prompt: "Which word names an animal?",
          options: ["Dog", "Cup", "Sun"],
          answer: "Dog",
          hint: "A dog can bark: woof!",
        },
        {
          prompt: "Complete: c _ t",
          options: ["a", "o", "u"],
          answer: "a",
          hint: "C-a-t makes cat.",
        },
      ],
      sw: [
        {
          prompt: "Ni neno gani ni jina la mnyama?",
          options: ["Dog", "Cup", "Sun"],
          answer: "Dog",
          hint: "Dog ni mbwa kwa Kiingereza.",
        },
        {
          prompt: "Kamilisha neno c _ t.",
          options: ["a", "o", "u"],
          answer: "a",
          hint: "C-a-t hutengeneza cat.",
        },
      ],
    },
  },
  {
    id: "count-10",
    subject: "maths",
    age: [6],
    title: { en: "Count to 10", sw: "Hesabu hadi 10" },
    description: {
      en: "Count objects from one to ten",
      sw: "Hesabu vitu moja hadi kumi",
    },
    emoji: "🔟",
    colour: "#D9F2DE",
    intro: {
      en: "Let’s count together: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Touch each object as you count.",
      sw: "Tuhesabu pamoja: moja, mbili, tatu, nne, tano, sita, saba, nane, tisa, kumi.",
    },
    questions: {
      en: [
        {
          prompt: "What comes after 4?",
          options: ["3", "5", "6"],
          answer: "5",
          hint: "Count: 3, 4, 5.",
        },
        {
          prompt: "How many sides does a triangle have?",
          options: ["2", "3", "4"],
          answer: "3",
          hint: "A triangle has three straight sides.",
        },
      ],
      sw: [
        {
          prompt: "Ni namba gani inafuata 4?",
          options: ["3", "5", "6"],
          answer: "5",
          hint: "Hesabu: 3, 4, 5.",
        },
        {
          prompt: "Pembetatu ina pande ngapi?",
          options: ["2", "3", "4"],
          answer: "3",
          hint: "Pembetatu ina pande tatu.",
        },
      ],
    },
  },
  {
    id: "add-small",
    subject: "maths",
    age: [6, 7],
    title: { en: "Adding small numbers", sw: "Kujumlisha namba ndogo" },
    description: { en: "Put groups together", sw: "Unganisha vikundi" },
    emoji: "➕",
    colour: "#D9F2DE",
    intro: {
      en: "Addition means putting groups together. If you have 2 mangoes and get 1 more, you have 3 mangoes.",
      sw: "Kujumlisha ni kuunganisha vitu. Ukiwa na embe 2 na kupata 1 zaidi, unakuwa na maembe 3.",
    },
    questions: {
      en: [
        {
          prompt: "2 + 1 = ?",
          options: ["2", "3", "4"],
          answer: "3",
          hint: "Count two, then one more.",
        },
        {
          prompt: "3 + 2 = ?",
          options: ["4", "5", "6"],
          answer: "5",
          hint: "Start at 3 and count two more: 4, 5.",
        },
      ],
      sw: [
        {
          prompt: "2 + 1 = ?",
          options: ["2", "3", "4"],
          answer: "3",
          hint: "Hesabu mbili, kisha moja zaidi.",
        },
        {
          prompt: "3 + 2 = ?",
          options: ["4", "5", "6"],
          answer: "5",
          hint: "Anza 3, hesabu mbili zaidi: 4, 5.",
        },
      ],
    },
  },
  {
    id: "write-name",
    subject: "writing",
    age: [6, 7],
    title: { en: "Letters in my name", sw: "Herufi katika jina langu" },
    description: {
      en: "Recognise and practise letters",
      sw: "Tambua na fanya mazoezi ya herufi",
    },
    emoji: "✍️",
    colour: "#F8DFF0",
    intro: {
      en: "Your name is special. Say the letters in your name. Practise writing each letter slowly on paper.",
      sw: "Jina lako ni la pekee. Tamka herufi za jina lako na uzifanyie mazoezi kwenye karatasi.",
    },
    questions: {
      en: [
        {
          prompt: "Which one is an uppercase letter?",
          options: ["b", "B", "d"],
          answer: "B",
          hint: "Uppercase letters are the big letter shapes.",
        },
        {
          prompt: "Which letter comes first in “Mum”?",
          options: ["M", "u", "m"],
          answer: "M",
          hint: "Look at the first letter of Mum.",
        },
      ],
      sw: [
        {
          prompt: "Ni ipi herufi kubwa?",
          options: ["b", "B", "d"],
          answer: "B",
          hint: "Herufi kubwa huandikwa kwa umbo kubwa.",
        },
        {
          prompt: "Ni herufi gani ya kwanza katika “Mama”?",
          options: ["M", "a", "m"],
          answer: "M",
          hint: "Angalia herufi ya kwanza ya Mama.",
        },
      ],
    },
  },
  {
    id: "living-things",
    subject: "science",
    age: [6, 7, 8],
    title: { en: "Living things", sw: "Viumbe hai" },
    description: {
      en: "Plants, animals and people",
      sw: "Mimea, wanyama na watu",
    },
    emoji: "🌿",
    colour: "#DDEBFF",
    intro: {
      en: "Living things grow and need things like water and food. People, animals and plants are living things.",
      sw: "Viumbe hai hukua na huhitaji maji na chakula. Watu, wanyama na mimea ni viumbe hai.",
    },
    questions: {
      en: [
        {
          prompt: "Which one is a living thing?",
          options: ["Tree", "Stone", "Chair"],
          answer: "Tree",
          hint: "A tree grows and needs water.",
        },
        {
          prompt: "What do plants need to grow?",
          options: ["Water", "Shoes", "Toys"],
          answer: "Water",
          hint: "Plants need water, light and air.",
        },
      ],
      sw: [
        {
          prompt: "Kipi ni kiumbe hai?",
          options: ["Mti", "Jiwe", "Kiti"],
          answer: "Mti",
          hint: "Mti hukua na huhitaji maji.",
        },
        {
          prompt: "Mimea huhitaji nini ili ikue?",
          options: ["Maji", "Viatu", "Vichezeo"],
          answer: "Maji",
          hint: "Mimea huhitaji maji, mwanga na hewa.",
        },
      ],
    },
  },
  {
    id: "good-habits",
    subject: "life",
    age: [6, 7, 8],
    title: { en: "Healthy habits", sw: "Tabia za afya" },
    description: {
      en: "Keep your body clean and healthy",
      sw: "Tunza mwili wako",
    },
    emoji: "🧼",
    colour: "#FFE1D4",
    intro: {
      en: "Wash your hands with soap before eating and after using the toilet. Brush your teeth every morning and night.",
      sw: "Nawa mikono kwa sabuni kabla ya kula na baada ya kutoka chooni. Piga mswaki asubuhi na jioni.",
    },
    questions: {
      en: [
        {
          prompt: "When should you wash your hands?",
          options: ["Before eating", "Never", "Only on Sunday"],
          answer: "Before eating",
          hint: "Clean hands help keep germs away.",
        },
        {
          prompt: "What do you use to brush your teeth?",
          options: ["Toothbrush", "Spoon", "Comb"],
          answer: "Toothbrush",
          hint: "A toothbrush cleans your teeth.",
        },
      ],
      sw: [
        {
          prompt: "Unapaswa kunawa mikono lini?",
          options: ["Kabla ya kula", "Kamwe", "Jumapili pekee"],
          answer: "Kabla ya kula",
          hint: "Mikono safi husaidia kuondoa vijidudu.",
        },
        {
          prompt: "Unatumia nini kupiga mswaki?",
          options: ["Mswaki", "Kijiko", "Chanuo"],
          answer: "Mswaki",
          hint: "Mswaki husafisha meno.",
        },
      ],
    },
  },
  {
    id: "patterns",
    subject: "brain",
    age: [6, 7, 8],
    title: { en: "Find the pattern", sw: "Tafuta mfumo" },
    description: {
      en: "Look, think and choose what comes next",
      sw: "Tazama, fikiria na uchague kinachofuata",
    },
    emoji: "🟡",
    colour: "#E8E1FF",
    intro: {
      en: "A pattern repeats in the same order. Look carefully: red, blue, red, blue. What comes next?",
      sw: "Mfumo hurudia kwa mpangilio uleule. Tazama: nyekundu, bluu, nyekundu, bluu. Nini kinafuata?",
    },
    questions: {
      en: [
        {
          prompt: "Red, blue, red, blue, ...?",
          options: ["Red", "Green", "Yellow"],
          answer: "Red",
          hint: "The colours take turns: red, then blue.",
        },
        {
          prompt: "2, 4, 6, ...?",
          options: ["7", "8", "9"],
          answer: "8",
          hint: "Count by twos: 2, 4, 6, 8.",
        },
      ],
      sw: [
        {
          prompt: "Nyekundu, bluu, nyekundu, bluu, ...?",
          options: ["Nyekundu", "Kijani", "Njano"],
          answer: "Nyekundu",
          hint: "Rangi zinabadilishana: nyekundu, kisha bluu.",
        },
        {
          prompt: "2, 4, 6, ...?",
          options: ["7", "8", "9"],
          answer: "8",
          hint: "Hesabu kwa mafungu ya mbili: 2, 4, 6, 8.",
        },
      ],
    },
  },

  // READING
  {
    id: "letter-b",
    subject: "reading",
    age: [6],
    title: { en: "Meet the letter B", sw: "Kutana na herufi B" },
    description: {
      en: "Learn the letter B and its sound",
      sw: "Jifunze herufi B na sauti yake",
    },
    emoji: "⚽",
    colour: "#FFE7A8",
    intro: {
      en: "B makes the /b/ sound, like in ball, boy and banana. Say the sound aloud: b-b-ball!",
      sw: "Herufi B hutumika katika maneno kama banana na ball. Tamka sauti yake: B!",
    },
    questions: {
      en: [
        {
          prompt: "Which word starts with B?",
          options: ["Ball", "Cat", "Apple"],
          answer: "Ball",
          hint: "Ball begins with the /b/ sound.",
        },
        {
          prompt: "Find the letter B.",
          options: ["D", "B", "P"],
          answer: "B",
          hint: "B has one straight line and two curved parts.",
        },
      ],
      sw: [
        {
          prompt: "Ni neno gani linaanza na herufi B?",
          options: ["Ball", "Cat", "Apple"],
          answer: "Ball",
          hint: "Ball huanza na sauti B.",
        },
        {
          prompt: "Tafuta herufi B.",
          options: ["D", "B", "P"],
          answer: "B",
          hint: "B ina mstari mmoja ulionyooka na sehemu mbili za mviringo.",
        },
      ],
    },
  },
  {
    id: "simple-sentences",
    subject: "reading",
    age: [7, 8],
    title: { en: "Read simple sentences", sw: "Soma sentensi rahisi" },
    description: {
      en: "Understand short sentences",
      sw: "Elewa sentensi fupi",
    },
    emoji: "📚",
    colour: "#FFE7A8",
    intro: {
      en: "A sentence is a group of words that gives us an idea. Read this: The girl is happy.",
      sw: "Sentensi ni kundi la maneno linalotoa ujumbe. Soma: Msichana ana furaha.",
    },
    questions: {
      en: [
        {
          prompt: 'Who is happy in "The girl is happy"?',
          options: ["The girl", "The dog", "The boy"],
          answer: "The girl",
          hint: "Look at the person named in the sentence.",
        },
        {
          prompt: "Choose the sentence that makes sense.",
          options: [
            "The sun is hot.",
            "Sun the is hot.",
            "Hot is the sun the.",
          ],
          answer: "The sun is hot.",
          hint: "A sentence has words in the correct order.",
        },
      ],
      sw: [
        {
          prompt: 'Nani ana furaha katika "Msichana ana furaha"?',
          options: ["Msichana", "Mbwa", "Mvulana"],
          answer: "Msichana",
          hint: "Tazama mtu aliyetajwa katika sentensi.",
        },
        {
          prompt: "Chagua sentensi iliyo katika mpangilio sahihi.",
          options: ["Jua lina joto.", "Joto jua lina.", "Lina jua joto."],
          answer: "Jua lina joto.",
          hint: "Maneno yanapaswa kuwa katika mpangilio unaoeleweka.",
        },
      ],
    },
  },

  // MATHEMATICS
  {
    id: "count-to-20",
    subject: "maths",
    age: [6, 7],
    title: { en: "Count to 20", sw: "Hesabu hadi 20" },
    description: {
      en: "Practise counting from 11 to 20",
      sw: "Fanya mazoezi ya kuhesabu hadi 20",
    },
    emoji: "🔢",
    colour: "#D9F2DE",
    intro: {
      en: "After 10 comes 11, 12, 13, 14, 15, 16, 17, 18, 19 and 20. Practise saying the numbers aloud.",
      sw: "Baada ya 10 tunapata 11, 12, 13, 14, 15, 16, 17, 18, 19 na 20. Sema namba hizi kwa sauti.",
    },
    questions: {
      en: [
        {
          prompt: "What comes after 14?",
          options: ["13", "15", "16"],
          answer: "15",
          hint: "Count: 13, 14, 15.",
        },
        {
          prompt: "Which number is the biggest?",
          options: ["12", "18", "15"],
          answer: "18",
          hint: "Compare the three numbers.",
        },
      ],
      sw: [
        {
          prompt: "Ni namba gani inafuata 14?",
          options: ["13", "15", "16"],
          answer: "15",
          hint: "Hesabu: 13, 14, 15.",
        },
        {
          prompt: "Ni namba gani kubwa zaidi?",
          options: ["12", "18", "15"],
          answer: "18",
          hint: "Linganisha namba hizo tatu.",
        },
      ],
    },
  },
  {
    id: "subtraction",
    subject: "maths",
    age: [7, 8],
    title: { en: "Taking away numbers", sw: "Kutoa namba" },
    description: {
      en: "Learn simple subtraction",
      sw: "Jifunze kutoa namba rahisi",
    },
    emoji: "➖",
    colour: "#D9F2DE",
    intro: {
      en: "Subtraction means taking something away. If you have 5 mangoes and give away 2, you have 3 left.",
      sw: "Kutoa ni kuondoa baadhi ya vitu. Ukiwa na maembe 5 na ukatoa 2, unabaki na maembe 3.",
    },
    questions: {
      en: [
        {
          prompt: "5 - 2 = ?",
          options: ["2", "3", "4"],
          answer: "3",
          hint: "Start at 5 and count backwards twice.",
        },
        {
          prompt: "8 - 3 = ?",
          options: ["4", "5", "6"],
          answer: "5",
          hint: "Count backwards: 8, 7, 6, 5.",
        },
      ],
      sw: [
        {
          prompt: "5 - 2 = ?",
          options: ["2", "3", "4"],
          answer: "3",
          hint: "Anza 5 kisha hesabu kurudi nyuma mara mbili.",
        },
        {
          prompt: "8 - 3 = ?",
          options: ["4", "5", "6"],
          answer: "5",
          hint: "Hesabu kurudi nyuma: 8, 7, 6, 5.",
        },
      ],
    },
  },

  // WRITING
  {
    id: "vowels",
    subject: "writing",
    age: [6, 7],
    title: { en: "The five vowels", sw: "Irabu tano" },
    description: {
      en: "Recognise A, E, I, O and U",
      sw: "Tambua A, E, I, O na U",
    },
    emoji: "🔠",
    colour: "#F8DFF0",
    intro: {
      en: "The five vowels in English are A, E, I, O and U. Practise saying and writing each one.",
      sw: "Irabu tano ni A, E, I, O na U. Zitamke na uziandike.",
    },
    questions: {
      en: [
        {
          prompt: "Which one is a vowel?",
          options: ["B", "A", "T"],
          answer: "A",
          hint: "The vowels are A, E, I, O and U.",
        },
        {
          prompt: "Which vowel comes after E?",
          options: ["A", "I", "O"],
          answer: "I",
          hint: "Say the vowels in order: A, E, I, O, U.",
        },
      ],
      sw: [
        {
          prompt: "Ni ipi kati ya hizi ni irabu?",
          options: ["B", "A", "T"],
          answer: "A",
          hint: "Irabu ni A, E, I, O na U.",
        },
        {
          prompt: "Ni irabu gani inayofuata E?",
          options: ["A", "I", "O"],
          answer: "I",
          hint: "Sema irabu kwa mpangilio: A, E, I, O, U.",
        },
      ],
    },
  },
  {
    id: "capital-letters",
    subject: "writing",
    age: [7, 8],
    title: { en: "Capital letters", sw: "Herufi kubwa" },
    description: {
      en: "Learn when to use capital letters",
      sw: "Jifunze kutumia herufi kubwa",
    },
    emoji: "✍️",
    colour: "#F8DFF0",
    intro: {
      en: "We use a capital letter at the beginning of a sentence and for names of people and places. Example: Mary lives in Nairobi.",
      sw: "Tunatumia herufi kubwa mwanzoni mwa sentensi na katika majina ya watu na sehemu. Mfano: Mary anaishi Nairobi.",
    },
    questions: {
      en: [
        {
          prompt: "Which is written correctly?",
          options: ["mary", "Mary", "MARY"],
          answer: "Mary",
          hint: "A person’s name begins with a capital letter.",
        },
        {
          prompt: "Which word needs a capital letter?",
          options: ["nairobi", "book", "chair"],
          answer: "nairobi",
          hint: "Names of places begin with capital letters.",
        },
      ],
      sw: [
        {
          prompt: "Ni jina gani limeandikwa kwa usahihi?",
          options: ["mary", "Mary", "MARY"],
          answer: "Mary",
          hint: "Jina la mtu huanza na herufi kubwa.",
        },
        {
          prompt: "Ni neno gani linahitaji herufi kubwa?",
          options: ["nairobi", "kitabu", "kiti"],
          answer: "nairobi",
          hint: "Majina ya sehemu huanza na herufi kubwa.",
        },
      ],
    },
  },

  // SCIENCE
  {
    id: "plants",
    subject: "science",
    age: [6, 7, 8],
    title: { en: "Parts of a plant", sw: "Sehemu za mmea" },
    description: {
      en: "Discover roots, stems and leaves",
      sw: "Gundua mizizi, shina na majani",
    },
    emoji: "🌻",
    colour: "#DDEBFF",
    intro: {
      en: "A plant has different parts. Roots take in water, the stem supports the plant, and leaves help it make food using sunlight.",
      sw: "Mmea una sehemu mbalimbali. Mizizi hufyonza maji, shina hushikilia mmea, na majani husaidia mmea kutengeneza chakula kwa kutumia mwanga wa jua.",
    },
    questions: {
      en: [
        {
          prompt: "Which part takes in water from the soil?",
          options: ["Roots", "Flowers", "Leaves"],
          answer: "Roots",
          hint: "Roots grow under the ground.",
        },
        {
          prompt: "Which part supports the plant?",
          options: ["Stem", "Fruit", "Seed"],
          answer: "Stem",
          hint: "The stem holds the plant upright.",
        },
      ],
      sw: [
        {
          prompt: "Ni sehemu gani hufyonza maji kutoka ardhini?",
          options: ["Mizizi", "Maua", "Majani"],
          answer: "Mizizi",
          hint: "Mizizi hukua chini ya ardhi.",
        },
        {
          prompt: "Ni sehemu gani hushikilia mmea?",
          options: ["Shina", "Tunda", "Mbegu"],
          answer: "Shina",
          hint: "Shina husaidia mmea kusimama wima.",
        },
      ],
    },
  },
  {
    id: "weather",
    subject: "science",
    age: [6, 7, 8],
    title: { en: "Weather around us", sw: "Hali ya hewa" },
    description: {
      en: "Learn about sunny, rainy and windy days",
      sw: "Jifunze kuhusu jua, mvua na upepo",
    },
    emoji: "🌦️",
    colour: "#DDEBFF",
    intro: {
      en: "Weather describes what the air and sky are like. A day can be sunny, rainy, cloudy or windy.",
      sw: "Hali ya hewa hueleza jinsi anga na hewa zilivyo. Siku inaweza kuwa ya jua, mvua, mawingu au upepo.",
    },
    questions: {
      en: [
        {
          prompt: "What do we use to protect ourselves from rain?",
          options: ["Umbrella", "Sunglasses", "Fan"],
          answer: "Umbrella",
          hint: "An umbrella keeps rain off your body.",
        },
        {
          prompt: "What gives us light and warmth during the day?",
          options: ["Moon", "Sun", "Stars"],
          answer: "Sun",
          hint: "It shines in the sky during the day.",
        },
      ],
      sw: [
        {
          prompt: "Tunatumia nini kujikinga na mvua?",
          options: ["Mwavuli", "Miwani ya jua", "Feni"],
          answer: "Mwavuli",
          hint: "Mwavuli hutukinga dhidi ya mvua.",
        },
        {
          prompt: "Ni nini hutupatia mwanga na joto wakati wa mchana?",
          options: ["Mwezi", "Jua", "Nyota"],
          answer: "Jua",
          hint: "Huangaza angani wakati wa mchana.",
        },
      ],
    },
  },

  // LIFE SKILLS
  {
    id: "road-safety",
    subject: "life",
    age: [6, 7, 8],
    title: { en: "Road safety", sw: "Usalama barabarani" },
    description: {
      en: "Learn how to cross roads safely",
      sw: "Jifunze kuvuka barabara kwa usalama",
    },
    emoji: "🚦",
    colour: "#FFE1D4",
    intro: {
      en: "Stop before crossing. Look right, look left and look right again. Cross with a trusted adult when possible, and use a safe crossing.",
      sw: "Simama kabla ya kuvuka. Angalia kulia, kushoto na kulia tena. Vuka pamoja na mtu mzima unayemwamini inapowezekana, na tumia sehemu salama ya kuvukia.",
    },
    questions: {
      en: [
        {
          prompt: "What should you do before crossing a road?",
          options: ["Stop and look", "Run quickly", "Close your eyes"],
          answer: "Stop and look",
          hint: "Always check for traffic before crossing.",
        },
        {
          prompt: "Who should help a young child cross a busy road?",
          options: ["A trusted adult", "A stranger", "Nobody"],
          answer: "A trusted adult",
          hint: "Ask a parent, teacher or another trusted adult.",
        },
      ],
      sw: [
        {
          prompt: "Unapaswa kufanya nini kabla ya kuvuka barabara?",
          options: ["Simama na uangalie", "Kimbia haraka", "Fumba macho"],
          answer: "Simama na uangalie",
          hint: "Angalia magari kabla ya kuvuka.",
        },
        {
          prompt:
            "Nani anapaswa kumsaidia mtoto kuvuka barabara yenye magari mengi?",
          options: ["Mtu mzima unayemwamini", "Mtu usiyemjua", "Hakuna mtu"],
          answer: "Mtu mzima unayemwamini",
          hint: "Muombe mzazi, mwalimu au mtu mzima unayemwamini.",
        },
      ],
    },
  },
  {
    id: "good-manners",
    subject: "life",
    age: [6, 7, 8],
    title: { en: "Kindness and good manners", sw: "Wema na adabu" },
    description: {
      en: "Practise being kind and respectful",
      sw: "Jifunze kuwa mwema na mwenye heshima",
    },
    emoji: "💛",
    colour: "#FFE1D4",
    intro: {
      en: "Kindness means treating others with care. Use words like please, thank you and sorry. Share and listen when others speak.",
      sw: "Wema ni kuwatendea wengine kwa upendo. Tumia maneno kama tafadhali, asante na samahani. Shiriki na usikilize wengine wanapozungumza.",
    },
    questions: {
      en: [
        {
          prompt: "What should you say when someone helps you?",
          options: ["Thank you", "Go away", "Nothing"],
          answer: "Thank you",
          hint: "Thank people when they help you.",
        },
        {
          prompt: "Your friend falls down. What should you do?",
          options: ["Help them", "Laugh at them", "Walk away"],
          answer: "Help them",
          hint: "Kind people care for others.",
        },
      ],
      sw: [
        {
          prompt: "Unapaswa kusema nini mtu akikusaidia?",
          options: ["Asante", "Ondoka", "Hakuna"],
          answer: "Asante",
          hint: "Washukuru watu wanapokusaidia.",
        },
        {
          prompt: "Rafiki yako akianguka, unapaswa kufanya nini?",
          options: ["Msaidie", "Mcheke", "Ondoka"],
          answer: "Msaidie",
          hint: "Watu wema huwajali wengine.",
        },
      ],
    },
  },

  // BRAIN GAMES
  {
    id: "shapes",
    subject: "brain",
    age: [6, 7],
    title: { en: "Shapes around us", sw: "Maumbo yanayotuzunguka" },
    description: { en: "Recognise simple shapes", sw: "Tambua maumbo rahisi" },
    emoji: "🔺",
    colour: "#E8E1FF",
    intro: {
      en: "Shapes are all around us. A circle is round, a square has four equal sides, and a triangle has three sides.",
      sw: "Maumbo yapo kila mahali. Duara ni la mviringo, mraba una pande nne zilizo sawa, na pembetatu ina pande tatu.",
    },
    questions: {
      en: [
        {
          prompt: "Which shape has three sides?",
          options: ["Circle", "Triangle", "Square"],
          answer: "Triangle",
          hint: "A triangle has three straight sides.",
        },
        {
          prompt: "Which shape is round?",
          options: ["Circle", "Square", "Rectangle"],
          answer: "Circle",
          hint: "A circle has no corners.",
        },
      ],
      sw: [
        {
          prompt: "Ni umbo gani lina pande tatu?",
          options: ["Duara", "Pembetatu", "Mraba"],
          answer: "Pembetatu",
          hint: "Pembetatu ina pande tatu.",
        },
        {
          prompt: "Ni umbo gani ni la mviringo?",
          options: ["Duara", "Mraba", "Mstatili"],
          answer: "Duara",
          hint: "Duara halina pembe.",
        },
      ],
    },
  },
  {
    id: "number-patterns",
    subject: "brain",
    age: [7, 8],
    title: { en: "Number puzzles", sw: "Mafumbo ya namba" },
    description: {
      en: "Think about number sequences",
      sw: "Fikiri kuhusu mfuatano wa namba",
    },
    emoji: "🧠",
    colour: "#E8E1FF",
    intro: {
      en: "Number sequences follow a rule. Look for what changes each time. For example: 5, 10, 15, 20. We add 5 each time.",
      sw: "Mfuatano wa namba hufuata kanuni. Tafuta kinachobadilika kila mara. Mfano: 5, 10, 15, 20. Tunaongeza 5 kila mara.",
    },
    questions: {
      en: [
        {
          prompt: "3, 6, 9, 12, ...?",
          options: ["13", "14", "15"],
          answer: "15",
          hint: "Add 3 each time.",
        },
        {
          prompt: "20, 18, 16, ...?",
          options: ["14", "15", "17"],
          answer: "14",
          hint: "Take away 2 each time.",
        },
      ],
      sw: [
        {
          prompt: "3, 6, 9, 12, ...?",
          options: ["13", "14", "15"],
          answer: "15",
          hint: "Ongeza 3 kila mara.",
        },
        {
          prompt: "20, 18, 16, ...?",
          options: ["14", "15", "17"],
          answer: "14",
          hint: "Punguza 2 kila mara.",
        },
      ],
    },
  },
];
