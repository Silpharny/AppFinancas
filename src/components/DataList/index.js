import React from "react";
import { Container, TextType, IconView, Type, TextValue } from "./styles";
import Icon from "@expo/vector-icons/Feather";
import { TouchableWithoutFeedback, Alert } from "react-native";

export default function DataList({ data, deleteItem }) {
  function handleDeleteItem() {
    Alert.alert(
      "Atenção",
      "Você tem certeza que deseja deletar este registro?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Continuar",
          onPress: () => deleteItem(data.id),
        },
      ]
    );
  }

  return (
    <TouchableWithoutFeedback onLongPress={handleDeleteItem}>
      <Container>
        <Type>
          <IconView type={data.type}>
            <Icon
              name={data.type === "despesa" ? "arrow-down" : "arrow-up"}
              size={20}
              color="#fff"
            />
            <TextType>{data.type}</TextType>
          </IconView>
        </Type>
        <TextValue>R$ {data.value}</TextValue>
        <TextValue>{data.description}</TextValue>
      </Container>
    </TouchableWithoutFeedback>
  );
}
