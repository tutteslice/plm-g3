const fs = require('fs');

const cards = [];
let idCounter = 1;

function addCards(type, textList, amount, action = 'drink') {
  for (const item of textList) {
    if (typeof item === 'string') {
      cards.push({ id: idCounter++, type, text: item, action, amount });
    } else {
      cards.push({ id: idCounter++, type, text: item.text, action, amount, audio: item.audio });
    }
  }
}

// 1. Group Cards
const groupCards = [
  "Everyone wearing glasses, take a sip.",
  "Everyone wearing black, take a sip.",
  "If you've ever ghosted someone, take a sip.",
  "If you have a tattoo, take 2 sips.",
  "Everyone who is single, take a sip.",
  "Everyone in a relationship, take a sip.",
  "If you've ever texted an ex while drunk, finish your drink.",
  "Everyone shorter than 170cm, take a sip.",
  "Everyone taller than 180cm, take a sip.",
  "If you have an iPhone, take a sip.",
  "If you have an Android, take 2 sips.",
  "Everyone who drank coffee today, take a sip.",
  "If you've ever lied about your age, take a sip.",
  "If you've ever stolen something small, take 2 sips.",
  "Everyone who likes pineapple on pizza, take a sip.",
  "Everyone who hates pineapple on pizza, take a sip.",
  "If you've ever slept through an alarm, take a sip.",
  "If you've ever faked being sick to get out of work/school, take a sip.",
  "If you've ever tripped in public, take a sip.",
  "Everyone who has cried during a movie, take a sip.",
  "If you can speak more than 2 languages, give out 3 sips.",
  "Everyone who has dyed their hair, take a sip.",
  "If you've ever been pulled over by the police, take 2 sips.",
  "Everyone who has a pet, take a sip.",
  "If you've ever broken a bone, take a sip.",
  "Everyone wearing a necklace, take a sip.",
  "If you've ever ghosted someone after a first date, take 2 sips.",
  "Everyone who has a tattoo they regret, take 3 sips.",
  "If you prefer sweet over savory, take a sip.",
  "Everyone who has ever been on TV, finish your drink.",
  "If you've ever cried at a wedding, take a sip.",
  "Everyone who is currently wearing makeup, take a sip.",
  "If you've ever sent a nude, take a sip.",
  "If you've never sent a nude, take 2 sips.",
  "Everyone who hates their current job, take a sip.",
  "If you still live with your parents, take a sip.",
  "Everyone who has ever been suspended from school, take a sip.",
  "If you've ever kissed someone in this room, take 2 sips.",
  "Everyone who has ever been in a physical fight, take a sip.",
  "If you've ever been fired from a job and cried, take 2 sips.",
  "Everyone who uses TikTok daily, take a sip.",
  "If you've ever met someone from a dating app, take a sip.",
  "Everyone who has a sibling they hate, take a sip.",
  "If you've ever been black-out drunk, take a sip.",
  "Everyone who has puked from drinking, take a sip."
];
addCards('group', groupCards, 1);

// 2. Individual Prompts (You)
const youCards = [
  "Take a sip if you are the youngest player.",
  "Take a sip if you are the oldest player.",
  "Give out 2 sips if you have the most Instagram followers.",
  "Take a sip for every sibling you have.",
  "Take a sip if your phone screen is cracked.",
  "Give out a sip if you have 100% battery, otherwise take a sip.",
  "Take a sip if you are wearing white socks.",
  "Drink if you're the last person to have had a birthday.",
  "Give out 3 sips to the person on your right.",
  "Take a sip if you have more than 3 keys on your keychain.",
  "Drink if you can't touch your toes.",
  "Give out 2 sips if you can whistle.",
  "Take a sip if you're left-handed.",
  "Drink if you have a Tinder/Hinge profile right now.",
  "Take a sip if you've ever used a fake ID.",
  "Drink if you've ever been to a festival.",
  "Give out a sip to anyone who has ever bought you a drink.",
  "Take a sip if you've ever been fired from a job.",
  "Drink if you've ever been on a blind date.",
  "Give out 2 sips if you have a gym membership you actually use.",
  "Take a sip if you have a gym membership you never use.",
  "Drink if you've ever gotten a speeding ticket.",
  "Give out 3 sips if you've ever cooked a three-course meal.",
  "Take a sip if you can't roll your r's.",
  "Drink if you have a middle name.",
  "Take a sip if you are the tallest person in the room.",
  "Give out 2 sips if you have the most battery left on your phone.",
  "Take a sip if you have 0 unread messages.",
  "Give out 3 sips if you have more than 50 unread messages.",
  "Take a sip if you're wearing a ring.",
  "Drink if you've ever been dumped over text.",
  "Give out a sip to the person with the best smile.",
  "Take a sip if you have a private Instagram account.",
  "Drink if you've ever used someone else's Netflix account.",
  "Give out 2 sips if you've ever paid for a subscription you forgot to cancel.",
  "Take a sip if you can touch your nose with your tongue.",
  "Drink if you've ever broken someone's heart.",
  "Give out 2 sips if you've ever had a paranormal experience.",
  "Take a sip if you believe in aliens.",
  "Drink if you've ever sneaked into a club/bar.",
  "Give out a sip if you can name 5 capitals in Europe in 10 seconds. If you fail, you drink.",
  "Take a sip if you sleep with socks on.",
  "Drink if you've ever sent a text to the wrong person.",
  "Give out 2 sips if you've ever gotten a tattoo while drunk.",
  "Take a sip if you're the worst cook in the room."
];
addCards('single', youCards, 1);

