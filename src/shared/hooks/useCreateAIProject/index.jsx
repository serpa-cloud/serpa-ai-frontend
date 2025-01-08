// @flow
'use client';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { graphql, useMutation } from 'react-relay';

type SendAIMessageUtils = [() => void, boolean];

export default function useCreateAIProject(): SendAIMessageUtils {
  const router = useRouter();

  const [createProject, createProjectPending] = useMutation(graphql`
    mutation useCreateAIProjectMutation {
      createAIProject {
        id
      }
    }
  `);

  const createProjectCallback = useCallback(
    // eslint-disable-next-line consistent-return
    () => {
      if (!createProjectPending) {
        createProject({
          variables: {},
          onCompleted: (res) => {
            const project = res.createAIProject;
            if (project) {
              router.push(`/app/projects/${project.id}`);
            }
          },
        });
      }
    },
    [createProject, createProjectPending, router],
  );

  return [createProjectCallback, createProjectPending];
}
