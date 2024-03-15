import axios from 'axios';
import { ObjectType, RESPONSE } from '../interfaces/common';
import { differenceInMinutes, format } from 'date-fns';
import { minutesToHhMm } from '../helpers/helper';

const { SUMMARY_URL, PARTIAL_URL, AVERAGE_URL } = process.env;

export class Service {
  async defaultService(): Promise<RESPONSE> {
    return {
      statusCode: 200,
      data: { message: `From the Server!` }
    };
  }
  async getHours(date: string, authToken: string): Promise<RESPONSE> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    };
    const response = await axios.get(SUMMARY_URL, { headers });
    const day = response.data?.data.find((e: ObjectType) => e.attendanceDate.includes(date));
    let workedMinutes = 0;
    for (let i = 0; i < Math.ceil(day.originalTimeEntries.length); i += 2) {
      if (day.originalTimeEntries[i + 1]) {
        workedMinutes += differenceInMinutes(
          day.originalTimeEntries[i + 1].timestamp,
          day.originalTimeEntries[i].timestamp
        );
      } else {
        workedMinutes += differenceInMinutes(new Date(), day.originalTimeEntries[i].timestamp);
      }
    }
    return {
      statusCode: 200,
      data: {
        effectiveHours: minutesToHhMm(workedMinutes),
        remainingHours: minutesToHhMm(510 - workedMinutes <= 0 ? 0 : 510 - workedMinutes)
      }
    };
  }
  async getPartialDetails(authToken: string): Promise<RESPONSE> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    };
    const url = `${PARTIAL_URL}?fromDate=${format(new Date(), 'yyyy-MM')}-01&toDate=${format(new Date(), 'yyyy-MM-dd')}`;
    const response = await axios.get(url, { headers });
    let totalPartial = 0;
    for (const partial of response.data?.data) {
      totalPartial += partial.requestMinutes;
    }
    return {
      statusCode: 200,
      data: {
        used: totalPartial,
        remaining: 90 - totalPartial
      }
    };
  }
  async getAverage(fromDate: string, toDate: string, authToken: string): Promise<RESPONSE> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    };
    const url = `${AVERAGE_URL}?fromDate=${fromDate}&toDate=${toDate}`;
    const { data } = await axios.get(url, { headers });
    const { averageHoursPerDayInHHMM: averageHours, totalDays: totalWorkingDays } = data.data.myStats;
    const [avgHours, avgMinutes] = averageHours.split(' ');
    const totalMinutes = +avgHours.slice(0, -1) * 60 + +avgMinutes.slice(0, -1);
    const extraMinutesPerDay = totalMinutes - 510;
    const extraMinutes = extraMinutesPerDay * totalWorkingDays;
    return {
      statusCode: 200,
      data: {
        averageHours,
        totalWorkingDays,
        extraMinutes,
        extraMinutesPerDay
      }
    };
  }
}
