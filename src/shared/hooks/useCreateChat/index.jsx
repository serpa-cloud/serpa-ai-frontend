// @flow
import { useCallback } from "react";
import { graphql, useMutation } from "react-relay";

import type { useCreateChatMutation } from "./__generated__/useCreateChatMutation.graphql";

type CreateChatResults = [(projectId: string) => void, boolean];

export default function useCreateChat(): CreateChatResults {
  const [createChat, createChatPending] = useMutation(graphql`
    mutation useCreateChatMutation(
      $projectId: ID! # $last: Int
    ) # $before: Cursor
    {
      createChat(projectId: $projectId) {
        id
        # ...MessagesList
      }
    }
  `);

  const createChatCallback = useCallback(
    (projectId: string) => {
      if (!createChatPending) {
        createChat({
          variables: {
            // last: 20,
            projectId,
          },
          updater(store) {
            const projectProxy = store.get(projectId);
            const payload = store.getRootField("createChat");

            if (payload && projectProxy) {
              projectProxy.setLinkedRecord(payload, "currentConversation");
            }
          },
        });
      }
    },
    [createChat, createChatPending]
  );

  return [createChatCallback, createChatPending];
}
