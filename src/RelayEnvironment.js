// @flow
import {
  Store,
  Network,
  Observable,
  Environment,
  RecordSource,
  QueryResponseCache,
} from 'relay-runtime';

import type { Environment as EnvironmentType } from 'relay-runtime';

import { createClient } from 'graphql-ws';

type CacheConfig = {
  force?: ?boolean,
  liveConfigId?: ?string,
  metadata?: { [key: string]: mixed },
  onSubscribe?: () => void,
  poll?: ?number,
  transactionId?: ?string,
};

export default function getRelayEnvironment(token: ?string): EnvironmentType {
  const subscriptionsClient = createClient({
    url: process.env.NEXT_PUBLIC_WS_ENDPOINT || 'wss://app.serpa.cloud/graphql',
  });

  /**
   * Cache graphql responses into relay data
   * 5 minutes to cache responses from graphql
   * https://relay.dev/docs/en/network-layer.html#caching
   */
  const ttl = 60000 * 1;
  const cache = new QueryResponseCache({ size: 250, ttl });
  const endpoint: string =
    process.env.SERVER_GRAPHQL_ENDPOINT ||
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
    'https://app.serpa.cloud/graphql';

  function generateId(len: number): string {
    if (typeof window !== 'undefined' && window.crypto) {
      // Generación en el cliente con window.crypto
      const arr = new Uint8Array((len || 40) / 2);
      window.crypto.getRandomValues(arr);
      return Array.from(arr, (byte) => byte.toString(16).padStart(2, '0')).join('');
    } else {
      // Generación en el servidor con webcrypto
      // $FlowIssue
      const webcrypto = require('crypto').webcrypto;
      const arr = new Uint8Array((len || 40) / 2);
      // $FlowIssue
      webcrypto.getRandomValues(arr);
      return Array.from(arr, (byte) => byte.toString(16).padStart(2, '0')).join('');
    }
  }

  // Function to fetch from graphql
  function fetcher({
    isQuery,
    isMutation,
    operation,
    variables,
    sink,
  }: {
    isQuery: boolean,
    isMutation: boolean,
    operation: any,
    variables: { +[string]: any },
    sink: any,
  }) {
    const body = {
      variables,
      query: operation.text,
    };
    const traceId: string = generateId(16);

    const headers: { [string]: string } = {
      Accept: 'application/json',
      'Content-type': 'application/json',
      'x-request-id': traceId,
      'x-b3-traceid': traceId,
      'x-traceid': traceId,
      'x-b3-spanid': traceId,
      'x-locale': 'en',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    fetch(endpoint, {
      headers,
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(body),
    })
      .then(async (res) => {
        const json = await res.json();
        sink.next(json);
        sink.complete();

        if (isQuery && json) cache.set(operation.text || operation.id, variables, json);
        if (isMutation) cache.clear();
      })
      .catch((err) => {
        console.trace(err);
      });
  }

  function fetchQuery(
    operation: any,
    variables: { +[string]: any },
    cacheConfig: CacheConfig,
  ): Observable<any> {
    const isMutation = operation.operationKind === 'mutation';
    const isQuery = operation.operationKind === 'query';

    return Observable.create((sink) => {
      const forceFetch = cacheConfig && cacheConfig.force;
      const fromCache = cache.get(operation.text || operation.id, variables);

      if (isQuery && fromCache !== null && !forceFetch) {
        sink.next(fromCache);
        return sink.complete();
      }

      return fetcher({ isQuery, isMutation, operation, variables, sink });
    });
  }

  function subscribe(operation: any, variables: { +[string]: any }): Observable<any> {
    return Observable.create((sink) => {
      if (!operation.text) {
        return sink.error(new Error('Operation text cannot be empty'));
      }
      return subscriptionsClient.subscribe(
        {
          operationName: operation.name,
          query: operation.text,
          variables,
        },
        sink,
      );
    });
  }

  const store = new Store(new RecordSource(), {});
  const network = Network.create(fetchQuery, subscribe);
  const environment = new Environment({
    store,
    network,
  });
  return environment;
}
