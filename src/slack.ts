import URLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;

function getLessonStatus() {
  const url = PropertiesService.getScriptProperties().getProperty(
    'CHECK_LESSONS_URL'
  );
  const response = UrlFetchApp.fetch(url);
  const canReserve: boolean = toBoolean(response.getContentText());
  if (canReserve) {
    sendSlack();
  }
}

function sendSlack() {
  const url = PropertiesService.getScriptProperties().getProperty(
    'SLACK_WEBHOOK_URL'
  );
  const schoolUrl = PropertiesService.getScriptProperties().getProperty(
    'DRIVING_SCHOOL_URL'
  );
  const data = {
    attachments: [
      {
        color: '#d23456',
        text: schoolUrl,
        title: '予約可能です',
      },
    ],
    channel: 'Naoya Shimizu',
    username: 'Car Lesson',
  };
  const payload = JSON.stringify(data);
  const options: URLFetchRequestOptions = {
    contentType: 'application/json',
    method: 'post',
    payload,
  };
  UrlFetchApp.fetch(url, options);
}

function toBoolean(strResponse: string) {
  return strResponse.toLowerCase() === 'true';
}
function checkClosingHours() {
  const now = Moment.moment();
  if (isUnderMorningMaintenance(now)) {
    return false;
  }
  const dow = now.isoWeekday();
  if (dow )
}

function isUnderNightMaintenanceOnWeekdays() {}

function isUnderNightOnWeekend() {}

function isUnderMorningMaintenance(now: any) {
  const startMorningMaintenance = Moment.moment('05:00:00');
  const endMorningMaintenance = Moment.moment('06:00:00');
  if (now.isBetween(startMorningMaintenance, endMorningMaintenance)) {
    return false;
  } else {
    return true;
  }
}
