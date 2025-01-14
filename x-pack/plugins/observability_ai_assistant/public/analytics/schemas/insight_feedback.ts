/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { EventTypeOpts } from '@kbn/analytics-client';
import type { Message } from '../../../common';
import type { Feedback } from '../../components/feedback_buttons';
import { messageSchema } from './common';

export interface InsightFeedback {
  feedback: Feedback;
  message: Message;
}

export const eventType = 'observability_ai_assistant_insight_feedback';

export const insightFeedbackEventSchema: EventTypeOpts<InsightFeedback> = {
  eventType,
  schema: {
    feedback: {
      type: 'text',
      _meta: {
        description: 'Whether the user has deemed this response useful or not',
      },
    },
    message: {
      properties: messageSchema,
    },
  },
};
