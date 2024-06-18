# WorkoutTrackBot

The `WorkoutTrackBot` is a personal project developed for learning purposes and to aid in tracking workout plans and weight loads using Telegram and Google Sheets integration.

Feel free to extend or modify it as needed for your own needs.  
Have fun in your workout! 🏋️‍♂️

## Features:

- **Telegram Bot**: Allows users to request a workout plan for a specific muscle group, and register the weights used for each exercise.
- **Google Sheets Integration**: Data for workout plans and weight tracking are stored in Google Sheets.
- **Google Apps Script**: Custom functions built to fetch workout plans based on muscle groups and register weights used for exercises.

## Components:

- **index.js**: This file contains the Telegram bot implementation using `Telegraf` and `node-fetch` packages to handle commands and actions from users.

- **app_script.gs**: This Google Apps Script file handles the backend functionality for fetching workout plans and registering weights in Google Sheets.

- **example_workout_sheet.xlsx**: Excel with one sheet storing workout plans categorized by muscle groups, detailing exercises, sets, and reps. And a second sheet logging weight used for exercises, along with timestamps.

#### Usage:

1. **Telegram Commands**:

   - `/start`: Initiates the bot and provides options to choose muscle groups (Back, Chest, Shoulders, Arms, Legs).
   - `/registerWeight <muscleGroup> <exercise> <weight>`: Registers the weight used for a specific exercise under a muscle group.

2. **Google Sheets Integration**:
   - The Google Apps Script (`app_script.gs`) fetches workout plans and registers weights based on HTTP requests from the Telegram bot.
   - `getPlan(muscleGroup)`: Retrieves the workout plan for the specified muscle group.
   - `registerWeight(muscleGroup, exercise, weight)`: Records the weight used for an exercise in the tracking sheet.

#### Setup:

1. Clone the repository:

   ```
   git clone <repository-url>
   ```

2. Install dependencies:

   ```
   yarn install
   ```

3. Import the `example _workout_sheet.xlsx` to a Google sheet.

4. Deploy the Google Apps Script (`app_script.gs`) as a web app and obtain the URL.

5. Create a `telegram bot` and retrieve the Token provided.

6. Create a `config.js` file with your Telegram Bot Token (`BotToken`) and Google Apps Script Web App URL (`WebAppUrl`).

7. Run the Telegram bot:

   ```
   yarn start
   ```

8. Go to `Telegram` and initiate a conversation with the `username` you set to your bot.