// 3. Mini Games / Actions
const actionCards = [
  { text: "If you know this song, take a sip and sing along!", audio: "https://www.youtube.com/watch?v=vfIAhr2uQHI" },
  { text: "If you know this song, take a sip and sing along!", audio: "https://www.youtube.com/watch?v=FTQ4hDnXyoY" },
  { text: "If you know this song, take a sip and sing along!", audio: "https://www.youtube.com/watch?v=mUa5Hxv8T3s" },
  { text: "If you know this song, take a sip and sing along!", audio: "https://www.youtube.com/watch?v=ldr0Wdyi_OI" },
  { text: "If you know this song, take a sip and sing along!", audio: "https://www.youtube.com/watch?v=S_Eyz3sW9Dw" },
  { text: "If you know this song, take a sip and sing along!", audio: "https://www.youtube.com/watch?v=4lWgvFQX2MM" },
  { text: "If you know this song, take a sip and sing along!", audio: "https://www.youtube.com/watch?v=IRrtV8YVx7U" },
  { text: "If you know this song, take a sip and sing along!", audio: "https://www.youtube.com/watch?v=TRRW_rT1v3I" },
  { text: "If you know this song, take a sip and sing along!", audio: "https://www.youtube.com/watch?v=I34q-CgPs8w" },
  { text: "If you know this song, take a sip and sing along!", audio: "https://www.youtube.com/watch?v=L68tpgDNY2o" },
  "Categories: Brands of alcohol. You start. Go around the circle. First to fail drinks 2 sips.",
  "Categories: Fast food chains. You start. First to fail drinks 2 sips.",
  "Categories: Car brands. You start. First to fail drinks 2 sips.",
  "Rule: You must drink with your non-dominant hand until your next turn. Drink if you forget.",
  "Rule: No pointing. If anyone points, they drink 1 sip. Lasts until your next turn.",
  "Rule: No swearing. If anyone swears, they drink 1 sip. Lasts until your next turn.",
  "Rule: Nicknames only. If you use a real name, drink. Lasts until your next turn.",
  "Thumb Master: You are the Thumb Master. Place your thumb on the table. Last to copy you drinks. Lasts until the next Thumb Master.",
  "Question Master: If you ask a question and someone answers, they drink. Lasts until the next Question Master.",
  "Mate: Choose a mate. Whenever you drink, they drink. Lasts for 3 rounds.",
  "Waterfall: Everyone starts drinking. You can't stop until the person to your right stops. You start.",
  "Rhyme time: Say a word. Go around the circle rhyming. First to fail drinks 2 sips.",
  "Never have I ever: Say something you've never done. Anyone who has done it drinks 1 sip.",
  "Never have I ever: Gotten blackout drunk. If you have, drink.",
  "Never have I ever: Sent a risky text. If you have, drink.",
  "Truth or Dare: Choose one. If you refuse, take 3 sips.",
  "Dare: Let the group send a text to someone in your contacts. If you refuse, finish your drink.",
  "Dare: Do 10 pushups. If you fail, take 2 sips.",
  "Dare: Let the person to your left draw something on your face with a pen. If you refuse, take 3 sips.",
  "Truth: Who in this room would you survive the longest with on a deserted island? The chosen person takes a sip.",
  "Truth: Who is the worst dressed here? They take a sip.",
  "Truth: Have you ever had a crush on someone in this room? If yes, drink.",
  "Action: Swap seats with the person across from you.",
  "Action: Give your phone to the person on your right for 1 minute.",
  "Action: Do your best impression of another player. If they guess who it is, they drink. If not, you drink.",
  "Rule: No names. You must point to talk to someone. If anyone uses a name, they drink. Lasts until your next turn.",
  "Categories: Pokemon. You start. First to fail drinks 2 sips.",
  "Categories: Video Games. You start. First to fail drinks 2 sips.",
  "Dare: Show the group the last photo you took on your phone. If you refuse, take 3 sips.",
  "Truth: What is your most embarrassing drunk story? If you refuse, take 3 sips.",
  "Mate: Choose two mates. Whenever you drink, they both drink. Lasts for 2 rounds.",
  "Rule: Little green man. Before you drink, you must 'remove' the imaginary little green man from your cup. If you forget, drink again.",
  "Action: Staring contest with the person on your left. Loser drinks 2 sips.",
  "Action: Arm wrestle the person on your right. Loser drinks 2 sips.",
  "Dare: Let the group look at your screen time. If you refuse, take 3 sips.",
  "Never have I ever: Cheated on a test. If you have, drink.",
  "Never have I ever: Snooped through a partner's phone. If you have, drink.",
  "Truth: Who in this room do you think has the highest body count? They take a sip.",
  "Truth: Who in this room is the most likely to get arrested? They take a sip.",
  "Dare: Call a random contact and sing Happy Birthday. If you refuse, take 4 sips.",
  "Action: Everyone vote on who is the funniest in the group. The winner gives out 3 sips.",
  "Rule: Speak in an accent until your next turn. If you break character, take a sip.",
  "Action: Play rock, paper, scissors with the person across from you. Loser takes 2 sips.",
  "Dare: Do 10 squats. If you fail, take 2 sips.",
  "Truth: What is the biggest lie you've ever told your parents? If you refuse, take 3 sips."
];
addCards('action', actionCards, 2);

