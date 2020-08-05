const schedule = require("node-schedule");
const { getTodayWallpaper } = require("./service/bing-wallpaper");

schedule.scheduleJob("30 9 * * *", async () => {
  try {
    await getTodayWallpaper();
  } catch (e) {
    console.error(e);
  }
});
