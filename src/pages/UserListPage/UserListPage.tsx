import {
  List,
  FieldType,
  ColumnType,
  ActionType,
  TypedField,
  IColumn,
  IListAction,
  useArrayPaginator,
  SelectionMode,
} from "react-declarative";

import Delete from "@mui/icons-material/Delete";
import Add from "@mui/icons-material/Add";

import fetchApi from "../../helpers/fetchApi";
import history from "../../helpers/history";

import useLoader from "../../hooks/useLoader";

const filters: TypedField[] = [
  {
    type: FieldType.Text,
    name: "firstName",
    title: "Name",
  },
  {
    type: FieldType.Checkbox,
    name: "completed",
    title: "Completed",
  },
];

const columns: IColumn[] = [
  {
    type: ColumnType.Text,
    field: "id",
    headerName: "ID",
    secondary: true,
    width: () => 100,
  },
  {
    type: ColumnType.Text,
    headerName: "Name",
    primary: true,
    field: "firstName",
    width: () => 100,
  },
  {
    type: ColumnType.Text,
    headerName: "Last Name",
    primary: true,
    field: "lastName",
    width: () => 100,
  },
  {
    type: ColumnType.Text,
    headerName: "Email",
    primary: true,
    field: "email",
    width: () => 100,
  },
];

const actions: IListAction[] = [
  {
    type: ActionType.Add,
  },
  {
    type: ActionType.Menu,
    options: [
      {
        action: "add-action",
        label: "Create new row",
        icon: Add,
      },
      {
        action: "update-now",
      },
      {
        action: "resort-action",
      },
    ],
  },
];

const rowActions = [
  {
    label: "Remove action",
    action: "remove-action",
    icon: Delete,
  },
];

const heightRequest = () => window.innerHeight - 75;

export const UserListPage = () => {
  const { setLoader } = useLoader();

  const handler = useArrayPaginator(async () => await fetchApi("/users"), {
    onLoadStart: () => setLoader(true),
    onLoadEnd: () => setLoader(false),
  });

  const handleRowActionsClick = (action: string, row: any) => {
    alert(JSON.stringify({ row, action }, null, 2));
  };

  const handleAction = (action: string) => {
    alert(action);
  };

  const handleClick = (row: any) => {
    history.push(`/users_list/${row.id}`);
  };

  return (
    <List
      title="Users list"
      filterLabel="Filters"
      heightRequest={heightRequest}
      rowActions={rowActions}
      actions={actions}
      filters={filters}
      columns={columns}
      handler={handler}
      onRowAction={handleRowActionsClick}
      onRowClick={handleClick}
      onAction={handleAction}
      selectionMode={SelectionMode.Multiple}
    />
  );
};

export default UserListPage;
