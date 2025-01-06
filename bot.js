const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const token = '7579667364:AAEkw5tr37QqTUY4DMOkhD_dioguqgxtt3U'; // Замени на токен, выданный BotFather
const bot = new TelegramBot(token, { polling: true });

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привет! Нажми кнопку ниже, чтобы открыть игру.', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Начать игру', web_app: { url: 'https://arcanoid-front-pnb2kia95-dondylions-projects.vercel.app' } }]
            ]
        }
    });
});

bot.on("web_app_data", (msg) => {
    const userId = msg.from.id;
    const data = JSON.parse(msg.web_app_data.data); // Рекорд и уровень

    console.log(`Рекорд пользователя ${userId}: ${data.score}, Уровень: ${data.level}`);

    bot.sendMessage(userId, `Игра завершена! Ваш рекорд: ${data.score} очков на уровне ${data.level}`);
});

console.log('Бот запущен!');
