/**
 * @generated SignedSource<<d7fa0f9d0a65334bd380c3295b9efee8>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type ScrolledListElement$fragmentType: FragmentType;
type ScrolledListPaginationQuery$variables = any;
export type ScrolledListElement$data = {|
  +entities: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +cursor: any,
      +id: string,
      +node: {|
        +__typename: string,
      |},
    |}>,
    +pageInfo: ?{|
      +endCursor: ?any,
      +finalCursor: ?any,
      +hasNextPage: ?boolean,
    |},
  |},
  +$fragmentType: ScrolledListElement$fragmentType,
|};
export type ScrolledListElement$key = {
  +$data?: ScrolledListElement$data,
  +$fragmentSpreads: ScrolledListElement$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = (function(){
var v0 = [
  "entities"
];
return {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "after"
    },
    {
      "kind": "RootArgument",
      "name": "filterMatrix"
    },
    {
      "kind": "RootArgument",
      "name": "first"
    },
    {
      "kind": "RootArgument",
      "name": "index"
    },
    {
      "kind": "RootArgument",
      "name": "query"
    },
    {
      "kind": "RootArgument",
      "name": "sort"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": require('./ScrolledListPaginationQuery.graphql')
    }
  },
  "name": "ScrolledListElement",
  "selections": [
    {
      "alias": "entities",
      "args": [
        {
          "kind": "Variable",
          "name": "filterMatrix",
          "variableName": "filterMatrix"
        },
        {
          "kind": "Variable",
          "name": "index",
          "variableName": "index"
        },
        {
          "kind": "Variable",
          "name": "query",
          "variableName": "query"
        },
        {
          "kind": "Variable",
          "name": "sort",
          "variableName": "sort"
        }
      ],
      "concreteType": "EntitiesConnection",
      "kind": "LinkedField",
      "name": "__ScrolledList_root_entities_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "finalCursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Edge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "id",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
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
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "658b4092689ec9157529127a2fd4999f";

module.exports = ((node/*: any*/)/*: RefetchableFragment<
  ScrolledListElement$fragmentType,
  ScrolledListElement$data,
  ScrolledListPaginationQuery$variables,
>*/);
