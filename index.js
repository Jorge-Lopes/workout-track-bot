import { Telegraf, Markup } from "telegraf";
import fetch from "node-fetch";
import { BotToken, WebAppUrl } from "./config.js";

const bot = new Telegraf(BotToken);
const webAppUrl = WebAppUrl;3

console.log("Bot is listening...");

bot.command("start", (ctx) => {
  ctx.reply(
    "Welcome to Workout Track Bot! Choose an muscle group for today's session: ",
    Markup.inlineKeyboard(
      [
        Markup.button.callback("Back", "back"),
        Markup.button.callback("Chest", "chest"),
        Markup.button.callback("Shoulders", "shoulders"),
        Markup.button.callback("Arms", "arms"),
        Markup.button.callback("Legs", "legs"),
      ],
      { columns: 2 }
    )
  );
});

bot.action("back", async (ctx) => {
  await sendWorkoutPlan(ctx.chat.id, "back");
});
bot.action("chest", async (ctx) => {
  await sendWorkoutPlan(ctx.chat.id, "chest");
});
bot.action("shoulders", async (ctx) => {
  await sendWorkoutPlan(ctx.chat.id, "shoulders");
});
bot.action("arms", async (ctx) => {
  await sendWorkoutPlan(ctx.chat.id, "arms");
});
bot.action("legs", async (ctx) => {
  await sendWorkoutPlan(ctx.chat.id, "legs");
});

async function sendWorkoutPlan(chatId, muscleGroup) {
  try {
    const workoutPlan = await getWorkoutPlan(muscleGroup);
    bot.telegram.sendMessage(chatId, workoutPlan);
  } catch (error) {
    bot.telegram.sendMessage(chatId, "Error fetching workout plan.");
  }
}

async function getWorkoutPlan(muscleGroup) {
  try {
    const response = await fetch(
      `${webAppUrl}?action=getPlan&muscleGroup=${muscleGroup}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.text();
    return data;
  } catch (error) {
    console.error("Error while fetching workout plan: " + error);
  }
}

bot.command("registerWeight", async (ctx) => {
  const args = ctx.message.text.split(" ");
  const muscleGroup = args[1];
  const exercise = args[2];
  const weight = args[3];
  if (!muscleGroup || !exercise || !weight) {
    ctx.reply("Please specify all parameters");
  }

  try {
    await fetch(
      `${webAppUrl}?action=registerWeight&muscleGroup=${muscleGroup}&exercise=${exercise}&weight=${weight}`
    );
    ctx.reply("Weight registered successfully!");
  } catch (error) {
    ctx.reply("Error registering weight.", err);
  }
});

bot.launch().then(() => {
  console.log("Bot is running...");
});
