
import * as types from "../constants";

const initialState = {
  groups: [],
  page: 1,
  size: 5,
  totalSize: 0,

  //filter
  minTotalMember: null,
  maxTotalMember: null,

  search: null,

  //selected rows
  selectedRows: [],
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_LIST_GROUP:
      return {
        ...state,
        groups: actions.payload.groups,
        page: actions.payload.page,
        totalSize: actions.payload.totalSize,
        minTotalMember: actions.payload.minTotalMember,
        maxTotalMember: actions.payload.maxTotalMember,
        search: actions.payload.search,
      };
    case types.GET_LIST_GROUP_SELECTED_ROWS:
      return {
        ...state,
        selectedRows: actions.payload,
      };

    default:
      return state;
  }
}
