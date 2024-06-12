function getInstagramData() {
  const accessToken = PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN');
  const accountId = PropertiesService.getScriptProperties().getProperty('BUSINESS_ID');
  const igUserName = "automated_artworks";

  const baseUrl = "https://graph.facebook.com/v20.0/";
  const urlPath = baseUrl + accountId;

  const fields = "business_discovery.username(" + igUserName + "){followers_count,media_count}";

  const params = {
    fields: fields,
    access_token: accessToken
  }

  const endPoint = urlPath + "?" + Object.keys(params).map((key) => {return key + "=" + encodeURIComponent(params[key])}).join('&');

  res = UrlFetchApp.fetch(endPoint);
  console.log(res.getContentText());

  const resJson = JSON.parse(res.getContentText());
  const followersCount = resJson['business_discovery']['followers_count'];
  const mediaCount = resJson['business_discovery']['media_count'];

  insertSpreadSheet(followersCount, mediaCount);
}


function insertSpreadSheet(fc, mc) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth() + 1;
  const d = ('0' + now.getDate()).slice(-2);
  const t = ('0' + now.getHours()).slice(-2) + ":" + ('0' + now.getMinutes()).slice(-2);

  const sheetName = y + '年' + m + '月';
  let sh = ss.getSheetByName(sheetName);
  let ab = ss.getSheetByName('abc');

  if(!sh) {
    sh = ss.insertSheet(sheetName);
    const range = sh.getRange('B2:E5');
    const values = [
      ['IGアカウント名', 'hogehoge', '', ''],
      ['URL', 'fugafuga', '', ''],
      ['', '', '', ''],
      ['日付', '時間', 'フォロワー数', '投稿数']
    ];

    range.setValues(values);
    sh.setColumnWidth(1, 10);
    sh.setColumnWidths(2, 4, 100);
  }
  

  sh.appendRow(['', m + '/' + d, t, fc, mc]);
}
