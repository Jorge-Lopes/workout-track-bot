function getPlan(muscleGroup) {

  Logger.log('Fetching plan for muscle group: ' + muscleGroup);

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Workout Plan');
  const data = sheet.getDataRange().getValues()
  const plan = data.filter(row => row[0].toLowerCase() === muscleGroup.toLowerCase());

  if (plan.length === 0) {
    return `No exercises found for ${muscleGroup}`;
  }

  return plan.map(row => `Exercise: ${row[1]}, Sets: ${row[2]}, Reps: ${row[3]}`).join('\n');
}

function registerWeight(muscleGroup, exercise, weight) {

  Logger.log('Registering weight for muscle group: ' + muscleGroup + ' exercise ' + exercise);

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Weight Tracking');
  sheet.appendRow([new Date, muscleGroup, exercise, weight])
}

function doGet(e) {
  const action = e.parameter.action;
  const muscleGroup = e.parameter.muscleGroup;
  const exercise = e.parameter.exercise;
  const weight = e.parameter.weight;

  if (action === 'getPlan') {
    return ContentService.createTextOutput(getPlan(muscleGroup))
  } else if (action === 'registerWeight') {
    registerWeight(muscleGroup, exercise, weight)
    return ContentService.createTextOutput('Weight registered.');
  } else {
    return ContentService.createTextOutput('Invalid action.');
  }
}