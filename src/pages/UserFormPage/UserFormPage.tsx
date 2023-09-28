import {
  FetchView,
  Breadcrumbs,
  One,
  FieldType,
  TypedField,
  usePreventLeave,
} from "react-declarative";

import fetchApi from "../../helpers/fetchApi";
import history from "../../helpers/history";

import ITodoItem from "../../model/ITodoItem";
import { Box } from "@mui/material";
import { width } from "@mui/system";
import IUserItem from "../../model/IUserItem";

interface IUserOnePageProps {
  id: string;
}

const fields: TypedField[] = [
  {
    type: FieldType.Group,
    columns: "2",
    fields: [
      {
        type: FieldType.Div,
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        },
        fields: [
          {
            type: FieldType.Component,
            element: () => (
              <div>
                <Box
                  style={{
                    width: 200,
                    height: 200,
                    background: "#424242",
                  }}
                />
              </div>
            ),
          },
          {
            type: FieldType.Rating,
            name: "rate",
          },
        ],
      },
    ],
  },
  {
    type: FieldType.Group,
    columns: "10",
    fields: [
      {
        type: FieldType.Line,
        title: "Профиль",
      },
      {
        type: FieldType.Combo,
        title: "Пол",
        placeholder: "Choose one",
        name: "gender",
        itemList: ["Male", "Female"],
      },
      {
        type: FieldType.Combo,
        title: "Списки",
        placeholder: "Choose one",
        name: "list",
        itemList: ["List 1", "List 2", "Others"],
      },
      {
        type: FieldType.Div,
        style: {
          display: "grid",
          gridTemplateColumns: "1fr auto",
        },
        fields: [
          {
            type: FieldType.Text,
            name: "keyword",
            title: "Кодовая фраза",
            outlined: false,
            disabled: true,
          },
          {
            type: FieldType.Checkbox,
            fieldBottomMargin: "0",
            name: "completed",
            title: "Кодовая фраза",
            disabled: false,
          },
        ],
      },
    ],
  },

  {
    type: FieldType.Line,
    title: "Общая информация",
  },
  {
    type: FieldType.Text,
    name: "firstName",
    title: "Имя",
    description: "firstName",
  },
  {
    type: FieldType.Text,
    name: "lastName",
    title: "Фамилия",
    description: "lastName",
  },
  {
    type: FieldType.Text,
    name: "age",
    title: "Возраст",
    description: "42",
  },
  {
    type: FieldType.Expansion,
    title: "Подписка",
    description: "Подписка на уведомления",
  },
  {
    type: FieldType.Group,
    fields: [
      {
        type: FieldType.Group,
        columns: "6",
        fields: [
          { type: FieldType.Line, title: "Работа" },
          {
            type: FieldType.Text,
            title: "Должность",
            name: "jobTitle",
          },
          {
            type: FieldType.Text,
            title: "Место работы",
            name: "jobArea",
          },
        ],
      },
      {
        type: FieldType.Group,
        columns: "6",
        fields: [
          { type: FieldType.Line, title: "Домашний адрес" },
          {
            type: FieldType.Text,
            title: "Страна",
            name: "country",
          },
          {
            type: FieldType.Text,
            title: "Город",
            name: "city",
          },
          {
            type: FieldType.Text,
            title: "Область",
            name: "state",
          },
          {
            type: FieldType.Text,
            title: "Адрес",
            name: "address",
          },
        ],
      },
    ],
  },
];

export const UserOnePage = ({ id }: IUserOnePageProps) => {
  const fetchState = () => [fetchApi<IUserItem>(`/users/${id}`)] as const;

  const Content = (props: any) => {
    const { data, oneProps, beginSave } = usePreventLeave({
      history,
      onSave: () => {
        alert(JSON.stringify(data, null, 2));
        return true;
      },
    });

    return (
      <>
        <Breadcrumbs
          withSave
          title="Users list"
          subtitle="Profile"
          onSave={beginSave}
          onBack={() => history.push("/users_list")}
          saveDisabled={!data}
        />
        <One<IUserItem>
          handler={() => props.user}
          fields={fields}
          {...oneProps}
        />
      </>
    );
  };

  return (
    <FetchView state={fetchState}>
      {(user) => <Content user={user} />}
    </FetchView>
  );
};

export default UserOnePage;
