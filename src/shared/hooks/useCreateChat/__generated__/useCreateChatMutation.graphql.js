/**
 * @generated SignedSource<<e0bc209843cf3d7732620d7731dfd4a3>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type useCreateChatMutation$variables = {|
  projectId: string,
|};
export type useCreateChatMutation$data = {|
  +createChat: {|
    +id: string,
  |},
|};
export type useCreateChatMutation = {|
  response: useCreateChatMutation$data,
  variables: useCreateChatMutation$variables,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "projectId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "projectId",
        "variableName": "projectId"
      }
    ],
    "concreteType": "Chat",
    "kind": "LinkedField",
    "name": "createChat",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useCreateChatMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useCreateChatMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "745fbbb90a232ae07bbd3aa7b0fb06bc",
    "id": null,
    "metadata": {},
    "name": "useCreateChatMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateChatMutation(\n  $projectId: ID!\n) {\n  createChat(projectId: $projectId) {\n    id\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "8e53f8e58331c96f03655af479692d79";

module.exports = ((node/*: any*/)/*: Mutation<
  useCreateChatMutation$variables,
  useCreateChatMutation$data,
>*/);
