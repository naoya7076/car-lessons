import URLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;

function getLessonStatus() {
  const url = PropertiesService.getScriptProperties().getProperty(
    'CHECK_LESSONS_URL'
  );
  const response = UrlFetchApp.fetch(url);
  const isOpeningHours = this.checkOpeningHours();
  if (!isOpeningHours) {
    Logger.log('サイトがメンテナンス中');
    return;
  }

  const canReserve: boolean = toBoolean(response.getContentText());
  if (canReserve) {
    sendSlack();
  } else {
    Logger.log('空いている予約が無い');
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
