/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { MutableRefObject } from 'react';
import type { HttpSetup } from '@kbn/core/public';
import { ENABLED_FIELD } from '@kbn/security-solution-plugin/common';
import { fetchRuleManagementFilters } from '../apis';

export const autoCheckPrebuildRuleStepCompleted = async ({
  abortSignal,
  kibanaServicesHttp,
  onError,
}: {
  abortSignal: MutableRefObject<AbortController>;
  kibanaServicesHttp: HttpSetup;
  onError?: (e: Error) => void;
}) => {
  // Check if there are any rules installed and enabled
  try {
    const data = await fetchRuleManagementFilters({
      http: kibanaServicesHttp,
      signal: abortSignal.current.signal,
      query: {
        page: 1,
        per_page: 20,
        sort_field: 'enabled',
        sort_order: 'desc',
        filter: `${ENABLED_FIELD}: true`,
      },
    });
    return data?.total > 0;
  } catch (e) {
    if (!abortSignal.current.signal.aborted) {
      onError?.(e);
    }

    return false;
  }
};

export const autoCheckAddIntegrationsStepCompleted = async ({
  indicesExist,
}: {
  indicesExist: boolean;
}) => Promise.resolve(indicesExist);
