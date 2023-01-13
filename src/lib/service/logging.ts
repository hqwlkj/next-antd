import axios from '@/shared/axios';
import { FB_ADVERTISER_ID } from '@/shared/app-constants';
import { EventName, EventSource } from '@/shared/event-types';

async function commonLog(params: {
  eventName: string;
  commonType: EventSource;
  commonContent: any;
}) {
  try {
    // TODO
    const commonParams = {
      // sourceClient: this.getSource(),
      // campaign: this.$store.getters.utmCampaign || '',
      // campaignSource: this.$store.getters.utmSource || '',
      // campaignMedium: this.$store.getters.utmMedium || '',
      // campaignContent: this.$store.getters.utmContent || '',
      // anonymousUserId: this.$store.getters.anonymousUserId,
      fbAdvertiserId: FB_ADVERTISER_ID,
    };
    return await axios.post('/commons/event-analyses/report', { ...params, ...commonParams });
  } catch (error) {
    console.error(error);
  }
}

export async function logCommonView(type: EventSource, content: any) {
  await commonLog({
    eventName: EventName.COMMON_VIEW,
    commonType: type,
    commonContent: content,
  });
}
