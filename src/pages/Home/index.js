import React, { useContext, useEffect, useState } from "react";
import { Background, ListBalance, Area, Title, List } from "./styles";
import Header from "../../components/Header";

import api from "../../services/api";

import { format, set } from "date-fns";

import { useIsFocused } from "@react-navigation/native";
import BalanceItem from "../../components/BalanceItem";

import { TouchableOpacity, Modal } from "react-native";

import Icon from "@expo/vector-icons/MaterialIcons";
import DataList from "../../components/DataList";
import CalendarModal from "../../components/CalendarModal";

export default function Home() {
  const isFocoused = useIsFocused();
  const [listBalance, setListBalance] = useState([]);
  const [listReceives, setListReceives] = useState([]);
  const [dateMoviments, setDateMoviments] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function getMoviments() {
      dateFormated = format(dateMoviments, "dd/MM/yyyy");

      const receives = await api.get("/receives", {
        params: {
          date: dateFormated,
        },
      });

      const balance = await api.get("/balance", {
        params: {
          date: dateFormated,
        },
      });

      if (isActive) {
        setListBalance(balance.data);
        setListReceives(receives.data);
      }
    }
    getMoviments();

    return () => (isActive = false);
  }, [isFocoused, dateMoviments]);

  async function handleDelete(id) {
    try {
      await api.delete("/receives/delete", {
        params: {
          item_id: id,
        },
      });
      setDateMoviments(new Date());
    } catch (err) {
      console.log(err);
    }
  }

  function filterDateMoviments(dateSelected) {
    setDateMoviments(dateSelected);
  }

  return (
    <Background>
      <Header title="Minhas movimentações" />
      <ListBalance
        data={listBalance}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtrator={(item) => item.tag}
        renderItem={({ item }) => <BalanceItem data={item} />}
      />

      <Area>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="event" color="#121212" size={25} />
        </TouchableOpacity>
        <Title>Últimas movimentações</Title>
      </Area>
      <List
        data={listReceives}
        keyExtrator={(item) => item.id}
        renderItem={({ item }) => (
          <DataList data={item} deleteItem={handleDelete} />
        )}
        showVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBotton: 20 }}
      />

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <CalendarModal
          setVisible={() => setModalVisible(false)}
          handleFilter={filterDateMoviments}
        />
      </Modal>
    </Background>
  );
}
