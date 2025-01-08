/**
 * @generated SignedSource<<ee4dafb852e9186c5636b936b3767459>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type AIRole = "assistant" | "user" | "%future added value";
export type useSendAIMessageMutation$variables = {|
  connections: $ReadOnlyArray<string>,
  conversation: string,
  message: string,
  services: $ReadOnlyArray<string>,
|};
export type useSendAIMessageMutation$data = {|
  +promptToSerpaCloudAI: ?{|
    +cursor: any,
    +id: string,
    +node: {|
      +role: AIRole,
    |},
  |},
|};
export type useSendAIMessageMutation = {|
  response: useSendAIMessageMutation$data,
  variables: useSendAIMessageMutation$variables,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "conversation"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "message"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "services"
},
v4 = [
  {
    "kind": "Variable",
    "name": "conversation",
    "variableName": "conversation"
  },
  {
    "kind": "Variable",
    "name": "message",
    "variableName": "message"
  },
  {
    "kind": "Variable",
    "name": "services",
    "variableName": "services"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "role",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useSendAIMessageMutation",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "AIMessageEdge",
        "kind": "LinkedField",
        "name": "promptToSerpaCloudAI",
        "plural": false,
        "selections": [
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "AIMessage",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v7/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Operation",
    "name": "useSendAIMessageMutation",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "AIMessageEdge",
        "kind": "LinkedField",
        "name": "promptToSerpaCloudAI",
        "plural": false,
        "selections": [
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "AIMessage",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v7/*: any*/),
              (v5/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v4/*: any*/),
        "filters": null,
        "handle": "appendEdge",
        "key": "",
        "kind": "LinkedHandle",
        "name": "promptToSerpaCloudAI",
        "handleArgs": [
          {
            "kind": "Variable",
            "name": "connections",
            "variableName": "connections"
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "bd60c6ca63949ad692c8f517ea07f4da",
    "id": null,
    "metadata": {},
    "name": "useSendAIMessageMutation",
    "operationKind": "mutation",
    "text": "mutation useSendAIMessageMutation(\n  $message: String!\n  $conversation: ID!\n  $services: [String!]!\n) {\n  promptToSerpaCloudAI(message: $message, conversation: $conversation, services: $services) {\n    id\n    cursor\n    node {\n      role\n      id\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "88748f208b04d8f6a06769672e84145b";

module.exports = ((node/*: any*/)/*: Mutation<
  useSendAIMessageMutation$variables,
  useSendAIMessageMutation$data,
>*/);
