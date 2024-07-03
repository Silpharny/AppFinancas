import React, { useContext } from "react";

import {
  Container,
  Message,
  Name,
  NewLink,
  NewText,
  LogoutButton,
  LogoutText,
} from "./styles";
import Header from "../../components/Header";

import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/auth";

export default function Profile() {
  const navigation = useNavigation();

  const { user, signOut } = useContext(AuthContext);

  return (
    <Container>
      <Header title=" Meu Perfil" />
      <Message>Olá! Bem vindo de volta!!!</Message>
      <Name numberOfLines={1}>{user.name}</Name>
      <NewLink onPress={() => navigation.navigate("Registrar")}>
        <NewText>Fazer Registro</NewText>
      </NewLink>
      <LogoutButton onPress={signOut}>
        <LogoutText>Sair</LogoutText>
      </LogoutButton>
    </Container>
  );
}
