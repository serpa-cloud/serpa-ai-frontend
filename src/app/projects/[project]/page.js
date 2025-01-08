// @flow

'use client';

import { useCallback, useMemo, use, useRef } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay/hooks';

import { Padding, ComplexEditor, useUpdateProjectSummary } from '../../../shared';
import resolveImagePromises from './misc/resolveImagesPromises';

import styles from './page.module.sass';

export default function ProjectPage({
  params,
}: {
  params: Promise<{ project: string }>,
}): React$Node {
  const { project: projectIdParam } = use(params);
  const projectId = decodeURIComponent(projectIdParam);

  const summaryRef = useRef();

  const data = useLazyLoadQuery(
    graphql`
      query pageProjectQuery($id: ID!) {
        node(id: $id) {
          id
          ... on AIProject {
            id
            key
            name
            summary
            summaryState
            ...ProjectCard
          }
        }
      }
    `,
    {
      id: projectId ?? '',
    },
    { fetchPolicy: 'store-and-network' },
  );

  console.log(data);

  const [updateProject] = useUpdateProjectSummary();

  const node = data?.node;
  const name = node?.name ?? '';

  const savedTitleRef = useRef(node?.name ?? '');
  const savedSummaryRef = useRef(node?.summary ?? '');
  const savedSummaryStateRef = useRef(node?.summaryState ?? '');

  const summaryState = useMemo(() => {
    let state;

    try {
      state = JSON.parse(node?.summaryState ?? '{}');
    } catch (e) {
      state = null;
    }

    return state;
  }, [node?.summaryState]);

  const handleChangeTitle = useCallback(
    (title: string) => {
      if (title !== savedTitleRef.current) {
        updateProject({
          id: projectId,
          title,
          summary: savedSummaryRef.current ?? '',
          summaryState: savedSummaryStateRef.current ?? '',
          onCompleted(response) {
            if (response.updateProjectSummary) {
              savedTitleRef.current = response.updateProjectSummary?.name ?? '';
            }
          },
        });
      }
    },
    [updateProject, projectId],
  );

  const handleChangeSummary = useCallback(
    async (summary) => {
      const normalizedState = await resolveImagePromises({ ...(summary?.state || {}) });
      const serializedSummary = summary.state ? JSON.stringify(normalizedState) : '';

      if (
        summary.plainText !== savedSummaryRef.current ||
        serializedSummary !== savedSummaryStateRef.current
      ) {
        updateProject({
          id: projectId,
          title: savedTitleRef.current ?? '',
          summary: summary.plainText ?? '',
          summaryState: serializedSummary,
          onCompleted(response) {
            if (response.updateProjectSummary) {
              savedSummaryRef.current = response.updateProjectSummary?.summary ?? '';
              savedSummaryStateRef.current = response.updateProjectSummary?.summaryState ?? '';
            }
          },
        });
      }
    },
    [projectId, updateProject],
  );

  return (
    <div className={styles.section}>
      <Padding vertical={40} horizontal={40}>
        <ComplexEditor
          title={name}
          summary={summaryState}
          summaryRef={summaryRef}
          onChangeTitle={handleChangeTitle}
          onChangeSummary={handleChangeSummary}
        />
      </Padding>
      <div className={styles.chatContainer}>
        <Chat />
      </div>
    </div>
  );
}
