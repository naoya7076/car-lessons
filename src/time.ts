function checkOpeningHours() {
  const now = Moment.moment();
  if (isMaintenanceTime(now, '05:00:00', '06:00:00')) {
    return false;
  }
  const dow: number = now.isoWeekday();
  if (dow === 1 || dow === 7) {
    if (isMaintenanceTime(now, '18:30:00', '19:30:00')) {
      return false;
    } else {
      return true;
    }
  } else {
    if (isMaintenanceTime(now, '20:30:00', '21:30:00')) {
      return false;
    } else {
      return true;
    }
  }
}

function isMaintenanceTime(now: any, from: string, to: string) {
  const format = 'HH:mm:ss';
  const startMaintenance = Moment.moment(from, format);
  const endMaintenance = Moment.moment(to, format);
  if (startMaintenance.isBefore(now) && endMaintenance.isAfter(now)) {
    return true;
  } else {
    return false;
  }
}
