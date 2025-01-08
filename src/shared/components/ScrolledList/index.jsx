// @flow
import { graphql, usePaginationFragment, useLazyLoadQuery } from "react-relay";
import {
  useMemo,
  useCallback,
  cloneElement,
  Suspense,
  createElement,
} from "react";

import type { FetchPolicy } from "relay-runtime";

import type { ScrolledListElement$key } from "./__generated__/ScrolledListElement.graphql";

import ScrolledListPaginationQuery from "./__generated__/ScrolledListPaginationQuery.graphql";

import type {
  SortInput,
  FilterInput,
  ElasticIndex,
  ScrolledListPaginationQuery as QueryType,
} from "./__generated__/ScrolledListPaginationQuery.graphql";

import Flexbox from "../Flexbox";

type Props = {|
  +next?: ?number,
  +first?: ?number,
  +search?: ?string,
  +sort?: ?SortInput,
  +index: ElasticIndex,
  +header?: ?React$Node,
  +emptyElement?: ?React$Node,
  +fetchPolicy?: ?FetchPolicy,
  +queryFields?: ?Array<string>,
  +fallbackElement?: ?(any) => React$Node,
  +renderElement: (any, any) => React$Node,
  +parent?: ?({ children: React$Node, empty: boolean }) => React$Node,
  +filterMatrix?: ?$ReadOnlyArray<?$ReadOnlyArray<?FilterInput>>,
|};

type FallbackProps = {
  +fallbackElement: (any, any) => React$Node,
};

function ScrolledListFallback({ fallbackElement }: FallbackProps): React$Node {
  const elements = useMemo(() => {
    return Array.from({ length: 4 }, (v, i) => i).map((_, key) =>
      fallbackElement(key)
    );
  }, [fallbackElement]);

  return <div>{elements}</div>;
}

type InterfaceProps = {|
  +next?: ?number,
  +search: string,
  +first?: ?number,
  +sort?: ?SortInput,
  +index: ElasticIndex,
  +header?: ?React$Node,
  +queryFields?: ?Array<string>,
  +fetchPolicy?: ?FetchPolicy,
  +emptyElement?: ?React$Node,
  +renderElement: (any, any) => React$Node,
  +parent?: ?({ children: React$Node, empty: boolean }) => React$Node,
  +filterMatrix?: ?$ReadOnlyArray<?$ReadOnlyArray<?FilterInput>>,
|};

function ScrolledListNetworkInterface({
  next,
  sort,
  first,
  index,
  parent,
  header,
  search,
  fetchPolicy,
  queryFields,
  emptyElement,
  filterMatrix,
  renderElement,
}: InterfaceProps): React$Node {
  const node: ScrolledListElement$key = useLazyLoadQuery(
    ScrolledListPaginationQuery,
    {
      sort,
      index,
      first,
      filterMatrix,
      query:
        queryFields && queryFields?.length && search
          ? { value: search, field: queryFields }
          : null,
    },
    { fetchPolicy: fetchPolicy ?? undefined }
  );

  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment(
    graphql`
      fragment ScrolledListElement on Query
      @refetchable(queryName: "ScrolledListPaginationQuery") {
        entities(
          sort: $sort
          first: $first
          after: $after
          index: $index
          query: $query
          filterMatrix: $filterMatrix
        ) @connection(key: "ScrolledList_root_entities") {
          pageInfo {
            hasNextPage
            endCursor
            finalCursor
          }
          edges {
            id
            cursor
            node {
              __typename
            }
          }
        }
      }
    `,
    node
  );

  const edges = data?.entities?.edges;

  const elements = useMemo(() => {
    return edges?.map((edge) => renderElement(edge?.node, edge?.id));
  }, [edges, renderElement]);

  // eslint-disable-next-line no-unused-vars
  const handleOnLoad = useCallback(() => {
    if (hasNext && !isLoadingNext) {
      loadNext(next ?? 9);
    }
  }, [hasNext, isLoadingNext, loadNext, next]);

  return <div>{elements}</div>;
}

ScrolledListNetworkInterface.defaultProps = {
  next: 9,
  first: 9,
  sort: null,
  parent: null,
  header: null,
  emptyElement: null,
  filterMatrix: null,
  queryFields: ([]: Array<string>),
  fetchPolicy: "store-and-network",
};

export default function ScrolledList({
  next,
  sort,
  index,
  first,
  search,
  parent,
  header,
  fetchPolicy,
  queryFields,
  filterMatrix,
  emptyElement,
  renderElement,
  fallbackElement,
}: Props): React$Node {
  // eslint-disable-next-line no-nested-ternary
  const fallbackParentElement = fallbackElement ? (
    parent ? (
      // $FlowExpectedError
      createElement(
        parent,
        {
          empty: true,
          loading: true,
        },
        // eslint-disable-next-line react/jsx-indent
        <div>
          {header ?? null}
          <ScrolledListFallback fallbackElement={fallbackElement} />
        </div>
      )
    ) : (
      <div>
        {header ?? null}
        <ScrolledListFallback fallbackElement={fallbackElement} />
      </div>
    )
  ) : null;

  return (
    <Suspense fallback={fallbackElement ? fallbackParentElement : null}>
      <ScrolledListNetworkInterface
        next={next}
        sort={sort}
        index={index}
        first={first}
        parent={parent}
        header={header}
        search={search || ""}
        queryFields={queryFields}
        filterMatrix={filterMatrix}
        renderElement={renderElement}
        emptyElement={emptyElement ?? null}
        fetchPolicy={fetchPolicy ?? "store-and-network"}
      />
    </Suspense>
  );
}

ScrolledList.defaultProps = {
  next: 9,
  first: 9,
  search: "",
  sort: null,
  header: null,
  parent: null,
  emptyElement: null,
  filterMatrix: null,
  fallbackElement: null,
  fallbackContainer: null,
  fetchPolicy: "store-and-network",
  queryFields: ([]: Array<string>),
};