// 4. Fill the rest to reach 100
const fillerCards = [
  "Take a sip if you prefer dogs over cats.",
  "Take a sip if you prefer cats over dogs.",
  "Give out 2 sips if you've read a book this month.",
  "Take a sip if you're currently wearing a watch.",
  "Drink if you've ever thrown up in a taxi.",
  "Take 2 sips if you've ever been kicked out of a bar.",
  "Everyone who has an empty glass, refill and take a sip.",
  "If you are the host, hand out 3 sips.",
  "If you arrived late today, take a sip.",
  "If you arrived first today, hand out 2 sips.",
  "Take a sip if you've ever eaten food off the floor.",
  "Drink if you've ever accidentally liked an old photo on Instagram while stalking.",
  "Take a sip if you still use Facebook.",
  "Drink if you've ever made a fake social media account.",
  "Give out 2 sips if you've ever won a contest.",
  "Take a sip if you've ever met a celebrity.",
  "Take a sip if you play a musical instrument.",
  "Drink if you have a birthday in the summer.",
  "Give out a sip if you have a birthday in the winter.",
  "Take a sip if you've ever gone skinny dipping.",
  "Drink if you've ever forgotten someone's name immediately after meeting them.",
  "Take a sip if you're wearing contacts or glasses.",
  "Give out 2 sips if you can do a backflip.",
  "Take a sip if you've ever had a terrible haircut.",
  "Drink if you have a fear of spiders.",
  "Take a sip if you're wearing blue.",
  "Give out 2 sips if you prefer tea over coffee.",
  "Take a sip if you've ever broken a phone screen.",
  "Drink if you have a streaming service open right now.",
  "Take 2 sips if you've ever been kicked out of a club.",
  "Everyone who has ever been on a plane, take a sip.",
  "If you are the DJ right now, hand out 3 sips.",
  "If you're wearing a hat, take a sip.",
  "If you've ever eaten a whole pizza by yourself, give out 2 sips.",
  "Take a sip if you've ever fallen asleep at a party.",
  "Drink if you've ever had to be carried home.",
  "Take a sip if you've ever cried in a bathroom at a club.",
  "Give out 2 sips if you can do a cartwheel.",
  "Take a sip if you've ever lost your wallet on a night out.",
  "Drink if you've ever lost your keys on a night out.",
  "Give out a sip if you've ever thrown up on someone else.",
  "Take a sip if you've ever woken up and not known where you were.",
  "Drink if you have more than 3 tattoos.",
  "Give out 2 sips if you've ever been to another continent.",
  "Take a sip if you're drinking water right now (liar)."
];
addCards('single', fillerCards, 1);

const MAX_CARDS = 190;
const finalCards = cards.slice(0, MAX_CARDS);

if (cards.length < MAX_CARDS) {
  console.warn(`Warning: only ${cards.length} cards defined, expected ${MAX_CARDS}.`);
}

fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/cards.json', JSON.stringify(finalCards, null, 2));
console.log(`Generated ${finalCards.length} cards in src/data/cards.json`);
