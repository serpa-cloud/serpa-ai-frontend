/**
 * @generated SignedSource<<10485c91db77ea513f5f5aaffe30cde3>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
import type { ProjectCard$fragmentType } from "./../../../components/ProjectCard/__generated__/ProjectCard.graphql";
export type pageProjectQuery$variables = {|
  id: string,
|};
export type pageProjectQuery$data = {|
  +node: ?{|
    +id: string,
    +key?: string,
    +name?: ?string,
    +summary?: string,
    +summaryState?: string,
    +$fragmentSpreads: ProjectCard$fragmentType,
  |},
|};
export type pageProjectQuery = {|
  response: pageProjectQuery$data,
  variables: pageProjectQuery$variables,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "key",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "summary",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "summaryState",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "pageProjectQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ProjectCard"
              }
            ],
            "type": "AIProject",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "pageProjectQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/)
            ],
            "type": "AIProject",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "bbe6c841fe3afb378831f21651e80fbc",
    "id": null,
    "metadata": {},
    "name": "pageProjectQuery",
    "operationKind": "query",
    "text": "query pageProjectQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    id\n    ... on AIProject {\n      id\n      key\n      name\n      summary\n      summaryState\n      ...ProjectCard\n    }\n  }\n}\n\nfragment ProjectCard on AIProject {\n  id\n  key\n  name\n  summary\n}\n"
  }
};
})();

(node/*: any*/).hash = "4ffff352fd426b43d466c010f69bd472";

module.exports = ((node/*: any*/)/*: Query<
  pageProjectQuery$variables,
  pageProjectQuery$data,
>*/);
